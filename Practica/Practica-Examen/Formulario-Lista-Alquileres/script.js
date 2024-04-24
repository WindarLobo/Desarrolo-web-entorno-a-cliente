//variables para crear un nuevo usuario
const nombreNuevoUsuario = document.getElementById("nuevoNombre");
const dniNuevoSolicitante = document.getElementById("nuevoDNI");
const emailNuevoSolicitante = document.getElementById("nuevoEmail");

//  formulario de alquiler
const formAlquier = document.getElementById("formulario");

//variables para acceder
const nombreUsuarioExistente = document.getElementById("borrowerName");
const dniUsuarioExistente = document.getElementById("borrowerDNI");
const emailSolicitante = document.getElementById("borrowerEmail");

//botones
const botonNuevoUsuario = document.getElementById("crearUsuario");
const botonAcceso = document.getElementById("botonAcceso");
const botonRegistro = document.getElementById("registro");
const botonCerrarSesion = document.getElementById("cerrarSesion");

// Almaceno los usuarios en el almacenamiento local
let usuariosScript = JSON.parse(localStorage.getItem("usuariosScript")) || [];

window.onload = function () {
  // Reseteo de inputs
  document.getElementById("loanForm").reset();
  document.getElementById("usuario").reset();
  botonNuevoUsuario.addEventListener("click", validarNuevoUsuario);
};

//funcion validar usuario valido existente para acceder a la biblioteca
function validarAcceso() {
  let usuarioValido = null;
  for (let i = 0; i < usuariosScript.length; i++) {
    if (
      nombreUsuarioExistente.value === usuariosScript[i].nombre &&
      dniUsuarioExistente.value === usuariosScript[i].dni &&
      emailSolicitante.value === usuariosScript[i].email
    ) {
      usuarioValido = usuariosScript[i];

      break;
    }
  }

  return usuarioValido;
}

//botones

botonAcceso.addEventListener("click", function () {
  var usuarioValido = validarAcceso();
  if (usuarioValido !== null) {
    // Muestro la tabla de alquileres
    document.getElementById("registroAlquiler").style.display = "block";
    document.getElementById("usuario").style.display = "none";
    // Actualizo la tabla con los alquileres del usuario
    actualizarListaAlquileres(usuarioValido.alquileres);
    // Muestro el total de alquileres del usuario
    actualizarTotal(usuarioValido);
  } else {
    document.getElementById("mensaje").innerText =
      "Usuario no válido. Por favor, inténtelo de nuevo.";
  }
});

botonRegistro.addEventListener("click", function () {
  document.getElementById("loanForm").style.display = "block";
  document.getElementById("usuario").style.display = "none";
});
botonCerrarSesion.addEventListener("click", function () {
  document.getElementById("usuario").style.display = "block";
  document.getElementById("registroAlquiler").style.display = "none";
  document.getElementById("usuario").reset();
});

//funcion para registrar un nuevo alquiler

formAlquier.addEventListener("submit", function (event) {
  event.preventDefault();
  registrarAlquiler();
});

//Validaciones

function validarNombre() {
  let nombre = nombreNuevoUsuario.value.trim();
  if (nombre.includes(" ")) {
    document.getElementById("errores").innerHTML +=
      "Este campo no puede contener espacios <br>";

    return false;
  } else if (nombre === "") {
    document.getElementById("errores").innerHTML +=
      "Este campo nombre es obligatorio <br>";

    return false;
  } else {
    return true;
  }
}

function validarDni() {
  let dni = dniNuevoSolicitante.value.trim();
  const dniValido = /^[0-9]{8}[A-Z]$/.test(dni);
  if (!dniValido) {
    document.getElementById("errores").innerHTML +=
      "El dni tiene que incluir 8 numero y una letra <br>";

    return false;
  } else {
    return true;
  }
}
function validarEmail() {
  let email = emailNuevoSolicitante.value.trim();
  const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  if (!emailValido) {
    document.getElementById("errores").innerHTML += "Este email no es valido";
    return false;
  } else {
    return true;
  }
}
function validarNuevoUsuario(e) {
  document.getElementById("errores").innerHTML = "";
  document.getElementById("errores").style.display = "none";
  if (validarNombre() && validarDni() && validarEmail()) {
    agregarUsuario();

    errores.innerHTML = "";
  } else {
    document.getElementById("errores").style.display = "block";

    e.preventDefault();
  }
}
function calcularPrecio(producto, dias) {
  var precioBase = 0;
  switch (producto) {
    case "silla":
      precioBase = 5;
      break;
    case "mesa":
      precioBase = 10;
      break;
    case "sofa":
      precioBase = 20;
      break;
    default:
      precioBase = 0;
  }
  return precioBase * dias;
}

function agregarUsuario() {
  let nombreIngresado = nombreNuevoUsuario.value.trim().toLowerCase();
  let dniIngresado = dniNuevoSolicitante.value.trim().toLowerCase();
  let emailIngresado = emailNuevoSolicitante.value.trim().toLowerCase();

  // Verifico si el usuario ya existe
  let usuarioExistente = usuariosScript.find(function (usuario) {
    return (
      nombreIngresado === usuario.nombre.toLowerCase() &&
      dniIngresado === usuario.dni.toLowerCase() &&
      emailIngresado === usuario.email.toLowerCase()
    );
  });

  if (usuarioExistente) {
    document.getElementById("errores").innerHTML +=
      "Este usuario ya existe<br>";
  } else {
    // Agrego nuevo usuario con lista de alquileres vacía

    let nuevoUsuario = {
      nombre: nombreNuevoUsuario.value,
      dni: dniNuevoSolicitante.value,
      email: emailNuevoSolicitante.value,
      alquileres: [],
    };

    // Añadp el nuevo usuario a la lista de usuarios
    usuariosScript.push(nuevoUsuario);
    // Guardo en el almacenamiento local
    localStorage.setItem("usuariosScript", JSON.stringify(usuariosScript));
  }
}
function registrarAlquiler() {
  // Obtengo los valores del formulario
  var cliente = document.getElementById("cliente").value;
  var producto = document.getElementById("producto").value;
  var dias = document.getElementById("dias").value;

  // Valido los datos
  if (cliente === "" || dias === "") {
    document.getElementById("mensaje").innerText =
      "Por favor, complete todos los campos.";
  } else if (isNaN(dias) || parseInt(dias) <= 0) {
    document.getElementById("mensaje").innerText =
      "La cantidad de días debe ser un número válido.";
  } else {
    // Calculo el precio del alquiler según el producto y los días
    var precioAlquiler = calcularPrecio(producto, parseInt(dias));

    // Obtengo el usuario actual
    var usuarioActual = validarAcceso();
    if (usuarioActual !== null) {
      // Agrego el alquiler a la lista de alquileres del usuario
      usuarioActual.alquileres.push({
        cliente: cliente,
        producto: producto,
        dias: parseInt(dias),
        precio: precioAlquiler,
      });

      // Guardo la información actualizada en el localStorage
      localStorage.setItem("usuariosScript", JSON.stringify(usuariosScript));

      // Actualizo la lista de alquileres
      actualizarListaAlquileres(usuarioActual.alquileres);

      // Actualizo el total de alquileres del usuario actual
      actualizarTotal(usuarioActual);

      document.getElementById("cliente").value = "";
      document.getElementById("dias").value = "";
    } else {
      document.getElementById("mensaje").innerText =
        "No se encontró ningún usuario válido.";
    }
  }
}

function actualizarTotal(usuarioActual) {
  var total = usuarioActual.alquileres.reduce(function (acumulador, alquiler) {
    return acumulador + alquiler.precio;
  }, 0);
  document.getElementById("total").innerText =
    "Total al pagar: " + total.toFixed(2) + "€";
}

function actualizarListaAlquileres(alquileres) {
  var tablaAlquileres = document.getElementById("alquileres");
  tablaAlquileres.innerHTML = ""; // Limpio el cuerpo de la tabla

  // Agrego  la fila de encabezados a la tabla
  tablaAlquileres.innerHTML =
    "<tr><th>NOMBRE</th><th>PRODUCTO</th><th>DIAS</th><th>PRECIO</th></tr>";

  // Iteratuo sobre los alquileres y agregamos cada uno como una fila de la tabla
  alquileres.forEach(function (alquiler) {
    var fila = tablaAlquileres.insertRow(); // Inserto una nueva fila en la tabla
    var celdaCliente = fila.insertCell(0); // Inserto celdas en la fila
    var celdaProducto = fila.insertCell(1);
    var celdaDias = fila.insertCell(2);
    var celdaPrecio = fila.insertCell(3);
    // Asignamos el contenido de las celdas
    celdaCliente.innerText = alquiler.cliente;
    celdaProducto.innerText = alquiler.producto;
    celdaDias.innerText = alquiler.dias + " días";
    celdaPrecio.innerText = alquiler.precio.toFixed(2) + "€";
  });
}
