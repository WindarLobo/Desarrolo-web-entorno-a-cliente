const title = document.getElementById("title");
const autor = document.getElementById("author");
const genero = document.getElementById("genero");
const copias = document.getElementById("copias");
const searchResultsDiv = document.getElementById("search-results");
window.onload = function () {
  document.getElementById("enviar").addEventListener("click", validar);

  mostrarProductos();
  // Agregar evento al botón de búsqueda
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const textoBusqueda = document.getElementById("search-input").value; // Obtener el texto de búsqueda
      searchBooks(textoBusqueda); // Llamar a la función searchBooks con el texto de búsqueda
    });

  // Agregar evento al botón de préstamo
  document.getElementById("loan-button").addEventListener("click", function () {
    // Obtener el ID del usuario y del libro
    const userId = document.getElementById("user-id").value;
    const bookId = document.getElementById("book-id").value;
    prestamosLibro(userId, bookId);
  });

  document
    .getElementById("return-button")
    .addEventListener("click", function () {
      const bookId = document.getElementById("book-id").value;
      devolucionLibro(bookId);
    });
};

let booksScript = localStorage.getItem("booksScript");
if (booksScript != null) {
  booksScript = JSON.parse(booksScript);
} else {
  booksScript = books;
}

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
  if (genero.value !== "") {
    return true;
  } else {
    document.getElementById("errores").innerHTML +=
      "<br>El género es obligatorio.";
    return false;
  }
}
function validarCopias() {
  var copiasInput = Number(copias.value);
  if (isNaN(copiasInput) || copiasInput <= 0) {
    document.getElementById("errores").innerHTML +=
      "<br>Por favor, instroduzca las copias al menos 1 .";
    return false;
  }
  return true;
}
function validar(e) {
  document.getElementById("errores").innerHTML = "";
  document.getElementById("errores").style.display = "none";
  if (validarTitle() && validarAutor() && validarGenero() && validarCopias()) {
    agregarLibro();
    return true;
  } else {
    document.getElementById("errores").style.display = "block";
    e.preventDefault();
    return false;
  }
}
function agregarLibro() {
  const titleValor = title.value;
  const autorValor = autor.value;
  const generoValor = genero.value;
  const copiasValor = copias.value;

  const index = booksScript.findIndex((libro) => libro.title === titleValor); // Verifico si el producto ya existe en la lista
  if (index !== -1) {
    booksScript[index].copias = copiasValor; // Si el producto existe, actualizo sus copias
    booksScript[index].genero = generoValor;
  } else {
    booksScript.push({
      id: books.length + 1,
      titulo: titleValor,
      autor: autorValor,
      genero: generoValor,
      copias: copiasValor,
    }); // Si el producto no existe, lo agrego en  la lista
  }

  localStorage.setItem("booksScript", JSON.stringify(booksScript)); // Guardo los datos y actualizo en localStorage
}

function mostrarProductos() {
  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<th>TITULO</th><th>AUTOR</th><th>GENERO</th><th>COPIAS</th></tr>";
  for (let i = 0; i < booksScript.length; i++) {
    document.getElementById("tabla-datos").innerHTML +=
      "<tr><td>" +
      booksScript[i].titulo +
      "</td><td>" +
      booksScript[i].autor +
      "</td><td>" +
      booksScript[i].genero +
      "</td><td>" +
      booksScript[i].copias +
      "</td></tr>";
  }
}
// Función para buscar libros
function searchBooks(text) {
  text = text.toLowerCase();
  const results = booksScript.filter(
    (libro) =>
      // Verificar si el título, autor o género del libro incluye el texto de búsqueda
      libro.titulo.toLowerCase().includes(text) ||
      libro.autor.toLowerCase().includes(text) ||
      libro.genero.toLowerCase().includes(text)
  );
  mostrarResultadosBusqueda(results); // Llamar a la función mostrarResultadosBusqueda con los resultados de la búsqueda
}

// Función para mostrar los resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
  searchResultsDiv.innerHTML = "";

  if (resultados.length === 0) {
    searchResultsDiv.innerHTML += "No se encontraron resultados.";
  } else {
    resultados.forEach((libro) => {
      const bookDiv = document.createElement("div");
      bookDiv.textContent = `${libro.titulo} - ${libro.autor} (${libro.copias} disponibles)`;
      searchResultsDiv.appendChild(bookDiv);
    });
  }
}

// Función para prestar un libro
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

// Función para devolver un libro
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
