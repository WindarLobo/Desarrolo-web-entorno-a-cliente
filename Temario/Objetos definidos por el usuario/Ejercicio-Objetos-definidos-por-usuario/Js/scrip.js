/*1. Completa en el siguiente código la función constructora de un objeto llamado suma que
contenga dos atributos (valor1 y valor2) y tres métodos: primerValor, segundoValor y
resultado.*/

function Suma(valor1, valor2) {
  this.valor1 = valor1;
  this.valor2 = valor2;

  this.primerValor = function (nuevoValor) {
    this.valor1 = nuevoValor;
  };

  this.segundoValor = function (nuevoValor) {
    this.valor2 = nuevoValor;
  };

  this.resultado = function () {
    return this.valor1 + this.valor2;
  };
}

let suma1 = new Suma(5, 10);
document.write("La suma de 5 y 10 es: " + suma1.resultado() + "<br>");
suma1.primerValor(70);
suma1.segundoValor(3);
document.write("La suma de 70 y 3 es: " + suma1.resultado() + "<br>");

/*Crear un constructor de objetos persona que pida por teclado su nombre y edad
(prompt()), y por otro lado, crear otra función constructora de un objeto empresa que tenga
como atributo la edad tope para que una persona pueda ingresar como trabajador en la
misma (60 años), y un método que compruebe si una persona (objeto persona) puede
ingresar o no en la empresa. Por último, crea tres personas y dos empresas, mostrando
cuántas de esas personas están inhabilitadas para ingresar como trabajadores de acuerdo
a la edad tope. */

class Persona {
  constructor() {
    this.nombre = prompt("Ingrese el nombre:");
    this.edad = parseInt(prompt("Ingrese la edad:"));
  }
}

class Empresa {
  constructor() {
    this.edadTope = 60;

    this.puedeIngresar = function (persona) {
      return persona.edad <= this.edadTope;
    };
  }
}
var persona1 = new Persona();
var persona2 = new Persona();
var persona3 = new Persona();

var empresa1 = new Empresa();
var empresa2 = new Empresa();

var personasInhabilitadas1 = [persona1, persona2, persona3].filter(
  (persona) => !empresa1.puedeIngresar(persona)
);
var personasInhabilitadas2 = [persona1, persona2, persona3].filter(
  (persona) => !empresa2.puedeIngresar(persona)
);

console.log(
  "Personas inhabilitadas para ingresar a la  Empresa 1: " +
    personasInhabilitadas1.length +
    "\n"
);
console.log(
  "Personas inhabilitadas para ingresar a la  Empresa 2: " +
    personasInhabilitadas2.length +
    "\n"
);

/*4.Crea una clase Factura que contenga un constructor con los parámetros numero, 
cliente, divisa, subtotal e IVA (%). Además, utiliza las palabras claves get para obtener
 el precio final (subtotal + IVA), set para aplicar un cambio de divisa (cambio interno del atributo divisa) 
 y un método adicional para indicar un tipo de cambio de divisa, recalculando la propiedad subtotal. */

class Factura {
  constructor(numero, cliente, divisa, subtotal, Iva) {
    this.numero = numero;
    this.cliente = cliente;
    this._divisa = divisa;
    this.subtotal = subtotal;
    this.Iva = Iva;
  }

  get precioFinal() {
    return this.subtotal + this.subtotal * (this.Iva / 100);
  }

  set divisa(nuevaDivisa) {
    if (this._divisa !== nuevaDivisa) {
      this.subtotal *= this.tipoCambio(nuevaDivisa);
      this._divisa = nuevaDivisa;
    }
  }
  tipoCambio(nuevaDivisa) {
    const tipoCambioFijo = 1.3;
    return tipoCambioFijo;
  }
}

const factura1 = new Factura(1560, "Cliente A", "USD", 800, 25);

console.log("Precio Final (USD):", factura1.precioFinal);

factura1.divisa = "EUR";

console.log("Precio Final (EUR):", factura1.precioFinal);
