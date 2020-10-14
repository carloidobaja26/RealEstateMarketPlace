var trips = [];
var _originname;
var _destinationname;

$(document).ready(function () {
    Initializing();

    $("#btnsearchDate").click(function () {
        $('#txtsearchDate').focus();
    });
    $("#txtsearchDate").change(function () {
        var a = $('#txtsearchDate').val();

        if (a == 'Invalid date') {
            window.location = Home;

        } else {
            changeDate($('#txtsearchDate').val());
        }
    });

    $('#txtsearchDate').daterangepicker({
        "singleDatePicker": true,
        "autoApply": true,
        "autoUpdateInput": true

    });


    $("#prev").click(function () {
        var dt = $('#txtsearchDate').val();

        $('#txtsearchDate').data('daterangepicker').setStartDate(moment(dt).subtract(1, 'days'));
        $('#txtsearchDate').data('daterangepicker').setEndDate(moment(dt).subtract(1, 'days'));


        changeDate($('#txtsearchDate').val());
    });

    $("#next").click(function () {
        var dt = $('#txtsearchDate').val();
        $('#txtsearchDate').data('daterangepicker').setStartDate(moment(dt).add(1, 'days'));
        $('#txtsearchDate').data('daterangepicker').setEndDate(moment(dt).add(1, 'days'));

        changeDate($('#txtsearchDate').val());

    });

    SearchTrips();

});



function changeDate(newdate) {

    var split_nd1 = newdate.split("/");
    var new_date = split_nd1[2] + '-' + split_nd1[0] + '-' + split_nd1[1];


    window.location.href = '/transport/destination?originKey=' +
        decodeURI(getQueryVariable("originKey")) + '&destinationKey=' +
        decodeURI(getQueryVariable("destinationKey")) + '&cIn=' + new_date + '&guest=' + decodeURI(getQueryVariable("guest"));

}


function Initializing() {
    //check link 
    if (decodeURI(getQueryVariable("originKey")) == "undefined") {
        swal(
            {
                title: '',
                type: 'error',
                text: 'Undefined origin',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (decodeURI(getQueryVariable("destinationKey")) == "undefined") {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined destination',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }

    if (decodeURI(getQueryVariable("cIn")) == "undefined") {

        window.location = Home;

    }

    if (decodeURI(getQueryVariable("guest")) == "undefined") {
        swal(
            {

                title: '',
                type: 'error',
                text: 'Undefined passenger count',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            }, function () {
                window.location = Home;
            });
    }


    if (parseInt(decodeURI(getQueryVariable("guest"))) > 10) {
        window.location.href = '/transport/destination?originKey=' +
            decodeURI(getQueryVariable("originKey")) + '&destinationKey=' +
            decodeURI(getQueryVariable("destinationKey")) + '&cIn=' + decodeURI(getQueryVariable("cIn")) + '&guest=10';
    }



    //get date to view
    var d = decodeURI(getQueryVariable("cIn"));
    var split_d = d.split("-");
    if (d == "undefined") {

    }
    else {
        document.getElementById("txtsearchDate").value = split_d[1] + '/' + split_d[2] + '/' + split_d[0];
    }

}


function SearchTrips() {
    //debugger;
    var _origin = decodeURI(getQueryVariable("originKey"));
    var _destination = decodeURI(getQueryVariable("destinationKey"));
    var _tripdate = decodeURI(getQueryVariable("cIn"));
    var _capacity = decodeURI(getQueryVariable("guest"));
    var res = _capacity.split("-");
    var _adult = res[0];
    var _kid = res[1];


    var postData = {
        OriginId: _origin,
        DestinationId: _destination,
        TripDate: _tripdate,
        AdultCapacity: _adult,
        KidCapacity: _kid
    };

    //Transport / customerdetails
    $.ajax({
        url: SearchTripsUrl,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var y = data.Data;
                trips = y;
                $('#wardEntry').empty();
                var CustomerUrl = '/transport/seatplan';
                var itm = 0;
                var des = document.getElementById("destination");
                var orig = document.getElementById("origin");
                var logoarrow = document.getElementById("arrow");

                orig.innerHTML = data.Data[0].origin;
                des.innerHTML = data.Data[0].destination;


                logoarrow.innerHTML = '<i class="fa fa-angle-double-right text-darkorange-package aria-hidden=" true"></i>';

                _originname = data.Data[0].origin;
                _destinationname = data.Data[0].destination;
      
                $.each(y, function (i) {
                    itm = i + 1;
                    var stat = 'InActive';
                    var bookFunction = "onclick=" + '"clickBookNow(' + y[i].merchant_id+','+ y[i].trip_fare + "," + y[i].trip_id + ",'" + y[i].trip_date + "','" + y[i].trip_time + "')"+'"';// + y[i].trip_fare + ',' + y[i].trip_id + ', "' + y[i].trip_date + '", "' + y[i].trip_time + '"' + ")';
                    var bookNow = 'Book Now';
                    console.log(bookFunction);
              
                    var cap = data.Data[i].trip_capacity;
                    var taken = data.Data[i].taken;
                    var capacity = parseInt(cap) - parseInt(taken);
                    
                    var isavailable = '>'+capacity+'/'+cap;//Available';
                    //if (parseInt(cap) <= parseInt(taken)) {
                    //    isavailable = '"text-danger">Soldout';
                    //    bookNow = 'Sold out';
                    //    bookFunction = 'onclick="Soldout()"';
                    //}
                    //debugger;
                    debugger;
                    var dateFormat = moment(y[i].trip_date).format('LL');
                    var timeFormat = moment(y[i].trip_date +' ,' +y[i].trip_time).format('hh:mm A');



                    var itmsub = '<div class="col-md-12 pt-2">' +
                        '<div class="row pt-2">' +
                        '<div class="col-md-9  pb-2 bg-white shadow">' +
                        '<div class="row bg-white" style="overflow-x:auto;">' +
                        '<div class="col-12">' +
                        '<div class="row">' +
                        '<div class="col-12 td-ellipsis">' +
                        '<font size="1">Transportation</font><br>' +
                        '<i class="fa fa-bus text-warning" aria-hidden="true"></i>&nbsp;' +
                        '<b>' + y[i].vehicle_name + '</b>' +
                        '</div>' +

                        '</div>' +
                        '</div>' +
                        '<div class="col-12">' +
                        '<div class="row" style="font-size:15px">' +
                        '<div class="col-3">' +
                        '<font size="1">Departure Date</font><br>' +
                        '<b>' + dateFormat + '</b>' +
                        '</div>' +
                        '<div class="col-3">' +
                        '<font size="1">Departure Time</font><br>' +
                        '<b>' + timeFormat + '</b>' +
                        '</div>' +
                        '<div class="col-3">' +
                        '<font size="1">Seat/s</font><br>' +
                        '<b class =' + isavailable + '</b>' +
                        '</div>' +

                        '<div class="col-3">' +
                        '<font size="1">Service Class</font><br>' +
                        '<b>' + y[i].service_class + '</b>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-md-3 shadow bg-secondary">' +
                        '<div class="row">' +

                        '<div class="col-md-12 pl-0 pr-0 " style="background-color:coral">' +
                        "<button class='btn btn-block text-light'" + bookFunction + ">" + bookNow+"</button>" +

                        '</div>' +
                        '<div class="col-md-12 mt-0 pt-2 pb-2 text-center text-light bg-secondary no-gutters">' +
                        '<b style="font-size:20px">₱' + y[i].trip_fare + '</b>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' + '</div>';

                    $('#tripEntry').append(itmsub);

                });
            }
            else {
                if (data.Message === "No trips available") {
                    var itmsub =
                        '<div class="col-md-12 mt-2 pt-3 bg-white shadow text-center">' +
                        '<b style="font-size:30px">No trips available</b>' +
                        '<br />' +
                        '<br />' +
                        '</div>';
                    $('#tripEntry').append(itmsub);
                }
                else {
                    window.location = Home;
                }
            }
        },
        beforeSend: function () {
            $("#tripEntry").block({
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
            $("#tripEntry").unblock();
        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function Soldout() {
    swal(
        {

            title: '',
            type: 'error',
            text: 'Schedule is already soldout',
            showCancelButton: false,
            confirmButtonColor: "#d9534f"
        
        });
}


function clickBookNow(_merchantId, _tripPrice, _tripId, _tripdate, _tripTime) {
    debugger;
    var _link = '/transport/destination?originKey=' + 
        decodeURI(getQueryVariable("originKey")) + '&destinationKey=' +
        decodeURI(getQueryVariable("destinationKey")) + '&cIn=' + decodeURI(getQueryVariable("cIn")) + '&guest=' + decodeURI(getQueryVariable("guest"));
    debugger;
    var _passengerCount = decodeURI(getQueryVariable("guest"));
    $.ajax({
        url: window.baseUrl + 'transport/CustomerDetailsUrl?tripId=' + _tripId + '&date=' + _tripdate + '&time=' + _tripTime + '&passengerCount=' + _passengerCount + '&originName=' + _originname + '&destinationName=' + _destinationname,
        type: "POST",
        success: function (data) {
            debugger;
            //localStorage.removeItem("passengerDetails");
            //localStorage.removeItem("customerDetails");
            //localStorage.removeItem("selectedSeats");
            //localStorage.removeItem("price");
            //localStorage.removeItem("search_link");

            window.localStorage.clear();
            localStorage.setItem("merchant_id", _merchantId);
            localStorage.setItem("price", _tripPrice);
            localStorage.setItem("search_link", _link);
            window.location.href = window.baseUrl + 'transport/CustomerDetails?tripId=' + _tripId + '&date=' + _tripdate + '&time=' + _tripTime + '&passengerCount=' + _passengerCount + '&transactionId=' + data;


        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}