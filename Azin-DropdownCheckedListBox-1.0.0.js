$(document).ready(function () {
    
    LoadGICheckListBoxInStart();
    $(".dropdown-check-list>.loader").click(function () {
         LoadGICheckListBox($(this).closest(".dropdown-check-list"));
    });
});

function checkBoxAction(e) {

    var container = $(e.target).closest(".dropdown-check-list");
    var containerValue = "";
    var containerText = "";

    container.find(".active").each(function (index) {
        containerValue += $(this).attr("value") + _streamDynamicSomeValSep;
        containerText += $(this).text() + ",";
       // alert($(this).text());
    });

    containerValue = RTrim(containerValue, ',');
    container.attr("value", containerValue);
    containerText = RTrim(containerText, ',');

    set2anchor(container,containerText);
}

function set2anchor(container,text) {
    if (text == "") {
        if (container.attr("DefaultText") != null)
            container.find(".anchor").text(container.attr("DefaultText"));
    }
    else
        container.find(".anchor").text(text);
}
 
function LoadGICheckListBoxInStart() {
    
    $(".dropdown-check-list[LoadInStart]").each(function (index) {        

        LoadGICheckListBox(this);
    });
}

function LoadGICheckListBox(GIobj) {
 
    var container = $(GIobj);

    container.attr("value", "");
    set2anchor(container, "");

    var ul = $(GIobj).find("ul");

    if (ul.prop("tagName").toLowerCase() == "ul") {
        ul.find('li').remove();
 
        showGICHKLoaderWaiter(container);
        var inputstream = 'ParentName' + _streamItemSep + container.attr("ParentName");
        $.post(GIService, { serviceName: 'Com_GeneralInfoData_Get', inputstream: inputstream }, function (data) {
            if (data != null && data != "") {

                var lst = eval(data);
                var dataTextField = container.attr("DataTextField");
                var dataValueField = container.attr("DataValueField");

                if (dataTextField == null)
                    dataTextField = 'Title';
                if (dataValueField == null)
                    dataValueField = 'ID';


                for (var i = 0 ; i < lst.length ; i++) {
                    var liStr = '<li class="list-group-item" data-color="success" style="cursor: pointer;" value="' + lst[i][dataValueField] + '" >' + lst[i][dataTextField] + '</li>';
                  
                    //var liStr = '<li class="list-group-item" data-color="success" style="cursor: pointer;" value="' + lst[i][dataValueField] + '" ><span class="state-icon glyphicon glyphicon-check"></span>' + lst[i][dataTextField] + '<input class="hidden" type="checkbox"></li>';

                    ul.append(liStr);
 
                }
            }
            hideGICHKLoaderWaiter(container);

            initDropdownCheckedListBox(container);
        });
    }
}
 

function showGICHKLoaderWaiter(giSelectLoader) {
 
    var waiter = $(giSelectLoader).find(".waiter");
    if (waiter != null)
        ShowWaiterObject(waiter);
}

function hideGICHKLoaderWaiter(giSelectLoader) {


    var waiter = $(giSelectLoader).find(".waiter");
    if (waiter != null)
        HideWaiterObject(waiter);
}


function initDropdownCheckedListBox(container) {

    checkListBoxUlSetting($(container).find(".list-group.checked-list-box"));

    $(container).each(function (index) {
        $(document).click(function (evt) {
            var $tgt = $(evt.target);
            if (!$tgt.is(".items>li ,.items>li>span, .anchor")) {
                $(container).removeClass("visible"); // close all
            } else {
                $(container).removeClass("visible"); // close all
                $tgt.closest(container).addClass("visible");
                if ($tgt.is(".items>li, .items>li>span")) {
                    checkBoxAction(evt);
                }
            }
        });
    });
};

function dropdown_check_list_ValueChanged(e)
{
    setCheckBoxes(e);
}

function setCheckBoxes(container) {

    try {
        
        unCheckedAllBoxes(container);


        var containerValue = $(container).attr("value");

        if (containerValue) {
            var values = containerValue.split(_streamDynamicSomeValSep);

            var containerText = "";
            $.each(values, function (i, l) {
                container.find('.list-group.checked-list-box .list-group-item').each(function () {
                    if ($(this).attr("value") == l) {  //  li value
                        $(this).addClass("list-group-item-success");
                        $(this).addClass("active");
                        containerText += $(this).text() + ",";
                        $(this).find('span').removeClass('glyphicon-unchecked');
                        $(this).find('span').addClass('glyphicon-check');
                    }
                }); 
            });
            containerText = LTrim(containerText, ",");
            containerText = RTrim(containerText, ",");
            set2anchor(container, containerText);
        }

    } catch (e) {
        alert(e);
    }
}

function unCheckedAllBoxes(container) {
    
    set2anchor(container, "");
    container.find('.list-group.checked-list-box .list-group-item').each(function () {
         $(this).removeClass("list-group-item-success");
         $(this).removeClass("active");
     });   

    container.find('.list-group.checked-list-box .list-group-item span').each(function () {
         $(this).removeClass("glyphicon-check");
         $(this).addClass("glyphicon-unchecked");
     });

}
