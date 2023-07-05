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

    const Title = document.querySelector('input');
    const Text = document.querySelector('textarea');

    const BackButton = Utils.BackButton;
    const NextButton = Utils.NextButton;

    BackButton.Show();
    NextButton.Show();

    if(Story.Title.length > 0)
        Title.value = Story.Title;

    if(Story.Text !== null)
        Text.value = Story.Text;

    let BackButtonlock = false;

    BackButton.Element.onclick = e => {
        if(BackButtonlock)
            return;
        
        BackButtonlock = true;

        MH.Goto(Routes.SC_04);
    }

    let NextButtonlock = false;

    NextButton.Element.onclick = e => {
        if(NextButtonlock)
            return;

        NextButtonlock = true;

        if(Title.value.trim().length < 1){
            Utils.ShowWarningMsg('Please write a title');
            NextButtonlock = false;
            return;
        }

        if(Text.value.trim().length < 1){
            Utils.ShowWarningMsg('Please write a content');
            NextButtonlock = false;
            return;
        }

        Story.Title = Title.value;
        Story.Text = Text.value;

        MH.Goto(Routes.SC_05);
    }

    return true;
}