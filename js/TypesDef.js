// @ts-check

//#region Definición de Xam

/**
 * @typedef {object} NativeInstance 
 * @property {Readonly<string>} UID - Identificador unico de la instancia de un objeto nativo
 */

/**
 * @callback New 
 * @param {String} name Nombre de la clase nativa de la cual se quiere crear una instancia
 * @param  {...any} [args] Parametros que se le pasan al constructor de la clase nativa
 * @returns {Promise<NativeInstance>}
 */

/**
 * @typedef {object} Xam
 * @property {New} new - Llama al constructor de una clase nativa para crear una instancia.
 * @property {()=> Promise<void>} CleanUp - Limpia todas las instancias de los objetos nativos
 * @property {(UID: string) => Promise<void>} CleanInstance - Elimina una instancia de un objeto nativo mediante su identificador unico (NativeInstance.UID)
 * @property {() => Promise<void>} Reload - Ejecuta una recarga del documento (F5)
 * @property {Readonly<string>} CurrentDirectory - Obtiene la ruta del directorio en donde se está ejecutando la aplicacion web
 * @property {() => Promise<void>} Close - Cierra la App
 * @property {(url: URL) => Promise<void>} Fetch - Cierra la App
 */

//#endregion

//#region Definición SQLiteAsync

/**
 * @callback ExecuteNonQuery 
 * @param {String} query Script sql a ejecutar
 * @param  {Object<string, Number | string | null>} [parameters] Bind variables para el Script sql
 * @returns {Promise<Number>}
 */

/**
 * @callback ExecuteEscalar 
 * @param {String} query Script sql a ejecutar (SELECT)
 * @param  {Object<string, Number | string | null>} [parameters] Bind variables para el Script sql
 * @returns {Promise<any>}
 */

/**
 * @callback ExecuteData 
 * @param {String} query Script sql a ejecutar (SELECT)
 * @param  {Object<string, Number | string | null>} [parameters] Bind variables para el Script sql
 * @returns {Promise<Object<string, Number | string | null>[]>} [parameters] Bind variables para el Script sql
 */

//@returns {Promise<[{ columnName1: any, columnName2: any, columnNameN: any }, { columnName1: any, columnName2: any, columnNameN: any }, { }]>}

/**
 * @typedef {object} _SQLiteAsync
 * @property {() => Promise<void>} Open - Abre la conexión a la base de datos
 * @property {() => Promise<void>} Close - Cierra la conexión a la base de datos
 * @property {() => Promise<void>} BeginTransaction - Inicia una transacción
 * @property {() => Promise<void>} CommitTransaction - Ejecuta la transacción iniciada con BeginTransaction
 * @property {() => Promise<void>} RollbackTransaction - Cancela la transacción iniciada con BeginTransaction
 * @property {ExecuteNonQuery} ExecuteNonQuery - Ejecuta un Script sql, devuelve el número de registros insertados/actualizados si es un Script de inserción/actualización
 * @property {ExecuteEscalar} ExecuteEscalar - Ejecuta un Script sql (SELECT), devuelve el valor de la primera columna y fila del resultset, o nulo si no hay datos.
 * @property {ExecuteData} ExecuteData - Ejecuta un Script sql (SELECT), devuelve un array de objetos literales.
 * @property {() => Promise<boolean>} get_Disposed - Indica si la instancia se ha desechado
 * @property {() => Promise<boolean>} get_IsOpen - Indica si la conexión está abierta
 * @property {() => Promise<boolean>} get_IsTransaction - Indica si es una transacción
 * @property {() => Promise<string>} get_DatabasePath - Obtiene la ruta del archivo de base de datos
 * @property {() => Promise<void>} set_DatabasePath - Establece la ruta del archivo de base de datos
 * @property {() => Promise<Number>} get_Timeout - Obtiene el tiempo de espera (milisegundos) que espera la base de datos al hacer operaciones
 * @property {() => Promise<void>} set_Timeout - Establece el tiempo de espera (milisegundos) que espera la base de datos al hacer operaciones
 */

/**
 * @typedef {NativeInstance & _SQLiteAsync} SQLiteAsync
 */

//#endregion

//#region Definición DeviceHandler

/**
 * @typedef {object} Information
 * @property {Readonly<string>} Model - Modelo del dispositivo
 * @property {Readonly<string>} Name - Nombre que tiene el dispositivo
 * @property {Readonly<string>} Manufacturer - Fabricante del dispositivo
 * @property {Readonly<string>} Version - Versión del SO del dispositivo
 * @property {Readonly<string>} Platform - Plataforma del dispositivo ["Android" || "iOS" || "macOS" || "tvOS" || "Tizen" || "UWP" || "watchOS" || "Unknown"]
 * @property {Readonly<string>} Idiom - Clase de dispositivo ["Phone" || "Tablet" || "Desktop" || "TV" || "Watch" || "Unknown"]
 * @property {Readonly<string>} DeviceType - Tipo de dispositivo ["Unknown" || "Physical" || "Virtual"]
 */

/**
 * @callback ShowToastMsg 
 * @param {String} msg Mensaje que se quiere desplegar en pantalla
 * @param {String} [duration = 'SHORT'] Duración del mensaje ["LONG" || "SHORT"]
 * @returns {Promise<void>}
 */

/**
 * @typedef {Object} _DeviceHandler
 * @property {() => Promise<Information>} get_Information - Obtiene un objeto con toda la información disponible del movil
 * @property {()=> Promise<boolean>} get_SupportOrientation - Indica si el dispositivo permite la manipulación de la orientación de la pantalla
 * @property {()=> Promise<string>} get_CurrentOrientation - Obtiene la orientación actual del dispositivo ["Undefined" || "Portrait" || "Landscape" || "PortraitFlipped" || "LandscapeFlipped"]
 * @property {(orientation: string) => Promise<void>} LockOrientation - Bloquea la orientación que defina el programador ["Undefined" || "Portrait" || "Landscape" || "PortraitFlipped" || "LandscapeFlipped"]
 * @property {() => Promise<void>} UnlockOrientation - Desbloquea la orientación si esta hubiese sido bloqueada con LockOrientation(...)
 * @property {(sleepMode: boolean) => Promise<void>} BlockSleepMode - Bloquear el modo de suspender el movil por falta de actividad del usuario
 * @property {ShowToastMsg} ShowToastMsg - Despliega un mensaje en pantalla utilizando la API nativa del SO
 * @property {(filePath: string) => Promise<boolean>} FileExists - Indica si el archivo especificado en la ruta existe
 * @property {(filePath: string) => Promise<void>} DeleteFile - Elimina el archivo especificado en la ruta
 */

/**
 * @typedef {NativeInstance & _DeviceHandler} DeviceHandler
 */

//#endregion

//#region Definición DevicePermissions

/**
 * @typedef {object} _DevicePermissions - "CalendarRead" || "CalendarWrite" || "Camera" || "Microphone" || "..."
 * @property {(permissionName: string) => Promise<string>} CheckStatus - Obtiene el estado actual de un permiso ["Unknown" || "Denied" || "Disabled" || "Granted" || "Restricted"]
 * @property {(permissionName: string) => Promise<string>} Request - Pide autorización al usuario ["Unknown" || "Denied" || "Disabled" || "Granted" || "Restricted"]
 * @property {(permissionName: string) => Promise<boolean>} ShouldShowRationale - Obtiene la orientación actual del dispositivo ["Undefined" || "Portrait" || "Landscape" || "PortraitFlipped" || "LandscapeFlipped"]
 */

/**
 * @typedef {NativeInstance & _DevicePermissions} DevicePermissions - "CalendarRead" || "CalendarWrite" || "Camera" || "Microphone" || "..."
 */

//#endregion

//#region Definición AudioRecorder

/**
 * @callback Start 
 * @param {String} [filename] Nombre del archivo sin extension
 * @returns {Promise<true>}
 */

/**
 * @typedef {Object} _AudioRecord 
 * @property {() => Promise<string | null>} get_FilePath - Obtiene la ruta en donde se ha guardado la grabación
 * @property {() => Promise<boolean>} get_IsRecording - Indica si se está grabando
 * @property {Start} Start - Inicia la grabación del microfono
 * @property {() => Promise<string>} Stop - Devuelve la ruta del archivo de sonido, o un string Base64 del archivo de audio si se está usando protocolo http
 * @property {() => Promise<void>} Delete - Elimina la grabación actual
 * @property {() => Promise<string>} Stop - Devuelve un string Base64 del archivo de audio
 */

/**
 * @typedef {NativeInstance & _AudioRecord} AudioRecorder 
 */

//#endregion

//#region Definición User

/**
 * @typedef {object} Story UserStories
 * @property {Number} ID - UserStories.ID
 * @property {Readonly<Number>} IDUser - UserStories.IDUser
 * @property {Number} IDStoryType - UserStories.IDStoryType => 1: Texto, 2: Audio, 3: Recuerdo
 * @property {Number} IDMoodBefore - UserStories.IDMoodBefore => Moods.ID
 * @property {Number} IDMoodAfter - UserStories.IDMoodAfter => Moods.ID
 * @property {Number} Date - UserStories.Date => Fecha en la que se creó la historia
 * @property {String} Title - UserStories.Title => Titulo de la historia
 * @property {String | null} Text - UserStories.Text => para IDStoryType === 1
 * @property {String | Number | null} Source - UserStories.Source => para IDStoryType !== 1
 */

/**
 * @typedef {object} UserEntity
 * @property {Number} ID - Users.ID
 * @property {Number} IDGender - Users.IDGender
 * @property {Number} Date - Users.Date
 * @property {String} Username - Users.Username
 * @property {Number} Age - Users.Age
 * @property {String} Password - Users.Password
 */

/**
 * @typedef {object} _Hobbies
 * @property {Readonly<Number[]>} HobbiesConnect - HobbiesConnect.ID[] => UserHobbiesConnect.IDHobby
 * @property {Readonly<Number[]>} HobbiesBeActive - HobbiesBeActive.ID => UserHobbiesBeActive.IDHobby
 * @property {Readonly<Number[]>} HobbiesKeepLearning - HobbiesKeepLearning.ID => UserHobbiesKeepLearning.IDHobby
 * @property {Readonly<Number[]>} HobbiesGive - HobbiesGive.ID => UserHobbiesGive.IDHobby
 * @property {Readonly<Number[]>} HobbiesTakeNotice - HobbiesTakeNotice.ID => UserHobbiesTakeNotice.IDHobby
 */

/**
 * @typedef {object} _UserOthers
 * @property {Readonly<Story[]>} Stories - UserStories
 * @property {Readonly<() => void>} Clear - Vacia este objeto User
 * @property {Readonly<() => Story>} AddStory - Crea un objeto Story, lo agrega al array de Stories y retorna el objeto
 * @property {Readonly<Story>} CurrentStory - Obtiene la Story mas reciente
 */

/**
 * @typedef {UserEntity & _Hobbies & _UserOthers} User 
 */

//#endregion

//#region Definición Routes

/**
 * @typedef {object} Routes 
 * @property {Readonly<String>} SC_00 - Pantalla de "contrato" que debe aceptar el usuario para poder usar la App
 * 
 * @property {Readonly<String>} SC_01 - Pantalla de Login [SingIn]
 * 
 * @property {Readonly<String>} SC_01_1A - Pantalla de creacion de usuario [Datos] 
 * @property {Readonly<String>} SC_01_2A - Pantalla de creacion de usuario [HobbiesConnect]  
 * @property {Readonly<String>} SC_01_3A - Pantalla de creacion de usuario [HobbiesBeActive]
 * @property {Readonly<String>} SC_01_4A - Pantalla de creacion de usuario [HobbiesKeepLearning]
 * @property {Readonly<String>} SC_01_5A - Pantalla de creacion de usuario [HobbiesGive]
 * @property {Readonly<String>} SC_01_6A - Pantalla de creacion de usuario [HobbiesTakeNotice]
 * @property {Readonly<String>} SC_01_1B - Pantalla de recuperación de contraseña [RecoverPass] 
 * @property {Readonly<String>} SC_01_2B - Pantalla de recuperación de contraseña [PassRecovered] 
 * 
 * 
 * @property {Readonly<String>} SC_02 - Pantalla de Bienvenida [Welcome]
 * 
 * @property {Readonly<String>} SC_03 - Pantalla de Mood Inicial [HowAreYouToday]
 * 
 * @property {Readonly<String>} SC_04 - Pantalla de Acción [WhatDoYouWantToDo]
 * @property {Readonly<String>} SC_04A - Pantalla de escribir nota [NoteYourFeelings]
 * @property {Readonly<String>} SC_04B - Pantalla de grabar nota de voz [RecordAnAudio]
 * @property {Readonly<String>} SC_04C - Pantalla de recordar historias [Retrieve]
 * 
 * @property {Readonly<String>} SC_05 - Pantalla de Mood Final [HowDoYouFeelNow]
 * @property {Readonly<String>} SC_05_1A - Pantalla de Mood Final malo [WhyDoYouFeelMood]
 * @property {Readonly<String>} SC_05_2A - Pantalla de Mood Final malo sugerencias [Suggestion]
 * @property {Readonly<String>} SC_05_1B - Pantalla de Mood Final bueno [GoodJob]
 * 
 * @property {Readonly<String>} SC_06 - Pantalla de si quiere otra acción [AnotherAction]
 * 
 * @property {Readonly<String>} SC_07 - Pantalla final [FinalScreen]
 */

//#endregion

//#region Definición Utils

/**
 * @callback FN 
 * @param {Window} window 
 * @param {Document} document
 * @returns {void}
 */

/**
 * @callback ShowMsg 
 * @param {String} msg Mensaje a desplegar en pantalla 
 * @param {Number} [time = 2000] Tiempo en milisegundos de duración del mensaje
 * @returns {void}
 */

/**
 * @typedef {object} ActionButton
 * @property {Readonly<() => void>} Show - Mostrar botón
 * @property {Readonly<() => void>} Hide - Ocultar botón
 * @property {Readonly<HTMLElement>} Element - Elemento DOM del botón
 */

/**
 * @typedef {object} LoadingScreen
 * @property {Readonly<() => void>} Show - Mostrar botón
 * @property {Readonly<() => void>} Hide - Ocultar botón
 * @property {Readonly<HTMLElement>} Element - Elemento DOM del botón
 */

/**
 * @typedef {object} Utils
 * @property {() => NodeListOf<HTMLInputElement>} GetInputsChecked - Obtiene una lista de los Inputs que estan marcados
 * @property {() => HTMLInputElement | null} GetRadioInputChecked - Obtiene el Input tipo radio que ha sido seleccionado
 * @property {(fn: FN, errorHanled: Function) => void} ExecuteFN - Ejecuta una funcion (Sincrona o Asincrona)
 * @property {Readonly<ShowMsg>} ShowErrorMsg - Mostrar mensaje de error en pantalla
 * @property {Readonly<ShowMsg>} ShowWarningMsg - Mostrar mensaje de advertencia en pantalla
 * @property {Readonly<ShowMsg>} ShowInfoMsg - Mostrar mensaje de información en pantalla
 * @property {Readonly<LoadingScreen>} LoadingScreen - Pantalla de carga
 * @property {Readonly<ActionButton>} BackButton - Botón para atras
 * @property {Readonly<ActionButton>} NextButton - Botón para adelante
 */

//#endregion

//#region Definición MENHIR

/**
 * @typedef {object} Fetch 
 * @property {(url: URL) => string} Sync - Obtener texto archivo, sincrono
 * @property {(url: URL) => Promise<string>} Async - Obtener texto archivo, asincrono
 */

/**
 * @typedef {object} MENHIR 
 * @property {Readonly<User>} User - Objeto Entidad del usuario logueado/creado
 * @property {Readonly<SQLiteAsync>} SQLite - Indica si se está grabando
 * @property {Readonly<DeviceHandler>} DeviceHandler - Inicia la grabación del microfono
 * @property {Readonly<DevicePermissions>} DevicePermissions - Devuelve la ruta del archivo de sonido, o un string Base64 del archivo de audio si se está usando protocolo http
 * @property {Readonly<AudioRecorder>} AudioRecorder - Elimina la grabación actual
 * @property {Readonly<Utils>} Utils - Utilidades
 * @property {Readonly<Routes>} Routes - Rutas/Flujo de pantallas
 * @property {Readonly<(page: String) => void>} Goto - Metodo para renderizar vista y ejecutar carga de la vista
 * @property {Readonly<Fetch>} Fetch - Objeto que permite obtener el texto de un archivo de forma sincrona o asincrona
 * @property {Readonly<Xam>} Xam - Objeto para acceso nativo
 * @property {Story | null} Story - Story actual
 */

//#endregion

//#region Entidades



//#endregion

exports.unused = {};