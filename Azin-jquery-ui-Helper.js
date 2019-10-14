
function _initDialogForm(pnl,_width,_height,showDuration,hideDuration) {
    
        if(showDuration == null)
            showDuration = 200;
        if(hideDuration == null)
            hideDuration = 400;

        $("#"+pnl).dialog({
            autoOpen: false,
            show: {
                effect: "explode",
                duration: showDuration
            },
            hide: {
                effect: "explode",
                duration: hideDuration,                
            },
        height: _height,
        width: _width,

        });        
}


    function popup(url, name, width, height) {
        settings = "toolbar=no,location=no,directories=no," +
                        "status=no,menubar=no,scrollbars=yes," +
                        "resizable=no,width=" + width + ",height=" + height;

        //MyNewWindow = window.open("http://" + url, name, settings);
        MyNewWindow = window.open(url, name, settings);

        //CUSTOMIZING A WINDOW
        /*
        option   explanation
        toolbar = yes | no    add/remove browsers toolbar
        location = yes | no   add/remove browsers location field
        directories = yes | no       add/remove browsers directories field
        status = yes | no     add/remove browsers status field
        menubar = yes | no    add/remove browsers menubar
        scrollbars = yes | no add/remove browsers scrollbars
        resizeable = yes | no allow new window to be resizable
        width = value window width in pixels
        height = value window height in pixels 
        */
    } 