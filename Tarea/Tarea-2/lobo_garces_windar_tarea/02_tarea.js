// Añado objeto window para que cuando la página web se cargue completamente.
window.onload = function () {
  // Añado  un event listener al botón con el ID "btnResaltar" que ejecutará la función "aplicarEfecto" cuando se haga clic en él.
  document
    .getElementById("btnResaltar")
    .addEventListener("click", aplicarEfecto);

  // Añado un event listener al elemento con el ID "mostrarFrutas" que ejecutará la función "obtenerfruta" cuando se pase el ratón sobre él.
  document
    .getElementById("mostrarFrutas")
    .addEventListener("mouseover", obtenerfruta);

  // añado un event listener al elemento con el ID "sol3" que ejecutará la función "conversion" cuando se presione una tecla mientras este elemento tenga el foco.
  document.getElementById("sol3").addEventListener("keyup", conversion);
};

/** Ejercicio 1 **/
// Esta función se encarga de aplicar un efecto de estilo (cursiva, negrita o subrayado) al texto.
function aplicarEfecto() {
  // Obtenemos  el valor ingresado en el campo de texto.
  let palabraClave = document.getElementById("txtPalabra").value;
  // Aplicamos los estilos directamente al texto del resultado.
  let resultado = document.getElementById("textoResultado");
  // Reinicio los estilos antes de aplicar el nuevo estilo.
  resultado.style.fontStyle = "normal";
  resultado.style.fontWeight = "normal";
  resultado.style.textDecoration = "none";
  // Añado un switch para aplicar un estilo correpondiente y convertirlo a minúsculas.
  switch (palabraClave.toLowerCase()) {
    case "cursiva":
      resultado.style.fontStyle = "italic";
      break;
    case "negrita":
      resultado.style.fontWeight = "bold";
      break;
    case "subrayado":
      resultado.style.textDecoration = "underline";
      break;
    default:
      // Se muestra un mensaje de alerta si la palabra clave no es válida.
      alert(
        "Efecto desconocido o palabra clave no válida. Elige una palabra clave válida y un efecto de negrita, cursiva o subrayado."
      );
      return; // Salgo  de la función si la palabra clave no es válida.
  }
}

/** Ejercicio 2 **/
// Defino una  función para mostrar las frutas exóticas
function obtenerfruta() {
  // Obtengo el elemento resultado
  let resultado = document.getElementById("resultado");
  // Elimino el listener de mouseover del elemento "mostrarFrutas"
  document
    .getElementById("mostrarFrutas")
    .removeEventListener("mouseover", obtenerfruta);
  // Vacío su contenido.
  resultado.innerHTML = "";
  // Creo una lista desordenada.
  let lista = document.createElement("ul");
  // Agrego cada fruta exótica a la lista.
  frutasExoticas.forEach((fruta) => {
    let elementoLista = document.createElement("li");
    // Añado un estilo de formato: "nombre (orígen) - sabor".
    let textoFruta = `${fruta.nombre} (${fruta.origen}) - ${fruta.sabor}`;
    // Asigno el texto al elemento de lista.
    elementoLista.textContent = textoFruta;
    // Agrego el elemento de lista a la lista desordenada.
    lista.appendChild(elementoLista);
  });
  // Agrego la lista al resultado.
  resultado.appendChild(lista);
}

/** Ejercicio 3 **/
// Defino una  función para mostrar la conversion de grados Celsius a Fahrenheit.
function conversion() {
  var celsius = document.getElementById("celsiusInput").value.trim();
  var celsiusNumber = Number(celsius);
  //Verifico si el valor ingresado no sea un número válido y no este vacio.
  //isNaN no reconoce la cadena vacia y el Number devuelve un 0.
  if (isNaN(celsiusNumber) || celsius === "") {
    // Mostrar "Conversor °F" si el valor ingresado no es un número o esta vacio
    document.title = "Conversor °F";
  } else {
    // Muestro el resultado en el título de la página con dos decimales
    document.title = ((celsiusNumber * 9) / 5 + 32).toFixed(2) + " °F";
  }
}
