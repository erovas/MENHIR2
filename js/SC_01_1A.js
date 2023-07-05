/**
 * 
 * @param {Window} window 
 * @param {Document} document 
 * @param {import('./TypesDef.js').MENHIR} MH 
 */
export default async function(window, document, MH){
    const User = MH.User;
    const Utils = MH.Utils;
    const SQLite = MH.SQLite;
    const Routes = MH.Routes;

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const age = document.getElementById('age');

    const BackButton = Utils.BackButton;
    const NextButton = Utils.NextButton;
    const Genders = [];

    //#region Seteo eventos controles Password y Password2

    password.oninput = e => {
        if(password.value ===  '')
            password.style.backgroundColor = '';
        else if(password.value.length > 6)
            password.style.backgroundColor = '#4cdf4a';
        else 
            password.style.backgroundColor = '#ff6060';
    }

    password2.oninput = e => {
        if(password2.value ===  '')
            password2.style.backgroundColor = '';
        else if(password.value === password2.value)
            password2.style.backgroundColor = '#4cdf4a';
        else 
            password2.style.backgroundColor = '#ff6060';
    }

    //#endregion

    //#region Seteo contenido de la pantalla

    BackButton.Show();
    NextButton.Show();

    // Combobox de los años
    for (let index = 18; index < 110; index++) {
        const option = document.createElement('option');
        option.value = index;
        option.innerText = index;
        age.appendChild(option);
    }

    
    await SQLite.Open();

    let sql = 'SELECT ID, Name FROM Genders';
    let response = await SQLite.ExecuteData(sql);
    const div = document.getElementById('selection');

    response.forEach(item => {
        const input = document.createElement('input');
        const label = document.createElement('label');
        input.id = 'id' + item.ID;
        input.type = 'radio';
        input.value = item.ID;
        input.name = 'Gender';
        label.setAttribute('for', input.id);
        label.className = 'btn-default';
        label.innerText = item.Name;
        div.appendChild(input);
        div.appendChild(label);
        Genders.push(input);
    });

    await SQLite.Close();

    // Seteo Username y Password si lo hay
    username.value = User.Username;
    password.value = User.Password;

    // Por si Password tiene algo, hacer el check
    password.oninput();
    
    // Seteo de la edad
    for (let index = 0; index < age.options.length; index++) {
        const option = age.options[index];
        if(option.value == User.Age){
            option.selected = true;
            age.selectedIndex = index;
            break;
        }
    }

    // Seteo del generao
    for (let index = 0; index < Genders.length; index++) {
        const radio = Genders[index];
        if(radio.value == User.IDGender){
            radio.checked = true;
            break;
        }
    }

    //#endregion

    //#region Eventos botones Back y Next

    let BackButtonlock = false;

    BackButton.Element.onclick = e => {

        if(BackButtonlock)
            return;

        BackButtonlock = true;

        Utils.ExecuteFN(async (window, document) => {

            //Se ha creado un usuario, se debe borrar, porque el usuario no quiere
            //continuar con la creación de la cuenta.
            const sql = 
            `
                DELETE FROM Users
                WHERE ID = @ID
            `;

            const parameters = {
                ID: User.ID
            }

            await SQLite.Open();
            await SQLite.ExecuteNonQuery(sql, parameters);
            await SQLite.Close();

            User.Clear();
            MH.Goto(Routes.SC_01);

        });
        
    }

    let NextButtonlock = false;

    NextButton.Element.onclick = async e => {

        if(NextButtonlock)
            return;

        NextButtonlock = true;

        Utils.ExecuteFN(async (window, document) => {

            //#region Comprobaciones

            // Comprobar que el Username no está vacio
            if(username.value.trim().length < 1){
                username.focus();
                Utils.ShowWarningMsg('Username can not be void');
                NextButtonlock = false;
                return;
            }

            // Comprobar que el Username está disponible

            

            let sql = 
            `
                SELECT *
                FROM Users
                WHERE Username = @Username
            `;

            let parameters = {
                Username: username.value
            }

            await SQLite.Open();
            let response = await SQLite.ExecuteData(sql, parameters);
            await SQLite.Close();

            if(response.length > 0){
                username.focus();
                Utils.ShowWarningMsg('Username already exists');
                NextButtonlock = false;
                return;
            }

            // Comprobar el password

            if(password.value.trim().length < 1 || password.value.length < 7){
                password.focus();
                Utils.ShowWarningMsg('Password must contains minimum 7 characters');
                NextButtonlock = false;
                return;
            }

            if(password2.value != password.value){
                password2.focus();
                Utils.ShowWarningMsg('Please repeat your password');
                NextButtonlock = false;
                return;
            }

            // Comprobar edad

            // Comprobar genero

            const selectedGender = Utils.GetRadioInputChecked();

            if(selectedGender === null){
                Utils.ShowWarningMsg('Please select a gender');
                NextButtonlock = false;
                return;
            }

            //#endregion

            //#region Inserción/Actualización en base de datos

            const $actualizar = User.ID != 0;

            User.IDGender = selectedGender.value;
            User.Date = Date.now();
            User.Username = username.value;
            User.Age = age.options[age.selectedIndex].value;
            User.Password = password.value;

            parameters = {
                IDGender: User.IDGender,
                Date: User.Date,
                Username: User.Username,
                Age: User.Age,
                Password: User.Password
            }

            if($actualizar)
                parameters['ID'] = User.ID;

            if($actualizar)
                sql = 
                `
                    UPDATE Users SET
                        IDGender = @IDGender,
                        Date = @Date,
                        Username = @Username,
                        Age = @Age,
                        Password = @Password
                    WHERE ID = @ID
                `;
            else
                sql = 
                `
                INSERT INTO Users
                    (
                        IDGender,
                        Date,
                        Username,
                        Age,
                        Password
                    )
                VALUES
                    (
                        @IDGender,
                        @Date,
                        @Username,
                        @Age,
                        @Password
                    )
                `;

            await SQLite.Open();            
            const rowAffected = await SQLite.ExecuteNonQuery(sql, parameters);
            await SQLite.Close();

            if(rowAffected < 1){
                throw new Error(
                    `Error al intentar crear usuario.
                    
                    sql lanzada:
                    ${sql}

                    paramatros:
                    ${JSON.stringify(parameters)}
                    `
                );
            }

            // Recuperar ID generado
            sql = 
            `
                SELECT ID
                FROM Users
                WHERE Username = @Username
                AND Password = @Password
            `;
            parameters = {
                Username: User.Username,
                Password: User.Password
            }

            await SQLite.Open();
            const ID = await SQLite.ExecuteEscalar(sql, parameters);
            await SQLite.Close();

            User.ID = ID;

            //#endregion

            MH.Goto(Routes.SC_01_2A);

        });
        
    }

    //#endregion


    return true;
}
