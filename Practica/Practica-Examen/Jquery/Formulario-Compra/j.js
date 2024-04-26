$(document).ready(function () {
  // Seleccionar los elementos del DOM que se van a utilizar
  var nombre = $("#productName"); // Campo de entrada para el nombre del producto
  var cantidad = $("#quantity"); // Campo de entrada para la cantidad del producto
  var precio = $("#price"); // Campo de entrada para el precio del producto
  var errores = $("#errores"); // Elemento donde se mostrarán los mensajes de error
  var tablaDatos = $("#tabla-datos"); // Elemento donde se mostrarán los productos en forma de tabla

  // Obtener los datos de los productos del almacenamiento local o usar datos predefinidos si no hay ninguno
  var datosScript = localStorage.getItem("datosScript");
  if (datosScript !== null) {
    datosScript = JSON.parse(datosScript);
  } else {
    datosScript = datos;
  }

  // Asignar la función de validación al evento click del botón de enviar formulario
  $("#enviar").on("click", validar);

  // Mostrar los productos al cargar la página
  mostrarProductos();

  // Función para validar el nombre del producto
  function validarNombre() {
    var nombreInput = String(nombre.val());
    if (nombreInput === "") {
      errores.append("<br>El nombre es obligatorio.");
      return false;
    }
    return true;
  }

  // Función para validar la cantidad del producto
  function validarCantidad() {
    var cantidadInput = Number(cantidad.val());
    if (isNaN(cantidadInput) || cantidadInput <= 0) {
      errores.append("<br>Por favor, ingrese una cantidad válida.");
      return false;
    }
    return true;
  }

  // Función para validar el precio del producto
  function validarPrecio() {
    var precioInput = Number(precio.val());
    if (isNaN(precioInput) || precioInput <= 0) {
      errores.append("<br>Por favor, ingrese un precio válido.");
      return false;
    }
    return true;
  }

  // Función para validar el formulario
  function validar(e) {
    errores.empty(); // Limpiar cualquier mensaje de error previo
    errores.css("display", "none"); // Ocultar el contenedor de mensajes de error
    if (validarNombre() && validarCantidad() && validarPrecio()) {
      // Si todas las validaciones son exitosas, agregar el producto
      agregarProducto();
      return true;
    } else {
      // Si hay errores de validación, mostrar los mensajes de error y evitar el envío del formulario
      errores.css("display", "block");
      e.preventDefault();
      return false;
    }
  }

  // Función para agregar un producto a la lista de productos
  function agregarProducto() {
    var nombreValor = nombre.val();
    var cantidadValor = cantidad.val();
    var precioValor = precio.val();

    var index = datosScript.findIndex(function (producto) {
      return producto.nombre === nombreValor;
    });

    if (index !== -1) {
      // Si el producto ya existe, actualizar su cantidad y precio
      datosScript[index].cantidad = cantidadValor;
      datosScript[index].precio = precioValor;
    } else {
      // Si el producto no existe, agregarlo a la lista
      datosScript.push({
        nombre: nombreValor,
        cantidad: cantidadValor,
        precio: precioValor,
      });
    }

    // Guardar la lista actualizada de productos en el almacenamiento local
    localStorage.setItem("datosScript", JSON.stringify(datosScript));
  }

  // Función para mostrar los productos en la tabla
  function mostrarProductos() {
    tablaDatos.empty(); // Limpiar la tabla antes de mostrar los productos
    tablaDatos.append(
      "<tr><th>NOMBRE</th><th>CANTIDAD</th><th>PRECIO</th></tr>"
    ); // Encabezados de la tabla
    for (var i = 0; i < datosScript.length; i++) {
      // Iterar sobre cada producto en la lista
      if (i < 10) {
        // Mostrar solo los primeros 10 productos
        tablaDatos.append(
          "<tr><td>" +
            datosScript[i].nombre +
            "</td><td>" +
            datosScript[i].cantidad +
            "</td><td>" +
            datosScript[i].precio +
            "</td></tr>"
        ); // Agregar una fila a la tabla con los detalles del producto
      } else {
        break; // Salir del bucle si ya se han mostrado 10 productos
      }
    }
  }
});
