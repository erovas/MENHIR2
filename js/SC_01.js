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
    const singin = document.getElementById('singin');
    const forgot = document.getElementById('forgot');
    const register = document.getElementById('register');

    // Variable para evitar efecto rebote de los botones
    // por ser funciones asincronas
    let singinLock = false;

    Utils.BackButton.Hide();
    Utils.NextButton.Hide();

    username.value = User.Username;
    password.value = User.Password;

    singin.onclick = e => {
        
        if(singinLock)
            return;

        singinLock = true;

        Utils.ExecuteFN(async (window, document) => {
            
            //#region Obtener los datos de la tabla Users

            let sql = 
            `
                SELECT
                    ID,
                    IDGender,
                    Date,
                    Username,
                    Age,
                    Password
                FROM Users
                WHERE 1 = 1
                AND Username = @Username
                AND Password = @Password
            `;

            let parameters = {
                Username: username.value,
                Password: password.value
            }

            await SQLite.Open();
            let response = await SQLite.ExecuteData(sql, parameters);
            await SQLite.Close();

            if(response.length < 1){
                Utils.ShowWarningMsg('Bad Username or Password')
                return;
            }

            /**
             * @type {import('./TypesDef.js').UserEntity}
             */
            const UserEntity = response[0];

            for (const key in UserEntity)
                if (Object.hasOwnProperty.call(UserEntity, key))
                    User[key] = UserEntity[key];
                
            //#endregion

            //#region Obtener los IDs de los hobbies del User

            sql = 
            `
                SELECT IDHobby  
                FROM HobbyTableName
                WHERE IDUser = @IDUser
            `;

            parameters = {
                IDUser: User.ID
            }

            const hobbies = ['HobbiesConnect', 'HobbiesBeActive', 'HobbiesKeepLearning', 'HobbiesGive', 'HobbiesTakeNotice'];
            await SQLite.Open();

            for (let index = 0; index < hobbies.length; index++) {
                const hobby = hobbies[index];
                const hobbyName = 'User' + hobby;
                const newSql = sql.replace('HobbyTableName', hobbyName);
                
                response = await SQLite.ExecuteData(newSql, parameters);
                
                response.forEach(item => {
                    User[hobby].push(item.IDHobby);
                });
            }

            await SQLite.Close();

            //#endregion

            //#region Obtener los datos de las Stories del User

            sql = 
            `
                SELECT 
                    ID,
                    IDUser,
                    IDStoryType,
                    IDMoodBefore,
                    IDMoodAfter,
                    Date,
                    Title,
                    Text,
                    Source
                FROM UserStories
                WHERE IDUser = @IDUser
                ORDER BY UserStories.ID ASC
            `;

            parameters = {
                IDUser: User.ID
            }

            await SQLite.Open();
            response = await SQLite.ExecuteData(sql, parameters);
            await SQLite.Close();

            for (let index = 0; index < response.length; index++)
                User.Stories.push(response[index]);
            

            //#endregion

            // La obtención de los datos del usuario a ido bien, o sea,
            // el login es correcto, ir a la siguiente pagina
            MH.Goto(Routes.SC_02);
        });

        

    }

    forgot.onclick = e => {
        //MH.Goto(Routes.SC_01_1B);
        Utils.ShowWarningMsg('No implementado')
    }

    register.onclick = e => {
        User.Clear();
        MH.Goto(Routes.SC_01_1A);
    }

    // Devolviendo "true", se está diciendo que quita la pantalla de carga
    return true;
}