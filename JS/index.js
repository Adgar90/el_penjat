// variables globas per contar les partides totals / guanyades / perdudes
let jugades = 0;
let guanyades = 0;
let perdudes = 0;


function iniciaJoc() {
    let opcio = prompt(`Escull una opció:
    1. Iniciar un joc
    2. Estadístiques
    3. Sortir
    `);
    Number.isInteger(parseInt(opcio)) ? opcio = parseInt(opcio) : opcio = parseInt("0");
    switch (opcio) {
        case 1:
            console.log("Comença el joc...");
            novaPartida();
            break;
        case 2: // estadístiques
            console.log(`Total partides: ${jugades}
                - Guanyades (${guanyades == 0 && jugades == 0 ? "0" : ((guanyades/jugades)*100).toFixed(2)}%): ${guanyades}
                - Perdudes (${perdudes == 0 && jugades == 0 ? "0" : ((perdudes/jugades)*100).toFixed(2)}%): ${perdudes}`
            );
            iniciaJoc();
            break;
        case 3:
            console.log("Sortint...");
            return;
        default:
            console.log("Opció no vàlida");
            break;
    }
}

function novaPartida() {
    jugades++; // suma 1 a les partides jugades;
    let paraula = prompt("Introdueix una paraula").toUpperCase();
    let longitud = paraula.length;
    // reset de variables
    let paraulaCompleta = "";
    let paraulaControl = "";
    let lletresUtilitzades = "";
    // arrays de control
    let arrEncriptat = []; // -> per marcar les posicions encriptades i canviar-les si la lletra es correcte
    let arrAbsolut = []; // -> per indicar les posicions de les lletres i poder canviar l'estat en la paraula encriptada
    // variable oportunitats de joc
    let videsUtilitzades = 0;
    // definim la longitud de l'array amb la longitud de la paraula
    for (let i=0; i<longitud; i++) {
        arrAbsolut[i] = paraula[i];
        arrEncriptat[i] = "_";
        paraulaCompleta += `${paraula[i]} `;
        paraulaControl += "_ ";
    }
    while (true) {
        console.log(paraulaControl);
        console.log(`Lletres fallades ${videsUtilitzades}/6: ${lletresUtilitzades}`);
        // si les oportunitats s'acaben suma 1 al contador de partides perdudes i surt
        if (videsUtilitzades == 6) { 
            perdudes++;
            console.log("Mor penjat!");
            break; 
        }
        let lletra = prompt("Introdueix una lletra").toUpperCase();
        let incorrecte = true;
        
        if (lletraUtilitzada(lletresUtilitzades, lletra)) { 
            console.log(`La lletra ${lletra} ja ha estat utilitzada.`);
            videsUtilitzades++;
            continue; 
        }
        // controlem que només passin 1 caracter i després validem amb la funció
        if (lletra.length < 2 && esLletra(lletra)) {
            lletresUtilitzades < 2 ? lletresUtilitzades += `${lletra}` : lletresUtilitzades += `, ${lletra}`;
            
            for (let i=0; i<arrAbsolut.length; i++) {
                if (lletra == arrAbsolut[i]) { // si el valor de la lletra coincideix amb el valors d'algunes de les posicions, actualitzem l'array encriptat
                    arrEncriptat[i] = arrAbsolut[i];
                    incorrecte = false;
                }
            }
            paraulaControl = retornaParaula(arrEncriptat);
        } else {
            // sortida d'error ja que no acceptem caràcters que no siguin lletres de l'abecedari
            console.error("Oportunitat perduda. Has d'introduïr lletres de l'abecedari (a-z).");
            videsUtilitzades++;
            continue;
        }
        
        // si la lletra no es correcte, l'usuari perd una vida
        if (incorrecte) { videsUtilitzades++; }
        
        if (paraulaControl == paraulaCompleta) {
            console.log(`Enhorabona, has guanyat! La paraula era: ${paraulaCompleta}`);
            guanyades++;
            break;
        }
    }
    iniciaJoc();
}

// funció per validar que forma part de l'abecedari i no és un caràcter diferent (ignore case)
function esLletra(lletra) {
    let lletres = /[a-z]/gi;
    if (lletra.match(lletres)) { return true; }
    return false;
}
function lletraUtilitzada(lletresUtilitzades, lletra) {
    for (let i=0; i<lletresUtilitzades.length; i++) {
        if (lletresUtilitzades[i] == lletra) { return true; }
    }
    return false;
}
// funció que reescriu la paraula a mostrar
function retornaParaula(array) {
    let x = "";
    for (let i=0; i<array.length; i++) {
        x += `${array[i]} `;
    }
    return x;
}