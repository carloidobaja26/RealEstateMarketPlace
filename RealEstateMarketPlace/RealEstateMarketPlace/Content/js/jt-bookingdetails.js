var _location = decodeURI(getQueryVariable("location"));
var _cIn = decodeURI(getQueryVariable("cIn"));
var _cOut = decodeURI(getQueryVariable("cout"));
var _guest = decodeURI(getQueryVariable("guest"));
var _name = decodeURI(getQueryVariable("Name"));
var _id = decodeURI(getQueryVariable("Key"));
var _rmid = decodeURI(getQueryVariable("rmId"));
var _count = decodeURI(getQueryVariable("rmCount"));
var adOnsTotal = 0;
var gtot = 0;
var hRequest = '';

var amenitiesCollection = [];
var allAmenities = [];
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

    verifyReservation();

    var date1 = moment(_cIn);
    var date2 = moment(_cOut);
    var diff = date2.diff(date1,'days');

    $('#bookingCheckIn').html(moment(_cIn).format('dddd YYYY MMM DD'));
    $('#bookingCheckOut').html(moment(_cOut).format('dddd YYYY MMM DD'));
    $('#bookingStay').html(diff + ' nights');
    retrieveHotelInformation(_id);
    retrieveRoomInformation(_rmid);

    $('#btnProceedtoPayment').on('click', function (e) {
       
        var $form = $("#bookingForm");
        $form.validate({
            rules: {
                guestFName: {
                    required: true,
                    minlength: 2,
                },
                guestLName: {
                    required: true,
                    minlength: 2,
                },
                guestEmail: {
                    required: true,
                    email: true
                },
                guestContact: {
                    required: true,
                    number: true,
                    minlength: 11,
                }
            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                //txtMerchantFirstName: "Firstname is required.",
                //txtMerchantMiddleName: "Middlename is required.",
                guestEmail: "Please specify a valid email address",
                guestContact: "contact no must be at least 11 digit"
            },
            submitHandler: function () {
                debugger;
                var _tdatakey = decodeURI(getQueryVariable("TdataKey"));
                var rmName = $('#rmName').html();

                var firstname = $("#guestFName").val();
                var lastname = $("#guestLName").val();
                var email = $("#guestEmail").val();
                var mobile = $("#guestContact").val();
              
                var _hotelRequest = $('#hotelRequest').val();
                var checkbox = document.getElementById('chk_someone');
                var _terms = $('#chkTerms').is(':checked');
                var _hFname = '';
                var _hLname = '';
                var _listAdOns = '';
              
                var guestDetails = lastname + "|" + firstname + "|" + email + "|" + mobile;
                if (amenitiesCollection.length != 0) {
                    //Image += string.Join("", obj.PackagesImages[i].Name) + ",";
                    for (var i = 0; i < amenitiesCollection.length; i++) {
                        var adKey = amenitiesCollection[i].Key;
                        var adName = amenitiesCollection[i].Name;
                        var adQuantity = amenitiesCollection[i].Quantity;
                        var adPrice = amenitiesCollection[i].Price;
                        var adOns = adKey + "|" + adName + "|" + adQuantity + "|" + adPrice + "|";
                        _listAdOns += adOns + "¶";
                    }
                }
                var x = checkbox.checked;
                if (x) {
                  
                     _hFname = $('#txtHotelGuestFname').val();
                     _hLname = $('#txtHotelGuestLname').val();

                    if (_hFname === '') {
                        swal(
                            {
                               title: '',
                               type: 'info',
                               text: 'Guest First Name is required.',
                               showCancelButton: false,
                               confirmButtonColor: "#d9534f"
                            });
                        return false;
                    }
                   
                    if (_hLname === '') {
                        swal(
                            {
                                title: '',
                                type: 'info',
                                text: 'Guest Last Name is required.',
                                showCancelButton: false,
                                confirmButtonColor: "#d9534f"
                            });
                        return false;
                    }

                    guestDetails = _hLname + "|" + _hFname + "|" + email + "|" + mobile;
                }
                if (!_terms) {
                    swal(
                          {
                              title: '',
                              type: 'info',
                              text: 'Kindly read and accept Hotel Terms and Conditions.',
                              showCancelButton: false,
                              confirmButtonColor: "#d9534f"
                          });
                    return false;
                }

               

                var postData = {
                    GuestDetails: guestDetails,
                    Tdatakey: _tdatakey,
                    Name: _name,
                    Key: _id,
                    location: _location,
                    cIn: _cIn,
                    cout: _cOut,
                    guest: _guest,
                    rmId: _rmid,
                    roomName: rmName,
                    rmCount: _count,
                    Ttype: 0,
                    hotelRequest: _hotelRequest,
                    listAdOns: _listAdOns,

                };

                $.ajax({
                    url: CreateTransaction,
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

                //createtransaction

            }
        });
    });

    $('#btnReserved').on('click', function (e) {

        var $form = $("#bookingForm");
        $form.validate({
            rules: {
                guestFName: {
                    required: true,
                    minlength: 2,
                },
                guestLName: {
                    required: true,
                    minlength: 2,
                },
                guestEmail: {
                    required: true,
                    email: true
                },
                guestContact: {
                    required: true,
                    number: true,
                    minlength: 11,
                }
            },
            messages: {
                //txtMerchantLastName: "Lastname is required.",
                //txtMerchantFirstName: "Firstname is required.",
                //txtMerchantMiddleName: "Middlename is required.",
                guestEmail: "Please specify a valid email address",
                guestContact: "contact no must be at least 11 digit"
            },
            submitHandler: function () {
                debugger;
                var _tdatakey = decodeURI(getQueryVariable("TdataKey"));
                var rmName = $('#rmName').html();

                var firstname = $("#guestFName").val();
                var lastname = $("#guestLName").val();
                var email = $("#guestEmail").val();
                var mobile = $("#guestContact").val();


                var checkbox = document.getElementById('chk_someone');
                var _terms = $('#chkTerms').is(':checked');
                var _hFname = '';
                var _hLname = '';
                var guestDetails = lastname + "|" + firstname + "|" + email + "|" + mobile;
                var x = checkbox.checked;
                if (x) {

                    _hFname = $('#txtHotelGuestFname').val();
                    _hLname = $('#txtHotelGuestLname').val();

                    if (_hFname === '') {
                        swal(
                            {
                                title: '',
                                type: 'info',
                                text: 'Guest First Name is required.',
                                showCancelButton: false,
                                confirmButtonColor: "#d9534f"
                            });
                        return false;
                    }

                    if (_hLname === '') {
                        swal(
                            {
                                title: '',
                                type: 'info',
                                text: 'Guest Last Name is required.',
                                showCancelButton: false,
                                confirmButtonColor: "#d9534f"
                            });
                        return false;
                    }

                    guestDetails = _hLname + "|" + _hFname + "|" + email + "|" + mobile;
                }
                if (!_terms) {
                    swal(
                          {
                              title: '',
                              type: 'info',
                              text: 'Kindly read and accept Hotel Terms and Conditions.',
                              showCancelButton: false,
                              confirmButtonColor: "#d9534f"
                          });
                    return false;
                }


                debugger;
                var postData = {
                    GuestDetails: guestDetails,
                    Tdatakey: _tdatakey,
                    Name: _name,
                    Key: _id,
                    location: _location,
                    cIn: _cIn,
                    cout: _cOut,
                    guest: _guest,
                    rmId: _rmid,
                    roomName: rmName,
                    rmCount: _count,
                    Ttype: 1
                };

                $.ajax({
                    url: CreateTransaction,
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
                                  text: data.Message,
                                  showCancelButton: false,
                                  confirmButtonColor: "#d9534f"
                              }, function () {
                                  window.location = Home;
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

                //createtransaction

            }
        });
    });

});

function verifyReservation() {
   

   
}

function retrieveHotelInformation(obj) {
   
    var postData = {
        Key: obj
    };
    $.ajax({
        url: GetHotelDetails,
        type: "POST",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var y = data.Data;
                var policies = y.Policies;
                $('#htl-name').html(y.Name);
                $('#htl-address').text(y.Address);
                $('#htl-city').text(y.City + ' ' + y.Municipality);
                $("#isLogin").attr("hidden", false);
                if (data.IsLogIn) {
                    $("#isLogin").attr("hidden", true);
                }

                $('#htl-image-container').empty();
                $('#htl-image-container').append('<img src="' + y.HotelImages[0].Name + '" class="img-responsive htl-image" />');


                $('#hotelPolicies').empty();
              

                //$.each(policies, function (i) {
                //    $('#hotelPolicies').append('<p>' + policies[i].Name + '</p>');
                      
                //});
                $.each(policies, function (k) {
                    var po = policies[k].Name;
                    var splt = po.split('|');
                    if (splt.length > 1) {
                        $.each(splt, function (k) {
                            if (splt[k] === "InfantA") {
                                $("#hotelPolicies").append("<li class='mb-3'>Infant guests (under 2 years of age) are not advisable to stay because baby cribs or roll-away beds are not available. However, an infant may stay with parents' bed with no additional cost.</li>");
                            } else if (splt[k] === "InfantA") {
                                $("#hotelPolicies").append("<li class='mb-3'>Infant guests (under 2 years of age) are not advisable to stay because baby cribs or roll-away beds are not available. However, an infant may stay with parents' bed with no additional cost.</li>");
                            } else if (splt[k] === "ChildA") {
                                $("#hotelPolicies").append("<li class='mb-3'>Children (2-11 years of age) can stay with parents for FREE. If you wish to request additional beds, you may directly inform the hotel upon arrival. Please note that additional charges may apply.</li>");
                            } else if (splt[k] === "ChildB") {
                                $("#hotelPolicies").append("<li class='mb-3'>Children (12 years of age and above) will be charged as an adult. If you wish to request additional beds, you may directly inform the hotel upon arrival. Please note that additional charges may apply.</li>");
                            }
                        });
                    }
                    else {
                        $("#hotelPolicies").append("<li class='mb-3'>" + policies[k].Name + "</li>");
                    }


                });

            }


           
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}


function retrieveRoomInformation(obj) {
    debugger;
    var postData = {
        Key: obj
    };
    $.ajax({
        url: GetRoomDetails,
        type: "POST",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var y = data.Data;
                var rmAmenitis = y.RoomTypeAmenities;
                var rmSt = 0;
                var rmMax = 4;
                $('#rmName').html(y.Name);
                $('#rmView').html('-');
                if (y.RoomView !== '') {
                    $('#rmView').html(y.RoomView + ' View');
                }
              
                var listAmeni = '';
                $('#rmOffer').empty();
                if (y.Breakfast === 1) {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black font-12">' +
                          '<i class="fa fa-check mr-2 text-green"></i> Breakfast' +
                                                 ' </p></div>';
                }
                else {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black font-12">' +
                         '<i class="fa fa-times mr-2 text-red"></i> Breakfast' +
                                                ' </p></div>';
                }

                if (y.IsAllowCancellation) {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black font-12">' +
                          '<i class="fa fa-check mr-2 text-green"></i> Cancellation' +
                                                 ' </p></div>';
                }
                else {
                    listAmeni += '<div class="col-6"><p class="view-info-text text-black font-12">' +
                         '<i class="fa fa-times mr-2 text-red"></i> Cancellation' +
                                                ' </p></div>';
                }
                $.each(rmAmenitis, function (i) {
                    if (i < rmMax) {
                        listAmeni += '<div class="col-6"><p class="view-info-text text-black  font-12">' +
                          '<i class="fa fa-check mr-2 text-green"></i> ' + rmAmenitis[i].Name +
                                                 ' </p></div>';
                    }
                   
                });
                //for (rmSt = 1; rmSt <= rmAm.length - 1; rmSt++) {

                //  //  if (rmSt < rmMax) {
                //        listAmeni += '<div class="col-6"><p class="view-info-text text-black">' +
                //            '<i class="fa fa-check mr-2 text-green"></i> ' + rmAm[rmSt].Name +
                //                                   ' </p></div>';
                //   // }
                //}
                var date1 = moment(_cIn);
                var date2 = moment(_cOut);
                var ndates = moment(nDates);
                var diff = date1.diff(ndates, 'days');
                var diff2 = date2.diff(date1, 'days');
              
                //$('#roomSummary').html(y.Name + ' (' + _count + ' x ' + diff + ' nights)');
                if (data.IsLogIn) {
                    if (diff >= 7) {
                        $("#reservedNoticeDiv").attr("hidden", true);
                        $("#reservedDiv").attr("hidden", false);
                       // $('#resbtn').append('<button type="submit" id="btnReserved" class="btn btn-red btn-block">Reserved Booking</button>');
                    }
                    else {
                        $("#reservedDiv").attr("hidden", true);
                        $("#reservedNoticeDiv").attr("hidden", false);
                        $('#resNotice').append('<p class="text-red text-center">Reservation is only allowed 1week prior to your desired check-In date. </p>');
                    }
                    
                }
                $('#cancelPolicy').empty();
                var cancelPolicy = '';
                if (y.IsAllowCancellation === true) {
                    cancelPolicy = '<label class="sub-title">Cancellation Policy</label>'
                        + '<p>'
                        + 'Guest is allowed to cancel up to ' + y.CancellationDaysAllowed + ' days prior to check-in date with ' + y.RefundPercentage + '% refund '
                        + 'if the guest cancel less than 5 days prior to check-in date. ' + y.RefundPercentageAfter + '%  refund will be provided '
                        + '<p>';
                }
                if (y.IsAllowCancellation === false) {
                    cancelPolicy = '<label class="sub-title">Cancellation Policy</label>'
                        + '<p>'
                        + 'Cancellation is not allowed'
                        + '<p>';
                }
                $('#cancelPolicy').append(cancelPolicy);
                if (data.IsLogIn && y.DiscountPercent > 0) {
                    
                    $("#disc").attr("hidden", false);
                    $('#rmPrice').text(accounting.formatMoney(y.DiscountedRate, ' ', 2, ',', '.'));

                    $('#discountPrice').text(accounting.formatMoney(y.Rate, ' ', 2, ',', '.'));
                    $('#discountPercent').append('<span class="text-small">You save ' + y.DiscountPercent + '%</span>');

                    $('#roomSummary').html(y.Name + ' ( ' + _count + ' x ' + diff2 + ' night/s )');
                    var totalRoomPrice = parseFloat(y.DiscountedRate) * _count;
                    $('#roomPriceSummary').html(accounting.formatMoney(totalRoomPrice, ' ', 2, ',', '.') + ' Php');
                    var otherC = totalRoomPrice * .10;
                    var tot = totalRoomPrice + otherC + adOnsTotal;
                    gtot = tot;
                    $('#otherChargers').html(accounting.formatMoney(otherC, ' ', 2, ',', '.') + ' Php');
                    $('#total').html(accounting.formatMoney(tot, ' ', 2, ',', '.') + ' Php');

                } else {
                    $("#disc").attr("hidden", true);
                    $('#rmPrice').text(accounting.formatMoney(y.Rate, ' ', 2, ',', '.'));
                    $('#roomSummary').html(y.Name + ' ( ' + _count + ' x ' + diff2 + ' night/s )');
                    var totalRoomPrice = parseFloat(y.Rate) * _count;
                    $('#roomPriceSummary').html(accounting.formatMoney(totalRoomPrice, ' ', 2, ',', '.') + ' Php');
                    var otherC = totalRoomPrice * .10;
                    var tot = totalRoomPrice + otherC + adOnsTotal;
                    gtot = tot;
                    $('#otherChargers').html(accounting.formatMoney(otherC, ' ', 2, ',', '.') + ' Php');
                    $('#total').html(accounting.formatMoney(tot, ' ', 2, ',', '.') + ' Php');
                }

                $('#rmOffer').append(listAmeni);
                var date1 = moment(_cIn);
                var date2 = moment(_cOut);
                var diff = date2.diff(date1, 'days');
               
                if (y.MerchantType == 1) {
                    $("#adOnsHmsDiv").attr('hidden', false);
                    getAdOnsHms(y.HotelKey);
                }
                if (y.MerchantType == 0) {
                    $('#adOnsHmsDiv').attr('hidden', true);

                }
                
                //$('#roomSummary').html(y.Name + ' ( ' + _count + ' x ' + diff + ' night/s )');
                //var totalRoomPrice = parseFloat(y.Rate) * _count;
                //$('#roomPriceSummary').html(accounting.formatMoney(totalRoomPrice, ' ', 2, ',', '.') + ' Php');
                //var otherC = totalRoomPrice * .10;
                //var tot = totalRoomPrice + otherC;
                //$('#otherChargers').html(accounting.formatMoney(otherC, ' ', 2, ',', '.') + ' Php');
                //$('#total').html(accounting.formatMoney(tot, ' ', 2, ',', '.') + ' Php');
            }

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}

function toggleCheckbox() {
    debugger;
    var checkbox = document.getElementById('chk_someone');

  

    var x = checkbox.checked;
    if (x) {
        $("#otherGuest").attr("hidden", true);
  
    }
    else {
        $("#otherGuest").attr("hidden", false);
     
    }
}


function getAdOnsHms(hotelKey) {
    var postData = {
        hotelKey: hotelKey
    };
    $.ajax({
        url: GetAdOnsHms,
        type: "POST",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (data) {
            //debugger;
            if (data.Result === 0) {
                y = data.Data;
                if (y.length === 0) {
                    $('#adOnsHmsDiv').attr('hidden', true);
                }
                var adOns = '';
                $("#adOnsHms").empty();
                $.each(y, function (index) {
                    allAmenities.push({
                        Key: y[index].Key,
                        Name: y[index].Name,
                        Price: y[index].Price,
                        Quantity: 1
                    });
                    var cleard = y[index].Name.replace(' ', '');
                    cleard = cleard.replace(/\s/g, '')
                    adOns = '';
                    adOns += '<div class="row" >'
                        //+ '<div class="row">'
                        + '<div class="col-md-6">'
                        //+ '<input type="checkbox" data-name="Free cancelation" name="Free cancelation" id="ameni_Freecancelation" data-id="Free cancelation" value="Free cancelation" class="css-checkbox">'        
                        + '<input type="checkbox" data-name="' + y[index].Key + '"name="' + y[index].Name + '" id="adOns-' + cleard + '-' + y[index].Price + '" data-id="' + y[index].Name + '" value="' + y[index].Name + '" class="css-checkbox" />'
                        + '<label for= "ameni_' + cleard + '"class= "css-label text-dark text-capitalize ml-1"><b>' + y[index].Name + '</b></label>'
                        + '</div>'
                        + '<div class="col-md-3" hidden>'
                        + '<label>Php ' + formatPrice(y[index].Price) + '</label>'
                        + '</div>'
                        + '<div class="col-md-3">'
                        + '<input type="number" name="name" value="1" style="width:60px;font-size:12px"  id="ina' + cleard + '"/>'
                        + '</div>'
                        + '</div>';
                        
                    // $("#adOnsHms").append("<div class='col-md-3 col-6 text-capitalize'><input type=\"checkbox\" data-name='" + y[index].Name + "' name=\"" + y[index].Name + "\" id='ameni_" + cleard + "' data-id='" + y[index].Name + "' value=\"" + y[index].Name + "\" class=\"css-checkbox\" /><label for='ameni_" + cleard + "' class=\"css-label addOnsClass\">" + y[index].Name + "</label></div>");
                   
                
                    //$(".addOnsClass").click(function () {
                    //    clickAmenities($(this).attr("data-id"), $(this).attr("data-name"));
                    //});
                    $("#adOnsHms").append(adOns);
                    $('#ina' + cleard + '').keyup(function () {
                      
                        var itm = $("#adOns-" + cleard + "-" + y[index].Price).attr("data-id");
                        var val = $("#adOns-" + cleard + "-" + y[index].Price).attr("data-name");
                        var price = $("#adOns-" + cleard + "-" + y[index].Price).attr("id");
                        var quantity = $('#ina' + cleard + '').val();

                        clickAmenities(itm, val, price, quantity);
                    });
                    $("#adOns-" + cleard + "-" + y[index].Price).on("click", function () {
                     
                        var quantity = $('#ina' + cleard + '').val();
                
                        if (quantity == 0 || quantity >= 10) {
                            swal(
                                {
                                    title: '',
                                    type: 'info',
                                    text: 'Input Quantity is Not allowed!',
                                    showCancelButton: false,
                                    confirmButtonColor: "#d9534f"
                                });
                            return false;
                        }

                        clickAmenities($(this).attr("data-id"), $(this).attr("data-name"), $(this).attr("id"), quantity);

                    });
                });
                  

            }

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function clickAmenities(value, itm,price,qty) {
    debugger;

    price = price.split("-");
    price = price[price.length - 1];
    //$("#adOnsVal").val(id)
    if (value != 0) {
        var result = $.grep(amenitiesCollection, function (e) { return e.Key === itm; });
        if (result.length === 0) {  // not found
    
            amenitiesCollection.push({
                Key: itm,
                Name: value,
                Code: 'Code',
                Price: price,
                Status: 1,
                Quantity: qty,
                
            });
            //$('#addOnsModal').modal('show');
            //$("#btnAddOnsCancel").click(function () {
            //    var adOnsVal = $("#adOnsVal").val();
            //    $('#' + adOnsVal + '').prop("checked", false);
            //});
            //$("#btnAddOnsClose").click(function () {
            //    var adOnsVal = $("#adOnsVal").val();
            //    $('#' + adOnsVal + '').prop("checked", false);
            //});
            //$("#btnAddOnsConfirm").click(function () {
            //    var adOnsVal = $("#adOnsVal").val();
            //});
            AdOnsSummary();
        }
        else {
            for (var i = 0; i < amenitiesCollection.length; i++) {
                if (amenitiesCollection[i].Key === itm) {
                    amenitiesCollection.splice(i, 1);
                    break;
                }
            }
            AdOnsSummary();
        }
    }
    //filterByAmmenities();
    
}

function AdOnsSummary() {
    adOnsTotal = 0;
    if (amenitiesCollection.length != 0) {
        var adOnsPriceSum = '<div class="row"><div class="col-md-12"><label><b>Add Ons</b></label></div></div>';
        $('#adOnsSummary').empty();
        
        for (var i = 0; amenitiesCollection.length > i; i++) {
          
            var total = parseFloat(amenitiesCollection[i].Quantity) * parseFloat(amenitiesCollection[i].Price)
            adOnsPriceSum += '<div class="row">'
                + '<div class="col-7 col8">'
                + '<span class="text-capitalize">' + '' + ' (' + amenitiesCollection[i].Quantity + ' X ' + amenitiesCollection[i].Name + ')</span>'
                + '</div>'
                + '<div class="col-5 col4 font-weight-bold text-black text-right">'
                //+ '<span id="addOnsCharges" class="font-12">' + total + ' Php</span>'
                + '</div>'
                + '</div>'
            adOnsTotal += total;
        }
        $('#adOnsSummary').append(adOnsPriceSum);
       // var ototal = adOnsTotal + gtot;
       // $('#total').html(accounting.formatMoney(ototal, ' ', 2, ',', '.') + ' Php');
    }
    if (amenitiesCollection.length == 0) {
       // $('#total').html(accounting.formatMoney(gtot, ' ', 2, ',', '.') + ' Php');
        $('#adOnsSummary').empty();
    }
    hRequest = $('#hotelRequest').val();
}