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
        Story = User.AddStory()

    if(Story.IDMoodAfter > 0){
        const inputs = document.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            if(input.value == Story.IDMoodAfter){
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

        Story.IDMoodAfter = radio.value;

        Utils.ExecuteFN(async (window, document) => {
            let sql = 
            `
                INSERT INTO UserStories
                    (
                        IDUser,
                        IDStoryType,
                        IDMoodBefore,
                        IDMoodAfter,
                        Date,
                        Title,
                        Text,
                        Source
                    )
                VALUES
                    (
                        @IDUser,
                        @IDStoryType,
                        @IDMoodBefore,
                        @IDMoodAfter,
                        @Date,
                        @Title,
                        @Text,
                        @Source
                    )
            `;
            let parameters = {
                IDUser: Story.IDUser,
                IDStoryType: Story.IDStoryType,
                IDMoodBefore: Story.IDMoodBefore,
                IDMoodAfter: Story.IDMoodAfter,
                Date: Story.Date,
                Title: Story.Title,
                Text: Story.Text,
                Source: Story.Source
            }

            await SQLite.Open();
            await SQLite.ExecuteNonQuery(sql, parameters);
            await SQLite.Close();

            // Mood Malo
            if(Story.IDMoodAfter < 4)
                MH.Goto(Routes.SC_05_1A)

            // Mood bueno
            else 
                MH.Goto(Routes.SC_05_1B)
            
        });
    }
    

    return true;
}