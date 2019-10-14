    
function _uploadFile(inputCTL,imgLoader,imageViewer,maxSize) {
    //$('#<%= btnUpload.ClientID %>').on('click', function (e) {
    //e.preventDefault();
    var fileInput = $('#' + inputCTL);
    var fileData = fileInput.prop("files")[0];   // Getting the properties of file from file field
    if (fileData.size > maxSize) {
        alert("سایز فایل نمی تواند از "+maxSize+" بایت بیشتر باشد ");
        return;
    }
    
    if ($("#" + imgLoader) != null)
        $("#" + imgLoader).css({ visibility: "visible" });
    var formData = new window.FormData();                  // Creating object of FormData class
    formData.append("file", fileData); // Appending parameter named file with properties of file_field to form_data
    //formData.append("MethodName", "UploadFile");      // asp
    //            formData.append("user_email", email);
    $.ajax({
        //url: '../Services/CommonServices.aspx',    // asp
        url: '../FileManager/UploadFile',  // mvc
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
debugger;
            if ($("#" + imgLoader) != null)
                $("#" + imgLoader).css({ visibility: "hidden" });
            
            $("#" + inputCTL).prop("value", "");

            if ($("#" + imageViewer) != null)
                $("#" + imageViewer).attr("src", data);

            

            //            if (obj.StatusCode == "OK") {
            //                $('C\\').val(obj.ImageUploadPath);
            //                $('.result-message').html(obj.Message).show();
            //            } else if (obj.StatusCode == "ERROR") {
            //                $('.result-message').html(obj.Message).show();
            //            }
        },
        error: function (errorData) {
            $("#" + imgLoader).css({ visibility: "hidden" });
            //            $('.result-message').html("there was a problem uploading the file.").show();
        }

    });
    //      });
}
function ShowDiv(divID) {
    $("#" + divID).fadeIn("slow", function () {
        // Animation complete
    });
}
function HideDiv(divID) {
    $("#" + divID).fadeOut("slow", function () {
        // Animation complete
    });
}

function HideAndShowDiv(hidedivID , showdivID) {
    $("#" + hidedivID).fadeOut("slow", function () {
        ShowDiv(showdivID);
    });
}

function ShowWaiter(imgWait) {
    try {


        if (typeof imgWait !== typeof undefined && imgWait !== false) {


            var tag = $("#" + imgWait);
            if (tag.attr("waitingCounter") == null) {
                tag.attr("waitingCounter", 0);
            }

            var val = parseInt(tag.attr("waitingCounter"), 10) + 1;
            tag.attr("waitingCounter", val);

            tag.css({ visibility: "visible" });
        }

    } catch (e) {
        alert(e);

    } 
}

function ShowWaiterObject(imgWait) {
    var tag = $(imgWait);
    if (tag.attr("waitingCounter") == null) {
        tag.attr("waitingCounter", 0);
    }
    var val = parseInt(tag.attr("waitingCounter"), 10) + 1;
    tag.attr("waitingCounter", val);

    tag.css({ visibility: "visible" });
}

function HideWaiter(imgWait) {


    if (typeof imgWait !== typeof undefined && imgWait !== false) {

        var tag = $("#" + imgWait);
        if (tag.attr("waitingCounter") != null && parseInt(tag.attr("waitingCounter"), 10) > 0) {
            var val = parseInt(tag.attr("waitingCounter"), 10) - 1;
            tag.attr("waitingCounter", val);

            if (parseInt(tag.attr("waitingCounter"), 10) == 0) {
                $("#" + imgWait).css({ visibility: "hidden" });
            }
        }
    }

}

function HideWaiterObject(imgWait) {
    var tag = $(imgWait);
    if (tag.attr("waitingCounter") != null && parseInt(tag.attr("waitingCounter"), 10) > 0) {
        var val = parseInt(tag.attr("waitingCounter"), 10) - 1;
        tag.attr("waitingCounter", val);

        if (parseInt(tag.attr("waitingCounter"), 10) == 0) {
            $(imgWait).css({ visibility: "hidden" });
        }
    }
}

function getFileName(fileFullName) {
    return fileFullName.split('/').pop();
}

function _getServerValue(serviceUrl, serviceName, callback , params , imgWait) {

    ShowWaiter(imgWait);

    $.post(serviceUrl, { MethodName: serviceName, Params: params }, function (data) {

        callback(data);
        HideWaiter(imgWait);
    });
}


function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function _getElementValue(el) {

    var val;
    if ($(el).prop("tagName").toLowerCase() == "input") {
        var type = $(el).attr("type");
        //*********************************  check box
        if (type.toLowerCase() == "checkbox")
            val = $(el).prop("checked");
        //*********************************  text box
        if (type.toLowerCase() == "text")
            val = $(el).prop("value");
        //*********************************  password box
        if (type.toLowerCase() == "password")
            val = $(el).prop("value");
        //*********************************  text box
        if (type.toLowerCase() == "hidden")
            val = $(el).prop("value");
        //*********************************  other control ...
    }
    else if ($(el).prop("tagName").toLowerCase() == "img") {
        val = $(el).attr("src");
    }
    else if ($(el).prop("tagName").toLowerCase() == "textarea") {

        if (this.id.indexOf("CKEDITOR") == -1)
            val = $(el).prop("value");
        else {
            val = GetCKEditorContents($(el).id);
        }
    }
    else if ($(el).prop("tagName").toLowerCase() == "select") {
        val = $(el).val();
    }
    return val;
}

function _collectData(clpanelContainer) {
    var fieldSep = "Ǵ";
    var valSep = "ǵ";

    var _valueStream = fieldSep;
    $("." + clpanelContainer).find("[PName]").each(function (index) {
        debugger;
        _valueStream += fieldSep + $(this).attr("PName") + valSep;

        _valueStream += _getElementValue($(this));
    });

    return _valueStream;
}

function _collectsearchcriteria(clpanelContainer, extravalueStream) {

  
    var _valueStream = "";
    var tmp = null;
    var partSep = "Ǵ";
    var itemSep = "ǵ";

    $("." + clpanelContainer).find("[SC_PName]").each(function (index) {    
 
        if ($(this).prop("tagName").toLowerCase() == "input") {
            var type = $(this).attr("type");
            //*********************************  check box
            if (type.toLowerCase() == "checkbox")
                if ($(this).prop("checked") == true)
                    tmp = $(this).prop("checked");
            //*********************************  text box
            if (type.toLowerCase() == "text")
                if ($(this).prop("value") != '') {

                    tmp = $(this).prop("value");
                }
            //*********************************  text box
            if (type.toLowerCase() == "hidden")
                tmp = $(this).prop("value");
            //*********************************  other control ...
        }
        else if ($(this).prop("tagName").toLowerCase() == "img") {
            tmp = $(this).attr("src");
        }
        else if ($(this).prop("tagName").toLowerCase() == "select") {
            if ($(this).val() != "") {
                tmp = $(this).val();
            }
        }
        if (tmp != null) {
            var xtype = isnull($(this).attr("S_PType"), 'xstring').toLowerCase();
            var ctype = isnull($(this).attr("SC_CType"), 'equal').toLowerCase();
            var isprincipal = isnull($(this).attr("SC_IsPrincipal"), 'true').toLowerCase();
            var pname = $(this).attr("SC_PName");

            
            //template : {0}FieldName  ǵ  {1}FieldType ǵ  {2}CriteriaType ǵ  {3}IsPrincipal ǵ  {4}FieldValue ...
            if (ctype == 'equal') {
                
                _valueStream += pname + itemSep + xtype + itemSep + ctype + itemSep + isprincipal + itemSep + tmp;

            } else if (ctype == 'between' && $(this).attr("SC_Partner") != null) {
                var partnetValue = $("#" + $(this).attr("SC_Partner")).prop("value");
                _valueStream += pname + itemSep + xtype + itemSep + ctype + itemSep + isprincipal + itemSep + tmp + itemSep + partnetValue;
            }

            
            _valueStream += partSep;
            tmp = null;
        }
    });

    if (extravalueStream != null)
        _valueStream = _valueStream + extravalueStream;

 
    return _valueStream;

}

function _collectmethodparams(clpanelContainer, extravalueStream) {


    var _valueStream = "";
    var tmp = null;
    var partSep = "Ǵ";
    var itemSep = "ǵ";

    $("." + clpanelContainer).find("[SP_PName]").each(function (index) {

        if ($(this).prop("tagName").toLowerCase() == "input") {
            var type = $(this).attr("type");
            //*********************************  check box
            if (type.toLowerCase() == "checkbox")
                if ($(this).prop("checked") == true)
                    tmp = $(this).prop("checked");
            //*********************************  text box
            if (type.toLowerCase() == "text")
                if ($(this).prop("value") != '') {

                    tmp = $(this).prop("value");
                }
            //*********************************  text box
            if (type.toLowerCase() == "hidden")
                tmp = $(this).prop("value");
            //*********************************  other control ...
        }
        else if ($(this).prop("tagName").toLowerCase() == "img") {
            tmp = $(this).attr("src");
        }
        else if ($(this).prop("tagName").toLowerCase() == "select") {
            if ($(this).val() != "") {
                tmp = $(this).val();
            }
        }
        else if ($(this).prop("tagName").toLowerCase() == "textarea") {

            if (this.id.indexOf("CKEDITOR") == -1)
                tmp = $(this).prop("value");
            else {
                tmp = GetCKEditorContents(this.id);
            }
        }
        if (tmp != null) {
            var xtype = isnull($(this).attr("S_PType"), 'xstring').toLowerCase();
            var pname = $(this).attr("SP_PName");


            //template : {0}FieldName  ǵ {1}FieldType ǵ {2}FieldValue 
            _valueStream += pname + itemSep + xtype + itemSep + tmp;
            _valueStream += partSep;
            tmp = null;
        }
    });
 

    if (extravalueStream != null)
        _valueStream = _valueStream + extravalueStream;


    return _valueStream;

}

function _collectforStaticParams(container, extravalueStream) {

    
    var _valueStream = "";
    var tmp = null;
    var partSep = _streamPartSep;
    var itemSep = _streamItemSep;
 
    container.find("[SP_PName]").each(function (index) {
 
        if ($(this).prop("tagName").toLowerCase() == "input") {
            var type = $(this).attr("type");
            //*********************************  check box
            if (type.toLowerCase() == "checkbox")
                if ($(this).prop("checked") == true)
                    tmp = $(this).prop("checked");
            //*********************************  text box
            if (type.toLowerCase() == "text")
                if ($(this).prop("value") != '') {

                    tmp = $(this).prop("value");
                }
            //*********************************  text box
            if (type.toLowerCase() == "hidden")
                tmp = $(this).prop("value");
            //*********************************  other control ...
        }
        else if ($(this).prop("tagName").toLowerCase() == "img") {
            tmp = $(this).attr("src");
        }
        else if ($(this).prop("tagName").toLowerCase() == "select") {
            if ($(this).val() != "") {
                tmp = $(this).val();
            }
        }
        else if ($(this).prop("tagName").toLowerCase() == "textarea") {

            if (this.id.indexOf("CKEDITOR") == -1)
                tmp = $(this).prop("value");
            else {
                try {
                    
                    tmp = GetCKEditorContents(this.id);
                } catch (e) {
                    alert(e);
                } 

            }
        }
        if (tmp != null) {
            var xtype = isnull($(this).attr("S_PType"), 'xstring').toLowerCase();
            var pname = $(this).attr("SP_PName");


            //template : {0}FieldName  ǵ {2}FieldValue 
            _valueStream += pname + itemSep + tmp;
            _valueStream += partSep;
            tmp = null;
        }
    });


    if (extravalueStream != null)
        _valueStream = _valueStream + extravalueStream;

    var rels = _collectDynamicFieldsforStaticParams(container);
    if (rels != null && rels != "") {
        _valueStream = rels + partSep + _valueStream;
    }
 
    return _valueStream;

}
function GetCKEditorContents(ckID) {
    var editor = CKEDITOR.instances[ckID];
    var dt = replaceAll(editor.getData(), "\"", "'");
    var dt = replaceAll(dt, "\n", "");
 
    return dt;
}
function SetContents(ckID, val) {
 
    //var editor = CKEDITOR.instances.CKEDITOR1;
    var editor = CKEDITOR.instances[ckID];
    var value = val; //document.getElementById('htmlArea').value;

    if (editor != null) {
 
        value = jsonEscapeNot(value);
 
        try {
 
            if (typeof value !== typeof undefined && value !== false) {
 
                    editor.setData(value);
                }
            } 
            catch (e) {
                alert("CKEDITOR Error" + e);
        } 
        
    }
}

 
function getAllCharCode(val, sep) {

    var res="";
    var i = 0;
    while (i < val.length) {
        res += val.charCodeAt(i) + sep;
        i = i + 1;
    }
    return res;
}

function _collectDynamicFieldsforStaticParams(container, partSep, itemSep) {
    debugger;
    var _valueStream = "";

    var key = null;
    var val = null;

    if (typeof partSep == typeof undefined || partSep == false)
        partSep = _streamPartSep;
    if (typeof itemSep == typeof undefined || itemSep == false)
        itemSep = _streamItemSep;

  
    var dynamicFieldSep = _streamDynamicFieldSep;
    var dynamicValSep = _streamDynamicKeyValSep;
    var res = [];

    container.find("[SDP_Name]").each(function (index) {


        key = $(this).attr("SDP_Key");

        if ($(this).prop("tagName").toLowerCase() == "input") {
            var type = $(this).attr("type");
            //*********************************  check box
            if (type.toLowerCase() == "checkbox")
                if ($(this).prop("checked") == true)
                    val = $(this).prop("checked");
            //*********************************  text box
            if (type.toLowerCase() == "text")
                if ($(this).prop("value") != '') {

                    val = $(this).prop("value");
                }
            //*********************************  text box
            if (type.toLowerCase() == "hidden")
                val = $(this).prop("value");
            //*********************************  other control ...
        }
        else if ($(this).prop("tagName").toLowerCase() == "img") {
            val = $(this).attr("src");
        }
        else if ($(this).prop("tagName").toLowerCase() == "select") {
            if ($(this).val() != "") {
                val = $(this).val();
            }
        }
        else if ($(this).prop("tagName").toLowerCase() == "div") {
            if ($(this).attr("value") != "") {
                val = $(this).attr("value");
            }
        } else if ($(this).prop("tagName").toLowerCase() == "textarea") {

            if (this.id.indexOf("CKEDITOR") == -1)
                val = $(this).prop("value");
            else {
                val = GetCKEditorContents(this.id);
            }
        }

        if (val != null) {
            var SP_PName = $(this).attr("SDP_Name");


            if (!res[SP_PName]) {
                res[SP_PName] = [];
                res.push(SP_PName);
            }

            res[SP_PName].push(key + dynamicValSep + val);

            //template : {0}FieldName  ? {2}FieldValue 


            val = null;
        }
    });

    res.forEach(function (element) {
        _valueStream += element + itemSep;
        for (var i = 0; i < res[element].length; i++) {
            _valueStream += res[element][i] + dynamicFieldSep;
        }


        _valueStream = RTrim(_valueStream, dynamicFieldSep);
        
        _valueStream += partSep;
    });

    _valueStream = RTrim(_valueStream, partSep);


    return _valueStream;

}




function _clearForm(container, clearWithSPAttribute) {
    var selector = "PName";
    if (clearWithSPAttribute && clearWithSPAttribute == true) {
        selector = "SP_PName";
    }
    clearForm(container, clearWithSPAttribute, selector);

    try {
        _clearFormDynamicFields(container, clearWithSPAttribute);
    } catch (e) {

    }
    try {
        clearAllUloadThumbnailImages();
    } catch (e) {

    }
}

function _clearFormDynamicFields(container, clearWithSPAttribute) {
    var selector = "RPName";
    if (clearWithSPAttribute && clearWithSPAttribute == true) {
        selector = "SDP_Name";
    }
    clearForm(container, clearWithSPAttribute,selector);
}

function clearForm(container, clearWithSPAttribute,selector) {

    var tag;
       container.find("[" + selector + "]").each(function (index) {

        tag = $(this);
        if (tag.length > 0) {
            if (tag.prop("tagName").toLowerCase() == "span") {

                //tag.text(object[pName]);
                tag.html("");

            } else if (tag.prop("tagName").toLowerCase() == "input") {
                var type = tag.attr("type");
                //*********************************  check box
                if (type == "checkbox") {
                    tag.prop("checked", false);
                }

                //*********************************  text box
                if (type.toLowerCase() == "text")
                    tag.prop("value", "");
                //*********************************  hidden
                if (type.toLowerCase() == "hidden")
                    tag.prop("value", "");
                //*********************************  img
            } else if (tag.prop("tagName").toLowerCase() == "img") {
                {
                    tag.attr("src", "");
                }
            } else if (tag.prop("tagName").toLowerCase() == "select") {
                try {
                    //alert($(tag).find("option:first").val());
                    $(tag).val($(tag).find("option:first").val());
                } catch (e) {
                    alert("error: "+e);
                } 
                //tag.val(0);
            }
            else if (tag.prop("tagName").toLowerCase() == "div") {
                tag.attr("value", "");
                try {
                    var attr = tag.attr('customevent');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        window[tag.attr("customevent")](tag);
                    }
                } catch (e) {

                } 
                
            } else if (tag.prop("tagName").toLowerCase() == "textarea" && tag.prop("id").indexOf("CKEDITOR") == -1) {
                tag.prop("value", "");
            } else if (tag.prop("tagName").toLowerCase() == "textarea" && tag.prop("id").indexOf("CKEDITOR") > -1) {
                SetContents(tag.prop("id"), "");
            }
        }
    });
}

 
function _fillForm(object, container, loadWithSPAttribute) {

    var tags;
    if (loadWithSPAttribute && loadWithSPAttribute == true) {
        if (container)
            tags = container.find("[SP_PName]");                       
        else
            tags = container.find("[SP_PName]");            
    } else {
        if (container)
            tags = container.find("[PName]");                        
        else
            tags = container.find("[PName]");
    }

    for (var j = 0; j < tags.length; j++) {
        var tag = $(tags[j]);
        setValue2Tag(tag, object[tag.attr("SP_PName")]);        
    }
 

    try {
        _fillFormDynamicFields(object, container, loadWithSPAttribute);
    } catch (e) {

    }

    try {
        loadThumbnailImages();
    }
    catch (err) {
        // Handle error(s) here
    }

}

function _fillFormDynamicFields(object, container, loadWithSPAttribute) {
   
    var relFieldSep = _streamDynamicFieldSep;
    var relValSep = _streamDynamicKeyValSep;

    for (var pName in object) {

        var tags;

        if (loadWithSPAttribute && loadWithSPAttribute == true) {
            if (container)
                //tag = $("." + clpanelContainer).find("[SP_PName = " + pName + "]");
                tags = container.find("[SDP_Name = " + pName + "]");
            else
                tags = $("[SDP_Name = " + pName + "]");
        } else {
            if (container)
                tags = container.find("[RPName = " + pName + "]");
            else
                tags = $("[RPName = " + pName + "]");
        }
     
        if (tags.length > 0) {
            var fields = object[pName].split(relFieldSep);
            for (var i = 0; i < fields.length; i++) {
                var f = fields[i];
                var parts = f.split(relValSep);
                var key = parts[0];
                var value = parts[1];

           
                for (var j = 0; j < tags.length; j++) {
              
                    if (key == $(tags[j]).attr("SDP_Key")) {                    
                        setValue2Tag(tags[j], value);
                    }
                }
              
            }
 
  
        }
    }
}
 
function setValue2Tag(tag2, value) {
    var tag = $(tag2);
  
    if (typeof tag.prop("PreSetterCtlId") !== typeof undefined && tag.prop("PreSetterCtlId") !== false) {
        $("#" + tag.prop("PreSetterCtlId")).on("onSetterActionFinished", function (e, v) {
            alert('onSetterActionFinished');
        });
    }
    if (tag) {
        if (tag.prop("tagName").toLowerCase() == "span") {

            //tag.text(object[pName]);
            tag.html(value);

        } else if (tag.prop("tagName").toLowerCase() == "input") {
            var type = tag.attr("type");
            //*********************************  check box
            if (type == "checkbox") {
                if (value.toString().toLowerCase() == "true")
                    tag.prop("checked", true);
                else {
                    tag.prop("checked", false);
                }
            }

            //*********************************  text box
            if (type.toLowerCase() == "text")
                tag.prop("value", value);
            //*********************************  hidden
            if (type.toLowerCase() == "hidden")
                tag.prop("value", value);
            //*********************************  img
        } else if (tag.prop("tagName").toLowerCase() == "img") {
            {
                tag.attr("src", value);
            }
        } else if (tag.prop("tagName").toLowerCase() == "select") {
            tag.val(value);
            tag.trigger("change");
      
        } else if (tag.prop("tagName").toLowerCase() == "div") {
            
            try {
                tag.attr("value", value);
                var attr = tag.attr('customevent');
                if (typeof attr !== typeof undefined && attr !== false) {                    
                    window[tag.attr("customevent")](tag);
                }
                
            } catch (e) {
                alert(e);
            } 
        }
        else if (tag.prop("tagName").toLowerCase() == "textarea" && tag.prop("id").indexOf("CKEDITOR") == -1) {
            tag.prop("value", value);
        }
        else if (tag.prop("tagName").toLowerCase() == "textarea" && tag.prop("id").indexOf("CKEDITOR") > -1) {
            SetContents(tag.prop("id"), value);
        }
    }
}


function _postData(serviceUrl, serviceName, imgWait, clpanelContainer, reload, validate, onPostedCallBack, valueStream) {
 
    if (validate) {
        if (_validateData() == false)
            return;
    }

    ShowWaiter(imgWait);

    if (valueStream == null)
        valueStream = _collectData(clpanelContainer);

    $.post(serviceUrl, { MethodName: serviceName, valueStream: valueStream }, function (data) {

        debugger;
        HideWaiter(imgWait);

        if (data != null && data.trim() != '') {

            $("." + clpanelContainer).find(".msgBoxSuccess").css("display", "block");
            $("." + clpanelContainer).find(".msgBoxUnSuccess").css("display", "none");
            $("." + clpanelContainer).find("[Key='True']").prop("value", data);
        }
        else {
            $("." + clpanelContainer).find(".msgBoxUnSuccess").css("display", "block");
            $("." + clpanelContainer).find(".msgBoxSuccess").css("display", "none");
        }

        if (reload)
            location.reload(true);

        if (onPostedCallBack != null)
            onPostedCallBack();
    });
}

function _postDataAsMonoValue(serviceUrl, serviceName, valueStream, completeCallBack , imgWait) {
 
    ShowWaiter(imgWait);
    $.post(serviceUrl, { serviceName: serviceName, inputstream: valueStream }, function (data) {
        HideWaiter(imgWait);
        completeCallBack(data);
    });
}

function _callStaticMethod(serviceUrl, serviceName, imgWait, clpanelContainer, inputstream, reload, validate, onPostedCallBack) {

    if (validate) {
        if (_validateData() == false)
            return;
    }

    ShowWaiter(imgWait);

    if (inputstream == null)
        inputstream = _collectmethodparams(clpanelContainer);


    $.post(serviceUrl, { servicename: serviceName, inputstream: inputstream }, function (data) {

        HideWaiter(imgWait);

        if (data != null && data.trim() != '') {

            $("." + clpanelContainer).find(".msgBoxSuccess").css("display", "block");
            $("." + clpanelContainer).find(".msgBoxUnSuccess").css("display", "none");
            $("." + clpanelContainer).find("[Key='True']").prop("value", data);
        }
        else {
            $("." + clpanelContainer).find(".msgBoxUnSuccess").css("display", "block");
            $("." + clpanelContainer).find(".msgBoxSuccess").css("display", "none");
        }

        if (reload)
            location.reload(true);

        if (onPostedCallBack != null)
            onPostedCallBack();
    });
}



function disableClass(sel, strClass) {
    var $el = jQuery(sel);
    var cl = $el.attr("class").replace(strClass, strClass + "_dis");
    $el.attr('class', cl);
} 

function enableClass(sel, strClass) {
    var $el = jQuery(sel);
    var cl = $el.attr("class").replace(strClass + "_dis", strClass);
    $el.attr('class', cl);
}

function jsonEscape(str) {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}
function jsonEscapeNot(str) {
    return str.replace("\\\\n", "").replace("\\n", "").replace("\\\\r", "").replace("\\r", "").replace("\\\\t", "").replace("\\t", "");
}




function getQueryStringByName(name) {

    name = name.toLowerCase();
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search.toLowerCase());
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function removeURLParameter(parameter) {
    var uri = window.location.href.replace('#', '');
    //prefer to use l.search if you have a location/link object
    var urlparts = uri.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        uri = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        uri = RTrim(uri, "&");
        window.history.pushState('', '', uri);
    } else {
        uri = RTrim(uri, "&");
        window.history.pushState('', '', uri);
    }
}
function removeURLParameterwithValue(parameter, value) {
    var uri = window.location.href;
    //prefer to use l.search if you have a location/link object
    var urlparts = uri.split('?');
    if (urlparts.length >= 2) {

        var prefix = (encodeURIComponent(parameter) + '=' + value).toLowerCase();
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].toLowerCase() == prefix) {
                pars.splice(i, 1);
            }
        }

        uri = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        window.history.pushState('', '', uri);
    } else {
        window.history.pushState('', '', uri);
    }
}

function clearQueryString() {
    var uri = window.location.href.replace('#', '');
    var urlparts = uri.split('?');
    window.history.pushState('', '', urlparts[0]);
    return urlparts[0];
}


function updateQueryStringParameterWithKey(key, value) {
    var uri = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        window.history.pushState('', '', uri.replace(re, '$1' + key + "=" + value + '$2'));
    }
    else {
        window.history.pushState('', '', uri + separator + key + "=" + value);
    }
}

function insertQueryStringParameterWithKey(key, value) {

    var uri = window.location.href.replace('#', '');
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    window.history.pushState('', '', uri + separator + key + "=" + value);
}
function updateQueryStringParameterWithCouple(cpl) {


    var uri = window.location.href.replace('#', '');
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    uri = RTrim(uri, "&");
    window.history.pushState('', '', uri + separator + cpl);
}

function getPageUrl() {
    var uri = window.location.href.replace('#', '');
    var urlparts = uri.split('?');
    return urlparts[0];
}

function getQueryString() {
    var uri = window.location.href;
    var urlparts = uri.split('?');
    if (urlparts.length >= 2) {
        return urlparts[1];
    }
}

function getQueryStringAsStream() {
    var str = replaceAllContent(getQueryString(), '=', _streamItemSep);

    str = replaceAllContent(str, '&', _streamPartSepDbl);

    return str;
}

function setCriteria2QS(name, value) {
    removeURLParameter("page");

    updateQueryStringParameterWithKey(name, value);
}
function insertCriteria2QS(name, value) {
    removeURLParameter("page");
    insertQueryStringParameterWithKey(name, value);
}
function UpdateCriteriaCouple2QS(cpl, keyforDel) {

    removeURLParameter("page");
    removeURLParameter(keyforDel);
    updateQueryStringParameterWithCouple(cpl);;
}

function removeCriteriaFromQSWithName(name) {
    removeURLParameter(name);
}

function removeCriteriaFromQS(name, value) {
    removeURLParameterwithValue(name, value);
}