// variables globas
let posicioPenjat = 0;
let encertada = false
let reset = document.getElementById("jocPenjat").innerHTML;

function mostraStats() {
    let jugades = localStorage.getItem("jugades");
    let guanyades = localStorage.getItem("guanyades");
    let perdudes = localStorage.getItem("perdudes");
    let statsWindow = window.open("", "", "width=400px", "height=400px");
    statsWindow.document.write(`Total partides: ${jugades}<br>
        - Guanyades (${guanyades == 0 && jugades == 0 ? "0" : ((guanyades/jugades)*100).toFixed(2)}%): ${guanyades}<br>
        - Perdudes (${perdudes == 0 && jugades == 0 ? "0" : ((perdudes/jugades)*100).toFixed(2)}%): ${perdudes}`
    );
}
function novaPartida() {
    posicioPenjat = 0;
    // arrays de control
    let encriptada = []; // -> per marcar les posicions encriptades i canviar-les si la lletra es correcte
    let paraulaCorrecta = []; // -> per indicar les posicions de les lletres i poder canviar l'estat en la paraula encriptada
    // reset de variables de control
    let paraulaControl = "";
    
    procesaDadesPartida("jugades"); // suma 1 a les partides jugades;
    document.getElementById("abecedari").innerHTML = "";
    let paraula = prompt("Introdueix una paraula").toUpperCase();

    // controlem nulls i empties
    if (paraula == null || paraula == "") { return; }
    

    // omplim les nostres variables
    let longitud = paraula.length;
    for (let i=0; i<longitud; i++) {
        paraulaCorrecta[i] = paraula[i];
        encriptada[i] = "_";
        paraulaControl += "_ ";
    }

    // fem reset de l'innerHTML del joc per evitar duplicats
    document.getElementById("jocPenjat").innerHTML = reset;

    // creem element p per mostrar la paraula
    let paragraph = document.createElement("p");
    paragraph.id = "paraula";
    paragraph.textContent = paraulaControl;
    document.getElementById("jocPenjat").appendChild(paragraph);

    // setejem la posicio de la imatge del penjat
    setPosicioPenjat(posicioPenjat);
    posicioPenjat++;

    // creem les botoneres de les lletres per poder jugar
    let abecedari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i=0; i< abecedari.length; i++) {
       let btn = document.createElement("button");
       btn.textContent = abecedari[i];
       btn.id = abecedari[i];
       btn.addEventListener("click", function() {
         let lletra = btn.innerHTML;
         procesaParaula(encriptada, paraulaCorrecta, lletra);
         procesaLletra(paraulaCorrecta, lletra);
         sumaLletraUtilitzada(lletra);
       });
       document.getElementById("abecedari").appendChild(btn);
    }
    
}

function procesaParaula(encriptada, paraulaCorrecta, lletra) { // TODO: editar nom de la funció
    // variable per guardar valors temporals
    let paraulaTemporal = "";
    // for per recorrer la paraula encriptada i substituir si la lletra existeix en la paraula proposada
    for (let i=0; i<encriptada.length; i++){
        if (lletra == paraulaCorrecta[i]) {
            encriptada[i] = paraulaCorrecta[i];
            paraulaTemporal+= `${paraulaCorrecta[i]} `;
        } else {
            paraulaTemporal+=`${encriptada[i]} `;
        }
    }
    // un cop usat el botó, el deshabilitem
    document.getElementById(lletra).disabled = true;
    // actualitzem el valor del <p>
    document.getElementById("paraula").textContent = paraulaTemporal;
    if (posicioPenjat == 6) {
        alert("Has mort!");
        disableButtons();
        procesaDadesPartida("perdudes");
    }
    if (paraulaEncertada(encriptada, paraulaCorrecta)) {
        alert("Has encertat la paraula");
        disableButtons();
        procesaDadesPartida("guanyades");
    }
}
// funcio per procesar dades que manipulen la lletra (si es valida o no, la posicio del penjat, etc)
function procesaLletra(paraulaCorrecta, lletra) {
    for (let i=0; i<paraulaCorrecta.length; i++) {
        if (lletra == paraulaCorrecta[i]) { 
            encertada = true;
            break; 
        }
    }
    if (encertada) {
        document.getElementById(lletra).style.backgroundColor = "green";
    } else {
        document.getElementById(lletra).style.backgroundColor = "red";
        setPosicioPenjat(posicioPenjat);
        posicioPenjat++;
    }
    encertada = false;
}
// funcio per mostrar en quina posicio està el penjat
function setPosicioPenjat(posicioPenjat) {
    if (posicioPenjat < 7) { document.getElementById("imatgePenjat").src = `img/penjat_${posicioPenjat}.png`; }
}
// funcio per deshabilitar els butons un cop s'ha guanyat o perdut
function disableButtons() {
    let abecedari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i=0; i< abecedari.length; i++) {
       document.getElementById(abecedari[i]).disabled = true;
    }
}
// funcio que comprova si l'usuari ha encertat la paraula
function paraulaEncertada (encriptada, paraulaCorrecta) {
    for (let i=0; i<encriptada.length; i++){
        if (encriptada[i] != paraulaCorrecta[i]) {
            return false;
        }
    }
    return true;
}
// procesa les dades de la partida
function procesaDadesPartida(estatPartida) {
    let partidaCount = localStorage.getItem(estatPartida);
    partidaCount++;
    localStorage.setItem(estatPartida, partidaCount);
}
// reseteja les stats de la partida
function resetDadesPartida() {
    localStorage.setItem("jugades", 0);
    localStorage.setItem("guanyades", 0);
    localStorage.setItem("perdudes", 0);
}
function sumaLletraUtilitzada(lletra) {
    let lletresUtilitzades = document.getElementById("lletresUtilitzades").textContent;
    lletresUtilitzades < 1 ? lletresUtilitzades += `Lletres utilitzades: ${lletra}` : lletresUtilitzades += `, ${lletra}`;
    document.getElementById("lletresUtilitzades").textContent = lletresUtilitzades;
}
