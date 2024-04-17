// Elementos DOM

const pantallas_juego = document.querySelectorAll(".pantalla-juego");
const form_nombre = document.getElementById("nombre");
const form_dni = document.getElementById("dni");
const form_errores = document.getElementById("errores");
const boton_jugar = document.getElementById("btn-jugar");
const temporizador = document.getElementById("temporizador");
const cuadro_btns = document.querySelectorAll(".cuadro");
const score = document.getElementById("score");
const tabla_clasificacion = document.getElementById("tabla-clasificacion");
const boton_finalizar = document.getElementById("btn-finalizar");

// Clasificación inicial de jugadores
const clasificacion_por_defecto = [
  { nombre: "Juan", dni: "12345678A", puntuacion: 15 },
  { nombre: "Pedro", dni: "87654321B", puntuacion: 8 },
  { nombre: "Jose", dni: "22233344C", puntuacion: 1 },
];

// Visualización de pantallas de juego
function visualiza_pantalla(num_pantalla) {
  for (let i = 0; i < pantallas_juego.length; i++) {
    if (num_pantalla == i) pantallas_juego[i].style.display = "flex";
    else pantallas_juego[i].style.display = "none";
  }
}

// Funciones de control del juego
//window.addEventListener("load", inicioAplicacion);
function inicioAplicacion() {
  // Eliminar datos del formulario de datos del nuevo jugador
  form_nombre.value = "";
  form_dni.value = "";
  visualiza_pantalla(0);
}
let contadorCuadros = new Array(cuadro_btns.length);
let puntuacion = 0;
function iniciaJuego() {
  contadorCuadros.fill(0);
  puntuación = 0;
  for (let i = 0; i < cuadro_btns.length; i++) {
    // Vaciamos cuadro
    cuadro_btns[i].innerHTML = "";
    // Quitamos color de cuadro
    cuadro_btns[i].classList.remove("cuadro-scored");
    cuadro_btns[i].classList.remove("cuadro-not-scored");
    cuadro_btns[i].classList.add("cuadro");
  }
  score.innerHTML = "";
  visualiza_pantalla(1);
}
function finJuego() {
  for (let i = 0; i < cuadro_btns.length; i++) {
    // Reflejamos el número de clicks en cada cuadro
    cuadro_btns[i].innerHTML = contadorCuadros[i];
    // Coloreamos cuadro y sumamos/restamos en función de si el cuadro está repetido en todo el panel
    cuadro_btns[i].classList.remove("cuadro");
    if (
      contadorCuadros.filter((cuadro) => cuadro == contadorCuadros[i]).length >
      1
    ) {
      cuadro_btns[i].classList.add("cuadro-scored");
      puntuacion += contadorCuadros[i];
    } else {
      cuadro_btns[i].classList.add("cuadro-not-scored");
      puntuacion -= contadorCuadros[i];
    }
  }
  score.innerHTML = "PUNTUACIÓN FINAL : " + puntuacion.toString();
  setTimeout(verClasificacion, 5000);
}
function verClasificacion() {
  visualiza_pantalla(2);
  ordenaClasificacion();
}

// SOLUCIÓN
// Evento carga de página
window.addEventListener("load", inicio);
// Manejadores de eventos
function inicio() {
  boton_jugar.addEventListener("click", validarJugador);
  boton_finalizar.addEventListener("click", resetJuego);
}

// Apartado 1
let clasificacion = localStorage.getItem("clasificacion");
if (clasificacion != null) clasificacion = JSON.parse(clasificacion);
else clasificacion = clasificacion_por_defecto;

// Apartado 2
function validaNombre() {
  let nombre = String(form_nombre.value);
  if (nombre.includes(" ")) {
    form_errores.innerHTML += "<li>El nombre no puede incluir espacios</li>";
    return false;
  } else if (nombre == "") {
    form_errores.innerHTML += "<li>El nombre es obligatorio</li>";
    return false;
  }
  return true;
}

// Apartado 3
function validaDNI() {
  let dni = form_dni.value;
  let valido = /^[0-9]{8}[A-Z]{1}$/.test(dni);
  if (!valido) {
    form_errores.innerHTML +=
      "<li>El DNI debe contener 8 cifras seguidas de 1 letra mayúscula</li>";
  }
  return valido;
}

// Apartado 4
function validarJugador(e) {
  // Eliminar mensajes anteriores y ocultamos el cuadro
  form_errores.innerHTML = "";
  form_errores.style.display = "none";
  let nombreValidado = validaNombre();
  let dniValidado = validaDNI();
  // Validación
  if (nombreValidado && dniValidado) {
    lanzaJuego();
    return true;
  } else {
    // mostramos cuadro de errores
    form_errores.style.display = "block";
    // evitamos envío de formulario
    e.preventDefault();
    return false;
  }
}

// Apartado 5
let mm = 1,
  ss = 30;
let intervalManager;
function lanzaJuego() {
  mm = 1;
  ss = 30;
  iniciaJuego();
  printTimer(mm, ss);
  intervalManager = setInterval(handleTimer, 1000);
  activaCuentaClicks();
}
function printTimer(m, s) {
  temporizador.innerHTML =
    String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function handleTimer() {
  if (ss == 0) {
    if (mm == 0) {
      endTimer();
      return;
    } else {
      mm--;
      ss = 59;
    }
  } else ss--;
  printTimer(mm, ss);
}

// Apartado 7
function activaCuentaClicks() {
  for (let cuadro_btn of cuadro_btns)
    cuadro_btn.addEventListener("click", cuentaClick);
}
function desactivaCuentaClicks() {
  for (let cuadro_btn of cuadro_btns)
    cuadro_btn.removeEventListener("click", cuentaClick);
}

// Apartado 8
function cuentaClick(evento) {
  for (let i = 0; i < cuadro_btns.length; i++) {
    if (cuadro_btns[i] == evento.target) {
      contadorCuadros[i]++;
      break;
    }
  }
}

// Apartado 9
function endTimer() {
  clearInterval(intervalManager);
  desactivaCuentaClicks();
  finJuego();
}

// Apartado 10
function ordenaClasificacion() {
  // Introducimos nueva puntuación o actualizamos (si se supera la puntuación)
  let jugadorIndex = clasificacion.findIndex(
    (elemento) => elemento.dni == form_dni.value
  );
  if (jugadorIndex < 0)
    clasificacion.push({
      nombre: form_nombre.value,
      dni: form_dni.value,
      puntuacion: puntuacion,
    });
  else if (clasificacion[jugadorIndex].puntuacion < puntuacion)
    clasificacion[jugadorIndex].puntuacion = puntuacion;
  // Ordenamos clasificación
  clasificacion.sort(function (a, b) {
    return b.puntuacion - a.puntuacion;
  });
  // Rellenamos la tabla con los 10 primeros clasificados
  tabla_clasificacion.innerHTML = "";
  tabla_clasificacion.innerHTML +=
    "<tr><th>PUESTO</th><th>NOMBRE</th><th>DNI</th><th>PUNTUACIÓN</th></tr>";
  for (let i = 0; i < clasificacion.length; i++) {
    if (i < 10)
      tabla_clasificacion.innerHTML +=
        "<tr><td>" +
        (i + 1) +
        "º</td><td>" +
        clasificacion[i].nombre +
        "</td><td>" +
        clasificacion[i].dni +
        "</td><td>" +
        clasificacion[i].puntuacion +
        "</td></tr>";
    else break;
  }
}

// Apartado 11
function resetJuego() {
  localStorage.setItem("clasificacion", JSON.stringify(clasificacion));
  inicioAplicacion();
}
