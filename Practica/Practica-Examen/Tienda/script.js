// Usuario nuevo
const nombreNuevoUsuario = document.getElementById("nuevoNombre");
const contraseñaNueva1 = document.getElementById("nuevaContraseña1");
const contraseñaNueva2 = document.getElementById("nuevaContraseña2");

//Usuario existente
const nombreUsuarioExistente = document.getElementById("usuarioInicioSesion");
const contraseñaUsuarioExistente = document.getElementById("contrasena");

//Crear  productos
const nombreProducto = document.getElementById("nombre");
const precioProducto = document.getElementById("precio");
const descripcionProducto = document.getElementById("descripcion");

//Botones de la página
const btnNuevoUsuario = document.getElementById("crearUsuario");
const btnRegistro = document.getElementById("registroLinck");
const btnProductos = document.getElementById("btnProductos");
const btnAcceso = document.getElementById("botonAcceso");
const btnRegistroProducto = document.getElementById("btnRegistro");
const btnVentas = document.getElementById("btnventas");
const bntcerrarSesion = document.getElementById("cerrar");
const btnRegistroDeProducto = document.getElementById("enviar");

//Section vista
const registroSection = document.getElementById("registro");
const containerUsuario = document.getElementById("containerUsuario");
const formInicioUsuario = document.getElementById("formularioInicioSesion");
const formRegistroUsuario = document.getElementById("loanForm");
const registroForm = document.getElementById("registroForm");
const header = document.getElementById("header");
const ventasSection = document.getElementById("ventas");
const productosSection = document.getElementById("productos");

// Mensaje de error
const errores = document.getElementById("errores");

// almacenamiento  local
let usuariosScript = JSON.parse(localStorage.getItem("usuariosScript")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Variable para almacenar el estado de autenticación
let usuarioAutenticado = false;

window.onload = function () {
  formRegistroUsuario.reset();
  formInicioUsuario.reset();
  registroForm.reset();
  btnNuevoUsuario.addEventListener("click", validarNuevoUsuario);
};

//botones
btnProductos.addEventListener("click", function () {
  if (usuarioAutenticado) {
    productosSection.style.display = "block";
    registroSection.style.display = "none";
    ventasSection.style.display = "none";
    mostrarProductos();
  }
});
btnRegistro.addEventListener("click", function () {
  formRegistroUsuario.style.display = "block";
  formInicioUsuario.style.display = "none";
});

btnRegistroDeProducto.addEventListener("click", function (e) {
  registrarProducto();
  e.preventDefault();
  registroForm.reset();
  registroSection.style.display = "none";
});
btnAcceso.addEventListener("click", function () {
  var usuarioValido = validarAcceso();
  if (usuarioValido !== null) {
    header.style.display = "block";
    formInicioUsuario.style.display = "none";
    containerUsuario.style.display = "none";
    // Guardo estado de autenticación en el almacenamiento local
    localStorage.setItem("usuarioAutenticado", usuarioValido.nombre);
    // Actualizo el estado de autenticación
    usuarioAutenticado = true;
    // Mostrar nombre del usuario
    document.getElementById("usuarioVista").textContent = usuarioValido.nombre;
  } else {
    containerUsuario.style.display = "block";
    header.style.display = "none";
  }
});
btnRegistroProducto.addEventListener("click", function () {
  if (usuarioAutenticado) {
    registroSection.style.display = "block";
    productosSection.style.display = "none";
    ventasSection.style.display = "none";
  }
});

btnVentas.addEventListener("click", function () {
  if (usuarioAutenticado) {
    productosSection.style.display = "none";
    ventasSection.style.display = "block";
    registroSection.style.display = "none";
    mostrarCesta();
  }
});

bntcerrarSesion.addEventListener("click", function (event) {
  event.preventDefault();
  ventasSection.style.display = "none";
  productosSection.style.display = "none";
  registroSection.style.display = "none";
  header.style.display = "none";
  containerUsuario.style.display = "block";
  formInicioUsuario.style.display = "block";
  formInicioUsuario.reset();
  usuarioAutenticado = false;
});

//Validaciones

function validarAcceso() {
  errores.innerHTML = "";
  let usuarioValido = null;
  // Verificar si los campos están vacíos
  if (
    nombreUsuarioExistente.value === "" ||
    contraseñaUsuarioExistente.value === ""
  ) {
    errores.innerHTML = "Por favor, complete todos los campos.";
    return null; // Devuelve null para indicar que no se puede validar el acceso
  }
  for (let i = 0; i < usuariosScript.length; i++) {
    if (
      nombreUsuarioExistente.value === usuariosScript[i].nombre &&
      contraseñaUsuarioExistente.value === usuariosScript[i].contraseña
    ) {
      usuarioValido = usuariosScript[i];
      break;
    }
  }
  // Mostrar mensaje de error si no se encontró un usuario válido
  if (usuarioValido === null) {
    errores.innerHTML = "El usuario o la contraseña son incorrectos.";
  }

  return usuarioValido;
}

function validarNombre() {
  let nombre = nombreNuevoUsuario.value.trim();
  if (nombre.includes(" ")) {
    errores.innerHTML += "Este campo no puede contener espacios <br>";

    return false;
  } else if (nombre === "") {
    errores.innerHTML += "Este campo nombre es obligatorio <br>";

    return false;
  } else {
    return true;
  }
}
function validarContraseña() {
  if (contraseñaNueva1.value != contraseñaNueva2.value) {
    errores.innerHTML +=
      "<br> La contraseña no coinciden. Por favor, vuelva a intentarlo.";

    return false;
  }
  // Verifico si la longitud de la contraseña es menor que 6 caracteres.
  if (contraseñaNueva1.value.length < 6) {
    // Mostrar un mensaje de error.
    errores.innerHTML +=
      "<br> La contraseña deber contener al menos 6 caracteres.";
    return false;
  }
  return true;
}

function validarNombreProducto() {
  const nombreInput = String(nombreProducto.value);
  if (nombreInput == "") {
    errores.innerHTML += "<br>El nombre del producto es obligatorio.";
    return false;
  }
  return true;
}

function validarPrecioProducto() {
  const precioInput = Number(precioProducto.value);
  if (isNaN(precioInput) || precioInput <= 0) {
    errores.innerHTML += "<br>Por favor, ingrese un precio válido.";
    return false;
  }
  return true;
}
function validarNuevoUsuario(e) {
  errores.innerHTML = "";
  errores.style.display = "none";
  if (validarNombre() && validarContraseña()) {
    agregarUsuario();
  } else {
    errores.style.display = "block";
    e.preventDefault();
  }
}
function agregarUsuario() {
  let nombreIngresado = nombreNuevoUsuario.value.trim().toLowerCase();
  let contraseñaIngresado1 = contraseñaNueva1.value;
  // Verifico si el usuario ya existe
  let usuarioExistente = usuariosScript.find((usuario) => {
    return (
      nombreIngresado === usuario.nombre.toLowerCase() &&
      contraseñaIngresado1 === usuario.contraseña
    );
  });

  if (usuarioExistente) {
    errores.innerHTML += "Este usuario ya existe<br>";
  } else {
    // Agrego nuevo usuario con lista de productos vacía
    let nuevoUsuario = {
      nombre: nombreNuevoUsuario.value,
      contraseña: contraseñaNueva1.value,
      productos: [], // Inicializo la lista de productos como vacía
    };

    // Agrego el nuevo usuario a la lista de usuarios
    usuariosScript.push(nuevoUsuario);
    // Guardoen el almacenamiento local
    localStorage.setItem("usuariosScript", JSON.stringify(usuariosScript));
  }
}

function registrarProducto() {
  // Obtengo los valores de los campos de entrada del formulario
  const nombreValor = nombreProducto.value.trim();
  const precioValor = precioProducto.value.trim();
  const descripcionValor = descripcionProducto.value.trim();

  if (!validarNombreProducto()) {
    return;
  }
  if (!validarPrecioProducto()) {
    return;
  }
  const index = productos.findIndex(
    (producto) => producto.nombre === nombreValor
  );

  if (index !== -1) {
    // Si el producto ya existe, actualizo sus atributos
    productos[index].precio = precioValor;
    productos[index].descripcion = descripcionValor;
  } else {
    // Si el producto no existe, lo agrego a la lista de productos
    let nuevoProducto = {
      productId: productos.length + 1,
      nombre: nombreValor,
      precio: precioValor,
      descripcion: descripcionValor,
    };
    // Añado el nuevo producto a la lista de productos
    productos.push(nuevoProducto);
  }

  // Guardo la lista actualizada de productos en el productos local
  localStorage.setItem("productos", JSON.stringify(productos));

  // Llamo a la función para mostrar los productos en la tabla
  mostrarProductos();
}

function mostrarProductos() {
  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<th>NOMBRE</th><th>PRECIO</th><th>DESCRIPCION</th><th>type</th></tr>";
  for (let i = 0; i < productos.length; i++) {
    if (i < 10) {
      document.getElementById("tabla-datos").innerHTML +=
        "</td><td>" +
        productos[i].nombre +
        "</td><td>" +
        productos[i].precio +
        "€</td><td>" +
        productos[i].descripcion +
        "</td><td><button id='mostrarEnVentas' onclick='mostrarEnVentas(" +
        i +
        ")'>Agregar producto</button>";
    } else {
      break;
    }
  }
}
// Función para mostrar un producto en la lista de ventas del usuario
function mostrarEnVentas(index) {
  // Verifico si hay un usuario autenticado
  let usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  if (usuarioAutenticado) {
    // Busco el usuario autenticado en la lista de usuarios
    let usuario = usuariosScript.find((u) => u.nombre === usuarioAutenticado);
    if (usuario) {
      // Agregoel producto seleccionado a la lista de productos del usuario
      usuario.productos.push(productos[index]);
      // Guardo la lista actualizada de usuarios en el almacenamiento local
      localStorage.setItem("usuariosScript", JSON.stringify(usuariosScript));
      alert("Producto agregado a tu lista de productos.");
      // Actualizo la cantidad en el botón de la cesta
    } else {
      alert("Usuario no encontrado.");
    }
  } else {
    alert("Debes iniciar sesión para agregar productos.");
  }
}

// Función para mostrar los productos en la lista de ventas del usuario
function mostrarCesta() {
  let usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
  if (usuarioAutenticado) {
    let usuario = usuariosScript.find((u) => u.nombre === usuarioAutenticado);
    if (usuario && usuario.productos.length > 0) {
      let ventasLista = document.getElementById("ventasLista");
      ventasLista.innerHTML = "";
      ventasLista.innerHTML +=
        "<th>NOMBRE</th><th>PRECIO</th><th>CANTIDAD</th><th>PRECIO TOTAL</th><th>DESCRIPCION</th></tr>";
      let precioTotal = 0;
      let cantidadProductos = 0;
      let productosEnCesta = {};

      usuario.productos.forEach((producto) => {
        let nombreProducto = producto.nombre;
        let precioProducto = parseFloat(producto.precio);

        // Incremento la cantidad si el producto ya está en la cesta
        if (productosEnCesta.hasOwnProperty(nombreProducto)) {
          productosEnCesta[nombreProducto].cantidad++;
        } else {
          // Agrego el producto a la cesta
          productosEnCesta[nombreProducto] = {
            precio: precioProducto,
            cantidad: 1,
            descripcion: producto.descripcion,
          };
        }
      });

      // Muestro los productos en la cesta
      for (let nombreProducto in productosEnCesta) {
        let producto = productosEnCesta[nombreProducto];
        let precioProductoTotal = producto.precio * producto.cantidad;
        ventasLista.innerHTML +=
          "<tr><td>" +
          nombreProducto +
          "</td><td>" +
          producto.precio.toFixed(2) +
          "€</td><td>" +
          producto.cantidad +
          "</td><td>" +
          precioProductoTotal.toFixed(2) +
          "€</td><td>" +
          producto.descripcion +
          "</td></tr>";

        precioTotal += precioProductoTotal;
        cantidadProductos += producto.cantidad;
      }
      //Calcular la suma total de los precios de los productos en la lista
      const totalElement = document.getElementById("total-ventas");
      totalElement.textContent = precioTotal.toFixed(2);
    }
  }
}
