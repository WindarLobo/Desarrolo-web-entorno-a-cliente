$(document).ready(function () {
  $("#contenedor-1").on("click", function () {
    $(this).fadeOut("slow", function () {
      $("#contenedor-2").fadeIn("slow");
    });
  });
});
