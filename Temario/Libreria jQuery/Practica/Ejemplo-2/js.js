
$(document).ready(function () {
  // Cambio contenido al pasar el ratón por encima de una casilla
  $("td").hover(
    function () {
      // Cambiar el contenido de la casilla a "-"
      $(this).text("-");
    },
    function () {
      // Restaurar el contenido original al salir del área de la casilla
      $(this).text($(this).attr("text"));
    }
  );

  // Guardar el contenido original de cada casilla
  $("td").each(function () {
    $(this).attr("text", $(this).text());
  });
});