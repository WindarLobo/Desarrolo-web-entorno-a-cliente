const nombre = document.getElementById("productName");
const cantidad = document.getElementById("quantity");
const precio = document.getElementById("price");

//Carga la pagina
window.onload = () => {
  document.getElementById("enviar").addEventListener("click", validar);
  mostrarProductos();
};
let datosScript = localStorage.getItem("datosScript");
if (datosScript != null) {
  datosScript = JSON.parse(datosScript);
} else {
  datosScript = datos;
}
function validarNombre() {
  var nombreImput = String(nombre.value);
  if (nombreImput === "") {
    document.getElementById("errores").innerHTML +=
      "<br>El nombre es obligatorio.";
    return false;
  }
  return true;
}
function validarCantidad() {
  var canridadImput = Number(cantidad.value);
  if (isNaN(canridadImput) || canridadImput <= 0) {
    document.getElementById("errores").innerHTML +=
      "<br>Por favor, ingrese una cantidad válido.";
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
  document.getElementById("errores").innerHTML = "";
  document.getElementById("errores").style.display = "none";
  if (validarNombre() && validarCantidad() && validarPrecio) {
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
  const cantidadValor = cantidad.value;
  const precioValor = precio.value;

  const index = datosScript.findIndex(
    (producto) => producto.nombre === nombreValor
  ); // Verificar si el producto ya existe en la lista
  if (index !== -1) {
    datosScript[index].cantidad = cantidadValor;
    datosScript[index].precio = precioValor; // Si el producto existe, actualizar sus detalles
  } else {
    datosScript.push({
      nombre: nombreValor,
      cantidad: cantidadValor,
      precio: precioValor,
    }); // Si el producto no existe, agregarlo a la lista
  }

  localStorage.setItem("datosScript", JSON.stringify(datosScript)); // Guardar los datos actualizados en localStorage
}
function mostrarProductos() {
  document.getElementById("tabla-datos").innerHTML = "";
  document.getElementById("tabla-datos").innerHTML +=
    "<th>NOMBRE</th><th>CANTIDAD</th><th>PRECIO</th></tr>";
  for (let i = 0; i < datosScript.length; i++) {
    if (i < 10) {
      document.getElementById("tabla-datos").innerHTML +=
        "</td><td>" +
        datosScript[i].nombre +
        "</td><td>" +
        datosScript[i].cantidad +
        "</td><td>" +
        datosScript[i].precio;
    } else {
      break;
    }
  }
}
