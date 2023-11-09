// variables globas per contar les partides totals / guanyades / perdudes
let jugades = 0;
let guanyades = 0;
let perdudes = 0;



let encertada = false
let reset = document.getElementById("jocPenjat").innerHTML;

function mostraStats() {
    let statsWindow = window.open("", "", "width=400,height=400");
    statsWindow.document.write(`Total partides: ${jugades}
        - Guanyades (${guanyades == 0 && jugades == 0 ? "0" : ((guanyades/jugades)*100).toFixed(2)}%): ${guanyades}
        - Perdudes (${perdudes == 0 && jugades == 0 ? "0" : ((perdudes/jugades)*100).toFixed(2)}%): ${perdudes}`
    );
}
function novaPartida() {
    // variable oportunitats de joc
    let posicioPenjat = 0;
    // variable de control
    // arrays de control
    let arrEncriptat = []; // -> per marcar les posicions encriptades i canviar-les si la lletra es correcte
    let arrAbsolut = []; // -> per indicar les posicions de les lletres i poder canviar l'estat en la paraula encriptada
    let paraula = "";
    // reset de variables
    let paraulaCompleta = "";
    let paraulaControl = "";
    let lletresUtilitzades = "";
    jugades++; // suma 1 a les partides jugades;
    document.getElementById("abecedari").innerHTML = "";
    paraula = prompt("Introdueix una paraula").toUpperCase();
    let longitud = paraula.length;
    // definim la longitud de l'array amb la longitud de la paraula
    for (let i=0; i<longitud; i++) {
        arrAbsolut[i] = paraula[i];
        arrEncriptat[i] = "_";
        paraulaCompleta += `${paraula[i]} `;
        paraulaControl += "_ ";
    }
    
    document.getElementById("jocPenjat").innerHTML = reset;
    // creem element p per mostrar la paraula
    let paragraph = document.createElement("p");
    paragraph.id = "paraula";
    paragraph.textContent = paraulaControl;
    document.getElementById("jocPenjat").appendChild(paragraph);


    let abecedari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i=0; i< abecedari.length; i++) {
       let btn = document.createElement("button");
       btn.textContent = abecedari[i];
       btn.id = abecedari[i];
       btn.addEventListener("click", function() {
         let lletra = btn.innerHTML;
         esLletraCorrecta(arrEncriptat, arrAbsolut, lletra);
       });
       document.getElementById("abecedari").appendChild(btn);
    }
    
}
// funcio per comprovar si existeix element
function existeixElement(element) {
    if (element.getElementsByTagName("p")) { return true; }
    return false;
}

function esLletraCorrecta(arrEncriptat, arrAbsolut, lletra) { // TODO: editar nom de la funció
    let paraulaTemporal = "";
    for (let i=0; i<arrEncriptat.length; i++){
        if (lletra == arrAbsolut[i]) {
            arrEncriptat[i] = arrAbsolut[i];
            paraulaTemporal+= `${arrAbsolut[i]} `;
        } else {
            paraulaTemporal+=`${arrEncriptat[i]} `;
        }
    }
    lletraSetColor(arrAbsolut, lletra);
    document.getElementById(lletra).disabled = true;
    document.getElementById("paraula").textContent = paraulaTemporal;
}
// funcio per setejar el color del boto de la lletra
function lletraSetColor(arrAbsolut, lletra) {
    for (let i=0; i<arrAbsolut.length; i++) {
        if (lletra == arrAbsolut[i]) { 
            encertada = true;
            break; 
        }
    }
    if (encertada) {
        document.getElementById(lletra).style.backgroundColor = "green";
    } else {
        document.getElementById(lletra).style.backgroundColor = "red";
    }
}
function lletraUtilitzada(lletresUtilitzades, lletra) {
    for (let i=0; i<lletresUtilitzades.length; i++) {
        if (lletresUtilitzades[i] == lletra) { return true; }
    }
    return false;
}