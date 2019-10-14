// ver 1.0.1  last version (create date: 1395/06/15)
 
 

function test()
{
    alert("ok");
}

//function _fillForm(object, clpanelContainer, loadWithSPAttribute) {
//    for (var pName in object) {
    
//        var tag;
       
//        if (loadWithSPAttribute && loadWithSPAttribute == true) {
//            if (clpanelContainer && clpanelContainer.trim() != "")
//                tag = $("." + clpanelContainer).find("[SP_PName = " + pName + "]");
//            else
//                tag = $("[SP_PName = " + pName + "]");
//        } else {
//            if (clpanelContainer && clpanelContainer.trim() != "")
//                tag = $("." + clpanelContainer).find("[PName = " + pName + "]");
//            else
//                tag = $("[PName = " + pName + "]");
//        }

//        if (tag.length > 0) {
//            if (tag.prop("tagName").toLowerCase() == "span") {
               
//                //tag.text(object[pName]);
//                tag.html(object[pName]);

//            } else if (tag.prop("tagName").toLowerCase() == "input") {
//                var type = tag.attr("type");
//                //*********************************  check box
//                if (type == "checkbox") {
//                    if (object[pName].toString().toLowerCase() == "true")
//                        tag.prop("checked", true);
//                }

//                //*********************************  text box
//                if (type.toLowerCase() == "text")
//                    tag.prop("value", object[pName]);
//                //*********************************  hidden
//                if (type.toLowerCase() == "hidden")
//                    tag.prop("value", object[pName]);
//                //*********************************  img
//            } else if (tag.prop("tagName").toLowerCase() == "img") {
//                {
//                    tag.attr("src", object[pName]);
//                }
//            } else if (tag.prop("tagName").toLowerCase() == "select") {
//                tag.val(object[pName]);
//            } else if (tag.prop("tagName").toLowerCase() == "div") {
//                tag.attr("value", object[pName]);
//            }
//            else if (tag.prop("tagName").toLowerCase() == "textarea" && tag.prop("id").indexOf("CKEDITOR") == -1) {
//                tag.prop("value", object[pName]);                
//            }
//            else if (tag.prop("tagName").toLowerCase() == "textarea" && tag.prop("id").indexOf("CKEDITOR") > -1) {
//                    SetContents(tag.prop("id"), object[pName]);
//            }
//        }
//    }
//}

function _loadForm(serviceurl, servicename, guid, extravalueStream, imgWait , loadWithSPAttribute) {
 
    ShowWaiter(imgWait);
 
    var orderBy = "Id";

    var inputstream = "GuidǵxGuidǵ" + guid;
    if (extravalueStream != null)
        inputstream = inputstream + extravalueStream;

    $.post(serviceurl, { MethodName: "", inputstream: inputstream, servicename: servicename, orderBy: orderBy }, function (data) {
 
        if (data == "") {
            HideWaiter(imgWait);
            return;
        }
 
  
        var lst = eval(data);
        
        var object = lst[0];
        
        

        HideWaiter(imgWait);
     
        _fillForm(object, "", loadWithSPAttribute);
        
        try {
            loadThumbnailImages();
        }
        catch (err) {
            // Handle error(s) here
        }
        try {
            loadImageGalleryImages();
        }
        catch (err) {
            // Handle error(s) here
        }
 
    });
}
 

function _loadList2(pl,pageNum) {


    var lastPageNum = 0;

    ShowWaiter(pl.imgWait);

    if (pl.pageSize == null)
        pl.pageSize = 10;
    if (pageNum == null)
        pageNum = parseInt($('#tblData_txtPageNum').attr('value'));
    if (pageNum < 1)
        pageNum = 1;

    var tr1 = $("#" + pl.tblContent + "_TR1");
    var tr2 = $("#" + pl.tblContent + "_TR2");

    //collapse
    tr1.css({ visibility: "collapse" });
    tr2.css({ visibility: "collapse" });

    
    
    $.post(pl.serviceUrl, { MethodName: pl.serviceName, pageSize: pl.pageSize, pageNum: pageNum, where: pl.where, order: pl.order}, function (data) {

        $("tr[id^='" + pl.tblContent + "_TR_']").remove();
        //alert(data);
        if (data == "") {
            HideWaiter(pl.imgWait);
            $("#" + pl.txtLastPageNum).attr('value', 1);
            return;
        }
        var lst = eval(data);
        lastPageNum = lst[0].lastPageNum;

        
        var tr1Str = $('<tr>').append(tr1.clone()).html();
        var tr2Str = $('<tr>').append(tr2.clone()).html();
        var trStr = tr1Str;
        var trID = pl.tblContent + "_TR1";


        for (var i = lst.length - 1; i >= 1; i--) {
            for (var col in lst[i]) {
                trStr = replaceAll(trStr , "[" + col + "]", lst[i][col]);
            }
            trStr = trStr.replace("collapse", "visible");
            trStr = trStr.replace(trID, pl.tblContent + "_TR_" + i);
           
            tr1.after(trStr);

            if (trID == pl.tblContent + "_TR1") {
                trStr = tr2Str;
                trID = pl.tblContent + "_TR2";
            }
            else {  // "tblTest_TR2"
                trStr = tr1Str;
                trID = pl.tblContent + "_TR1";
            }
        }

        HideWaiter(pl.imgWait);
        if (pageNum > lastPageNum && pl.txtPageNum != null) {

            $("#" + pl.txtPageNum).attr('value', lastPageNum);
        }
        else
            $("#" + pl.txtPageNum).attr('value', pageNum);
        if (pl.txtLastPageNum != null)
            $("#" + pl.txtLastPageNum).attr('value', lastPageNum);
    });

}

var imgWaitX;
var imgWaitY;
 

PagingList = function (serviceUrl,serviceName,pageSize,imgWait, tblContent, txtPageNum, txtLastPageNum,where,order) {
    this.init(serviceUrl,serviceName,pageSize,imgWait, tblContent, txtPageNum, txtLastPageNum,where,order);
}

$.extend(PagingList.prototype, {
    // object variables
    serviceUrl:'',serviceName:'',pageSize: '', imgWait: '', tblContent: '', txtPageNum: '', txtLastPageNum: '', where: '',order: '',

    init: function (serviceUrl,serviceName,pageSize, imgWait, tblContent, txtPageNum, txtLastPageNum, where, order) {
        // do initialization here    
        this.serviceUrl = serviceUrl;
        this.serviceName = serviceName;
        this.pageSize = pageSize;
        this.imgWait = imgWait;
        this.tblContent = tblContent;
        this.txtPageNum = txtPageNum;
        this.txtLastPageNum = txtLastPageNum;
        this.where = where;       
        this.order = order;
    },
}); 
 
//function _clearForm(container) {
    
//    if (container.find(".msgBox") != null)
//        container.find(".msgBox").text("");
//    container.find("[Key='True']").prop("value", "");
//    container.find("[PName]").each(function (index) {
//    //var tag = this;
        
//            if ($(this).prop("tagName").toLowerCase() == "span")
//                $(this).text("");
//            else if ($(this).prop("tagName").toLowerCase() == "input")
//            {
//                var type = $(this).attr("type");
//                //*********************************  check box
//                if(type.toLowerCase() == "checkbox")
//                         $(this).prop("checked",false);
//                //*********************************  text box
//                if(type.toLowerCase() == "text")
//                         $(this).prop("value","");
//                //*********************************  file
//                if(type.toLowerCase() == "file")
//                         $(this).prop("value","");
//                //*********************************  other control ...
//            }
//            else if ($(this).prop("tagName").toLowerCase() == "img")
//            {
//                $(this).attr("src", "");
//            }
//            else if ($(this).prop("tagName").toLowerCase() == "select")
//            {
//                $(this).val(0);
//            }
//            else if ($(this).prop("tagName").toLowerCase() == "textarea" && $(this).prop("id").indexOf("CKEDITOR") > -1) {
//                SetContents($(this).prop("id"), "");
//        }
//    });
 
//}

function _collectData_back() {
    var fieldSep = "Ǵ";
    var valSep = "ǵ";

    var _valueStream = fieldSep;
    $("[PName]").each(function (index) {

        _valueStream += fieldSep + $(this).attr("PName") + valSep;

        if ($(this).prop("tagName").toLowerCase() == "input") {
            var type = $(this).attr("type");
            //*********************************  check box
            if (type.toLowerCase() == "checkbox")
                _valueStream += $(this).prop("checked");
            //*********************************  text box
            if (type.toLowerCase() == "text")
                _valueStream += $(this).prop("value");
            //*********************************  password box
            if (type.toLowerCase() == "password")
                _valueStream += $(this).prop("value");

            //*********************************  text box
            if (type.toLowerCase() == "hidden")
                _valueStream += $(this).prop("value");
            //*********************************  other control ...
        }
        else if ($(this).prop("tagName").toLowerCase() == "img") {
            _valueStream += $(this).attr("src");
        }
        else if ($(this).prop("tagName").toLowerCase() == "textarea") {

            var val;
            if (this.id.indexOf("CKEDITOR") == -1)
                val = $(this).prop("value");
            else {
                val = GetCKEditorContents(this.id);
            }
            _valueStream += val;
        }
        else if ($(this).prop("tagName").toLowerCase() == "select") {
            _valueStream += $(this).val();
        }
    });

    return _valueStream;
}


 
function _saveData_back(serviceUrl,serviceName,imgWait,msgBox) {
    
    var savetype = "update";
    if($("[Key='True']").prop("value") == "")
        savetype = "insert";

    ShowWaiter(imgWait);

    var _valueStream = _collectData();
    debugger;
    $.post(serviceUrl, { MethodName: serviceName, valueStream: _valueStream }, function (data) {
        debugger;

              if (data != null) {
                $(".msgBox").css("color","Green");
                $(".msgBox").text("Saved Successfull");
                $("[Key='True']").prop("value",data);
              }
              else
              {
                $(".msgBox").css("color","Red");
                $(".msgBox").text("Saved UnSuccess");
              }

              HideWaiter(imgWait);

              location.reload(false);
         });    
}
 
function _saveData(serviceUrl, serviceName, imgWait, clpanelContainer) {

    ShowWaiter(imgWait);

    var valueStream = _collectData(clpanelContainer);
    debugger;
    $.post(serviceUrl, { MethodName: serviceName, valueStream: valueStream }, function (data) {
    
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



       // location.reload(false);
    });
}


function _saveObject(serviceUrl, objectName, imgWait, clpanelContainer, extravalueStream) {
    
    ShowWaiter(imgWait);

    var valueStream = _collectData(clpanelContainer);
    if (extravalueStream != null)
        valueStream = valueStream + extravalueStream;

   //alert(valueStream);

    $.post(serviceUrl, { MethodName: "", objectName: objectName, valueStream: valueStream }, function (data) {

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



        // location.reload(false);
    });
}

 

function _removeData(serviceUrl,serviceName,key,imgWait,pl)
{    
    if (confirm('آیا از حذف این رکورد اطمینان دارید؟')) 
    {
        ShowWaiter(imgWait);
        //debugger;
         $.post(serviceUrl, { MethodName: serviceName,guid:key}, function (data) {
            if (data > 0) {                     
                if(pl != null)
                    _loadList(_pl,parseInt($('#tblData_txtPageNum').attr('value')))   //refresh list
            }         
            HideWaiter(imgWait);     
         });  
    }
}



function _search(serviceUrl, serviceName, pl) {

    pl.where = _collectsearchData();
    $('#pnlSearch').dialog('close');
    $('.drpFilter').val('');
    _loadList(pl,1);
}

function isnull(obj , nullval)
{
    if(obj == null)
        return nullval;
    else
        return obj;
}




function _loadList(pageNum) {

    //var _pl = new PagingList('../Admin/AdminServices.aspx', 'GetHardwareList', 10, 'imgWaiter', 'tblData', 'tblData_txtPageNum', 'tblData_txtLastPageNum', $('.clFilterItem').attr('value'), '');
    //_loadList(_pl, parseInt($('#tblData_txtPageNum').attr('value')));

    var lastPageNum = 0;

    ShowWaiter(pl.imgWait);

    if (pl.pageSize == null)
        pl.pageSize = 10;
    if (pageNum == null)
        pageNum = parseInt($('#tblData_txtPageNum').attr('value'));
    if (pageNum < 1)
        pageNum = 1;

    var tr1 = $("#" + pl.tblContent + "_TR1");
    var tr2 = $("#" + pl.tblContent + "_TR2");

    //collapse
    tr1.css({ visibility: "collapse" });
    tr2.css({ visibility: "collapse" });



    $.post(pl.serviceUrl, { MethodName: pl.serviceName, pageSize: pl.pageSize, pageNum: pageNum, where: pl.where, order: pl.order }, function (data) {
 
        $("tr[id^='" + pl.tblContent + "_TR_']").remove();
        if (data == "") {
            HideWaiter(pl.imgWait);
            $("#" + pl.txtLastPageNum).attr('value', 1);
            return;
        }
  
        var lst = eval(data);
     

        lastPageNum = lst[0].lastPageNum;


        var tr1Str = $('<tr>').append(tr1.clone()).html();
        var tr2Str = $('<tr>').append(tr2.clone()).html();
        var trStr = tr1Str;
        var trID = pl.tblContent + "_TR1";

 
        for (var i = lst.length - 1; i >= 1; i--) {
            for (var col in lst[i]) {
                trStr = replaceAll(trStr, "[" + col + "]", lst[i][col]);
            }
            trStr = trStr.replace("collapse", "visible");
            trStr = trStr.replace(trID, pl.tblContent + "_TR_" + i);

            tr1.after(trStr);

            if (trID == pl.tblContent + "_TR1") {
                trStr = tr2Str;
                trID = pl.tblContent + "_TR2";
            }
            else {  // "tblTest_TR2"
                trStr = tr1Str;
                trID = pl.tblContent + "_TR1";
            }
        }

        HideWaiter(pl.imgWait);
        if (pageNum > lastPageNum && pl.txtPageNum != null) {

            $("#" + pl.txtPageNum).attr('value', lastPageNum);
        }
        else
            $("#" + pl.txtPageNum).attr('value', pageNum);
        if (pl.txtLastPageNum != null)
            $("#" + pl.txtLastPageNum).attr('value', lastPageNum);
    });

}
 
function _loadFormWithJson(serviceUrl, serviceName, key, imgWait , onloaded , clpanelContainer) {

    _clearForm();
    ShowWaiter(imgWait);
    
    $.post(serviceUrl, { MethodName: serviceName, key: key }, function (data) {

        
        if (data == "") {
            HideWaiter(imgWait);
            return;
        }

 
        var object = jQuery.parseJSON(data);

       
        HideWaiter(imgWait);
        
        _fillForm(object, clpanelContainer);
  
        if (onloaded)
            onloaded();

        try {
            loadThumbnailImages();
        }
        catch (err) {
            // Handle error(s) here
        }
        try {
            loadImageGalleryImages();
        }
        catch (err) {
            // Handle error(s) here
        }

    });
}

