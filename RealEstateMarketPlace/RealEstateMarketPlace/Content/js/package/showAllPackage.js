
var url = new URL(window.location.href);
var ref = url.searchParams.get("search");

$(document).ready(function () {
    if (ref != null && ref != '') {
        searchBar(ref);
    }
    else if (ref == '') {
        packageShowAll();
    }
    else {
        packageShowAll();
    }
    //packageShowAll();
    $('#searchPackage').bind("enterKey", function (e) {
        var search = $('#searchPackage').val();
        if (search != null && search != '') {
            searchBar(search);
        }
        else if (search == '') {
            $("#noDataFound").attr("hidden", true);
            packageShowAll();
        }
        else {
            searchBar(search);
        }
      
    });
    $('#searchPackage').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
   
});

function addEmailSubsribe() {
    var name = $("#subscribeEmail").val();
    var postData = {
        Email: name,
    }
    debugger;
    $.ajax({
        url: AddEmailSubsribe,
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

function packageShowAll() {
    $.ajax({
        url: GetActivePackageList,
        type: 'Get',
        data: 'json',
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                $("#packageTodaysDeal").empty();
                var opt = '';
                var dataArray = response.Data;
                datapackage = dataArray;
                for (i = 0; i < dataArray.length; i++) {
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    //if (dataArray[i].Name.length >= 52) {
                    //    dataArray[i].Name = dataArray[i].Name.substring(0, 52) + '...';
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

                    //const heart = document.getElementById('' + dataArray[i].Key + '');
                    //heart.addEventListener('click', function () {
                    //    heart.classList.toggle('red');
                    //    bl = !$(".package-heart.red").is(":visible");
                    //    if (bl) {
                    //        alert('ssss');
                    //    }
                    //    else {
                    //        alert('ttt');
                    //    }
                    //});

                    //$("#").click(function () {
                    //    $("#target").click();
                    //});
                }
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#showAll").html(opt);
                $(".hover-class").hover(function () {
                    $(this).toggleClass("card");
                });
                $(".package-heart").click(function () {
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
                        text: response.Message,
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

function searchBar(search) {
    var key = 0;
    var postData = {
        category: key,
        txtLocation: search
    }
    $.ajax({
        url: GetActivePackageListSearch,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                $("#noDataFound").attr("hidden", true);
                $("#showAll").empty();
                var opt = '';
                var dataArray = response.Data;
                datapackage = dataArray;
                for (i = 0; i < dataArray.length; i++) {
                    $('#searchDataResult' + dataArray[i].PackageCategoryKey + '').empty();
                    //if (dataArray[i].Name.length >= 50) {
                    //    dataArray[i].Name = dataArray[i].Name.substring(0, 50) + '...';
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
                var tpackage = ' <p class="my-3">Total Packages: <span>' + dataArray.length + '</span></p>';
                $("#tpackage").append(tpackage);
                $("#showAll").html(opt);
                $(".hover-class").hover(function () {
                    $(this).toggleClass("card");
                });
                $(".hover-class").hover(function () {
                    $(this).toggleClass("card");
                });
                $(".package-heart").click(function () {
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
            else if (response.Message == "No Data Found") {
                $("#noDataFound").attr("hidden", false);
                packageShowAll();
            }
            else {
                swal(
                    {
                        title: '',
                        type: 'error',
                        text: response.Message,
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

function addFavorites(Id,Status) {
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