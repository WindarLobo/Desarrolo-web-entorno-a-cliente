$(document).ready(function () {
  // Elementos del formulario de registro de nuevo usuario
  const nombreNuevoUsuario = $("#nuevoNombre");
  const contraseñaNueva1 = $("#nuevaContraseña1");
  const contraseñaNueva2 = $("#nuevaContraseña2");

  // Elementos del formulario de inicio de sesión de usuario existente
  const nombreUsuarioExistente = $("#usuarioInicioSesion");
  const contraseñaUsuarioExistente = $("#contrasena");

  // Elementos del formulario para registrar productos
  const nombreProducto = $("#nombre");
  const precioProducto = $("#precio");
  const descripcionProducto = $("#descripcion");

  // Botones de la página
  const btnNuevoUsuario = $("#crearUsuario");
  const btnRegistro = $("#registroLinck");
  const btnProductos = $("#btnProductos");
  const btnAcceso = $("#botonAcceso");
  const btnRegistroProducto = $("#btnRegistro");
  const btnVentas = $("#btnventas");
  const bntcerrarSesion = $("#cerrar");
  const btnRegistroDeProducto = $("#enviar");

  // Secciones de la vista
  const registroSection = $("#registro");
  const containerUsuario = $("#containerUsuario");
  const formInicioUsuario = $("#formularioInicioSesion");
  const formRegistroUsuario = $("#loanForm");
  const registroForm = $("#registroForm");
  const header = $("#header");
  const ventasSection = $("#ventas");
  const productosSection = $("#productos");

  // Mensaje de error
  const errores = $("#errores");

  // Almacenamiento local
  let usuariosScript = JSON.parse(localStorage.getItem("usuariosScript")) || [];
  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  // Variable para almacenar el estado de autenticación
  let usuarioAutenticado = false;
  formRegistroUsuario[0].reset();
  formInicioUsuario[0].reset();
  registroForm[0].reset();

  // Función para validar el acceso de un usuario existente
  function validarAcceso() {
    errores.html("");
    let usuarioValido = null;
    // Verificar si los campos están vacíos
    if (
      nombreUsuarioExistente.val() === "" ||
      contraseñaUsuarioExistente.val() === ""
    ) {
      errores.html("Por favor, complete todos los campos.");
      return null; // Devuelve null para indicar que no se puede validar el acceso
    }
    for (let i = 0; i < usuariosScript.length; i++) {
      if (
        nombreUsuarioExistente.val() === usuariosScript[i].nombre &&
        contraseñaUsuarioExistente.val() === usuariosScript[i].contraseña
      ) {
        usuarioValido = usuariosScript[i];
        break;
      }
    }
    // Mostrar mensaje de error si no se encontró un usuario válido
    if (usuarioValido === null) {
      errores.html("El usuario o la contraseña son incorrectos.");
    }
    return usuarioValido;
  }

  // Función para validar el nombre del nuevo usuario
  function validarNombre() {
    let nombre = nombreNuevoUsuario.val().trim();
    if (nombre.includes(" ")) {
      errores.html("Este campo no puede contener espacios <br>");
      return false;
    } else if (nombre === "") {
      errores.html("Este campo nombre es obligatorio <br>");
      return false;
    } else {
      return true;
    }
  }

  // Función para validar las contraseñas del nuevo usuario
  function validarContraseña() {
    if (contraseñaNueva1.val() != contraseñaNueva2.val()) {
      errores.html(
        "<br> La contraseña no coinciden. Por favor, vuelva a intentarlo."
      );
      return false;
    }
    // Verifico si la longitud de la contraseña es menor que 6 caracteres.
    if (contraseñaNueva1.val().length < 6) {
      // Mostrar un mensaje de error.
      errores.html("<br> La contraseña deber contener al menos 6 caracteres.");
      return false;
    }
    return true;
  }

  // Función para validar el nombre del producto
  function validarNombreProducto() {
    const nombreInput = String(nombreProducto.val());
    if (nombreInput == "") {
      errores.html("<br>El nombre del producto es obligatorio.");
      return false;
    }
    return true;
  }

  // Función para validar el precio del producto
  function validarPrecioProducto() {
    const precioInput = Number(precioProducto.val());
    if (isNaN(precioInput) || precioInput <= 0) {
      errores.html("<br>Por favor, ingrese un precio válido.");
      return false;
    }
    return true;
  }
  // Validación del formulario de registro de nuevo usuario
  btnNuevoUsuario.on("click", function (e) {
    errores.html("");
    errores.hide();
    if (validarNombre() && validarContraseña()) {
      agregarUsuario();
      formRegistroUsuario.hide();
      formInicioUsuario.show();
    } else {
      errores.show();
      e.preventDefault();
    }
  });
  // Eventos click de los botones
  btnRegistro.on("click", function () {
    formRegistroUsuario.show();
    formInicioUsuario.hide();
    formRegistroUsuario[0].reset();
  });

  btnRegistroDeProducto.on("click", function (e) {
    registrarProducto();
    e.preventDefault();
    registroForm[0].reset();
    registroSection.hide();
  });

  btnAcceso.on("click", function () {
    var usuarioValido = validarAcceso();
    if (usuarioValido !== null) {
      header.show();
      formInicioUsuario.hide();
      containerUsuario.hide();
      // Guardo estado de autenticación en el almacenamiento local
      localStorage.setItem("usuarioAutenticado", usuarioValido.nombre);
      // Actualizo el estado de autenticación
      usuarioAutenticado = true;
      // Mostrar nombre del usuario
      $("#usuarioVista").text(usuarioValido.nombre);
    } else {
      containerUsuario.show();
      header.hide();
      formRegistroUsuario.hide(); // Aquí ocultas el formulario de registro si el acceso no es válido
    }
  });
  btnRegistroProducto.on("click", function () {
    if (usuarioAutenticado) {
      registroSection.show();
      productosSection.hide();
      ventasSection.hide();
    }
  });

  btnProductos.on("click", function () {
    if (usuarioAutenticado) {
      productosSection.show();
      registroSection.hide();
      ventasSection.hide();
      mostrarProductos();
    }
  });

  btnVentas.on("click", function () {
    if (usuarioAutenticado) {
      productosSection.hide();
      ventasSection.show();
      registroSection.hide();
      mostrarCesta();
    }
  });

  bntcerrarSesion.on("click", function (event) {
    event.preventDefault();
    ventasSection.hide();
    productosSection.hide();
    registroSection.hide();
    header.hide();
    containerUsuario.show();
    formInicioUsuario.show();
    formInicioUsuario[0].reset();
    usuarioAutenticado = false;
  });

  // Función para agregar un nuevo usuario
  function agregarUsuario() {
    let nombreIngresado = nombreNuevoUsuario.val().trim().toLowerCase();
    let contraseñaIngresado1 = contraseñaNueva1.val();
    // Verifico si el usuario ya existe
    let usuarioExistente = usuariosScript.find((usuario) => {
      return (
        nombreIngresado === usuario.nombre.toLowerCase() &&
        contraseñaIngresado1 === usuario.contraseña
      );
    });
    if (usuarioExistente) {
      errores.html("Este usuario ya existe<br>");
    } else {
      // Agrego nuevo usuario con lista de productos vacía
      let nuevoUsuario = {
        nombre: nombreNuevoUsuario.val(),
        contraseña: contraseñaNueva1.val(),
        productos: [], // Inicializo la lista de productos como vacía
      };
      // Agrego el nuevo usuario a la lista de usuarios
      usuariosScript.push(nuevoUsuario);
      // Guardo en el almacenamiento local
      localStorage.setItem("usuariosScript", JSON.stringify(usuariosScript));
    }
  }

  // Función para registrar un nuevo producto
  function registrarProducto() {
    // Obtengo los valores de los campos de entrada del formulario
    const nombreValor = nombreProducto.val().trim();
    const precioValor = precioProducto.val().trim();
    const descripcionValor = descripcionProducto.val().trim();
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
    // Guardo la lista actualizada de productos en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(productos));
    // Llamo a la función para mostrar los productos en la tabla
    mostrarProductos();
  }

  // Función para mostrar los productos en la tabla
  function mostrarProductos() {
    $("#tabla-datos").empty();
    $("#tabla-datos").append(
      "<tr><th>NOMBRE</th><th>PRECIO</th><th>DESCRIPCION</th><th>type</th></tr>"
    );
    for (let i = 0; i < productos.length; i++) {
      if (i < 10) {
        $("#tabla-datos").append(
          "<tr><td>" +
            productos[i].nombre +
            "</td><td>" +
            productos[i].precio +
            "€</td><td>" +
            productos[i].descripcion +
            "</td><td><button class='agregar-producto' data-index='" +
            i +
            "'>Agregar producto</button>"
        );
      } else {
        break;
      }
    }
    // Agregar el evento click a los botones de agregar producto
    $(".agregar-producto").click(function () {
      let index = $(this).data("index");
      mostrarEnVentas(index);
    });
  }

  // Función para mostrar un producto en la lista de ventas del usuario
  function mostrarEnVentas(index) {
    let usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
    if (usuarioAutenticado) {
      let usuario = usuariosScript.find((u) => u.nombre === usuarioAutenticado);
      if (usuario) {
        if (productos[index]) {
          usuario.productos.push(productos[index]);
          localStorage.setItem(
            "usuariosScript",
            JSON.stringify(usuariosScript)
          );
          alert("Producto agregado a tu lista de productos.");
        } else {
          alert("El producto seleccionado no existe.");
        }
      } else {
        alert("Usuario no encontrado.");
      }
    } else {
      alert("Debes iniciar sesión para agregar productos.");
    }
  }
  function mostrarCesta() {
    let usuarioAutenticado = localStorage.getItem("usuarioAutenticado");
    if (usuarioAutenticado) {
      let usuario = usuariosScript.find((u) => u.nombre === usuarioAutenticado);
      if (usuario && usuario.productos.length > 0) {
        let ventasLista = $("#ventasLista");
        ventasLista.empty();
        ventasLista.append(
          "<tr><th>NOMBRE</th><th>PRECIO</th><th>CANTIDAD</th><th>PRECIO TOTAL</th><th>DESCRIPCION</th></tr>"
        );
        let precioTotal = 0;
        let cantidadProductos = 0;
        let productosEnCesta = {};

        usuario.productos.forEach((producto) => {
          if (producto) {
            // Verificar si el producto no es null o undefined
            let nombreProducto = producto.nombre;
            let precioProducto = parseFloat(producto.precio);

            if (productosEnCesta.hasOwnProperty(nombreProducto)) {
              productosEnCesta[nombreProducto].cantidad++;
            } else {
              productosEnCesta[nombreProducto] = {
                precio: precioProducto,
                cantidad: 1,
                descripcion: producto.descripcion,
              };
            }
          }
        });

        for (let nombreProducto in productosEnCesta) {
          let producto = productosEnCesta[nombreProducto];
          let precioProductoTotal = producto.precio * producto.cantidad;
          ventasLista.append(
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
              "</td></tr>"
          );

          precioTotal += precioProductoTotal;
          cantidadProductos += producto.cantidad;
        }

        $("#total-ventas").text(precioTotal.toFixed(2));
      }
    }
  }
});
