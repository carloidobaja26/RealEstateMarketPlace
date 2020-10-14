$(function () {
    retrieveMerchantCategory();
    $("#btnSubmit").click(function () {
        var validateFields = validate();
        if (validateFields === false) {
            return false;
        }
        merchantSignUp();


    });

    $("#btnSubmit0").click(function () {
        var $form = $("#inquiryForm");
        $form.validate({
            rules: {
                txtMerchantLastName: 'required',
                txtMerchantFirstName: 'required',
                //txtMerchantMiddleName: 'required',
                //txtMerchantLastName: {
                //    required: true,
                //    minlength: 2,
                //    letters: true
                //},
                //txtMerchantFirstName: {
                //    required: true,
                //    minlength: 2,
                //    letters: true
                //},
                //txtMerchantMiddleName: {
                //    required: true,
                //    minlength: 2,
                //    letters: true
                //},
                txtMerchantEmail: {
                    required: true,
                    email: true
                },
                txtMerchantContact: {
                    required: true,
                    number: true,
                    minlength: 11,
                }
            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                //txtMerchantFirstName: "Firstname is required.",
                //txtMerchantMiddleName: "Middlename is required.",
                txtMerchantEmail: "Please specify a valid email address",
                txtMerchantContact: "contact no must be at least 11 digit"
            },
            submitHandler: function () {
                debugger;
                var _txtBusinessNatureCategory = $("#businessNature").val();
                var _nType = $("#businessType").val();

                if (_txtBusinessNatureCategory == 1) {
                    if (_nType < 0) {
                        swal(
                           {
                               title: '',
                               type: 'info',
                               text: 'Please select Account Type.',
                               showCancelButton: false,
                               confirmButtonColor: "#d9534f"
                           });

                        return false;
                    }
                }
                else if (_txtBusinessNatureCategory == 'Select Nature of Business') {
                    swal(
                         {
                             title: '',
                             type: 'info',
                             text: 'Please select Nature of Business.',
                             showCancelButton: false,
                             confirmButtonColor: "#d9534f"
                         });

                    return false;
                }


                $('#modalTerms').modal({
                    backdrop: 'static',
                    keyboard: true,
                    show: true
                });

               
            }
        });

    });


    $("#businessNature").change(function () {

        if ($(this).val() === "1") {
            $('#acType').css("display", "block");
            $('#acType').trigger("change");
        }
        else {
            $('#acType').css("display", "none");
            $('#acTypeDesc').css("display", "none");
        }
    });
    $("#businessType").change(function () {

        if ($(this).val() === "1") {
            $('#acTypeDesc').css("display", "block");
            $('#acTypeDesc').empty();
            $('#acTypeDesc').append('<div class="col-12">'+
                        '<ul>'+
                          '  <li>Create and publish listings on Juantraveller Marketplace</li>'+
                         '   <li>Free-access to feature-rich Hospitality Management System (HMS)</li>'+
                      '  </ul>'+
                   ' </div>');
        }
        else if ($(this).val() === "0") {
            $('#acTypeDesc').css("display", "block");
            $('#acTypeDesc').empty();
            $('#acTypeDesc').append('<div class="col-12 ">' +
                        '<ul>' +
                          '  <li>Create and publish listings on Juantraveller Marketplace</li>' +
                        
                      '  </ul>' +
                   ' </div>');
        }
        else {
            $('#acTypeDesc').css("display", "none");
            $('#acTypeDesc').empty();
         
        }


    });
});

function retrieveMerchantCategory() {
    'use strict';
    $.ajax({
        url: CategoryList,   // getproducts   getpromosandevents
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            debugger;
            var x = data.Data;
            // initiate loading promos and events
            $('#businessNature').empty();
            $('#businessNature').append('<option >Select Nature of Business</option>');
            $.each(x, function (index) {
                $('#businessNature').append('<option value=' + x[index].CategoryKey + '>' + x[index].CategoryName + '</option>');
              
            });
           

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}

function merchantSignUp() {
    'use strict'
    var $this = $(this);
    $this.button('loading');
    var _txtLastName = $("#txtMerchantLastName").val();
    var _txtFirstName = $("#txtMerchantFirstName").val();
  
    var _txtEmail = $("#txtMerchantEmail").val();
    var _txtContact = $("#txtMerchantContact").val();
    var _txtDesignation = $("#txtDesignation").val();
    var _txtBusinessName = $("#txtBusinessName").val();
  
    var _txtBusinessNature = $("#businessNature option:selected").html();
    var _txtBusinessNatureCategory = $("#businessNature").val();
    var _nType = $("#businessType").val();

    debugger;




    var postData = {
        FirstName: _txtFirstName,
        LastName: _txtLastName,
        EmailAddress: _txtEmail,
        ContactNumber: _txtContact,
        Designation: _txtDesignation,
        BusinessName: _txtBusinessName,
        NatureOfBusiness: _txtBusinessNature,
        MerchantCategoryKey: _txtBusinessNatureCategory,
        MerchantSubCategoryKey: _nType
    };
   
    $.ajax({
        url: SignUp,
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
                        text: 'Your application has been sent. Kindly check your email for further instruction.',
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
            $("#modalTerms").block({
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
            $("#modalTerms").unblock();
        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}
function test() {
    return false;


    swal({
        //title: "Are you sure?",
        text: "Are you sure that the information you have enter is correct?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
    },
    function (isConfirm) {
        debugger;
        if (isConfirm) {
            var validateFields = validate();
            if (validateFields === false) {
                return false;
            }

        }
    });

    return false;
    var validateFields = validate();
    if (validateFields === false) {
        return false;
    }
    swal(
           {
               title: '',
               type: 'info',
               text: 'continue.',
               showCancelButton: false,
               confirmButtonColor: "#d9534f"
           });
}
function validate() {

    var _txtLastName = $("#txtMerchantLastName").val();
    var _txtFirstName = $("#txtMerchantFirstName").val();
    var _txtMiddleName = $("#txtMerchantMiddleName").val();
    var _txtEmail = $("#txtMerchantEmail").val();
    var _txtContact = $("#txtMerchantContact").val();
    var _txtDesignation = $("#txtDesignation").val();
    //var _txtBusinessName = $("#txtBusinessName").val();
    //var _txtOfficeAddress = $("#txtOfficeAddress").val();
    //var _txtBillingAddress = $("#txtBillingAddress").val();
    var _txtBusinessNature = $("#businessNature option:selected").html();
    var _txtBusinessNatureCategory = $("#businessNature").val();
    var _nType = $("#businessType").val();


    if (_txtBusinessNatureCategory == 1) {
        if (_nType < 0) {
            swal(
               {
                   title: '',
                   type: 'info',
                   text: 'Please select Account Type.',
                   showCancelButton: false,
                   confirmButtonColor: "#d9534f"
               });

            return false;
        }
    }


 

    //var _terms = $('#chkTerms').is(':checked');

    if (_txtLastName === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input Lastname.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }

    if (_txtFirstName === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input Firstname.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }
    if (_txtMiddleName === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input Middlename.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }
    if (_txtEmail === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input Emailaddress.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }
    if (_txtContact === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input contact no.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }

    
    if (_txtDesignation === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input your designation on the business.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }

    //if (_txtBusinessName === "") {
    //    swal(
    //             {
    //                 title: '',
    //                 type: 'info',
    //                 text: 'Please input your business name.',
    //                 showCancelButton: false,
    //                 confirmButtonColor: "#d9534f"
    //             });

    //    return false;
    //}
    //if (_txtOfficeAddress === "") {
    //    swal(
    //             {
    //                 title: '',
    //                 type: 'info',
    //                 text: 'Please input your office/business address.',
    //                 showCancelButton: false,
    //                 confirmButtonColor: "#d9534f"
    //             });

    //    return false;
    //}
    //if (_txtBillingAddress === "") {
    //    swal(
    //             {
    //                 title: '',
    //                 type: 'info',
    //                 text: 'Please input your billing address.',
    //                 showCancelButton: false,
    //                 confirmButtonColor: "#d9534f"
    //             });

    //    return false;
    //}
    if (_txtBusinessNature === "") {
        swal(
                 {
                     title: '',
                     type: 'info',
                     text: 'Please input the nature of your business.',
                     showCancelButton: false,
                     confirmButtonColor: "#d9534f"
                 });

        return false;
    }

    //if (!_terms) {
    //    swal(
    //          {
    //              title: '',
    //              type: 'info',
    //              text: "Kindly read and accept Juantraveller's privacy policy.",
    //              showCancelButton: false,
    //              confirmButtonColor: "#d9534f"
    //          });
    //    return false;
    //}
    return true;
}