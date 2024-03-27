window.onload = function () {
  document.getElementById("enviar").addEventListener("click", validarTexto);
};
function validarTexto() {
  var texto = document.getElementById("textInput").value.trim();
  var palabras = texto.split(/\s+/); // Dividir el texto en palabras usando espacios como separador
  var primeraPalabra = palabras[0];
  var ultimaPalabra = palabras[palabras.length - 1];

  // a. El número de palabras tiene que ser mayor que 20.
  if (palabras.length <= 20) {
    alert("El número de palabras tiene que ser mayor que 20.");
    return;
  }

  // b. La primera palabra tiene que contener sólo letras.
  if (!/^[a-zA-Z]+$/.test(primeraPalabra)) {
    alert("La primera palabra debe contener sólo letras.");
    return;
  }

  // c. La última palabra tiene que contener al menos 2 cifras.
  if (!/\d{2,}/.test(ultimaPalabra)) {
    alert("La última palabra debe contener al menos 2 cifras.");
    return;
  }

  // d. El número de letras tiene que ser mayor que el número de cifras.
  var letras = texto.replace(/[^a-zA-Z]/g, "").length;
  var cifras = texto.replace(/\D/g, "").length;
  if (letras <= cifras) {
    alert("El número de letras debe ser mayor que el número de cifras.");
    return;
  }

  // Si todas las condiciones se cumplen, el texto es válido
  alert("El texto es válido.");
}
