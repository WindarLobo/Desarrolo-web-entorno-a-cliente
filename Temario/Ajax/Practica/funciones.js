$(document).ready(function () {
  $("#enviar").click(function () {
    var numero = $("#nro").val();
    $.get("pagina1.php", { nro: numero }, function (data) {
      $("#resultados").html("El cuadrado es: " + data);
    });
  });
});
