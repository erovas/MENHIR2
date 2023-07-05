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
    const Mood = document.getElementById('Mood');

    const NextButton = Utils.NextButton;
    NextButton.Show();

    if(Story === null)
        Story = User.AddStory()

    // Ya se va crear otra Story
    MH.Story = null;

    //Story.IDMoodAfter = 2;

    await SQLite.Open();
    const response = await SQLite.ExecuteEscalar(
        `
            SELECT Name
            FROM Moods
            WHERE ID = ${Story.IDMoodAfter}
        `);
    await SQLite.Close();

    Mood.innerText = response;

    NextButton.Element.onclick = e => {
        const radio = Utils.GetRadioInputChecked();

        if(radio == null){
            Utils.ShowWarningMsg('Please select a option');
            return;
        }

        // TODO
        MH.Goto(Routes.SC_05_2A);
    }

    return true;
}