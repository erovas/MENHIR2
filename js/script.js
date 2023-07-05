import { Xam } from './placeholders/Xam.js'
import { MH } from './placeholders/MH.js'



window.Utils = {

    GetInputsChecked: function(){
        return document.querySelectorAll('input:checked');
    },

    GetRadioInputChecked: function(){
        return document.querySelector('input[type="radio"]:checked');
    },

    ExecuteFN: function(fn = function(win = window, doc = document){}){

        if(typeof fn !== 'function')
            return console.log('Is not a function');

        if(fn.constructor.name === 'Function'){
            try {
                fn(window, document);
            } catch (error) {
                console.log(error);
            }
            return;
        }

        fn(window, document).then(ok => true, e => console.log(e, e.message, e.name, e.stack));
        
    },

    ShowErrorMsg: function(msg = '', time = 2000){
        const ctn = document.querySelector('msg-error');
        ctn.style.display = 'block';
        ctn.innerHTML = msg;
        setTimeout(() => {
            ctn.style.display = 'none';
        }, time);
    },

    ShowWarningMsg: function(msg = '', time = 2000){
        const ctn = document.querySelector('msg-warning');
        ctn.style.display = 'block';
        ctn.innerHTML = msg;
        setTimeout(() => {
            ctn.style.display = 'none';
        }, time);
    },

    ShowInfoMsg: function(msg = '', time = 2000){
        const ctn = document.querySelector('msg-info');
        ctn.style.display = 'block';
        ctn.innerHTML = msg;
        setTimeout(() => {
            ctn.style.display = 'none';
        }, time);
    },

    ShowLoadingScreen: function(){
        const spinner = document.querySelector('sc-spinner');

        if(spinner.getAttribute('sc-hide') === 'false')
            return;

        spinner.style.display = 'flex';
        spinner.setAttribute('sc-hide', 'false');
        setTimeout(() => {
            spinner.style.opacity = 1;
        }, 10);
        
    },

    HideLoadingScreen: function(){
        const spinner = document.querySelector('sc-spinner');

        if(spinner.getAttribute('sc-hide') === 'true')
            return;

        spinner.setAttribute('sc-hide', 'true');

        spinner.style.opacity = 0;
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 500);
    },

    CleanUser: function(){
        MH.User = {
            ID: 0,
            IDGender: 0,
            Date: 0,
            NickName: '',
            FirstName: '',
            Age: 0,
            Password: '',

            HobbiesConnect: [],
            HobbiesBeActive: [],
            HobbiesKeepLearning: [],
            HobbiesGive: [],
            HobbiesTakeNotice: [],
            
            MoodBefore: 0,
            MoodAfter: 0,
            Action: 0,
            Title: '',
            Content: '',
        }
    }

};

window.WVPages = {
    SingIn: 'SingIn',
    CreateUserProfile: 'CreateUserProfile',
    Wellbeing_Connect: 'Wellbeing_Connect',
    Wellbeing_BeActive: 'Wellbeing_BeActive',
    Wellbeing_KeepLearning: 'Wellbeing_KeepLearning',
    Wellbeing_Give: 'Wellbeing_Give',
    Wellbeing_TakeNotice: 'Wellbeing_TakeNotice',

    RecoverPass: 'RecoverPass',
    PassRecovered: 'PassRecovered',

    Welcome: 'Welcome',
    HowAreYouToday: 'HowAreYouToday',

    WhatDoYouWantToDo: 'WhatDoYouWantToDo',
    NoteYourFeelings: 'NoteYourFeelings',
    RecordAnAudio: 'RecordAnAudio',
    Retrieve: 'Retrieve',

    HowDoYouFeelNow: 'HowDoYouFeelNow',

    WhyDoYouFeelMood: 'WhyDoYouFeelMood',
    Suggestion: 'Suggestion',

    GoodJob: 'GoodJob',
    AnotherAction: 'AnotherAction',
    FinalScreen: 'FinalScreen'
}

Utils.ExecuteFN((window, document) => {
    
    //const Render = document.getElementsByTagName('main')[0];
    const Render = document.querySelector('main');
    const BackButton = document.querySelector('btn-back');
    const NextButton = document.querySelector('btn-forward');

    const GetContent = function(id){
        const template = document.getElementById(id);
        return template.content.cloneNode(true);
    }

    const PopulateRender = function(content){
        Render.appendChild(content);
    }

    const CleanRender = function(){
        Render.innerHTML = '';
    }

    const CleanController = function(){
        MH.Controller = {
            OnGoToNext: () => false,
            OnGoToBack: () => false
        }
    }

    const CleanPages = function(){
        MH.BackPage = '';
        MH.NextPage = '';
    }

    const GoToPage = function(id){
        if(id === '')
            return;

        CleanPages();
        CleanRender();
        CleanController();
        const content = GetContent(id);
        setTimeout(() => {
            PopulateRender(content);
        }, 300);
    }

    const ShowBackButton = function(show){
        BackButton.style.display = !!show? 'flex': 'none';
    }

    const ShowNextButton = function(show){
        NextButton.style.display = !!show? 'flex': 'none';
    }

    MH.GoToPage = GoToPage;

    MH.GoToBack = function(){
        if(MH.Controller.OnGoToBack())
            GoToPage(this.BackPage);
    };

    MH.GoToNext = function(){
        if(MH.Controller.OnGoToNext())
            GoToPage(this.NextPage);
    };

    MH.ShowBackButton = ShowBackButton;
    MH.ShowNextButton = ShowNextButton;

    MH.CanGoToBack = function(){
        return BackButton.style.display !== 'none' && MH.BackPage !== ''
    };

    MH.CanGoToNext = function(){
        return NextButton.style.display !== 'none' && MH.NextPage !== ''
    }

});

Utils.ShowLoadingScreen();

Utils.ExecuteFN(function(){
    const GoTo = WVPages.SingIn;

    //Evento botón hacia atrás de Android
    window.addEventListener("XamOnBackPressed", function(e){
        if(MH.CanGoToBack())
            MH.GoToBack();
    });



    Utils.ExecuteFN(async () => {

        console.log("sdfsdf")
        //let Xam = (await import('./placeholders/Xam.js')).default;
        /*
        try {
            Xam = (await import('./placeholders/Xam')).default;
        } catch (error) {
            //console.log(error.message, error.name)
            console.log(error, error.message, error.name, error.stack)
        }
        */
        
        
        console.log(Xam)
        console.log(MH.DeviceHandler)
        console.log(MH.AudioRecorder)
        console.log(MH.DevicePermissions)
        //MH.DeviceHandler = await Xam.new('DeviceHandler');
        //MH.AudioRecorder = await Xam.new('AudioRecorderAsync');
        //MH.DevicePermissions = await Xam.new('DevicePermissionsAsync');

        // Evitar que el movil pase a modo reposo
        await MH.DeviceHandler.BlockSleepMode(true);

        // Evitar que la App se ponga en landscape
        await MH.DeviceHandler.LockOrientation('Portrait');

        const filePath = Xam.CurrentDirectory + '/ddbb.db3';
        //await MH.DeviceHandler.DeleteFile(filePath);
        const ddbbExists = await MH.DeviceHandler.FileExists(filePath);

        MH.SQLite = await Xam.new('SQLiteConnectionAsync', filePath)
        await MH.SQLite.Open();

        console.log(ddbbExists);

        if(ddbbExists)
            return MH.GoToPage(GoTo);

        // Creación de base de datos
        

        let sqls = 
        [
        
        ];

        for (let index = 0; index < sqls.length; index++) {
            const sql = sqls[index];
            try {
                await MH.SQLite.ExecuteNonQuery(sql);
                console.log(sql)
            } catch (error) {
                console.log(error, sql);
                await MH.SQLite.Close();
                //Como ha ocurrido un error, borro el archivo
                await MH.DeviceHandler.DeleteFile(filePath);
            }
        }

        sqls = null;

        //await MH.SQLite.Close();
        MH.GoToPage(GoTo);
    });
});