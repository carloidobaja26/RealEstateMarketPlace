$(document).ready(function () {
    $("#btnContactUs").click(function () {
        var $form = $("#contactUsForm");
        $form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                contactNumber: {
                    required: true,
                    number: true,
                },
                subject: {
                    required: true,
                    minlength: 1
                },
                message: {
                    required: true,
                    minlength: 1
                },
                emailAddress: {
                    required: true,
                    email: true
                }
            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                subject: "Please state the subject of your inquiry.",
                contactNumber: "Contact no. is required.",
                name: "Please state your full name.",
                message: "Please state your inquiry.",
                emailAddress: "Please specify a valid email address",
            },
            submitHandler: function () {
                debugger;
                contactUs();

            }
        });


    });


});



function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function contactUs() {
    'use strict'
    var _txtName = $("#name").val();
    var _txtContact = $("#contactNumber").val();

    var _txtEmail = $("#emailAddress").val();
    var _txtSubject = $("#subject").val();
    var _inquiryMessage = $("#message").val();


    if (_txtName === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please state your full name.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
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
    if (_txtSubject === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please state the subject of your inquiry.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }

    if (_inquiryMessage === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please state your full inquiry.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }


    var postData = {
        Name: _txtName,
        ContactNumber: _txtContact,
        Email: _txtEmail,
        Subject: _txtSubject,
        Message: _inquiryMessage
    };

    $.ajax({
        url: ContactUsInquiry,
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
                        text: 'Your inquiry has been sent. We will response to you via email or via call as soon as posible.',
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
        beforeSend: function () {
            $("#contactContainer").block({
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
            $("#contactContainer").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}