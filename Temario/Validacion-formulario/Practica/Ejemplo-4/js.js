window.onload = function () {
  document.getElementById("enviar").addEventListener("click", solicitudIngreso);
};

function solicitudIngreso() {
  if (
    /^\(\d{1,3},\d{1,3}\)$/.test(
      document.getElementById("coordenadaInput").value.trim()
    )
  ) {
    alert("La coordenada ingresada es válida.");
  } else {
    alert(
      "Por favor, ingrese la coordenada en el formato correcto (por ejemplo, (123,456) )."
    );
  }
}
