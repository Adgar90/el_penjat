let paraula = "";
let intents = 6;
let encriptada = [];
let reset = document.getElementById("jocPenjat").innerHTML;
let posicioPenjat = 0;

function novaPartida() {
    
    resetValors(); // reseteja les paraules i els intents
    sumaPartida("jugades"); // suma partida a jugades
    // reset de content
    document.getElementById("lletresUtilitzades").innerHTML = "";
    // part paraula
    document.getElementById("jocPenjat").innerHTML = reset;
    paraula = prompt("Introdueix una paraula").toUpperCase();
    let p = document.createElement("p");
    p.id = "paraula";
    for (let i=0; i<paraula.length; i++) {
        p.textContent += "_ ";
        encriptada[i] = "_";
    }
    document.getElementById("jocPenjat").appendChild(p);


    // part butons ABC...
    document.getElementById("abecedari").innerHTML = "";
    let abecedari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i=0; i<abecedari.length; i++) {
        let btn = document.createElement("button");
        btn.id = abecedari[i];
        btn.setAttribute("onclick", `clickLletra('${abecedari[i]}')`);
        btn.textContent = abecedari[i];
        document.getElementById("abecedari").appendChild(btn);
    }
    // part imatge penjat
    setPosicioPenjat(posicioPenjat);
    posicioPenjat++;

}

function clickLletra(lletra) {
    document.getElementById(lletra).disabled = true;
   
    for (let i=0; i<paraula.length; i++) {
        if (lletra == paraula[i]) {
            encriptada[i] = lletra;
        }
    }
    escriuParaula();
    escriuIntents(); 
    esLletraCorrecta(paraula, lletra);
    sumaLletraUtilitzada(lletra);

    // comprovem si la paraula ha estat encertada
    if (paraulaEncertada(encriptada, paraula)) {
        alert("Has encertat la paraula");
        disableButtons();
        sumaPartida("guanyades");
    }
    // comprova si has mort
    else if (intents == 0) {
        alert("Has mort!");
        disableButtons();
        sumaPartida("perdudes");
    }
}

function escriuParaula() {
    document.getElementById("paraula").textContent = "";
    for (let i=0; i<encriptada.length; i++) {
        document.getElementById("paraula").textContent += `${encriptada[i]} `;
    }
}

function resetValors() {
    paraula = "";
    intents = 6;
    encriptada = [];
}

//funció que mostra les stats de les partides jugades
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
// funcio que comprova si l'usuari ha encertat la paraula
function paraulaEncertada (encriptada, paraula) {
    for (let i=0; i<encriptada.length; i++){
        if (encriptada[i] != paraula[i]) {
            return false;
        }
    }
    return true;
}
// procesa les dades de la partida
function sumaPartida(estatPartida) {
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
// suma les lletres utilitzades
function sumaLletraUtilitzada(lletra) {
    let lletresUtilitzades = document.getElementById("lletresUtilitzades").textContent;
    lletresUtilitzades < 1 ? lletresUtilitzades += `Lletres utilitzades: ${lletra}` : lletresUtilitzades += `, ${lletra}`;
    document.getElementById("lletresUtilitzades").textContent = lletresUtilitzades;
}
// mostra intents
function escriuIntents() {
    intents--;
    document.getElementById("intents").textContent = `Intents: ${intents}`;
}
// funcio per deshabilitar els butons un cop s'ha guanyat o perdut
function disableButtons() {
    let abecedari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i=0; i< abecedari.length; i++) {
       document.getElementById(abecedari[i]).disabled = true;
    }
}
// funcio per procesar dades que manipulen la lletra (si es valida o no, la posicio del penjat, etc)
function esLletraCorrecta(paraula, lletra) {
    let encertada = false;
    for (let i=0; i<paraula.length; i++) {
        if (lletra == paraula[i]) { 
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
}
// funcio per mostrar en quina posicio està el penjat
function setPosicioPenjat(posicioPenjat) {
    if (posicioPenjat < 7) { document.getElementById("imatgePenjat").src = `img/penjat_${posicioPenjat}.png`; }
}