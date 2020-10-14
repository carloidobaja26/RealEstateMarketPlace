var token = decodeURI(getQueryVariable("token"));
$(function () {
    $("#btnChangePassword").click(function () {
        var $form = $("#forgotPassword");
        $form.validate({
            rules: {
                txtPassword: {
                    required: true,
                    minlength: 8,
                },
                txtConfirmPassword: {
                    required: true,
                    minlength: 8,
                    equalTo: "#txtPassword"
                }
            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                //txtMerchantFirstName: "Firstname is required.",
                //txtMerchantMiddleName: "Middlename is required.",
                txtPassword: "Password must contain atleast 8 character",
                txtConfirmPassword: "Confirm Password must be equal to your new password"
            },
            submitHandler: function () {
                debugger;
                forgotPasswordChange();
            }
        });


      
    });

});



function forgotPasswordChange() {
    var token = decodeURI(getQueryVariable("token"));
    var _txtNewPassword = $('#txtPassword').val();
    var _txtConfirm = $('#txtConfirmPassword').val();
    var postData = {
        NewPassword: _txtNewPassword,
        Token: token
    };

    $.ajax({
        url: ForgotPasswordChange,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                swal(
                    {
                        title: '',
                        type: 'success',
                        text: 'Password has been successfully changed, you can now proceed to login',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        window.location = Success;
                    });
               
            }
            else {
                swal(
                   {
                       title: '',
                       type: 'info',
                       text: data.Message,
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
}

