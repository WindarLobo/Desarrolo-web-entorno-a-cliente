//1.	Define una función que muestre información sobre una cadena de texto que se le pasa como argumento:

function cadenaDeTexto(texto) {
  /*a.	A partir de la cadena que se le pasa, la función determina
 si esa cadena distingue entre mayúsculas y minúsculas, o una combinación de ambas. */

  if (texto == texto.toLowerCase()) {
    console.log("Es minucula");
  }
  if (texto == texto.toUpperCase()) {
    console.log("Es mayuscula");
  } else {
    console.log("Es la convinacion de ambas");
  }

  /*b.	A partir de la cadena que se le pasa, la función determina si es un palíndromo, es decir, si se lee de la misma manera de
   izquierda a derecha. Ejemplo de palíndromo complejo: "La ruta nos aportó otro paso natural"*/

  const textoSinEspacios = texto.replace(/[^a-zA-Z]/g, "").toLowerCase();
  const textoInvertida = textoSinEspacios.split("").reverse().join("");

  if (textoSinEspacios === textoInvertida) {
    console.log("La cadena es un palíndromo.");
  } else {
    console.log("La cadena no es un palíndromo.");
  }
}

const cadenaEjemplo = "La ruta nos aportó otro paso natural";
cadenaDeTexto(cadenaEjemplo);

/*2.	Crea una función que pida una palabra al usuario y utilizando un bucle for y el método charAt,
 muestre cada una de las letras que componen la entrada. Por ejemplo: si pones "pepito", se mostrará lo siguiente: */
function palabra() {
  var palabraIntroducida = prompt("Ingrese una palabra");
  if (palabraIntroducida === null || palabraIntroducida === "") {
    console.log("No se introdujo ninguna palabra.");
    return;
  }
  var resultado = "";
  for (var i = 0; i <= palabraIntroducida.length; i++) {
    if (i !== 6) {
      resultado +=
        "Letra " + (i + 1) + ": " + palabraIntroducida.charAt(i) + "\n";
    }
  }
  alert(resultado);
}

palabra();

/*3.	Introduce un número positivo de uno o dos dígitos (1..99) 
y haz que se muestre un mensaje que indique si el número tiene uno o dos dígitos. Ten en cuenta que se debe 
cumplir la condición para tener dos dígitos, que sea un número entero inferior a 100. (Pista: parseInt) */

function numeroPositivo() {
  var num;

  do {
    var numeroIntroducido = prompt(
      "Introduce un número positivo de uno o dos dígitos:"
    );

    num = parseInt(numeroIntroducido);

    if (isNaN(num) || num <= 0 || num > 99) {
      alert("Por favor, Introduce un numero positivo de  uno o dos digito");
    }
  } while (isNaN(num) || num <= 0 || num > 99);

  if (num >= 10 && num <= 99) {
    alert("El numero " + num + " Tiene dos digitos.");
  } else {
    alert("El numero " + num + " Tiene un  digito.");
  }
}
numeroPositivo();

/* 4.	Desarrolla un programa que te permita cargar 5 enteros en una
 cadena de texto separadas por comas y luego informar de cuántos valores son pares y cuántos impares. Usa un array.*/

function contarParesImpares() {
  var numeros;
  do {
    var cadenaNumeros = prompt("Introduce 5 enteros separados por comas:");

    // Convierto la cadena a un array de números

    numeros = cadenaNumeros.split(",").map(function (numero) {
      return parseInt(numero.trim());
    });

    // Verifico  si la entrada es válida

    if (numeros.length !== 5 || numeros.some(isNaN)) {
      alert("Por favor, introduce 5 enteros válidos separados por comas.");
    }
  } while (numeros.length !== 5 || numeros.some(isNaN));

  var pares = 0;
  var impares = 0;

  for (var i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
      pares++;
    } else {
      impares++;
    }
  }

  alert(
    "Número de valores pares: " +
      pares +
      "\nNúmero de valores impares: " +
      impares
  );
}

contarParesImpares();

/*5.	Escribir un script que simule el lanzamiento de dos dados. 
Hacer uso de la función Math.random para obtener números aleatorios entre 1 y 6 para cada uno de los lanzamientos de los dados. 
Sumar el resultado de lanzar dos dados y anotar en un array el número de apariciones de dicha suma, repitiendo 36.000 veces esta operación. */

function lanzamientoDados() {
  const resultados = Array(11).fill(0); // Array para almacenar el número de apariciones de cada suma (2 al 12)

  for (var i = 0; i < 36000; i++) {
    var dado1 = Math.floor(Math.random() * 6) + 1;
    var dado2 = Math.floor(Math.random() * 6) + 1;
    resultados[dado1 + dado2 - 2]++;
  }

  console.log("Resultados de la simulación:");

  for (var j = 0; j < resultados.length; j++) {
    console.log("Suma " + (j + 2) + ": " + resultados[j] + " apariciones");
  }
}
lanzamientoDados();

// 6.	Cree una función que devuelva el nombre del mes dadas las tres primeras letras del mismo.
function obtenerNombreMes(abreviatura) {
  const meses = {
    ene: "Enero",
    feb: "Febrero",
    mar: "Marzo",
    abr: "Abril",
    may: "Mayo",
    jun: "Junio",
    jul: "Julio",
    ago: "Agosto",
    sep: "Septiembre",
    oct: "Octubre",
    nov: "Noviembre",
    dic: "Diciembre",
  };

  const nombreMes = meses[abreviatura.toLowerCase()];

  if (nombreMes) {
    return nombreMes;
  } else {
    return "Mes no encontrado";
  }
}

const abreviaturaMes = prompt(
  "Introduce el nombre del mes dadas las tres primeras letras :"
);
const nombreDelMes = obtenerNombreMes(abreviaturaMes);
alert(
  "El nombre del mes con abreviatura " +
    abreviaturaMes.toUpperCase() +
    " es :" +
    nombreDelMes
);
