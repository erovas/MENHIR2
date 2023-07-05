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

    const NextButton = Utils.NextButton;

    // Ya se va crear otra Story
    MH.Story = null;

    NextButton.Element.onclick = e => {
        MH.Goto(Routes.SC_06);
    }
    

    setTimeout(() => {
        NextButton.Show();
    }, 1500);

    setTimeout(() => {
        NextButton.Element.onclick();
    }, 3000);

    return true;
}