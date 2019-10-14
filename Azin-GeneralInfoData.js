$(document).ready(function () {

    GeneralInfoData_Load();
});
function GeneralInfoData_Load() {
 



    $(".GISelect").each(function (index) {
        try {
            //$(this).change(function () { onGISelectChange(); });

            var child = this;
            var parentCtlId = $(child).attr("ParentCtlId");
            if (typeof parentCtlId !== typeof undefined && parentCtlId !== false) {
                $("#" + parentCtlId).change(function () {
                   
                    $(child).attr("GIParentID", $("#" + parentCtlId).val());
                    LoadGISelect(child);
                  
                });
            }           
        } catch (e) {
            alert(e);
        } 

    });

    LoadSomeGISelect();
    $("[GISelectLoader]").click(function () { LoadGISelect($('#' + $(this).attr("GISelectID"))); });  
}

var _ctlCount = 0;
function LoadSomeGISelect() {
        $("[LoadGISelectInStart]").each(function (index) {
            //var tag = this;
       
            LoadGISelect(this);

        });  
}



function LoadGISelect(GISLCobj, loadedCallback) {

 
    _ctlCount++;
    var GISLC = $(GISLCobj);

    if (GISLC.prop("tagName").toLowerCase() == "select") {
        GISLC.find('option').remove();

        if (GISLC.attr("DefaultValue") != null && GISLC.attr("DefaultText") != null)
            GISLC.append('<option value="' + GISLC.attr("DefaultValue") + '">' + GISLC.attr("DefaultText") + '</option>');

        showGILoaderWaiter(GISLC);

        var inputstream = "";
        var ParentName = GISLC.attr("ParentName");

        if (typeof ParentName !== typeof undefined && ParentName !== false)
            var inputstream = 'ParentName' + _streamItemSep + GISLC.attr("ParentName");
        else {
            var GIParentID = GISLC.attr("GIParentID");
            if (typeof GIParentID !== typeof undefined && GIParentID !== false)
                var inputstream = 'GIParentID' + _streamItemSep + GISLC.attr("GIParentID");
        }

        var syncStr = GISLC.attr("is_sync");
        var is_sync = false;
        if (typeof syncStr !== typeof undefined && syncStr !== false)
            is_sync = (syncStr.toLowerCase() == "true");

        $.ajax({
            type: 'Post',
            async: !is_sync,
            url: GIService,
            data: {
                serviceName: 'Com_GeneralInfoData_Get',
                inputstream: inputstream 
            },

            success: function (msg) {
            
                if (msg != null && msg != "") {

                    var lst = eval(msg);
                    var dataTextField = GISLC.attr("DataTextField");
                    var dataValueField = GISLC.attr("DataValueField");

                    if (dataTextField == null)
                        dataTextField = 'Title';
                    if (dataValueField == null)
                        dataValueField = 'ID';


                    for (var i = 0 ; i < lst.length ; i++) {
                        GISLC.append('<option value="' + lst[i][dataValueField] + '">' + lst[i][dataTextField] + '</option>');
                    }
                }
                hideGILoaderWaiter(GISLC);
                _ctlCount--;
                GISLC.trigger("change");

                if (typeof loadedCallback !== typeof undefined && loadedCallback !== false) {
                    loadedCallback();
                }
            },
            error: function (event, request, settings) {
              
            }
        });
  
    }
}
 
 

function LoadGISelect222(GISLCobj, loadedCallback) {


    _ctlCount++;
    var GISLC = $(GISLCobj);

    if (GISLC.prop("tagName").toLowerCase() == "select") {
        GISLC.find('option').remove();

        if (GISLC.attr("DefaultValue") != null && GISLC.attr("DefaultText") != null)
            GISLC.append('<option value="' + GISLC.attr("DefaultValue") + '">' + GISLC.attr("DefaultText") + '</option>');

        showGILoaderWaiter(GISLC);

        var inputstream = "";
        var ParentName = GISLC.attr("ParentName");

        if (typeof ParentName !== typeof undefined && ParentName !== false)
            var inputstream = 'ParentName' + _streamItemSep + GISLC.attr("ParentName");
        else {
            var GIParentID = GISLC.attr("GIParentID");
            if (typeof GIParentID !== typeof undefined && GIParentID !== false)
                var inputstream = 'GIParentID' + _streamItemSep + GISLC.attr("GIParentID");
        }



        $.post(GIService, { serviceName: 'Com_GeneralInfoData_Get', inputstream: inputstream }, function (data) {
            if (data != null && data != "") {

                var lst = eval(data);
                var dataTextField = GISLC.attr("DataTextField");
                var dataValueField = GISLC.attr("DataValueField");

                if (dataTextField == null)
                    dataTextField = 'Title';
                if (dataValueField == null)
                    dataValueField = 'ID';


                for (var i = 0 ; i < lst.length ; i++) {
                    GISLC.append('<option value="' + lst[i][dataValueField] + '">' + lst[i][dataTextField] + '</option>');
                }
            }
            hideGILoaderWaiter(GISLC);
            _ctlCount--;
            GISLC.trigger("change");

            if (typeof loadedCallback !== typeof undefined && loadedCallback !== false) {
                loadedCallback();
            }
            //if (_ctlCount == 0)
            //    initDropdownCheckedListBox();
        });

    }
}


function showGILoaderWaiter(giSelectLoader) {

    var WaiterID = $(giSelectLoader).attr("WaiterID");    
    if(WaiterID != null)
        ShowWaiter(WaiterID);
}

function hideGILoaderWaiter(giSelectLoader) {

   
    var WaiterID = $(giSelectLoader).attr("WaiterID");
    if (WaiterID != null)
        HideWaiter(WaiterID);
}

//function onGISelectChange() {
//    alert(1);
//}
