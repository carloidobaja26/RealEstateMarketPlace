$(document).ready(function() {

});

function imgSrc(){
	var e = $(".img-gallery");
	for (var i = 0; i < e.length; i++) {
	  var src = $(e[i]).attr("data-main-src");
	  var background = "url("+src+") 50% 50% no-repeat";
	  $(e[i]).css('background', background);
	}
}

$(".galleryLink").click(function () {
    debugger;
    var a = $(this).attr("data-main-src");
    var background = "url("+a+") 50% 50% no-repeat";
    $(".img-gallery-active").css('background', background);
  });

function bigOnLoad(){
    var e = $(".img-gallery");
    var src = $(e[0]).attr("data-main-src");
    var background = "url("+src+") 50% 50% no-repeat";
    $(".img-gallery-active").css('background', background);
}