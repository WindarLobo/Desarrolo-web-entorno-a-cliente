/* 1.	El factorial de un número entero n es una operación matemática que consiste en multiplicar 
todos los factores n! = n · (n-1) · (n-2) · ... · 1. Con la estructura for, 
crea el código que calcule el factorial de un entero que introducimos por pantalla.*/

var numero = parseInt(
  prompt("Ingrese un numero para poder calcular el factorial :")
);
var factorial = 1;

if (Number.isInteger(numero) && numero >= 0) {
  for (var i = 1; i <= numero; i++) {
    factorial *= i;
  }
  console.log("El factorial de " + numero + " es: " + factorial);
} else {
  console.log("Por favor, ingrese un número entero no negativo.");
}

//2.Crea el código en Javascript que imprima los múltiplos de 5 hasta 200 con while y do-while.

// múltiplos de 5 hasta 200 con while.
numero = 1;
console.log("con while");
while (numero <= 200) {
  Multiplo(numero);
  numero += 1;
}

// múltiplos de 5 hasta 200 con do-while.
numero = 1;
console.log("con dowhile");
do {
  Multiplo(numero);
  numero += 1;
} while (numero <= 200);

function Multiplo(numero) {
  if (numero % 5 === 0) {
    console.log(numero);
  }
}

/*3.	Escribe el código de una función a la que se le pasa un 
entero como parámetro y devuelve una cadena de texto que indica si el número es par o impar. */
function Resultado(numero) {
  if (numero % 2 === 0) {
    return "El número es par";
  } else {
    return "El número es impar";
  }
}
var numero = parseInt(
  prompt("Ingrese un numero para indicar si el numero es par o impar :")
);
var resultado = Resultado(numero);
console.log(Resultado(numero));

/*4.	Haz un programa donde se introduzca la hora en el formato de 0 a 24
 y el programa responda con “Buenos días”, “Buenas tardes” y “Buenas noches”.*/

function determinarHora(hora) {
  switch (true) {
    case hora >= 0 && hora < 12:
      return "Buenos días";

    case hora >= 12 && hora < 18:
      return "Buenas tardes";

    default:
      return "Buenas noches";
  }
}

var horaUsuario = parseInt(prompt("Introduce la hora (formato de 0 a 24):"));
var saludo = determinarHora(horaUsuario);
console.log(saludo);

/* 5.	Se introducen tres calificaciones de un estudiante, si el promedio es mayor o igual a siete,
 se muestra el mensaje "Promocionado". De lo contrario, debería mostrar “Repetir” en la pantalla.*/

var nota1 = parseFloat(prompt("Introduce la primera calificación:"));
var nota2 = parseFloat(prompt("Introduce la segunda calificación:"));
var nota3 = parseFloat(prompt("Introduce la tercera calificación:"));
var n = 3;
var notaPromocionado = 7;

var promedio = (nota1 + nota2 + nota3) / n;

if (promedio >= notaPromocionado) {
  console.log("Promocionado");
} else {
  console.log("Repetir");
}

// 6.	Crea una función a la que envíes tres números enteros y los muestre después en orden de menor a mayor.

function mostrarOrdenados(num1, num2, num3) {
  var numeros = [num1, num2, num3];

  numeros.sort(function (a, b) {
    return a - b;
  });

  console.log("Números ordenados de menor a mayor: " + numeros.join(","));
}
var numero1 = parseInt(prompt("Ingrese el primer número entero:"));
var numero2 = parseInt(prompt("Ingrese el segundo número entero:"));
var numero3 = parseInt(prompt("Ingrese el tercer número entero:"));

mostrarOrdenados(numero1, numero2, numero3);
