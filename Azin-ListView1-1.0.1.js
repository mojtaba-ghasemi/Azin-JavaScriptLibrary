function _loadListView1(serviceUrl, serviceName, inputstream, parentDiv, imgWaiter, pageNum) {

    var lstParentDiv = $("#" + parentDiv);

    $.post(serviceUrl, { MethodName: serviceName, inputstream: inputstream, pageNum: pageNum }, function (data) {
 
        lstParentDiv.empty();

    var arr = data.split('/$');
        var theme = arr[0];
        var lst = eval(arr[1]);
        

        for (var i = lst.length-1 ; i >= 0; i--) {
            var div = theme;
            
            for (var col in lst[i]) {
                div = replaceAll(div, "[" + col + "]", lst[i][col]);
            }
            div = div.replace(/\[.*?\]/g, ''); //remove enmpty cells           

            lstParentDiv.append(div);
            
        }
    });
}

function _loadListView1WithQuery(serviceUrl, parentDiv) {

  
    var lstParentDiv = $("#" + parentDiv);
    var queryStringvalue = getQueryStringAsStream();

    _isDocumentAjaxLoaderOn = 1;
    $.ajax({
        type: 'Post',
        url: serviceUrl,
        //data: JSON.stringify({ user: { name: 'Rintu', email: 'Rintu@gmial.com' } }),
        data: JSON.stringify({ queryString: queryStringvalue}),

        contentType: 'application/json; charset=utf-8',
        //dataType: 'json',
        success: function (msg) {
            var data = msg;
            try {
                        lstParentDiv.empty();
                        var arr = data.split('/$');
                        if (arr.length == 2) {
                            var theme = arr[0];

                            var lst = eval(arr[1]);

                            for (var i = lst.length - 1; i >= 0; i--) {
                                var div = theme;

                                for (var col in lst[i]) {
                                    div = replaceAll(div, "[" + col + "]", lst[i][col]);
                                }
                                div = div.replace(/\[.*?\]/g, ''); //remove enmpty cells           

                                lstParentDiv.append(div);
                            }
                        }
                    } catch (err) {
                        alert(err.message);
                    }
        },
        error: function (event, request, settings) {
            _isDocumentAjaxLoaderOn = 0;
        }
    });
 
 
}


//function ShowWaiter(imgWait) {
 
//    $("#" + imgWait).css({ visibility: "visible" });
 
//}

//function HideWaiter(imgWait) {
 
//    $("#" + imgWait).css({ visibility: "hidden" });
 
//}

 