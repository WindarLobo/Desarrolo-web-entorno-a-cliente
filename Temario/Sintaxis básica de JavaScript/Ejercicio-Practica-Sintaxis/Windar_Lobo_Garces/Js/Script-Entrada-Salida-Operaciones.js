//1.Convierte el código de javascript en línea por un esquema de código JS externo.
alert("Hola, mundo");

//2.Añade al código la funcionalidad de que cambie la cadena “Hola” de la referencia “parrafo” por una cadena que contenga comillas simples y comillas dobles.*

document.addEventListener("DOMContentLoaded", function () {
  var parrafoElement = document.getElementById("parrafo");
  var nuevaCadena = "'Hola' \"Hola\"";
  parrafoElement.innerHTML = nuevaCadena;
});

// 3.	Coloca en la referencia “operaciones” el resultado de todas las operaciones matemáticas entre los datos constantes 5 y 2.
document.addEventListener("DOMContentLoaded", function () {
  const numero1 = 5;
  const numero2 = 2;
  Operaciones(numero1, numero2, "operaciones1");
});

//4.	Modifica el código para que los datos constantes sean variables y los introduzca el usuario cliente desde el navegador.
document.addEventListener("DOMContentLoaded", function () {
  var numeroUsuario1 = parseFloat(prompt("Ingrese el primer numero:"));
  var numeroUsuario2 = parseFloat(prompt("Ingrese el segundo numero:"));
  Operaciones(numeroUsuario1, numeroUsuario2, "operaciones2");
});

function Operaciones(value1, value2, tag) {
  var Suma = value1 + value2;
  var Resta = value1 - value2;
  var Multiplicación = value1 * value2;
  Division = value2 !== 0 ? value1 / value2 : "No se puede dividir por cero";

  document.getElementById(tag).innerHTML =
    "Suma: " +
    Suma +
    "<br>" +
    "Resta: " +
    Resta +
    "<br>" +
    "Multiplicación: " +
    Multiplicación +
    "<br>" +
    "División: " +
    Division;
}

//5.	Introduce código html a continuación de la cabecera que contiene la cadena “Hasta luego” y que escriba alguna cadena en la consola.
console.log("Hasta luego desde la consola .");
