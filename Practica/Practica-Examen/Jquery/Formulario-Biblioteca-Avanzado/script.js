$(document).ready(function () {
  const title = $("#title");
  const autor = $("#author");
  const genero = $("#genero");
  const copias = $("#copias");
  const searchResultsDiv = $("#search-results");

  $("#search-button").on("click", function () {
    const textoBusqueda = $("#search-input").val();
    searchBooks(textoBusqueda);
  });

  $("#loan-button").on("click", function () {
    const userId = $("#user-id").val();
    const bookId = $("#book-id").val();
    prestamosLibro(userId, bookId);
  });

  $("#return-button").on("click", function () {
    const bookId = $("#book-id").val();
    devolucionLibro(bookId);
  });

  let booksScript = localStorage.getItem("booksScript");
  if (booksScript != null) {
    booksScript = JSON.parse(booksScript);
  } else {
    booksScript = books;
  }

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
      $("#errores").append("<br>El author es obligatorio.");
      return false;
    }
    return true;
  }

  function validarGenero() {
    if (genero.val() !== "") {
      return true;
    } else {
      $("#errores").append("<br>El género es obligatorio.");
      return false;
    }
  }

  function validarCopias() {
    var copiasInput = Number(copias.val());
    if (isNaN(copiasInput) || copiasInput <= 0) {
      $("#errores").append(
        "<br>Por favor, instroduzca las copias al menos 1 ."
      );
      return false;
    }
    return true;
  }

  $("#enviar").on("click", validar);
  mostrarProductos();

  function validar(e) {
    $("#errores").empty();
    $("#errores").hide();
    if (
      validarTitle() &&
      validarAutor() &&
      validarGenero() &&
      validarCopias()
    ) {
      agregarLibro();
      return true;
    } else {
      $("#errores").show();
      e.preventDefault();
      return false;
    }
  }

  function agregarLibro() {
    const titleValor = title.val();
    const autorValor = autor.val();
    const generoValor = genero.val();
    const copiasValor = copias.val();

    const index = booksScript.findIndex((libro) => libro.title === titleValor);
    if (index !== -1) {
      booksScript[index].copias = copiasValor;
      booksScript[index].genero = generoValor;
    } else {
      booksScript.push({
        id: books.length + 1,
        titulo: titleValor,
        autor: autorValor,
        genero: generoValor,
        copias: copiasValor,
      });
    }

    localStorage.setItem("booksScript", JSON.stringify(booksScript));
  }

  function mostrarProductos() {
    $("#tabla-datos").html("");
    $("#tabla-datos").append(
      "<th>TITULO</th><th>AUTOR</th><th>GENERO</th><th>COPIAS</th></tr>"
    );
    for (let i = 0; i < booksScript.length; i++) {
      $("#tabla-datos").append(
        "<tr><td>" +
          booksScript[i].titulo +
          "</td><td>" +
          booksScript[i].autor +
          "</td><td>" +
          booksScript[i].genero +
          "</td><td>" +
          booksScript[i].copias +
          "</td></tr>"
      );
    }
  }

  function searchBooks(text) {
    text = text.toLowerCase();
    const results = booksScript.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(text) ||
        libro.autor.toLowerCase().includes(text) ||
        libro.genero.toLowerCase().includes(text)
    );
    mostrarResultadosBusqueda(results);
  }

  function mostrarResultadosBusqueda(resultados) {
    searchResultsDiv.html("");

    if (resultados.length === 0) {
      searchResultsDiv.append("No se encontraron resultados.");
    } else {
      resultados.forEach((libro) => {
        const bookDiv = $("<div>").text(
          `${libro.titulo} - ${libro.autor} (${libro.copias} disponibles)`
        );
        searchResultsDiv.append(bookDiv);
      });
    }
  }

  function prestamosLibro(userId, bookId) {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      alert("Usuario no encontrado.");
      return;
    }

    const bookIndex = booksScript.findIndex(
      (book) => book.id === parseInt(bookId)
    );
    if (bookIndex === -1) {
      alert("Libro no encontrado.");
      return;
    }

    const book = booksScript[bookIndex];
    if (book.copias === 0) {
      alert("No hay copias disponibles de este libro.");
      return;
    }

    book.copias--;
    alert(`Libro "${book.titulo}" prestado a ${user.name}.`);
    mostrarProductos();
    localStorage.setItem("booksScript", JSON.stringify(booksScript));
  }

  function devolucionLibro(bookId) {
    const bookIndex = booksScript.findIndex(
      (book) => book.id === parseInt(bookId)
    );
    if (bookIndex === -1) {
      alert("Libro no encontrado.");
      return;
    }

    booksScript[bookIndex].copias++;
    alert("Libro devuelto correctamente.");
    mostrarProductos();
    localStorage.setItem("booksScript", JSON.stringify(booksScript));
  }
});
