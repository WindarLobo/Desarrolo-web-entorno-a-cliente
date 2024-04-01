var num1;
var num2;
var operador;
$("#suma").click(function () {
  num1 = display.text();
  operador = "+";
  displayValue = "0";
});
$("#resta").click(function () {
  num1 = display.text();
  operador = "-";
  displayValue = "0";
});
$("#Multiplicacion").click(function () {
  num1 = display.text();
  operador = "*";
  displayValue = "0";
});
$("#Division").click(function () {
  num1 = display.text();
  operador = "/";
  displayValue = "0";
});

$("#eval").click(function () {
  num2 = display.text();

  switch (operador) {
    case "+":
      $("#display").text(parseFloat(num1) + parseFloat(num2));
      break;
    case "-":
      $("#display").text(parseFloat(num1) - parseFloat(num2));
      break;
    case "*":
      $("#display").text(parseFloat(num1) * parseFloat(num2));
      break;
    case "/":
      if (num2 === "0") {
        $("#display").text("Error");
      } else {
        var result = parseFloat(num1) / parseFloat(num2);
        $("#display").text(result.toFixed(2));
        break;
      }
  }
});
