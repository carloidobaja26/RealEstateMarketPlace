var nDates = function () {
    var x;
    $.ajax({
        url: window.baseUrl + 'Home/GetSystemDate?type=2',
        type: 'POST',
        cache: false,
        async: false,
        success: function (data) {
            x = data;
        }
    });
    return x;
}();
$(document).ready(function () {
    $("#btn-proceed-cancel").click(function () {
        CancelReservation();

    });
    $("#btnCancel").click(function () {
        var _terms = $('#chkTerms').is(':checked');
        if (!_terms) {
            swal(
                  {
                      title: '',
                      type: 'info',
                      text: 'Kindly read and accept the cancellation policy.',
                      showCancelButton: false,
                      confirmButtonColor: "#d9534f"
                  });
            return false;
        }
        else {
            $('#cancel-bookingModal').modal('show');
        }


    });


   

    var query = location.search.split('key=')[1];


    $("#btn-proceed-payment").click(function () {
        PayReservation(query);
    });



    $.ajax({
        url: window.baseUrl + 'TransactionHistory/GetDetailByKey?key=' + query,
        type: 'Get',
        data: 'json',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        async: true,
        success: function (data) {
            debugger;
            if (data.Result != 0) {
                window.location.href = "/TransactionHistory/";
            } else {
                var y = data.Data;
                fullData(y);
            }
          
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            return false;
        }
    });
});
function fullData(dataArray) {
    $('#cancelPolicy').empty();
    $('#bstatus').empty();
    $('#cancelPolicy').append('<p>' + dataArray.CancellationPolicy + '</p>');


    if (dataArray.DiscountPercent === 0) {
        $("#savePercent-div").css("visibility", "hidden");
      }
    if (dataArray.PaymentStatus === 1) { //====
        if (dataArray.IsAllowCancellation) {
            $("#btnCancelDiv").css("display", "block");
            $("#policiesDiv").css("display", "block");
        }
      
        if (dataArray.Status === 5) {
            $('#bstatus').append('<span class="sub-title text-red"> <i class="fa fa-times mr-2 text-red"></i> Cancelled </span>');
            $("#policiesDiv").css("display", "none");
        }
        else if (dataArray.Status === 1) {
        
            $('#bstatus').append('<span class="sub-title text-approved"><i class="fa fa-check mr-2 text-approved"></i> Confirmed </span>');
        }
    }
    else {
        $("#warning").css("display", "block");
        $("#btnPayDiv").css("display", "block");
        $("#btnCancelDiv").css("display", "block");
        $("#policiesDiv").css("display", "block");
        if (dataArray.Status === 5) {
            $('#bstatus').append('<span class="sub-title text-red"> <i class="fa fa-times mr-2 text-red"></i> Cancelled </span>');
            $("#policiesDiv").css("display", "none");
        }
        else if (dataArray.Status === 1) {
            $('#bstatus').append('<span class="sub-title text-red"> <i class="fas fa-question mr-2 text-red"></i> Pending Payment </span>');
        }

    }
    $('#rmOffer').empty();

    debugger;
    if (dataArray.Breakfast === 1) {
        $('#rmOffer').append(' <div class="col-md-6 col-6 font-12 text-green">' +
                                                '<div class="row">'+
                                                    '<div class="col-md-2 col-2"><i class="fa fa-check tab-icon"></i></div>'+
                                                    '<div class="col-md-9 col-9 p-0 overflow-text">Breakfast</div>' +
                                                '</div>'+
                                            '</div>');
    }
    else {
        $('#rmOffer').append(' <div class="col-md-6 col-6 font-12 text-red">' +
                                               '<div class="row">' +
                                                   '<div class="col-md-2 col-2"><i class="fa fa-times tab-icon"></i></div>' +
                                                   '<div class="col-md-9 col-9 p-0 overflow-text">Breakfast</div>' +
                                               '</div>' +
                                           '</div>');
    }
    if (dataArray.IsAllowCancellation) {
        $('#refundPolicyDiv').css("display", "block");
        $('#cancelTermsDiv').css("display", "block");
        $('#rmOffer').append(' <div class="col-md-6 col-6 font-12 text-green">' +
                                             '<div class="row">' +
                                                 '<div class="col-md-2 col-2"><i class="fa fa-check tab-icon"></i></div>' +
                                                 '<div class="col-md-9 col-9 p-0 overflow-text">Cancellation</div>' +
                                             '</div>' +
                                         '</div>');
      
    }
    else {
 

        $('#rmOffer').append(' <div class="col-md-6 col-6 font-12 text-red">' +
                                         '<div class="row">' +
                                             '<div class="col-md-2 col-2"><i class="fa fa-times tab-icon"></i></div>' +
                                             '<div class="col-md-9 col-9 p-0 overflow-text">Cancellation</div>' +
                                         '</div>' +
                                     '</div>');

   

    }
    $.each(dataArray.RoomTypeAmenities, function (key, value) {
        var amenitiesTemp = ' <div class="col-md-6 col-6 font-12 text-green">' +
                                                '<div class="row">'+
                                                    '<div class="col-md-2 col-2"><i class="fa fa-check tab-icon"></i></div>'+
                                                    '<div class="col-md-9 col-9 p-0 overflow-text">' + value.Name + '</div>' +
                                                '</div>'+
                                            '</div>';
        $('#rmOffer').append(amenitiesTemp);
    });
    $('#rmName').html(dataArray.RoomType);


    debugger;
    //accounting.formatMoney(dataArray.DiscountedRate, ' ', 2, ',', '.')
    var rmPriceTotal = 0;
    if (dataArray.DiscountPercent > 0) {
        $('#rmPrice').html('Php ' + accounting.formatMoney(dataArray.DiscountedRate, ' ', 2, ',', '.'));
        rmPriceTotal = dataArray.DiscountedRate * dataArray.NumberOfRoom * dataArray.TotalDays;
        $('#roomPriceSummary').html(accounting.formatMoney(rmPriceTotal, ' ', 2, ',', '.') + ' Php');
        $("#disc").attr("hidden", false);
        $('#discountPrice').text('Php ' +accounting.formatMoney(dataArray.Rate, ' ', 2, ',', '.'));
        $('#discountPercent').html('<span class="text-small">You save ' + dataArray.DiscountPercent + '%</span>');

    }
    else {
        $('#rmPrice').html('Php ' + dataArray.Rate);
        rmPriceTotal = dataArray.Rate * dataArray.NumberOfRoom * dataArray.TotalDays;
        $('#roomPriceSummary').html(accounting.formatMoney(rmPriceTotal, ' ', 2, ',', '.') + ' Php');
    }
   

    $('#roomSummary').html(dataArray.RoomType + ' ( ' + dataArray.NumberOfRoom + " x " + dataArray.TotalDays + " nights )");
    $('#otherChargers').html(accounting.formatMoney(dataArray.ConvenienceCharge, ' ', 2, ',', '.') + ' Php');
    var total = rmPriceTotal + dataArray.ConvenienceCharge;
    $('#total').html(accounting.formatMoney(total, ' ', 2, ',', '.') + ' Php');
  
    $('#htl-name').html(dataArray.Hotel.Name);
    $('#htl-address').html(dataArray.Hotel.Address);
    $('#htl-city').html(dataArray.Hotel.City + ' ' + dataArray.Hotel.Municipality);
    $('#referenceNo').html(dataArray.ReferenceNumber);
    $('#guestName').html(dataArray.Guest.FirstName + " " + dataArray.Guest.MiddleName + " " + dataArray.Guest.LastName);
    $('#bookingCheckIn').html(moment(dataArray.CheckInDate).format('dddd YYYY MMM DD') + 'From 2:00 PM');
    $('#bookingCheckOut').html(moment(dataArray.CheckOutDate).format('dddd YYYY MMM DD') + 'Until 12:00 PM');
    $('#bookingStay').html(dataArray.TotalDays);
    $('#bookingDate').html(moment(dataArray.DateTime).format('dddd : MMM DD YYYY'));






    $('#discountedRoomRate').html(dataArray.DiscountedRate);
    var droomrate = dataArray.DiscountedRate * dataArray.NumberOfRoom * dataArray.TotalDays;
    $('#discountroomRate').html(droomrate);
    //var totalAmount = dataArray.DiscountedRate+
    $('#discountRoomPercent').html(dataArray.DiscountPercent);
    $('#htlroomname').html(dataArray.Hotel.Name); 
    $('#noRoom').html(dataArray.NumberOfRoom +" Room");
    $('#noDay').html(dataArray.TotalDays +" Night");
    $('#discountRate').html(dataArray.Hotel.TotalRate);
    
    $('#htlCnumber').html(dataArray.Hotel.ContactNumber);
    
    var book  = new Date(dataArray.DateTime);
    var settleDate = new Date(dataArray.DateTime);
    settleDate.setDate(settleDate.getDate() + 3);
    var ndate = new Date(nDates);
    var diff = dateDiff(settleDate, ndate);


    debugger;


    var ci = new Date(dataArray.CheckInDate);
    var date1 = ci.toDateString();
    var x = date1.split(" ");
    var _days = x[0];
    var _months = x[1];
    var _dates = x[2];
    var _years = x[3];

    var co = new Date(dataArray.CheckOutDate);
    var date2 = co.toDateString();
    var y = date2.split(" ");
    var c_days = y[0];
    var c_months = y[1];
    var c_dates = y[2];
    var c_years = y[3];

    //var currentDate = new Date();
    //var dateCheckin = ci;
    //var diff = dateDiff(currentDate, dateCheckin);
    //var output = diff.year + " year " + diff.month + " month " + diff.day + " day" + currentDate;


  

    var daytosettle = diff.day;
    $('#daytoSettle').html(daytosettle);
  
    if (dataArray.NumberOfAdult !== 0 && dataArray.NumberOfChild !== 0) {
        $('#noOfGuest').html(dataArray.NumberOfAdult + " Adult" + ", " + dataArray.NumberOfChild + " Child");
    }
    else if (dataArray.NumberOfAdult === 0 && dataArray.NumberOfChild !== 0) {
        $('#noOfGuest').html(dataArray.NumberOfChild + " Child");
    } else {
        $('#noOfGuest').html(dataArray.NumberOfAdult + " Adult");
    }

    if (dataArray.Status !== 5) {
        $("#btnCancelDiv").css("display", "block");
        
    }
   
}
function FullDay(c_days) {
    if (c_days === "Mon") {
        c_days = "Monday";
    }
    else if (c_days === "Tue") {
        c_days = "Tuesday";
    }
    else if (c_days === "Wed") {
        c_days = "Wednesday";
    } else if (c_days === "Thu") {
        c_days = "Thursday";
    } else if (c_days === "Fri") {
        c_days = "Friday";
    }
    return c_days;
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function dateDiff(date1, date2) {
    if (date1 > date2) return dateDiff(date2, date1);
    var diff = {};
    diff.day = date2.getDate() - date1.getDate();
    diff.year = date2.getFullYear() - date1.getFullYear();
    diff.month = date2.getMonth() - date1.getMonth();
    if (diff.day < 0) {
        diff.month--;
        var dayDiff = new Date(date2.getYear(), date2.getMonth(), 0).getDate() - date1.getDate();
        diff.day = date2.getDate();
        if (dayDiff > 0) {
            diff.day += dayDiff;
        }
    }
    if (diff.month < 0) {
        diff.month += 12;
        diff.year--;
    }
    return diff;
}


function PayReservation(obj) {
    'use strict'
    debugger;
    var postData = {
        key: obj
    };

    $.ajax({
        url: PayBookingReservation,
        type: 'post',
        dataType: 'json',
        data: postData,
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                window.location.href = window.baseUrl + "PaymentGatewayDummy/index";
            }
            else if (data.Result === 1) { //error
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
            else if (data.Result === 5) { //tampered
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
            else { //except
                alert(data.Message);
            }
        }
    });
}


function CancelReservation() {
    'use strict'
    debugger;

    var reference = $('#referenceNo').html();
    var postData = {
        Reference: reference
    };
  
    $.ajax({
        url: CancelBookingReservation,
        type: 'post',
        dataType: 'json',
        data: postData,
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                swal(
                     {
                         title: '',
                         type: 'success',
                         //text: data.Message,
                         text: data.Message,
                         showCancelButton: false,
                         confirmButtonColor: "#d9534f"
                     }, function () {
                         window.location = TransactionHistory;
                     });
            }
            else if (data.Result === 1) { //error
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
          
            else { //except
                alert(data.Message);
            }
        }
    });
}