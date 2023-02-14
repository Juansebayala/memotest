const $botonesReiniciar = document.querySelectorAll('.volver-a-empezar');

$botonesReiniciar.forEach(function($boton){
  $boton.onclick = resetearJuego;
});

function resetearJuego() {
  resetearTiempoJugado();
  resetearIntentosRealizados();
  $cartas = document.querySelectorAll('.carta');
  mostrarCartas($cartas);
  desabilitarClicCartas($cartas);
  habilitarBotonJugar();
}

function mostrarCartas($cartas) {
  $cartas.forEach(function($carta) {
    ocultarImagenCarta($carta);
    setTimeout(function() {
      $carta.style.opacity = '1';
      $carta.style.visibility = 'visible';
    }, 300);
  });
}

function ocultarImagenCarta($carta) {
  const $imagenCarta = $carta.childNodes[1];
  $imagenCarta.style.opacity = "0";
}

function desabilitarClicCartas($cartas) {
  $cartas.forEach(function($carta) {
    $carta.onclick = function() {};
  })
}

function resetearTiempoJugado() {
  finTiempoJugado = true;
  const RETRASO_PARAR_TIEMPO = 700;
  setTimeout(function() {
    document.querySelector("#tiempo-jugado").textContent = '00:00';
  }, RETRASO_PARAR_TIEMPO);
}

function resetearIntentosRealizados() {
  intentosRealizados = 0;
  document.querySelector("#intentos").textContent = '0';
}

function habilitarBotonJugar() {
  $botonJugar.onclick = comenzarJuego;
}
