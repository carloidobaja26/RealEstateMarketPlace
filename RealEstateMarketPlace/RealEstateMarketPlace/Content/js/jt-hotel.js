var _location = decodeURI(getQueryVariable("location"));
var _cIn = decodeURI(getQueryVariable("cIn"));
var _cOut = decodeURI(getQueryVariable("cout"));
var _guest = decodeURI(getQueryVariable("guest"));
var _ratefilter = 0;
var hotelCity = [];
var resultData = [];
var sortData = [];
var hAmmIndex = [];

var logInUser = false;
amenitiesCollection = [];
var allAmenities = [];
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}
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
        $('#dpGuest').val("Select");
    } else {
        var tes = res1 + ph1 + res2 + ph2;
        var result = tes.slice(0, tes.length - 1);
        $('#dpGuest').val(result);
        guest = [];
        guest.push({ "Adult": quant1.val(), "Child": quant2.val() });
    }
}

function rangePress() {
    $('#rate').val();
    $('#lblRate').html();
  
}
$(document).ready(function () {
    $("#rate").change(function () {
        var val = $('#rate').val();
        $('#lblRate').html('Rate : ' + val);
        $('#btnRate').text('₱ 0 - ' + val);
        _ratefilter = val;
    });
    $("#btnReset").click(function () {
       
        $('#lblRate').html('Rate : ' + 0);
        $('#btnRate').text('Price Range');
        $('#rate').val(0);
        _ratefilter = 0;
        $('#ulid').dropdown('dispose');

    });
    $("#btnFilter").click(function () {
        var val = $('#rate').val();
        searchHotel();
    });
    var nDates = function () {
        var x;
        $.ajax({
            url: 'Home/GetSystemDate?type=2',
            type: 'POST',
            cache: false,
            async: false,
            success: function (data) {
                x = data;
            }
        });
        return x;
    }();
 
    $('.btn-number').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        IncrementDecrement(fieldName, type);
    });
    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });


    var newDt = new Date(nDates);
    var cIn = new Date(_cIn);
    var cOut = new Date(_cOut);
    $('#sdate').daterangepicker({
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
      
        $('#sdate2').html(moment(start).format('MMM DD, YYYY') + ' - ' + moment(end).format('MMM DD, YYYY'));
 
        searchHotel();

    });
    $('#sdate2').html(moment(cIn).format('MMM DD, YYYY') + ' - ' + moment(cOut).format('MMM DD, YYYY'));
    $('#txtLocationCity').val(_location);
    $('#txtLocationCity').keypress(resizeInput).each(resizeInput);
    $('#sdate').keypress(resizeInput).each(resizeInput);
   
    var gd = _guest.split('-');
    if (gd.length == 1) {
        $('#sguest').html(gd[0] + ' Adult ');
        $('#sguest2').html(gd[0] + ' Adult ');
        $("input[name='quant[1]']").val(gd[0] - 1);
        IncrementDecrement("quant[1]", "plus");
    }
    else if (gd.length == 2) {
        $('#sguest').html(gd[0] + ' Adult, ' + gd[1] + ' child');
        $('#sguest2').html(gd[0] + ' Adult, ' + gd[1] + ' child');
        $("input[name='quant[1]']").val(gd[0] - 1);
        $("input[name='quant[2]']").val(gd[1]);
        IncrementDecrement("quant[1]", "plus");
    }
    $('#showAll').click(function () {
        $('#txtLocationCity').focus();
        $("#starHotel").css("color", "gray");
        $("#iconShowAll").css("color", "black");
        $("#starHome").css("color", "gray");
        $("#showAll").css("color", "black");
        $("#showHotels").css("color", "gray");
        $("#showHomes").css("color", "gray");
        searchHotelCity();
    });
    $('#showHotels').click(function () {
        $('#txtLocationCity').focus();
        $("#starHotel").css("color", "black");
        $("#iconShowAll").css("color", "gray");
        $("#starHome").css("color", "gray");
        $("#showAll").css("color", "gray");
        $("#showHotels").css("color", "black");
        $("#showHomes").css("color", "gray");
        searchHotelCityCategory(1);
    });
    $('#showHomes').click(function () {
        $('#txtLocationCity').focus();
        searchHotelCityCategory(2);
        $("#starHotel").css("color", "gray");
        $("#iconShowAll").css("color", "gray");
        $("#starHome").css("color", "black");
        $("#showAll").css("color", "gray");
        $("#showHotels").css("color", "gray");
        $("#showHomes").css("color", "black");
    });
    $('#searchBtn').click(function () {
        debugger;
        $('#txtLocationCity').focus();
        
        searchHotel();
        $('#sdate2').html(moment(cIn).format('MMM DD, YYYY') + ' - ' + moment(cOut).format('MMM DD, YYYY'));
    });
    $('#btnSearchHotel').click(function () {
        debugger;
        $('#txtLocationCity').focus();

        searchHotelCity();
      
    });
    
    var newDt = new Date(nDates);
    var endDt = new Date(nDates);
    endDt.setDate(newDt.getDate() + 1);
    var enddate = new Date(endDt);
    $('#txtsearchDate').daterangepicker({
        "drops": "down",
        "minDate": newDt,
        "endDate": enddate,
        //"singleDatePicker": true
    }, function (start, end, label) {

    });
    $("#btnsearchDate").click(function () {
        $('#txtsearchDate').focus();
    });
    //$('#searchLocation').empty();
    //$('#searchLocation').append('<h2 class="locations"> ' + _location + ' <span class="search-icon  bg-white text-center"><i class="fa fa-search p-2 text-orange"> </i></span> </h2>');
    getHotelCityList();
    //searchHotel();
    searchHotelCity();
    getRecommendedHotels();
    autocomplete(document.getElementById("txtLocationCity"), hotelCity);
 
    $('#btnLowestPrice').click(function () {
        $('#sortByPrice').text('Price - LowestFirst ');
        priceSort(1);
    });
    $('#btnHighestPrice').click(function () {
        $('#sortByPrice').text('Price – Highest First ');
        priceSort(2);
    });
    $('#btnMostPopular').click(function () {
        $('#sortByPrice').text('Most Popular ');
        priceSort(3);
    });
    getHotelAmenities();
});

function priceSort(priceOrder) {
    var loc = $('#txtLocationCity').val();
    $("#searchHotelContainer").empty();
    if (resultData === null) {
        var condnt = "couldn't";
        $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

    }
    else {
        sortData = '';
        if (priceOrder == 2) {
            sortData = resultData.sort((a, b) => parseFloat(b.DisplayPrice) - parseFloat(a.DisplayPrice));
        }
        else if (priceOrder == 1) {
            sortData = resultData.sort((a, b) => parseFloat(a.DisplayPrice) - parseFloat(b.DisplayPrice));
        }
        else if (priceOrder == 3) {
            sortData = resultData.sort((a, b) => parseFloat(b.NumberOfSales) - parseFloat(a.NumberOfSales));
        }
        var y = sortData;
        resultData = sortData;
        if (y.length === 0) {
            $('#resultCount').html('0 Result');
            //$("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
            var condnt = "couldn't";
            $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

        }
        else {
            // var isLogIn = data.IsLogIn;
            $('#resultCount').html(y.length + ' Result');
            $.each(y, function (i) {
                var Rms = y[i].RoomTypes;
                var hotelImg = y[i].HotelImages;
                var discountdiv = "";
                var discounted = "<div id='hotel-text' class='mb-5'><div id='hotel-price' class=' text-right pr-3 td-linetrough'> <span class='text-small'></span></div></div>";
                //if (isLogIn === false && y[i].isDiscounted === 1) {
                //    discountdiv = "<div class='col-md-4 sub20-title '>" +
                //        "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                //        "<div class='text-white font-12 bg-discount'>" +
                //        "<span>Register to save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                //        "</div>" +
                //        "</a>" +
                //        " </div>";
                //}
                //else if (isLogIn === true && y[i].isDiscounted === 1) {
                //    discounted = "<div id='hotel-text' class='mb-3'>" +
                //        "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>₱ " + y[i].DiscountedAmount + " <span class='text-small'>/night</span></div>" +
                //        "</div>";
                //    discountdiv = "<div class='col-md-4 sub20-title'>" +

                //        "<div class='text-white font-12 bg-discount'>" +
                //        "<span>Save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                //        "</div>" +

                //        " </div>";
                //}

                var stringHotel = "<div class='row hotel-container br-5 shadow p-0 mb-5'>" +
                    "  <div class='col-md-3 p-0' id='hotel-img'>" +
                    " <img class='book-hotel-img img-responsive' src='" + hotelImg[0].Name + "' alt='First slide'>" +
                    "</div>" +
                    "<div class='col-md-9 p-3'>" +
                    "<div class='row'>" +
                    "<div class='col-9 s12'>" +
                    "<div id='hotel-text'>" +
                    "<div id='hotel-name' class='hotel-name'>" + y[i].Name + "</div>" +
                    "<div id='hotel-address' class='hotel-address mb-4'>" + y[i].Address + "," + y[i].City + " " + y[i].Municipality + "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-3 s3'>" +
                    "<div id='hotel-text' class='mb-1'>" +
                    "<div id='hotel-price" + i + "' class='hotel-name text-right pr-3'>₱ " + formatPrice(y[i].DisplayPrice) + " <span class='text-small'>/night</span></div>" +
                    "</div>" + discounted +
                    //"<div id='hotel-text' class='mb-3'>" +
                    //     "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>Php " + Rms[0].Rate + " <span class='text-small'>/night</span></div>" +
                    //"</div>"+
                    "<div id='hotel-view' class='hotel-view text-right pr-3'>" +
                    "<a href='#' onclick=ViewHotel('" + encodeURIComponent(y[i].Name) + "','" + y[i].Key + "')  class='btn btn-orange btn-block font-12'> View Hotel</a>" +
                    "</div>" +
                    " </div>" +
                    "</div>" +
                    "<hr />" +
                    "<div class='row'>" +
                    "<div class='col-md-8'>" +
                    "<i class='fa fa-map-marker mr-2'> </i><span>7 km Distance from the City</span>" +
                    "</div>" + discountdiv +

                    //"<div class='col-md-4 sub20-title bg-discount'>" +
                    //    "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                    //        "<div class='text-white'>" +
                    //            "<span>Register to save up to </span><span class='font-weight-bold'>35%</span>" +
                    //        "</div>" +
                    //    "</a>" +
                    //" </div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#searchHotelContainer").append(stringHotel);
                if (y[i].DisplayPrice == 0) {
                    $("#hotel-price" + i + "").attr("hidden", true);
                }

            });
        }
    }
     
    
}

function clickAmenities(value, itm) {
    if (value != 0) {
        var result = $.grep(amenitiesCollection, function (e) { return e.Name === itm; });

        if (result.length === 0) {  // not found
            amenitiesCollection.push({

                Key: 0,
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

function searchHotel() {
    'use strict'
  
    var loc = $('#loc').val();
    var selDates = $('#sdate').val();
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
        location: loc,
        RoomRate: _ratefilter,
        hotelKey: 0

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
                var y = data.Data;

                if (y.length === 0) {
                    $('#resultCount').html('0 Result');
                    $("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
                }
                else
                {
                    var isLogIn = data.IsLogIn;
                    $('#resultCount').html(y.length + ' Result');
                

                    $.each(y, function (i) {

                        var Rms = y[i].RoomTypes;
                        var hotelImg = y[i].HotelImages;
                        var discountdiv = "";
                        var discounted = "<div id='hotel-text' class='mb-5'><div id='hotel-price' class=' text-right pr-3 td-linetrough'> <span class='text-small'></span></div></div>";
                        if (isLogIn === false && y[i].isDiscounted === 1) {
                            discountdiv = "<div class='col-md-4 sub20-title '>" +
                                           "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                                               "<div class='text-white font-12 bg-discount'>" +
                                                   "<span>Register to save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                                               "</div>" +
                                           "</a>" +
                                       " </div>";
                        }
                        else if (isLogIn === true && y[i].isDiscounted === 1) {
                           
                            discounted = "<div id='hotel-text' class='mb-3'>" +
                                                "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>₱ " + y[i].DiscountedAmount + " <span class='text-small'>/night</span></div>" +
                                           "</div>";
                            discountdiv = "<div class='col-md-4 sub20-title'>" +

                                               "<div class='text-white font-12 bg-discount'>" +
                                                   "<span>Save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                                               "</div>" +

                                       " </div>";
                        }

                        var stringHotel = "<div class='row hotel-container br-5 shadow p-0 mb-5'>" +
                               "  <div class='col-md-3 p-0' id='hotel-img'>" +
                               " <img class='book-hotel-img img-responsive' src='" + hotelImg[0].Name + "' alt='First slide'>" +
                               "</div>" +
                               "<div class='col-md-9 p-3'>" +
                                   "<div class='row'>" +
                                       "<div class='col-9 s12'>" +
                                           "<div id='hotel-text'>" +
                                               "<div id='hotel-name' class='hotel-name'>" + y[i].Name + "</div>" +
                                               "<div id='hotel-address' class='hotel-address mb-4'>" + y[i].Address + "," + y[i].City + " " + y[i].Municipality + "</div>" +
                                           "</div>" +
                                       "</div>" +

                                       "<div class='col-3 s3'>" +
                                           "<div id='hotel-text' class='mb-1'>" +
                                               "<div id='hotel-price' class='hotel-name text-right pr-3'>₱ " + formatPrice(y[i].Rate) + " <span class='text-small'>/night</span></div>" +
                                           "</div>" + discounted +
                                           //"<div id='hotel-text' class='mb-3'>" +
                                           //     "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>Php " + Rms[0].Rate + " <span class='text-small'>/night</span></div>" +
                                           //"</div>"+
                                           "<div id='hotel-view' class='hotel-view text-right pr-3'>" +
                                               "<a href='#' onclick=ViewHotel('" + encodeURIComponent(y[i].Name) + "','" + y[i].Key + "')  class='btn btn-orange btn-block font-12'> View Hotel</a>" +
                                           "</div>" +
                                       " </div>" +
                                   "</div>" +
                                   "<hr />" +
                                   "<div class='row'>" +
                                       "<div class='col-md-8'>" +
                                           "<i class='fa fa-map-marker mr-2'> </i><span>7 km Distance from the City</span>" +
                                       "</div>" + discountdiv +

                                       //"<div class='col-md-4 sub20-title bg-discount'>" +
                                       //    "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                                       //        "<div class='text-white'>" +
                                       //            "<span>Register to save up to </span><span class='font-weight-bold'>35%</span>" +
                                       //        "</div>" +
                                       //    "</a>" +
                                       //" </div>" +
                                   "</div>" +
                               "</div>" +
                               "</div>";

                        $("#searchHotelContainer").append(stringHotel);
                    });
                }
                

            }
            else {
                $('#resultCount').html('0 Result');
                $("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
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



function searchHotelCity() {
    'use strict'
    var loc = $('#txtLocationCity').val();
    var selDates = $('#txtsearchDate').val();
    var dateArray = selDates.split('-');
    var cIn = new Date(dateArray[0]);
    var cOut = new Date(dateArray[1]);

    //var adult = guest[0].Adult;
    //var child = guest[0].Child;
    $('#sdate2').html(moment(cIn).format('MMM DD, YYYY') + ' - ' + moment(cOut).format('MMM DD, YYYY'));
    var postData = {
        //Adult: adult,
        //CheckIn: moment(cIn).format('YYYY-MM-DD'),
        //CheckOut: moment(cOut).format('YYYY-MM-DD'),
        //Child: child,
        location: loc,
        //RoomRate: _ratefilter,
        //hotelKey: 0

    };

    $.ajax({
        url: HotelSearchCity,
        type: "POST",
        dataType: "json",
        cache: false,
        data: postData,
        success: function (data) {
            debugger;
            resultData = [];
            resultData = data.Data;
            $("#searchHotelContainer").empty();
            if (data.Result === 0) {
                var y = data.Data;
                resultData = '';
                resultData = data.Data;
                //sortData = resultData.sort((a, b) => parseFloat(b.DisplayPrice) - parseFloat(a.DisplayPrice));
                if (y.length === 0) {
                    $('#resultCount').html('0 Result');
                    //$("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
                    var condnt = "couldn't";
                    $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

                }
                else {
                    var isLogIn = data.IsLogIn;
                    logInUser = isLogIn;
                    $('#resultCount').html(y.length + ' Result');
                    $.each(y, function (i) {
                        var Rms = y[i].RoomTypes;
                        var hotelImg = y[i].HotelImages;
                        var discountdiv = "";
                        //y.DisplayPrice = formatPrice(y[i].DisplayPrice);
                        //if (y.DisplayPrice == 0) {
                        //    y.DisplayPrice = '';
                        //}
                        
                        var discounted = "<div id='hotel-text' class='mb-5'><div id='hotel-price' class=' text-right pr-3 td-linetrough'> <span class='text-small'></span></div></div>";
                        if (isLogIn === false && y[i].isDiscounted === 1) {
                            discountdiv = "<div class='col-md-4 sub20-title '>" +
                                "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                                "<div class='text-white font-12 bg-discount'>" +
                                "<span>Register to save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                                "</div>" +
                                "</a>" +
                                " </div>";
                        }
                        else if (isLogIn === true && y[i].isDiscounted === 1) {
                            discounted = "<div id='hotel-text' class='mb-3'>" +
                                "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>₱ " + y[i].DiscountedAmount + " <span class='text-small'>/night</span></div>" +
                                "</div>";
                            discountdiv = "<div class='col-md-4 sub20-title'>" +

                                "<div class='text-white font-12 bg-discount'>" +
                                "<span>Save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                                "</div>" +

                                " </div>";
                        }
                        else if (y[i].DisplayPrice == 0) {
                            discountdiv = "<div class='col-md-4 sub20-title '>" +
                                // "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                                "<div class='text-danger font-14'>" +
                                "<span>Reservation currently not available.</span>" +
                                "</div>" +
                                // "</a>" +
                                "</div>";
                        }
                        var stringHotel = "<div class='row hotel-container br-5 shadow p-0 mb-5'>" +
                            "  <div class='col-md-3 p-0' id='hotel-img'>" +
                            " <img class='book-hotel-img img-responsive' src='" + hotelImg[0].Name + "' alt='First slide'>" +
                            "</div>" +
                            "<div class='col-md-9 p-3'>" +
                            "<div class='row'>" +
                            "<div class='col-9 s12'>" +
                            "<div id='hotel-text'>" +
                            "<div id='hotel-name' class='hotel-name'>" + y[i].Name + "</div>" +
                            "<div id='hotel-address' class='hotel-address mb-4'>" + y[i].Address + "," + y[i].City + " " + y[i].Municipality + "</div>" +
                            "</div>" +
                            "</div>" +
                            "<div class='col-3 s3'>" +
                            "<div id='hotel-text' class='mb-1'>" +
                            "<div id='hotel-price" + i + "' class='hotel-name text-right pr-3'>₱ " + formatPrice(y[i].DisplayPrice) + " <span class='text-small'>/night</span></div>" +
                            "</div>" + discounted +
                            //"<div id='hotel-text' class='mb-3'>" +
                            //     "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>Php " + Rms[0].Rate + " <span class='text-small'>/night</span></div>" +
                            //"</div>"+
                            "<div id='hotel-view' class='hotel-view text-right pr-3'>" +
                            "<a href='#' onclick=ViewHotel('" + encodeURIComponent(y[i].Name) + "','" + y[i].Key + "')  class='btn btn-orange btn-block font-12'> View Hotel</a>" +
                            "</div>" +
                            " </div>" +
                            "</div>" +
                            "<hr />" +
                            "<div class='row'>" +
                            "<div class='col-md-8'>" +
                            "<i class='fa fa-map-marker mr-2'> </i><span>7 km Distance from the City</span>" +
                            "</div>" + discountdiv +

                            //"<div class='col-md-4 sub20-title bg-discount'>" +
                            //    "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                            //        "<div class='text-white'>" +
                            //            "<span>Register to save up to </span><span class='font-weight-bold'>35%</span>" +
                            //        "</div>" +
                            //    "</a>" +
                            //" </div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";
                       
                        $("#searchHotelContainer").append(stringHotel);
                        if (y[i].DisplayPrice == 0 ) {
                            $("#hotel-price" + i + "").attr("hidden", true);
                           
                        }
                        
                    });
                }
              
            }
            else {
                $('#resultCount').html('0 Result');
                //$("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
                var condnt = "couldn't";
                $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

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

function searchHotelCityCategory(category) {
    'use strict'
    var loc = $('#txtLocationCity').val();
    //var selDates = $('#sdate').val();
    //var dateArray = selDates.split('-');
    //var cIn = new Date(dateArray[0]);
    //var cOut = new Date(dateArray[1]);

    //var adult = guest[0].Adult;
    //var child = guest[0].Child;

    var postData = {
        //Adult: adult,
        //CheckIn: moment(cIn).format('YYYY-MM-DD'),
        //CheckOut: moment(cOut).format('YYYY-MM-DD'),
        //Child: child,
        location: loc,
        category: category,
        //hotelKey: 0

    };

    $.ajax({
        url: HotelSearchCityCategory,
        type: "POST",
        dataType: "json",
        cache: false,
        data: postData,
        success: function (data) {
            debugger;
            resultData = [];
            resultData = data.Data;
            $("#searchHotelContainer").empty();
            if (data.Result === 0) {
                var y = data.Data;
                resultData = [];
                resultData = data.Data;
                if (y.length === 0) {
                    $('#resultCount').html('0 Result');
                    //$("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
                    var condnt = "couldn't";
                    $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

                }
                else {
                    var isLogIn = data.IsLogIn;
                    $('#resultCount').html(y.length + ' Result');
                    $.each(y, function (i) {
                        var Rms = y[i].RoomTypes;
                        var hotelImg = y[i].HotelImages;
                        var discountdiv = "";
                        //y.DisplayPrice = formatPrice(y[i].DisplayPrice);
                        //if (y.DisplayPrice == 0) {
                        //    y.DisplayPrice = '';
                        //}

                        var discounted = "<div id='hotel-text' class='mb-5'><div id='hotel-price' class=' text-right pr-3 td-linetrough'> <span class='text-small'></span></div></div>";
                        if (isLogIn === false && y[i].isDiscounted === 1) {
                            discountdiv = "<div class='col-md-4 sub20-title '>" +
                                "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                                "<div class='text-white font-12 bg-discount'>" +
                                "<span>Register to save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                                "</div>" +
                                "</a>" +
                                " </div>";
                        }
                        else if (y[i].DisplayPrice == 0) {
                            discountdiv = "<div class='col-md-4 sub20-title '>" +
                                // "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                                "<div class='text-danger font-14'>" +
                                "<span>Reservation currently not available.</span>" +
                                "</div>" +
                                // "</a>" +
                                "</div>";
                        }
                        else if (isLogIn === true && y[i].isDiscounted === 1) {
                            discounted = "<div id='hotel-text' class='mb-3'>" +
                                "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>₱ " + y[i].DiscountedAmount + " <span class='text-small'>/night</span></div>" +
                                "</div>";
                            discountdiv = "<div class='col-md-4 sub20-title'>" +

                                "<div class='text-white font-12 bg-discount'>" +
                                "<span>Save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                                "</div>" +

                                " </div>";
                        }

                        var stringHotel = "<div class='row hotel-container br-5 shadow p-0 mb-5'>" +
                            "  <div class='col-md-3 p-0' id='hotel-img'>" +
                            " <img class='book-hotel-img img-responsive' src='" + hotelImg[0].Name + "' alt='First slide'>" +
                            "</div>" +
                            "<div class='col-md-9 p-3'>" +
                            "<div class='row'>" +
                            "<div class='col-9 s12'>" +
                            "<div id='hotel-text'>" +
                            "<div id='hotel-name' class='hotel-name'>" + y[i].Name + "</div>" +
                            "<div id='hotel-address' class='hotel-address mb-4'>" + y[i].Address + "," + y[i].City + " " + y[i].Municipality + "</div>" +
                            "</div>" +
                            "</div>" +

                            "<div class='col-3 s3'>" +
                            "<div id='hotel-text' class='mb-1'>" +
                            "<div id='hotel-price' class='hotel-name text-right pr-3'>₱ " + formatPrice(y[i].DisplayPrice) + " <span class='text-small'>/night</span></div>" +
                            "</div>" + discounted +
                            //"<div id='hotel-text' class='mb-3'>" +
                            //     "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>Php " + Rms[0].Rate + " <span class='text-small'>/night</span></div>" +
                            //"</div>"+
                            "<div id='hotel-view' class='hotel-view text-right pr-3'>" +
                            "<a href='#' onclick=ViewHotel('" + encodeURIComponent(y[i].Name) + "','" + y[i].Key + "')  class='btn btn-orange btn-block font-12'> View Hotel</a>" +
                            "</div>" +
                            " </div>" +
                            "</div>" +
                            "<hr />" +
                            "<div class='row'>" +
                            "<div class='col-md-8'>" +
                            "<i class='fa fa-map-marker mr-2'> </i><span>7 km Distance from the City</span>" +
                            "</div>" + discountdiv +

                            //"<div class='col-md-4 sub20-title bg-discount'>" +
                            //    "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                            //        "<div class='text-white'>" +
                            //            "<span>Register to save up to </span><span class='font-weight-bold'>35%</span>" +
                            //        "</div>" +
                            //    "</a>" +
                            //" </div>" +
                            "</div>" +
                            "</div>" +
                            "</div>";

                        $("#searchHotelContainer").append(stringHotel);
                        if (y[i].DisplayPrice == 0 || y[i].DisplayPrice == "0" || y[i].DisplayPrice == '0') {
                            $("#hotel-price").attr("hidden", true);
                        }

                    });
                }


            }
            else {
                $('#resultCount').html('0 Result');
               // $("#searchHotelContainer").append('<p class="text-center sub-title">No Hotels available.</p>');
                var condnt = "couldn't";
                $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

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
            //if (category == 2) {
            //    $('#showHotels').addClass('red');
            //}
            //else if (category == 1) {
            //    $('#showHomes').addClass('red');
            //}
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });



}

function ViewHotel(objName, obj) {
    debugger;
    //var dtcheckIn = $('#sdate').val();
    //var local = $('#loc').val();

    var dtcheckIn = $('#txtsearchDate').val();
    var local = $('#txtLocationCity').val();

    var sp = dtcheckIn.split('-');
    window.location.href = window.baseUrl + "Hotel/HotelDetails?Name=" + decodeURI(objName) + "&Key=" + obj + "&location=" + local + "&cIn=" + moment(sp[0]).format('YYYY-MM-DD') + "&cout=" + moment(sp[1]).format('YYYY-MM-DD') + "&guest=" + _guest;


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



function getHotelCityList() {
    $.ajax({
        url: HotelCityList,   // getproducts   getpromosandevents
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            debugger;
            var x = data.Data;
            var opt = '';
            // initiate loading promos and events
            $.each(x, function (index) {
                opt += '<option data-tokens="' + x[index].City + '">' + x[index].City + '</option>'
                hotelCity.push(x[index].City);
            });
            //$('#txtLocationCity').append(opt);
            //// initiate loading of carousel
            //$(function () {
            //    $('.selectpicker').selectpicker('refresh');
            //});


        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function getRecommendedHotels() {
    'use strict';
    $.ajax({
        url: HotelRecommended,   // getproducts   getpromosandevents
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            debugger;
            var x = data.Data;
            // initiate loading promos and events
            $.each(x, function (index) {
               
                // $('#destination').append('<img id="ns_1"  class="trigger-alert responsive-img z-depth-1" src="http://www.robinsonsmovieworld.com/BookingCms/Images/230x333-LION KING_636987940791795096.jpg"/>');
                $('#destination').append('<div class="text-over"><img src="' + x[index].HotelImages[0].Name + '" href="#" style="cursor:pointer" class="trigger-alert pm_' + index + ' responsive-img"/><h5 class="center-align"><span>' + x[index].Name + '</span></h5><h6 class="center-align"><span>' + x[index].Municipality + ',' + x[index].City + '</span></h6></div>');
                // poster mouseover function
                $('.pm_' + index).mouseover(function () {
                    $('#destination').slick('slickNext');
                });

                $('.pm_' + index).on('click', function () {
                    $('#destination-view').empty();

                    $('.iziModal-header-title').empty();
                    $('.iziModal-header-title').append(x[index].Name);
                    $('#destination-view').empty();

                    var modalView = '<div class="row">' +
                        '<div class="destination-img-container col-md-4 p-0" >' +
                        '<img src="' + x[index].Image + '" class="img-responsive"/>' +
                        '</div>' +
                        '<div class="col-md-8 mt-3">' +
                        '<span class="f-title text-black">' + x[index].Name + '</span>' +
                        '<br />' +
                        '<span class="font-12">' + x[index].Municipality + ', ' + x[index].City + '</span>' +
                        '<br /><br />' +
                        '<p>' + x[index].Description + '</p>' +
                        '</div>' +
                        '</div>';

                    $('#destination-view').append(modalView);
                });
                // initiate modal
                $(document).on('click', '.trigger-alert', function (event) {
                    event.preventDefault();
                    $('#modal-alert').iziModal('open');
                });
            });
            // initiate loading of carousel
            $('#destination').slick({
                dots: true,
                arrows: false,
                speed: 1000,
                slidesToShow: 4, //4
                slidesToScroll: 1,
                infinite: true,

                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 585,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    }
                ]
            });

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });


}


function filterByAmmenities() {
    var hotelsearch = resultData;
    var filtersAmenities = [];
    for (i = 0; i < amenitiesCollection.length; i++) {
        filtersAmenities.push(amenitiesCollection[i].Name);
    }
    var loc = $('#txtLocationCity').val();
    var hotelResult = [];
    
    if (filtersAmenities.length != 0) {
        hotelResult = [];
        $.each(hotelsearch, function (i) { /// loop mo ung hotels
            debugger;
            var Amlist = hotelsearch[i].HotelAmenities;   // lipat mo ung amenities ng hotels na un
            var indicator = 1;
            $.each(filtersAmenities, function (j) {   // loop mo ung selected filters one by one
                debugger;
                var result = $.grep(Amlist, function (e) { return e.Name == filtersAmenities[j]; });
                if (result.length > 0) {
                    //var hotelexists = $.grep(hotelResult, function (e) { return e.Key == hotelsearch[i].Key; });  // check mmo if nageexists na ung hotel na ito sa result array

                    //if (hotelexists.length > 0) { // nageexist na or na iadd mo na before sa result array
                    //    //alert('meron na skip add');
                    //}
                    //else {
                    //    hotelResult.push(hotelsearch[i]); // ipush mo sa result array
                    //}


                    var hotelexists = $.grep(hotelResult, function (e) { return e.Key == hotelsearch[i].Key; });

                    if (hotelexists.length > 0) {
                        if (indicator == 0) {
                            hotelResult.splice(-1, 1)
                        }
                    }
                    else {
                        if (indicator != 0) {
                            hotelResult.push(hotelsearch[i]); // ipush mo sa result array
                        }
                        if (indicator == 0) {
                            hotelResult.splice(-1, 1)
                        }
                       
                    }

                }
                else {
                    indicator = 0;
                    //hotelResult.push(hotelsearch[i]); // ipush mo sa result array
                   
                }
            });

        })

        hotelsList = []
        filterAmenitiesSelected = []
        hotelsList = resultData;
        ResultHotelFiltered = []

        $.each(hotelsList, function (i) {
            var HotelamenitiesList = hotelsList[0].HotelAmenities; //< --- lipat mo ung array amenities mo;
            $.each(filterAmenitiesSelected, function (j) {
                var result = $.grep(HotelamenitiesList, function (e) { return e.Name == filterAmenitiesSelected[j]; });
            });

        })
    }
    else {
        hotelResult = resultData;
    }
    debugger
    if (hotelResult === null) {
        $('#resultCount').empty();
        $("#searchHotelContainer").empty();
        $('#resultCount').html('0 Result');
        var condnt = "couldn't";
        $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

    }
    if (hotelResult !== null)
    {
        var y = (hotelResult);
        $("#searchHotelContainer").empty();
        if (y.length === 0) {
            $('#resultCount').html('0 Result');
            var condnt = "couldn't";
            $("#searchHotelContainer").append('<p class="text-center sub-title pt-2 bg-noHotels">Sorry, we ' + condnt + ' find any properties in "' + loc + '" on our site. </p>');

        }
        else {
            // var isLogIn = data.IsLogIn;
            var isLogIn = logInUser;
            
            $('#resultCount').html(y.length + ' Result');
            $.each(y, function (i) {
                var Rms = y[i].RoomTypes;
                var hotelImg = y[i].HotelImages;
                var discountdiv = "";
                var discounted = "<div id='hotel-text' class='mb-5'><div id='hotel-price' class=' text-right pr-3 td-linetrough'> <span class='text-small'></span></div></div>";
                if (isLogIn === false && y[i].isDiscounted === 1) {
                    discountdiv = "<div class='col-md-4 sub20-title '>" +
                        "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                        "<div class='text-white font-12 bg-discount'>" +
                        "<span>Register to save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                        "</div>" +
                        "</a>" +
                        " </div>";
                }
                else if (isLogIn === true && y[i].isDiscounted === 1) {
                    discounted = "<div id='hotel-text' class='mb-3'>" +
                        "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>₱ " + y[i].DiscountedAmount + " <span class='text-small'>/night</span></div>" +
                        "</div>";
                    discountdiv = "<div class='col-md-4 sub20-title'>" +

                        "<div class='text-white font-12 bg-discount'>" +
                        "<span>Save up to </span><span class='font-weight-bold'>" + y[i].DiscountPercentage + "%</span>" +
                        "</div>" +

                        " </div>";
                }

                if (y[i].DisplayPrice == 0) {
                    discountdiv = "<div class='col-md-4 sub20-title '>" +
                        // "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                        "<div class='text-danger font-14'>" +
                        "<span>Reservation currently not available.</span>" +
                        "</div>" +
                        // "</a>" +
                        "</div>";
                }
                var stringHotel = "<div class='row hotel-container br-5 shadow p-0 mb-5'>" +
                    "  <div class='col-md-3 p-0' id='hotel-img'>" +
                    " <img class='book-hotel-img img-responsive' src='" + hotelImg[0].Name + "' alt='First slide'>" +
                    "</div>" +
                    "<div class='col-md-9 p-3'>" +
                    "<div class='row'>" +
                    "<div class='col-9 s12'>" +
                    "<div id='hotel-text'>" +
                    "<div id='hotel-name' class='hotel-name'>" + y[i].Name + "</div>" +
                    "<div id='hotel-address' class='hotel-address mb-4'>" + y[i].Address + "," + y[i].City + " " + y[i].Municipality + "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-3 s3'>" +
                    "<div id='hotel-text' class='mb-1'>" +
                    "<div id='hotel-price" + i + "' class='hotel-name text-right pr-3'>₱ " + formatPrice(y[i].DisplayPrice) + " <span class='text-small'>/night</span></div>" +
                    "</div>" + discounted +
                    //"<div id='hotel-text' class='mb-3'>" +
                    //     "<div id='hotel-price' class=' text-right pr-3 td-linetrough'>Php " + Rms[0].Rate + " <span class='text-small'>/night</span></div>" +
                    //"</div>"+
                    "<div id='hotel-view' class='hotel-view text-right pr-3'>" +
                    "<a href='#' onclick=ViewHotel('" + encodeURIComponent(y[i].Name) + "','" + y[i].Key + "')  class='btn btn-orange btn-block font-12'> View Hotel</a>" +
                    "</div>" +
                    " </div>" +
                    "</div>" +
                    "<hr />" +
                    "<div class='row'>" +
                    "<div class='col-md-8'>" +
                    "<i class='fa fa-map-marker mr-2'> </i><span>7 km Distance from the City</span>" +
                    "</div>" + discountdiv +

                    //"<div class='col-md-4 sub20-title bg-discount'>" +
                    //    "<a href='#' data-toggle='modal' data-target='#modalLogin'>" +
                    //        "<div class='text-white'>" +
                    //            "<span>Register to save up to </span><span class='font-weight-bold'>35%</span>" +
                    //        "</div>" +
                    //    "</a>" +
                    //" </div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#searchHotelContainer").append(stringHotel);
                if (y[i].DisplayPrice == 0) {
                    $("#hotel-price" + i + "").attr("hidden", true);
                }

            });
        }
    }
   
}

