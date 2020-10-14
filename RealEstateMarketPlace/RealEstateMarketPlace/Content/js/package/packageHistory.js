
$(document).ready(function () {
    var url = new URL(window.location.href);
    var ref = url.searchParams.get("key");
    packageTransactionDetails(ref);

});

function packageTransactionDetails(ref) {
    var postData = {
        key: ref
    }
    $.ajax({
        url: window.location.origin + '/TransactionHistory/GetTransactionByKeyUser?key=' + ref,
        type: "POST",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            if (data.Result === 0) {
                var dataArray = data.Data;
                var pstat = '';
                if (dataArray.Isclaimed == 1) {
                    pstat = 'Claimed'
                    $('#btnvalidate').attr('hidden', true);
                }
                if (dataArray.Isclaimed == 0) {
                    pstat = 'UnClaim';
                    $('#btnvalidate').attr('hidden', false);
                }

                $("#btnvalidate").click(function () {
                    validate(dataArray.ReferenceNumber);
                });

                var pimageName = '<img class="img-responsive" src="' + dataArray.PackagesImages[0].Name + '" height="350px" ; width = "100%";style="object-fit: cover;">';
                var ref = '<b>' + dataArray.ReferenceNumber + '</b>'
                var amount = '<b>PHP ' + formatPrice(dataArray.TotalAmount) + '</b>';
                var transDate = '<b>' + moment(dataArray.TransactionDate).format('ddd MMM-DD-YYYY') + '</b>';
                var redeemStart = '<b>' + moment(dataArray.RedeemStart).format('ddd MMM-DD-YYYY') + '</b>';
                var redeemEnd = '<b>' + moment(dataArray.RedeemEnd).format('ddd MMM-DD-YYYY') + '</b>';
                var packageName = '<b>' + dataArray.PackageName + '</b>';
                var pricingOption = '<b>' + dataArray.PackageRateName + '</b>';
                var status = '<label>Status</label><br><label class="' + pstat + '"><b>' + pstat + '</b></label>';
                var packagePrice = '<b>' + formatPrice(dataArray.PackageRate) + '</b>';
                var quantity = '<b>' + dataArray.Quantity + '</b>';
                $('#amount').append(amount);
                $('#reference').append(ref);
                $('#tdate').append(transDate);
                $('#rstart').append(redeemStart);
                $('#rend').append(redeemEnd);
                $('#pname').append(packageName);
                $('#poption').append(pricingOption);
                $('#pstatus').append(status);
                $('#headPackage').append('Transaction >' + dataArray.PackageName);
                $('#quantity').append(quantity);
                $('#packagePrice').append(packagePrice);
                $('#cname').append('<b>' + dataArray.FirstName + ' ' + dataArray.LastName + '</b>');
                $('#cnumber').append('<b>' + dataArray.Contact + '</b>');
                $('#cemail').append('<b>' + dataArray.EmailAddress + '</b>');
                $('#pimage').append(pimageName);

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