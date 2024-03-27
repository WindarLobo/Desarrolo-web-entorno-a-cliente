var num1;
var num2;
var operador;
var teclaSuma = document.getElementById("+");
teclaSuma.addEventListener("click", function () {
  num1 = display.textContent;
  operador = "+";
  displayValue = "0";
});
var teclaResta = document.getElementById("-");
teclaResta.addEventListener("click", function () {
  num1 = display.textContent;
  operador = "-";
  displayValue = "0";
});
var teclaMultiplicar = document.getElementById("*");
teclaMultiplicar.addEventListener("click", function () {
  num1 = display.textContent;
  operador = "*";
  displayValue = "0";
});
var teclaDivir = document.getElementById("/");
teclaDivir.addEventListener("click", function () {
  num1 = display.textContent;
  operador = "/";
  displayValue = "0";
});
var teclaParenteci1 = document.getElementById("(");
teclaParenteci1.addEventListener("click", function () {
  displayValue = "(";
  display.textContent = displayValue;
});
var teclaParenteci2 = document.getElementById(")");
teclaParenteci2.addEventListener("click", function () {
  displayValue = ")";
  display.textContent = displayValue;
});
var teclaIgual = document.getElementById("eval");
teclaIgual.addEventListener("click", function () {
  num2 = display.textContent;

  switch (operador) {
    case "+":
      display.textContent = parseFloat(num1) + parseFloat(num2);
      break;
    case "-":
      display.textContent = parseFloat(num1) - parseFloat(num2);
      break;
    case "*":
      display.textContent = parseFloat(num1) * parseFloat(num2);
      break;
    case "/":
      if (num2 === "0") {
        display.textContent = "Error";
      } else {
        display.textContent = parseFloat(num1) / parseFloat(num2);
        break;
      }
  }
});
