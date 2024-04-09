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
//Apratado 2 y 3
//Añado una función busquedaDeClima() para obtener el clima de la ciudad seleccionada
function busquedaDeClima() {
  //Añado un evento click al botón de búsqueda
  $("#botonBusqueda").click(function () {
    //Obtengo el texto de la entrada de búsqueda
    var text = $("#entradaBusqueda").val().trim();
    //Obtengo el lugar seleccionado
    var lugar = $(".lugar.enabled:contains(" + text + ")");
    //Obtengo la latitud y longitud del lugar seleccionado
    var latitudLugar = lugar.length > 0 ? lugar.data("latitud") : null;
    //Obtengo la longitud del lugar seleccionado
    var longitudLugar = lugar.length > 0 ? lugar.data("longitud") : null;
    //Si el lugar no está disponible, muestro un mensaje de alerta
    lugar.length > 0 ? null : alert("Lugar no disponible.");
    //Si el lugar está disponible, obtengo el clima del lugar
    var url = "https://api.open-meteo.com/v1/forecast";
    var requestData = {
      latitude: latitudLugar,
      longitude: longitudLugar,
      current: "apparent_temperature,weather_code",
    };
    //Realizo una petición GET a la API de Open-Meteo
    $.ajax({
      method: "GET",
      url: url,
      data: requestData,
      success: function (detalle) {
        datosClima(text, detalle);
      },
      error: function () {
        alert("Error al optener el clima.");
      },
    });
  });
}
//Añado una función datosClima(nombreCiudad, detalle) para mostrar los datos del clima
function datosClima(nombreCiudad, detalle) {
  //Obtengo la temperatura y las condiciones del clima
  var temperatura = detalle.current.apparent_temperature + " °C";
  //Obtengo las condiciones del clima
  var condiciones = obtenerCondiciones(detalle.current.weather_code);
  //Muestro los datos del clima
  $("#nombreCiudad").text(nombreCiudad);
  $("#temperatura").text(temperatura);
  $("#condiciones").text(condiciones);
  //Muestro la información del clima
  $("#infoClima").show();
}

//Añado una función para obtener las condiciones del clima
function obtenerCondiciones(weatherCode) {
  // Mapeo de códigos de clima a condiciones en español
  switch (weatherCode) {
    case 0:
      return "Cielo limpio";
    case 1:
      return "Mayormente despejado";
    case 2:
      return "Parcialmente nublado";
    case 3:
      return "Nublado";
    case 45:
      return "Niebla";
    case 48:
      return "Niebla";
    case 51:
      return "Llovizna ligera";
    case 53:
      return "Llovizna moderada";
    case 55:
      return "Llovizna de intensidad fuerte";
    case 56:
      return "Llovizna helada ligera";
    case 57:
      return "Llovizna helada de intensidad densa";
    case 61:
      return "Lluvia ligera";
    case 63:
      return "Lluvia moderada";
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
      return "Nevadas de intensidad";
    case 77:
      return "Grano de nieve";
    case 80:
      return "Chubasco de lluvia ligero";
    case 81:
      return "Chubasco de lluvia moderado";
    case 82:
      return "Chubasco de lluvia fuerte";
    case 85:
      return "Lluvias leves";
    case 86:
      return "Lluvia de intensidad";
    case 95:
      return "Tormenta eléctrica leve";
    case 96:
      return "Tormenta eléctrica con granizo ligero";
    case 99:
      return "Tormenta eléctrica con granizo intenso";
    default:
      return "Desconocido";
  }
}
