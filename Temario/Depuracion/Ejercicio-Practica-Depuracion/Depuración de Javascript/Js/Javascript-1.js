/*
1.Ejecuta el siguiente código en tu navegador y depura su funcionamiento, corrigiéndolo si fuera necesario 
 dato1 = window.prompt("Introduce primer número ?", "0");
 num1 = dato1;
 dato2 = window.prompt("Introduce segundo número ?", "0");
 num2 = parseInt(dato2);
 let resultado = num1 + num2;
 document.write(`<br/> <br/> La suma es ${resultado} ` );

*/

//Codigo corregido :

document.addEventListener("DOMContentLoaded", function () {
  // eliminé el espacio antes del signo de interrogación y agrego  parseInt()  para asegurar que se trate de valores numéricos

  let num1 = parseInt(window.prompt("Introduce primer número?", "0"));

  let num2 = parseInt(window.prompt("Introduce segundo número?", "0"));

  Operaciones(num1, num2, "resultado");
});

function Operaciones(num1, num2, tag) {
  let resultado = num1 + num2;

  //Eliminé un espacio antes del resultado en la cadena de salida
  document.getElementById(tag).innerHTML =
    "<br/> <br/>" + "La suma es: " + resultado;
}
