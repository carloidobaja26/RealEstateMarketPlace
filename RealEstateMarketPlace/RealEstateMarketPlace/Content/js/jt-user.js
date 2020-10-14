function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("profile");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


function UploadImage() {
  
    $('#file_upload').fileupload({
        dataType: 'json',
        url: uploadUrl,
        progressall: function (e, data) {
          
        },
        done: function (e, data) {
            debugger;
        }
    });
}
$(document).on('click', 'input[type="checkbox"]', function () {

    $('input[type="checkbox"]').not(this).prop('checked', false);
    //$('textarea').attr('enabled', !this.checked);
    if (document.getElementById("checkBox5").checked === true) {
        $('textarea').attr('disabled', false);
    } else {
        $('textarea').attr('disabled', true);
        $('textarea').val('');
    }
});

$(document).ready(function () {
    
    $("#btnProfileUpdateSave").click(function () {
        ProfileUpdate();
    });
    var isGuestLogin = $('#isGuest').val();
    if (isGuestLogin == 1) {
       // alert('zup');
        $('#changePassword').attr('hidden', true);
        $('#linkAccount').attr('hidden', true); 
    }
    else if (isGuestLogin == 0) {
        //  alert('yow');
        $('#changePassword').attr('hidden', false);
        $('#linkAccount').attr('hidden', false);
    }
    $("#linkFbAccount").click(function () {
        linkFbAccount();
    });
    $("#unLinkFbAccount").click(function () {
        //linkFbAccount();
        unLinkFbAccount();
    });
  //  UploadImage();
    //$('#txtBirthday').daterangepicker({
    //    "drops": "down",
       
    //    "locale": {
    //        "cancelLabel": 'Clear'
    //    },
    //    "singleDatePicker": true
    //}, function (start, end, label) {
    //    //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    //    //call roomtype
     
    //});

    $("#btnSubmit").click(function () {

      

        if ($('#txtDeletePassword').val() === '') {
            swal(
                    {
                        title: '',
                        type: 'info',
                        text: 'Please enter your password!',
                        showCancelButton: false,
                        confirmButtonColor: "#FF793F"
                    });
            return false;
        }
        AccountDeletefunction();

    });

    $("#btnChangePassword").click(function () {
        var $form = $("#managePasswordForm");
        $form.validate({
            rules: {
                txtCurrentPassword: {
                    required: true,
                    minlength: 8,
                },
                txtNewPassword: {
                    required: true,
                    minlength: 8,
                },
                txtConfirmPassword: {
                    required: true,
                    minlength: 8,
                    equalTo: "#txtNewPassword"
                },

            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                //txtMerchantFirstName: "Firstname is required.",
                //txtMerchantMiddleName: "Middlename is required.",
                txtCurrentPassword: "Password must contain atleast 8 character",
                txtNewPassword: "Password must contain atleast 8 character",
                txtConfirmPassword: "Confirm Password must be equal to your new password"
            },
            submitHandler: function () {
                debugger;

                ManagePassword();

            }
        });


    });

});


function onAccountDelete() {
    debugger;
    var result = checkBoxCheck();
    if (result == "") {
        swal(
              {
                  title: '',
                  type: 'info',
                  text: "Please select atleast one (1) reason.",
                  showCancelButton: false,
                  confirmButtonColor: "#FF793F"
              });
        return false;
    }
    var c5Value = "";
    if (document.getElementById("checkBox5").checked === true) {
        c5Value = jQuery("textarea#Textarea").val();
        if (c5Value === "") {
            swal(
             {
                 title: '',
                 type: 'info',
                 text: "Please input your reason.",
                 showCancelButton: false,
                 confirmButtonColor: "#FF793F"
             });
            return false;
        }
    }

  
    $('#modalConfirmDelete2').modal('show');


}



function checkBoxCheck() {
    var ischeck = "";
    $("input[type=checkbox]").each(function () {
       
       if ($(this).is(":checked")) {
           ischeck = $(this);
        }
    });
    return ischeck;
}


function AccountDeletefunction() {
    debugger;
    var selected;
    var value;



    $("input[type=checkbox]").each(function () {
        if (document.getElementById("checkBox5").checked === true) {
            value = jQuery("textarea#Textarea").val();
        } else if ($(this).is(":checked")) {
            selected = ($(this).attr('id'));
            value = $('#' + selected).val();
        }
    });
    var _txtEmailForgotPassword = $('#txtDeletePassword').val();
    var _txtTextarea = value;
    var postData = {
        Password: _txtEmailForgotPassword,
        Reason: _txtTextarea
    };
    $.ajax({
        url: AccountDelete,
        type: "Post",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json',
        cache: false,
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                debugger;
                swal(
                {

                    title: 'Account Deactivated',
                    type: 'success',
                    text: 'Your Juantraveller account will be deactivated in 15 days. If you wish to reactivate your account, simply log in to Juantraveller. ',
                    showCancelButton: false,
                    confirmButtonText: "Return to home page",
                    confirmButtonColor: "#FF793F",
                    allowOutsideClick: false
                }, function () {

                    //return RedirectToAction("Index", "Home");
                    window.location = Home;
                });
            } else {
                swal(
                {
                    title: '',
                    type: 'info',
                    text: response.Message,
                    showCancelButton: false,
                    confirmButtonColor: "#FF793F"
                });
                return false;
            }
        },
        beforeSend: function () {
            $("#div-container").block({
                message: $("#data-preloader"),
                css: {
                    border: "none",
                    padding: "15px",
                    backgroundColor: "transparent",
                    opacity: 1,
                    color: "#000"
                }
            });
        },
        complete: function () {
            $("#div-container").unblock();
        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function ProfileUpdate() {
    var _txtFirstName = $('#txtFirstName').val();
    var _txtLastName = $('#txtLastName').val();
    var _txtPhoneNumber = $('#txtPhoneNumber').val();
    var _txtBirthday = $('#txtBirthday').val();

    if (_txtFirstName === "") {
        swal(
                   {
                       title: '',
                       type: 'info',
                       text: 'Firstname is required.',
                       showCancelButton: false,
                       confirmButtonColor: "#d9534f"
                   });
        return false;
    }
    if (_txtLastName === "") {
        swal(
                   {
                       title: '',
                       type: 'info',
                       text: 'Lastname is required.',
                       showCancelButton: false,
                       confirmButtonColor: "#d9534f"
                   });
        return false;
    }
    if (!validateCharacter(_txtFirstName) && _txtFirstName !== "") {
        swal(
                   {
                       title: '',
                       type: 'info',
                       text: 'Name is required and must not contain number',
                       showCancelButton: false,
                       confirmButtonColor: "#d9534f"
                   });
        return false;
    }
    if (!validateCharacter(_txtLastName) && _txtLastName !== "") {
        swal(
                   {
                       title: '',
                       type: 'info',
                       text: 'Last name is required and must not contain number',
                       showCancelButton: false,
                       confirmButtonColor: "#d9534f"
                   });
        return false;
    }
        var postData = {
            FirstName: _txtFirstName,
            Lastname: _txtLastName,
            ContactNumber: _txtPhoneNumber,
            BirthDate: _txtBirthday
        };
    
        $.ajax({
            url: UpdateProfile,
            type: "Post",
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
                        text: 'Profile Successfully Updated!.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        location.reload();
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
            beforeSend: function () {
                $("#div-container").block({
                    message: $("#data-preloader"),
                    css: {
                        border: "none",
                        padding: "15px",
                        backgroundColor: "transparent",
                        opacity: 1,
                        color: "#000"
                    }
                });
            },
            complete: function () {
                $("#div-container").unblock();
            },
            error: function (xhr, status, error) {
                console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            }
        });
}
function ManagePassword() {

    var _txtCurrentPassword = $('#txtCurrentPassword').val();
    var _txtNewPassword = $('#txtNewPassword').val();
    var _txtConfirmPassword = $('#txtConfirmPassword').val();
    if (_txtNewPassword === _txtConfirmPassword) {
        var postData = {
            Password: _txtCurrentPassword,
            NewPassword: _txtConfirmPassword
        };
      
        $.ajax({
            url: ChangePassword,
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
                        window.location = Profile;
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
            beforeSend: function () {
                $("#div-container").block({
                    message: $("#data-preloader"),
                    css: {
                        border: "none",
                        padding: "15px",
                        backgroundColor: "transparent",
                        opacity: 1,
                        color: "#000"
                    }
                });
            },
            complete: function () {
                $("#div-container").unblock();
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
                        text: 'Confirm password not match!',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
        return false;
    }

}

function linkFbAccount() {
    facebookLink();
    
}
function unLinkFb() {
    var cemail = '';
    
    FB.api('/me?fields=name,email,first_name,last_name', function (response) {
        console.log(response);
        var email = response.email;
        var firstName = response.first_name;
        var lastName = response.last_name;

        var dataSignin = {};
        dataSignin["email"] = email;
        token = response.id;
        FB.api("/me/permissions", "DELETE", function (response) {
            console.log(response); //gives true on app delete success 

            UnLinkUserFbAcc(email);
        });
    });
   
}

function unLinkFbAccount() {
    FB.init({
        appId: '3144438972273073', //carlotechmart
        //appId: '490516231608858', //local
        cookie: true,  // enable cookies to allow the server to access 
        xfbml: true,  // parse social plugins on this page
        version: 'v6.0' // use graph api version 2.8
    });

    FB.getLoginStatus(function (response) {
        debugger;
        if (response.status === 'connected') {
            unLinkFb();
        }
        else {
            FB.login(function (response) {
                if (response.authResponse) {
                    unLinkFb();
                }
            }, {
                    scope: 'email',
                    return_scopes: true
                });

        }
    });

   
}

function initiateFBLink() {
    FB.login(function (response) {
        if (response.authResponse) {
            LinkFbAccount();
        }
    }, {
            scope: 'email',
            return_scopes: true
        });
}

function facebookLink() {
    FB.init({
        appId: '3144438972273073', //carlotechmart
        //appId: '490516231608858', //local
        cookie: true,  // enable cookies to allow the server to access 
        xfbml: true,  // parse social plugins on this page
        version: 'v6.0' // use graph api version 2.8
    });

    FB.getLoginStatus(function (response) {
        debugger;
        if (response.status === 'connected') {
            LinkFbAccount();
        }
        else {
            initiateFBLink();
        }
    });

}


function LinkFbAccount() {
    //FB.logout(function (response) {
    //    alert('logout');
    //});
  //  $("#btn-facebook").addClass("disabled");
    var token = '';
    FB.api('/me?fields=name,email,first_name,last_name', function (response) {
        console.log(response);
        var email = response.email;
        var firstName = response.first_name;
        var lastName = response.last_name;

        var dataSignin = {};
        dataSignin["email"] = email;
        token = response.id;
        LinkUserFbAcc(email, firstName, lastName);
        
    });
    
}
function LinkUserFbAcc(email, firstName, lastName) {
    var postData = {
        FirstName: firstName,
        LastName: lastName,
        EmailAddress: email,
    };

    $.ajax({
        url: LinkFacebookAccount,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {

                // window.location = UserSignUpSuccess;
                swal(
                    {
                        title: '',
                        type: 'success',
                        text: 'Success',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        //return false;
                        window.location.reload();
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
        beforeSend: function () {
            $("#modalSignup").block({
                message: $("#data-preloader"),
                css: {
                    border: "none",
                    padding: "15px",
                    backgroundColor: "transparent",
                    opacity: 1,
                    color: "#000"
                }
            });
            $("#termsAndCondition").block({
                message: $("#data-preloader"),
                css: {
                    border: "none",
                    padding: "15px",
                    backgroundColor: "transparent",
                    opacity: 1,
                    color: "#000"
                }
            });
        },
        complete: function () {
            $("#modalSignup").unblock();
            $("#termsAndCondition").unblock();
        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function UnLinkUserFbAcc(email) {
    var postData = {
        EmailAddress: email,
    };

    $.ajax({
        url: UnLinkFacebookAccount,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {

                // window.location = UserSignUpSuccess;
                swal(
                    {
                        title: '',
                        type: 'success',
                        text: 'Success',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        //return false;
                        window.location.reload();
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
        beforeSend: function () {
            $("#modalSignup").block({
                message: $("#data-preloader"),
                css: {
                    border: "none",
                    padding: "15px",
                    backgroundColor: "transparent",
                    opacity: 1,
                    color: "#000"
                }
            });
            $("#termsAndCondition").block({
                message: $("#data-preloader"),
                css: {
                    border: "none",
                    padding: "15px",
                    backgroundColor: "transparent",
                    opacity: 1,
                    color: "#000"
                }
            });
        },
        complete: function () {
            $("#modalSignup").unblock();
            $("#termsAndCondition").unblock();
        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}