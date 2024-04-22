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
//Mostrar datos
function mostrarVentas() {
  productosSection.style.display = "none";
  registroSection.style.display = "none";
  ventasSection.style.display = "block";
  mostrarEnVentas();
}
function mostrarRegistro() {
  registroSection.style.display = "block";
  ventasSection.style.display = "none";
  productosSection.style.display = "none";
}
function mostrarProductosbutom() {
  registroSection.style.display = "none";
  ventasSection.style.display = "none";
  productosSection.style.display = "block";
  mostrarProductos();
}

//Carga la pagina
window.onload = () => {
  document.getElementById("enviar").addEventListener("click", validar);
  btnRegistro.addEventListener("click", mostrarRegistro);
  btnProductos.addEventListener("click", mostrarProductosbutom);
  btnVentas.addEventListener("click", mostrarVentas);
};

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
  document.getElementById("errores").innerHTML = ""; // Eliminar mensajes anteriores
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
  ); // Verificar si el producto ya existe en la lista
  if (index !== -1) {
    datosScript[index].precio = precioValor; // Si el producto existe, actualizar sus detalles
    datosScript[index].descripcion = descripcionValor;
  } else {
    datosScript.push({
      nombre: nombreValor,
      precio: precioValor,
      descripcion: descripcionValor,
    }); // Si el producto no existe, agregarlo a la lista
  }

  localStorage.setItem("datosScript", JSON.stringify(datosScript)); // Guardar los datos actualizados en localStorage
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
  // Actualizar la cantidad en el botón de la cesta
  const cartCountElement = document.getElementById("cart-count");
  let cantidadEnCesta = parseInt(cartCountElement.textContent.slice(1, -1));
  cantidadEnCesta++; // Incrementar la cantidad en 1
  cartCountElement.textContent = `(${cantidadEnCesta})`;
}
