function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("profile");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


$(document).ready(function () {

    var _source = decodeURI(getQueryVariable("keysource"));
    if (_source != "undefined") {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("profile");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(_source).style.display = "block";
        //evt.currentTarget.className += " active";

        $('.' + _source).addClass(" active");
    }
    else {
        document.getElementById("defaultOpen").click();
    }
   
});
