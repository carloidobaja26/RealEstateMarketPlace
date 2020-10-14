var guest = [];
var guestA = [];
var hotelCity = [];
var originKey = 0;
var destinationKey = 0;
guest.push({ "Adult": 2, "Child": 0 });
guestA.push({ "Adult": 1, "Child": 0 });
$(function () {
    $("#modal-alert").iziModal({
        title: 'Destination',
        subtitle: '',
        theme: '',
        headerColor: '#ed741e',
        overlayColor: 'rgba(0, 0, 0, 0.8)',
        iconColor: '',
        iconClass: null,
        width: '60%',
        padding: 0,
        iframe: false,
        iframeHeight: 400,
        iframeURL: null,
        overlayClose: true,
        closeOnEscape: true,
        bodyOverflow: false,
        focusInput: true,
        autoOpen: false,
        fullscreen: true,
        openFullscreen: false,
        timeout: false,
        timeoutProgressbar: false,
        timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
        transitionInModal: 'transitionIn',
        transitionOutModal: 'transitionOut',
        transitionInOverlay: 'fadeIn',
        transitionOutOverlay: 'fadeOut',
        onOpening: function () { },
        onOpened: function () { },
        onClosing: function () { },
        onClosed: function () { }
    });

   // $("#another-modal").iziModal();

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
  

    $('.carousel').carousel({
        interval: 4000
    });
    getDestination();
    getHotelCityList();
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
    $("#btnDepartDate").click(function () {
        $('#txtDepartDate').focus();
    });
    $('#txtDepartDate').daterangepicker({
        "singleDatePicker": true
    });
    $("#btnSearchHotel").click(function () {
        debugger;
        
        var dt = $('#txtsearchDate').val();
        var dateArray = dt.split('-');
        var cIn = new Date(dateArray[0]);
        var cOut = new Date(dateArray[1]);
        var _guest = guest;
        var _location = $('#txtLocationCity').val();

        if (_location === "") {
            $('#txtLocationCity').focus();
            return false;
        }

        if (_guest.length <= 0) {
            $('#btnGuest').click();
            return false;
        }

        var guestCount = "";
        var adt = _guest[0].Adult;
        var chd = _guest[0].Child;
        var inf = _guest[0].Infant;
        if (adt == "0") {
            $('#btnGuest').click();
            return false;
        }
        guestCount = adt;
        if (chd != "0") {
            guestCount += "-" + chd;
        }

        window.location.href = window.baseUrl + "Hotel?location=" + _location + "&cIn=" + moment(cIn).format('YYYY-MM-DD') + "&cout=" + moment(cOut).format('YYYY-MM-DD') + "&guest=" + guestCount;

    });
   
    $('.search-select').click(function () {
        var search = this.innerText;
        var split = search.split('|');

        $('#txtLocationCity').val(split[0].trim());
        $('#search-result').html('');
    });
    $('#btnSearchTrips').click(function () {
        var _departDate = $('#txtDepartDate').val();
        var _guest = guestA;
        var _origin = $('#originInput').val();
        var _destination = $('#destinationInput').val();
        if (_origin === "originInput") {
            $('#originInput').focus();
            return false;
        }
        if (_destination === "") {
            $('#destinationInput').focus();
            return false;
        }
        
        if (_guest.length <= 0) {
            $('#btnGuestTransport').click();
            return false;
        }

        var guestCountA = "";
        var adt = _guest[0].Adult;
        var chd = _guest[0].Child;
        var inf = _guest[0].Infant;
        if (adt == "0") {
            $('#btnGuestTransport').click();
            return false;
        }
        guestCountA = adt;
        if (chd != "0") {
            guestCount += "-" + chd;
        }
        window.location.href = window.baseUrl + "Transport/Destination?originKey=" + originKey + "&destinationKey=" + destinationKey + "&cIn=" + moment(_departDate).format('YYYY-MM-DD') + "&guest=" + guestCountA;

    });
   // OriginListing();
    autocomplete(document.getElementById("txtLocationCity"), hotelCity);

    $('#originSearch').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
            var originValue = $('#originSearch').val();
            originNew = [];
            for (i = 0; i < originList.length; i++) {
                var routeOrigin = originList[i].Origin.toLowerCase();
                if (routeOrigin.match(originValue.toLowerCase())) {
                    var newDesinationArray = [];
                    for (j = 0; j < originList[i].DestinationList.length; j++) {
                        newDesinationArray.push({ "Id": originList[i].DestinationList[j].Id, "Destination": originList[i].DestinationList[j].Destination });
                    }
                    originNew.push({ "Id": originList[i].Id, "Origin": originList[i].Origin, "DestinationList": newDesinationArray  });
                }
            }
            var newOriginDiv = '';
            $("#originList").empty();
            debugger;
            if (originNew.length != 0) {
                for (i = 0; i < originNew.length; i++) {
                    newOriginDiv += '<div class="col-md-4 col-4 pt-2">'
                        + '<div class="row">'
                        + '<div class="col-md-12" style="min-height:50px">'
                        + '<a class="btn selectTrips originTripClass" id=""onclick="selectOrigin(\'' + originNew[i].Id + '\')">'
                        + '<div class="text-left">'
                        + '<span>' + originNew[i].Origin + '</span>'
                        + '<br />'
                        + '</div>'
                        + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                }
            }
            else {
                newOriginDiv += '<div class="col-md-12 pt-2 text-center"><h6>No Origin Found</h6></div>'
            }
            $("#originList").append(newOriginDiv);
        }
    });
    $('#destinationSearch').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
            var destinationValue = $('#destinationSearch').val();
            var destinationNew = [];
            for (i = 0; i < Odestination.length; i++) {
                var destination = Odestination[i].Destination.toLowerCase();
                if (destination.match(destinationValue.toLowerCase())) {
                    destinationNew.push({ "Id": Odestination[i].Id, "Destination": Odestination[i].Destination });
                }
            }
            var newDestinationDiv = '';
            $("#destinationDiv").empty();
            if (destinationNew.length != 0) {
                for (i = 0; i < destinationNew.length; i++) {
                    newDestinationDiv += '<div class="col-md-4 col-4 pt-2">'
                        + '<div class="row">'
                        + '<div class="col-md-12" style="min-height:50px">'
                        + '<a class="btn selectTrips" id=""onclick="selectDestination(\'' + destinationNew[i].Id + '\')">'
                        + '<div class="text-left">'
                        + '<span>' + destinationNew[i].Destination + '</span>'
                        + '<br />'
                        + '</div>'
                        + '</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                }
            }
            else {
                newDestinationDiv += '<div class="col-md-12 pt-2 text-center"><h6>No Destination Found</h6></div>'
            }
            $("#destinationDiv").append(newDestinationDiv);
        }
    });
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
        $('#btnGuest').text("2Adult");
    } else {
        var tes = res1 + ph1 + res2 + ph2;
        var result = tes.slice(0, tes.length - 1);
        $('#btnGuest').text(result);
        guest = [];
        guest.push({ "Adult": quant1.val(), "Child": quant2.val() });
    }

    var ph1A = $('#option1A').attr('placeholder') + ",";
    var ph2A = $('#option2A').attr('placeholder') + ",";
    //var ph3 = $('#option3').attr('placeholder') + ",";
    var quant1A = $("input[name='quant[1A]']");
    var quant2A = $("input[name='quant[2]']");
    //var quant3 = $("input[name='quant[3]']");
    var res1A = 0;
    var res2A = 0;
    //var res3 = 0;
    //alert(ph1 + quant1.val() + ph2 + quant2.val() + ph3 + quant3.val());
    if (quant1A.val() !== "0") {
        res1A = quant1A.val();
    }
    else {
        res1A = "";
        ph1A = "";
    }
    if (quant2A.val() !== "0") {
        res2A = quant2A.val();
    } else {
        res2A = "";
        ph2A = "";
    }
    //if (quant3.val() !== "0") {
    //    res3 = quant3.val();
    //} else {
    //    res3 = "";
    //    ph3 = "";
    //}
    if (quant1A.val() === "0" && quant2A.val() === "0") {
        guestA = [];
        $('#btnGuestTransport').text("1Passenger");
    } else {
        var tesA = res1A + ph1A + res2A + ph2A;
        var result = tesA.slice(0, tesA.length - 1);
        $('#btnGuestTransport').text(result);
        guestA = [];
        guestA.push({ "Adult": quant1A.val(), "Child": quant2A.val() });
    }
}
function getDestination() {

    'use strict';
    $.ajax({
        url: DestinationList,   // getproducts   getpromosandevents
        type: 'POST',
        dataType: 'json',
        cache: false,
        success: function (data) {
            debugger;
            var x = data.Data;
            // initiate loading promos and events
            $.each(x, function (index) {

               // $('#destination').append('<img id="ns_1"  class="trigger-alert responsive-img z-depth-1" src="http://www.robinsonsmovieworld.com/BookingCms/Images/230x333-LION KING_636987940791795096.jpg"/>');
                $('#destination').append('<div class="text-over"><img src="' + x[index].Image + '" href="#" style="cursor:pointer" class="trigger-alert pm_' + index + ' responsive-img"/><h5 class="center-align"><span>' + x[index].Name + '</span></h5><h6 class="center-align"><span>' + x[index].Municipality + ',' + x[index].City + '</span></h6></div>');
                // poster mouseover function
                $('.pm_' + index).mouseover(function () {
                    $('#destination').slick('slickNext');
                });

                $('.pm_' + index).on('click', function () {
                    $('#destination-view').empty();

                    $('.iziModal-header-title').empty();
                    $('.iziModal-header-title').append(x[index].Name);
                    $('#destination-view').empty();

                    var modalView = '<div class="row">'+
                                        '<div class="destination-img-container col-md-4 p-0" >' +
                                            '<img src="' + x[index].Image + '" class="img-responsive"/>' +
                                        '</div>'+
                                        '<div class="col-md-8 mt-3">'+
                                            '<span class="f-title text-black">' + x[index].Name + '</span>' +
                                            '<br />'+
                                            '<span class="font-12">' + x[index].Municipality + ', ' + x[index].City + '</span>' +
                                            '<br /><br />'+
                                            '<p>' + x[index].Description + '</p>' +
                                        '</div>'+
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

var originNew = [];
var newDesinationArray = [];

var Odestination = [];
function selectOrigin(Id) {
    originKey = Id;
    var destination = '';
    $('#destinationDiv').empty();
    for (i = 0; i < originList.length; i++) {
        if (Id == originList[i].Id) {
           // var newDesinationArray = [];
            for (j = 0; j < originList[i].DestinationList.length; j++) {
                Odestination.push({ "Id": originList[i].DestinationList[j].Id, "Destination": originList[i].DestinationList[j].Destination });
                destination += '<div class="col-md-4 col-4 pt-2">'
                    + '<div class="row">'
                    + '<div class="col-md-12" style="min-height:50px">'
                    + '<a class="btn selectTrips" id=""onclick="selectDestination(\'' + originList[i].DestinationList[j].Id + '\')">'
                    + '<div class="text-left">'
                    + '<span>' + originList[i].DestinationList[j].Destination + '</span>'
                    + '<br />'
                    + '</div>'
                    + '</a>'
                    + '</div>'
                    + '</div>'
                    + '</div>'
            }
            //originNew.push({ "Id": originList[i].Id, "Origin": originList[i].Origin, "DestinationList": newDesinationArray });
            $('#originInput').val(originList[i].Origin);
        }
    }

    $('#destinationDiv').append(destination);
    $('#destinationInput').val('');
    $('#modalOrigin').modal('hide')
}

function selectDestination(key) {
    for (i = 0; i < Odestination.length; i++) {
        if (Odestination[i].Id == key) {
            $('#destinationInput').val(Odestination[i].Destination);
        }
    }
    destinationKey = key;
    $('#modalDestination').modal('hide')
}