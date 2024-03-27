/*
 * Errores de sintaxis
 */

// Nombre de variable con tilde
var numero = 10;

// Error de operador: = es asignación, mientras, == es comparación, y, === es comparación estricta
if (numero == 0) {
  console.log("Cero");
} else if (numero > 0) {
  // Positivo debe de ir entre comillas debido a que es un string y no una variable definida anteriormente
  console.log(Positivo);
} else {
  // `lo` no es un método del objeto `console`, el método deseado en este snippet es `console.log`
  // Este tipo de errores que ocurren al momento de escribir es conocido como un `typo`
  console.lo("Negativo");
}
