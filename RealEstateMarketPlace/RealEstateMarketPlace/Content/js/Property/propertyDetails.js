$(document).ready(function () {
    imgSrc();
    bigOnLoad();
    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3
    });
    $('.galleryLink').on("click", function () {
        debugger;
        var a = $(this).attr("data-main-src");
        var background = "url(" + a + ") 50% 50% no-repeat";
        $('.img-gallery-active').css('background', background);
    });
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 15,
        center: new google.maps.LatLng(14.461985279254192, 120.45793347027586),
        mapTypeId: 'roadmap'
    });
    $('#btnCallAgent').click(function () {
        $('#callAgentModal').modal('show')
    });
    $('#btnEmailAgent').click(function () {
        $('#emailAgentModal').modal('show')
    });
});