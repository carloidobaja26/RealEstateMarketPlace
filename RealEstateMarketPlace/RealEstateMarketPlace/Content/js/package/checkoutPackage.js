var url = new URL(window.location.href);
var datapackage = [];
var packageRateKey = url.searchParams.get("key");
var quantity = url.searchParams.get("quantity");
var packageKey = url.searchParams.get("packageKey");
var tAmount = 0;
$(document).ready(function () {
    packageDetails(packageRateKey, quantity, packageKey);
    $("#paymentbutton").click(function () {
        createTransaction();
    });
    $('#toggle-two').bootstrapToggle({
        on: 'Yes',
        off: 'No'
    });
    
    
});

function createTransaction() {
    var lastName = $("#lastname").val();
    var firstName = $("#firstname").val();
    var email = $("#email").val();
    var contactNumer = $("#contactnumber").val();
    var middleName = "default";
    var completeAddress = $("#completeAddress").val();
    var city = $("#city").val();
    var IsPurchasedToSomeone = $("#buysomeone").val();
    if (IsPurchasedToSomeone == 'On') {
        IsPurchasedToSomeone = 1;
    }
    else if (IsPurchasedToSomeone != 'On') {
        IsPurchasedToSomeone = 0;
    }
    if (lastName == "") {
        swal(
            {
                title: '',
                type: 'error',
                text: "Please Input LastName",
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    if (firstName == "") {
        swal(
            {
                title: '',
                type: 'error',
                text: "Please Input FirstName",
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    if (email == "") {
        swal(
            {
                title: '',
                type: 'error',
                text: "Please Input Email",
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    if (contactNumer == "") {
        swal(
            {
                title: '',
                type: 'error',
                text: "Please Input Contact Number",
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    if (completeAddress == "") {
        swal(
            {
                title: '',
                type: 'error',
                text: "Please Input Complete Address",
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    if (city == "") {
        swal(
            {
                title: '',
                type: 'error',
                text: "Please Input City",
                showCancelButton: false,
                confirmButtonColor: "#d9534f"
            });
        return false;
    }
    var postData = {
        FirstName: firstName,
        LastName: lastName,
        MiddleName: middleName,
        EmailAddress: email,
        Contact: contactNumer,
        PackageKey: datapackage.Key,
        PackageRateKey: packageRateKey,
        Quantity: quantity,
        MerchantKey: datapackage.PackageMerchantKey,
        UserKey: datapackage.PackageUserKey,
        Type: datapackage.PackageCategoryKey,
        City: city,
        CompleteAddress: completeAddress,
        IsPurchasedToSomeone: IsPurchasedToSomeone,
    }
    $.ajax({
        url: CreateTransactionPackage,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var str = data.Data;
                var res = str.split("|");
                window.location.href = window.baseUrl + "PaymentGatewayDummy/PackagePaymentDummy?transactionType=2&amount=" + tAmount + "&reference=" + res[0];
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



function packageDetails(key, quantity, packageKey) {
    var postData = {
        key: key,
        packageKey: packageKey
    }
    $.ajax({
        url: GetPackageDetails,
        type: "POST",
        dataType: "json",
        data: postData,
        cache: false,
        success: function (response) {
            debugger;
            if (response.Result === 0) {
                var dataArray = response.Data;
                datapackage = dataArray;
                var tableData = '';
                $("#packagename").append('<b>' + dataArray.Name + '</b>');
                $("#description").text(dataArray.Description);
                $("#merchantinformation").text(dataArray.BusinessName);
                var totalAmount = 0;
                var rrate = 0;
                for (i = 0; i < dataArray.PackageRate.length; i++) {
                    var publishedPrice = (dataArray.PackageRate[i].OnlinePrice * 0.15) + dataArray.PackageRate[i].OnlinePrice;
                    rrate = formatPrice(dataArray.PackageRate[i].RegularRate);
                    tableData += '<tr>' +
                        '<td>' + (dataArray.PackageRate[i].Name) + '</td>' +
                        '<td>QTY(' + quantity + ')</td>' +
                        '<td class="count"> ₱ ' + formatPrice(publishedPrice * quantity) + '</td>' +
                        '</tr>';
                    totalAmount += (publishedPrice * quantity);
                   
                }
                debugger;
                var discount = (100.00 - (((publishedPrice / rrate) * 100))).toFixed(2);
                $("#discountedRate").html('Save ' + discount + '% Off');
                //var discount = (100.00 - (((publishedPrice / data[d].RegularRate) * 100))).toFixed(2);
                var imagePackage = '<img src="' + dataArray.PackagesImages[0].Name + '" class="img-fluid">'
                var vatAmount = (totalAmount / 1.12) * 0.12;
                var subTotal = totalAmount - vatAmount;
                var onlineCharge = (totalAmount * 0.15);
                //totalAmount = ((totalAmount * 0.15) + totalAmount);
                tAmount = totalAmount;
                $("#packagerate").html(tableData);
                $("#subtotal").text('₱ ' + subTotal.toFixed(2));
                $("#vat").text('₱ ' + vatAmount.toFixed(2));
                $("#totalamount").text('₱ ' + formatPrice(totalAmount));
                $("#onlinecharge").text('₱ ' + formatPrice(onlineCharge));
                $("#packageimage").html(imagePackage);
                $("#regular").html('<strike>₱ '+rrate+'</strike>');
                $("#discount").html('' + discount +'% Off');
                $("#publishedPrice").html('₱ ' + formatPrice(publishedPrice));
               
                var dateNow = new Date(Date.now());
                var dateStart = new Date(dataArray.StartDate);
                var dateEnd = new Date(dataArray.EndDate);
               
                //if (dateStart >= dateNow || dateNow >= dateEnd) {
                //    $("#paymentbutton").attr('hidden', true);

                //}
                //else {
                //    $("#paymentbutton").attr('hidden', false);
                //}

            }

            else {
                window.location.href = window.baseUrl + 'Package/Index';
            }

        },
        error: function (xhr, status, error) {
            window.location.href = window.baseUrl + 'Package/Index';
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
