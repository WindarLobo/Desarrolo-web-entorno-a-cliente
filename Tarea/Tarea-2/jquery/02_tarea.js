$(document).ready(function () {
  // Event listener para el botón con el ID "btnResaltar"
  $("#btnResaltar").click(function () {
    aplicarEfecto();
  });

  // Event listener para el elemento con el ID "mostrarFrutas"
  $("#mostrarFrutas").mouseover(function () {
    obtenerfruta();
  });

  // Event listener para el elemento con el ID "sol3"
  $("#sol3").keyup(function () {
    conversion();
  });
});

/** Ejercicio 1 **/
// Esta función se encarga de aplicar un efecto de estilo (cursiva, negrita o subrayado) al texto.
function aplicarEfecto() {
  // Obtenemos el valor ingresado en el campo de texto.
  var palabraClave = $("#txtPalabra").val();
  // Aplicamos los estilos directamente al texto del resultado.
  var resultado = $("#textoResultado");
  // Reinicio los estilos antes de aplicar el nuevo estilo.
  resultado.css({
    "font-style": "normal",
    "font-weight": "normal",
    "text-decoration": "none",
  });
  // Añado un switch para aplicar un estilo correspondiente y convertirlo a minúsculas.
  switch (palabraClave.toLowerCase()) {
    case "cursiva":
      resultado.css("font-style", "italic");
      break;
    case "negrita":
      resultado.css("font-weight", "bold");
      break;
    case "subrayado":
      resultado.css("text-decoration", "underline");
      break;
    default:
      // Se muestra un mensaje de alerta si la palabra clave no es válida.
      alert(
        "Efecto desconocido o palabra clave no válida. Elige una palabra clave válida y un efecto de negrita, cursiva o subrayado."
      );
      return; // Salgo de la función si la palabra clave no es válida.
  }
}

/** Ejercicio 2 **/
// Defino una función para mostrar las frutas exóticas
function obtenerfruta() {
  // Vacío el contenido del elemento resultado.
  $("#resultado").empty();
  // Creo una lista desordenada.
  var lista = $("<ul></ul>");
  // Agrego cada fruta exótica a la lista.
  frutasExoticas.forEach(function (fruta) {
    var textoFruta = fruta.nombre + " (" + fruta.origen + ") - " + fruta.sabor;
    // Creo un elemento de lista y le asigno el texto.
    var elementoLista = $("<li></li>").text(textoFruta);
    // Agrego el elemento de lista a la lista desordenada.
    lista.append(elementoLista);
  });
  // Agrego la lista al elemento resultado.
  $("#resultado").append(lista);
  // Eliminar el event listener de mouseover del elemento "mostrarFrutas"
  $("#mostrarFrutas").off("mouseover", obtenerfruta);
}

/** Ejercicio 3 **/
// Defino una función para mostrar la conversión de grados Celsius a Fahrenheit.
function conversion() {
  var celsius = $("#celsiusInput").val().trim();
  var celsiusNumber = Number(celsius);
  // Verifico si el valor ingresado no es un número válido y no está vacío.
  // isNaN no reconoce la cadena vacía y Number devuelve un 0.
  if (isNaN(celsiusNumber) || celsius === "") {
    // Mostrar "Conversor °F" si el valor ingresado no es un número o está vacío.
    document.title = "Conversor °F";
  } else {
    // Muestro el resultado en el título de la página con dos decimales.
    document.title = ((celsiusNumber * 9) / 5 + 32).toFixed(2) + " °F";
  }
}
