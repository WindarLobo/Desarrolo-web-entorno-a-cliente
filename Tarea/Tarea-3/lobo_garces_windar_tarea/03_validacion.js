window.onload = () => {
  // Se ejecuta cuando la ventana y todos sus recursos asociados se han cargado completamente.

  // Apartado 6 : Cuando el campo Pierde foco, se llama a la función

  document.getElementById("txtNombre").addEventListener("blur", validarNombre);

  document.getElementById("txtEdad").addEventListener("blur", validarEdad);

  document
    .getElementById("txtPass1")
    .addEventListener("blur", validarContraseña);

  document
    .getElementById("txtPass2")
    .addEventListener("blur", validarContraseña);

  document.getElementById("txtEmail").addEventListener("blur", validarEmail);

  // Cuando se hace clic en el botón de enviar, se llama a la función validar.
  document
    .getElementById("btnEnviar")
    .addEventListener("click", validar, false);

  // Cuando se hace clic en el checkbox de términos y condiciones, se llama a la función aceptacionYTermino.
  document
    .getElementById("chkTyc")
    .addEventListener("click", aceptacionYTermino, false);

  // Llamo  a la función aceptacionYTermino para configurar inicialmente el estado del botón de enviar.
  aceptacionYTermino();
};

//Aparato 1 :

/* a. Valida el nombre ingresado en un campo de entrada. */

function validarNombre() {
  // Obtengo el elemento de entrada del nombre.
  let nombreInput = document.getElementById("txtNombre");
  // Obtengo el valor del nombre y eliminar los espacios en blanco al principio y al final.
  let nombre = String(nombreInput.value.trim());
  // Verifico si el campo de nombre está vacío.
  if (nombre === "") {
    // Muestro un mensaje de error si el campo de nombre está vacío.
    document.getElementById("errores").innerHTML = "El nombre es obligatorio.";
    // Añado una clase de error al campo de entrada de nombre para resaltar el error-input.
    nombreInput.classList.add("error-input");
    return false;
  }
  // Verifico si el nombre contiene espacios en blanco.
  if (nombre.includes(" ")) {
    document.getElementById("errores").innerHTML +=
      "<br> El nombre no puede contener espacios en blanco.";
    nombreInput.classList.add("error-input");
    return false;
  }
  return true;
}

/* b. Añado una function validarEdad(), valida la edad ingresada en un campo de entrada.*/

function validarEdad() {
  // Obtengo el elemento de entrada de la edad.
  var edadInpunt = document.getElementById("txtEdad");
  // Obtengo el valor de la edad y convertirlo a un número.
  var edad = Number(edadInpunt.value);
  // Verifico si la edad está fuera del rango permitido (18 a 120 años).
  if (edad < 18 || edad > 120) {
    // Muestro un mensaje de error si la edad está fuera del rango permitido.
    document.getElementById("errores").innerHTML +=
      "<br> La edad debe estar en el rango de 18 a 120 años.";
    // Agrego una clase de error al campo de entrada de edad para resaltar el error-input.
    edadInpunt.classList.add("error-input");
    return false;
  }
  return true;
}

/*c y d. Añado una function validarContraseña() que valida las contraseñas ingresadas en dos campos de entrada. */

function validarContraseña() {
  // Obtengo el valor del primer campo de entrada de contraseña.
  let contraseñaInput1 = document.getElementById("txtPass1");
  // Obtengo el valor del segundo campo de entrada de contraseña.
  let contraseñaInput2 = document.getElementById("txtPass2");
  // Verifico si las contraseñas ingresadas no coinciden.
  if (contraseñaInput1.value != contraseñaInput2.value) {
    // Mostrar un mensaje de error.
    document.getElementById("errores").innerHTML +=
      "<br> La contraseña no coinciden. Por favor, vuelva a intentarlo.";
    // Agregar una clase de error al segundo campo de entrada de contraseña para resaltar el error-input.
    contraseñaInput2.classList.add("error-input");
    return false;
  }
  // Verifico si la longitud de la contraseña es menor que 6 caracteres.
  if (contraseñaInput1.value.length < 6) {
    // Mostrar un mensaje de error.
    document.getElementById("errores").innerHTML +=
      "<br> La contraseña deber contener al menos 6 caracteres.";
    // Agregar una clase de error al segundo campo de entrada de contraseña para resaltar el error-input.
    contraseñaInput1.classList.add("error-input");
    return false;
  }
  return true;
}

/* e. Añado una function validarEmail()  Valida el formato de un correo electrónico ingresado en un campo de entrada.
 */
function validarEmail() {
  // Obtengo el elemento de entrada de correo electrónico.
  let correoInput = document.getElementById("txtEmail");
  // Expresión regular.
  let correoRegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,4}$/;
  // Verifico si el valor del correo electrónico coincide con el patrón de la expresión regular.
  if (!correoRegExp.test(correoInput.value)) {
    // Si el correo electrónico no es válido, mostrar un mensaje de error-input.
    document.getElementById("errores").innerHTML +=
      "<br> Por favor, introduce un correo electrónico válido.";
    // Agregar una clase de error al campo de entrada de correo electrónico para resaltar el error-input.
    correoInput.classList.add("error-input");
    return false;
  }
  return true;
}

/* Apartado 2.
  Añado una funtion aceptacionYTermino() que  maneja la aceptación de
  términos y condiciones y la habilitación/deshabilitación del botón de enviar.
 */
function aceptacionYTermino() {
  // Agrego un evento de clic al checkbox de términos y condiciones.
  document.getElementById("chkTyc").addEventListener("click", function () {
    // Habilita/deshabilita el botón de enviar según si el checkbox está marcado o no.
    document.getElementById("btnEnviar").disabled = !this.checked;
  });
}

// Apartado 3.
function validar(e) {
  //validate_v1() Es la funcion original  del ejercicio (contador unico para todos los usuarios)
  // validate_v1(e);

  /* validate_v2() Es la funcion extra que me pediste (contador por usuario, 
  se almacena en localStorage clave - valor(usuario - intentos)).
  
  Analice dos posibles implementaciones:
   1- Guardar una key fija en db "UsuariosIntentosFallidos" donde el valor seria un json con objetos usuario/intentos
    [
      {
        "Usuario": "Windar",
        "Fallidos": 2
      },
      {
        "Usuario": "Juan",
        "Fallidos": 4
      }
  ]

   2- Usar el propion nombre de usuario como key de la bd y valor el numero de intentos fallidos (Obté por esta solución)

   Cual crees que es la mejor o solución mas óptima?

  */
  validate_v2(e);
}

/*Añado una Función validate_v1(e)  que  valida el formulario y cuenta los  intentos de inicio de sesión.*/
function validate_v1(e) {
  let num_intentos_fallidos = Number(localStorage.getItem("intentosFallidos"));
  // Obtengo el nombre de usuario ingresado
  let nombreUsuario = document.getElementById("txtNombre").value.trim();
  // Aparatado 4.  Limpio cualquier mensaje de error anterior
  document.getElementById("errores").innerHTML = "";
  // Valido todos los campos del formulario
  validarNombre();
  validarEdad();
  validarContraseña();
  validarEmail();
  //Verifico si hay errores en el formulario
  if (document.getElementById("errores").innerHTML == "") {
    // Guardo el nombre de usuario en el almacenamiento local.
    localStorage.setItem("nombreUsuario", nombreUsuario);
    //Realmente no seria necesario guardar los intentos fallidos en este punto
    localStorage.setItem("intentosFallidos", num_intentos_fallidos);
    // Si no hay errores, restauro el estilo de los campos
    restaurarEstiloCampos();
    return true;
  } else {
    // Incrementar los intentos fallidos
    num_intentos_fallidos++;
    //Guardo los intentos fallidos en el almacenamiento local.
    localStorage.setItem("intentosFallidos", num_intentos_fallidos);
    // Aparatdo 5. Muestro el número de intentos fallidos y el nombre de usuario en la interfaz
    document.getElementById("intentos").innerHTML =
      "Número de intentos fallidos: (" +
      num_intentos_fallidos +
      ") - Usuario: " +
      nombreUsuario;
    // Evitar el envío del formulario.
    e.preventDefault();
    return false;
  }
}
// Esta función validate_v2(e), realiza la validación del formulario cuando se envía.
function validate_v2(e) {
  // Obtengo el valor del nombre de usuario del campo de texto y eliminar espacios en blanco al principio y al final.
  let nombreUsuario = document.getElementById("txtNombre").value.trim();
  // Obtengo el número de intentos fallidos del almacenamiento local para este usuario.
  let num_intentos_fallidos = Number(localStorage.getItem(nombreUsuario));
  // Aparatado 4. Limpio cualquier mensaje de error anterior
  document.getElementById("errores").innerHTML = "";
  // Valido todos los campos del formulario
  validarNombre();
  validarEdad();
  validarContraseña();
  validarEmail();
  if (document.getElementById("errores").innerHTML == "") {
    restaurarEstiloCampos();
    return true;
  } else {
    // Incremento el número de intentos fallidos.
    num_intentos_fallidos++;
    // Actualizo el número de intentos fallidos en el almacenamiento local.
    localStorage.setItem(nombreUsuario, num_intentos_fallidos);
    // Aparatdo 5. Muestro el número de intentos fallidos y el nombre de usuario en la interfaz
    document.getElementById("intentos").innerHTML =
      "Número de intentos fallidos: (" +
      num_intentos_fallidos +
      ") - Usuario: " +
      nombreUsuario;
    // Evito el envío del formulario.
    e.preventDefault();
    return false;
  }
}

/* Aparado 7.
   Añado una function restaurarEstiloCampos() restauro el estilo de los campos de entrada
   eliminando la clase de error-input. */
function restaurarEstiloCampos() {
  // Selecciona todos los elementos de entrada en el documento.
  let inputs = document.querySelectorAll("input");
  // Itera sobre cada elemento de entrada y elimina la clase de error-input.
  inputs.forEach(function (input) {
    input.classList.remove("error-input");
  });
}
