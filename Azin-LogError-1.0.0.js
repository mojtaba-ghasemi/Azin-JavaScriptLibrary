function logError(filename , functionName , msgtitle ,  msg) {
 
    var error = msgtitle + " . " + msg;

    var _inputstream = "";
    _inputstream = "FileName" + _streamItemSep + filename;
    _inputstream += _streamPartSep + "FunctionName" + _streamItemSep + functionName;
    _inputstream += _streamPartSep + "Message" + _streamItemSep + error;

    $.post(StaticMethodServerUrl, { serviceName: "Com_ClientLogError", inputstream: _inputstream }, function() {

    });
}

