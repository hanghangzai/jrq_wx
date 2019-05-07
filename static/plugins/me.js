$(function() {
  $(window).bind('resize load', function() {
    $("body").css("zoom", $(window).width() / 750);
    $("body").css("display", "block");
    $("body").css("zoom", $(window).width() / 750);
  });

});
