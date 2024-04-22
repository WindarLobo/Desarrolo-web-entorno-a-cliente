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

//Solucion

/* Apartado 1 : Tras la carga de la página, se recuperará de la memoria local (localStorage)
 la clasificación general del juego. Esta clasificación es un array de objetos guardados en la clave “clasificación”
  con los campos nombre, dni y puntuación. En caso de no existir la clasificación en memoria local, 
se cargará la clasificacion_por_defecto definida en el código facilitado.*/

//Carga la pagina
window.onload = () => {
  boton_jugar.addEventListener("click", validar);
  boton_finalizar.addEventListener("click", finalizar);
};

var clasificación = JSON.parse(localStorage.getItem("clasificación"));
if (clasificación != null) clasificación;
else clasificación = clasificacion_por_defecto;

/* Apartado 2 : Cuando se pulsa el botón btn-jugar, se comprobará que el campo “nombre”
 contiene alguna cadena y además no contenga espacios.
  En caso contrario, deberá indicar los errores correspondientes en el elemento “errores”.*/

function validarNombre() {
  var nombre = String(form_nombre.value);
  if (nombre === "") {
    form_errores.innerHTML += "<br>El nombre es obligatorio.";
    return false;
  } else if (nombre.includes(" ")) {
    form_errores.innerHTML +=
      "<br>El nombre  no puede contener espacios en blanco.";

    return false;
  }
  return true;
}
/*Aparatado 3 :Cuando se pulsa el botón btn-jugar, se comprobará que el campo “dni” 
contiene una cadena de 8 cifras seguidas de 1 letra mayúscula.
 En caso contrario, deberá indicar el error correspondiente en el elemento “errores”. */
function validarDni() {
  var dni = form_dni.value;
  var dniRegExp = /^[0-9]{8}[A-Z]{1}$/.test(dni);
  if (!dniRegExp) {
    form_errores.innerHTML +=
      "<br>El dni tiene que contener 8 cifras y seguida de una letra mayuscula.";
    return false;
  }
  return true;
}
// Apartado 4 :
function validar(e) {
  // Eliminar mensajes anteriores
  form_errores.innerHTML = "";
  form_errores.style.display = "none";
  if (validarNombre() && validarDni()) {
    //Apartado 5
    iniciaJuego();

    return true;
  } else {
    // Evitar envío de formulario
    form_errores.style.display = "block";
    e.preventDefault();
    return false;
  }
}
/*Cuando se lanza el juego (además de lo indicado en (5)), 
se comienza una cuenta atrás de minuto y medio que será visible
 hasta que finalice en la etiqueta HTML "temporizador" y con formato mm:ss. */
// Tiempo en segundos para el temporizador (1 minuto y medio)

var tiempoInicial = 90 * 1000;
var distance = tiempoInicial;

var x = setInterval(function () {
  // Calcular minutos y segundos
  var mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var ss = Math.floor((distance % (1000 * 60)) / 1000);

  // Formatear el tiempo en minutos y segundos
  var tiempoFormateado = mm + " : " + ss;

  // Actualizar el temporizador en el HTML
  temporizador.innerHTML = tiempoFormateado;

  // Reducir el tiempo restante en 1 segundo
  distance -= 1000;

  // Si el tiempo llega a cero, detener el temporizador
  if (distance < 0) {
    clearInterval(x);
    temporizador.innerHTML = "EXPIRED";
  }
}, 1000);

/* Apartado 8 : Programar el manejador de eventos que identificará en qué cuadro del panel se
 ha pulsado con el ratón y llevará la cuenta de los clicks de cada
  cuadro en el array ya definido en el código Javascript facilitado como contadorCuadros. */

function clickEvento() {
  for (let i = 0; i < cuadro_btns.length; i++) {
    // Agregar clase al cuadro clicado
    cuadro_btns.classList.add("cuadro-scored");

    // Obtener el recuento de clics para el cuadro clicado
    const contador = contadorCuadros[i] || 0;

    // Actualizar la puntuación
    puntuacion += contador;
  }
}

/*Programar la función ordenaClasificacion para introducir 
los datos del jugador (campos “nombre”, “dni” y la variable ”puntuacion”) 
en el orden que le corresponde de la clasificación cargada en el primer apartado.
 Hay que tener en cuenta que si el DNI ya se encuentra en la clasificación,
 la puntuación sólo ha de actualizarse si se supera. Además,
se rellenará la tabla tabla-clasificacion con los 10 primeros clasificados. */

function ordenaClasificacion() {
  clasificación.push({
    nombre: form_nombre.value,
    dni: form_dni.value,
    puntuacion: puntuacion,
  });

  clasificación.sort((a, b) => a.puntuacion - b.puntuacion);
  tabla_clasificacion.innerHTML = "";
  tabla_clasificacion.innerHTML +=
    "<tr><th>NOMBRE</th><th>DNI</th><th>PUNTUACION</th>";
  for (let i = 0; i < clasificación.length; i++) {
    if (i < 10)
      tabla_clasificacion.innerHTML +=
        "</td><td>" +
        clasificación[i].nombre +
        "</td><td>" +
        clasificación[i].dni +
        "</td><td>" +
        clasificación[i].puntuacion;
    else break;
  }
}

function finalizar() {
  localStorage.setItem("clasificación", JSON.stringify(clasificación));
  inicioAplicacion();
}
