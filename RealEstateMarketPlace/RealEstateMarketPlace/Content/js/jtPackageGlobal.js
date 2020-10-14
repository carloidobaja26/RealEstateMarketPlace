$(document).ready(function () {
    $('#searchPackage').bind("enterKey", function (e) {
        var search = $('#searchPackage').val();
        window.location = window.baseUrl + 'Package/showall?search=' + search + '';
    });
    $('#searchPackage').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
});
