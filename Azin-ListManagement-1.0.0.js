$(document).ready(function() {
 
    $(".CRUDContainer[autoloading='True']").each(function (index) {
        
        var mainContainer = $(this);
        

        _loadHTMLTable(mainContainer);

        $(this).find("._btnNew").click(function (e) {
            _new(mainContainer);
        });
        $(this).find("._btnSave").click(function (e) {
            _save(mainContainer);
        });
        $(this).find("._btnRefresh").click(function (e) {
            _refresh(mainContainer);
        });

        clientSearchColumnProcessor(mainContainer);
    });    
});

function ListManagement_Init(CRUDContainerId) {
    var mainContainer = $("#" + CRUDContainerId);    

    mainContainer.find("._btnNew").click(function (e) {
        _new(mainContainer);
    });
    mainContainer.find("._btnSave").click(function (e) {
        _save(mainContainer);
    });
    mainContainer.find("._btnRefresh").click(function (e) {
        _refresh(mainContainer);
    });

    clientSearchColumnProcessor(mainContainer);
}

function ListManagement_Load(CRUDContainerId) {
    var mainContainer = $("#" + CRUDContainerId);
    _loadHTMLTable(mainContainer);
}

function clientSearchColumnProcessor(container) {

    container.find(".clientSearchColumn").each(function (index) {
        if ($(this).prop("tagName").toLowerCase() == "input") {
            $(this).keypress(function (e) {
                var key = e.which;
                if (key == 13)  // the enter key code
                {
                    filterHTMLTable(container);
                }
            });
        }
        else if ($(this).prop("tagName").toLowerCase() == "select") {
            $(this).change(function () {
                filterHTMLTable(container);
            });
        }
    }); 
}

 
function filterHTMLTable(container) {

    var filter = [];

    for (var i = 0; i < vars_defaultLst[container.attr("ID")].length; i++) {
        var obj = vars_defaultLst[container.attr("ID")][i];

        var exists = true;
          
        $(container).find("._tblContainer ._tblheader .clientSearchColumn").each(function (index) {
            
            var SCS_Name = $(this).attr("SCS_Name");
            
            var val = _getElementValue(this).toString().trim();
            
            try {
                var objectValue = obj[SCS_Name].toString().trim();
         
               // alert("i:  "+i +  "     SCS_Name: " + SCS_Name + "     objectValue: " + objectValue + "    val: " + val);

                if (objectValue.indexOf(val) < 0) {

                    exists = false;
                    return false;
                }
            } catch (e) {
                alert(e);
                exists = false;
                return false;
            }
        });
 
        if (exists) {
            filter.push(obj);
        }
    }
 
    _fillHtmlTable(container, filter);
}


var vars_defaultLst = {};

function _loadHTMLTable(container) {
    _clearHtmlTable(container);
    var inputstream = "";
    var getlistCriteria = container.attr("getlistCriteria");
    if (getlistCriteria)
        inputstream = window[getlistCriteria]();

    var loadTemplateListServicename = container.attr("loadTemplateListServicename");
    if (loadTemplateListServicename) {
        var imgWait = container.attr("imgWait");
        ShowWaiter(imgWait);
        $.post(StaticMethodSingleValueServerUrl, { serviceName: loadTemplateListServicename, inputstream: inputstream }, function (data) {
            try {
                HideWaiter(imgWait);
                if (data != null && data != "") {
                    container.find('._tblContainer').empty();
                    container.find('._tblContainer').append(data);
                }
            } catch (e) {
                alert(e);
            } 
            _loadHTMLTableData(container, inputstream);
        });
    } else {
        _loadHTMLTableData(container, inputstream);
    }
    
}

function _loadHTMLTableData(container, inputstream) {
 
    var loadListServicename = container.attr("loadListServicename");

    var server = StaticMethodServerUrl;
    var isListRotate = container.attr("IsListRotate");
    if (isListRotate != null && isListRotate.toLowerCase() == "true")
        server = StaticMethodRotateServerUrl;

    var imgWait = container.attr("imgWait");
    ShowWaiter(imgWait);
 
   
    $.post(server, { serviceName: loadListServicename, inputstream: inputstream }, function (data) {
 
        try {
            HideWaiter(imgWait);
            if (data == null || data == "") {
               
                vars_defaultLst[container.attr("ID")] = null;
                //   return;
            } else {
                
                var lst = eval(jsonEscape(data));
                vars_defaultLst[container.attr("ID")] = lst;
            }
            filterHTMLTable(container);
        } catch (e) {
          
            vars_defaultLst[container.attr("ID")] = null;
           // _clearHtmlTable(container);
        }
    });
}

function _fillHtmlTable(container,lst) {
    try {
 
        var imgWait = container.attr("imgWait");
        ShowWaiter(imgWait);

        var _tblData = container.find("._tblData");
        var tr1 = _tblData.find("._tr1.rowHidden");
        var tr2 = _tblData.find("._tr2.rowHidden");
        //var _trHeader = _tblData.find("._trHeader");

        //tr1.css({ visibility: "collapse" });
        //tr2.css({ visibility: "collapse" });


        var tr1Str = $('<tr>').append(tr1.clone()).html();
        var tr2Str = $('<tr>').append(tr2.clone()).html();


        //$('._tblData tr.dynamic').remove();
        _tblData.find('tr.dynamic').remove();

        //var lst = _defaultLst;
      

            var trStr = tr1Str;
            var trID = "_tr1";


            for (var i = lst.length - 1; i >= 0; i--) {
                for (var col in lst[i]) {

                    trStr = replaceAll(trStr, "[" + col + "]", lst[i][col]);
                }

                var row = $.parseHTML(trStr);

                $(row).removeClass("rowHidden");
                $(row).addClass("dynamic");


                $(row).find("td").each(function (index) {
                    if ($(this).hasClass("clientRowNumber"))
                        $(this).text(lst.length - i);
                });

                
                //_trHeader.after(trStr);

                //_tblData.append(trStr);
                _tblData.append(row);

                if (trID == "_tr1") {
                    trStr = tr2Str;
                    trID = "_tr2";
                } else { // "tblTest_tr2"
                    trStr = tr1Str;
                    trID = "_tr1";
                }
            }

            _bindRowEvents(container);

            HideWaiter(imgWait);

            try {
                //$("._tblData").width($("._tblheader").width());
                _tblData.width(_tblData.find("._tblheader").width());
                //alert($("._tblheader").width() + "   " + $("._tblData").width());
            } catch (e) {
                alert(e);
            }
 

    } catch (e) {
        alert(e);
    }
}

function _bindRowEvents(mainContainer) {
    var _tblData = mainContainer.find("._tblData");
    _tblData.find("._btnRemove").click(function (e) {
        _remove(mainContainer, $(this));
    });

    _tblData.find("._btnSelect").click(function (e) {
        _selectRow(mainContainer, $(this));
    });
    _tblData.find("._btnCopy").click(function (e) {
        _deSelectAllRows(mainContainer);
        _fetchRow(mainContainer, $(this) , '');
        
    });
}

function _new(mainContainer) {
 
 
    _deSelectAllRows(mainContainer);
    _clearForm(mainContainer , true);
 
}

function _save(mainContainer) {


    //var serverurlvarname = mainContainer.attr("serverurlvarname");
    //var serverurl = "";
    //if (serverurlvarname)
    //    serverurl = window[serverurlvarname];
    //var key = btnContainer.attr("key");
    var saveServicename = mainContainer.attr("SaveServicename");
    var inputstream = '';
    inputstream = _collectforStaticParams(mainContainer);

    var getbeforsavingparams = mainContainer.attr("getbeforsavingparams");
    if (getbeforsavingparams) {
        inputstream += window[getbeforsavingparams]();
    }
    

    var imgWait = mainContainer.attr("imgWait");
    ShowWaiter(imgWait);
 
    $.post(StaticMethodServerUrl, { serviceName: saveServicename, inputstream: inputstream }, function (data) {
  
        HideWaiter(imgWait);

        if (data.startsWith("ServerError")) {
            var errorcode = data.replace("ServerError", "");
            alert("Server error occurred: " + errorcode);
            return;
        }

        var lst = eval(jsonEscape(data));
        if (lst[0]['result'] == 1) {
            _loadHTMLTable(mainContainer);
            _clearForm(mainContainer, true);
        }
      
    });
}
function _refresh(mainContainer) {
    _loadHTMLTable(mainContainer);
    _clearForm(mainContainer, true);
}

function _remove(mainContainer, controlContainer) {
    
    if (!confirm('آيا از حذف اين رکورد اطمينان داريد؟')) { return false; }

    //var serverurlvarname = mainContainer.attr("serverurlvarname");
    //var serverurl = "";
    //if (serverurlvarname)
    //    serverurl = window[serverurlvarname];
    var key = controlContainer.attr("key");
    var removeListItemServicename = mainContainer.attr("removeListItemServicename");
    var inputstream = 'key' + _streamItemSep + key;

    var imgWait = mainContainer.attr("imgWait");
    ShowWaiter(imgWait);

    $.post(StaticMethodServerUrl, { serviceName: removeListItemServicename, inputstream: inputstream }, function (data) {

        if (data.startsWith("ServerError")) {
            var errorcode = data.replace("ServerError", "");
            alert("Server error occurred: " + errorcode);
            return;
        }        


        var lst = eval(jsonEscape(data));
        
        if (lst[0]['result'] == 1) {
            _loadHTMLTable(mainContainer);
            _clearForm(mainContainer, true);
        } else {
            alert(lst[0]['result']);
        }
        HideWaiter(imgWait);
    });

}

function _selectRow(mainContainer, controlContainer) {

    _deSelectAllRows(mainContainer);

    var t = controlContainer.parent().parent();
    disableClass(t, "rowfirstColor");
    disableClass(t, "rowsecondcolor");
       
    t.addClass("rowselected");

    _fetchRow(mainContainer, controlContainer);

}




function _fetchRow(mainContainer, controlContainer , keyValue) {
    
    var getInstanceServicename = mainContainer.attr("GetInstanceServicename");

    var imgWait = mainContainer.attr("imgWait");
    ShowWaiter(imgWait);

    var key = controlContainer.attr("key");
    var inputstream = 'key' + _streamItemSep + key;
    
    
    $.post(StaticMethodServerUrl, { serviceName: getInstanceServicename, inputstream: inputstream }, function (data) {

       
        if (data.startsWith("ServerError")) {
            var errorcode = data.replace("ServerError", "");
            alert("Server error occurred: " + errorcode);
            return;
        }

        try {
 
            var lst = eval(jsonEscape(data));


            if (lst.length > 0) {
       
              //  _clearForm(mainContainer, true);  // in this state: first clear and after load CKEditor can not work correctly
                _fillForm(lst[0], mainContainer, true);
            }
            HideWaiter(imgWait);

            if (typeof keyValue !== typeof undefined && keyValue !== false) {
            
                setValue2Tag(mainContainer.find("[sp_key]"), '');
            }
        } catch (e) {
            alert("fetchRow Error: " + e);
        }
    });
}

function _deSelectAllRows(mainContainer) {

    mainContainer.find("._tblData .dynamic").each(function () {
        $(this).removeClass("rowselected");
        enableClass($(this), "rowfirstColor");
        enableClass($(this), "rowsecondcolor");
    });
}

function _clearHtmlTable(container) {
    var _tblData = container.find("._tblData");
    _tblData.find('tr.dynamic').remove();
}
