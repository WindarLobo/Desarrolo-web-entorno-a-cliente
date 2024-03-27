window.onload = function () {
  document
    .getElementById("botonAceptar")
    .addEventListener("click", habilitarBoton);
  iniciarJuego();
};

/*Implementa un formulario que muestre un checkbox para “Confirmar los términos y condiciones"
 que cuando se tilda, se activa un botón para aceptarlos. (Pistas: elementoBoton.disabled = true/false;
  html checkbox: <input type="checkbox">)
 */
function habilitarBoton() {
  var checkbox = document.getElementById("terminos");
  var botonAceptar = document.getElementById("botonAceptar");
  // Habilito el botón si el checkbox está marcado, de lo contrario, deshabilita
  botonAceptar.disabled = !checkbox.checked;
}

/*	Implementar un tablero de TaTeTi según el código html que se muestra a continuación. 
Asociar el evento click de los 9 botones a una única función. Alternar entre las "X" y "O". 
Mostrar un mensaje cuando gana un jugador.
*/
function iniciarJuego() {
  let jugadorActual = "X";
  let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function botonClic(botonId) {
    let boton = document.getElementById(botonId);
    if (boton.value === " ") {
      boton.value = jugadorActual;

      //Actualizo el tablero
      let fila = Math.floor((botonId.charAt(5) - 1) / 3);
      let columna = (botonId.charAt(5) - 1) % 3;
      tablero[fila][columna] = jugadorActual;
      if (verificarGanador(jugadorActual)) {
        alert("¡El jugador " + jugadorActual + " ha ganado!");

        //Reinicio el juego
        jugadorActual = "X";
        tablero = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
        let botones = document.getElementsByClassName("boton");
        for (let boton of botones) {
          boton.value = " ";
        }
      } else {
        jugadorActual = jugadorActual === "X" ? "O" : "X";
      }
    }
  }

  function verificarGanador(jugador) {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
      if (
        tablero[i][0] === jugador &&
        tablero[i][1] === jugador &&
        tablero[i][2] === jugador
      ) {
        return true;
      }
    }
    // Verificar columnas
    for (let j = 0; j < 3; j++) {
      if (
        tablero[0][j] === jugador &&
        tablero[1][j] === jugador &&
        tablero[2][j] === jugador
      ) {
        return true;
      }
    }
    // Verificar diagonales
    if (
      (tablero[0][0] === jugador &&
        tablero[1][1] === jugador &&
        tablero[2][2] === jugador) ||
      (tablero[0][2] === jugador &&
        tablero[1][1] === jugador &&
        tablero[2][0] === jugador)
    ) {
      return true;
    }
    return false;
  }
  // Asocio evento clic a los botones
  let botones = document.getElementsByClassName("boton");
  for (let boton of botones) {
    boton.addEventListener("click", function () {
      botonClic(boton.id);
    });
  }
}
