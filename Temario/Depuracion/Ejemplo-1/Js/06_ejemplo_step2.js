/*
    Lo que ocurre en el paso anterior es que cuando el valor de n es 0, ejecuta la línea del
    "if", pero no la del "else", dejando sin ejecutar la instrucción "return result;".
        function power(x,n) {
            let result=x;
            if(n == 0) result = 1;
            else {
                for (let i=1; i<n; i++) {
                    result *= x;
                }
                return result;
            }
        }
    Al no devolver nada cuando n es 0, el resultado de la función es un valor indefinido.

    SOLUCIÓN:
*/

function power(x, n) {
  let result = x;
  if (n == 0) result = 1;
  else {
    for (let i = 1; i < n; i++) {
      result *= x;
    }
  }
  return result;
}

console.log("2⁴ = ", power(2, 4), " (esperado 16)");
console.log("3² = ", power(3, 2), " (esperado 9)");
console.log("5² = ", power(5, 2), " (esperado 25)");
console.log("7⁰ = ", power(7, 0), " (esperado 1)");
