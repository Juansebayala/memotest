const $botonJugar = document.querySelector("#jugar");

$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
  paresEncontrados = [];
  vaciarImagenesCartas();
  desabilitarBotonJugar();
  manejarTiempoJugado();
  agregarParImagenes();
  manejarRonda();
}

function agregarParImagenes() {

  const contadorImagenes = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
  };

  const $imgCartas = document.querySelectorAll(".carta .reverso");
  for (let i = 0; i < $imgCartas.length; i++) {
    const $imagenAleatoria = conseguirImagenAleatoria(contadorImagenes);
    $imgCartas[i].src = "src/img/" + $imagenAleatoria;
  }
}

function vaciarImagenesCartas() {
  const $imagenesCartas = document.querySelectorAll('.reverso');
  $imagenesCartas.forEach(function($imagen) {
    $imagen.setAttribute("src", "");
  });
}

function conseguirImagenAleatoria(contadorImagenes) {
  const imagenes = {
    1: "csharp-logo.png",
    2: "go-logo.png",
    3: "java-logo.png",
    4: "javascript-logo.png",
    5: "kotlin-logo.png",
    6: "php-logo.png",
    7: "postgresql-logo.png",
    8: "python-logo.png",
    9: "react-logo.png",
    10: "ruby-logo.png",
    11: "swift-logo.png",
    12: "typescript-logo.png",
  };

  const indiceAleatorio = Math.floor(Math.random() * 12);
  const imagenAleatoria = Object.values(imagenes)[indiceAleatorio];
  hayMasDeUnaRepetida = comprobarImagenesRepetidas(
    indiceAleatorio,
    imagenAleatoria,
    contadorImagenes
  );

  if (hayMasDeUnaRepetida) {
    return conseguirImagenAleatoria(contadorImagenes);
  }

  return imagenAleatoria;
}
//cambiar nombres de variables
function comprobarImagenesRepetidas(numeroImagen, referenciaImagen, imagenes) {
  const $imgCartas = document.querySelectorAll(".carta .reverso");
  if (Object.values(imagenes)[numeroImagen] === true) {
    return true;
  }

  for (let i = 0; i < $imgCartas.length; i++) {
    if ($imgCartas[i].src.includes(referenciaImagen)) {
      imagenes[numeroImagen + 1] = true;
    }
  }
}

let cartasSeleccionadas = [];
let paresEncontrados = [];
let intentosRealizados = 0;

function manejarRonda() {
  const $cartas = document.querySelectorAll(".carta");
  $cartas.forEach(function ($carta) {
    $carta.onclick = manejarCartas;
  });
}

function manejarCartas(event) {
  const sonidoSeleccionCarta = new Audio('src/audios/seleccionar-carta.mp3');
  sonidoSeleccionCarta.play();
  $cartas = document.querySelectorAll(".carta");
  const $cartaSeleccionada = event.target.parentNode;
  if (cartasSeleccionadas[0] != $cartaSeleccionada) {
    cartasSeleccionadas.push($cartaSeleccionada);
  }
  revelarImagenCarta($cartaSeleccionada);
  if (cartasSeleccionadas.length === 2) {
    manejarIntentosRealizados();
    comprobarParCartas(cartasSeleccionadas);
  }
  if (paresEncontrados.length === 12) {
    const sonidoJuegoGanado = new Audio('src/audios/juego-ganado.mp3');
    sonidoJuegoGanado.play();
    mostrarMensajeJuegoGanado();
    finTiempoJugado = true;
    agregarTiempoJugadoAMensajeFinal();
    agregarIntentosRealizadosAMensjeFinal();
    paresEncontrados = [];
  }
}

function revelarImagenCarta(carta) {
  carta.childNodes[1].style.opacity = "1";
}

function manejarIntentosRealizados() {
  const $intentos = document.querySelector("#intentos");
  intentosRealizados++;
  $intentos.textContent = intentosRealizados;
}

function comprobarParCartas(cartas) {
  const imagenPrimeraCarta = cartas[0].childNodes[1].src;
  const imagenSegundaCarta = cartas[1].childNodes[1].src;
  if (imagenPrimeraCarta === imagenSegundaCarta) {
    const sonidoParEncontrado = new Audio('src/audios/par-encontrado.mp3');
    sonidoParEncontrado.play();
    desabilitarClicCartasSeleccionadas();
    setTimeout(function () {
      ocultarParCartas(cartas[0], cartas[1]);
    }, 800);
    setTimeout(function () {
      desabilitarParCartas(cartas[0], cartas[1]);
    }, 1600);
    paresEncontrados.push(imagenPrimeraCarta);
  } else {
    setTimeout(function () {
      ocultarImagenesParCartas(cartas[0], cartas[1]);
    }, 800);
  }
  vaciarCartasSeleccionadas();
}

function ocultarParCartas(primeraCarta, segundaCarta) {
  primeraCarta.style.opacity = "0";
  segundaCarta.style.opacity = "0";
}

function desabilitarParCartas(primeraCarta, segundaCarta) {
  primeraCarta.style.visibility = "hidden";
  segundaCarta.style.visibility = "hidden";
}

function ocultarImagenesParCartas(primeraCarta, segundaCarta) {
  primeraCarta.childNodes[1].style.opacity = "0";
  segundaCarta.childNodes[1].style.opacity = "0";
}

function vaciarCartasSeleccionadas() {
  cartasSeleccionadas = [];
}

function desabilitarClicCartasSeleccionadas() {
  cartasSeleccionadas.forEach(function ($carta) {
    $carta.onclick = function () {};
  });
}

function mostrarMensajeJuegoGanado() {
  $("#modal-juego-ganado").modal("show");
}

function desabilitarBotonJugar() {
  $botonJugar.onclick = function () {};
}

function agregarIntentosRealizadosAMensjeFinal() {
  const $intetos = document.querySelector("#intentos");
  const $intentosModal = document.querySelector("#intentos-modal");
  $intentosModal.textContent = $intetos.textContent;
}
