$(document).ready(function () {
    getSuccessTransaction();
});

function getSuccessTransaction() {
    $.ajax({
        url: SucessTransaction,
        type: "POST",
        //dataType: "json",
        //data: postData,
        cache: false,
        success: function (data) {
            debugger;
            if (data.Result === 0) {
                var y = data.Data;
                $('#CongratsName').html('<b>Congratulations, ' + y.Guest.FirstName + '!</b>');
                $('#compName').text('' + y.HotelName +'');
                $('#compAdd').text('' + y.HotelAddress +'');
                $('#compCont').text('Phone: ' + y.HotelContact +'');
                $('#compEmail').text('Email: ' + y.HotelEmail +'');
                $('#refNo').text('Booking Code: ' + y.ReferenceNumber + '');
                $('#fullName').text('' + y.Guest.FirstName + ' ' + y.Guest.LastName + '');
                $('#chkIn').text('' + moment(y.CheckInDate).format('dddd YYYY MMM DD') + '');
                $('#chkOut').text('' + moment(y.CheckOutDate).format('dddd YYYY MMM DD') + '');
                $('#totalDays').text('' + y.TotalDays + '');
                $('#totalGuest').text('' + y.TotalGuest + '');
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
                $('#roomSummary').html(y.RoomType + ' ( ' + y.NumberOfRoom + ' x ' + y.TotalDays + ' night/s )');
                totalRoomPrice = parseFloat(y.TotalDays) * parseFloat(y.Rate);
                $('#roomPriceSummary').html(accounting.formatMoney(totalRoomPrice, ' ', 2, ',', '.') + ' Php');
                $('#otherChargers').html(accounting.formatMoney(y.ConvenienceCharge, ' ', 2, ',', '.') + ' Php');
                $('#total').html(accounting.formatMoney(y.TotalRate, ' ', 2, ',', '.') + ' Php');
            }



        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });

}