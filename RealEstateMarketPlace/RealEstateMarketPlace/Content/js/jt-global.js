


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    //alert('Query Variable ' + variable + ' not found');
}

function addEmailSubsribe() {
    var name = $("#subscribeEmail").val();
    if (name == '') {
        swal(
            {
                title: '',
                type: 'error',
                text: 'Please Enter Email Address',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                return false;
            });
    }
    else {
        var postData = {
            Email: name,
        }

        $.ajax({
            url: AddEmailSubsribe,
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
                            text: data.Message,
                            showCancelButton: false,
                            confirmButtonColor: "#d9534f"
                        }, function () {
                            return false;
                        });

                }
                else {
                    swal(
                        {
                            title: '',
                            type: 'error',
                            text: data.Message,
                            showCancelButton: false,
                            confirmButtonColor: "#d9534f"
                        }, function () {
                            return false;
                        });
                }
            },
            error: function (xhr, status, error) {
                console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            }
        });
    }
  
}


//$(function () {
   
//});

$(document).ready(function () {

    //OriginListing();
    $("#btnSubscribe").click(function () {
        addEmailSubsribe();
    });
    $('#btnLogincontinue').click(function () {
        //$('#termsAndCondition').modal('hide');
        userSignUp();
    });

    $("#a-forgotPassword").click(function () {

        $('#modalLogin').modal('hide').on('hidden.bs.modal', function (e) {
            $('#modalForgotPassword').modal('show');

            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
      

    });

   

    $("#a-btnSignUp").click(function () {

        $('#modalLogin').modal('hide').on('hidden.bs.modal', function (e) {
            $('#modalSignup').modal('show');

            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });

    });
    $("#a-btnSignIn").click(function () {
        $('#modalSignup').modal('hide').on('hidden.bs.modal', function (e) {
            $('#modalLogin').modal('show');

            $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
       
    });

    //button
    $("#btnSignUp").click(function () {
        var $form = $("#signUpForm");
        $form.validate({
            rules: {
                txtSignUpFirstName: {
                    required: true,
                    minlength: 2,
                },
                txtSignUpLastName: {
                    required: true,
                    minlength: 2,
                },
                txtSignUpPassword:  {
                    required: true,
                    minlength: 8,
                },
                txtSignUpConfirmPass: {
                    required: true,
                    minlength: 8,
                    equalTo: "#txtSignUpPassword"
                },
                
                txtSignUpEmail: {
                    required: true,
                    email: true
                }
                
            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                //txtMerchantFirstName: "Firstname is required.",
                //txtMerchantMiddleName: "Middlename is required.",
                txtSignUpPassword: "Password must contain atleast 8 character",
                txtSignUpEmail: "Please specify a valid email address",
                txtSignUpConfirmPass: "Confirm Password must be equal to your Password"
            },
            submitHandler: function () {
                debugger;
                $('#termsAndCondition').modal('show');
               // userSignUp();
              


            }
        });


    });

    $("#btnSignIn").click(function () {
        loginUser();
    });
    $("#btnSignInPackage").click(function () {
        loginUserPackage();
    });

    $("#btnResetPassword").click(function () {
        fnForgotPassword();
    });
    $("#fbLogIn").click(function () {
        facebookLogin();
    });
});

//FACEBOOK START
function initiateFBLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            LoginAsGuestFacebook();
        }
    }, {
            scope: 'email',
            return_scopes: true
        });
}

function facebookLogin() {
    FB.init({
        //appId: '3144438972273073', //carlotechmart
        appId: '324525872036982', //juantraveler
        //appId: '490516231608858', //local
        cookie: true,  // enable cookies to allow the server to access 
        xfbml: true,  // parse social plugins on this page
        version: 'v6.0' // use graph api version 2.8
    });

    FB.getLoginStatus(function (response) {
        debugger;
        if (response.status === 'connected') {
            LoginAsGuestFacebook();
        }
        else {
            initiateFBLogin();
        }
    });
    
}

var arrFBResponse = [];

function LoginAsGuestFacebook() {
    //FB.logout(function (response) {
    //    alert('logout');
    //});
    $("#btn-facebook").addClass("disabled");

    FB.api('/me?fields=name,email,first_name,last_name,picture.width(400).height(400)', function (response) {
        console.log(response);
        var email = response.email;
        var firstName = response.first_name;
        var lastName = response.last_name;
        arrFBResponse = response;
        var dataSignin = {};
        dataSignin["email"] = email;
        UserGuest(email, firstName, lastName, arrFBResponse.picture.data.url);
    });
    //FB.api(
    //    '100791958300959',
    //    'DELETE',
    //    {},
    //    function (response) {
    //        debugger;
    //        // Insert your code here
    //    }
    //);
   
}
function UserGuest(email, firstName, lastName, fbimage) {
    var postData = {
        FirstName: firstName,
        LastName: lastName,
        EmailAddress: email,
        Image: fbimage
    };

    $.ajax({
        url: LogInGuest,
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
            $("#modalLogin").block({
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
            $("#modalLogin").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function loginUserPackage() {
    var _txtEmail = $('#txtEmailp').val();
    var _txtPassword = $('#txtPasswordp').val();
    if (_txtEmail === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please input your email address.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    if (_txtPassword === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please input your password.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    var postData = {
        EmailAddress: _txtEmail,
        Password: _txtPassword
    };

    $.ajax({
        url: Login,
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
                        text: 'Welcome to Juantraveller ' + response.Data.FirstName + ',',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        debugger;
                        $('#navbarCollapse').load(document.URL + ' #navbarCollapse', null, function () {
                            $('#modalLogin').modal('hide').on('hidden.bs.modal', function (e) {
                                //$('#modalSignup').modal('show');

                                $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
                            });
                        });
                        var urlLocation = document.URL;
                        if (urlLocation.includes('Hotel')) {
                            window.location.reload();
                        }
                        else {
                            window.location.reload();
                        }

                    });
            }
            else {
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
            $("#modalLogin").block({
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
            $("#modalLogin").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}

function fnForgotPassword() {
    var _txtEmailFP = $('#txtEmailForgotPassword').val();

    if (!validateEmail(_txtEmailFP)) {
        swal(
                   {
                       title: '',
                       type: 'info',
                       text: 'Please input a valid email address.',
                       showCancelButton: false,
                       confirmButtonColor: "#d9534f"
                   });
        return false;
    }

    if (_txtEmailFP === '') {
        swal(
                     {
                         title: '',
                         type: 'info',
                         text: 'Email address is required.',
                         showCancelButton: false,
                         confirmButtonColor: "#d9534f"
                     });
        return false;
    }

    var postData = {
        EmailAddress: _txtEmailFP
    };
    $.ajax({
        url: ForgotPassword,
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
                        text: 'We sent an email to ' + _txtEmailFP + ', Please click the reset password link to set your new password.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        $('#modalForgotPassword').modal('hide').on('hidden.bs.modal', function (e) {
                            //$('#modalSignup').modal('show');
                                $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
                        });
                       
                    });
            }
            else {
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
}
function loginUser() {

    

    var _txtEmail = $('#txtEmail').val();
    var _txtPassword = $('#txtPassword').val();
    if (_txtEmail === "") {
        swal(
                      {
                          title: '',
                          type: 'info',
                          text: 'Please input your email address.',
                          showCancelButton: false,
                          confirmButtonColor: "#d9534f"
                      });
        return false;
    }
    if (_txtPassword === "") {
        swal(
                      {
                          title: '',
                          type: 'info',
                          text: 'Please input your password.',
                          showCancelButton: false,
                          confirmButtonColor: "#d9534f"
                      });
        return false;
    }
    var postData = {
        EmailAddress: _txtEmail,
        Password: _txtPassword
    };

    $.ajax({
        url: Login,
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
                        text: 'Welcome to Juantraveller ' + response.Data.FirstName + ',',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        debugger;
                        $('#navbarCollapse').load(document.URL + ' #navbarCollapse', null, function () {
                            $('#modalLogin').modal('hide').on('hidden.bs.modal', function (e) {
                                //$('#modalSignup').modal('show');

                                $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
                            });
                        });
                        var urlLocation = document.URL;
                        if (urlLocation.includes('Hotel')) {
                            window.location.reload();
                        }
                        else {
                            window.location.reload();
                        }

                    });
            }
            else {
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
            $("#modalLogin").block({
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
            $("#modalLogin").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}

function userSignUp() {
    'use strict'
    
    var _txtFirstName = $("#txtSignUpFirstName").val();
    var _txtLastName = $("#txtSignUpLastName").val();

    var _txtEmail = $("#txtSignUpEmail").val();
    var _password = $("#txtSignUpPassword").val();
    var _confirmPass = $("#txtSignUpConfirmPass").val();
 
    if (!validateEmail(_txtEmail)) {
        swal(
                      {
                          title: '',
                          type: 'info',
                          text: 'Please input a valid email..',
                          showCancelButton: false,
                          confirmButtonColor: "#d9534f"
                      });
        return false;
    }

    if (_password != _confirmPass) {
        swal(
                      {
                          title: '',
                          type: 'info',
                          text: 'Confirm password not matched.',
                          showCancelButton: false,
                          confirmButtonColor: "#d9534f"
                      });
        return false;
    }

    var postData = {
        FirstName: _txtFirstName,
        LastName: _txtLastName,
        EmailAddress: _txtEmail,
        Password: _password
    };

    $.ajax({
        url: UserSignUp, 
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                
                window.location = UserSignUpSuccess;
                //swal(
                //    {
                //        title: '',
                //        type: 'success',
                //        text: 'Your application has been sent. Kindly check your email for further instruction.',
                //        showCancelButton: false,
                //        confirmButtonColor: "#d9534f"
                //    }, function () {
                //        window.location = Success;
                //    });


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

var formatPrice = function (n, sep, decimals) {
    sep = sep || "."; // Default to period as decimal separator
    decimals = decimals || 2; // Default to 2 decimals

    return n.toLocaleString().split(sep)[0]
        + sep
        + n.toFixed(decimals).split(sep)[1];
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateCharacter(obj) {
    //var alphaExp = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    var alphaExp = /^[ A-Za-z]+$/;
    return alphaExp.test(obj);
}

function validateNumber(obj) {
    var regex = /^[0-9]+$/;
    return regex.test(obj);
}

var originList = [];
function OriginListing() {
    $.ajax({
        url: OriginList,
        type: "Post",
        dataType: "json",
        // data: JSON.stringify(postData),
        contentType: 'application/json',
        cache: false,
        success: function (response) {
            //debugger;
            if (response.Result === 0) {
                var x = response.Data;
                $.each(x, function (index) {
                    //debugger;
                    var item = '';
                    var desti = x[index].destination;
                    var desinationArray = [];
                    $.each(desti, function (i) {
                        //debugger;
                        desinationArray.push({ "Id": i, "Destination": desti[i] });
                    });

                    originList.push({ "Id": index, "Origin": x[index].origin, "DestinationList": desinationArray });


                });
                var originDiv = '';
                for (i = 0; i < originList.length; i++) {
                    originDiv += '<div class="col-md-4 col-4 pt-2">'
                        + '<div class="row">'
                        + '<div class="col-md-12" style="min-height:50px">'
                        + '<a class="btn selectTrips" id=""onclick="selectOrigin(\'' + originList[i].Id + '\')">'
                        + '<div class="text-left">'
                        + '<span>' + originList[i].Origin + '</span>'
                        + '<br />'
                        + '</div>'
                        + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                }
                $("#originList").append(originDiv);

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
            $("#hsearch-div").block({
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
            $("#hsearch-div").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}