
var url = new URL(window.location.href);
var ref = url.searchParams.get("key");
$(document).ready(function () {

    getPackageByKey(ref);
    recommendPackage();

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
                var optImages = '';
                var policy = dataArray.PackageHighlights;
                $.each(img, function (i) {
                    $("#packageimage").append('<div><div class="img-gallery" data-main-src="' + encodeURI(img[i].Name) + '"><a id="ns_' + i + '" href="#" class="galleryLink" data-main-src="' + encodeURI(img[i].Name) + '"></a></div></div>');
                });
                imgSrc();
                bigOnLoad();
                $('.multiple-items').slick({
                    infinite: true,
                    slidesToShow: 2
                });
                $('.galleryLink').on("click", function () {
                    debugger;
                    var a = $(this).attr("data-main-src");
                    var background = "url(" + a + ") 50% 50% no-repeat";
                    $('.img-gallery-active').css('background', background);
                });
                $("#packagename").text(dataArray.Name);
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
                        '<input type="number" value="1" min="1" max="10" step="1" id="in' + data[d].Key + '"/>' +
                        '</td>' +
                        '<td>' +
                        '<button onclick=proceed(' + data[d].Key + '); class="btn btn-block btn-primary">Buy Now!</button>' +
                        '</td>' +
                        '</tr > ';

                   rates += '<div class="col-md-12">'
                        +'<div class="row">'
                        +'<div class="col-md-6">'
                        +'<div class="row">'
                        +'<div class="col-md-12">'
                        +'<h5><b>₱ 1,200</b></h5>'
                        +'</div>'
                        +'<div class="col-md-12">'
                        +'<div class="row">'
                        +'<div class="col-md-6">'
                        +'<span class="font-10"> <strike>₱ 250.00</strike> </span>'
                        +'</div>'
                        +'<div class="col-md-6">'
                        +'<span class="font-10"> 20% OFF</span>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'<div class="col-md-2">'
                        +'<div class="row">'
                        +'<div class="col-md-12">'
                        +'<span>QTY</span>'
                        +'<input type="number" value="1" min="1" max="10" step="1" />'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'<div class="col-md-4 pt-3">'
                        +'<div class="row">'
                        +'<div class="col-md-12">'
                        +'<button class="btn btn-orange btn-block">Buy Now</button>'
                        +'</div>'
                        +'<div class="col-md-12 text-right">'
                        +'<span>100</span><span>Remaining</span>'
                        +'</div>'
                        +'</div>'
                        +'</di>'
                        +'</div>'
                        +'</div>';
                }

                $("#packagerate").html(resStr);
                $("input[type='number']").inputSpinner();

            }

            else {
                window.location.href = window.baseUrl + 'Package/Index';
            }

        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
            window.location.href = window.baseUrl + 'Package/Index';
        }
    });
}

function proceed(key) {
    var quantityData = $('#in' + key + '').val();
    window.location.href = window.baseUrl + 'Package/PaymentDetails?key=' + key + '&quantity=' + quantityData + '&packageKey=' + ref + '';
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
                for (i = 0; i < dataArray.length; i++) {
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    if (dataArray[i].Name.length >= 50) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 50) + '...';
                    }
                    if (dataArray[i].Description.length >= 100) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 100) + '...';
                    }
                    opt += '<div class="col-md-4 pt-2 pb-2">'
                        + '<a href=' + window.baseUrl + 'Package/PackageInformation?key=' + dataArray[i].Key + '>'
                        + '<div class="card">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<div class="package-image text-over">'
                        + '<img src="' + dataArray[i].PackagesImages[0].Name + '" alt="Norway" class="img-hover-opacity">'
                        + '<h7 class="center-align"><span class="text-white">CLICK POSTER TO BUY TICKETS</span></h7>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<div class="card-body">'
                        + '<div class="row">'
                        + '<div class="col-md-12 card-text-package-title">'
                        + ' <span class="sub-title-orange">' + dataArray[i].Name + '</span>'
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
                        + '<div class="col-md-12">'
                        + '<div class="text-center">'
                        + '<span class="text-orange font-20">₱ ' + formatPrice(dataArray[i].RegularPrice) + '</span>'
                        + ' </div>'
                        + ' </div>'
                        + '</div>'
                        + ' </div>'
                        + ' </div>'
                        + '</div>'
                        + ' </div>'
                        + '</a>'
                        + '</div>';
                }
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#recommendpackages").html(opt);
                //$('.deletethis').on("click", function () {
                //    alert($('.deletethis').attr("id"));

                //});

            }
            else {
                window.location.href = window.baseUrl + 'Package/Index';
            }
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
