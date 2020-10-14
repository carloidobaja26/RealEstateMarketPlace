
$(document).ready(function () {
   
    var amt = $('#TotalAmount').html();
    $('#TotalAmount').html(accounting.formatMoney(amt, ' ', 2, ',', '.'));

    var cIn = $('#checkIn').html();
    $('#checkIn').html(moment(cIn).format('dddd YYYY MMM DD'));
    var cOut = $('#checkOut').html();
    $('#checkOut').html(moment(cOut).format('dddd YYYY MMM DD'));

    $('#btnPaid').on('click', function (e) {

        var name = $('#accName').val();
        var number = $('#accNumber').val();
        var cvv = $('#accCVV').val();
        var yy = $('#accYYYY').val();
        var mm = $('#accMM').val();

        if (name === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Account Name is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (number === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Credit card number is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }

        if (yy === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Expiration day is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (mm === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Expiration month is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (cvv === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Credit card cvv is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        var ref = $('#txnReference').html();
        var amt = $('#TotalAmount').html();
        var pm = 'success';

        if (cvv != "123") {
            pm = "failed";
        }

        window.location.href = window.baseUrl + "Payment?Reference=" + ref + "&Amount=" + amt.trim() + "&PaymentResponse=" + pm + "&transactionType=1"; ;


    });


    $('#btnPaidTransport').on('click', function (e) {

        var name = $('#accName').val();
        var number = $('#accNumber').val();
        var cvv = $('#accCVV').val();
        var yy = $('#accYYYY').val();
        var mm = $('#accMM').val();

        if (name === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Account Name is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (number === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Credit card number is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }

        if (yy === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Expiration day is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (mm === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Expiration month is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        if (cvv === '') {
            swal(
                {
                    title: '',
                    type: 'info',
                    text: 'Credit card cvv is required.',
                    showCancelButton: false,
                    confirmButtonColor: "#d9534f"
                });
            return false;
        }
        var ref = $('#txnReference').html();
        var amt = $('#TotalAmount').html();
        var pm = 'success';

        if (cvv != "123") {
            pm = "failed";
        }

        window.location.href = window.baseUrl + "Payment/TransportTransaction?Reference=" + ref + "&Amount=" + amt.trim() + "&PaymentResponse=" + pm + "&transactionType=3";;


    });


});
