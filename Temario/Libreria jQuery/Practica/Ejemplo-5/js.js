$(document).ready(function () {
  $("#asociarThead").click(function () {
    $("#miTabla thead").addClass("thead-style");
  });

  $("#desasociarThead").click(function () {
    $("#miTabla thead").removeClass("thead-style");
  });

  $("#asociarTbody").click(function () {
    $("#miTabla tbody").addClass("tbody-style");
  });

  $("#desasociarTbody").click(function () {
    $("#miTabla tbody").removeClass("tbody-style");
  });
});
