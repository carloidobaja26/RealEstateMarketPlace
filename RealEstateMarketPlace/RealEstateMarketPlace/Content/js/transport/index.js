window.onload = function () {
    // similar behavior as clicking on a link
    window.location.href = window.baseUrl;
}


$(document).ready(function () {

    
    $("#btnsearchDate").click(function () {
        $('#txtsearchDate').focus();
    });
    $('#txtsearchDate').daterangepicker({
        "singleDatePicker": true
    });

    $('.btn-number').click(function (e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        IncrementDecrement(fieldName, type);
    });
    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });
   // OriginListing();
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
}



function OriginListing() {
    $.ajax({
        url: OriginList,
        type: "Post",
        dataType: "json",
        data: JSON.stringify(postData),
        contentType: 'application/json',
        cache: false,
        success: function (response) {
            debugger;
            if (response.Result === 0) {

                swal(
                    {
                        title: '',
                        type: 'success',
                        text: 'Profile Successfully Updated!.',
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    }, function () {
                        location.reload();
                    });
            } else {
                swal(
                    {
                        title: '',
                        type: 'info',
                        text: response.Message,
                        showCancelButton: false,
                        confirmButtonColor: "#d9534f"
                    });
                return false;
            }
        },
        beforeSend: function () {
            $("#hsearch-div").block({
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
            $("#hsearch-div").unblock();
        },
        error: function (xhr, status, error) {
            console.log('xhr:' + xhr.responseText + ', status:' + status + ', error:' + error);
        }
    });
}