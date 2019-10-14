


$(".azin_autocomplateSearchBar input.SearchTextbox").keydown(function (e) {
    var begin = lastBeginSearch = $(".azin_autocomplateSearchBar input.SearchTextbox").val();

    if (begin.length > 1) {
        $(".searchContainer").slideDown();
    }
});

var _searchIconClicked = false;
$(".azin_autocomplateSearchBar .SearchIcon").click(function (e) {
    var begin = lastBeginSearch = $(".azin_autocomplateSearchBar input.SearchTextbox").val();

    if (begin.length > 1) {
        _searchIconClicked = true;
        $(".searchContainer").slideDown();
    }
});



$(".azin_autocomplateSearchBar input.SearchTextbox").keyup(function (e) {
    switch (e.which) {
        case 37: // left
            return;

        case 38: // up
            if ($("#ProductSearch li.mover").length == 0) {
                $("#ProductSearch li").last().addClass("mover");
            }
            else {
                var mover = $("#ProductSearch li.mover");
                $("#ProductSearch li.mover").prev().addClass("mover");
                mover.removeClass("mover");

            }
            return;

        case 39: // right
            return;

        case 40: // down
            if ($("#ProductSearch li.mover").length == 0) {
                $("#ProductSearch li").first().addClass("mover");
            }
            else {
                var mover = $("#ProductSearch li.mover");
                $("#ProductSearch li.mover").next().addClass("mover");
                mover.removeClass("mover");

            }
            return;

        default: break; // exit this handler for other keys
    }
    if ($(this).val().length > 1) {
         
        autocomplateSearchRequest_trigger($(this).val());
    }
    else
        $(".searchContainer").slideUp();
});


$(function () {
    $("body").click(function () {
        if (_searchIconClicked == false)
            $(".searchContainer").slideUp();
        else {
            _searchIconClicked = false;
        }
    });
});

 
var autocomplateSearchRequest_trigger_ison = false;
function autocomplateSearchRequest_trigger(value) {

    if (autocomplateSearchRequest_trigger_ison == false) {

        autocomplateSearchRequest_trigger_ison = true;
        var container = $(".azin_autocomplateSearchBar");

        //var serverurlvarname = container.attr("serverurlvarname");
        //var serverurl;
        //if (serverurlvarname)
        //    serverurl = window[serverurlvarname];

        var servicename = container.attr("servicename");
        var notfoundError = container.attr("notfoundError");
        var imgWaiterId = container.attr("imgWaiterId");

        var ul = container.find(".aizn_autocomplate_ul");

        if (ul != null) {

            var notfoundli = '<li class="aizn_autocomplate_ul_li_notfound">' + notfoundError + '</li>';

            try {
                // template manager
                var templateobj = ul.find(".aizn_autocomplate_ul_li_template");
                var template = templateobj.html();
                ul.find('li').remove();
                ul.append(templateobj);
                // ***********************


                // loader manager

                //var loaderanimateid = container.attr("loaderanimateid");
                //var loaderanimatehtml = $('#' + loaderanimateid).html();


                // debugger;
                // ***********************
                ShowWaiter(imgWaiterId);
                var _inputstream = "searchContent" + _streamItemSep + value;
                $.post(StaticMethodServerUrl, { inputstream: _inputstream, servicename: servicename }, function (data) {
                    
                    //HideWaiter(loaderanimateid);            
                    try {
                    if (data != null && data != "") {
                        //debugger;
                        var lst;
                        try {
                            lst = eval(jsonEscape(data));
                    
                        } catch (e) {
                         
                            logError("AutocomplateSearchActions", "autocomplateSearchRequest_trigger",
                    "eval list error. for service : " + servicename + " and inputstream " + _inputstream, e);
                        } 
                        

                        if (lst.length > 0) {

                            // fill list
                            var tmp = template;
                            for (var i = 0; i < lst.length; i++) {
                                for (var col in lst[i]) {
                                    tmp = replaceAll(tmp, "[" + col + "]", lst[i][col]);
                                }

                                var lihtml = '<li class="aizn_autocomplate_ul_li">' + tmp + '</li> <li class="sep"></li>';
                                ul.append(lihtml);
                                tmp = template;
                            }
                            // ******************                    

                            // onfinishloading event manager
                            var onfinishloading = container.attr("onfinishloading");
                            if (onfinishloading)
                                window[onfinishloading]();
                            // ******************
                        } else {
                            ul.find(".aizn_autocomplate_ul_li_notfound").remove();
                            ul.append(notfoundli);
                        }
                    } else {
                        ul.find(".aizn_autocomplate_ul_li_notfound").remove();
                        ul.append(notfoundli);
                    }
                    HideWaiter(imgWaiterId);
                    autocomplateSearchRequest_trigger_ison = false;                        
                    } catch (e) {
                        HideWaiter(imgWaiterId);
                        autocomplateSearchRequest_trigger_ison = false;
                        alert("نمایش این صفحه با خطا مواجه شده است");
                    }


                });

            } catch (e) {
                ul.find(".aizn_autocomplate_ul_li_notfound").remove();
                ul.append(notfoundli);
                autocomplateSearchRequest_trigger_ison = false;
            }
        }
    }
}

