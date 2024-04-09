$(document).ready(function () {
  clickAlElemento();
  busquedaDeClima();
});

//Apartado 1
function clickAlElemento() {
  $(".lugar").click(function () {
    $(this).toggleClass("enabled");
  });
}

//Apratado 2
//https://www.w3schools.com/jquery/sel_contains.asp
function busquedaDeClima() {
  $("#botonBusqueda").click(function () {
    var text = $("#entradaBusqueda").val().trim();
    var lugar = $(".lugar.enabled:contains(" + text + ")");
    var latitudLugar = lugar.length > 0 ? lugar.data("latitud") : null;
    var longitudLugar = lugar.length > 0 ? lugar.data("longitud") : null;

    $.ajax({
      method: "GET",
      url: "https://api.open-meteo.com/v1/forecast",
      data: {
        latitude: latitudLugar,
        longitude: longitudLugar,
        current: "apparent_temperature,weather_code", // Solicitar los datos que deseas
      },
      success: function (detalle) {
        // Actualizar la información en los elementos HTML con los datos recibidos
        $("#nombreCiudad").text(text);
        $("#temperatura").text(detalle.current.apparent_temperature + " °C");
        $("#condiciones").text(detalle.current.weather_code);
        $("#infoClima").show();
      },
      error: function () {
        alert("Error al optener el clima.");
      },
    });
    lugar.length > 0 ? null : alert("Lugar no disponible.");
  });
}
