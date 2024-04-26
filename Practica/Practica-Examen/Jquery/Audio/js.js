$(document).ready(function () {
  $("#start1").click(function () {
    if ($("#tim1").width() == 0) {
      $("#tim1").css({ width: "46%" });
      $("#tim2, #tim3, #tim4, #tim5").css({ width: "0%" });
      $("#buzzer1").get(0).play();
      $("#buzzer2").get(0).pause();
      $("#buzzer3").get(0).pause();
      $("#buzzer4").get(0).pause();
      $("#buzzer5").get(0).pause();
    } else {
      $("#tim1").css({ width: "0%" });
      $("#buzzer1").get(0).pause();
    }
  });
});
$(document).ready(function () {
  $("#start2").click(function () {
    if ($("#tim2").width() == 0) {
      $("#tim2").css({ width: "46%" });
      $("#tim1, #tim3, #tim4, #tim5").css({ width: "0%" });
      $("#buzzer2").get(0).play();
      $("#buzzer1").get(0).pause();
      $("#buzzer3").get(0).pause();
      $("#buzzer4").get(0).pause();
      $("#buzzer5").get(0).pause();
    } else {
      $("#tim2").css({ width: "0%" });
      $("#buzzer2").get(0).pause();
    }
  });
});
$(document).ready(function () {
  $("#start3").click(function () {
    if ($("#tim3").width() == 0) {
      $("#tim3").css({ width: "46%" });
      $("#tim2, #tim1, #tim4, #tim5").css({ width: "0%" });
      $("#buzzer3").get(0).play();
      $("#buzzer2").get(0).pause();
      $("#buzzer1").get(0).pause();
      $("#buzzer4").get(0).pause();
      $("#buzzer5").get(0).pause();
    } else {
      $("#tim3").css({ width: "0%" });
      $("#buzzer3").get(0).pause();
    }
  });
});
$(document).ready(function () {
  $("#start4").click(function () {
    if ($("#tim4").width() == 0) {
      $("#tim4").css({ width: "46%" });
      $("#tim2, #tim3, #tim1, #tim5").css({ width: "0%" });
      $("#buzzer4").get(0).play();
      $("#buzzer2").get(0).pause();
      $("#buzzer3").get(0).pause();
      $("#buzzer1").get(0).pause();
      $("#buzzer5").get(0).pause();
    } else {
      $("#tim4").css({ width: "0%" });
      $("#buzzer4").get(0).pause();
    }
  });
});
$(document).ready(function () {
  $("#start5").click(function () {
    if ($("#tim5").width() == 0) {
      $("#tim5").css({ width: "46%" });
      $("#tim2, #tim3, #tim4, #tim1").css({ width: "0%" });
      $("#buzzer5").get(0).play();
      $("#buzzer2").get(0).pause();
      $("#buzzer3").get(0).pause();
      $("#buzzer4").get(0).pause();
      $("#buzzer1").get(0).pause();
    } else {
      $("#tim5").css({ width: "0%" });
      $("#buzzer5").get(0).pause();
    }
  });
});
