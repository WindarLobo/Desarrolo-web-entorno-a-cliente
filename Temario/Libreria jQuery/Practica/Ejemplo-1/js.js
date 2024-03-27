
function cambiarColorFondo() {
  // genero un color hexadecimal aleatorio
  var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  $(this).css("background-color", color);
}
// Espero a que el documento esté listo
$(document).ready(function(){
  // Asigno la función al evento de clic de las celdas
  $('td').click(cambiarColorFondo);
});