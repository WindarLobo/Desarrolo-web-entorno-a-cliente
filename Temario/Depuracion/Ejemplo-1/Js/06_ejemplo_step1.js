/*
    Lo que ocurre en el paso anterior es que en la iteración del for (en la validación de i<n),
    1 no es menor a 0, por lo que se sale del for y sigue a la siguiente línea de código 
    retornando 7.
        function power(x,n) { // x=7, n=0
            let result = x;
            for (let i=1; i<n; i++){
                result *= x;
            }
            return result;
        }
    Esto pasa porque se está asumiendo que nunca se va a colocar como exponente un 0, 
    porque en la primera linea lo que se está haciendo es asignar el valor del resultado como 
    la base.

    SOLUCIÓN:
*/

function power(x, n) {
  let result = x;
  if (n == 0) result = 1;
  else {
    for (let i = 1; i < n; i++) {
      result *= x;
    }
    return result;
  }
}

console.log("2⁴ = ", power(2, 4), " (esperado 16)");
console.log("3² = ", power(3, 2), " (esperado 9)");
console.log("5² = ", power(5, 2), " (esperado 25)");
console.log("7⁰ = ", power(7, 0), " (esperado 1)");
