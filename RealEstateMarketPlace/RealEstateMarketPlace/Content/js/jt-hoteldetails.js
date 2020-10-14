var _location = decodeURI(getQueryVariable("location"));
var _cIn = decodeURI(getQueryVariable("cIn"));
var _cOut = decodeURI(getQueryVariable("cout"));
var _guest = decodeURI(getQueryVariable("guest"));
var _name = decodeURI(getQueryVariable("Name"));
var _id = decodeURI(getQueryVariable("Key"));

var allAmenities = [];
var hotelRoomTypes = [];
amenitiesCollection = [];
var resultData = [];
var guest = [];
var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 15,
    center: new google.maps.LatLng(14.461985279254192, 120.45793347027586),
    mapTypeId: 'roadmap'
});
var isLogIn = false;

function resizeInput() {
    $(this).attr('size', $(this).val().length);
}


$("#btnsearchDateIn").click(function () {
    $('#txtsearchDateIn').focus();
});

$("#btnsearchDateOut").click(function () {
    $('#txtsearchDateOut').focus();
});
function IncrementDecrement(fieldName, type) {
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type === 'minus') {
            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) === input.attr('min')) {
                $(this).attr('disabled', true);
            }
        } else if (type === 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) === input.attr('max')) {
                $(this).attr('disabled', true);
            }
        }
    } else {
        input.val(0);
    }
    var ph1 = $('#option1').attr('placeholder') + ",";
    var ph2 = $('#option2').attr('placeholder') + ",";
    //var ph3 = $('#option3').attr('placeholder') + ",";
    var quant1 = $("input[name='quant[1]']");
    var quant2 = $("input[name='quant[2]']");
    //var quant3 = $("input[name='quant[3]']");
    var res1 = 0;
    var res2 = 0;
    //var res3 = 0;
    //alert(ph1 + quant1.val() + ph2 + quant2.val() + ph3 + quant3.val());
    if (quant1.val() !== "0") {
        res1 = quant1.val();
    }
    else {
        res1 = "";
        ph1 = "";
    }
    if (quant2.val() !== "0") {
        res2 = quant2.val();
    } else {
        res2 = "";
        ph2 = "";
    }
    //if (quant3.val() !== "0") {
    //    res3 = quant3.val();
    //} else {
    //    res3 = "";
    //    ph3 = "";
    //}
    if (quant1.val() === "0" && quant2.val() === "0") {
        guest = [];
        $('#btnGuest').text("Select");
    } else {
        var tes = res1 + ph1 + res2 + ph2;
        var result = tes.slice(0, tes.length - 1);
        $('#btnGuest').text(result);
        guest = [];
        guest.push({ "Adult": quant1.val(), "Child": quant2.val() });
    }
}
$(document).ready(function () {

    var cIn = new Date(_cIn);
    var cOut = new Date(_cOut);
    $('#searchdate').daterangepicker({
        "drops": "down",
        "minDate": newDt,
        "startDate": cIn,
        "endDate": cOut,
        "locale": {
            "format": "MMM DD, YYYY",
            "separator": "-",
        }
        //"singleDatePicker": true
    }, function (start, end, label) {

        $('#searchdate').html(moment(start).format('MMM DD, YYYY') + ' - ' + moment(end).format('MMM DD, YYYY'));

        searchHotel();

    });
    //$('#sdate2').html(moment(cIn).format('MMM DD, YYYY') + ' - ' + moment(cOut).format('MMM DD, YYYY'));

    var gd = _guest.split('-');
    if (gd.length == 1) {
        $('#btnGuest').html(gd[0] + ' Adult ');
   
        $("input[name='quant[1]']").val(gd[0] - 1);
        IncrementDecrement("quant[1]", "plus");
    }
    else if (gd.length == 2) {
        $('#btnGuest').html(gd[0] + ' Adult, ' + gd[1] + ' child');
       
        $("input[name='quant[1]']").val(gd[0] - 1);
        $("input[name='quant[2]']").val(gd[1]);
        IncrementDecrement("quant[1]", "plus");
    }


    $('.btn-number').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        IncrementDecrement(fieldName, type);
    });
    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });

    $('#btnsearch').on('click', function (e) {
        //$('#txtsearchDateIn').focus();
        searchHotel();
        
    });
    var nDatesx = function () {
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

    var today = new Date(nDatesx);
    var newDt = new Date(_cIn);
  

    var endDt = new Date(_cOut);
     
    $('#txtsearchDateIn').daterangepicker({
        "drops": "down",
        "minDate": today,
        "startDate": newDt,
        "endDate": endDt,
        "locale": {
            "format": "MMM DD, YYYY",
            "separator": "-",
        }
    }, function (start, end, label) {

    });
   
    searchHotel();


    $("#ameni_Freecancelation").on("click", function () {
        clickAmenities($(this).attr("data-id"), $(this).attr("data-name"));
        //alert('ameni_Freecancelation');
    });
    $("#ameni_Freebreakfast").on("click", function () {
        clickAmenities($(this).attr("data-id"), $(this).attr("data-name"));
        //alert('ameni_Freebreakfast');
    });
    $("#ameni_2Beds").on("click", function () {
        clickAmenities($(this).attr("data-id"), $(this).attr("data-name"));
        //alert('ameni_2Beds');
    });
   // getHotelAmenities();
});



function searchHotel() {
    'use strict'
    var selDates = $('#txtsearchDateIn').val();
    var dateArray = selDates.split('-');
    var cIn = new Date(dateArray[0]);
    var cOut = new Date(dateArray[1]);
    var adult = guest[0].Adult;
    var child = guest[0].Child;
    var postData = {
        Adult: adult,
        CheckIn: moment(cIn).format('YYYY-MM-DD'),
        CheckOut: moment(cOut).format('YYYY-MM-DD'),
        Child: child,
        location: _location,
        RoomRate: 0,
        hotelKey: _id
    };

    $.ajax({
        url: HotelSearch,
        type: "POST",
        dataType: "json",
        cache: false,
        data: postData,
        success: function (data) {
           
            $("#searchHotelContainer").empty();
            if (data.Result === 0) {
                resultData = data.Data[0];
               
                var y = data.Data[0];
                $('#hd-img-container').empty();
                var hotelLogo = '<img src="' + y.CompanyLogo + '" class="shadow" />';
                $('#hd-img-container').append(hotelLogo);
                $('#hotelName').text(y.Name);
                $('#hotelAddress').text(y.Address);

                hotelRoomTypes = y.RoomTypes;
                var rooms = y.RoomTypes;
                var amenities = y.HotelAmenities;
                var policies = y.Policies;
                var hImg = y.HotelImages;
                var imgString = '';
                if (hImg.length <= 5) {
                    $('#hotelimages').empty();
                    if (hImg.length === 1) {
                        imgString = ' <div class="carousel-item active row ">' +
                                               '<div class="row">' +
                                                     '<div class="col-md-12 mb-3">' +
                                                           '<div class="card" id="carousel-img">' +
                                                             '  <img class="img-responsive br-5" src="' + hImg[0].Name + '"> ' +
                                                           '</div> ' +
                                                       '</div> ' +
                                                   '</div> ' +
                                               '</div> ';
                    }
                    else if (hImg.length > 1) {
                        imgString = ' <div class="carousel-item active row ">' +
                                              '<div class="row">' +
                                                    '<div class="col-md-6 mb-3">' +
                                                          '<div class="card" id="carousel-img">' +
                                                            '  <img class="img-responsive br-5" src="' + hImg[0].Name + '"> ' +
                                                          '</div> ' +
                                                      '</div> ';

                        var loopOther = '<div class="col-md-6 mb-3"><div  class="row">';
                        var k = 0;
                        for (k = 1; k <= hImg.length - 1; k++) {
                            loopOther += '<div class="col-md-6 mb-3">' +
                                                   '<div class="card" id="carousel-img">' +
                                                   '  <img class="img-responsive br-5" src="' + hImg[k].Name + '"> ' +
                                                   '</div> ' +
                                        '</div>';

                        }

                        loopOther += '</div></div>';
                        imgString += loopOther + '</div></div> ';

                    }

                    $('#hotelimages').append(imgString);
                }
                else {
                    $('#hotelimages').empty();
                    var maxIndx = 5;
                    var slideNew = '';
                    slideNew += ' <div class="carousel-item row ">' +
                                            '<div class="row">';
                    if (hImg.length > 1) {
                        imgString = ' <div class="carousel-item active row ">' +
                                              '<div class="row">' +
                                                    '<div class="col-md-6 mb-3">' +
                                                          '<div class="card" id="carousel-img">' +
                                                            '  <img class="img-responsive br-5" src="' + hImg[0].Name + '"> ' +
                                                          '</div> ' +
                                                      '</div> ';

                        var loopOther = '<div class="col-md-6 mb-3"><div  class="row">';
                        var k = 0;
                        for (k = 1; k <= hImg.length - 1; k++) {
                            if (k < 5) {
                                loopOther += '<div class="col-md-6 mb-3">' +
                                                  '<div class="card" id="carousel-img">' +
                                                  '  <img class="img-responsive br-5" src="' + hImg[k].Name + '"> ' +
                                                  '</div> ' +
                                       '</div>';

                            }
                            else {
                                slideNew +=  '<div class="col-md-3 mb-3">' +
                                                    '<div class="card" id="carousel-img">' +
                                                    '  <img class="img-responsive br-5" src="' + hImg[k].Name + '"> ' +
                                                    '</div> ' +
                                             '</div> ';
                            }
                           
                        }
                        loopOther += '</div></div>';
                        imgString += loopOther + '</div></div> ' + slideNew + '</div></div> ';
                        //imgString += imgString + slideNew + '</div></div> ';
                     

                    }
                    $('#hotelimages').append(imgString);
                }
               
                var latlng = new google.maps.LatLng(y.Latitude, y.Longitude);
                //myMarker.setPosition(latlng);
                if (y.Latitude === '0' || y.Longitude === '0') {
                    latlng = new google.maps.LatLng(14.461985279254192, 120.45793347027586);
                }

                var myMarker = new google.maps.Marker({
                    position: latlng,
                    draggable: true
                });

                google.maps.event.addListener(myMarker, 'dragend', function (evt) {
                  
                    $("#longi").val(evt.latLng.lng());
                    $("#lati").val(evt.latLng.lat());
                });


                map.setCenter(myMarker.position);
                myMarker.setMap(map);
                $('#r-available').html(rooms.length +  ' room/s available');

                $("#hotel-rooms-container").empty();
                $("#hotelDescription").append('<p class="text-justify">' + y.Description + '</p>');

                $("#amenities").empty();
                $.each(amenities, function (k) {
                   
                    $("#amenities").append("<div class='col-6'><p class='view-info-text  text-green'><i class='fa fa-check-circle mr-2'></i> " + amenities[k].Name + "</p></div>");
                   
                });
                $("#listPolicies").empty();
                $.each(policies, function (k) {
                    var po = policies[k].Name;
                    var splt = po.split('|');
                    if (splt.length > 1) {
                        $.each(splt, function (k) {
                            if (splt[k] === "InfantA") {
                                $("#listPolicies").append("<li class='mb-3'>Infant guests (under 2 years of age) are not advisable to stay because baby cribs or roll-away beds are not available. However, an infant may stay with parents' bed with no additional cost.</li>");
                            } else if (splt[k] === "InfantA") {
                                $("#listPolicies").append("<li class='mb-3'>Infant guests (under 2 years of age) are not advisable to stay because baby cribs or roll-away beds are not available. However, an infant may stay with parents' bed with no additional cost.</li>");
                            } else if (splt[k] === "ChildA") {
                                $("#listPolicies").append("<li class='mb-3'>Children (2-11 years of age) can stay with parents for FREE. If you wish to request additional beds, you may directly inform the hotel upon arrival. Please note that additional charges may apply.</li>");
                            } else if (splt[k] === "ChildB") {
                                $("#listPolicies").append("<li class='mb-3'>Children (12 years of age and above) will be charged as an adult. If you wish to request additional beds, you may directly inform the hotel upon arrival. Please note that additional charges may apply.</li>");
                            }
                        });
                    }
                    else {
                        $("#listPolicies").append("<li class='mb-3'>" + policies[k].Name + "</li>");
                    }
                   

                });

                if (rooms === 0) {
                  
                    $("#hotel-rooms-container").append('<div class="col-md-12 col12 br-5 bg-white"><p class=" mt-3 text-center sub-title">No Rooms available.</p></div>');
                }
                else {
                    isLogIn = data.IsLogIn;
                   
                    $.each(rooms, function (i) {
                        debugger;
                        var rmAm = rooms[i].RoomTypeAmenities;
                        var rmImg = rooms[i].RoomTypeImages;
                        var discountBanner = '';
                        var disPercent = parseFloat(rooms[i].DiscountPercent);
                        var roomRateStr = ' <div id="hotel-price" class="hotel-name">₱ ' + formatPrice(rooms[i].Rate) + ' <span class="text-small">/night</span></div>' +
                                                          ' </div>' +
                                                          ' <div id="room-offer" class="hotel-x mb-3 text-right pr-3 td-linetrough">&nbsp;</div>';


                        if (disPercent > 0 && isLogIn === true) {
                            discountBanner = ' <div class="top-left-banner">' +
                                               '<span class="text-white">You have save ' + rooms[i].DiscountPercent + '%</span>' +
                                           '</div>';

                            roomRateStr = ' <div id="hotel-price" class="hotel-name">₱ ' + formatPrice(rooms[i].DiscountedRate) + ' <span class="text-small">/night</span></div>' +
                                                          ' </div>' +
                                                          ' <div id="room-offer" class="hotel-x mb-3 text-right pr-3 td-linetrough">&nbsp;₱ ' + formatPrice(rooms[i].Rate) + ' /night</div>';
                        }
                        else if (disPercent > 0 && isLogIn === false) {
                            discountBanner = ' <div class="top-left-banner">' +
                                               '<a href="#" data-toggle="modal" data-target="#modalLogin"><span class="text-white">Registered to save up to ' + rooms[i].DiscountPercent + '%</span></a>' +
                                           '</div>';
                        }
                        var rmMax = 5;
                        var rmSt = 0;
                        var listAmeni = '';
                        if (rooms[i].Breakfast === 1) {
                            listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                                  '<i class="fa fa-check mr-2 text-green"></i> Breakfast' +
                                                         ' </p></div>';
                        }
                        else {
                            listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                                 '<i class="fa fa-times mr-2 text-red"></i> Breakfast' +
                                                        ' </p></div>';
                        }

                        if (rooms[i].IsAllowCancellation ) {
                            listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                                  '<i class="fa fa-check mr-2 text-green"></i> Cancellation' +
                                                         ' </p></div>';
                        }
                        else {
                            listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                                 '<i class="fa fa-times mr-2 text-red"></i> Cancellation' +
                                                        ' </p></div>';
                        }
                        debugger;

                        //if (rmAm.length <= 1) {
                        //    listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                        //           '<i class=" mr-2 text-green"></i> &nbsp; ' +
                        //                                  ' </p></div>';
                        //}


                        for (rmSt = 1; rmSt <= rmAm.length - 1; rmSt++) {
                            
                            if (rmSt < rmMax) {
                                listAmeni += '<div class="col-6"><p class="view-info-text text-black">'+
                                    '<i class="fa fa-check mr-2 text-green"></i> ' + rmAm[rmSt].Name +
                                                           ' </p></div>';
                            }
                        }

                        var opt = '';
                        var ob = 1;
                        for (ob = 1; ob <= rooms[i].Available; ob++) {
                            if (ob == 1) {
                                opt += '<option selected value="' + ob + '">' + ob + '</option>';
                            } else {
                                opt += '<option  value="' + ob + '">' + ob + '</option>';
                            }
                           
                        }
                        var rmView = '';
                        if (rooms[i].RoomView !== ""){
                            rmView = '<div id="room-view" class="hotel-address mb-1"> Room View : ' + rooms[i].RoomView + ' View</div>';
                        }
                        var rmAmenities = '<div id="room-amenities" class="hotel-address"> <div class="row">' + listAmeni + '</div> </div>';
                        var rmStr = ' <div id="hotel-room" class="bg-white p-3 mb-4 shadow br-5 col-md-12">' +
                                        '<div class="row">' +
                                            '<div class="col-md-3">' +
                                                '<div  class="row" >' +
                                                  '<div class="col-md-12 p-2 ">' + discountBanner + '<div class="rm-img-div"> <img class="book-hotel-img img-responsive" src="' + rooms[i].RoomTypeImages[0].Name + '" > </div> </div>' +
                                                  '<div class="col-md-12 p-2 "><a  onclick="viewRoomDetails(' + rooms[i].Key + ')" class="font-12 btn btn-transparent btn-block">See room details</a></div>' +
                                                 '</div>' +
                                              '</div>' +

                                               ' <div class="col-md-9">' +
                                                '<div class="row">' +
                                                   ' <div class="col-md-9 s12">' +  //hotel text
                                                      '<div id="hotel-text">' +
                                                         ' <div id="room-name" class="hotel-name mb-1">' + rooms[i].Name + '</div>' +
                                                         rmView +
                                                         ' <div id="room-offer" class="hotel-address mb-3">Room offer and conditions </div>' +
                                                         rmAmenities +
                                                       '</div>' +
                                                    '</div>' +
                                                    ' <div class="col-md-3 s12">' +  //rate
                                                        '<div id="hotel-text" class="mb-2">' + roomRateStr +
                                                        //' <div id="hotel-price" class="hotel-name">Php ' + rooms[i].Rate + ' <span class="text-small">/night</span></div>' +
                                                        //' </div>' +
                                                        //' <div id="room-offer" class="hotel-x mb-3 text-right pr-3 td-linetrough">&nbsp;Php ' + rooms[i].Rate + ' /night</div>' +
                                                        ' <div id="hotel-view" class="hotel-view  pr-3"></div>' +
                                                        '<div id="hotel-view" class="hotel-view pr-3">' +
                                                        '<div class="row mb-2">' +
                                                        '<div class="col-md-6 s12 font-14">Rooms</div>' +
                                                        '<div class="col-md-6 s12"> <select class="custom-select mr-sm-2" id="rm_' + rooms[i].Key + '">' +
                                                               opt +
                                                            '</select>' +
                                                        '</div></div><div class="row"><div class="col-md-6 s12"></div><div class="col-md-12 s12"><a href="#" onclick="onBookNow(' + rooms[i].Key + ')" class="btn btn-orange btn-block font-12"> Book Now</a></div></div></div>' +
                                                        '</div> </div>' +
                                                         '<hr />' +
                                                              '<div class="row">' +
                                                                    ' <div class="col-md-8">' +
                                                                        ' <div class="row font-14">' +
                                                                            '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-bed mr-2 text-black"></i>' + rooms[i].Beds + ' Bed</p></div>' +
                                                                            '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-shower mr-2 text-black"></i>' + rooms[i].Bathroom + 'Bath</p></div>' +
                                                                            '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-home mr-2 text-black"></i> ' + rooms[i].RoomSize + '</p></div>' +
                                                                            '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-user-friends mr-2 text-black"></i> ' + rooms[i].Accomodates + ' Guests</p></div>' +
                                                                         '</div>' +
                                                                    '</div>' +

                                                                     ' <div class="col-md-4 text-right">' +
                                                                        ' <div class="row font-14">' +
                                                                            '<div class="col text-center"><span class="text-red">' + rooms[i].Available + ' room(s) available</span></div>' +
                                                                         '</div>' +
                                                                    '</div>' +

                                                            '</div>' +
                                                        '</div>' +
                                                     '</div>' +
                                                     '</div>';
                     
                       

                        $("#hotel-rooms-container").append(rmStr);
                    });
                }

              
                //$("#ameni_Largearea").on("click", function () {
                //    clickAmenities($(this).attr("data-id"), $(this).attr("data-name"));
                //    //alert('ameni_Largearea');
                //});
                
            }
            else {
                
            }
        },
        beforeSend: function () {
            $("#hotelContainer").block({
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
            $("#hotelContainer").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });



}

//function ViewHotel(objName, obj) {
  
//    var dtcheckIn = $('#sdate').val();
//    var sp = dtcheckIn.split('-');
//    window.location.href = "/Hotel/HotelDetails?Name=" + decodeURI(objName) + "&Key=" + obj + "&location=" + _location + "&cIn=" + moment(sp[0]).format('YYYY-MM-DD') + "&cout=" + moment(sp[1]).format('YYYY-MM-DD') + "&guest=" + _guest;


//}

function clickAmenities(value, itm) {
    debugger;
    if (value != 0) {
        var result = $.grep(amenitiesCollection, function (e) { return e.Name === itm; });
        if (result.length === 0) {  // not found
            amenitiesCollection.push({
                Key: 1,
                Name: itm
            });
        }
        else {
            for (var i = 0; i < amenitiesCollection.length; i++) {
                if (amenitiesCollection[i].Name === itm) {
                    amenitiesCollection.splice(i, 1);
                    break;
                }
            }
        }
    }
    filterByAmmenities();
}

function onBookNow(rmobj) {
    debugger;
    var dtcheckIn = $('#txtsearchDateIn').val();
    var count = $('#rm_' + rmobj).val();
    var sp = dtcheckIn.split('-');

    try {
        $.ajax({
            url: window.baseUrl + "Hotel/PaymentDetails?Name=" + decodeURI(_name) + "&Key=" + _id + "&location=" + _location + "&cIn=" + moment(sp[0]).format('YYYY-MM-DD') + "&cout=" + moment(sp[1]).format('YYYY-MM-DD') + '&guest=' + _guest + '&rmId=' + rmobj + '&rmCount=' + count,
            type: "POST",
            success: function (data) {
                debugger;
                swal(
                    {
                        title: '',
                        type: 'success',
                        text: 'Great choice!',
                        //showCancelButton: false,
                        confirmButtonColor: "#d9534f",
                        backdrop: true,
                        allowOutsideClick: false,
                    }, function () {
                        window.location.href = window.baseUrl + "Hotel/BookingDetails?TdataKey=" + data + "&Name=" + decodeURI(_name) + "&Key=" + _id + "&location=" + _location + "&cIn=" + moment(sp[0]).format('YYYY-MM-DD') + "&cout=" + moment(sp[1]).format('YYYY-MM-DD') + "&guest=" + _guest + "&rmId=" + rmobj + "&rmCount=" + count;
                    });
            }
        });
    } catch (e) {
        console.log(e);
        throw e;
    }

  
   // window.location.href = "/Hotel/BookingDetails?Name=" + decodeURI(_name) + "&Key=" + _id + "&location=" + _location + "&cIn=" + moment(sp[0]).format('YYYY-MM-DD') + "&cout=" + moment(sp[1]).format('YYYY-MM-DD') + "&guest=" + _guest + "&rmId=" + rmobj + "&rmCount=" + count;

}
function viewRoomDetails(obj) {
    
    debugger;
    var postData = {
        Key : obj
    };
    $.ajax({
        url: GetRoomDetails,
        type: "POST",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (data) {
           // $('#roomInfoModal').empty();
            $('#Room-Image-Container').empty();

            var rmStr = '';
            var rmCarousel = '';
           
            if (data.Result === 0) {
              
                var y = data.Data;
                var im = y.RoomTypeImages;
                var am = y.RoomTypeAmenities;

               
                rmCarousel = '<ul class="pgwSlider">';
                           
                $.each(im, function (i) {
                    debugger;
                    var imageName = im[i].Name.split('/');
                    rmCarousel += ' <li> <a href="' + im[i].Name + '" target="_blank">' +
                                  '<img src="' + im[i].Name + '" class="img-responsive">' +
                        // '<span>img'+i+'</span>' +
                       //  '<span>img' + imageName[imageName.length-1] + '</span>' +
                              ' </a></li>';

                });
                
                rmCarousel += '</ul>';
                $('#Room-Image-Container').append(rmCarousel);
               
                $('.pgwSlider').pgwSlider({
                    displayControls: true,
                    touchControls: true,
                    autoSlide: true,
                    transitionDuration: 1000,
                    intervalDuration: 5000,
                    listPosition: 'right',
                    
                });



                $('#RoomTypeName').html(y.Name);
                $('#RoomTypeDesc').html(y.Details);
                $('#bed').html(y.Beds);
                $('#bath').html(y.Bathroom);
                $('#size').html(y.RoomSize);
                $('#guest').html(y.Accomodates);
                $('#allAmenities').empty();
                var strAmenities = '';
                var categories = [];
                $.each(am, function (i) {
                    
                    if (!categories.includes(am[i].Category)) {
                        categories.push(am[i].Category);
                    }
                  
                    //strAmenities += '<div class="row">' +
                    //    '<div class="col-12">'+
                    //        '<p class="view-info-text text-black">'+
                    //            am[i].Category
                    //            '</p>'+
                    //         '</div>';
                })

                debugger;
                var j = 0;
                var k = 0;
                var amenitiesOrder = [];
                strAmenities += '<div class="row">';
                categories = categories.sort();
                for (j = 0; j < categories.length; j++) {
                    // strAmenities += '<div class="col-12">'+
                    //strAmenities += '<div class="col-12">'+
                    //        '<p class="view-info-text text-black">'+
                    //            categories[j] +
                    //            '</p>'+
                    //         '</div>';

                    for (k = 0; k < am.length; k++) {
                        if (categories[j] === am[k].Category) {

                            amenitiesOrder.push(am[k].Name);
                            // strAmenities +=  '<div class="col-6">'+
                            //strAmenities +=  '<div class="col-4">'+
                            //                '<p class="view-info-text font-12">'+
                            //                   ' <i class="fa fa-check-circle mr-2 text-green"></i> ' + am[k].Name +
                            //                '</p>'+
                            //    '</div>';

                        }
                    }
                   

                }
                amenitiesOrder = amenitiesOrder.sort();
                for (var l = 0; l < amenitiesOrder.length; l++) {
                    strAmenities += '<div class="col-4">' +
                        '<p class="view-info-text font-12">' +
                        ' <i class="fa fa-check-circle mr-2 text-green"></i> ' + amenitiesOrder[l] +
                        '</p>' +
                        '</div>';
                }
                strAmenities += '</div>';
                $('#allAmenities').append(strAmenities);

            }
            //$('#roomInfoModal').append(rmStr);
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

    $('#modalView').modal('show');
}
function x123(){
    var stringHotel = "<div class='row hotel-container p-0 mb-5'>" +
              "  <div class='col-md-3 p-0' id='hotel-img'>" +
              " <img class='book-hotel-img img-responsive' src='#' alt='First slide'>" +
              "</div>" +
              "<div class='col-md-9 p-3'>" +
                  "<div class='row'>" +
                      "<div class='col-9 s12'>" +
                          "<div id='hotel-text'>" +
                              "<div id='hotel-name' class='hotel-name'>Mobile Group Hotel</div>" +
                              "<div id='hotel-address' class='hotel-address mb-4'>Dona Francisca subdivision, Balanga city bataan</div>" +
                          "</div>" +
                      "</div>" +

                      "<div class='col-3 s3'>" +
                          "<div id='hotel-text' class='mb-3'>" +
                              "<div id='hotel-price' class='hotel-name'>₱ 2,400 <span class='text-small'>/night</span></div>" +
                          "</div><br />" +
                          "<div id='hotel-view' class='hotel-view text-right pr-3'>" +
                              "<a href='#' class='btn btn-orange btn-block'> View Hotel</a>" +
                          "</div>" +
                      " </div>" +
                  "</div>" +
                  "<hr />" +
                  "<div class='row'>" +
                      "<div class='col-md-8'>" +
                          "<i class='fa fa-map-marker mr-2'> </i><span>7 km Distance from the City</span>" +
                      "</div>" +

                      "<div class='col-md-4 sub20-title bg-discount'>" +
                          "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                              "<div class='text-white'>" +
                                  "<span>Register to save up to </span><span class='font-weight-bold'>35%</span>" +
                              "</div>" +
                          "</a>" +
                      " </div>" +
                  "</div>" +
              "</div>" +
              " </div>";
    $("#searchHotelContainer").append(str);

}


function CheckOut(mctKey, branchKey, seatList, foodBundle, movieName, selectedMoviePrice) {
    try {
        $.ajax({
            url: window.baseUrl + "payment/PaymentDetails?mctKey=" + mctKey + "&branchKey=" + branchKey + "&seatList=" + seatList + "&foodBundle=" + foodBundle + "&movieName=" + movieName + '&moviePrice=' + selectedMoviePrice,
            type: "POST",
            success: function (data) {
               

                window.location.href = window.baseUrl + "payment/checkout?moviekey=" + data + "&mckey=" + mctKey + "&brkey=" + branchKey + "&SList=" + seatList + "&fbundle=" + foodBundle + "&mname=" + movieName + '&mprice=' + selectedMoviePrice;
            }
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

function reload() {
    var slide = $('.slider-single');
    var slideTotal = slide.length - 1;
    var slideCurrent = -1;

    function slideInitial() {
        slide.addClass('proactivede');
        setTimeout(function () {
            slideRight();
        }, 500);
    }

    function slideRight() {
        if (slideCurrent < slideTotal) {
            slideCurrent++;
        } else {
            slideCurrent = 0;
        }

        if (slideCurrent > 0) {
            var preactiveSlide = slide.eq(slideCurrent - 1);
        } else {
            var preactiveSlide = slide.eq(slideTotal);
        }
        var activeSlide = slide.eq(slideCurrent);
        if (slideCurrent < slideTotal) {
            var proactiveSlide = slide.eq(slideCurrent + 1);
        } else {
            var proactiveSlide = slide.eq(0);

        }

        slide.each(function () {
            var thisSlide = $(this);
            if (thisSlide.hasClass('preactivede')) {
                thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
            }
            if (thisSlide.hasClass('preactive')) {
                thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
            }
        });
        preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
        activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
        proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
    }

    function slideLeft() {
        if (slideCurrent > 0) {
            slideCurrent--;
        } else {
            slideCurrent = slideTotal;
        }

        if (slideCurrent < slideTotal) {
            var proactiveSlide = slide.eq(slideCurrent + 1);
        } else {
            var proactiveSlide = slide.eq(0);
        }
        var activeSlide = slide.eq(slideCurrent);
        if (slideCurrent > 0) {
            var preactiveSlide = slide.eq(slideCurrent - 1);
        } else {
            var preactiveSlide = slide.eq(slideTotal);
        }
        slide.each(function () {
            var thisSlide = $(this);
            if (thisSlide.hasClass('proactivede')) {
                thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
            }
            if (thisSlide.hasClass('proactive')) {
                thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
            }
        });
        preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
        activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
        proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
    }
    var left = $('.slider-left');
    var right = $('.slider-right');
    left.on('click', function () {
        slideLeft();
    });
    right.on('click', function () {
        slideRight();
    });
    slideInitial();

}

function getHotelAmenities() {
    amenity_category = [];
    var amenities = {
        key: [],
        name: [],
        categoryKey: [],
        categoryName: []
    }
    $.ajax({
        url: GetHotelAmenities,
        type: "POST",
        dataType: "json",
        cache: false,

        success: function (data) {

            var y = data.Data;

            $("#all").empty();
            $.each(y, function (index) {
                allAmenities.push({
                    Key: y[index].Key,
                    Name: y[index].Name,
                });
                var cleard = y[index].Name.replace(' ', '');
                $("#all").append("<div class='col-md-3 col-6'><input type=\"checkbox\" data-name='" + y[index].Name + "' name=\"" + y[index].Name + "\" id='ameni_" + cleard + "' data-id='" + y[index].Name + "' value=\"" + y[index].Name + "\" class=\"css-checkbox\" /><label for='ameni_" + cleard + "' class=\"css-label\">" + y[index].Name + "</label></div>");
                $("#ameni_" + cleard).on("click", function () {

                    clickAmenities($(this).attr("data-id"), $(this).attr("data-name"));
                });
            });
            //getHotelDetails();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}



function filterByAmmenities() {
    var hotelsearch = hotelRoomTypes;
    var filtersAmenities = [];
    for (i = 0; i < amenitiesCollection.length; i++) {
        filtersAmenities.push(amenitiesCollection[i].Name);
    }
    var loc = $('#txtLocationCity').val();
    var hotelResult = [];
    if (filtersAmenities.length != 0) {
        hotelResult = [];
        //$.each(hotelsearch, function (i) { /// loop mo ung hotels
            debugger;
           // var Amlist = hotelsearch[i].RoomTypeAmenities;   // lipat mo ung amenities ng hotels na un
            var Amlist = hotelRoomTypes;
            var hotelRoomDetails = [];
            var hotelRoomDetails1 = [];
            var hotelRoomDetails2 = [];
            var hotelRoomDetails3 = [];
            var hotelRoomDetails4 = [];
            var hotelRoomDetails5 = [];
            var hotelRoomDetails6 = [];
            var hotelRoomDetailsResult = [];
            var indicator = 1;
            var indicator1 = 1;
            var indicator2 = 0;
            var indicator3 = 3;
            $.each(filtersAmenities, function (j) {   // loop mo ung selected filters one by one

                debugger;
                //var result = "";
                //Third Filter
                if (j == 0) {
                    if (filtersAmenities[j] == 'Free cancelation') {
                        hotelResult = $.grep(Amlist, function (e) { return e.IsAllowCancellation === true; });
                        hotelRoomDetails1 = hotelResult;
                    }
                    if (filtersAmenities[j] == 'Free breakfast') {
                        hotelResult = $.grep(Amlist, function (e) { return e.Breakfast == 1; });
                        hotelRoomDetails1 = hotelResult;
                    }
                    if (filtersAmenities[j] == '2 Beds') {
                        hotelResult = $.grep(Amlist, function (e) { return e.Beds >= 2; });
                        hotelRoomDetails1 = hotelResult;
                    }
                }
                else if (j == 1){
                    if (filtersAmenities[j] == 'Free cancelation') {
                        hotelResult = $.grep(hotelRoomDetails1, function (e) { return e.IsAllowCancellation === true; });
                        hotelRoomDetails2 = hotelResult;
                    }
                    if (filtersAmenities[j] == 'Free breakfast') {
                        hotelResult = $.grep(hotelRoomDetails1, function (e) { return e.Breakfast == 1; });
                        hotelRoomDetails2 = hotelResult;
                    }
                    if (filtersAmenities[j] == '2 Beds') {
                        hotelResult = $.grep(hotelRoomDetails1, function (e) { return e.Beds >= 2; });
                        hotelRoomDetails2 = hotelResult;
                    }
                }
                else if (j == 2) {
                    if (filtersAmenities[j] == 'Free cancelation') {
                        hotelResult = $.grep(hotelRoomDetails2, function (e) { return e.IsAllowCancellation === true; });
                    }
                    if (filtersAmenities[j] == 'Free breakfast') {
                        hotelResult = $.grep(hotelRoomDetails2, function (e) { return e.Breakfast == 1; });
                    }
                    if (filtersAmenities[j] == '2 Beds') {
                        hotelResult = $.grep(hotelRoomDetails2, function (e) { return e.Beds >= 2; });
                    }
                   
                }
                hotelsearch = hotelResult;
               
        });
        hotelsearch = hotelsearch;
        //if (indicator == 1)
        //{
        //    if (hotelRoomDetails1.length == 0) {
        //        hotelsearch = [];
        //    }
        //}
        //else if (indicator <= 2) {
        //    if (hotelRoomDetails2.length == 0 || hotelRoomDetails1.length == 0) {
        //        hotelsearch = [];
        //    }
        //}
        //else if (indicator >= 3) {
        //    if (hotelRoomDetails3.length == 0 || hotelRoomDetails1.length == 0 || hotelRoomDetails2.length == 0) {
        //        hotelsearch = [];
        //    }
        //}
        
           
        
        //})

        hotelsList = []
        filterAmenitiesSelected = []
      //  hotelsList = resultData;
        ResultHotelFiltered = []

        
    }
    if (filtersAmenities.length == 0) {
        hotelResult = resultData;
        hotelsearch = hotelRoomTypes;
    }
    debugger
    if (hotelResult === null) {
        $('#resultCount').empty();
        $("#searchHotelContainer").empty();
        $('#resultCount').html('0 Result');
        var condnt = "couldn't";
        $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

    }
    if (hotelResult != null) {

        var y = (resultData);
        //var rooms = y.RoomTypes;
        var rooms = hotelsearch;
        var amenities = y.HotelAmenities;
        var policies = y.Policies;
        var hImg = y.HotelImages;
        var imgString = '';
        if (hImg.length <= 5) {
            $('#hotelimages').empty();
            if (hImg.length === 1) {
                imgString = ' <div class="carousel-item active row ">' +
                    '<div class="row">' +
                    '<div class="col-md-12 mb-3">' +
                    '<div class="card" id="carousel-img">' +
                    '  <img class="img-responsive br-5" src="' + hImg[0].Name + '"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ';
            }
            else if (hImg.length > 1) {
                imgString = ' <div class="carousel-item active row ">' +
                    '<div class="row">' +
                    '<div class="col-md-6 mb-3">' +
                    '<div class="card" id="carousel-img">' +
                    '  <img class="img-responsive br-5" src="' + hImg[0].Name + '"> ' +
                    '</div> ' +
                    '</div> ';

                var loopOther = '<div class="col-md-6 mb-3"><div  class="row">';
                var k = 0;
                for (k = 1; k <= hImg.length - 1; k++) {
                    loopOther += '<div class="col-md-6 mb-3">' +
                        '<div class="card" id="carousel-img">' +
                        '  <img class="img-responsive br-5" src="' + hImg[k].Name + '"> ' +
                        '</div> ' +
                        '</div>';

                }

                loopOther += '</div></div>';
                imgString += loopOther + '</div></div> ';

            }

            $('#hotelimages').append(imgString);
        }
        else {
            $('#hotelimages').empty();
            var maxIndx = 5;
            var slideNew = '';
            slideNew += ' <div class="carousel-item row ">' +
                '<div class="row">';
            if (hImg.length > 1) {
                imgString = ' <div class="carousel-item active row ">' +
                    '<div class="row">' +
                    '<div class="col-md-6 mb-3">' +
                    '<div class="card" id="carousel-img">' +
                    '  <img class="img-responsive br-5" src="' + hImg[0].Name + '"> ' +
                    '</div> ' +
                    '</div> ';

                var loopOther = '<div class="col-md-6 mb-3"><div  class="row">';
                var k = 0;
                for (k = 1; k <= hImg.length - 1; k++) {
                    if (k < 5) {
                        loopOther += '<div class="col-md-6 mb-3">' +
                            '<div class="card" id="carousel-img">' +
                            '  <img class="img-responsive br-5" src="' + hImg[k].Name + '"> ' +
                            '</div> ' +
                            '</div>';

                    }
                    else {
                        slideNew += '<div class="col-md-3 mb-3">' +
                            '<div class="card" id="carousel-img">' +
                            '  <img class="img-responsive br-5" src="' + hImg[k].Name + '"> ' +
                            '</div> ' +
                            '</div> ';
                    }

                }
                loopOther += '</div></div>';
                imgString += loopOther + '</div></div> ' + slideNew + '</div></div> ';
                //imgString += imgString + slideNew + '</div></div> ';


            }
            $('#hotelimages').append(imgString);
        }

        var latlng = new google.maps.LatLng(y.Latitude, y.Longitude);
        //myMarker.setPosition(latlng);
        if (y.Latitude === '0' || y.Longitude === '0') {
            latlng = new google.maps.LatLng(14.461985279254192, 120.45793347027586);
        }

        var myMarker = new google.maps.Marker({
            position: latlng,
            draggable: true
        });

        google.maps.event.addListener(myMarker, 'dragend', function (evt) {

            $("#longi").val(evt.latLng.lng());
            $("#lati").val(evt.latLng.lat());
        });


        map.setCenter(myMarker.position);
        myMarker.setMap(map);
        $('#r-available').html(rooms.length + ' room/s available');

        $("#hotel-rooms-container").empty();
        

        $("#amenities").empty();
        $.each(amenities, function (k) {

            $("#amenities").append("<div class='col-6'><p class='view-info-text  text-green'><i class='fa fa-check-circle mr-2'></i> " + amenities[k].Name + "</p></div>");

        });
        $("#listPolicies").empty();
        $.each(policies, function (k) {
            var po = policies[k].Name;
            var splt = po.split('|');
            if (splt.length > 1) {
                $.each(splt, function (k) {
                    if (splt[k] === "InfantA") {
                        $("#listPolicies").append("<li class='mb-3'>Infant guests (under 2 years of age) are not advisable to stay because baby cribs or roll-away beds are not available. However, an infant may stay with parents' bed with no additional cost.</li>");
                    } else if (splt[k] === "InfantA") {
                        $("#listPolicies").append("<li class='mb-3'>Infant guests (under 2 years of age) are not advisable to stay because baby cribs or roll-away beds are not available. However, an infant may stay with parents' bed with no additional cost.</li>");
                    } else if (splt[k] === "ChildA") {
                        $("#listPolicies").append("<li class='mb-3'>Children (2-11 years of age) can stay with parents for FREE. If you wish to request additional beds, you may directly inform the hotel upon arrival. Please note that additional charges may apply.</li>");
                    } else if (splt[k] === "ChildB") {
                        $("#listPolicies").append("<li class='mb-3'>Children (12 years of age and above) will be charged as an adult. If you wish to request additional beds, you may directly inform the hotel upon arrival. Please note that additional charges may apply.</li>");
                    }
                });
            }
            else {
                $("#listPolicies").append("<li class='mb-3'>" + policies[k].Name + "</li>");
            }


        });

        if (rooms === 0) {

            $("#hotel-rooms-container").append('<div class="col-md-12 col12 br-5 bg-white"><p class=" mt-3 text-center sub-title">No Rooms available.</p></div>');

        }
        else {
            //isLogIn = data.IsLogIn;
            
            $.each(rooms, function (i) {
                debugger;
                var rmAm = rooms[i].RoomTypeAmenities;
                var rmImg = rooms[i].RoomTypeImages;
                var discountBanner = '';
                var disPercent = parseFloat(rooms[i].DiscountPercent);
                var roomRateStr = ' <div id="hotel-price" class="hotel-name">₱ ' + formatPrice(rooms[i].Rate) + ' <span class="text-small">/night</span></div>' +
                    ' </div>' +
                    ' <div id="room-offer" class="hotel-x mb-3 text-right pr-3 td-linetrough">&nbsp;</div>';


                if (disPercent > 0 && isLogIn === true) {
                    discountBanner = ' <div class="top-left-banner">' +
                        '<span class="text-white">You have save ' + rooms[i].DiscountPercent + '%</span>' +
                        '</div>';

                    roomRateStr = ' <div id="hotel-price" class="hotel-name">₱ ' + formatPrice(rooms[i].DiscountedRate) + ' <span class="text-small">/night</span></div>' +
                        ' </div>' +
                        ' <div id="room-offer" class="hotel-x mb-3 text-right pr-3 td-linetrough">&nbsp;₱ ' + formatPrice(rooms[i].Rate) + ' /night</div>';
                }
                else if (disPercent > 0 && isLogIn === false) {
                    discountBanner = ' <div class="top-left-banner">' +
                        '<a href="#" data-toggle="modal" data-target="#modalLogin"><span class="text-white">Registered to save up to ' + rooms[i].DiscountPercent + '%</span></a>' +
                        '</div>';
                }
                var rmMax = 5;
                var rmSt = 0;
                var listAmeni = '';
                if (rooms[i].Breakfast === 1) {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                        '<i class="fa fa-check mr-2 text-green"></i> Breakfast' +
                        ' </p></div>';
                }
                else {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                        '<i class="fa fa-times mr-2 text-red"></i> Breakfast' +
                        ' </p></div>';
                }

                if (rooms[i].IsAllowCancellation) {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                        '<i class="fa fa-check mr-2 text-green"></i> Cancellation' +
                        ' </p></div>';
                }
                else {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                        '<i class="fa fa-times mr-2 text-red"></i> Cancellation' +
                        ' </p></div>';
                }
                debugger;

                //if (rmAm.length <= 1) {
                //    listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                //           '<i class=" mr-2 text-green"></i> &nbsp; ' +
                //                                  ' </p></div>';
                //}


                for (rmSt = 1; rmSt <= rmAm.length - 1; rmSt++) {

                    if (rmSt < rmMax) {
                        listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                            '<i class="fa fa-check mr-2 text-green"></i> ' + rmAm[rmSt].Name +
                            ' </p></div>';
                    }
                }

                var opt = '';
                var ob = 1;
                for (ob = 1; ob <= rooms[i].Available; ob++) {
                    if (ob == 1) {
                        opt += '<option selected value="' + ob + '">' + ob + '</option>';
                    } else {
                        opt += '<option  value="' + ob + '">' + ob + '</option>';
                    }

                }
                var rmView = '';
                if (rooms[i].RoomView !== "") {
                    rmView = '<div id="room-view" class="hotel-address mb-1"> Room View : ' + rooms[i].RoomView + ' View</div>';
                }
                var rmAmenities = '<div id="room-amenities" class="hotel-address"> <div class="row">' + listAmeni + '</div> </div>';
                var rmStr = ' <div id="hotel-room" class="bg-white p-3 mb-4 shadow br-5 col-md-12">' +
                    '<div class="row">' +
                    '<div class="col-md-3">' +
                    '<div  class="row" >' +
                    '<div class="col-md-12 p-2 ">' + discountBanner + '<div class="rm-img-div"> <img class="book-hotel-img img-responsive" src="' + rooms[i].RoomTypeImages[0].Name + '" > </div> </div>' +
                    '<div class="col-md-12 p-2 "><a  onclick="viewRoomDetails(' + rooms[i].Key + ')" class="font-12 btn btn-transparent btn-block">See room details</a></div>' +
                    '</div>' +
                    '</div>' +

                    ' <div class="col-md-9">' +
                    '<div class="row">' +
                    ' <div class="col-md-9 s12">' +  //hotel text
                    '<div id="hotel-text">' +
                    ' <div id="room-name" class="hotel-name mb-1">' + rooms[i].Name + '</div>' +
                    rmView +
                    ' <div id="room-offer" class="hotel-address mb-3">Room offer and conditions </div>' +
                    rmAmenities +
                    '</div>' +
                    '</div>' +
                    ' <div class="col-md-3 s12">' +  //rate
                    '<div id="hotel-text" class="mb-2">' + roomRateStr +
                    //' <div id="hotel-price" class="hotel-name">Php ' + rooms[i].Rate + ' <span class="text-small">/night</span></div>' +
                    //' </div>' +
                    //' <div id="room-offer" class="hotel-x mb-3 text-right pr-3 td-linetrough">&nbsp;Php ' + rooms[i].Rate + ' /night</div>' +
                    ' <div id="hotel-view" class="hotel-view  pr-3"></div>' +
                    '<div id="hotel-view" class="hotel-view pr-3">' +
                    '<div class="row mb-2">' +
                    '<div class="col-md-6 s12 font-14">Rooms</div>' +
                    '<div class="col-md-6 s12"> <select class="custom-select mr-sm-2" id="rm_' + rooms[i].Key + '">' +
                    opt +
                    '</select>' +
                    '</div></div><div class="row"><div class="col-md-6 s12"></div><div class="col-md-12 s12"><a href="#" onclick="onBookNow(' + rooms[i].Key + ')" class="btn btn-orange btn-block font-12"> Book Now</a></div></div></div>' +
                    '</div> </div>' +
                    '<hr />' +
                    '<div class="row">' +
                    ' <div class="col-md-8">' +
                    ' <div class="row font-14">' +
                    '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-bed mr-2 text-black"></i>' + rooms[i].Beds + ' Bed</p></div>' +
                    '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-shower mr-2 text-black"></i>' + rooms[i].Bathroom + 'Bath</p></div>' +
                    '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-home mr-2 text-black"></i> ' + rooms[i].RoomSize + '</p></div>' +
                    '<div class="col-3 text-center px-0"><p class="view-info-text text-black"><i class="fa fa-user-friends mr-2 text-black"></i> ' + rooms[i].Accomodates + ' Guests</p></div>' +
                    '</div>' +
                    '</div>' +

                    ' <div class="col-md-4 text-right">' +
                    ' <div class="row font-14">' +
                    '<div class="col text-center"><span class="text-red">' + rooms[i].Available + ' room(s) available</span></div>' +
                    '</div>' +
                    '</div>' +

                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $("#hotel-rooms-container").append(rmStr);
            });
            if (rooms.length == 0) {
                $("#hotel-rooms-container").empty();
                $("#hotel-rooms-container").append('<div class="col-md-12 col12 br-5 bg-white"><p class=" mt-3 text-center sub-title">No Rooms available on this room filter.</p></div>');

            }
        }

    }

}
