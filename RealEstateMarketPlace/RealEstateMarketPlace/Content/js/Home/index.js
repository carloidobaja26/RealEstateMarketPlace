$(document).ready(function () {
    
    $('#btnRentProperty').click(function () {
        $('#modalRent').modal('show')
    });
    $('#ulid').on('click', function (e) {
        if ($("#ulid").css('display').toLowerCase() != 'block') {
            $("#ulid").css("display", "block");
        }
        else {
            $("#ulid").css("display", "hidden");
        }
        //e.stopPropagation();
    });
});

