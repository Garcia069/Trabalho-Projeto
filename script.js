const morse = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
    F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
    K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
    P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--",
    Z: "--..",
    "0": "-----", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...",
    "8": "---..", "9": "----."
};

const fonetico = {
    A: "Alfa", B: "Bravo", C: "Charlie", D: "Delta",
    E: "Echo", F: "Foxtrot", G: "Golf", H: "Hotel",
    I: "India", J: "Juliett", K: "Kilo", L: "Lima",
    M: "Mike", N: "November", O: "Oscar", P: "Papa",
    Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango",
    U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray",
    Y: "Yankee", Z: "Zulu"
};

function processar() {
    let texto = document.getElementById("entrada").value;
    let tipo = document.getElementById("tipo").value;
    let acao = document.getElementById("acao").value;

    if (tipo === "morse") {
        document.getElementById("resultado").value =
            acao === "codificar"
            ? codificarMorse(texto)
            : decodificarMorse(texto);
    }

    if (tipo === "cesar") {
        let chave = Number(document.getElementById("chave").value);

        if (acao === "decodificar") {
            chave = -chave;
        }

        document.getElementById("resultado").value =
            cesar(texto, chave);
    }

    if (tipo === "fonetico") {
        document.getElementById("resultado").value =
            acao === "codificar"
            ? codificarFonetico(texto)
            : decodificarFonetico(texto);
    }
}


/* MORSE */

function codificarMorse(texto) {
    return texto.toUpperCase().split("").map(letra => {
        if (letra === " ") return "/";
        return morse[letra] || letra;
    }).join(" ");
}

function decodificarMorse(texto) {
    let inverso = {};

    for (let letra in morse) {
        inverso[morse[letra]] = letra;
    }

    return texto.split(" ").map(codigo => {
        if (codigo === "/") return " ";
        return inverso[codigo] || codigo;
    }).join("");
}


/* CÉSAR */

function cesar(texto, chave) {
    return texto.split("").map(letra => {
        let codigo = letra.charCodeAt(0);

        if (codigo >= 65 && codigo <= 90) {
            return String.fromCharCode(
                (codigo - 65 + chave + 26) % 26 + 65
            );
        }

        if (codigo >= 97 && codigo <= 122) {
            return String.fromCharCode(
                (codigo - 97 + chave + 26) % 26 + 97
            );
        }

        return letra;
    }).join("");
}


/* ALFABETO FONÉTICO */

function codificarFonetico(texto) {
    return texto.toUpperCase().split("").map(letra => {
        if (letra === " ") return "/";
        return fonetico[letra] || letra;
    }).join(" ");
}

function decodificarFonetico(texto) {
    let inverso = {};

    for (let letra in fonetico) {
        inverso[fonetico[letra].toUpperCase()] = letra;
    }

    return texto.split(" ").map(palavra => {
        if (palavra === "/") return " ";
        return inverso[palavra.toUpperCase()] || palavra;
    }).join("");
}


/* OUTROS */

function limpar() {
    document.getElementById("entrada").value = "";
    document.getElementById("resultado").value = "";
}

function copiar() {
    navigator.clipboard.writeText(
        document.getElementById("resultado").value
    );
}