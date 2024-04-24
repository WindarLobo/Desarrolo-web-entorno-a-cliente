// Elementos DOM
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const btnRegistro = document.getElementById("btnRegistro");
const btnProductos = document.getElementById("btnProductos");
const btnVentas = document.getElementById("btnventas");
const registroSection = document.getElementById("registro");
const productosSection = document.getElementById("productos");
const ventasSection = document.getElementById("ventas");
// Variables para elementos del DOM
const btnLogin = document.getElementById("btnSubmitLogin");
const loginForm = document.getElementById("login");
const header = document.querySelector("header");

let usuarioAutenticado = false;

// Lógica para verificar si las credenciales son válidas
function estaUsuarioAutenticado() {
    var usuario = document.getElementById("usuario").value.trim();
    var contraseña = document.getElementById("contrasena").value.trim();
    // Verificar si las credenciales son válidas (aquí puedes modificar la lógica según tus necesidades)
    return usuario === "usuario" && contraseña === "contraseña";
}

// Función para registrar un producto
function registrarProducto() {
    // Verificar si el usuario está autenticado antes de permitir registrar el producto
    if (usuarioAutenticado) {
        // Aquí puedes agregar la lógica para registrar el producto
        // Por ejemplo:
        alert("Producto registrado correctamente.");
    } else {
        // Si el usuario no está autenticado, redirigir al formulario de inicio de sesión
        alert("Debe iniciar sesión para registrar un producto.");
    }
}

//Cargo la pagina
window.onload = () => {
  // Agregar evento al formulario de inicio de sesión
  document.querySelector("#login form").addEventListener("submit", function(e) {
    e.preventDefault(); // Evitar que el formulario se envíe y la página se recargue

    // Verificar las credenciales del usuario (aquí puedes hacerlo como lo haces en tu función estaUsuarioAutenticado)
    if (estaUsuarioAutenticado()) {
        // Si el usuario está autenticado, mostrar el header y las secciones correspondientes
        header.style.display = "block";
        loginForm.style.display = "none"; // Ocultar formulario de inicio de sesión
        usuarioAutenticado = true; // Actualizar el estado de autenticación
    } else {
        // Si las credenciales no son válidas, mostrar un mensaje de error o realizar alguna acción adecuada
        alert("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
    }
});

// Evento al hacer clic en el botón de registrar producto
document.getElementById("btnRegistrarProducto").addEventListener("click", function(e) {
    e.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
    registrarProducto();
});
  document.getElementById("enviar").addEventListener("click", validar);
 
};
//Muestro
btnVentas.addEventListener("click", function () {
  productosSection.style.display = "none";
  registroSection.style.display = "none";
  ventasSection.style.display = "block";
  mostrarEnVentas();
});
btnRegistro.addEventListener("click", function () {
  registroSection.style.display = "block";
  ventasSection.style.display = "none";
  productosSection.style.display = "none";
  loginForm.style.display = "none";
});
btnProductos.addEventListener("click", function () {
  registroSection.style.display = "none";
  ventasSection.style.display = "none";
  productosSection.style.display = "block";
  mostrarProductos();
});

let datosScript = localStorage.getItem("datosScript");
if (datosScript != null) {
  datosScript = JSON.parse(datosScript);
} else {
  datosScript = datos;
}

function validarNombreProducto() {
  var nombreInput = String(nombre.value);
  if (nombreInput == "") {
    document.getElementById("errores").innerHTML +=
      "<br>El nombre del producto es obligatorio.";
    return false;
  }
  return true;
}

function validarPrecio() {
  var precioInput = Number(precio.value);
  if (isNaN(precioInput) || precioInput <= 0) {
    document.getElementById("errores").innerHTML +=
      "<br>Por favor, ingrese un precio válido.";
    return false;
  }
  return true;
}

function validar(e) {
  document.getElementById("errores").innerHTML = ""; // Elimino mensajes anteriores
  document.getElementById("errores").style.display = "none";
  if (validarNombreProducto() && validarPrecio()) {
    agregarProducto();
    return true;
  } else {
    document.getElementById("errores").style.display = "block";
    e.preventDefault();
    return false;
  }
}
function agregarProducto() {
  const nombreValor = nombre.value;
  const precioValor = precio.value;
  const descripcionValor = descripcion.value;

  const index = datosScript.findIndex(
    (producto) => producto.nombre === nombreValor
  ); // Verifico si el producto ya existe en la lista
  if (index !== -1) {
    datosScript[index].precio = precioValor; // Si el producto existe, actualizo sus detalles
    datosScript[index].descripcion = descripcionValor;
  } else {
    datosScript.push({
      nombre: nombreValor,
      precio: precioValor,
      descripcion: descripcionValor,
    }); // Si el producto no existe, lo agrego en  la lista
  }

  localStorage.setItem("datosScript", JSON.stringify(datosScript)); // Guardo los datos y actualizo en localStorage
}

function mostrarProductos() {
  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<th>NOMBRE</th><th>PRECIO</th><th>DESCRIPCION</th><th>type</th></tr>";
  for (let i = 0; i < datosScript.length; i++) {
    if (i < 10) {
      document.getElementById("tabla-datos").innerHTML +=
        "</td><td>" +
        datosScript[i].nombre +
        "</td><td>" +
        datosScript[i].precio +
        "</td><td>" +
        datosScript[i].descripcion +
        "</td><td><button id='mostrarEnVentas' onclick='mostrarEnVentas(" +
        i +
        ")'>Agregar producto</button>";
    } else {
      break;
    }
  }
}
function mostrarEnVentas(index) {
  const producto = datosScript[index];
  const ventasLista = document.getElementById("ventasLista");
  if (!ventasLista.querySelector("tr th")) {
    ventasLista.innerHTML = `
        <tr>
            <th>NOMBRE</th>
            <th>PRECIO UNITARIO</th>
            <th>PRECIO TOTAL</th>
            <th>Cantidad</th>
        </tr>`;
  }

  // Verifico si el producto ya está en la lista
  const filasProductos = ventasLista.querySelectorAll("tr");
  let productoExistente = false;
  for (let i = 1; i < filasProductos.length; i++) {
    const nombreProducto =
      filasProductos[i].querySelector("td:first-child").textContent;
    if (nombreProducto == producto.nombre) {
      // Si el producto ya está en la lista, aumento la cantidad y actualizo el precio total
      let cantidad = parseInt(
        filasProductos[i].querySelector("td:last-child").textContent
      );
      cantidad++;
      filasProductos[i].querySelector("td:last-child").textContent = cantidad;
      const precioUnitario = parseFloat(
        filasProductos[i].querySelector("td:nth-child(2)").textContent
      );
      const precioTotal = cantidad * precioUnitario;
      filasProductos[i].querySelector("td:nth-child(3)").textContent =
        precioTotal.toFixed(2);
      productoExistente = true;
      break;
    }
  }

  // Si el producto no está en la lista, lo agrego como una nueva fila
  if (!productoExistente) {
    ventasLista.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.precio}</td>
            <td>1</td>
        </tr>
        `;
  }
  // Actualizo la cantidad en el botón de la cesta
  const cartCountElement = document.getElementById("cart-count");
  let cantidadEnCesta = parseInt(cartCountElement.textContent.slice(1, -1));
  cantidadEnCesta++; // Incremento la cantidad en 1
  cartCountElement.textContent = `(${cantidadEnCesta})`;
}