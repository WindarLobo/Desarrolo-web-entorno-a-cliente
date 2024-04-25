let usuarioActual = null; // Variable global para almacenar el usuario en sesion

//variables para acceso a la bibilioteca si ya eres usuario
let nombreSolicitante = document.getElementById("borrowerName");
let dniSolicitante = document.getElementById("borrowerDNI");
let emailSolicitante = document.getElementById("borrowerEmail");
let botonAcceso = document.getElementById("botonAcceso");

let usuarios = [];
usuarios.push({
  nombre: "pepe",
  dni: "12345678A",
  email: "fakeemail@hotmail.com",
  librosPrestados: [],
});
usuarios.push({
  nombre: "juan",
  dni: "12345678B",
  email: "fakaemail2@hotmail.com",
  librosPrestados: [],
});

let books = [];
books.push({
  titulo: "El señor de los anillos",
  autor: "J.R.R. Tolkien",
  genero: "Fantasia",
  prestado: true,
});
books.push({
  titulo: "El hobbit",
  autor: "J.R.R. Tolkien",
  genero: "Fantasia",
  prestado: false,
});
books.push({
  titulo: "El nombre del viento",
  autor: "Patrick Rothfuss",
  genero: "Fantasia",
  prestado: false,
});
books.push({
  titulo: "El temor de un hombre sabio",
  autor: "Patrick Rothfuss",
  genero: "Fantasia",
  prestado: false,
});
books.push({
  titulo: "Cien años de soledad",
  autor: "Gabriel Garcia Marquez",
  genero: "Realismo magico",
  prestado: false,
});
books.push({
  titulo: "La sombra del viento",
  autor: "Carlos Ruiz Zafon",
  genero: "Misterio",
  prestado: false,
});
books.push({
  titulo: "El juego del angel",
  autor: "Carlos Ruiz Zafon",
  genero: "Misterio",
  prestado: false,
});
books.push({
  titulo: "El prisionero del cielo",
  autor: "Carlos Ruiz Zafon",
  genero: "Misterio",
  prestado: false,
});
books.push({
  titulo: "La ciudad de los prodigios",
  autor: "Eduardo Mendoza",
  genero: "Novela",
  prestado: false,
});
books.push({
  titulo: "Sin noticias de Gurb",
  autor: "Eduardo Mendoza",
  genero: "Novela",
  prestado: false,
});
books.push({
  titulo: "La verdad sobre el caso Savolta",
  autor: "Eduardo Mendoza",
  genero: "Novela",
  prestado: false,
});

let errores = document.getElementById("error");

//variables para crear un nuevo usuario
let nombreNuevoUsuario = document.getElementById("nuevoNombre");
let dniNuevoSolicitante = document.getElementById("nuevoDNI");
let emailNuevoSolicitante = document.getElementById("nuevoEmail");
let botonNuevoUsuario = document.getElementById("crearUsuario");

//variables para mostrar los datos del usuario en sesion
let datosUsuario = document.getElementById("usuarioInfo");

window.onload = function () {
  dniNuevoSolicitante.addEventListener("blur", validarDni);
  emailNuevoSolicitante.addEventListener("blur", validarEmail);
  nombreNuevoUsuario.addEventListener("blur", validarNombre);
  botonNuevoUsuario.addEventListener("click", validarNuevoUsuario);
  botonAcceso.addEventListener("click", validarAcceso);

  usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
};

//funcion validar usuario valido existente para acceder a la biblioteca
function validarAcceso() {
  //busco en el array de usuarios si el usuario existe
  let usuarioValido = false;
  for (let i = 0; i < usuarios.length; i++) {
    if (
      nombreSolicitante.value === usuarios[i].nombre &&
      dniSolicitante.value === usuarios[i].dni &&
      emailSolicitante.value === usuarios[i].email
    ) {
      usuarioActual = usuarios[i];
      usuarioValido = true;

      break;
    }
  }
  if (!usuarioValido) {
    errores.innerHTML += "Usuario no válido";
  } else {
    alert("Entrando en cuenta");
    errores.innerHTML = "";
    reseteoImputs();
    mostrarDatosUsuario();
    mostrarBooksYPrestar();
    mostrarLibrosPrestados();
  }
}
function mostrarDatosUsuario() {
  if (usuarioActual) {
    datosUsuario.innerHTML =
      "Nombre: " +
      usuarioActual.nombre +
      " DNI: " +
      usuarioActual.dni +
      " Email: " +
      usuarioActual.email +
      "<br>";
  }
}

function validarNuevoUsuario(e) {
  e.preventDefault();

  errores.innerHTML = "";

  let nombreValido = validarNombre();
  let dniValido = validarDni();
  let emailValido = validarEmail();
  if (nombreValido && dniValido && emailValido) {
    for (let i = 0; i < usuarios.length; i++) {
      if (
        nombreNuevoUsuario.value === usuarios[i].nombre &&
        dniNuevoSolicitante.value === usuarios[i].dni &&
        emailNuevoSolicitante.value === usuarios[i].email
      ) {
        errores.innerHTML += "Este usuario ya existe<br>";
        reseteoImputs();
        return;
      }
    }
    let nuevoUsuario = {
      nombre: nombreNuevoUsuario.value,
      dni: dniNuevoSolicitante.value,
      email: emailNuevoSolicitante.value,
    };

    // Obtener la lista de usuarios desde local storage o inicializarla si esta vacia
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);

    // Guardar la lista actualizada en el local storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Verificar contenido de localStorage
    console.log(JSON.parse(localStorage.getItem("usuarios")));

    errores.innerHTML = "";
    alert("Usuario creado con exito, ya puede loguearse en la biblioteca");
    reseteoImputs();
  } else {
    e.preventDefault();
  }
}
function reseteoImputs() {
  nombreNuevoUsuario.value = "";
  dniNuevoSolicitante.value = "";
  emailNuevoSolicitante.value = "";
  nombreSolicitante.value = "";
  dniSolicitante.value = "";
  emailSolicitante.value = "";
}

function validarNombre() {
  let nombre = nombreNuevoUsuario.value.trim();
  if (nombre.includes(" ")) {
    errores.innerHTML += "Este campo no puede contener espacios <br>";
    aplicarEstiloError(nombreNuevoUsuario, false);
    return false;
  } else if (nombre === "") {
    errores.innerHTML += "Este campo es obligatorio <br>";
    aplicarEstiloError(nombreNuevoUsuario, false);
    return false;
  } else {
    aplicarEstiloError(nombreNuevoUsuario, true);
    return true;
  }
}
function validarDni() {
  let dni = dniNuevoSolicitante.value.trim();
  const dniValido = /^[0-9]{8}[A-Z]$/.test(dni);
  if (!dniValido) {
    errores.innerHTML += "El dni tiene que incluir 8 numero y una letra <br>";
    aplicarEstiloError(dniNuevoSolicitante, false);
    return false;
  } else {
    aplicarEstiloError(dniNuevoSolicitante, true);
    return true;
  }
}
function validarEmail() {
  let email = emailNuevoSolicitante.value.trim();
  const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  if (!emailValido) {
    errores.innerHTML += "Este email no es valido";
    aplicarEstiloError(emailNuevoSolicitante, false);
    return false;
  } else {
    aplicarEstiloError(emailNuevoSolicitante, true);
    return true;
  }
}

function aplicarEstiloError(imput, valido) {
  if (!valido) {
    imput.classList.add("error");
  } else {
    imput.classList.remove("error");
  }
}
//funcion para mostrar los libros en prestamo por un usuario en concreto
function mostrarLibrosPrestados() {
  let librosEnPrestamo = document.getElementById("librosPrestados");
  librosEnPrestamo.innerHTML = "";

  if (usuarioActual.librosPrestados) {
    usuarioActual.librosPrestados.forEach((book) => {
      let devolverButton = document.createElement("button");
      devolverButton.textContent = "Devolver libro";

      // Agregar evento click al botón para devolver el libro
      devolverButton.addEventListener("click", function () {
        book.prestado = false; // Cambiar el estado del libro a no prestado
        // Eliminar el libro de la lista de libros prestados del usuario
        usuarioActual.librosPrestados = usuarioActual.librosPrestados.filter(
          (libro) => libro !== book
        );
        // Guardar la lista actualizada de usuarios en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Actualizar la lista de libros después de devolver
        mostrarLibrosPrestados();
        //actualizar la lista de libros prestados
        mostrarBooksYPrestar();
      });

      let libro = document.createElement("div");
      libro.textContent = `${book.titulo}, ${book.autor}, ${book.genero}`;
      libro.appendChild(devolverButton);
      librosEnPrestamo.appendChild(libro);
    });
  }
}

// Función para mostrar los libros y prestar

function mostrarBooksYPrestar() {
  let libros = document.getElementById("libros");
  libros.innerHTML = "";

  // Mostrar solo los libros no prestados
  books.forEach((book) => {
    if (!book.prestado) {
      let addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Prestar libro";

      // Agregar evento click al botón para prestar el libro
      addToCartButton.addEventListener("click", function () {
        if (usuarioActual) {
          book.prestado = true; // Cambiar el estado del libro a prestado
          // Verificar si el usuario tiene la propiedad librosPrestados
          if (!usuarioActual.librosPrestados) {
            usuarioActual.librosPrestados = []; // Inicializar si no existe
          }
          // Agregar el libro a la lista de libros prestados del usuario
          usuarioActual.librosPrestados.push(book);
          // Guardar la lista actualizada de usuarios en localStorage
          localStorage.setItem("usuarios", JSON.stringify(usuarios));

          // Actualizar la lista de libros después de prestar
          mostrarBooksYPrestar();
          //actualizar la lista de libros prestados
          mostrarLibrosPrestados();
        } else {
          console.error("Usuario autenticado no encontrado.");
        }
      });

      let libro = document.createElement("div");
      libro.textContent = `${book.titulo}, ${book.autor}, ${book.genero}`;
      libro.appendChild(addToCartButton);
      libros.appendChild(libro);
    }
  });
}
