$(document).ready(function () {
    
    $(".dynamicListView[autoloading='True']").each(function (index) {
 
        var container = $(this);
        InitListView(container);
    });
});

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

function InitListView(container) {
          _loadListView1WithQuery(container, StaticMethodServerUrl);
        pagination_load(container);  
}

function _loadListView1WithQuery(container, serviceUrlvarName) {
   
    var serviceName = container.attr("loadListServicename");
    var lstParentDiv = container; //$("#" + parentDiv);
 
    var queryStringvalue = getQueryStringAsStream();
 

    _isDocumentAjaxLoaderOn = 1;
    
 
    $.post(serviceUrlvarName, { serviceName: serviceName, inputstream: queryStringvalue }, function () {
       
      })
      .done(function (data) {
        
 
          try {
              lstParentDiv.empty();
              //var arr = data.split('/$');
              //if (arr.length == 2) {
              //var theme = arr[0];
              //var lst = eval(arr[1]);
            
              var theme = gettem();
              if (data != null && data.replace(" ", "") != "") {
                  var lst ;
                  try {
                      lst = eval(jsonEscape(data)); // remove all new  line at the first
                  } catch (e) {
                      logError("Azin-ListView_Responsive-1.0.0", "_loadListView1WithQuery",
                          "eval list error. for service : " + serviceName + " and inputstream " + queryStringvalue, e);
                  } 
                  
                 

                  for (var i = lst.length - 1; i >= 0; i--) {
                      var div = theme;

                      for (var col in lst[i]) {
                          div = replaceAll(div, "[" + col + "]", lst[i][col]);
                      }
                      div = div.replace(/\[.*?\]/g, ''); //remove enmpty cells           

                      lstParentDiv.append(div);
                  }
              }
              //}

          } catch (err) {
              alert("نمایش این صفحه با خطا مواجه شده است");
          }
 
      })
      .fail(function () {
       
    
          _isDocumentAjaxLoaderOn = 0;
      })
      .always(function () {
         
        
      });
}




function gettem() {
    var tem = '<div class="col-md-3 col-sm-3 col-md-4 col-sm-4 col-xs-6 col-mini-12"> ' +
    '<div class="b-product-preview"> '+
        '<div class="b-product-preview__img view view-sixth"> '+
            '<img data-retina="" src="/[PhotoURLs]" alt="" width="268"> ' +
            '<div class="b-item-hover-action f-center mask"> '+
    '<div class="b-item-hover-action__inner"> ' +
        '<div class="b-item-hover-action__inner-btn_group">' +
        '<a href="http://www.sungeetheme.com/html/shop_listing_col.html#" class="b-btn f-btn b-btn-light f-btn-light info"><i class="fa fa-heart"></i></a>' +
        '<a href="http://www.sungeetheme.com/html/shop_listing_col.html#" class="b-btn f-btn b-btn-light f-btn-light info"><i class="fa fa-shopping-cart"></i></a>' +
        '<a href="ProductDetail?productkey=[GUID]" target="_blank" class="b-btn f-btn b-btn-light f-btn-light info"><i class="fa fa-link"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="b-product-preview__content">' +
        '<div class="b-product-preview__content_col">' +
        '<a href="ProductDetail?productkey=[GUID]" target="_blank" class="f-product-preview__content_title"> <span> [FarsiTitle] <br />  [EnglishTitle] </span></a>' +
        '</div>' +
        '<div class="b-product-preview__content_col">' +
        '<span class="b-product-preview__content_price f-product-preview__content_price f-primary-b"> [Price]</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return tem;
}

function pagination_load(container) {
    var loadPagingServicename = container.attr("loadPagingServicename");
    if (loadPagingServicename != null && loadPagingServicename != "") {
        var paginationClassName = container.attr("paginationClassName");
        _postDataAsMonoValue(StaticMethodSingleValueServerUrl, loadPagingServicename, getQueryStringAsStream(), function (maxentries) {
            InitPagination(paginationClassName  , maxentries , function(page) {
                setCriteria2QS("page", page);                
                _loadListView1WithQuery(container, StaticMethodServerUrl);

            });
        });
    }
}

 