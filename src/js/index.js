const $botonJugar = document.querySelector('#jugar');

$botonJugar.onclick = comenzarJuego;

function comenzarJuego() {
  manejarTiempoJugado()
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