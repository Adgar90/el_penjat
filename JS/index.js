function iniciaJoc() {
    let opcio = prompt(`Escull una opció:
    1. Iniciar un joc
    2. Estadístiques
    3. Sortir
    `);
    Number.isInteger(parseInt(opcio)) ? opcio = parseInt(opcio) : opcio = parseInt("0");
    switch (opcio) {
        case 1:
            novaPartida();
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            console.log("Opció no vàlida");
            break;
    }
}

function novaPartida() {
    let paraula = prompt("Introdueix una paraula");
    let encriptada = "";
    for (let i=0; i<paraula.length; i++) {
        encriptada += "_ ";
    }
    console.log(encriptada);
    let lletra = prompt("Introdueix una lletra");

}