$(document).ready(function () {
    qrGenerate();
});


function qrGenerate() {
    var qrcode = new QRCode("qrcode", { width: 200, height: 200 });
    var elText = 'TS1B6';
    qrcode.makeCode(elText);
    
}