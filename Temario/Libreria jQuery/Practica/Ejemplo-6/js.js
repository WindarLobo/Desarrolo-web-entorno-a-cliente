$(document).ready(function () {
  $("#btnCabecera").click(function () {
    var contenidoCabecera = $("head").html(); // Seleccionamos la cabecera con "head"
    alert("Contenido de la cabecera:\n" + contenidoCabecera);
  });

  $("#btnCuerpo").click(function () {
    var contenidoCuerpo = $("body").html(); // Seleccionamos el cuerpo con "body"
    alert("Contenido del cuerpo:\n" + contenidoCuerpo);
  });
});
