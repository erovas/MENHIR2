/**
 * 
 * @param {Window} window 
 * @param {Document} document 
 * @param {import('./TypesDef.js').MENHIR} MH 
 */
export default async function(window, document, MH){

    const sql = 'SELECT Response FROM Accepted';

    await MH.SQLite.Open();
    const response = await MH.SQLite.ExecuteEscalar(sql);
    await MH.SQLite.Close();

    if(response == 1){
        MH.Goto(MH.Routes.SC_01);
        return false;
    }

    const BackButton = MH.Utils.BackButton;
    const NextButton = MH.Utils.NextButton;

    BackButton.Show();
    NextButton.Show();

    // Cerrar la App, porque el usuario NO ha aceptado
    BackButton.Element.onclick = async e => {
        await MH.Xam.Close();
    }

    // El usuario ha aceptado
    NextButton.Element.onclick = async e => {
        const sql = 'UPDATE Accepted SET Response = 1';
        await MH.SQLite.Open();
        await MH.SQLite.ExecuteNonQuery(sql);
        await MH.SQLite.Close();        
        //NextButton.Element.onclick = null;
        MH.Goto(MH.Routes.SC_01);
    }

    return true;
}


/**
 * Configuración de los permisos
 * @param {Window} window 
 * @param {Document} document 
 * @param {import('./TypesDef.js').MENHIR} MH 
 */
async function PermissionConfig(window, document, MH){

    let MicrophoneStatus = await MH.DevicePermissions.CheckStatus("Microphone");

    if(MicrophoneStatus == 'Unknown')
        MicrophoneStatus = await MH.DevicePermissions.Request("Microphone");

    if(MicrophoneStatus == 'Denied')
        console.log('Please allow use it Microphone')
    else if(MicrophoneStatus == 'Disabled')
        console.log('Please enable Microphone')
    else if(MicrophoneStatus == 'Restricted')
        console.log('Please unrestricted Microphone')
}