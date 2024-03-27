var displayValue = "0";

// Obtener el display de la calculadora
var display = document.getElementById("display");

var clear = document.getElementById("clear");

clear.addEventListener("click", function () {
  displayValue = "0";
  display.textContent = displayValue;
});

// Obtener todos los botones numéricos
var teclaPunto = document.getElementById(".");
teclaPunto.addEventListener("click", function () {
  addNumber(this.textContent);
});

var tecla0 = document.getElementById("0");
tecla0.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla1 = document.getElementById("1");
tecla1.addEventListener("click", function () {
  addNumber(this.textContent);
});

var tecla2 = document.getElementById("2");
tecla2.addEventListener("click", function () {
  addNumber(this.textContent);
});

var tecla3 = document.getElementById("3");
tecla3.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla4 = document.getElementById("4");
tecla4.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla5 = document.getElementById("5");
tecla5.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla6 = document.getElementById("6");
tecla6.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla7 = document.getElementById("7");
tecla7.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla8 = document.getElementById("8");
tecla8.addEventListener("click", function () {
  addNumber(this.textContent);
});
var tecla9 = document.getElementById("9");
tecla9.addEventListener("click", function () {
  addNumber(this.textContent);
});

function addNumber(number) {
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  display.textContent = parseFloat(displayValue);
}
