var audio1 = $("#buzzer1")[0];
$(".therecord").draggable({
  drag: function (event, ui) {},
});
$(".theplayerrecord").droppable({
  accept: ".therecord",
  drop: function (event, ui) {
    $(".therecord").css({ width: "0" });
    $(".on3").css({
      backgroundImage: "url(https://tim-school.com/codepen/records/jazz.png)",
    });
    $(".on2").css({
      backgroundImage: "url(https://tim-school.com/codepen/records/jazz.png)",
    });

    $(".theplayerrecord").toggleClass("on1");
    audio1.play();
    audio2.pause();
    audio3.pause();
  },
});
var audio2 = $("#buzzer2")[0];
$(".therecord2").draggable({
  drag: function (event, ui) {},
});
$(".theplayerrecord2").droppable({
  accept: ".therecord2",
  drop: function (event, ui) {
    $(".therecord2").css({ width: "0" });
    $(".on3").css({
      backgroundImage: "url(https://tim-school.com/codepen/records/techno.png)",
    });
    $(".theplayerrecord").toggleClass("on2");
    audio2.play();
    audio1.pause();
    audio3.pause();
  },
});
var audio3 = $("#buzzer3")[0];
$(".therecord3").draggable({
  drag: function (event, ui) {},
});
$(".theplayerrecord3").droppable({
  accept: ".therecord3",
  drop: function (event, ui) {
    $(".therecord3").css({ width: "0" });
    $(".theplayerrecord").toggleClass("on3");
    audio3.play();
    audio1.pause();
    audio2.pause();
  },
});
