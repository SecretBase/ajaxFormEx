$(document).ready(function(e) {

    var general_ajax_handler = {
            beforeSend: function(jqXHR, settings) {
                console.log(this);
            }
        };

        var specific_ajax_handler = {
            specificBeforesend: function(jqXHR, settings) {
                console.log('specificBeforesend');
            },
            specificSuccess: function(data, textStatus, jqXHR) {
                console.log(this);
                console.log('specificSuccess');
            },
            specificFail: function(data, textStatus, jqXHR) {
                console.log('specificFail');
            }
        };

        var sequence_ajax_handler = {

            general: {
                beforeSend: function() {
                    console.log('General beforeSend');
                },
                successStart: function() {
                    console.log('General Success Start');
                },
                successEnd: function() {
                    console.log('General Success End');
                },
                failStart: function() {
                    console.log('General fail Start');
                },
                failEnd: function() {
                    console.log('General fail end');
                },
                complete: function() {
                    console.log('General complete');
                },
                error: function() {
                    console.log('General Error');
                }
            },

            specific: {
                sequenceSuccess: function() {
                    console.log('sequenceSuccess');
                    return false;
                },
                sequenceFail: function() {
                    console.log('sequenceFail');
                    return false;
                }
            }
        };

    var $debugForm = $('.debug-form').ajaxFormEx({
        ajaxHandler: general_ajax_handler,
        debug: true
    });

    var gform = $('.gerenal-form').ajaxFormEx({
        ajaxHandler: general_ajax_handler,
        debug: true
    });

    var spForm = $('.specific-form').ajaxFormEx({
        ajaxHandler: general_ajax_handler,
        injectAjaxHandler: specific_ajax_handler,
        debug: true
    });

    var sqForm = $('.sequence-form').ajaxFormEx({
        ajaxHandler: sequence_ajax_handler.general,
        injectAjaxHandler: sequence_ajax_handler.specific,
        debug: true
    });

});
