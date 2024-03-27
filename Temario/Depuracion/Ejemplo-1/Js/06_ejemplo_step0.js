/*
    EJEMPLO:
    Vamos a depurar una función que realiza la operación power(X,N) = X^N.
    Resultados previsibles:
        power(2,4) = 16
        power(3,2) = 9
        power(5,2) = 25
        power(7,0) = 1
*/

function power(x, n) {
  let result = x;
  for (let i = 1; i < n; i++) {
    result *= x;
  }
  return result;
}

// Las funciones las podemos ejecutar directamente desde la consola: power(2,3) + ENTER.
console.log("2⁴ = ", power(2, 4), " (esperado 16)");
console.log("3² = ", power(3, 2), " (esperado 9)");
console.log("5² = ", power(5, 2), " (esperado 25)");
console.log("7⁰ = ", power(7, 0), " (esperado 1)");
