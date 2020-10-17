$(document).ready(function () {
    
    $('#btnRentProperty').click(function () {
        $('#modalRent').modal('show')
    });
    $('#btnSaleProperty').click(function () {
        $('#modalSale').modal('show')
    });
    $('#btnPropertyBuyFind').click(function () {
        window.location.href = Property + "?property=1";
    });
    
    $('#btnProperyRentFind').click(function () {
        window.location.href = Property + "?property=2";
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
    $("#rentPrice").slider({
        value: [100, 10000],
        ticks: [100, 2000,4000,6000,8000, 10000],
        lock_to_ticks: false
    });
    $("#salePrice").slider({
        value: [100, 10000],
        ticks: [100, 2000, 4000, 6000, 8000, 10000],
        lock_to_ticks: false
    });
});

