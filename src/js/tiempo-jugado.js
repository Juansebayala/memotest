let finTiempoJugado = false;

function manejarTiempoJugado() {
  finTiempoJugado = false;
  const $tiempoJugado = document.querySelector("#tiempo-jugado");
  const tiempoJugado = ["00", "00"];
  const intervaloTiempoJugado = setInterval(function () {
    if (finTiempoJugado) {
      clearInterval(intervaloTiempoJugado);
    } else {
      aumentarTiempoJugado(tiempoJugado);
    }
    $tiempoJugado.textContent = `${tiempoJugado[0]}:${tiempoJugado[1]}`;
  }, 1000);
}

function aumentarTiempoJugado(tiempoJugado) {
  tiempoJugado[1]++;

  if (tiempoJugado[1] < 10) {
    tiempoJugado[1] = "0" + tiempoJugado[1];
  }
  if (tiempoJugado[1] >= 60) {
    tiempoJugado[0]++;
    tiempoJugado[1] = "00";
  }
  if (tiempoJugado[0] < 10 && tiempoJugado[1] === "00") {
    tiempoJugado[0] = "0" + tiempoJugado[0];
  }
}

function agregarTiempoJugadoAMensajeFinal() {
  const $tiempoJugado = document.querySelector("#tiempo-jugado");
  const $tiempoJugadoModal = document.querySelector("#tiempo-jugado-modal");
  $tiempoJugadoModal.textContent = $tiempoJugado.textContent;
}
