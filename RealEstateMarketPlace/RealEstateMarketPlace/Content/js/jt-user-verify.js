var token = decodeURI(getQueryVariable("token"));
$(function () {
    $("#divVerified").attr("hidden", true);
    $("#divVerifying").attr("hidden", false);
    if (token != "") {
        verifyUser();
    }


});

function verifyUser() {
    var token = decodeURI(getQueryVariable("token"));
    var postData = {
        Token: token
    };

    $.ajax({
        url: UserVerify,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                //window.location = UserSignUpSuccess;
                $("#divVerified").attr("hidden", false);
                $("#divVerifying").attr("hidden", true);
                var counter = 6;
                var interval = setInterval(function () {
                    counter--;
                    $("#timer").html("0" + counter);
                    if (counter == 0) {
                        window.location = Juantraveller;
                        clearInterval(interval);
                    }
                }, 1000);
            }
            else {
                $("#divVerified").attr("hidden", true);
                $("#divVerifying").attr("hidden", false);
                $("#verifyTitle").html('Oppps!');
                $("#verifyMessage").html(data.Message);
                return false;
            }

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

