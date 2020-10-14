$(function () {
    $("#modal-alert").iziModal({
        title: 'Destination',
        subtitle: '',
        theme: '',
        headerColor: '#ed741e',
        overlayColor: 'rgba(0, 0, 0, 0.8)',
        iconColor: '',
        iconClass: null,
        width: '60%',
        padding: 0,
        iframe: false,
        iframeHeight: 400,
        iframeURL: null,
        overlayClose: true,
        closeOnEscape: true,
        bodyOverflow: false,
        focusInput: true,
        autoOpen: false,
        fullscreen: true,
        openFullscreen: false,
        timeout: false,
        timeoutProgressbar: false,
        timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
        transitionInModal: 'transitionIn',
        transitionOutModal: 'transitionOut',
        transitionInOverlay: 'fadeIn',
        transitionOutOverlay: 'fadeOut',
        onOpening: function () { },
        onOpened: function () { },
        onClosing: function () { },
        onClosed: function () { }
    });
    getDestination();

});

function getDestination() {

    'use strict';
    $.ajax({
        url: DestinationList,   // getproducts   getpromosandevents
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {

            var x = data.Data;
            $('#destination').empty();
            // initiate loading promos and events
            $.each(x, function (index) {

                var descrip = x[index].Description;
                descrip = descrip.substring(0, 100) + '...';
                debugger;
                var desti = '<div class="col-md-4 col-12 d2 ">'+
                                '<div class="card shadow br-5">'+
                                    '<div id="destination">'+
                                        '<img src="' + x[index].Image + '" class="card-img-top nobrbottom" alt="...">' +
                                    '</div>'+
                                '<div class="card-body">'+
                                    '<h5 class="card-title text-orange ">' + x[index].Name + '</h5>' +
                                    '<p class="card-text text-justify">' + descrip + '</p>' +
                                    '<a href="#" class="trigger-alert btn btn-orange pm_' + index + '">Read more</a>' +
                                '</div>'+
                                '</div>' +
                            '</div>';
                //$('#destination').append('<img id="ns_1"  class="trigger-alert responsive-img z-depth-1" src="http://www.robinsonsmovieworld.com/BookingCms/Images/230x333-LION KING_636987940791795096.jpg"/>');
                $('#destination').append(desti);
                // poster mouseover function
             
                $('.pm_' + index).on('click', function () {
                    $('#destination-view').empty();

                    $('.iziModal-header-title').empty();
                    $('.iziModal-header-title').append(x[index].Name);
                    $('#destination-view').empty();

                    var modalView = '<div class="row">' +
                                        '<div class="destination-img-container col-md-4 p-0" >' +
                                            '<img src="' + x[index].Image + '" class="img-responsive"/>' +
                                        '</div>' +
                                        '<div class="col-md-8 mt-3">' +
                                            '<span class="f-title text-black">' + x[index].Name + '</span>' +
                                            '<br />' +
                                            '<span class="font-12">' + x[index].Municipality + ', ' + x[index].City + '</span>' +
                                            '<br /><br />' +
                                            '<p>' + x[index].Description + '</p>' +
                                        '</div>' +
                                    '</div>';

                    $('#destination-view').append(modalView);
                });
                // initiate modal
                $(document).on('click', '.trigger-alert', function (event) {
                    event.preventDefault();
                    $('#modal-alert').iziModal('open');
                });
            });
           

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}
