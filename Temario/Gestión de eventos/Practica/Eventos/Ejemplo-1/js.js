window.onload = function () {
  document.document
    .getElementById("seccion" + numero)
    .addEventListener("click", toggleContent);
};
function toggleContent(numero) {
  var contenido = document.getElementById("seccion" + numero);
  var enlace = document.getElementsByClassName("a")[numero - 1];

  if (contenido.style.visibility === "hidden") {
    // Muestro la sección
    contenido.style.visibility = "visible";
    enlace.textContent = "Ocultar Sección " + numero;
  } else {
    // Oculto la sección
    contenido.style.visibility = "hidden";
    enlace.textContent = "Mostrar Sección " + numero;
  }
}
