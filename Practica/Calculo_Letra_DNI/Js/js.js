const persons = [
  new Persona("13450181", "Lobo", "Garces", "img.jpg", "18/03/1993"),
  new Persona("35577962", "Adrian", "Gayoso", "chuky.jpg", "18/04/1991"),
  new Persona("89565871", "Roberto", "Paez", "img2.jpg", "18/01/1991"),
];

function pintar(person) {
  document.getElementById("nombre_random").innerHTML = person.apellido1;
  document.getElementById("apellido_random").innerHTML = person.apellido2;
  document.getElementById("img_random").innerHTML =
    "<img src='" + person.img + "' width='100'>";
  document.getElementById("fecha_random").innerHTML = person.fechaNacimiento;
}

function Persona(dni, apellido1, apellido2, img, fechaNacimiento) {
  (this.dni = dni), (this.apellido1 = apellido1);
  this.apellido2 = apellido2;
  this.img = img;
  this.fechaNacimiento = fechaNacimiento;
}
function calcularLetra(dni) {
  var caracteres = "TRWAGMYFPDXBNJZSQVHLCKE";
  var resto = dni % 23;
  return caracteres.charAt(resto);
}

function showLetter() {
  var dni = document.getElementById("dniInput").value;
  var encontrado = false;
  persons.forEach((person) => {
    if (person.dni === dni) {
      pintar(person);
      encontrado = true;
    }
  });
  if (dni === "") {
    return;
  }
  if (!encontrado) {
    alert("El DNI ingresado no fue encontrado.");
  }
  var letra = calcularLetra(dni);
  document.getElementById("letra").innerHTML = letra;
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    showLetter();
  }
}
