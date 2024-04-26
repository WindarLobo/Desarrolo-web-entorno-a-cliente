$(document).ready(function () {
  $("#button").on("click", function () {
    $(".box1").switchClass("box1", "box2", 1000);
    $(".box2").switchClass("box2", "box3", 1000);
    $(".box3").switchClass("box3", "box1", 1000);
    $(".eye1a").switchClass("eye1a", "eye1b", 1000);
    $(".eye1b").switchClass("eye1b", "eye1c", 1000);
    $(".eye1c").switchClass("eye1c", "eye1a", 1000);
    $(".eye2a").switchClass("eye2a", "eye2b", 1000);
    $(".eye2b").switchClass("eye2b", "eye2c", 1000);
    $(".eye2c").switchClass("eye2c", "eye2a", 1000);
    $(".pupil1a").switchClass("pupil1a", "pupil1b", 1000);
    $(".pupil1b").switchClass("pupil1b", "pupil1c", 1000);
    $(".pupil1c").switchClass("pupil1c", "pupil1a", 1000);
    $(".pupil2a").switchClass("pupil2a", "pupil2b", 1000);
    $(".pupil2b").switchClass("pupil2b", "pupil2c", 1000);
    $(".pupil2c").switchClass("pupil2c", "pupil2a", 1000);
    $(".mouth1a").switchClass("mouth1a", "mouth1b", 1000);
    $(".mouth1b").switchClass("mouth1b", "mouth1c", 1000);
    $(".mouth1c").switchClass("mouth1c", "mouth1a", 1000);
    $(".cigar1a").switchClass("cigar1a", "cigar1b", 1000);
    $(".cigar1b").switchClass("cigar1b", "cigar1c", 1000);
    $(".cigar1c").switchClass("cigar1c", "cigar1a", 1000);
    $(".smoke1a").switchClass("smoke1a", "smoke1b", 1000);
    $(".smoke1b").switchClass("smoke1b", "smoke1c", 1000);
    $(".smoke1c").switchClass("smoke1c", "smoke1a", 1000);
  });
});
