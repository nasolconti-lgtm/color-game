
let cuadrados = document.querySelectorAll(".square");
let botonesModo = document.querySelectorAll(".mode");

let colores;
let colorSecreto;
let cantidadCuadrados = 6;
let juegoTerminado = false;

let colorDisplay = document.querySelector("#colorDisplay");
let mensaje = document.querySelector("#message");
let titulo = document.querySelector("h1");


let botonNuevosColores = document.querySelector("#reset");

// Generar un color RGB aleatorio
function randomColor() {
    let rojo = Math.floor(Math.random() * 256);
    let verde = Math.floor(Math.random() * 256);
    let azul = Math.floor(Math.random() * 256);

    return `rgb(${rojo}, ${verde}, ${azul})`;
}

// Generar colores aleatorios
function generateRandomColors(cantidad) {
    let arregloColores = [];

    for (let i = 0; i < cantidad; i++) {
        arregloColores.push(randomColor());
    }

    return arregloColores;
}

// Elegir un color aleatorio
function pickColor() {
    let indiceAleatorio = Math.floor(Math.random() * colores.length);
    return colores[indiceAleatorio];
}

// Cambiar el color de los cuadrados visibles y del título
function changeColors(color) {
    cuadrados.forEach(function(cuadrado) {
        if (cuadrado.style.display !== "none") {
            cuadrado.style.backgroundColor = color;
            cuadrado.style.opacity = "1";
        }
    });

    titulo.style.backgroundColor = color;
}

// Reiniciar la partida
function reset() {
    colores = generateRandomColors(cantidadCuadrados);
    colorSecreto = pickColor();
    juegoTerminado = false;

    cuadrados.forEach(function(cuadrado, i) {
        if (i < cantidadCuadrados) {
            cuadrado.style.display = "block";
            cuadrado.style.opacity = "1";
            cuadrado.style.backgroundColor = colores[i];
        } else {
            cuadrado.style.display = "none";
            cuadrado.style.opacity = "1";
        }
    });

    colorDisplay.textContent = colorSecreto;
    mensaje.textContent = "";
    botonNuevosColores.textContent = "New Colors";
    titulo.style.backgroundColor = "steelblue";
}

// Configurar los eventos del juego
function init() {
    // Eventos de los cuadrados
    cuadrados.forEach(function(cuadrado) {
        cuadrado.addEventListener("click", function() {
            if (juegoTerminado || cuadrado.style.display === "none") {
                return;
            }

            let colorElegido = cuadrado.style.backgroundColor;

            if (colorElegido === colorSecreto) {
                mensaje.textContent = "Correct!";
                botonNuevosColores.textContent = "Play Again?";
                juegoTerminado = true;

                changeColors(colorSecreto);
            } else {
                cuadrado.style.opacity = "0";
                mensaje.textContent = "Try Again";
            }
        });
    });

    // Botón Nuevos Colores
    botonNuevosColores.addEventListener("click", function() {
        reset();
    });

    // Eventos compartidos para EASY y HARD
    botonesModo.forEach(function(boton) {
        boton.addEventListener("click", function() {
            botonesModo.forEach(function(b) {
                b.classList.remove("selected");
            });

            boton.classList.add("selected");

            cantidadCuadrados = boton.id === "easy" ? 3 : 6;

            reset();
        });
    });

    // Iniciar la primera partida
    reset();
}

// Ejecutar la configuración inicial
init();




