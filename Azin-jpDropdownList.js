
(function ($) {

    $.fn.jpDropdownList = function (options) {
        var container = this;
        container.find('li>input').click(function (e) {
            container.attr("value", $(this).attr("value"));
            container.trigger('onValueChanged', [container.attr("value")]);
            //if (options.onValueChanged !== undefined) {
            //    options.onValueChanged( container.attr("value"));
            //}
        });
        return this;
    };

}(jQuery));

 