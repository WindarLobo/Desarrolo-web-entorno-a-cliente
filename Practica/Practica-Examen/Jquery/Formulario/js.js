$(document).ready(function () {
  $("#nombre").on("blur", validarNombre);
  $("#apellido").on("blur", validaApellido);
  $("#edad").on("blur", validarEdad);
  $("#telefono").on("blur", validarTelefono);
  $("#email").on("blur", validarCorreo);
  $("#web").on("blur", validarUrl);
  $("#asunto").on("blur", validarAsunto);
  $("#enviar").on("click", validar);
  $("#Verdatos").on("click", ordenaClasificacion);
  $("#Cerrartabla").on("click", cerrarTabla);
});

//con cookies

function guardarDatosEnCookies(datos) {
  // Convertir los datos a una cadena JSON
  var datosString = JSON.stringify(datos);
  // Establecer la cookie con los datos
  document.cookie =
    "datosScrit=" + datosString + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Caduca en una fecha futura
}

// Función para recuperar datos de cookies
function recuperarDatosDeCookies() {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === "datosScrit") {
      return JSON.parse(decodeURIComponent(cookie[1]));
    }
  }
  return [];
}

function eliminarDatosDeCookies() {
  $.removeCookie("datosScrit");
}

function validarNombre() {
  var nombre = $("#nombre").val().trim();
  if (nombre === "") {
    $("#errores").append("<br>El nombre es obligatorio.");
    Aplicarblur($("#nombre"), false);
    return false;
  } else if (nombre.includes(" ")) {
    $("#errores").append("<br>El nombre no puede contener espacios en blanco.");
    Aplicarblur($("#nombre"), false);
    return false;
  }
  Aplicarblur($("#nombre"), true);
  return true;
}

function validaApellido() {
  var apellido = $("#apellido").val().trim();
  if (apellido === "") {
    $("#errores").append("<br>El campo apellido es obligatorio.");
    Aplicarblur($("#apellido"), false);
    return false;
  } else if (/\d/.test(apellido)) {
    $("#errores").append("<br>Los apellidos no pueden contener números.");
    Aplicarblur($("#apellido"), false);
    return false;
  }
  Aplicarblur($("#apellido"), true);
  return true;
}

function validarEdad() {
  var edad = Number($("#edad").val());
  if (edad < 18 || edad > 80) {
    $("#errores").append("<br>La edad tiene que estar entre 18 y 80 años.");
    Aplicarblur($("#edad"), false);
    return false;
  }
  Aplicarblur($("#edad"), true);
  return true;
}

function validarTelefono() {
  var telefono = $("#telefono").val().trim();
  if (telefono === "") {
    $("#errores").append("<br>El campo teléfono no puede estar vacío.");
    Aplicarblur($("#telefono"), false);
    return false;
  } else if (isNaN(telefono)) {
    $("#errores").append("<br>El campo teléfono debe ser numérico.");
    Aplicarblur($("#telefono"), false);
    return false;
  }
  Aplicarblur($("#telefono"), true);
  return true;
}

function validarCorreo() {
  var correo = $("#email").val().trim();
  var correoRegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,4}$/;
  if (!correoRegExp.test(correo)) {
    $("#errores").append(
      "<br>Por favor, introduce un correo electrónico válido."
    );
    Aplicarblur($("#email"), false);

    return false;
  }
  Aplicarblur($("#email"), true);
  return true;
}

function validarUrl() {
  var url = $("#web").val().trim();
  var urlRegExp =
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
  if (url === "") {
    $("#errores").append("<br>El campo URL no puede estar vacío.");
    Aplicarblur($("#web"), false);
    return false;
  } else if (!urlRegExp.test(url)) {
    $("#errores").append("<br>Por favor, introduce una URL válida.");
    Aplicarblur($("#web"), false);
    return false;
  }
  Aplicarblur($("#web"), true);
  return true;
}

function validarAsunto() {
  var asunto = $("#asunto").val().trim();
  if (asunto === "") {
    $("#errores").append("<br>El asunto es obligatorio.");
    Aplicarblur($("#asunto"), false);
    return false;
  }
  Aplicarblur($("#asunto"), true);
  return true;
}

function validar(e) {
  $("#errores").empty();
  $("#errores").hide();
  if (
    validarNombre() &&
    validaApellido() &&
    validarEdad() &&
    validarTelefono() &&
    validarCorreo() &&
    validarUrl() &&
    validarAsunto()
  ) {
    //var datosScrit = JSON.parse(localStorage.getItem("datosScrit")) || datos;

    //Con cookies
    var datosScrit = recuperarDatosDeCookies();
    datosScrit.push({
      nombre: $("#nombre").val(),
      apellido: $("#apellido").val(),
      edad: $("#edad").val(),
      telefono: $("#telefono").val(),
      email: $("#email").val(),
      url: $("#web").val(),
      asunto: $("#asunto").val(),
    });

    // localStorage.setItem("datosScrit", JSON.stringify(datosScrit));

    guardarDatosEnCookies(datosScrit);
    return true;
  } else {
    $("#errores").show();
    e.preventDefault();
    return false;
  }
}
function Aplicarblur(input, valido) {
  if (!valido) {
    $(input).addClass("error");
  } else {
    $(input).removeClass("error");
  }
}
function ordenaClasificacion() {
  //var datosScrit = JSON.parse(localStorage.getItem("datosScrit")) || datos;
  //Con cookies
  var datosScrit = recuperarDatosDeCookies();
  datosScrit.sort((a, b) => a.edad - b.edad);
  $("#tabla-datos")
    .empty()
    .append(
      "<tr><th>NOMBRE</th><th>APELLIDO</th><th>EDAD</th><th>TELEFONO</th><th>EMAIL</th><th>URL</th><th>ASUNTO</th>"
    );
  for (let i = 0; i < datosScrit.length; i++) {
    if (i < 10) {
      $("#tabla-datos").append(
        "<tr><td>" +
          datosScrit[i].nombre +
          "</td><td>" +
          datosScrit[i].apellido +
          "</td><td>" +
          datosScrit[i].edad +
          "</td><td>" +
          datosScrit[i].telefono +
          "</td><td>" +
          datosScrit[i].email +
          "</td><td>" +
          datosScrit[i].url +
          "</td><td>" +
          datosScrit[i].asunto +
          "</td></tr>"
      );
    } else {
      break;
    }
  }
  $("#tabla-datos").show();
}

function cerrarTabla() {
  $("#tabla-datos").hide();
}
