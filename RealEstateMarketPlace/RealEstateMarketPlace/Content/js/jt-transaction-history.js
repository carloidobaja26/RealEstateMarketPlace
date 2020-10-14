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
var nDates = function () {
    var x;
    $.ajax({
        url: '../Home/GetSystemDate?type=2',
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
    ViewTransaction();
    PackageTransactionAll();
    $('#btn-cancel').on('click', function () {
        $('#cancel-bookingModal').show();
    });
    $('#defaultOpen,#confirmbook').on('click', function () {
        ViewTransaction();
    });
    $('#previous-booking').on('click', function () {
        ViewTransaction2();
    });
});
function onViewDetails(Key) {
    window.location.href = window.baseUrl + "TransactionHistory/BookingDetail?key=" + Key;
}
function ViewTransaction() {
    $.ajax({
        url: window.baseUrl + 'TransactionHistory/RetrieveTransaction?type=1',
        type: 'Get',
        data: 'json',
        success: function (response) {
            var dataArray = response.Data;
            getData(dataArray);          
        }
    });
}
function PackageTransactionAll() {
    $.ajax({
        url: window.baseUrl + 'TransactionHistory/RetrievePackageTransaction',
        type: 'Get',
        data: 'json',
        success: function (response) {
            debugger;
            if (response.Result == 0) {
                var dataArray = response.Data;
                var ptdata = '';
                for (i = 0; i < dataArray.length; i++) {
                    ptdata += '<div class="row pt-3 pb-3">'
                        + '<div class="col-md-4 pr-0">'
                        + '<img style="width: 312px;" src="' + dataArray[i].PackagesImages[0].Name + '" />'
                        + '</div>'
                        + '<div class="col-md-4 bg-white">'
                        + '<div class="p-3">'
                        + '<div class="m-title mt-0 mb-2">' + dataArray[i].PackageName+'</div>'
                        + '<span>'
                        + '' + dataArray[i].PackageDescription + ''
                        + '</span>'
                        + '<br />'
                        + '<br />'
                        + '<span class="font-20">'
                        + '<b>Total:  </b>'
                        + '</span>'
                        + '<span class="text-darkorange-package font-20">'
                        + 'PHP ' + formatPrice(dataArray[i].TotalAmount) + ''
                        + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-md-4 bg-white">'
                        + '<div class="col-md-12 my-4 text-right">'
                        + '<span>Purchase Date: <b>' +moment(dataArray[i].TransactionDate).format('ddd MMM-DD-YYYY')+ '</b></span>'
                        + '</div>'
                        + '<div class="row pr-3 mt-5" style="float: right;">'
                        + '<button onclick="viewPackageTransaction(' + dataArray[i].Key + ')" style="width: 150px;" class="btn btn-orange  btn-block">View</button>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                }
                $('#htours').html(ptdata);
            }
            else {
                alert(response.Message);
            }
            
        }
    });
}

function viewPackageTransaction(key) {
    window.location.href = window.baseUrl + "TransactionHistory/PackageTransactionDetails?key=" + key;
}

function ViewTransaction2() {
    $.ajax({
        url: window.baseUrl + 'TransactionHistory/RetrieveTransaction?type=2',
        type: 'Get',
        data: 'json',
        success: function (response) {
            var dataArray = response.Data;
            var messageArray = response.Message;
            getData2(dataArray, messageArray);
        }
    });

}
function getData2(dataArray) {
  
    $('#PreviousBooking').empty();
    $.each(dataArray, function (key, value) {
        debugger;
        var _bookdate = new Date((value.DateTime));
        var bd = _bookdate.toDateString().split(" ");
        var mon = bd[1];
        var dat = bd[2];
        var yr = bd[3];
        var ci = new Date(value.CheckInDate);
        var date1 = ci.toDateString();
        var x = date1.split(" ");
        var _days = x[0];
        var _months = x[1];
        var _dates = x[2];
        var _years = x[3].slice(-2);
        var co = new Date(value.CheckOutDate);
        var date2 = co.toDateString();
        var c_x = date2.split(" ");
        var c_days = c_x[0];
        var c_months = c_x[1];
        var c_dates = c_x[2];
        var c_years = c_x[3].slice(-2);

        var temp =
                    '<div class="row mb-3" id="">'+
                       '<div class="col-md-4 pr-0  ">' +
                            '<img style="width: 100%;" src="/Content/Image/hotel1.png" />'+
                        '</div>'+
                        '<div class="col-md-4 bg-white ">'+
                            '<div class="p-3">'+
                                '<div class="m-title mt-0 mb-2">' + value.Hotel.Name + '</div>' +
                                '<div class="mb-2">Booking Code: &nbsp;<span id="" class="txt-black">' + value.ReferenceNumber + '</span></div>' +
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-4 bg-white">'+
                            '<div class="col-md-12 my-4  ">'+
                                '<div style="float: right;">'+
                                    'Booked on:&nbsp;<span class="txt-black" id="">' + mon+ ' '+dat +' '+yr+ '</span>' +
                                '</div>'+
                            '</div>'+
                            '<div class="row mt-5">'+
                                '<div class="col-md-6 " style="border-right: 1px dashed">'+
                                    'Check-in'+
                                        '<div class="row">'+
                                        '<div class="col-md-5 txt-black">'+
                                            '<h1>' + _dates + '</h1>' +
                                        '</div>'+
                                        '<div class="col-md-7">'+
                                            '<div class="row txt-black">'+
                                                '<div class="col-md-12">' + _days + '</div><br/>' +
                                                '<div class="col-md-12">' + _months + ',' + _years + '</div>' +
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-md-6">'+
                                    'Check-out'+
                                    '<div class="row">'+
                                        '<div class="col-md-5 txt-black">'+
                                            '<h1>' + c_dates + '</h1>' +
                                        '</div>'+
                                        '<div class="col-md-7">'+
                                            '<div class="row txt-black">'+
                                                '<div class="col-md-12">' + c_days + '</div>' +
                                                '<div class="col-md-12">' + c_months + ',' + c_years + '</div>' +
                                            '</div>'+
                                        '</div>'+

                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            //'<div class="row pr-3 mt-5" style="float: right;">'+
                            //    '<div class="col-md-6"><button id="" style="width: 140px;" class="btn btn-orange  btn-block">Delete</button></div>'+
                            //'</div>'+
                       '</div>' +
             '<div>'+
                '<br/>';

        $('#PreviousBooking').append(temp);
        //$("#hotelimage").attr("src", "/Content/Image/hotel1.png");

    });

}
function getData(dataArray) {  
        $('#unpaid-div').empty();
        $('#paid-div').empty();
         $.each(dataArray, function (key, value) {
             var _bookdate = new Date((value.DateTime));
             var endD = moment(_bookdate, "DD-MM-YYYY").add(3, 'days');
             var _endDate = new Date(endD);

            var bd = _bookdate.toDateString().split(" ");
            var mon = bd[1];
            var dat = bd[2];
            var yr = bd[3];
            var ci = new Date(value.CheckInDate);
            var date = ci.toDateString();
            var x = date.split(" ");
            var _days = x[0];
            var _months = x[1];
            var _dates = x[2];
            var _years = x[3].slice(-2);
            var co = new Date(value.CheckOutDate);
            var dateco = co.toDateString();
            var c_x = dateco.split(" ");
            var c_days = c_x[0];
            var c_months = c_x[1];
            var c_dates = c_x[2];
            var c_years = c_x[3].slice(-2);
           
            var dateCheckin = ci;
          
            var endd = moment(_endDate);
            var bDate = moment(nDates);
            var diff2 = endd.diff(bDate, 'days');
             //var output = diff.year + " year " + diff.month + " month " + diff.day + " day" + currentDate;
            var daytosettle = diff2;
            var isPaidStr = '';
            if (value.PaymentStatus === 0) {
                isPaidStr = '<div class="col-12">' +
                                    '<div class="row upd mb-2">' +
                                        '<div class="col-md-2">' +
                                            '<i class="fa fa-lock tab-icon"></i>' +
                                        '</div>' +
                                        '<div class="col-md-9 px-0 text-red" id="status-id">Unpaid</div>' +
                                    '</div>' +
                                '</div>' +
                                 '<div class="col-12">' +
                                    '<div class="row upd">' +
                                        '<div class="col-md-2">' +
                                            '<i class="fa fa-lock tab-icon"></i>' +
                                        '</div>' +
                                        '<div class="col-md-9 px-0 text-red">Please settle your payment within ' + daytosettle + ' days to save your booking.</div>' +
                                    '</div>' +
                                '</div>';

            } else
            {
                isPaidStr = '<div class="col-12">' +
                                    '<div class="row upd mb-2">' +
                                        '<div class="col-md-2">' +
                                            '<i class="fa fa-lock tab-icon"></i>' +
                                        '</div>' +
                                        '<div class="col-md-9 px-0 text-green" id="status-id">Paid</div>' +
                                    '</div>' +
                                '</div>';
                                
            }
            var bookingContent =
                    '<div class="row bg-white " id="ConfirmedBooking">' +
                        '<div class="col-md-4 pr-0  ">'+
                            '<img id="hotelimage"style="width: 100%;" src="/Content/Image/hotel1.png" />' +
                       '</div>'+
                        '<div class="col-md-4 ">' +
                          '<div class="row">' +
                            '<div class="p-3">' +
                                 '<div class="col-12">' +
                                    '<div class="m-title mt-0 mb-2" id="hotelname">' + value.Hotel.Name + '</div>' +
                                 '</div>' +
                                 '<div class="col-12">' +
                                    '<div class="mb-2" >Room Type: &nbsp;<span id="" class="txt-black">' + value.RoomType + '</span></div>' +
                                '</div>' +
                                '<div class="col-12">' +
                                    '<div class="mb-2" id="coderef">Booking Code: &nbsp;<span id="" class="txt-black">' + value.ReferenceNumber + '</span></div>' +
                                '</div>' +
                                isPaidStr +
                            '</div>' +
                        '</div>' +
                       '</div>' +

                        '<div class="col-md-4 ">' +
                            '<div class="row">' +
                                '<div class="col-md-12 my-3  ">'+
                                    '<div style="float: right;">'+
                                        'Booked on:&nbsp;<span class="txt-black" id="bookingdate">' + mon + ' ' + dat + ' ' + yr + '</span>' +
                                    '</div>'+
                                '</div>' +
                                 '<div class="col-md-12">' +
                                        '<div class="row mt-2">'+
                                            '<div class="col-md-6 " style="border-right: 1px dashed">'+
                                                'Check-in'+
                                                '<div class="row">'+
                                                    '<div class="col-md-5 txt-black">'+
                                                        '<h1 id="checkin">' + _dates + '</h1>' +
                                                    '</div>'+
                                                    '<div class="col-md-7">'+
                                                        '<div class="row txt-black">'+
                                                            '<div class="col-md-12">' + _days + '</div>' +
                                                            '<div class="col-md-12">'+ _months + ',' + _years +'</div>' +
                                                        '</div>'+
                                                    '</div>'+

                                                '</div>'+
                                            '</div>'+
                                            '<div class="col-md-6">'+
                                                'Check-out'+
                                                '<div class="row">'+
                                                    '<div class="col-md-5 txt-black">'+
                                                        '<h1 id="checkout">' + c_dates + '</h1>' +
                                                    '</div>'+
                                                    '<div class="col-md-7">'+
                                                        '<div class="row txt-black">'+
                                                            '<div class="col-md-12">' + c_days + '</div>' +
                                                            '<div class="col-md-12">' + c_months + ',' + c_years + '</div>' +
                                                        '</div>'+
                                                    '</div>'+

                                                '</div>'+
                                           '</div>'+
                                        '</div>' +
                                         '</div>' +
                             '<div class="col-md-12 mt-2">' +
                                '<div class="row pr-3" style="float: right;">'+
                                    '<button style="width: 150px;" onclick="onViewDetails(' + value.Key + ')"  class="btn btn-orange" >View</button>' +                      
                                '</div>' +
                             '</div>' +
                         '</div>' +
                      '</div>' +
                    '</div>' +
                '</div>' +
                    '<br/>';
           
            if (value.PaymentStatus === 0 && value.Status !== 5) {
                $('#unpaid-div').append(bookingContent);
        
            } else if (value.PaymentStatus === 1 && value.Status !== 5) {
                $('#paid-div').append(bookingContent);
            }
            else {
                $('#CancelBookings').append(bookingContent);
            }
        });
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