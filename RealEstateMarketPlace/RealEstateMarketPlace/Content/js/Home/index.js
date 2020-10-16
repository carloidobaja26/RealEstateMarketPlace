$(document).ready(function () {
    
    $('#btnRentProperty').click(function () {
        $('#modalRent').modal('show')
    });
    $('#ulid').on('click', function (e) {
        //if ($("#ulid").css('display').toLowerCase() != 'block') {
        //    $("#ulid").css("display", "block");
        //}
        //else {
        //    $("#ulid").css("display", "hidden");
        //}
        e.stopPropagation();
    });
    $("#ex25").slider({
        value: [100, 10000],
        ticks: [100, 2000,4000,6000,8000, 10000],
        lock_to_ticks: false
    });
});

