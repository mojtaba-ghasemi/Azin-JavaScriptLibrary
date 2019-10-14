(function ($) {

    $.fn.jpRadionBox = function (options) {

        var container = this; 
        this.find('.btn').click(function (e) {

            $(this).closest(".RadioBoxContainer").find('span').removeClass('glyphicon-check');
            $(this).closest(".RadioBoxContainer").find('span').addClass('glyphicon-unchecked');

            $(this).find('span').removeClass('glyphicon-unchecked');
            $(this).find('span').addClass('glyphicon-check');

            var selVal = $(this).attr("value");
            if (typeof selVal !== typeof undefined && selVal !== false) {
                $(this).closest(".RadioBoxContainer").attr("value", selVal);
                //if (options !== undefined && options.onValueChanged !== undefined) {
                //    options.onValueChanged(selVal);
                //}

                //$(document).trigger('onValueChanged.RadionBoxController', [selVal]);

                container.trigger('onValueChanged', [selVal]);

            }
        });
        return this;
    };

}(jQuery));


