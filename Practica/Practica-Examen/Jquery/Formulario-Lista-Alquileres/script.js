$(document).ready(function () {
  //variables para crear un nuevo usuario
  const nombreNuevoUsuario = $("#nuevoNombre");
  const dniNuevoSolicitante = $("#nuevoDNI");
  const emailNuevoSolicitante = $("#nuevoEmail");

  //formulario de alquiler
  const formAlquier = $("#formulario");

  //variables para acceder
  const nombreUsuarioExistente = $("#borrowerName");
  const dniUsuarioExistente = $("#borrowerDNI");
  const emailSolicitante = $("#borrowerEmail");

  //botones
  const botonNuevoUsuario = $("#crearUsuario");
  const botonAcceso = $("#botonAcceso");
  const botonRegistro = $("#registro");
  const botonCerrarSesion = $("#cerrarSesion");

  //Almaceno los usuarios en el almacenamiento local
  let usuariosScript = JSON.parse(localStorage.getItem("usuariosScript")) || [];

  // Reseteo de inputs
  $("#loanForm")[0].reset();
  $("#usuario")[0].reset();

  //funcion validar usuario valido existente para acceder a la biblioteca
  function validarAcceso() {
    let usuarioValido = null;
    $.each(usuariosScript, function (index, usuario) {
      if (
        nombreUsuarioExistente.val() === usuario.nombre &&
        dniUsuarioExistente.val() === usuario.dni &&
        emailSolicitante.val() === usuario.email
      ) {
        usuarioValido = usuario;
        return false; // Salir del bucle $.each una vez que se encuentra el usuario válido
      }
    });
    return usuarioValido;
  }

  //botones
  botonAcceso.on("click", function () {
    var usuarioValido = validarAcceso();
    if (usuarioValido !== null) {
      // Muestro la tabla de alquileres
      $("#registroAlquiler").css("display", "block");
      $("#usuario").css("display", "none");
      // Actualizo la tabla con los alquileres del usuario
      actualizarListaAlquileres(usuarioValido.alquileres);
      // Muestro el total de alquileres del usuario
      actualizarTotal(usuarioValido);
    } else {
      $("#errores").html("Usuario no válido. Por favor, inténtelo de nuevo.");
    }
  });

  botonRegistro.on("click", function () {
    $("#loanForm").css("display", "block");
    $("#usuario").css("display", "none");
  });

  botonCerrarSesion.on("click", function () {
    $("#usuario").css("display", "block");
    $("#registroAlquiler").css("display", "none");
    $("#usuario")[0].reset();
  });

  //funcion para registrar un nuevo alquiler
  formAlquier.on("submit", function (event) {
    event.preventDefault();
    registrarAlquiler();
  });

  //Validaciones

  function validarNombre() {
    let nombre = nombreNuevoUsuario.val().trim();
    if (nombre.includes(" ")) {
      $("#errores").html("Este campo no puede contener espacios <br>");
      return false;
    } else if (nombre === "") {
      $("#errores").html("Este campo nombre es obligatorio <br>");
      return false;
    } else {
      return true;
    }
  }

  function validarDni() {
    let dni = dniNuevoSolicitante.val().trim();
    const dniValido = /^[0-9]{8}[A-Z]$/.test(dni);
    if (!dniValido) {
      $("#errores").html("El dni tiene que incluir 8 numero y una letra <br>");
      return false;
    } else {
      return true;
    }
  }

  function validarEmail() {
    let email = emailNuevoSolicitante.val().trim();
    const emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/.test(
      email
    );
    if (!emailValido) {
      $("#errores").html("Este email no es valido");
      return false;
    } else {
      return true;
    }
  }
  botonNuevoUsuario.on("click", validarNuevoUsuario);
  function validarNuevoUsuario(e) {
    $("#errores").html("");
    $("#errores").css("display", "none");
    if (validarNombre() && validarDni() && validarEmail()) {
      agregarUsuario();
      $("#errores").html("");
    } else {
      $("#errores").css("display", "block");
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
    let nombreIngresado = nombreNuevoUsuario.val().trim().toLowerCase();
    let dniIngresado = dniNuevoSolicitante.val().trim().toLowerCase();
    let emailIngresado = emailNuevoSolicitante.val().trim().toLowerCase();

    // Verifico si el usuario ya existe
    let usuarioExistente = usuariosScript.find(function (usuario) {
      return (
        nombreIngresado === usuario.nombre.toLowerCase() &&
        dniIngresado === usuario.dni.toLowerCase() &&
        emailIngresado === usuario.email.toLowerCase()
      );
    });

    if (usuarioExistente) {
      $("#errores").html("Este usuario ya existe<br>");
    } else {
      // Agrego nuevo usuario con lista de alquileres vacía
      let nuevoUsuario = {
        nombre: nombreNuevoUsuario.val(),
        dni: dniNuevoSolicitante.val(),
        email: emailNuevoSolicitante.val(),
        alquileres: [],
      };

      // Añado el nuevo usuario a la lista de usuarios
      usuariosScript.push(nuevoUsuario);
      // Guardo en el almacenamiento local
      localStorage.setItem("usuariosScript", JSON.stringify(usuariosScript));
    }
  }

  function registrarAlquiler() {
    // Obtengo los valores del formulario
    var cliente = $("#cliente").val();
    var producto = $("#producto").val();
    var dias = $("#dias").val();

    // Valido los datos
    if (cliente === "" || dias === "") {
      $("#mensaje").text("Por favor, complete todos los campos.");
    } else if (isNaN(dias) || parseInt(dias) <= 0) {
      $("#mensaje").text("La cantidad de días debe ser un número válido.");
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

        $("#cliente").val("");
        $("#dias").val("");
      } else {
        $("#mensaje").text("No se encontró ningún usuario válido.");
      }
    }
  }

  function actualizarTotal(usuarioActual) {
    var total = usuarioActual.alquileres.reduce(function (
      acumulador,
      alquiler
    ) {
      return acumulador + alquiler.precio;
    },
    0);
    $("#total").text("Total al pagar: " + total.toFixed(2) + "€");
  }

  function actualizarListaAlquileres(alquileres) {
    var tablaAlquileres = $("#alquileres");
    tablaAlquileres.html(""); // Limpio el cuerpo de la tabla

    // Agrego la fila de encabezados a la tabla
    tablaAlquileres.html(
      "<tr><th>NOMBRE</th><th>PRODUCTO</th><th>DIAS</th><th>PRECIO</th></tr>"
    );

    // Itero sobre los alquileres y agrego cada uno como una fila de la tabla
    $.each(alquileres, function (index, alquiler) {
      var fila = tablaAlquileres[0].insertRow(); // Inserto una nueva fila en la tabla
      var celdaCliente = fila.insertCell(0); // Inserto celdas en la fila
      var celdaProducto = fila.insertCell(1);
      var celdaDias = fila.insertCell(2);
      var celdaPrecio = fila.insertCell(3);
      // Asigno el contenido de las celdas
      celdaCliente.innerText = alquiler.cliente;
      celdaProducto.innerText = alquiler.producto;
      celdaDias.innerText = alquiler.dias + " días";
      celdaPrecio.innerText = alquiler.precio.toFixed(2) + "€";
    });
  }
});
