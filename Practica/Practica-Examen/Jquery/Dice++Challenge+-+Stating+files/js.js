$(document).ready(function () {
  function mostrarDados() {
    var dado1 = Math.floor(Math.random() * 6) + 1;
    var dado2 = Math.floor(Math.random() * 6) + 1;
    $(".img1").attr("src", "./images/dice" + dado1 + ".png");
    $(".img2").attr("src", "./images/dice" + dado2 + ".png");
    if (dado1 > dado2) {
      $("h1").text("Player 1 wins!");
    } else if (dado1 < dado2) {
      $("h1").text("Player 2 wins!");
    } else {
      $("h1").text("Draw!");
    }
    return dado1 + dado2;
  }

  $("#lanzarBtn").click(function () {
    mostrarDados();
  });
});
