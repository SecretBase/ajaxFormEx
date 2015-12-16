$(document).ready(function(e) {

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('#debug-form').ajaxFormEx({
        debug: true
    });

    var generalAjaxHandler = {
        successEnd: function (data, textStatus, jqXHR) {
            console.log('!!!!!!Rediect!!!!!!');
        }
    };

    var injectAjaxHandler = {
        alertUser: function (data, textStatus, jqXHR) {
            alert('This is this injectAjaxHandler.');
        }
    };

    $('.ajax-request').ajaxFormEx({
        debug: true,
        ajaxHandler: generalAjaxHandler,
        injectAjaxHandler: injectAjaxHandler
    });

});
