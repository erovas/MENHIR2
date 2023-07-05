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
    let Story = MH.Story;

    const NextButton = Utils.NextButton;

    NextButton.Show();

    if(Story === null)
        MH.Story = Story = User.AddStory()

    if(Story.IDMoodBefore > 0){
        const inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            if(input.value == Story.IDMoodBefore){
                input.checked = true;
                break;
            }
        }
    }

    let NextButtonlock = false;

    NextButton.Element.onclick = e => {
        if(NextButtonlock)
            return;

        NextButtonlock = true;

        const radio = Utils.GetRadioInputChecked();

        if(radio == null){
            Utils.ShowWarningMsg('Please select a mood')
            NextButtonlock = false;
            return;
        }

        Story.IDMoodBefore = radio.value;
        MH.Goto(Routes.SC_04);
    }
    

    return true;
}