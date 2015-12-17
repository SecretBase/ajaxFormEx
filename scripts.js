$(document).ready(function(e) {

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('#debug-form').ajaxFormEx({
        debug: true
    });

    var generalAjaxHandler = {
        beforesend: function (jqXHR, settings) {



        },
        successEnd: function (data, textStatus, jqXHR) {
            console.log(data);
            console.log('!!!!!!Rediect!!!!!!');
        }
    };

    var injectAjaxHandler = {
        alertUser: function (data, textStatus, jqXHR) {
            alert('This is this injectAjaxHandler.');
        }
    };

    $('.change-url').on('click', function (event) {

        event.preventDefault();

        var $this = $(event.currentTarget);

        injectAjaxHandler.changeUrl = function (jqXHR, settings) {

            console.log(this.attr('data-form-beforesend'));

            settings.url = event.currentTarget.getAttribute('data-url');

            this.removeAttr('data-form-beforesend');

        };

        $this.closest('form').attr('data-form-beforesend', 'changeUrl').trigger('submit');

    });


    $('.ajax-request').ajaxFormEx({
        debug: true,
        ajaxHandler: generalAjaxHandler,
        injectAjaxHandler: injectAjaxHandler
    });

});
