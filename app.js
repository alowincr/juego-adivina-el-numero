// Variables globales
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
const intentosMaximos = 3;

// Reemplaza el texto de un elemento HTML usando un selector y un texto nuevo
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

// Verifica si el número ingresado por el usuario es correcto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    intentos++; // Aumenta el contador en cada intento

    actualizarIntentosRestantes(); // Mostrar intento solo al hacer clic

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('.container__boton').setAttribute('disabled', 'true'); // Desactiva botón "Intentar"
    } else {
        if (intentos >= intentosMaximos) {
            asignarTextoElemento('p', `Se acabaron los intentos. El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('.container__boton').setAttribute('disabled', 'true');
        } else {
            let mensaje = (numeroDeUsuario > numeroSecreto) ? 'El número secreto es menor' : 'El número secreto es mayor';
            asignarTextoElemento('p', mensaje);
            limpiarCaja();
        }
        
    }
}

// Limpia el valor del input para que el usuario pueda ingresar otro número
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Genera un número secreto no repetido entre 1 y numeroMaximo
function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
        return;
    }

    let nuevoNumero = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.includes(nuevoNumero)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(nuevoNumero);
        return nuevoNumero;
    }
}

// Establece las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Bienvenido al Juego del Número Secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}. <br>Tienes ${intentosMaximos} intentos. ¡Buena suerte!</br>`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0; // Comenzamos desde cero
    limpiarCaja();
    document.querySelector('.container__boton').removeAttribute('disabled'); // Habilita el botón "Intentar"

    // Limpia el texto de intentos restantes al iniciar
    document.getElementById('intentosRestantes').innerText = '';
}

// Actualiza el número de intentos restantes (solo se llama cuando el usuario hace clic)
function actualizarIntentosRestantes() {
    const intentosRestantes = intentosMaximos - intentos;
    document.getElementById('intentosRestantes').innerText = `Intento ${intentos} de ${intentosMaximos}`;
}

// Reinicia el juego cuando se presiona el botón
function reiniciarJuego() {
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

// Inicia el juego por primera vez al cargar la página
condicionesIniciales();
