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
const btnLogin = document.getElementById("btnSubmitLogin");
const header = document.getElementById("header");
const loginForm = document.getElementById("login");
const cerrarSesion = document.getElementById("cerrar");
const usuario = document.getElementById("usuario");
const password = document.getElementById("contrasena");
// Estado de autenticación
let usuarioAutenticado = false;
// Cargo de la página
window.onload = () => {
  // Mostrar la vista correspondiente según el estado de autenticación
  mostrarVista();
  // Evento al hacer clic en el botón de registro
  document.getElementById("enviar").addEventListener("click", validar);
};

// Eventos de los botones de navegación
btnVentas.addEventListener("click", function () {
  if (usuarioAutenticado) {
    mostrarSeccion(ventasSection);
    mostrarEnVentas();
  }
});

btnRegistro.addEventListener("click", function () {
  if (usuarioAutenticado) {
    mostrarSeccion(registroSection);
  }
});

btnProductos.addEventListener("click", function () {
  if (usuarioAutenticado) {
    mostrarSeccion(productosSection);
    mostrarProductos();
  }
});
// Evento al hacer clic en el botón de inicio de sesión
btnLogin.addEventListener("click", function () {
  autenticarUsuario();
  mostrarVista();
});
cerrarSesion.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("usuarioAutenticado");
  header.style.display = "none";
  registroSection.style.display = "none";
  productosSection.style.display = "none";
  ventasSection.style.display = "none";
  loginForm.style.display = "block";
});

// Función para mostrar una sección y ocultar las demás
function mostrarSeccion(seccion) {
  const secciones = [
    loginForm,
    registroSection,
    productosSection,
    ventasSection,
  ];
  // Ocultar todas las secciones
  secciones.forEach((seccion) => (seccion.style.display = "none"));
  // Mostrar la sección seleccionada
  seccion.style.display = "block";
}

// Datos
let datosScript = localStorage.getItem("datosScript");
datosScript = datosScript != null ? JSON.parse(datosScript) : datos;

// Función para autenticar al usuario
function autenticarUsuario() {
  const usuarioInput = String(usuario.value);
  const passwordInput = String(password.value);
  if (usuarioInput !== "" && passwordInput !== "") {
    localStorage.setItem("usuarioAutenticado", JSON.stringify(usuarioInput));
  } else {
    document.getElementById("errores").innerHTML +=
      "Usuario o contraseña incorrectos";
  }
}

// Función para mostrar la vista correspondiente según el estado de autenticación
function mostrarVista() {
  // Verificar si el usuario está autenticado
  const usuarioAutenticadoStorage = localStorage.getItem("usuarioAutenticado");
  // Actualizar el estado de autenticación
  usuarioAutenticado = usuarioAutenticadoStorage ? true : false;
  if (usuarioAutenticado) {
    loginForm.style.display = "none";
    header.style.display = "block";
    // Mostrar nombre del usuario
    document.getElementById("usuarioVista").textContent =
      usuarioAutenticadoStorage;
  } else {
    loginForm.style.display = "block";
    header.style.display = "none";
  }
}

// Función para validar el nombre del producto
function validarNombreProducto() {
  const nombreInput = String(nombre.value);
  if (nombreInput == "") {
    document.getElementById("errores").innerHTML +=
      "<br>El nombre del producto es obligatorio.";
    return false;
  }
  return true;
}

// Función para validar el precio del producto
function validarPrecio() {
  const precioInput = Number(precio.value);
  if (isNaN(precioInput) || precioInput <= 0) {
    document.getElementById("errores").innerHTML +=
      "<br>Por favor, ingrese un precio válido.";
    return false;
  }
  return true;
}

// Función para validar el formulario de registro
function validar(e) {
  document.getElementById("errores").innerHTML = "";
  document.getElementById("errores").style.display = "none";
  if (validarNombreProducto() && validarPrecio()) {
    agregarProducto();
    return true;
  } else {
    e.preventDefault();
    document.getElementById("errores").style.display = "block";
    return false;
  }
}

// Función para agregar un producto
function agregarProducto() {
  const nombreValor = nombre.value;
  const precioValor = precio.value;
  const descripcionValor = descripcion.value;
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  const nombreUsuario = usuarioAutenticado
    ? JSON.parse(usuarioAutenticado).usuario
    : null;

  const index = datosScript.findIndex(
    (producto) => producto.nombre === nombreValor
  );
  if (index !== -1) {
    datosScript[index].precio = precioValor;
    datosScript[index].descripcion = descripcionValor;
    datosScript[index].usuario = nombreUsuario;
  } else {
    datosScript.push({
      nombre: nombreValor,
      precio: precioValor,
      descripcion: descripcionValor,
      usuario: nombreUsuario,
    });
  }

  localStorage.setItem("datosScript", JSON.stringify(datosScript));
}

// Función para mostrar los productos del usuario autenticado
function mostrarProductos() {
  const usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  const nombreUsuario = usuarioAutenticado
    ? JSON.parse(usuarioAutenticado).usuario
    : null;

  const productosUsuario = datosScript.filter(
    (producto) => producto.usuario === nombreUsuario
  );

  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<th>NOMBRE</th><th>PRECIO</th><th>DESCRIPCION</th><th>type</th></tr>";
  for (let i = 0; i < productosUsuario.length; i++) {
    if (i < 10) {
      document.getElementById("tabla-datos").innerHTML +=
        "</td><td>" +
        productosUsuario[i].nombre +
        "</td><td>" +
        productosUsuario[i].precio +
        "€</td><td>" +
        productosUsuario[i].descripcion +
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
  if (producto) {
    // Aquí va el resto del código

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

    // Si el producto no está en la lista, lo agrego como una fila
    if (!productoExistente) {
      ventasLista.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio} €</td>
            <td>${producto.precio} €</td>
            <td>1</td>
        </tr>
        `;
    }
    // Calcular la suma total de los precios de los productos en la lista
    const totalElement = document.getElementById("total-ventas");
    let total = 0;
    filasProductos.forEach((fila, index) => {
      if (index !== 0) {
        // Ignorar la primera fila que contiene los encabezados
        total += parseFloat(fila.querySelector("td:nth-child(3)").textContent);
      }
    });
    totalElement.textContent = total.toFixed(2);

    // Actualizo la cantidad en el botón de la cesta
    const cartCountElement = document.getElementById("cart-count");
    let cantidadEnCesta = parseInt(cartCountElement.textContent.slice(1, -1));
    cantidadEnCesta++; // Incremento la cantidad en 1
    cartCountElement.textContent = `(${cantidadEnCesta})`;
  }
}
