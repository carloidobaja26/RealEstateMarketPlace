jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form#checkoutForm').submit(function () {
      debugger;
      unhideErrors();
      var ferror = false, emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
      var contactexp = /^[+0-9]*$/i;
      var business = $('#bizname').val();
      var fname = $('#fname').val();
      var lname = $('#lname').val();
      var email = $('#email').val();
      var mobile = $('#mobile').val();
      var address = $('#address').val();
   
      if (business.length < 4) {
          // alert('Please input a valid email address.');
          $('#errorBiz').html('Business name must be atleast 4 characters.');
          $('#errorBiz').css("display", "block");
          ferror = true;
      }

      if (fname.length < 2) {
          // alert('Please input a valid email address.');
          $('#errorName').html('Firstname must be atleast 4 characters.');
          $('#errorName').css("display", "block");
          ferror = true;
      }

      if (lname.length < 2) {
          // alert('Please input a valid email address.');
          $('#errorLName').html('Lastname must be atleast 4 characters.');
          $('#errorLName').css("display", "block");
          ferror = true;
      }
      if (!emailExp.test(email)) {
          // alert('Please input a valid email address.');
          $('#erroremail').html('Please input a valid email address.');
          $('#erroremail').css("display", "block");
          ferror = true;
      }
      if (!contactexp.test(mobile)) {
          // alert('Please input a valid email address.');
          $('#errormobile').html('Please input a valid contact no.');
          $('#errormobile').css("display", "block");
          ferror = true;
      }
      if (mobile.length < 10) {
          // alert('Please input a valid email address.');
          $('#errormobile').html('Please input a valid contact no .');
          $('#errormobile').css("display", "block");
          ferror = true;
      }
      if (mobile == "") {
          // alert('Please input a valid email address.');
          $('#errormobile').html('Contact number is required.');
          $('#errormobile').css("display", "block");
          ferror = true;
      }
      if (address == "") {
          // alert('Please input a valid email address.');
          $('#erroradd').html('Location is required.');
          $('#erroradd').css("display", "block");
          ferror = true;
      }

      if (ferror) {
          return false;
      }

  
     
   
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    }

    //alert(action);
    //return false;

    var postData = {
        BusinessName: business,
        FirstName: fname,
        LastName: lname,
        EmailAddress: email,
        ContactNumber: mobile,
        BusinessAddress: address

    };


    $.ajax({
      type: "POST",
      url: action,
      dataType: "json",
      data: JSON.stringify(postData),
      contentType: 'application/json; charset=utf-8',
      cache: false,
      success: function(data) {
          // alert(msg);
          debugger;
          if (data.Result == 0) {
              $("#sendmessage").addClass("show");
              $("#errormessage").removeClass("show");
              $('.checkoutForm').find("input, textarea").val("");
              swal(
                   {
                       title: '',
                       type: 'success',
                       text: 'Thank you for your interest. We will get back to you as soon as possible!',
                       showCancelButton: false,
                       confirmButtonColor: "#d9534f"
                   }, function () {
                       window.location = Home;
                   });
          }
          else {
              $("#sendmessage").removeClass("show");
              $("#errormessage").addClass("show");
              swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Error encounter upon try to send an inquiry, kindly try again later.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });


              return false;
              
          }
       

      },
      beforeSend: function () {
          $("#frmBeMerchant").block({
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
          $("#frmBeMerchant").unblock();
      },
    });
    return false;
  });

});


function unhideErrors() {
    $('#errorBiz').css("display", "none");
   
    $('#errorName').css("display", "none");
    $('#erroremail').css("display", "none");
    $('#errormobile').css("display", "none");
    $('#erroradd').css("display", "none");
}