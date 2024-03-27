/*3.En el código anterior, realiza seguimiento de la variable 
num mediante punto de interrupción. ¿Qué error no permite ver 
el último document.write? (Pista: revisa la diferencia entre var 
  y let en la declaración de num)*/

function ejecutarPrograma() {
  var contador = 1;
  let num; // Muevo la declaración  num fuera del bloque while para que tenga un alcance global

  while (contador < 5) {
    let dato = prompt("Introduce número del 1 al 10:", "");
    num = parseInt(dato);
    document.write(" numero introducido es  " + num + "</br>");
    document.write(" El contador es " + contador + "</br> ");
    contador += 1;
  }

  document.write(
    "</br><h2>Fin del programa contador ya NO es menor que 5.</h2>"
  );

  document.write("</br> Ultimo numero introducido es " + num);
}

document.addEventListener("DOMContentLoaded", function () {
  ejecutarPrograma();
});
