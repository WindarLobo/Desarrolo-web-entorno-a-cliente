$(function () {
  $("p").click(presionParrafoDocumento);
  $("#tabla2 p").click(presionParrafoSegundaTabla);
});

function presionParrafoDocumento() {
  alert("se presionó un párrafo del documento");
}

function presionParrafoSegundaTabla() {
  alert("se presionó un párrafo contenido en la segunda tabla.");
}
