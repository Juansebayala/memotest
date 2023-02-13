const $botonJugar = document.querySelector('#jugar');

$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
  manejarTiempoJugado();
  agregarParImagenes();
  manejarRonda();
}

function manejarTiempoJugado() {
  const $tiempoJugado = document.querySelector('#tiempo-jugado');
  const tiempoJugado = ['00', '00'];
  setInterval(function() {
    tiempoJugado[1]++;
    if (tiempoJugado[1] < 10) {
      tiempoJugado[1] = '0' + tiempoJugado[1];
    }
    if (tiempoJugado[1] >= 60) {
      tiempoJugado[0]++;
      tiempoJugado[1] = '00';
    }
    if (tiempoJugado[0] < 10 && tiempoJugado[1] === '00') {
      tiempoJugado[0] = '0' + tiempoJugado[0];
    }
    $tiempoJugado.textContent = `${tiempoJugado[0]}:${tiempoJugado[1]}`;
  }, 1000);
}

function agregarParImagenes() {
  const contadorImagenes = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
    10: '',
    11: '',
    12: ''
   };
  const $imgCartas = document.querySelectorAll('.carta .reverso');
  for (let i = 0; i < $imgCartas.length; i++) {
    const $imagenAleatoria = conseguirImagenAleatoria(contadorImagenes);
    $imgCartas[i].src = 'src/img/' + $imagenAleatoria;
  }
}

function conseguirImagenAleatoria(contadorImagenes) {
  const imagenes = {
    1: 'csharp-logo.png',
    2: 'go-logo.png',
    3: 'java-logo.png',
    4: 'javascript-logo.png',
    5: 'kotlin-logo.png',
    6: 'php-logo.png',
    7: 'postgresql-logo.png',
    8: 'python-logo.png',
    9: 'react-logo.png',
    10: 'ruby-logo.png',
    11: 'swift-logo.png',
    12: 'typescript-logo.png'
  }

  const indiceAleatorio = Math.floor(Math.random() * 12);
  const imagenAleatoria = Object.values(imagenes)[indiceAleatorio];
  hayMasDeUnaRepetida = comprobarImagenesRepetidas(indiceAleatorio, imagenAleatoria, contadorImagenes);

  if (hayMasDeUnaRepetida) {
    return conseguirImagenAleatoria(contadorImagenes);
  }

  return imagenAleatoria;

}
//cambiar nombres de variables
function comprobarImagenesRepetidas(numeroImagen, referenciaImagen, imagenes) {
  const $imgCartas = document.querySelectorAll('.carta .reverso');
  if (Object.values(imagenes)[numeroImagen] === '1') {
    return true;
  }

  for (let i = 0; i < $imgCartas.length; i++) {
    if ($imgCartas[i].src.includes(referenciaImagen)) {
      imagenes[numeroImagen + 1] = '1';
    }
  }
}

let cartasSeleccionadas = [];
const paresEncontrados = [];

function manejarRonda() {
  const $cartas = document.querySelectorAll('.carta');
  $cartas.forEach(function($carta) {
    $carta.onclick = manejarCartas;
  });
}

function manejarCartas(event) {
  $cartas = document.querySelectorAll('.carta');
  const cartaSeleccionada = event.target.parentNode;
  cartasSeleccionadas.push(cartaSeleccionada);
  console.log(cartaSeleccionada.childNodes[1].src);
  revelarImagenCarta(cartaSeleccionada);
  if (cartasSeleccionadas.length === 2) {
    comprobarParCartas(cartasSeleccionadas);
  }
  if (paresEncontrados.length === 12) {
    mostrarMensajeJuegoGanado();
  }
}

function mostrarMensajeJuegoGanado() {
  $('#modal-juego-ganado').modal('show');
}

function revelarImagenCarta(carta) {
  carta.childNodes[1].style.opacity = '1';
}

function comprobarParCartas(cartas) {
  const imagenPrimeraCarta = cartas[0].childNodes[1].src;
  const imagenSegundaCarta = cartas[1].childNodes[1].src
  if (imagenPrimeraCarta === imagenSegundaCarta) {
    setTimeout(function() {
      ocultarParCartas(cartas[0], cartas[1]);
    }, 800);
    setTimeout(function() {
      desabilitarParCartas(cartas[0], cartas[1]);
    }, 1600);
    paresEncontrados.push(imagenPrimeraCarta);
  } else {
    setTimeout(function() {
      ocultarImagenesParCartas(cartas[0], cartas[1]);
    }, 800);
  }
  vaciarCartasSeleccionadas()
}

function ocultarParCartas(primeraCarta, segundaCarta) {
  primeraCarta.style.opacity = '0';
  segundaCarta.style.opacity = '0';
}

function desabilitarParCartas(primeraCarta, segundaCarta) {
  primeraCarta.style.visibility = 'hidden';
  segundaCarta.style.visibility = 'hidden';
}

function ocultarImagenesParCartas(primeraCarta, segundaCarta) {
  primeraCarta.childNodes[1].style.opacity = '0';
  segundaCarta.childNodes[1].style.opacity = '0';
}

function vaciarCartasSeleccionadas() {
  cartasSeleccionadas = [];
}
