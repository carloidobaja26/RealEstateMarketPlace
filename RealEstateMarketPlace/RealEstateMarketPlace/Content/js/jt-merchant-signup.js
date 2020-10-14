var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var Permit = [];
var validID = [];
var token = decodeURI(getQueryVariable("token"));
var msg = "<i class='fas fa-file-image dz-icon'></i>" +
            "<br><span class='dz-head'>Click to add valid documents</span>" +
            "<br><span class='dz-body'>Drag and drop or select image to upload</span>";


Dropzone.options.myDropzone = {
    acceptedFiles: "image/*",
    resizeWidth: 500,
    maxFiles: 1,
    dictDefaultMessage: msg,
    addRemoveLinks: true,
    init: function () {
        this.on("success", function (file, responseText) {
            debugger;
            validID.push({ Name: responseText.Data, Key: responseText.Data });
            //if (responseText.Result === 0) {
            //    Permit.push({ Name: responseText.Data, Key: responseText.Data });
            //} else {
            //    validID.push({ Name: responseText.Data });
            //}
            var fileuploded = file.previewElement.querySelector("[data-dz-name]");
            fileuploded.innerHTML = responseText.Data;
            //var contents = res.upload_data;
            //var orig_name = contents.orig_name;
            //console.log(res);
        });
    },
    removedfile: function (file) {

        x = confirm('Do you want to delete?');
        if (!x) return false;
        for (var i = 0; i < validID.length; ++i) {
            var delImg = file.previewElement.querySelector('[data-dz-name]').innerHTML;
            if (validID[i].Name == delImg) {
                validID.splice(i, 1);
                //$.post('delete_file.php', 
                //     {file_name:file_up_names[i]},
                //   function(data,status){
                //       alert('file deleted');
                //   });
                //}
                var _ref;
                return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
            }
        }
    }
};


function retrieveBankList() {
    'use strict';
    $.ajax({
        url: RetrieveBank,   // 
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            debugger;
            var x = data.Data;
            // initiate loading promos and events
            $('#selBank').empty();
            $('#selBank').append('<option value="0">Select Bank</option>');
            $.each(x, function (index) {
                $('#selBank').append('<option value=' + x[index].Key + '>' + x[index].BankName + '</option>');

            });


        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}


function verifyMerchant() {
    var token = decodeURI(getQueryVariable("token"));
    var postData = {
        Token: token
    };

    $.ajax({
        url: VerifyToken,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result !== 0) {
                swal(
                     {
                         title: '',
                         type: 'error',
                         text: 'Merchant registration token not exists/expired.',
                         showCancelButton: false,
                         confirmButtonColor: "#d9534f"
                     }, function () {
                         window.location = Home;
                     });

            }

            $('#txtHotelName').val(data.Data);
          

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}


$(document).ready(function () {
    retrieveBankList();
    verifyMerchant();
    //$('[data-toggle="popover"]').popover();
    $('[data-toggle="popover"]').popover({
        html: true,
        animation:false,
        content: function () {
            return $('#popover-content').html();
        }
    });




});
$('body').on('click', function (e) {
    if (typeof $(e.target).data('original-title') == 'undefined') {
        $('[data-original-title]').popover('hide');
    }
});
function toggleCheckbox() {
    debugger;
    var checkbox = document.getElementById('chk_sameas');
    var x = checkbox.checked;
    if (x) {
    
        $("#txtOperationLastName").val('');
        $("#txtOperationFirstName").val('');
        $("#txtOperationMiddleName").val('');
        $("#txtOperationDesignation").val('');
        $("#txtOperationPhone").val('');
        $("#txtOperationMobile").val('');
        $("#txtOperationEmail").val('');
    }
    else
    {
       
        var _txtRepresentativeLastName = $("#txtRepresentativeLastName").val();
        var _txtRepresentativeFirstName = $("#txtRepresentativeFirstName").val();
        var _txtRepresentativeMiddleName = $("#txtRepresentativeMiddleName").val();
        var _txtRepresentativeDesignation = $("#txtRepresentativeDesignation").val();
        var _txtRepresentativePhone = $("#txtRepresentativePhone").val();
        var _txtRepresentativeMobile = $("#txtRepresentativeMobile").val();
        var _txtRepresentativeEmail = $("#txtRepresentativeEmail").val();

        $("#txtOperationLastName").val(_txtRepresentativeLastName);
        $("#txtOperationFirstName").val(_txtRepresentativeFirstName);
        $("#txtOperationMiddleName").val(_txtRepresentativeMiddleName);
        $("#txtOperationDesignation").val(_txtRepresentativeDesignation);
        $("#txtOperationPhone").val(_txtRepresentativePhone);
        $("#txtOperationMobile").val(_txtRepresentativeMobile);
        $("#txtOperationEmail").val(_txtRepresentativeEmail);


    }
}

function showTab(n) {

    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else if (n == 3) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 2)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    debugger;
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length -1) {
        // ... the form gets submitted:
   

        var _txtRepresentativeLastName = $("#txtRepresentativeLastName").val();
        var _txtRepresentativeFirstName = $("#txtRepresentativeFirstName").val();
        var _txtRepresentativeMiddleName = $("#txtRepresentativeMiddleName").val();
        var _txtRepresentativeDesignation = $("#txtRepresentativeDesignation").val();
        var _txtRepresentativePhone = $("#txtRepresentativePhone").val();
        var _txtRepresentativeMobile = $("#txtRepresentativeMobile").val();
        var _txtRepresentativeEmail = $("#txtRepresentativeEmail").val();

        //var _txtOperationLastName = $("#txtOperationLastName").val();
        //var _txtOperationFirstName = $("#txtOperationFirstName").val();
        //var _txtOperationMiddleName = $("#txtOperationMiddleName").val();
        //var _txtOperationDesignation = $("#txtOperationDesignation").val();
        //var _txtOperationPhone = $("#txtOperationPhone").val();
        //var _txtOperationMobile = $("#txtOperationMobile").val();
        //var _txtOperationEmail = $("#txtOperationEmail").val();

        var _selBank = $("#selBank").val();
        var _txtBankBranch = $("#txtBankBranch").val();
        var _txtAccountName = $("#txtAccountName").val();
        var _txtAccountNumber = $("#txtAccountNumber").val();


        var _terms = $('#chkbankAccount').is(':checked');
        if (_terms) {
            _selBank = '1';
            _txtBankBranch = 'To Follow';
            _txtAccountName = 'To Follow';
            _txtAccountNumber = 'To Follow';
        }

        var _hotelName = $("#txtHotelName").val();
        var _hotelAddress = $("#txthotelAddress").val();
        var _city = $('#city').val();
        var _municipality = $('#municipality').val();





        var _MerchantBankAccount = {
            AccountName:_txtAccountName,
            AccountNumber : _txtAccountNumber,
            Branch : _txtBankBranch,
            BankKey : _selBank
        }


        var postData = {
            RepresentativeFirstName: _txtRepresentativeFirstName,
            RepresentativeMiddleName: _txtRepresentativeMiddleName,
            RepresentativeLastName: _txtRepresentativeLastName,
            RepresentativeEmailAddress: _txtRepresentativeEmail,
            RepresentativeMobileNumber: _txtRepresentativeMobile,
            RepresentativeLandlineNumber: _txtRepresentativePhone,
            RepresentativeDesignation: _txtRepresentativeDesignation,

            //TechnicalFirstName: _txtOperationFirstName,
            //TechnicalMiddleName: _txtOperationMiddleName,
            //TechnicalLastName: _txtOperationLastName,
            //TechnicalEmailAddress: _txtOperationEmail,
            //TechnicalMobileNumber: _txtOperationMobile,
            //TechnicalLandlineNumber: _txtOperationPhone,
            //TechnicalDesignation: _txtOperationDesignation,
            MerchantRequirements: validID,
            Token: token,
            MerchantBankAccount: _MerchantBankAccount,

            BusinessName: _hotelName,
            BusinessAddress: _hotelAddress,
            Municipality: _municipality,
            City: _city,


        };
        $.ajax({
            url: SignUpStep2,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(postData),
            contentType: 'application/json; charset=utf-8',
            cache: false,
            async: true,
            success: function (data) {
                debugger;
                if (data.Result === 0) {
                    showTab(currentTab);
                    return true;
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
                    currentTab = currentTab - n;
                    x[currentTab].style.display = "inline";
                    return false;
                }

            },
            error: function (xhr, status, error) {
                console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
                return false;
            }
        });

       
        //$("#btnNextPrevious").attr()
      
    } else
    {
        
            showTab(currentTab);
     
    }
    // Otherwise, display the correct tab:

}

function validateInputs() {
    debugger;
    var res = false;
    var _txtRepresentativeLastName = $("#txtRepresentativeLastName").val();
    var _txtRepresentativeFirstName = $("#txtRepresentativeFirstName").val();
    var _txtRepresentativeMiddleName = $("#txtRepresentativeMiddleName").val();
    var _txtRepresentativeDesignation = $("#txtRepresentativeDesignation").val();
    var _txtRepresentativePhone = $("#txtRepresentativePhone").val();
    var _txtRepresentativeMobile = $("#txtRepresentativeMobile").val();
    var _txtRepresentativeEmail = $("#txtRepresentativeEmail").val();

    var _hotelName = $("#txtHotelName").val();
    var _hotelAddress = $("#txthotelAddress").val();
    var _city = $('#city').val();
    var _municipality = $('#municipality').val();

    if (_hotelName === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Property name is required.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        valid = false;
    }
    else if (_hotelAddress === "") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Property address is required.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        valid = false;
    }
    else if (_municipality === "Select Municipality") {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please select Municipality.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        valid = false;
    }
    else if (_city === "" || _city == null) {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Please select City.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        valid = false;
    }
    //var _txtOperationLastName = $("#txtOperationLastName").val();
    //var _txtOperationFirstName = $("#txtOperationFirstName").val();
    //var _txtOperationMiddleName = $("#txtOperationMiddleName").val();
    //var _txtOperationDesignation = $("#txtOperationDesignation").val();
    //var _txtOperationPhone = $("#txtOperationPhone").val();
    //var _txtOperationMobile = $("#txtOperationMobile").val();
    //var _txtOperationEmail = $("#txtOperationEmail").val();






    else if (_txtRepresentativeLastName === "") {
        swal(
              {
                  title: '',
                  type: 'info',
                  text: 'Representative Lastname is required.',
                  showCancelButton: false,
                  confirmButtonColor: "#d9534f"
              });
        res = false;
    } else if (_txtRepresentativeFirstName === "") {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Representative Firstname is required.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (_txtRepresentativeMiddleName === "") {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Representative Middlename is required.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (_txtRepresentativeDesignation === "") {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Representative Designation is required.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (_txtRepresentativeMobile === "") {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Representative mobile number is required.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (_txtRepresentativeEmail === "") {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Representative emailaddress is required.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (!validateEmail(_txtRepresentativeEmail)) {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Email address must be valid.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (!validateCharacter(_txtRepresentativeFirstName) || !validateCharacter(_txtRepresentativeLastName)) {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Name must contain characters only.',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    } else if (!validateNumber(_txtRepresentativeMobile) || _txtRepresentativeMobile.length < 11) {
        swal(
             {
                 title: '',
                 type: 'info',
                 text: 'Mobile number must contain numbers only not less than 11 digits (eg.0921-000-0000).',
                 showCancelButton: false,
                 confirmButtonColor: "#d9534f"
             });
        res = false;
    }

    //else if (_txtOperationLastName === "") {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Lastname is required.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });
       
    //    res = false;
    //} else if (_txtOperationFirstName === "") {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Firstname is required.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });

    //    res = false;
    //} else if (_txtOperationMiddleName === "") {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Middlename is required.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });

    //    res = false;
    //} else if (_txtOperationDesignation === "") {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Designation is required.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });

    //    res = false;
    //} else if (_txtOperationMobile === "") {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Mobile number is required.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });

    //    res = false;
    //} else if (_txtOperationEmail === "") {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Email address is required.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });

    //    res = false;
    //} else if (!validateEmail(_txtOperationEmail)) {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Operation Rep. Email address must be valid.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });
    //    res = false;
    //} else if (!validateCharacter(_txtOperationFirstName) || !validateCharacter(_txtOperationLastName)) {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Name must contain characters only.',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });
    //    res = false;
    //} else if (!validateNumber(_txtOperationMobile) || _txtOperationMobile.length < 11) {
    //    swal(
    //         {
    //             title: '',
    //             type: 'info',
    //             text: 'Mobile number must contain numbers only not less than 11 digits (eg.0921-000-0000).',
    //             showCancelButton: false,
    //             confirmButtonColor: "#d9534f"
    //         });
    //    res = false;
    //}

    else {
        res = true;
    }
    return res;
}

function validateForm() {
    // This function deals with validation of the form fields
    debugger;
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    if (currentTab === 0) {
        var isValidated = validateInputs();
        valid = isValidated;
    }
    else if (currentTab == 1) {   //!= 2

        var _terms = $('#chkbankAccount').is(':checked');

        if (!_terms) {
            y = x[currentTab].getElementsByTagName("input");
            // A loop that checks every input field in the current tab:
            for (i = 0; i < y.length; i++) {
                // If a field is empty...
                if (y[i].value == "") {
                    // add an "invalid" class to the field:
                    y[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;
                }
            }

            var _bank = $("#selBank").val();
            var _accountBranch = $("#txtBankBranch").val();
            var _accountName = $("#txtAccountName").val();
            var _accountNumber = $("#txtAccountNumber").val();
            if (_bank <= 0) {
                swal(
                    {
                        title: '',
                        type: 'info',
                        text: 'Bank is required.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
                valid = false;
            }
            
           else if (_accountBranch == '') {
                swal(
                    {
                        title: '',
                        type: 'info',
                        text: 'Branch is required.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
                valid = false;
            }

        
            else if (_accountName == '') {
                swal(
                    {
                        title: '',
                        type: 'info',
                        text: 'Account name is required.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
                valid = false;
            }

       
            else if (_accountNumber.length < 10) {
                swal(
                    {
                        title: '',
                        type: 'info',
                        text: 'Account number must be atleast 10 digits.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
                valid = false;
            }
        }
    

    } else
    {

        //var _hotelName = $("#txtHotelName").val();
        //var _hotelAddress = $("#txthotelAddress").val();
        //if (_hotelName === "") {
        //    swal(
        //        {
        //            title: '',
        //            type: 'info',
        //            text: 'Hotel name is required.',
        //            showCancelButton: false,
        //            confirmButtonColor: "#d9534f"
        //        });
        //    valid = false;
        //}
        //if (_hotelAddress === "") {
        //    swal(
        //        {
        //            title: '',
        //            type: 'info',
        //            text: 'Hotel address is required.',
        //            showCancelButton: false,
        //            confirmButtonColor: "#d9534f"
        //        });
        //    valid = false;
        //}

        var uploadedFiles = validID.length;
        if (uploadedFiles < 2) {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Please upload your Valid ID and Business Permit',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            valid = false;
        }
    }
   
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      
        var tabID = document.getElementsByClassName("step")[currentTab].id;
     
       document.getElementsByClassName("step")[currentTab].className += " finish";
       document.getElementsByClassName("steps")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    var y =  document.getElementsByClassName("steps");
    for (i = 0; i < x.length; i++) {
       
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
    for (i = 0; i < y.length; i++) {

        y[i].className =  y[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
  
    y[n].className += " active";
}


function completeRegistration(currentT, tabs) {

    'use strict'
    
  
    var _txtRepresentativeLastName = $("#txtRepresentativeLastName").val();
    var _txtRepresentativeFirstName = $("#txtRepresentativeFirstName").val();
    var _txtRepresentativeMiddleName = $("#txtRepresentativeMiddleName").val();
    var _txtRepresentativeDesignation = $("#txtRepresentativeDesignation").val();
    var _txtRepresentativePhone = $("#txtRepresentativePhone").val();
    var _txtRepresentativeMobile = $("#txtRepresentativeMobile").val();
    var _txtRepresentativeEmail = $("#txtRepresentativeEmail").val();

    //var _txtOperationLastName = $("#txtOperationLastName").val();
    //var _txtOperationFirstName = $("#txtOperationFirstName").val();
    //var _txtOperationMiddleName = $("#txtOperationMiddleName").val();
    //var _txtOperationDesignation = $("#txtOperationDesignation").val();
    //var _txtOperationPhone = $("#txtOperationPhone").val();
    //var _txtOperationMobile = $("#txtOperationMobile").val();
    //var _txtOperationEmail = $("#txtOperationEmail").val();

    var _selBank = $("#selBank").val();
    var _txtBankBranch = $("#txtBankBranch").val();
    var _txtAccountName = $("#txtAccountName").val();
    var _txtAccountNumber = $("#txtAccountNumber").val();

    
    var _terms = $('#chkbankAccount').is(':checked');
    if(_terms){
        _selBank = '1';
        _txtBankBranch = 'To Follow';
        _txtAccountName = 'To Follow';
        _txtAccountNumber = 'To Follow';
    }


    var _hotelName = $("#txtHotelName").val();
    var _hotelAddress = $("#txthotelAddress").val();
    var _city = $('#city').val();
    var _municipality = $('#municipality').val();





    var postData = {


        BusinessName : _hotelName,
        BusinessAddress : _hotelAddress,
        BusinessMunicipality: _municipality,
        BusinessCity: _city,

        RepresentativeFirstName: _txtRepresentativeFirstName,
        RepresentativeMiddleName: _txtRepresentativeMiddleName,
        RepresentativeLastName: _txtRepresentativeLastName,
        RepresentativeEmailAddress: _txtRepresentativeEmail,
        RepresentativeMobileNumber: _txtRepresentativeMobile,
        RepresentativeLandlineNumber: _txtRepresentativePhone,
        RepresentativeDesignation: _txtRepresentativeDesignation,

        BankKey : _selBank,
        Branch: _txtBankBranch,
        AccountName: _txtAccountName,
        AccountNumber : _txtAccountNumber,

        //TechnicalFirstName: _txtOperationFirstName,
        //TechnicalMiddleName: _txtOperationMiddleName,
        //TechnicalLastName: _txtOperationLastName,
        //TechnicalEmailAddress: _txtOperationEmail,
        //TechnicalMobileNumber: _txtOperationMobile,
        //TechnicalLandlineNumber: _txtOperationPhone,
        //TechnicalDesignation: _txtOperationDesignation,
        MerchantRequirements: validID,  //list
        Token: token

    };
    $.ajax({
        url: SignUpStep2,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        async: true,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                showTab(currentTab);
                return true;
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
                currentTab = currentTab - 1;
                tabs[currentTab].style.display = "inline";
                return false;
            }

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            return false;
        }
    });

   
    //if (ids === 1) {
    //    return false;
    //}
    //else {
    //    return true;
    //}
   
}


