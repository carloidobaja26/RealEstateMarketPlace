
$(document).ready(function () {
    $("#btnChangePassword").click(function () {
        ManagePassword();
    });



});
function ManagePassword() {

    var _txtCurrentPassword = $('#txtCurrentPassword').val();
    var _txtNewPassword = $('#txtNewPassword').val();
    var _txtConfirmPassword = $('#txtConfirmPassword').val();
    if (_txtNewPassword === _txtConfirmPassword) {
        var postData = {
            Password: _txtCurrentPassword,
            NewPassword: _txtConfirmPassword
        };
        alert("yeepie");
        $.ajax({
            url: window.baseUrl + 'User/ChangePassword',
            type: "POST",
            dataType: "json",
            data: JSON.stringify(postData),
            contentType: 'application/json',
            cache: false,
            success: function (response) {
                debugger;
                if (response.Result === 0) {
                    swal(
                    {
                        title: '',
                        type: 'success',
                        text: 'Password Successfully Change!.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        window.location = "https://www.w3schools.com";
                    });
                } else {
                    swal(
                    {
                        title: '',
                        type: 'info',
                        text: response.Message,
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
                    return false;
                }
            },
            error: function (xhr, status, error) {
                console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            }
        });
    } else {

        swal(
                    {
                        title: '',
                        type: 'info',
                        text: 'New password mismatched!',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
        return false;
    }

}