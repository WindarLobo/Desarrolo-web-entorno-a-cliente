//Carga la pagina
window.onload = () => {
  document.getElementById("enviar").addEventListener("click", validar, false);
  document
    .getElementById("Verdatos")
    .addEventListener("click", ordenaClasificacion, false);
  document
    .getElementById("Cerrartabla")
    .addEventListener("click", cerrarTabla, false);
};

function validarNombre() {
  var nombreInput = document.getElementById("nombre");
  var nombre = String(nombreInput.value);

  if (nombre === "") {
    document.getElementById("errores").innerHTML +=
      "<br>El nombre es obligatorio.";
    nombreInput.classList.add("errores");
    return false;
  } else if (nombre.includes(" ")) {
    document.getElementById("errores").innerHTML +=
      "<br>El nombre  no puede contener espacios en blanco.";
    telefonoInput.classList.add("errores");
    return false;
  }
  return true;
}
function validaApellido() {
  var apellidoImput = document.getElementById("apellido");
  var apellido = apellidoImput.value;
  if (apellido == "") {
    document.getElementById("errores").innerHTML +=
      "<br>El campo apellido es obligatorio.";
    apellidoImput.classList.add("errores");
    return false;
  } else if (/[0-9]/.test(apellido)) {
    document.getElementById("errores").innerHTML +=
      "<br>Los apellidos no pueden contener números.";
    apellidoImput.classList.add("errores");
    return false;
  }
  return true;
}
function validarEdad() {
  var edadImput = document.getElementById("edad");
  var edad = Number(edadImput.value);
  if (edad < 18 || edad > 80) {
    document.getElementById("errores").innerHTML +=
      "<br>La edad tiene q ser mayor de 18 a 80 años.";
    edadImput.classList.add("errores");
    return false;
  }
  return true;
}
function validarTelefono() {
  var telefonoInput = document.getElementById("telefono");
  var telefono = telefonoInput.value.trim();

  if (telefono === "") {
    document.getElementById("errores").innerHTML +=
      "<br>El campo teléfono no puede estar vacío.";
    telefonoInput.classList.add("errores");
    return false;
  } else if (isNaN(telefono)) {
    document.getElementById("errores").innerHTML +=
      "<br>El campo teléfono debe ser numérico .";
    telefonoInput.classList.add("errores");
    return false;
  }
  return true;
}
function validarCorreo() {
  var emailImput = document.getElementById("email");
  var correoRegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,4}$/;

  if (!correoRegExp.test(emailImput.value)) {
    document.getElementById("errores").innerHTML +=
      "<br>Por favor, introduce un correo electrónico válido";
    emailImput.classList.add("errores");
    return false;
  }
  return true;
}
function validarUrl() {
  var urlInput = document.getElementById("web");
  var urlRegExp =
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
  var url = urlInput.value.trim();
  if (url === "") {
    document.getElementById("errores").innerHTML +=
      "<br>El campo URL no puede estar vacío.";
    urlInput.classList.add("errores");
    return false;
  } else if (!urlRegExp.test(url)) {
    document.getElementById("errores").innerHTML +=
      "<br>Por favor, introduce una URL válida.";
    urlInput.classList.add("errores");
    return false;
  }

  return true;
}
function validarAsunto() {
  var asuntoInput = document.getElementById("asunto");
  var asunto = asuntoInput.value;
  var palabra = asunto.split(/\s+/);

  if (asunto === "") {
    document.getElementById("errores").innerHTML +=
      "<br>El asubto  es obligatorio.";
    asuntoInput.classList.add("errores");
    return false;
  }
  return true;
}
function validar(e) {
  // Eliminar mensajes anteriores
  document.getElementById("errores").innerHTML = "";
  document.getElementById("errores").style.display = "none";
  // Validación
  if (
    validarNombre() &&
    validaApellido() &&
    validarEdad() &&
    validarTelefono() &&
    validarCorreo() &&
    validarUrl() &&
    validarAsunto()
  ) {
    // Inicializar datosScrit con datos si no hay datos en localStorage
    var datosScrit = JSON.parse(localStorage.getItem("datosScrit")) || datos;
    // Guardar el lo nuevo  en datos
    datosScrit.push({
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      telefono: document.getElementById("telefono").value,
      email: document.getElementById("email").value,
      url: document.getElementById("web").value,
      asunto: document.getElementById("asunto").value,
    });

    // Guardar los datos en localStorage
    localStorage.setItem("datosScrit", JSON.stringify(datosScrit));

    return true;
  } else {
    // Evitar envío de formulario
    document.getElementById("errores").style.display = "block";
    e.preventDefault();
    return false;
  }
}
//Pinto la tablas
function ordenaClasificacion() {
  var datosScrit = JSON.parse(localStorage.getItem("datosScrit")) || datos;
  datosScrit.sort((a, b) => a.edad - b.edad);
  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<tr><th>NOMBRE</th><th>APELLIDO</th><th>EDAD</th><th>TELEFONO</th><th>EMAIL</th><th>URL</th><th>ASUNTO</th>";
  for (let i = 0; i < datosScrit.length; i++) {
    if (i < 10)
      document.getElementById("tabla-datos").innerHTML +=
        "</td><td>" +
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
        datosScrit[i].asunto;
    else break;
  }
  // Agregamos esto para asegurarnos de que la tabla se muestre después de ordenar los datos
  document.getElementById("tabla-datos").style.display = "";
}
function cerrarTabla() {
  //Ocultanos la tabla
  document.getElementById("tabla-datos").style.display = "none";
}
