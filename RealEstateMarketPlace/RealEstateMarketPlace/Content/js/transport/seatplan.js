var _tripId = decodeURI(getQueryVariable("tripId"));
var _date = decodeURI(getQueryVariable("date"));
var _time = decodeURI(getQueryVariable("time"));
var _passengerCount = decodeURI(getQueryVariable("passengerCount"));
var _transactionId = decodeURI(getQueryVariable("transactionId"));


var _seats = '<p class="form-control-static text-warning"><strong>Please choose seat/s.</strong></p>';

var passengerSelected = decodeURI(getQueryVariable("passengerCount"));
var arraySeats = [];
var infantPassengerSelected = [];
var seatSelected = [];
var seatSelectedRow = [];
var seatSelectedCol = [];



var seatDetailsArray;
seatDetailsArray = new Array();
seatDetailsArray = [];

$(document).ready(function () {
    checkUrl();

    DisplaySeats();

    $('#btnProceedtoPayment').click(function () {
        debugger;
        if (arraySeats.length == _passengerCount && arraySeats[0] != "") {
            debugger;
            window.localStorage.setItem('selectedSeats', JSON.stringify(arraySeats));
            window.localStorage.setItem('seatDetails', JSON.stringify(seatDetailsArray));
            window.location.href = window.baseUrl + 'transport/Payment?tripId=' + _tripId + '&date=' + _date + '&time=' + _time + '&passengerCount=' + _passengerCount + '&transactionId=' + _transactionId;

        }
        else {
            swal({
                title: '',
                type: 'error',
                text: 'Please choose a seats.',
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        }


    });

    debugger;

    $('#search-link').click(function () {
        debugger;
        window.location.href = localStorage.getItem("search_link");
    });

    $('#customer-link').click(function () {
        debugger;
        window.location.href = window.baseUrl + 'transport/CustomerDetails?tripId=' + _tripId + '&date=' + _date + '&time=' + _time + '&passengerCount=' + _passengerCount + '&transactionId=' + _transactionId;
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




function taken_message(takenid) {
    debugger;
    swal({
        title: '',
        type: 'error',
        text: takenid.id + ' is already taken.',
        showCancelButton: false,
        confirmButtonColor: "#d9534f"
    });
}


function boarded_message(boardedid) {
    debugger;
    swal({
        title: '',
        type: 'error',
        text: boardedid.id + ' is already taken.',
        showCancelButton: false,
        confirmButtonColor: "#d9534f"
    });
}

function GetTakenSeats() {

    var postData = {
        tripId: _tripId
    };

    $.ajax({
        url: TakenSeatsUrl,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            //debugger;
            if (data.Result === 0) {
                var y = data.Data;
                seatplan = y;

                $.each(y, function (i) {
                    itm = i + 1;

                    var id = y[i].ticket_seat;
                    var row = y[i].ticket_row;
                    var col = y[i].ticket_col;

                    debugger;
                    const div = document.getElementById(id);
                    //var seatRow = div.getAttribute('data-row').slice(1);
                    //var seatCol = div.getAttribute('data-col').slice(1);

                    //if (seatRow == row && seatCol == col) {
                    if (div != null) {
                        if (y[i].ticket_passenger_status == "confirmed") {
                            $("#" + id).prop("onclick", null).off("click");

                            $("#" + id).removeClass('seats').addClass('taken_seats');
                            document.getElementById(id).setAttribute("onClick", "taken_message(" + id + ")");
                        }
                    }
                    

                        //if (id == 1) {
                        //    $("#" + id).prop("onclick", null).off("click");

                        //    $("#" + id).removeClass('seats').addClass('taken_seats');
                        //    document.getElementById(id).setAttribute("onClick", "taken_message(" + id + ")");
                        //}
                        //else {
                        //    $("#" + id).prop("onclick", null).off("click");

                        //    $("#" + id).removeClass('seats').addClass('boarded_seats');
                        //    document.getElementById(id).setAttribute("onClick", "boarded_message(" + id + ")");
                        //}
                    //}
                    //else {
                    //    console.log(id + ',' + row + ',' + col);
                   // }
                });
                var h = $(".seats").height();
                $(".seats").width(h);
                $(".taken_seats").width(h);
                $(".boarded_seats").width(h);
                debugger;
            }
            else {
                
                console.log(data.Message);
            }

        },
        beforeSend: function () {
            $("#seatplan").block({
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
            $("#seatplan").unblock();
            var h = $(".seats").height();
            $(".seats").width(h);
            $(".taken_seats").width(h);
            $(".boarded_seats").width(h);
            debugger;
        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}





function DisplaySeats() {
    //debugger;

    var postData = {
        tripId: _tripId
    };

    //Transport / customerdetails
    $.ajax({
        url: SeatPlanUrl,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var y = data.Data;
                seatplan = y;

                $.each(y, function (i) {
                    itm = i + 1;
                    debugger;
                    var itmsub = y[i].seatplan_details;


                    $('#seatplan').append(itmsub);

                });
            }
            else {
                //alert('error');
            }
        },
        beforeSend: function () {
            $("#seatplan").block({
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
            // $("#seatplan").unblock();

            $('.seats').click(function () {
                debugger;
                // console.log("true chooseSeat");
                if (passengerSelected > seatSelected.length) {
                    var seatId = this.id;
                    var seatRow = this['getAttribute']('data-row').slice(1);
                    var seatCol = this['getAttribute']('data-col').slice(1);
                    console.log(seatId);
                    // console.log(seatRow);
                    // console.log(seatCol);
                    // return;
                    var seatIndex = seatSelected.indexOf(seatId);
                    if (seatIndex == -1) {
                        console.log("true seatIndex");
                        $("#" + seatId).addClass("badge-primary");
                        seatSelected = seatSelected.concat(seatId);
                        seatSelectedRow = seatSelectedRow.concat(seatRow);
                        seatSelectedCol = seatSelectedCol.concat(seatCol);
                        document.getElementById("ifrm_seatplan").value = seatSelected;
                        seatDetailsArray.push({ "seat_id": seatId, "seat_col": seatCol , "seat_row":seatRow});
                        
                        
                        // var ticketId = passengerSelected[seatSelected.indexOf(seatId)];
                        // $(#${ticketId} .seat-number).html(seatId);
                        // $("#" + ticketId).removeClass("badge-mild-yellow")
                        //                     .addClass("badge-pink");
                    } else {
                        console.log("false seatIndex");
                        if ($("#" + seatId).hasClass("badge-primary")) {
                            var seatSelectedIndex = seatSelected.indexOf(seatId);
                            if (seatSelectedIndex > -1) {
                                console.log("true seatSelectedIndex");
                                seatSelected.splice(seatSelectedIndex, 1);
                                document.getElementById("ifrm_seatplan").value = seatSelected;
                                for (var i = 0; i < seatDetailsArray.length; i++) {
                                    if (seatDetailsArray[i].seat_id === seatId) {
                                        seatDetailsArray.splice(i, 1);
                                        break;
                                    }
                                }
                                
                            }

                            $("#" + seatId).removeClass("badge-primary");
                        }

                    }
                    
                    
                } else {
                    console.log("false END");

                    var seatId = this.id;
                    console.log(seatId);

                    if ($("#" + seatId).hasClass("badge-primary")) {
                        var seatSelectedIndex = seatSelected.indexOf(seatId);
                        if (seatSelectedIndex > -1) {
                            console.log("true seatSelectedIndex2");
                            seatSelected.splice(seatSelectedIndex, 1);
                            document.getElementById("ifrm_seatplan").value = seatSelected;
                            for (var i = 0; i < seatDetailsArray.length; i++) {
                                if (seatDetailsArray[i].seat_id === seatId) {
                                    seatDetailsArray.splice(i, 1);
                                    break;
                                }
                            }

                        }

                        $("#" + seatId).removeClass("badge-primary");
                    }
                }
                console.log(seatDetailsArray);
                getSeats();
                //console.log(seatSelected);
            });
            debugger;
            GetTakenSeats();

        },

        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}




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
            if (data.Result === 0) {
                Initialization();

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
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}

function Initialization() {

    $("#departDate").text(moment(_date).format('LL'));
    $("#departTime").text(moment(_date + ' ,' + _time).format('hh:mm A'));
    $("#numbPassenger").text(_passengerCount);
    var tripPrice = localStorage.getItem("price");
    $("#tripPrice").text('Php ' + tripPrice);
    $("#totalPrice").text('Php ' + (Number(_passengerCount) * Number(tripPrice)));
    document.getElementById("selectedseats").innerHTML = _seats;
}

function getSeats() {
    arraySeats = [];
    arraySeats.length = 0;
    $('#selectedseats').val('');
    $('#selectedseats').append('');
    var box1 = '<span class="fa-stack fa-sm ">' +
        '<i class="fa fa-square fa-stack-2x" ></i>' +
        '<i class="fa fa-inverse fa-stack-1x">';
    var box2 = '</i > </span >';

    var seatFromLabel = $('#ifrm_seatplan').val();
    arraySeats = seatFromLabel.split(",");

    var displaySelected = '';

    for (i = 0; i < arraySeats.length; i++) {
        if (arraySeats[i] !== '' && arraySeats[i] !== 'undefined') {
            displaySelected = displaySelected + box1 + arraySeats[i] + box2;
        }
    }
    debugger;
    if (arraySeats[0] == '') {
        document.getElementById("selectedseats").innerHTML = _seats;
    }
    else {
        document.getElementById("selectedseats").innerHTML = displaySelected;
    }


}