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

    const main = document.querySelector('main');
    const form = document.querySelector('form');
    const checkboxes = [];
    const hobbies = User.HobbiesBeActive;

    const BackButton = Utils.BackButton;
    const NextButton = Utils.NextButton;

    BackButton.Show();
    NextButton.Show();

    main.style.backgroundColor = 'var(--color-beactive)';

    //#region Seteo de pantalla

    const sql = 
    `
        SELECT
            ID,
            Name
        FROM HobbiesBeActive
        ORDER BY ID ASC
    `;

    await SQLite.Open();
    const response = await SQLite.ExecuteData(sql);
    await SQLite.Close();

    response.forEach(hobby => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.value = hobby.ID;
        input.id = 'id' + input.value;
        input.type = 'checkbox';
        label.setAttribute('for', 'id' + input.value);
        label.innerText = hobby.Name;
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
        checkboxes.push(input);
    });

    //hobbies.push(1)

    hobbies.forEach(hobby => {
        for (let index = 0; index < checkboxes.length; index++) {
            const input = checkboxes[index];
            if(input.value == hobby){
                input.checked = true;
                break;
            }
        }
    });

    //#endregion

    //#region Eventos botones Back y Next

    BackButton.Element.onclick = e => {
        main.style.backgroundColor = '';
        MH.Goto(Routes.SC_01_2A);
    }

    let NextButtonlock = false;

    NextButton.Element.onclick = async e => {
        if(NextButtonlock)
            return;

        NextButtonlock = true;

        const inputsChecked = Utils.GetInputsChecked();

        if(inputsChecked.length < 1){
            Utils.ShowWarningMsg('Please select a hobby');
            NextButtonlock = false;
            return;
        }

        Utils.ExecuteFN(async (window, document) => {
            const $actualizar = hobbies.length > 0;

            let sql = '';
            let parameters = {};
    
            if($actualizar){
                sql = 
                `
                    DELETE FROM UserHobbiesBeActive
                    WHERE IDUser = @IDUser
                `;
                parameters = {
                    IDUser: User.ID
                }
    
                await SQLite.Open();
                await SQLite.ExecuteNonQuery(sql, parameters);
                await SQLite.Close();
            }

            sql = 
            `
                INSERT INTO UserHobbiesBeActive
                    (
                        IDUser,
                        IDHobby
                    )
                VALUES
                    (
                        @IDUser,
                        @IDHobby
                    )
            `;
            parameters = {
                IDUser: User.ID,
                IDHobby: 0
            }

            await SQLite.Open();

            for (let index = 0; index < inputsChecked.length; index++) {
                const input = inputsChecked[index];
                const IDHobby = parseInt(input.value);
                hobbies.push(IDHobby);
                parameters.IDHobby = IDHobby;
                await SQLite.ExecuteNonQuery(sql, parameters);
            }

            await SQLite.Close();

            main.style.backgroundColor = '';
            MH.Goto(Routes.SC_01_4A);
        });
        
    }

    //#endregion


    return true
}