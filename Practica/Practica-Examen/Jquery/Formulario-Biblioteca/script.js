$(document).ready(function () {
  const title = $("#title");
  const autor = $("#author");
  const radioMujer = $("#radioMujer");
  const radioHombre = $("#radioHombre");

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

  function validarTitle() {
    var titleInput = String(title.val());
    if (titleInput == "") {
      $("#errores").append("<br>El titulo  es obligatorio.");
      return false;
    }
    return true;
  }

  function validarAutor() {
    var autorInput = String(autor.val());
    if (autorInput == "") {
      $("#errores").append("<br>El author  es obligatorio.");
      return false;
    }
    return true;
  }
  function validarGenero() {
    if (radioHombre.is(":checked")) {
      return radioHombre.val();
    } else if (radioMujer.is(":checked")) {
      return radioMujer.val();
    } else {
      // Si no se ha seleccionado ningún género, mostrar mensaje de error
      $("#errores").append("<br>El género es obligatorio.");
      return false;
    }
  }

  $("#enviar").on("click", validar);
  mostrarProductos();

  function validar(e) {
    $("#errores").empty();
    $("#errores").hide();
    if (validarTitle() && validarAutor() && validarGenero()) {
      subirDatos();
      return true;
    } else {
      $("#errores").show();
      e.preventDefault();
      return false;
    }
  }

  function subirDatos() {
    const titleValor = title.val();
    const authorValor = autor.val();
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
    $("#tabla-datos").html("");
    $("#tabla-datos").append(
      "<th>TITULO</th><th>AUTOR</th><th>GENERO</th></tr>"
    );
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
});
