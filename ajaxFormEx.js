(function($) {

    $.fn.ajaxFormEx = function(options) {

        //  ajax form ex config
        var afxc = $.extend({
            debug: false,
            ajaxHandler: {
                beforeSend: function(jqXHR, settings) {},
                successStart: function(data, textStatus, jqXHR) {},
                successEnd: function(data, textStatus, jqXHR) {},
                failStart: function(data, textStatus, jqXHR) {},
                failEnd: function(data, textStatus, jqXHR) {},
                complete: function(jqXHR, textStatus) {},
                error: function(jqXHR, textStatus, errorThrown) {}
            },
            injectAjaxHandler: null
        }, options);

        var event_handler = {
            beforeSend: function(jqXHR, settings) {

                if (afxc.debug) {
                    console.log('---------- BeforeSend Start ----------');
                }

                if (typeof afxc.ajaxHandler.beforeSend === 'function') {
                    afxc.ajaxHandler.beforeSend.call(this, jqXHR, settings);
                }

                var formBeforesend = this.data('form-beforesend');

                if (typeof formBeforesend !== 'undefined' && typeof afxc.injectAjaxHandler[formBeforesend] === 'function') {
                    afxc.injectAjaxHandler[formBeforesend].call(this, jqXHR, settings);
                }

                if (afxc.debug) {
                    console.log('---------- BeforeSend End ------------');
                }
            },
            success: function(data, textStatus, jqXHR) {

                if (afxc.debug) {
                    console.log('---------- Success Start -------------');
                }

                if (typeof afxc.ajaxHandler.successStart === 'function') {
                    afxc.ajaxHandler.successStart.call(this, data, textStatus, jqXHR);
                }

                var formSuccess = this.data('form-success');

                if (typeof formSuccess !== 'undefined' && typeof afxc.injectAjaxHandler[formSuccess] === 'function') {

                    if (afxc.injectAjaxHandler[formSuccess].call(this, data, textStatus, jqXHR) === false) {
                        return;
                    }
                }

                if (typeof afxc.ajaxHandler.successEnd === 'function') {
                    afxc.ajaxHandler.successEnd.call(this, data, textStatus, jqXHR);
                }

                if (afxc.debug) {
                    console.log('---------- Success End ---------------');
                }

            },
            complete: function(jqXHR, textStatus) {

                if (afxc.debug) {
                    console.log('---------- Complete Start ------------');
                }

                var formComplete = this.data('form-complete');

                if (typeof formComplete !== 'undefined' && typeof afxc.injectAjaxHandler[formComplete] === 'function') {

                    var is_continue = afxc.injectAjaxHandler[formComplete].call(this, jqXHR, textStatus);

                    if (is_continue === false)
                        return;
                }

                if (typeof afxc.ajaxHandler.complete === 'function') {
                    afxc.ajaxHandler.complete.call(this, jqXHR, textStatus);
                }

                if (afxc.debug) {
                    console.log('---------- Complete End --------------');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {

                if (afxc.debug) {
                    console.log('---------- Error Start ---------------');
                }

                if (typeof afxc.ajaxHandler.error === 'function') {
                    afxc.ajaxHandler.error.call(this, jqXHR, textStatus, errorThrown);
                }

                var formError = this.data('form-error');

                if (typeof formError !== 'undefined' && typeof afxc.injectAjaxHandler[formError] === 'function') {

                    if (afxc.injectAjaxHandler[formError].call(this, data, textStatus, jqXHR) === false) {
                        return;
                    }
                }

                if (afxc.debug) {
                    console.log('---------- Error End -----------------');
                }
            }
        };

        this.listForm = function () {
            console.log(this);
        }

        this.listInjectAjaxHandler = function () {
            console.log(afxc.injectAjaxHandler);
        }

        this.listAjaxHandler = function () {
            console.log(afxc.ajaxHandler);
        }

        return this.each(function (index, form) {

            var $this = $(this);

            $this.on('submit', function (event) {

                event.preventDefault();

                $.ajax({
                    url: $this.attr('action'),
                    method: $this.attr('method'),
                    dataType: 'json',
                    data: $this.serialize(),
                    beforeSend: event_handler.beforeSend.bind($this),
                    success: event_handler.success.bind($this),
                    complete: event_handler.complete.bind($this),
                    error: event_handler.error.bind($this)
                });

            });

        });

    }

})(jQuery)
