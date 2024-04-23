// Elementos DOM
const title = document.getElementById("title");
const autor = document.getElementById("author");
const radioMujer = document.getElementById("radioMujer");
const radioHombre = document.getElementById("radioHombre");

let datos = [
  {
    Title: "Terror en la oscuridad",
    Autor: "Julio Vasquez",
    Genero: "Hombre",
  },
  {
    Title: "Vuelta al sol",
    Autor: "maritza Garces",
    Genero: "Mujer",
  },
];
let datosScript = JSON.parse(localStorage.getItem("datosScript")) || datos;

//Carga la pagina
window.onload = () => {
  document.getElementById("enviar").addEventListener("click", validar);
  mostrarProductos();
};

function validarTitle() {
  var titleInput = String(title.value);
  if (titleInput == "") {
    document.getElementById("errores").innerHTML +=
      "<br>El titulo  es obligatorio.";
    return false;
  }
  return true;
}

function validarAutor() {
  var autorInput = String(autor.value);
  if (autorInput == "") {
    document.getElementById("errores").innerHTML +=
      "<br>El author es obligatorio.";
    return false;
  }
  return true;
}
function validarGenero() {
  if (radioHombre.checked) {
    return radioHombre.value;
  } else if (radioMujer.checked) {
    return radioMujer.value;
  } else {
    // Si no se ha seleccionado ningún género, mostrar mensaje de error
    document.getElementById("errores").innerHTML +=
      "<br>El género es obligatorio.";
    return false;
  }
}

function validar(e) {
  document.getElementById("errores").innerHTML = "";
  document.getElementById("errores").style.display = "none";
  if (validarTitle() && validarAutor() && validarGenero()) {
    subirDatos();
    return true;
  } else {
    document.getElementById("errores").style.display = "block";
    e.preventDefault();
    return false;
  }
}

function subirDatos() {
  const titleValor = title.value;
  const authorValor = author.value;
  const genreValor = validarGenero();

  const index = datosScript.findIndex((libro) => libro.Title === titleValor); // Verificar si el libro ya existe en la lista
  if (index !== -1) {
    datosScript[index].Autor = authorValor; // Si el libro existe, actualizar sus detalles
    datosScript[index].Genero = genreValor; // Actualizar el género del libro
  } else {
    datosScript.push({
      Title: titleValor,
      Autor: authorValor,
      Genero: genreValor, // Agregar el género del libro
    }); // Si el libro no existe, agregarlo a la lista
  }

  localStorage.setItem("datosScript", JSON.stringify(datosScript)); // Guardar los datos actualizados en localStorage
}

function mostrarProductos() {
  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<th>TITULO</th><th>AUTOR</th><th>GENERO</th></tr>";
  for (let i = 0; i < datosScript.length; i++) {
    if (i < 10) {
      document.getElementById("tabla-datos").innerHTML +=
        "<tr><td>" +
        datosScript[i].Title +
        "</td><td>" +
        datosScript[i].Autor +
        "</td><td>" +
        datosScript[i].Genero +
        "</td></tr>";
    } else {
      break;
    }
  }
}
