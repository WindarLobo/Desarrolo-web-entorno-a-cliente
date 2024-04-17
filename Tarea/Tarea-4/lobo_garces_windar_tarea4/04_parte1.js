//Añado ready() para que el código se ejecute cuando el documento esté listo
$(document).ready(function () {
  //Llamo a las funciones clickAlElemento() y busquedaDeClima()
  clickAlElemento();
  busquedaDeClima();
});

//Apartado 1
//Añado una función clickAlElemento() para añadir un evento click a los elementos de la clase lugar
function clickAlElemento() {
  $(".lugar").click(function () {
    $(this).toggleClass("enabled");
  });
}
//Apartado 2 y 3
//Añado una función busquedaDeClima() para obtener el clima de la ciudad seleccionada
function busquedaDeClima() {
  //Añado un evento click al botón de búsqueda
  $("#botonBusqueda").click(function () {
    //Obtengo el texto de la entrada de búsqueda
    var nombreCiudad = $("#entradaBusqueda").val().trim();
    //Obtengo el lugar seleccionado
    var lugar = $(".lugar.enabled:contains(" + nombreCiudad + ")");
    //Si el lugar no está disponible, muestro un mensaje de alerta
    if (lugar.length == 0) {
      alert("Lugar no disponible.");
      return;
    }
    //Si el lugar está disponible, obtengo el clima del lugar
    //Realizo una petición GET a la API de Open-Meteo
    $.ajax({
      //Añado los datos de la petición
      method: "GET",
      //Añado la URL de la API
      url: "https://api.open-meteo.com/v1/forecast",
      //data contiene los datos que se enviarán al servidor
      data: {
        latitude: lugar.data("latitud"),
        longitude: lugar.data("longitud"),
        // Solicito los datos que deseos obtener
        current: "apparent_temperature,weather_code",
      },
      //Si la petición es exitosa, obtengo los datos del clima
      success: function (detalle) {
        //Obtengo la temperatura y las condiciones del clima
        var temperatura = detalle.current.apparent_temperature + " °C";
        //Obtengo las condiciones del clima
        var condiciones = obtenerCondicionesDelClima(
          detalle.current.weather_code
        );
        //Muestro los datos del clima
        $("#nombreCiudad").text(nombreCiudad);
        $("#temperatura").text(temperatura);
        $("#condiciones").text(condiciones);
        //Muestro la información del clima
        $("#infoClima").show();
      },
      error: function () {
        alert("Error al optener el clima.");
      },
    });
  });
}

//Añado una función para obtener las condiciones del clima
function obtenerCondicionesDelClima(weatherCode) {
  // Mapeo de códigos de clima a condiciones en español
  switch (weatherCode) {
    case 0:
      return "Despejado";
    case 1:
      return "Mayormente despejado";
    case 2:
      return "Parcialmente nublado";
    case 3:
      return "Mayormente nublado";
    case 45:
      return "Niebla ligera";
    case 48:
      return "Niebla densa";
    case 51:
      return "Llovizna ligera";
    case 53:
      return "Llovizna moderada";
    case 55:
      return "Llovizna de intensidad fuerte";
    case 56:
      return " Llovizna helada ligera";
    case 57:
      return " Llovizna helada de intensidad densa";
    case 61:
      return "Lluvia ligera";
    case 63:
      return " Lluvia moderada";
    case 65:
      return "Lluvia de intensidad fuerte";
    case 66:
      return "Lluvia helada ligera";
    case 67:
      return "Lluvia helada de intensidad densa";
    case 71:
      return "Nevadas ligeras";
    case 73:
      return "Nevadas moderadas";
    case 75:
      return "Nevadas de intensidad fuerte";
    case 77:
      return "Nevadas de granizo ligero";
    case 80:
      return "Lluvia ligera de intensidad moderada";
    case 81:
      return "Lluvia moderada de intensidad moderada";
    case 82:
      return "Lluvia fuerte de intensidad moderada";
    case 85:
      return "Nieve ligera de intensidad moderada";
    case 86:
      return "Nieve moderada de intensidad moderada";
    case 95:
      return "Tormenta eléctrica con lluvia ligera";
    case 96:
      return "Tormenta eléctrica con lluvia moderada";
    case 99:
      return "Tormenta eléctrica con lluvia de intensidad fuerte";
    default:
      return "Desconocido";
  }
}
