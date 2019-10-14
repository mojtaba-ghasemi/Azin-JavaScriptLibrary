
function openDialog(params) {
    try {
        $(".azinDialogBox .close").click(function (e) {
            closeDialog();
        });

        $("body").keypress(function (e) {
            var key = e.which;
            if (key == 0) // the enter key code
            {
                closeDialog();
            }
        });

        var panle = $("body");
        $(panle).addClass("dialogLoading");
        
        //$(".azinDialogBox").show(slow);
        $(".azinDialogBox").fadeIn(700);
        ;
        $(".dialogInputParams").attr("value" , params);

    } catch (e) {
        alert(e);
    }

}

function closeDialog() {
    try {        
        var panle = $("body");
        $(".azinDialogBox").hide("slow" , function() {
            $(panle).removeClass("dialogLoading");
            $(".dialogInputParams").attr("value", "");
        });
    } catch (e) {
        alert(e);
    }

}


 

 
