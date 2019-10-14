// ver 1.0.0  last version (create date: 1395/09/03)

function replaceAll(string, token, newtoken) {
    if (token != newtoken)
        while (string.indexOf(token) > -1) {
            string = string.replace(token, newtoken);
        }
    return string;
}


function replaceAllContent(string, token, newtoken) {
 
    re = new RegExp(token, "g");
    return string.replace(re, newtoken);    
}


$(document).ready(function () {
    digitControlkeyOn();
});

function digitControlkeyOn() {
    $("[ismoneyseparated]").keyup(function () { $(this).prop("value", MoneySeparate($(this).prop("value"))); });
    $("[isnumberic]").keypress(function (event) { return isNumberKey(this, event, 46) });
    $("[iszeroempty]").change(function () { if ($(this).prop("value").trim() == '') $(this).prop("value", 0) });
}


function MoneySeparate(nStr) {
    nStr = replaceAll(nStr, ',', '');
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;

}

function isNumberKey(tag, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    alert(charCode)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isNumberKey(tag, evt, exCode) {

    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == exCode)
        return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

//function RTrim(str, chTrim) {
//    str = str.trim();
//    var lastChar = str.substr(str.length - 1);
//    if (lastChar == chTrim) // remove last char
//    {
//        str = str.substr(0, str.length - 1);
//        return RTrim(str, chTrim);
//    } else {
//        return str;
//    }
//}

function RTrim(str, strTrim) {
    str = str.trim();
    var lastStr = str.substr(str.length - strTrim.length);
    if (lastStr == strTrim) // remove last char
    {
        str = str.substr(0, str.length - strTrim.length);
        return RTrim(str, strTrim);
    } else {
        return str;
    }
}

function LTrim(str, strTrim) {
    str = str.trim();
    var firstStr = str.substr(0, strTrim.length);
  
    if (firstStr == strTrim) // remove first char
    {
        str = str.substr(strTrim.length , str.length - strTrim.length);
        return LTrim(str, strTrim);
    } else {
        return str;
    }
}

//function LTrim(str, chTrim) {
//    str = str.trim();
//    var firstChar = str.charAt(0);
//    if (firstChar == chTrim) // remove first char
//    {
//        str = str.substr(1, str.length- 1);
//        return LTrim(str, chTrim);
//    } else {
//        return str;
//    }
//}

