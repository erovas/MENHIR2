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

    const BackButton = Utils.BackButton;
    const NextButton = Utils.NextButton;

    BackButton.Show();
    NextButton.Show();

    //if(Story === null) Story = User.AddStory()

    //Story.IDStoryType = 2;


    if(Story.IDStoryType > 0){
        const inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            if(input.value == Story.IDStoryType){
                input.checked = true;
                break;
            }
        }
    }

    let BackButtonlock = false;

    BackButton.Element.onclick = e => {
        if(BackButtonlock)
            return;
        
        BackButtonlock = true;

        MH.Goto(Routes.SC_03);
    }

    let NextButtonlock = false;

    NextButton.Element.onclick = e => {
        if(NextButtonlock)
            return;

        NextButtonlock = true;

        const radio = Utils.GetRadioInputChecked();

        if(radio == null){
            Utils.ShowWarningMsg('Please select an action')
            NextButtonlock = false;
            return;
        }

        Story.IDStoryType = radio.value;

        switch (Story.IDStoryType) {
            case 1:
                return MH.Goto(Routes.SC_04A);
        
            case 2:
                Utils.ShowWarningMsg('No implementado');
                break;
                //return MH.Goto(Routes.SC_04B);

            case 3:
                Utils.ShowWarningMsg('No implementado');
                break;
                //return MH.Goto(Routes.SC_05A);
        }

        NextButtonlock = false;

    }
    

    return true;
}