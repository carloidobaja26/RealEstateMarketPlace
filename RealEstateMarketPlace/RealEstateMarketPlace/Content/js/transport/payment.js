
var _tripId = decodeURI(getQueryVariable("tripId"));
var _date = decodeURI(getQueryVariable("date"));
var _time = decodeURI(getQueryVariable("time"));
var _passengerCount = decodeURI(getQueryVariable("passengerCount"));
var _transactionId = decodeURI(getQueryVariable("transactionId"));


$(document).ready(function () {
    checkStorage();

   

    checkUrl();
    $('#btnTransaction').click(function () {
        transportTransaction();
    });
    $('#btnCancelTransaction').click(function () {
        window.history.back();
    });
    $('#search-link').click(function () {
        debugger;
        window.location.href = localStorage.getItem("search_link");
    });
    $('#seat-link').click(function () {
        debugger;
        window.location.href = window.baseUrl + 'transport/SeatPlan?tripId=' + _tripId + '&date=' + _date + '&time=' + _time + '&passengerCount=' + _passengerCount + '&transactionId=' + _transactionId;
    });
    $('#customer-link').click(function () {
        debugger;
        window.location.href = window.baseUrl + 'transport/CustomerDetails?tripId=' + _tripId + '&date=' + _date + '&time=' + _time + '&passengerCount=' + _passengerCount + '&transactionId=' + _transactionId;
    });

    $('#cOrigin').ready(function () {
        debugger;
        var sessionorig = $('#cOrigin').text();
        if (sessionorig == "") {
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

    $('#cDestination').ready(function () {
        debugger;
        var sessionorig = $('#cDestination').text();
        if (sessionorig == "") {
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

function checkStorage() {
    var passengerDetails = JSON.parse(localStorage.getItem("passengerDetails"));
    var merchant_id = localStorage.getItem("merchant_id");
    var customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
    var seats = JSON.parse(localStorage.getItem("selectedSeats"));
    var search_link = localStorage.getItem("search_link");
    var seat_details = JSON.parse(localStorage.getItem("seatDetails"));
    var price = localStorage.getItem("price");
   // debugger;
    
    //var sessiondest = Session["DestinationName"];
    


    
    if (passengerDetails == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (merchant_id == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (customerDetails == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (seats == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (search_link == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (seat_details == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }
    if (price == null) {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined transaction.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    //if (sessionorig == null) {
    //    swal(
    //        {

    //            title: '',
    //            type: 'error',
    //            text: 'Undefined transaction.',
    //            showCancelButton: false,
    //            confirmButtonColor: "#d9534f"
    //        }, function () {
    //            window.location = Home;
    //        });
    //}

    //if (sessiondest == null) {
    //    swal(
    //        {

    //            title: '',
    //            type: 'error',
    //            text: 'Undefined transaction.',
    //            showCancelButton: false,
    //            confirmButtonColor: "#d9534f"
    //        }, function () {
    //            window.location = Home;
    //        });
    //}

}


var totalTripPrice = 0;
var passenger = [];


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
            debugger;
            //var passengerDiv = '';
            
            if (data.Result === 0) {
                debugger;
                var tripPrice = localStorage.getItem("price");
                var totalPrice = tripPrice * _passengerCount;
                totalTripPrice = totalPrice;
                var serviceCharge = 0;//totalPrice * 0.1;
                var grandTotal = totalPrice + serviceCharge;
                var customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
                var seats = JSON.parse(localStorage.getItem("selectedSeats"));
                var seat_details = JSON.parse(localStorage.getItem("seatDetails"));
                $('#cName').text(customerDetails.FirstName + ' ' + customerDetails.LastName);
                $('#cEmail').text(customerDetails.Email);
                $('#cNumber').text(customerDetails.MobileNumber);
                $('#totalFare').text('Php ' + formatPrice(totalPrice));
                $('#serviceCharge').text('Php ' + formatPrice(serviceCharge));
                $('#grandTotal').text('Php ' + formatPrice(grandTotal));
                $('#tripDate').text('Trip Date: ' + moment(_date).format('LL'));
                $('#tripTime').text('Trip Time: ' +_time);
                var tripPassenger = '<thead class="thead-light">'
                    + '<tr>'
                    + '<th scope="col">Passenger</th>'
                    + '<th scope="col">Gender</th>'
                    + '<th scope="col">Age</th>'
                    + '<th scope="col">Price</th>'
                    + '<th scope="col">Seat</th>'
                    + '</tr>';
                for (i = 0; i < customerDetails.PassengerDetails.length; i++) {
                    var sGender = '';
                    var gender = customerDetails.PassengerDetails[i].Gender;
                    if (gender == 1) {
                        sGender = 'Male';
                    }
                    if (gender == 2) {
                        sGender = 'Female';
                    }
                    var a = moment();
                    var b = moment(customerDetails.PassengerDetails[i].Birthdate, 'MM-YYYY');
                    var age = moment().diff(customerDetails.PassengerDetails[i].Birthdate, 'years');
                    tripPassenger += '<tr>'
                        + '<td>' + customerDetails.PassengerDetails[i].FirstName + ' ' + customerDetails.PassengerDetails[i].LastName +'</td>'
                        + '<td>' + sGender+ '</td>'
                        + '<td>' + age +'</td>'
                        + '<td>Php ' + tripPrice +' </td>'
                        + '<td>'+ seats[i] +'</td>'
                        + '</tr>'
                    passenger.push({ "LastName": customerDetails.PassengerDetails[i].LastName, "FirstName": customerDetails.PassengerDetails[i].FirstName, "Gender": customerDetails.PassengerDetails[i].Gender, "Birthdate": customerDetails.PassengerDetails[i].Birthdate, "SeatNumber": seats[i], "SeatCol": seat_details[i].seat_col, "SeatRow": seat_details[i].seat_row});
                }
                tripPassenger += '</thead>';
                $('#passengerTable').append(tripPassenger);
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
            $("#paymentDiv").block({
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
            $("#paymentDiv").unblock();
            
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}


function transportTransaction() {
    debugger;
    var merchantId = (localStorage.getItem("merchant_id"));
    var customers = JSON.parse(localStorage.getItem("customerDetails"));
    //var passengers = JSON.parse(localStorage.getItem("passengerDetails"));
    var _terms = $('#chkAgree').is(':checked');
    if (!_terms) {
        swal(
            {
                title: '',
                type: 'info',
                text: 'Kindly read and accept Terms and Conditions and Privacy Policy.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    var CustomerDetails = {
        LastName: customers.LastName,
        FirstName: customers.FirstName,
        Email: customers.Email,
        Address: customers.Address,
        MobileNumber: customers.MobileNumber,
        NumberOfPassenger: customers.NumberOfPassenger
    }
    //var PassengerDetails = { passenger }
    var TripId = _tripId
    //var TotalAmount = customers.GrandTotal
    var postData = {
        TripId: TripId,
        CustomerDetails: CustomerDetails,
        PassengerDetails: passenger,
        TotalAmount: totalTripPrice,
        MerchantId: merchantId
    };
    $.ajax({
        url: InitializeTransaction,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            if (data.Result === 0) {
                window.location.href = window.baseUrl + 'PaymentGatewayDummy/TransportPaymentDummy?reference=' + data.Data.reference_number + '&amount=' + data.Data.total_amount;
            }
            else if (data.Result === 5) {
                alert(data.Message);
                window.location = Login;
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
        beforeSend: function () {
            $("#btnTransaction").block({
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
            $("#btnTransaction").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}