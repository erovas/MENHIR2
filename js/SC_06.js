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
    NextButton.Show();

    NextButton.Element.onclick = e => {
        const radio = Utils.GetRadioInputChecked();

        if(radio == null){
            Utils.ShowWarningMsg('Please select a option')
            return;
        }

        if(radio.value == 1)
            return MH.Goto(Routes.SC_03)

        MH.Goto(Routes.SC_07);
    }
    


    return true;
}