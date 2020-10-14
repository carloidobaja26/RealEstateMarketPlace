var datapackage = [];

$(document).ready(function () {
    $(".hover-class").hover(function () {
        $(this).toggleClass("card");
    });
    packageTodaysDeal();
    packageTodaysPopular();
    $('.slick-banner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    });


});

function packageTodaysDeal() {
    $.ajax({
        url: GetTodaysDealHome,
        type: 'Get',
        data: 'json',
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                $("#packageTodaysDeal").empty();
                var opt = '';
                var dataArray = response.Data;
                datapackage = dataArray;
                if (dataArray.length < 4) {
                     opt += '<div class ="row">';
                }
                for (i = 0; i < dataArray.length; i++) {
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    //if (dataArray[i].Name.length >= 51) {
                    //    dataArray[i].Name = dataArray[i].Name.substring(0, 51) + '...';
                    //}
                    //if (dataArray[i].Description.length >= 80) {
                    //    dataArray[i].Name = dataArray[i].Name.substring(0, 80) + '...';
                    //}
                    var packageCategoryName = '';
                    if (dataArray[i].PackageCategoryKey == 1002) {
                        packageCategoryName = 'TOURS';
                    }
                    if (dataArray[i].PackageCategoryKey == 1) {
                        packageCategoryName = 'Restaurant';
                    }
                    if (dataArray[i].PackageCategoryKey == 2) {
                        packageCategoryName = 'Health & Beauty';
                    }
                    if (dataArray[i].PackageCategoryKey == 3) {
                        packageCategoryName = 'Activities';
                    }
                    var publishedPrice = (dataArray[i].PackageRate[0].OnlinePrice * 0.15) + dataArray[i].PackageRate[0].OnlinePrice;
                    var discount = (100.00 - (((publishedPrice / dataArray[i].PackageRate[0].RegularRate) * 100))).toFixed(2);
                    var lessPrice = (dataArray[i].PackageRate[0].OnlinePrice - publishedPrice).toFixed(2);
                    opt += '<div class="col-md-3 pt-2 pb-2">'
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
                        + '<div class="col-md-12" style="height:56px;">'
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
                        + '<strike><span class="text-dark font-12">₱ ' + formatPrice(dataArray[i].PackageRate[0].RegularRate) + '</span></strike>'
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
                if (dataArray.length < 4) {
                    opt += '</div>';
                    $('#popularMore').attr('hidden', true);
                    $('#todaysMore').attr('hidden', true);
                }
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#packageTodaysDeal").html(opt);
               
                if (dataArray.length > 3) {
                    $('.packageListSlick').slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 4,
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
                $(".package-heart-td").click(function () {
                    // alert($(this).attr("id"));
                    var id = $(this).attr("id");
                    //alert(id);
                    const heart = document.getElementById('' + id + '');
                    heart.addEventListener('click', function () {
                        heart.classList.toggle('red');
                        bl = !$(".package-heart.red").is(":visible");
                        var fStatus = 0;
                        //gray
                        if (bl) {
                            fStatus = 0;
                            addFavorites(id, fStatus);
                        }
                        //red
                        else {
                            fStatus = 1;
                            addFavorites(id, fStatus);
                        }
                    });
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

        error: function (xhr, status, error) {
            alert(error);
        }

    });
}

function packageTodaysPopular() {
    $.ajax({
        url: GetTodaysPopularHome,
        type: 'Get',
        data: 'json',
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                $("#packageTodaysPopular").empty();
                var opt = '';
              
                var dataArray = response.Data;
                datapackage = dataArray;
                if (dataArray.length < 4) {
                    opt += '<div class ="row">';
                }
                for (i = 0; i < dataArray.length; i++) {
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    //if (dataArray[i].Name.length >= 51) {
                    //    dataArray[i].Name = dataArray[i].Name.substring(0, 51) + '...';
                    //}
                    //if (dataArray[i].Description.length >= 80) {
                    //    dataArray[i].Name = dataArray[i].Name.substring(0, 80) + '...';
                    //}
                    var packageCategoryName = '';
                    if (dataArray[i].PackageCategoryKey == 1002) {
                        packageCategoryName = 'TOURS';
                    }
                    if (dataArray[i].PackageCategoryKey == 1) {
                        packageCategoryName = 'Restaurant';
                    }
                    if (dataArray[i].PackageCategoryKey == 2) {
                        packageCategoryName = 'Health & Beauty';
                    }
                    if (dataArray[i].PackageCategoryKey == 3) {
                        packageCategoryName = 'Activities';
                    }
                    var publishedPrice = (dataArray[i].PackageRate[0].OnlinePrice * 0.15) + dataArray[i].PackageRate[0].OnlinePrice;
                    var discount = (100.00 - (((publishedPrice / dataArray[i].PackageRate[0].RegularRate) * 100))).toFixed(2);
                    var lessPrice = (dataArray[i].PackageRate[0].OnlinePrice - publishedPrice).toFixed(2);
                    opt += '<div class="col-md-3 pt-2 pb-2">'
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
                        + '<div class="col-md-12" style="height:56px;">'
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
                        + '<strike><span class="text-dark font-12">₱ ' + formatPrice(dataArray[i].PackageRate[0].RegularRate) + '</span></strike>'
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
                if (dataArray.length < 4) {
                    opt += '</div>';
                }
               
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#packageTodaysPopular").html(opt);
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
                if (dataArray.length > 3) {
                    $('.packageListSlickPopular').slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 4,
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

        error: function (xhr, status, error) {
            alert(error);
        }

    });
}


function packageList() {
    $.ajax({
        url: GetActivePackageList,
        type: 'Get',
        data: 'json',
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                $("#packageListInformation").empty();
                var opt = '';
                var dataArray = response.Data;
                datapackage = dataArray;
                for (i = 0; i < dataArray.length; i++) {
                    var opt1 = '';
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    if (dataArray[i].Name.length >= 50) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 50) + '...';
                    }
                    if (dataArray[i].Description.length >= 100) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 100) + '...';
                    }
                    var packageCategoryName = '';
                    if (dataArray[i].PackageCategoryKey == 1002) {
                        packageCategoryName = 'TOURS';
                    }
                    if (dataArray[i].PackageCategoryKey == 1) {
                        packageCategoryName = 'Restaurant';
                    }
                    if (dataArray[i].PackageCategoryKey == 2) {
                        packageCategoryName = 'Health & Beauty';
                    }
                    if (dataArray[i].PackageCategoryKey == 3) {
                        packageCategoryName = 'Activities';
                    }
                    opt1 += '<div class="col-md-4 pt-2 pb-2">'
                        + '<a href=' + window.baseUrl + 'Package/PackageInformation?key=' + dataArray[i].Key + '>'
                        + '<div class="card">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<div class="package-image text-over" '
                        + 'style="background: #000000;"> '
                        + '<img src="' + dataArray[i].PackagesImages[0].Name + '" alt="PackageImage" class="img-hover-opacity img-fluid">'
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
                    opt += '<div class="col-md-3 pt-2 pb-2">'
                        + '<a href=' + window.baseUrl + 'Package/PackageDetails?key=' + dataArray[i].Key + '>'
                        + '<div class="hover-class">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + ' <div class="package-image">'
                        + '<img src="' + dataArray[i].PackagesImages[0].Name + '" alt="PackageImage" class="img-hover-opacity img-fluid">'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row pr-3 pl-3 pb-3">'
                        + '<div class="col-md-12">'
                        + '<div class="row">'
                        + '<div class="col-md-12 card-text-package-title">'
                        + '<span class="sub-title-orange text-uppercase">' + packageCategoryName + '</span>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<p class="text-dark text-capitalize"><b>' + dataArray[0].Name + '</b></p>'                            
                        + '</div>'                               
                        + '</div>'                           
                        + '<div class="row">'                        
                        + '<div class="col-md-12 card-text-package-description">'                        
                        + '<p class="card-text">'
                        + '' + dataArray[0].Description + ''  
                        + '</p>'
                        + '</div>'                                
                        + '</div>'                           
                        + '<hr />'                        
                        + '<div class="row">'                        
                        + '<div class="col-md-7">'                        
                        + '<div class="text-justify">'                            
                        + '<span class="text-orange font-20">₱ ' + formatPrice(dataArray[i].RegularPrice) + '</span>'                                
                        + '</div>'                                    
                        + '</div>'                                
                        + '<div class="col-md-5">'                            
                        + '<div class="row">'                            
                        + '<div class="col-md-12">'                               
                        + '<div class="row">'                                    
                        + '<div class="col-md-12">'                                       
                        + '<span class="off-percent font-12">20% OFF</span>'                                           
                        + '</div>'                                                
                        + '<div class="col-md-12">'                                            
                        + '<strike><span class="text-dark font-12">₱ 450.00</span></strike>'                                           
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
                        + '</div>'       
                }
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#packageTodaysDeal").html(opt);

                if (dataArray.length > 4) {
                    $('.packageListSlick').slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 4,
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

        error: function (xhr, status, error) {
            alert(error);
        }

    });
}

function packageListSearch(txtLocation) {
    var category = $("#categoryselected").val();
    if (category === "") {
        category = 0;
    }
    var postData = {
        txtLocation: txtLocation,
        category: category
    };
    $.ajax({
        url: GetActivePackageListSearch,
        type: "Get",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (response) {
            if (response.Result === 0) {
                $("#packageListInformation").empty();
                $('#' + category + '').empty();
                var opt = '';
                var dataArray = response.Data;
                var status1 = '';
                for (i = 0; i < dataArray.length; i++) {
                    if (dataArray[i].Name.length >= 58) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 58) + '...';
                    }
                    if (dataArray[i].Description.length >= 100) {
                        dataArray[i].Name = dataArray[i].Name.substring(0, 100) + '...';
                    }
                    opt += '<div class="col-md-4 pt-2 pb-2">'
                        + '<a href=' + window.baseUrl + 'Package/PackageInformation?key=' + dataArray[i].Key + '>'
                        + '<div class="card">'
                        + '<div class="row">'
                        + '<div class="col-md-12">'
                        + '<div class="package-image text-over" '
                        + 'style="background: #000000;"> '
                        + '<img src="' + dataArray[i].PackagesImages[0].Name + '" alt="Norway" class="img-hover-opacity img-fluid">'
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
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);

                $("#packageListInformation").html(opt);

                $('#' + category + '').html(opt);
            }
            else {
                //swal(
                //    {
                //        title: '',
                //        type: 'error',
                //        text: response.Message,
                //        showCancelButton: false,
                //        confirmButtonColor: "#d9534f"
                //    }, function () {
                //        return false;
                //    });

                result = '<span>No Data Found</span>';
                $('#searchDataResult' + category + '').append(result);
                packageFilter(category);
            }
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}

function packageCategoryList() {
    $.ajax({
        url: PackageCategoryList,
        type: 'Get',
        data: 'json',
        success: function (response) {
            var dataArray = response.Data;
            var opt = '';
            var navOpt = '';
            for (i = 0; i < dataArray.length; i++) {
                // opt += '<a class="col-md-2 col-3 nav-item nav-link" href="#nav-package"   onclick=test(' + dataArray[i].Key + ')  role="tab" aria-controls="nav-profile" aria-selected="false">' + dataArray[i].Name + '</a>';
                opt += '<a class=" col-md-2 col-3 nav-item nav-link" onclick=packageFilter(' + dataArray[i].Key + ') id="nav-' + dataArray[i].Key + '-tab" data-toggle="tab" href="#nav-' + dataArray[i].Key + '" role="tab" aria-controls="nav-' + dataArray[i].Key + '" aria-selected="false">' + dataArray[i].Name + '</a>';
                navOpt += '<div class="tab-pane fade" id="nav-' + dataArray[i].Key + '" role="tabpanel" aria-labelledby="nav-' + dataArray[i].Key + '-tab">'
                    + '<div class="row"><div class="col-md-12" id="searchDataResult' + dataArray[i].Key + '"></div></div>'
                    + '<div class=row id="' + dataArray[i].Key + '">'

                    + '</div>'
                    + '</div>';
            }
            $("#nav-tab").append(opt);
            $("#nav-tabContent").append(navOpt);
        },
        error: function (xhr, status, error) {
            alert(error);
        }

    });
}

var formatPrice = function (n, sep, decimals) {
    sep = sep || "."; // Default to period as decimal separator
    decimals = decimals || 2; // Default to 2 decimals

    return n.toLocaleString().split(sep)[0]
        + sep
        + n.toFixed(decimals).split(sep)[1];
}



function packageFilter(key) {
    $('#categoryselected').val(key);
    if (key == "" || key == 0) {
        packageList();
    }

    var data = datapackage;
    var opt = '';
    $.each(data, function (i) {
        if (data[i].PackageCategoryKey == key) {

            $('#' + key + '').empty();
            if (data[i].Name.length >= 58) {
                data[i].Name = data[i].Name.substring(0, 58) + '...';
            }
            if (data[i].Description.length >= 100) {
                data[i].Name = data[i].Name.substring(0, 100) + '...';
            }
            opt += '<div class="col-md-4 pt-2 pb-2">'
                + '<a href=' + window.baseUrl + 'Package/PackageInformation?key=' + data[i].Key + '>'
                + '<div class="card">'
                + '<div class="row">'
                + '<div class="col-md-12">'
                + '<div class="package-image text-over" '
                + 'style="background: #000000;"> '
                + '<img src="' + data[i].PackagesImages[0].Name + '" alt="Image" class="img-hover-opacity img-fluid">'
                + '<h7 class="center-align"><span class="text-white">CLICK POSTER TO BUY TICKETS</span></h7>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="row">'
                + '<div class="col-md-12">'
                + '<div class="card-body">'
                + '<div class="row">'
                + '<div class="col-md-12 card-text-package-title">'
                + ' <span class="sub-title-orange">' + data[i].Name + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="row">'
                + '<div class="col-md-12 card-text-package-description">'
                + '<p class="card-text">'
                + '' + data[i].Description + ''
                + '</p>'
                + '</div>'
                + '</div>'
                + '<hr />'
                + '<div class="row">'
                + '<div class="col-md-12">'
                + '<div class="text-center">'
                + '<span class="text-orange font-20">₱ ' + formatPrice(data[i].RegularPrice) + '</span>'
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
        $('#' + key + '').html(opt);
    });

};

function addFavorites(Id, Status) {
    //var name = $("#subscribeEmail").val();
    var postData = {
        Id: Id,
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
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}
