(async (window, document) => {

    //#region Construcción de Objetos

    /**
     * @type {import('./js/TypesDef.js').Xam}
     */
    const Xam = window.Xam;

    const FilePath = Xam.CurrentDirectory + '/ddbb.db3';
    const SQLite = await Xam.new('SQLiteConnectionAsync', FilePath);
    const DeviceHandler = await Xam.new('DeviceHandler');
    const DevicePermissions = await Xam.new('DevicePermissionsAsync');
    const AudioRecorder = await Xam.new('AudioRecorderAsync');

    const BackButton = {
        _Show: function(){
            this.Element.style.display = 'flex';
        },
        get Show(){
            return this._Show;
        },

        _Hide: function(){
            this.Element.style.display = 'none';
        },
        get Hide(){
            return this._Hide;
        },

        /**
         * @type {HTMLElement}
         */
        _Element: document.querySelector('back-button'),
        get Element(){
            return this._Element;
        }
    };

    const NextButton = {
        _Show: function(){
            this.Element.style.display = 'flex';
        },
        get Show(){
            return this._Show;
        },

        _Hide: function(){
            this.Element.style.display = 'none';
        },
        get Hide(){
            return this._Hide;
        },

        /**
         * @type {HTMLElement}
         */
        _Element: document.querySelector('next-button'),
        get Element(){
            return this._Element;
        }
    };

    const LoadingScreen = {
        _Show: function(){
            this.Element.className = 'show';
        },
        get Show(){
            return this._Show;
        },

        _Hide: function(){
            this.Element.className = 'hide';
        },
        get Hide(){
            return this._Hide;
        },

        /**
         * @type {HTMLElement}
         */
        _Element: document.querySelector('loading-screen'),
        get Element(){
            return this._Element;
        }
    };


    const Utils = {

        _GetInputsChecked: () => document.querySelectorAll('input:checked') ,
        get GetInputsChecked(){
            return this._GetInputsChecked;
        },

        _GetRadioInputChecked: () => document.querySelector('input[type="radio"]:checked'),
        get GetRadioInputChecked(){
            return this._GetRadioInputChecked;
        },

        _ExecuteFN: function(fn, e) {
            if(typeof fn !== 'function')
                return console.log('Is not a function');

            if(typeof e !== 'function')
                e = error => {

                    try {
                        SQLite.Close();
                    } catch (e) {
                        
                    }

                    let msgError;

                    if(error.stack)
                        msgError = error.stack;
                    else if(error.message)
                        msgError = error.message;
                    else
                        msgError = error;

                    this.LoadingScreen.Hide();
                    console.error(msgError);                
                    this.ShowErrorMsg(msgError, 100000000000000);
                }

            if(fn.constructor.name === 'Function'){
                try {
                    fn(window, document);
                } catch (error) {
                    //console.log(error, error.message, error.name, error.stack);
                }
                return;
            }

            fn(window, document).then(ok => true, error => e(error));
        },
        get ExecuteFN(){
            return this._ExecuteFN;
        },

        _ErrorMsg: document.querySelector('error-msg'),
        _WarningMsg: document.querySelector('warning-msg'),
        _InfoMsg: document.querySelector('info-msg'),

        /**
         * 
         * @param {HTMLElement} element 
         * @param {String} msg 
         * @param {Number} time 
         */
        _ShowMsg: function(element, msg, time = 2000){
            time = ParseInt(time);
            element.style.display = 'block';
            element.innerHTML = msg + '';

            setTimeout(() => {
                element.style.display = 'none';
            }, time);
        },
        _ShowErrorMsg: function(msg, time){
            this._ShowMsg(this._ErrorMsg, msg, time)
        },
        _ShowWarningMsg: function(msg, time){
            this._ShowMsg(this._WarningMsg, msg, time)
        },
        _ShowInfoMsg: function(msg, time){
            this._ShowMsg(this._InfoMsg, msg, time)
        },

        get ShowErrorMsg(){
            return this._ShowErrorMsg;
        },
        get ShowWarningMsg(){
            return this._ShowWarningMsg;
        },
        get ShowInfoMsg(){
            return this._ShowInfoMsg;
        },

        get LoadingScreen(){
            return LoadingScreen;
        },

        get BackButton(){
            return BackButton;
        },

        get NextButton(){
            return NextButton;
        }
    };

    const Routes = { };

    [
        'SC_00', 
        
        'SC_01', 
        
        'SC_01_1A',
        'SC_01_2A',
        'SC_01_3A',
        'SC_01_4A',
        'SC_01_5A',
        'SC_01_6A',
        'SC_01_1B',
        'SC_01_2B',

        'SC_02',

        'SC_03',

        'SC_04',
        'SC_04A',
        'SC_04B',
        'SC_04C',

        'SC_05',
        'SC_05_1A',
        'SC_05_2A',
        'SC_05_1B',

        'SC_06',

        'SC_07'
    ].forEach(item => Routes[item] = item);
    
    const Fetch = {
        _Sync: url => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();
            let xhrStatus = xhr.status;
            //respuesta satisfactoria (200 a 299) ó cache (304)
            if((xhrStatus >= 200 && xhrStatus < 300) || xhrStatus == 304)
                return xhr.responseText;
            else
                throw url + ' ' + xhrStatus + ' ' + xhr.statusText;
        },
        get Sync(){
            return this._Sync;
        },

        _Async: async url => {
            //if(location.protocol == 'file:')
                //console.log(Xam.CurrentDirectory + url.replace('.', ''))
                //return await Xam.Fetch(Xam.CurrentDirectory + url.replace('.', ''))
            /*else*/
                return await (await fetch(url)).text();
        },
        get Async(){
            return this._Async;
        }
    };

    const User = {
        _ID: 0,
        get ID(){
            return this._ID;
        },
        set ID(value){
            this._ID = ParseInt(value);
        },

        _IDGender: 0,
        get IDGender(){
            return this._IDGender;
        },
        set IDGender(value){
            this._IDGender = ParseInt(value)
        },

        _Date: 0,
        get Date(){
            return this._Date;
        },
        set Date(value){
            this._Date = ParseInt(value);
        },

        _Username: '',
        get Username(){
            return this._Username;
        },
        set Username(value){
            this._Username = value + '';
        },
        
        _Age: 0,
        get Age(){
            return this._Age;
        },
        set Age(value){
            this._Age = ParseInt(value);
        },

        _Password: '',
        get Password(){
            return this._Password;
        },
        set Password(value){
            this._Password = value + '';
        },

        _HobbiesConnect: [],
        get HobbiesConnect(){
            return this._HobbiesConnect;
        },

        _HobbiesBeActive: [],
        get HobbiesBeActive(){
            return this._HobbiesBeActive;
        },

        _HobbiesKeepLearning: [],
        get HobbiesKeepLearning(){
            return this._HobbiesKeepLearning;
        },

        _HobbiesGive: [],
        get HobbiesGive(){
            return this._HobbiesGive;
        },

        _HobbiesTakeNotice: [],
        get HobbiesTakeNotice(){
            return this._HobbiesTakeNotice;
        },

        _Stories: [],
        get Stories(){
            return this._Stories;
        },

        _Clear: function(){
            const me = this;
            me.ID = 0;
            me.IDGender = 0;
            me.Date = 0;
            me.Username = '';
            me.Age = 0;
            me.Password = '';
            me.HobbiesConnect.length = 0;
            me.HobbiesBeActive.length = 0;
            me.HobbiesKeepLearning.length = 0;
            me.HobbiesGive.length = 0;
            me.HobbiesTakeNotice.length = 0;
            me.Stories.length = 0;
        },
        get Clear(){
            return this._Clear;
        },

        _AddStory: function(){
            const story = CreateStory(this.ID)
            this._Stories.push(story)
            return story;
        },
        get AddStory(){
            return this._AddStory;
        },

        get CurrentStory(){
            return this._Stories[this._Stories.length - 1];
        }

    };

    /**
     * @type {import('./js/TypesDef.js').MENHIR}
     */
    const MH = {
        get User(){
            return User;
        },

        get SQLite(){
            return SQLite;
        },

        get DeviceHandler(){
            return DeviceHandler;
        },

        get DevicePermissions(){
            return DevicePermissions;
        },

        get AudioRecorder(){
            return AudioRecorder;
        },

        get Utils(){
            return Utils;
        },

        get Routes(){
            return Routes;
        },

        get Goto(){
            return Goto;
        },

        get Fetch(){
            return Fetch;
        },

        get Xam(){
            return Xam;
        },

        Story: null
    };

    //#endregion

    //#region Configuración caracteristicas fisicas del movil

    // Evitar que el movil entre en estado de reposo, por falta de actividad en la App
    await MH.DeviceHandler.BlockSleepMode(true);

    // Evitar que la App cambie de orientación, cuando el usuario gire el telefono
    await MH.DeviceHandler.LockOrientation('Portrait');

    // Evento del boton fisico/virtual Back de Android
    window.addEventListener("XamOnBackPressed", function(e){
        if(MH.Utils.BackButton.Element.onclick)
            MH.Utils.BackButton.Element.onclick();
    });

    //#endregion

    //#region Configuración base de datos

    await (async MH => {
        const SQLite = MH.SQLite;
        const filePath = await SQLite.get_DatabasePath();
        //await MH.DeviceHandler.DeleteFile(filePath);    // Borrar base de datos
        const ddbbExists = await MH.DeviceHandler.FileExists(filePath);

        //console.log(MH.Fetch.Sync('./js/script.jss'))
        //console.log(await MH.Fetch.Async('./js/script.jss'))

        // La base de datos ya existe, por tanto ya no se debe de crear
        if(ddbbExists)
            return;

        // Cuando se ejecuta el Open(), se crea el archivo
        await SQLite.Open();

        try {
            const created = (await MH.Fetch.Async('./sql/01-CreateDataBase.sql')).split(';');
            for (let index = 0; index < created.length; index++) {
                const sql = created[index];
                await SQLite.ExecuteNonQuery(sql);
                console.log(sql);
            }

            const populate = (await MH.Fetch.Async('./sql/02-PopulateDataBase.sql')).split(';');
            for (let index = 0; index < populate.length; index++) {
                const sql = populate[index];
                await SQLite.ExecuteNonQuery(sql);
                console.log(sql);
            }

        } catch (error) {
            //throw error;
            console.log(error, error.message, error.name, error.stack);
        }
        finally {
            await SQLite.Close();
        }

    })(MH);

    //#endregion

    //#region Funciones Auxiliares

    /**
     * Parsea el valor a un entero positivo
     * @param {*} value 
     * @returns {Number}
     */
    function ParseInt(value){
        value = parseInt(value);
        
        if(value < 0)
            return - value;
        
        return value;
    }

    /**
     * 
     * @param {Number} IDUser 
     * @returns {import('./js/TypesDef.js').Story}
     */
    function CreateStory(IDUser){
        return {
            _ID: 0,
            get ID(){
                return this._ID;
            },
            set ID(value){
                this._ID = ParseInt(value);
            },

            _IDUser: IDUser,
            get IDUser(){
                return this._IDUser
            },

            _IDStoryType: 0,
            get IDStoryType(){
                return this._IDStoryType;
            },
            set IDStoryType(value){
                this._IDStoryType = ParseInt(value);
            },

            _IDMoodBefore: 0,
            get IDMoodBefore(){
                return this._IDMoodBefore;
            },
            set IDMoodBefore(value){
                this._IDMoodBefore = ParseInt(value);
            },

            _IDMoodAfter: 0,
            get IDMoodAfter(){
                return this._IDMoodAfter;
            },
            set IDMoodAfter(value){
                this._IDMoodAfter = ParseInt(value);
            },

            _Date: 0,
            get Date(){
                return this._Date;
            },
            set Date(value){
                this._Date = ParseInt(value);
            },

            _Title: '',
            get Title(){
                return this._Title;
            },
            set Title(value){
                this._Title = value + '';
            },

            _Text: null,
            get Text(){
                return this._Text;
            },
            set Text(value){
                if(typeof value == 'string')
                    this._Text = value;
                else
                    this._Text = null;
            },

            _Source: null,
            get Source(){
                return this._Source;
            },
            set Source(value){
                if(typeof value == 'string' || typeof value == 'number')
                    this._Source = value;
                else
                    this._Source = null;
            },
            
        };
    }

    window.addEventListener('unhandledrejection', (promiseRejectionEvent) => {
        console.log('unhandled: ', promiseRejectionEvent)
      })

    /**
     * 
     * @param {String} page 
     */
    function Goto(page){

        const main = document.getElementById('root');

        Utils.BackButton.Hide();
        Utils.NextButton.Hide();

        Utils.BackButton.Element.onclick = null;
        Utils.NextButton.Element.onclick = null;

        // Mostrar pantalla de carga, mientras se renderiza la vista y se ejecuta su carga
        Utils.LoadingScreen.Show();

        const timeStart = Date.now();
        const time = 200; // ms

        (async (window, document, MH) => {

            // Renderizado de vista
            main.innerHTML = await MH.Fetch.Async('./html/' + page + '.html');

            let hide = false;

            try {
                // Ejecutar carga de la vista
                const load = (await import('./js/' + page + '.js')).default;
                hide = await load(window, document, MH);    
            } catch (error) {

                // Si se queda abierta, cerrarla
                try {
                    await SQLite.Close();
                } catch (error) {
                    
                }

                let msgError;

                if(error.stack)
                    msgError = error.stack;
                else if(error.message)
                    msgError = error.message;
                else
                    msgError = error;

                Utils.LoadingScreen.Hide();
                console.error(msgError);                
                Utils.ShowErrorMsg(msgError, 100000000000000);
                return;
            }

            // Ha terminado de renderizar y ejecutar la carga
            if(!hide)
                return;
            
            const timeEnd = Date.now()
            const timeExecution = timeEnd - timeStart;

            // La carga de la pantalla ha tardado mas de 200ms, ocultar
            // pantalla de carga inmediatamente
            if(timeExecution > time)
                return Utils.LoadingScreen.Hide();
            
            setTimeout(() => Utils.LoadingScreen.Hide(), time - timeExecution);

        })(window, document, MH);
    }

    //#endregion

    // Pagina de inicio
    MH.Goto(MH.Routes.SC_00);

})(window, document);