$(document).ready(function () {
  $("#boton1").click(function () {
    actualizarHipervinculo("https://www.google.com");
  });

  $("#boton2").click(function () {
    actualizarHipervinculo("https://www.instgram.com");
  });

  $("#boton3").click(function () {
    actualizarHipervinculo("https://www.x.com");
  });

  function actualizarHipervinculo(url) {
    $("#hipervinculo").attr("href", url).text(url);
  }
});
