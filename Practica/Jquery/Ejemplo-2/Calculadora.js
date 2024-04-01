var displayValue = "0";
var display = $("#display");

$("#clear").click(function () {
  displayValue = "0";
  display.text(displayValue);
});

$(".calc-numbers").click(function () {
  addNumber($(this).text());
});

function addNumber(number) {
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  display.text(parseFloat(displayValue));
}
