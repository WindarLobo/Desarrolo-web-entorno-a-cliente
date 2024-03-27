/*
 * Error lógico
 */

// Función que espera 2 números como parámetros para devolver la suma de ambos
function suma(num1, num2) {
  return num1 + num2;
}

// Imaginemos que el número 1 es 6
var num1 = prompt("Ingrese el número 1");
// Imaginemos que el número 2 es 4
var num2 = prompt("Ingrese el número 2");

var resultado = suma(num1, num2);

// Resultado esperado: 10
// Resultado obtenido: "64"
console.log(resultado);

// El error que ocurre en este snippet es que todo lo que ingresa el usuario mediante un prompt es un string,
// y debemos de considerarlo para obtener el resultado que esperamos.
// En este caso, tend
