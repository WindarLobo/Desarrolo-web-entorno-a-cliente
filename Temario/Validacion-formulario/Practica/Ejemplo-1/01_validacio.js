window.onload = iniciar;
function iniciar() {
  document.getElementById("enviar").addEventListener("click", validar, false);
}

function validaNombre() {
  var nombre = document.getElementById("nombre");
  if (nombre.value == "") {
    alert("El campo nombre es obligatorio");
    return false;
  }
  return true;
}

function validaApellido() {
  var apellido = document.getElementById("apellido");
  if (apellido.value == "") {
    alert("El campo apellido es obligatorio");
    return false;
  } else if (/[0-9]/.test(apellido.value)) {
    alert("Los apellidos no pueden contener números");
    return false;
  }
  return true;
}

function validaTelefono() {
  var elemento = document.getElementById("telefono");
  if (elemento.value !== "" && isNaN(elemento.value)) {
    alert("El campo teléfono tiene que ser numérico");
    return false;
  }
  return true;
}

function validarUsuario() {
  var usuario = document.getElementById("usuario").value;
  if (usuario.length > 20) {
    alert("El usuario debe tener menos de 20 caracteres");
  }
  return true;
}

function validarCorreo() {
  var email = document.getElementById("email").value;
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    alert("Por favor, introduce un correo electrónico válido");
    return false;
  }
  return true;
}
function validarUsuario() {
  var sugerencias = document.getElementById("sugerencias").value;
  if (sugerencias == "") {
    alert("El campo sugerencias es obligatorio");
    return false;
  }
  return true;
}
function validar(e) {
  if (
    validaNombre() &&
    validaApellido() &&
    validarUsuario() &&
    validaTelefono() &&
    validarCorreo() &&
    validarSugerencia() &&
    confirm("Pulsa aceptar si deseas enviar el formulario")
  ) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
}
