window.onload = function () {
  document.getElementById("enviar").addEventListener("click", validaNumero);
};

function validaNumero() {
  if (
    /^\d{3}\.\d{2}$/.test(document.getElementById("numeroInput").value.trim())
  ) {
    alert("El formato introducido es valido.");
  } else {
    alert(
      "Por favor, ingrese un número en el formato correcto (por ejemplo, 123.45)."
    );
  }
}
