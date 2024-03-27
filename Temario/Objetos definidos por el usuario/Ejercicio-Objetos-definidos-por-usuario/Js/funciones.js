/*3.	Crea el código funciones.js de la siguiente página index.html de modo que cuando el usuario pulse sobre el botón debe:
a.	Pedirse al usuario un nombre de titular, apellidos de titular y saldo de la cuenta.
b.	Crear un nuevo objeto cuentaBancaria que se inicializará con los datos facilitados por el usuario.
c.	Mostrar un mensaje informando de que se ha creado la nueva cuenta bancaria y de los datos asociados a la cuenta bancaria creada.
 */

function CuentaBancaria(nombre, apellidos, saldo) {
  this.nombre = nombre;
  this.apellidos = apellidos;
  this.saldo = saldo;
}

function cargarDatos() {
  var nombre = prompt("Ingrese el nombre del titular:");
  var apellidos = prompt("Ingrese los apellidos del titular:");
  var saldo = parseFloat(prompt("Ingrese el saldo de la cuenta:"));

  var nuevaCuenta = new CuentaBancaria(nombre, apellidos, saldo);

  var mensaje =
    "Se ha creado la nueva cuenta bancaria.\n" +
    "Nombre : " +
    nuevaCuenta.nombre +
    "\n" +
    "Apellidos: " +
    nuevaCuenta.apellidos +
    "\n" +
    "Saldo: " +
    nuevaCuenta.saldo +
    "\n";

  alert(mensaje);
}
