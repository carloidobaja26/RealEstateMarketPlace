
var url = new URL(window.location.href);
var ref = url.searchParams.get("key");
var pkey = '';
var qData = '';
$(document).ready(function () {

    getPackageByKey(ref);
    recommendPackage();
    $('#guest').click(function () {
        $('#logIn').modal('hide');
        $('#termsGuest').modal('show');
    });
    $('#guestCont').click(function () {
        window.location.href = window.baseUrl + 'Package/Checkout?key=' + pkey + '&quantity=' + qData + '&packageKey=' + ref + '';
    });
});



function getPackageByKey(key) {
    var postData = { packageKey: key };
    $.ajax({
        url: GetPackageByKey,
        type: "POST",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                var dataArray = response.Data;
                var img = dataArray.PackagesImages;

                var blogo = '<img class="rounded-circle img-fluid img-responsive" src="' + dataArray.BusinessLogo + '" alt="Avatar" style="height: 90px;width: 110px;">';
                $("#businessLogo").append(blogo);
                var optImages = '';
                var policy = dataArray.PackageHighlights;
                $.each(img, function (i) {
                    $("#packageimage").append('<div><div class="img-gallery" data-main-src="' + encodeURI(img[i].Name) + '"><a id="ns_' + i + '" href="#" class="galleryLink" data-main-src="' + encodeURI(img[i].Name) + '"></a></div></div>');
                });
                imgSrc();
                bigOnLoad();
                $('.multiple-items').slick({
                    infinite: true,
                    slidesToShow: 3
                });
                $('.galleryLink').on("click", function () {
                    debugger;
                    var a = $(this).attr("data-main-src");
                    var background = "url(" + a + ") 50% 50% no-repeat";
                    $('.img-gallery-active').css('background', background);
                });
                $("#overview").text(dataArray.Overview);
                $("#terms").text(dataArray.PackageHighlights[0].Name);
                $("#packageName").html(dataArray.Name + '<span id="pheart" style="display:none;"><i class="fa fa-heart package-heart ml-5" id="'+ref+'" style="float: right;font-size: 22px;margin-right: 14px;"></i></span>');
                $("#packageprice").text('₱ ' + formatPrice(dataArray.PackageRate[0].OnlinePrice));
                $("#description").text(dataArray.Description);
                $("#businessname").text(dataArray.BusinessName);
                $("#businessaddress").text(dataArray.BusinessAddress);
                $("#businesscontact").text(dataArray.ContactNumber);
                var data = dataArray.PackageRate;
                var resStr = '';
                var rates = '';
                for (var d = 0; d < data.length; d++) {
                    resStr += '<tr>' +
                        '<td>' + data[d].Name + '</td>' +
                        '<td> ₱ ' + formatPrice(data[d].OnlinePrice) + '</td>' +
                        '<td>' +
                        '<input type="number" class="inputSpin" value="1" min="1" max="10" step="1" id="in' + data[d].Key + '"/>' +
                        '</td>' +
                        '<td>' +
                        '<button onclick=proceed(' + data[d].Key + '); class="btn btn-block btn-primary">Buy Now!</button>' +
                        '</td>' +
                        '</tr > ';
                    var publishedPrice = ((data[d].OnlinePrice * 0.15) + data[d].OnlinePrice).toFixed(2);
                    var discount = (100.00 - (((publishedPrice / data[d].RegularRate) * 100))).toFixed(2);
                    var lessPrice = (data[d].OnlinePrice - publishedPrice).toFixed(2);
                    if (data[d].Quantity == 0) {
                        data[d].Quantity = '<span class="text-darkorange-package">Unlimited</span><span></span>';
                    }
                    else if (data[d].Quantity != 0) {
                        data[d].Quantity = '<span class="text-darkorange-package">' + data[d].Quantity + '</span><span>Remaining</span>';
                    }
                    rates += '<div class="col-md-12">'
                        + '<div class="row">'
                        + '<div class="col-md-5">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<h5 class="text-darkorange-package"><b>₱ ' + (publishedPrice) + '</b></h5>'
                        + '</div>'
                        + '<div class="col-md-12">'
                        + '<div class="row">'
                        + '<div class="col-md-5">'
                        + '<span class="font-10"><strike>₱ ' + formatPrice(data[d].RegularRate) + '</strike> </span>'
                        + '</div>'
                        + '<div class="col-md-7">'
                        + '<span class="font-10 off-percent"> ' + discount + '% OFF</span>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-md-3">'
                        + '<div class="row">'
                        + '<div class="col-md-12 ml-3">'
                        + '<span>QTY</span><br>'
                        + '<input type="number" id="in' + data[d].Key + '" value="1" min="1" max="10" step="1" />'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-md-4 pt-3">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<button class="btn btn-orange btn-block"  onclick=proceed(' + data[d].Key + ');>Buy Now</button>'
                        + '</div>'
                        + '<div class="col-md-12 text-right">'
                       // + '<span>100</span><span>Remaining</span>'
                        + '' + data[d].Quantity +''
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                }

                $("#packageRate").html(rates);
                var userdId = $("#userId").val();
                //alert(userdId);
                if (userdId == 1) {
                    // $(".package-heart").hide();
                   // $("#pheart").attr('hidden', true);
                    document.getElementById('pheart').style.display = 'inline';
                    //getFavoritePackage(ref);
                    if (dataArray.PackagesFavorite[0].Status == 1) {
                        $('#' + ref + '').addClass('red');
                    }
                }
               
                //$("input[type='number']").inputSpinner();
                //$(".inputSpin").spinner();
            }

            else {
                window.location.href = window.baseUrl + 'Package/Index';
            }

        },
        beforeSend: function () {
            $("#packageDetailsContainer").block({
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
            $("#packageDetailsContainer").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            window.location.href = window.baseUrl + 'Package/Index';
        }
    });
}



function proceed(key) {
    var quantityData = $('#in' + key + '').val();
    var session = $('#userdId').val();
    pkey = key;
    qData = quantityData;
    //alert(session);
    if (session == 'no') {
        $('#logIn').modal('show');
    }
    else {
        window.location.href = window.baseUrl + 'Package/Checkout?key=' + key + '&quantity=' + quantityData + '&packageKey=' + ref + '';
    }
}

function recommendPackage() {
    $.ajax({
        url: GetRecommendPackage,
        type: 'Get',
        data: 'json',
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                $("#recommendpackages").empty();
                var opt = '';
                var dataArray = response.Data;
                datapackage = dataArray;
                var status1 = '';
                if (dataArray.length < 3) {
                    opt += '<div class ="row">';
                    $('#recommendMore').attr('hidden',true);
                }
                for (i = 0; i < dataArray.length; i++) {
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    if (dataArray[i].Name.length >= 50) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 50) + '...';
                    }
                    if (dataArray[i].Description.length >= 100) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 100) + '...';
                    }
                 
                    var publishedPrice = (dataArray[i].PackageRate[0].OnlinePrice * 0.15) + dataArray[i].PackageRate[0].OnlinePrice;
                    var discount = (100.00 - (((publishedPrice / dataArray[i].PackageRate[0].RegularRate) * 100))).toFixed(2);
                    var lessPrice = (dataArray[i].PackageRate[0].OnlinePrice - publishedPrice).toFixed(2);
                    opt += '<div class="col-md-4 pt-2 pb-2">'
                        + '<a href=' + window.baseUrl + 'Package/PackageDetails?key=' + dataArray[i].Key + '>'
                        + '<div class="hover-class">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + ' <div class="package-image">'
                        + '<img src="' + dataArray[i].PackagesImages[0].Name + '" alt="PackageImage" class="img-hover-opacity img-fluid">'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row pr-3 pl-3 pb-3 pt-2">'
                        + '<div class="col-md-12">'
                        + '<div class="row">'
                        + '<div class="col-md-12 card-text-package-title">'
                        + '<span class="sub-title-orange text-uppercase">' + dataArray[i].PackageCategoryName + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<p class="text-dark text-capitalize"><b>' + dataArray[i].Name + '</b></p>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row">'
                        + '<div class="col-md-12 card-text-package-description">'
                        + '<p class="card-text">'
                        + '' + dataArray[i].Description + ''
                        + '</p>'
                        + '</div>'
                        + '</div>'
                        + '<hr />'
                        + '<div class="row">'
                        + '<div class="col-md-7">'
                        + '<div class="text-justify">'
                        + '<span class="text-orange font-20">₱ ' + formatPrice(publishedPrice) + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="col-md-5">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<span class="off-percent font-12">' + discount + '% OFF</span>'
                        + '</div>'
                        + '<div class="col-md-12">'
                        + '<strike><span class="text-dark font-12">₱ ' + lessPrice + '</span></strike>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</a>'
                        + '</div>';
                }
                if (dataArray.length < 3) {
                    opt += '</div>';
                }
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#recommendpackages").html(opt);
                //$('.deletethis').on("click", function () {
                //    alert($('.deletethis').attr("id"));

                //});
                $(".package-heart").click(function () {
                    // alert($(this).attr("id"));
                    var id = $(this).attr("id");
                    const heart = document.getElementById('' + id + '');
                    heart.addEventListener('click', function () {
                        heart.classList.toggle('red');
                        bl = !$(".package-heart.red").is(":visible");
                        var fStatus = 0;
                        //gray
                        if (bl) {
                            id = id.substring(1);
                            fStatus = 0;
                            addFavorites(id, fStatus);
                        }
                        //red
                        else {
                            fStatus = 1;
                            id = id.substring(1);
                            addFavorites(id, fStatus);
                        }
                    });
                });
                if (dataArray.length > 2) {
                    $('.recommend').slick({
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true,
                        autoplay: false,
                        autoplaySpeed: 2000,
                        responsive: [
                            {
                                breakpoint: 1300,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinite: true,
                                    dots: true,
                                    autoplay: true,
                                    autoplaySpeed: 2000,
                                }
                            },
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    infinite: true,
                                    dots: true,
                                    autoplay: true,
                                    autoplaySpeed: 2000,
                                }
                            },
                            {

                                breakpoint: 750,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: true,
                                    autoplay: true,
                                    autoplaySpeed: 2000,
                                }

                            },
                            // You can unslick at a given breakpoint now by adding:
                            // settings: "unslick"
                            // instead of a settings object
                        ]
                    });
                }

                $(".hover-class").hover(function () {
                    $(this).toggleClass("card");
                });
            }
            else {
                window.location.href = window.baseUrl + 'Package/Index';
            }
        },
        beforeSend: function () {
            $("#packageDetailsContainer").block({
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
            $("#packageDetailsContainer").unblock();
        },
        error: function (xhr, status, error) {
            alert(error);
            window.location.href = window.baseUrl + 'Package/Index';
        }

    });
}

function packageBuy(key) {
    alert(key);
}


var formatPrice = function (n, sep, decimals) {
    sep = sep || "."; // Default to period as decimal separator
    decimals = decimals || 2; // Default to 2 decimals

    return n.toLocaleString().split(sep)[0]
        + sep
        + n.toFixed(decimals).split(sep)[1];
}

function addFavorites(Id, Status) {
    //var name = $("#subscribeEmail").val();
    var postData = {
        Id: ref,
        Status: Status,
    }
    debugger;
    $.ajax({
        url: AddFavorites,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
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
                        return false;
                    });

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
            $("#packageDetailsContainer").block({
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
            $("#packageDetailsContainer").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function getFavoritePackage(ref) {
    var postData = {
        packageKey: ref,
    }
    debugger;
    $.ajax({
        url: GetFavoritePackage,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var dataArray = data.Data;
                if (dataArray.Status == 1) {
                    
                    $('#' + ref + '').addClass('red');
                    return false;
                }
                return false;
            }
            else if (data.Result === 2) {
                return false;
            }
            else {
                return false;
            }
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}