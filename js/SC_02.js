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
    const NextButton = Utils.NextButton;

    username.innerText = User.Username;

    NextButton.Element.onclick = e => {
        MH.Goto(Routes.SC_03);
    }
    

    setTimeout(() => {
        NextButton.Show();
    }, 1500);

    setTimeout(() => {
        NextButton.Element.onclick();
    }, 3000);

    return true;
}