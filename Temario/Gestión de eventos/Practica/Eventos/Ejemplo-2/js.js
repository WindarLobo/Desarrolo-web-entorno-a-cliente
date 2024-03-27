window.onload = function () {
  document.addEventListener("click", informeUsuario);
  document
    .getElementById("recuadro1")
    .addEventListener("dblclick", duplicarContenido);
  mostrarElemento();
  document.getElementById("recuadro1").addEventListener("mouseup", cambioColor);
  incrementarCantida();
};

/*Crea un script que informe al usuario en qué zona de la pantalla ha hecho clic con el ratón.
 Las zonas definidas son las siguientes: izquierda superior, izquierda inferior,
  derecha superior y derecha inferior.
 */
function informeUsuario(event) {
  var x = event.clientX;
  var y = event.clientY;

  var width = window.innerWidth;
  var height = window.innerHeight;

  var zona;

  if (x < width / 2) {
    zona = y < height / 2 ? "izquierda superior" : "izquierda inferior";
  } else {
    zona = y < height / 2 ? "derecha superior" : "derecha inferior";
  }

  alert("Has hecho clic en la zona: " + zona);
}
/*Realizar un programa que muestre en un div el número 2. 
Cada vez que se hace doble clic sobre el mismo duplica el valor contenido en el div.
 */
var valor = 2;
function duplicarContenido() {
  valor *= 2;
  document.getElementById("recuadro1").innerText = valor;
}
/*	Elaborar un programa que muestre un div de color rojo. 
Cuando se presione cambiar el color a amarillo y luego de soltar 
el botón del mouse volver a pintar de rojo.

 */

function cambioColor() {
  var miDiv = document.getElementById("recuadro1");

  miDiv.addEventListener("mousedown", function () {
    miDiv.style.backgroundColor = "yellow";
  });

  miDiv.addEventListener("mouseup", function () {
    miDiv.style.backgroundColor = "red";
  });
}

/*	Mostrar un elemento de tipo H1, luego cuando se ingrese con el mouse dentro
 del mismo cambiar el color a letra roja y color de fondo amarillo, luego cuando 
 se mueva la flecha del mouse fuera del elemento volver al color original.
 */
function mostrarElemento() {
  var miH1 = document.querySelector("h1");

  miH1.addEventListener("mouseover", function () {
    miH1.style.color = "red";
    miH1.style.backgroundColor = "yellow";
  });

  miH1.addEventListener("mouseout", function () {
    miH1.style.color = ""; // Restauro el color original
    miH1.style.backgroundColor = ""; //  Restauro el c color original
  });
}

/*En el siguiente código HTML, implementar un código en javascript que incremente el contenido
 del elemento “cantidad” cada vez que movamos el ratón por encima del recuadro azul. 
 (Pista: utilizar el evento mousemove).
*/
function incrementarCantida() {
  var cantidadTotal = document.getElementById("cantidad");
  var cuadro = document.getElementById("recuadro1");
  var cantidad = 0;
  cuadro.addEventListener("mousemove", function () {
    cantidad++;
    cantidadTotal.innerText = cantidad;
  });
}
