var _tripId = decodeURI(getQueryVariable("tripId"));
var _date = decodeURI(getQueryVariable("date"));
var _time = decodeURI(getQueryVariable("time"));
var _passengerCount = decodeURI(getQueryVariable("passengerCount"));
var _transactionId = decodeURI(getQueryVariable("transactionId"));

passengersList = [];
$(document).ready(function () {

   
    checkUrl();
    $('#search-link').click(function () {
        debugger;
        window.location.href = localStorage.getItem("search_link");
    });

    $(".btnpassengerDate").click(function () {
        debugger;
        $('#txtpassengerDate').focus();
        
    });
	
    $('.txtpassengerDate').daterangepicker({
        
        "singleDatePicker": true
    });
	
    $('#btnCancelTrip').click(function () {
        window.history.back();
    });
    $('#btnNextSeatPlan').click(function () {
        var CNumber = $('#cnumber').val();
        var CFirstName = $('#cfname').val();
        var cLastName = $('#clname').val();
        var CEmail = $('#cemail').val();
        var CAddress = $('#caddress').val();
        var passenger1Fname = $("#pfname1").val();
        var passenger1Lname = $("#plname1").val();
        var passenger1Gender = $("#pgender1").val();
        var passenger1BirthDate = $("#pbirtdate1").val();
        if (CNumber == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Customer Number",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (CFirstName == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Customer First Name",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (cLastName == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Customer Last Name",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (CEmail == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Email",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (CAddress == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Address",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (passenger1Fname == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Passenger 1 First Name",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (passenger1Lname == "") {
            swal(
                {
                    title: '',
                    type: 'error',
                    text: "Please Input Passenger 1 Last Name",
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        passengersList.push({ "LastName": passenger1Lname, "FirstName": passenger1Fname, "Gender": passenger1Gender, "Birthdate": passenger1BirthDate, "SeatNumber": "XX" });

        if (_passengerCount > 1) {
            for (i = 1; i < _passengerCount; i++) {
                d = i + 1;
                var passengerFname = $('#pfname'+d+'').val();
                var passengerLname = $('#plname'+d+'').val();
                var passengerGender = $('#pgender'+d+'').val();
                var passengerBirthDate = $('#pbirtdate' + d + '').val();
                if (passengerFname == "") {
                    swal(
                        {
                            title: '',
                            type: 'error',
                            text: 'Please Input Passenger '+d+' First Name',
                            showCancelButton: false,
                            confirmButtonColor: "#d9534f"
                        });
                    return false;
                }
                if (passengerLname == "") {
                    swal(
                        {
                            title: '',
                            type: 'error',
                            text: 'Please Input Passenger '+d+' Last Name',
                            showCancelButton: false,
                            confirmButtonColor: "#d9534f"
                        });
                    return false;
                }
                passengersList.push({ "FirstName": passengerFname, "LastName": passengerLname, "Gender": passengerGender, "Birthdate": passengerBirthDate, "SeatNumber": "XX" });
            }
        }
        var tripPrice = localStorage.getItem("price");
        var totalPrice = tripPrice * _passengerCount;
        var serviceCharge = totalPrice * 0.1;
        var grandTotal = totalPrice + serviceCharge;
        //passengersList.push({ "PassengerLastName": "Test", "PassengerFirstName": "Test", "PassengerGender": "1", "PassengerBirthdate": "2" });
        var listValues = { "MobileNumber": CNumber, "FirstName": CFirstName, "LastName": cLastName, "Email": CEmail, "Address": CAddress, "NumberOfPassenger": _passengerCount, "Trip": _tripId, "PassengerDetails": passengersList, "GrandTotal": grandTotal };
        sessionStorage.setItem("customerDetails", JSON.stringify(listValues));
        window.localStorage.setItem("passengerDetails", JSON.stringify(passengersList));
        window.localStorage.setItem('customerDetails', JSON.stringify(listValues));
        window.location.href = window.baseUrl + 'transport/SeatPlan?tripId=' + _tripId + '&date=' + _date + '&time=' + _time + '&passengerCount=' + _passengerCount + '&transactionId=' + _transactionId;

    });
    $('#p_check').click(function () {
        var cFirstName = $('#cfname').val();
        var cLastName = $('#clname').val();
        if (this.checked == true) {
            $('#pfname1').val(cFirstName);
            $('#plname1').val(cLastName);
        }
        else {
            $('#pfname1').val('');
            $('#plname1').val('');
        }
    });



    $('#orig_dest').ready(function () {
        var sessionorig = $('#orig_dest').text();
        if (sessionorig.trim() == "-") {
            swal(
                {

                    title: '',
                    type: 'error',
                    text: 'Session Expired.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                }, function () {
                    window.localStorage.clear();
                    window.location = Home;
                });
        }
    });

});

function checkUrl() {
    var postData = {
        tripId: _tripId,
        date: _date,
        time: _time,
        passengerCount: _passengerCount,
        transactionId: _transactionId
    }
    $.ajax({
        url: CheckTransactionUrl,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            //debugger;
            var passengerDiv = '';
            if (data.Result === 0) {
                $("#departDate").text(moment(_date).format('LL'));
                //$("#departTime").text(_time);
                $("#departTime").text(moment(_date + ' ,' + _time).format('hh:mm A'));
                $("#numbPassenger").text(_passengerCount);
                var tripPrice = localStorage.getItem("price");
                $("#tripPrice").text('Php ' + tripPrice);
                if (_passengerCount > 1) {
                    for (i = 1; i < _passengerCount; i++) {
                        var d = i + 1;
                        passengerDiv += '<div class="card">'
                            + '<div class="card-header">'
                            + 'Passenger ' + d + ''
                            + '</div>'
                            + '<div class="card-body card-block form-horizontal">'
                            + '<div class="row form-group">'
                            + '<div class="col col-md-12"><label for="fname">First Name</label></div>'
                            + '<div class="col-12 col-md-12">'
                            + '<input type="text" style="background-color:white;" id="pfname' + d + '" name="fname" autocomplete="off" class="form-control" placeholder="Passenger First Name">'
                            + '<small class="help-block form-text text-danger" id="h_fname"></small>'
                            + '</div>'
                            + '</div>'
                            + '<div class="row form-group">'
                            + '<div class="col col-md-12"><label for="fname">Last Name</label></div>'
                            + '<div class="col-12 col-md-12">'
                            + '<input type="text" style="background-color:white;" id="plname' + d + '" name="fname" autocomplete="off" class="form-control" placeholder="Passenger Last Name">'
                            + '<small class="help-block form-text text-danger" id="h_fname"></small>'
                            + '</div>'
                            + '</div>'
                            + '<div class="row form-group">'
                            + '<div class="col col-md-12"><label for="lname">Gender</label></div>'
                            + '<div class="col-12 col-md-12">'
                            + '<select class="form-control" id="pgender' + d + '">'
                            + '<option value="1">Male</option>'
                            + '<option value="2">Female</option>'
                            + '</select>'
                            + '</div>'
                            + '</div>'
                            + '<div class="row form-group">'
                            + '<div class="col col-md-12"><label for="lname">Birthdate</label></div>'
                            + '<div class="col-12 col-md-12">'
                            + '<div class="input-group date">'
                            + '<input type="text" class="form-control txtpassengerDate" id="pbirtdate' + d + '" name="txtpassengerDate" placeholder="Select Date">'
                            + '<div class="input-group-append">'
                            + '<button class="input-group-text form-btn-datepicker btnpassengerDate" id=""><i class="fas fa-calendar"></i></button>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                            + '</div>'
                    }
                    $('#psDiv').append(passengerDiv);
                    $(".btnpassengerDate").click(function () {
                        $('#txtpassengerDate').focus();
                    });
                    $('.txtpassengerDate').daterangepicker({
                        "singleDatePicker": true
                    });
                }
                debugger;
                recentData();
               
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
                        window.location.href = window.baseUrl + 'Home/Index';
                    });
            }
        },
        beforeSend: function () {
            $("#customerDetailsDiv").block({
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
            $("#customerDetailsDiv").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}

function recentData() {
    debugger;
    var customers = JSON.parse(localStorage.getItem("customerDetails"));
    var passengers = JSON.parse(localStorage.getItem("passengerDetails"));

    if (customers != null || passengers != null) {

        $('#cnumber').val(customers.MobileNumber);
        $('#cfname').val(customers.FirstName);
        $('#clname').val(customers.LastName);
        $('#cemail').val(customers.Email);
        $('#caddress').val(customers.Address);
        $('#pfname1').val(passengers[0].FirstName);
        $('#plname1').val(passengers[0].LastName);
        $('#pgender1').val(passengers[0].Gender);
        $('#pbirtdate1').val(passengers[0].Birthdate);
        if (passengers.length > 1) {
            for (i = 1; i < passengers.length; i++) {
                var d = i + 1;
                $('#pfname' + d + '').val(passengers[i].FirstName);
                $('#plname' + d + '').val(passengers[i].LastName);
                $('#pgender1' + d + '').val(passengers[i].Gender);
                $('#pbirtdate1' + d + '').val(passengers[i].Birthdate);
            }
        }
    }
       
    
}