/**
 * 
 * @param {Window} window 
 * @param {Document} document 
 * @param {import('./TypesDef.js').MENHIR} MH 
 */
export default async function(window, document, MH){

    setTimeout(() => {
        MH.Xam.Close();    
    }, 3500);
    
    return true;
}