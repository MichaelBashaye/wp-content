(function (jQuery, elementor) {
    "use strict";

    var ElementsKit_WidgetArea = {
        init: function () {
            elementor.hooks.addAction('frontend/element_ready/global', function ($scope) {
                // console.log('foo');

                var editorButton = $scope.find('.widgetarea_warper_edit');

                editorButton.on('click', function () {
 
                    var iframeModal = window.parent.jQuery('.widgetarea_iframe_modal'),
                        iframe = iframeModal.find('#widgetarea-control-iframe'),
                        iframeLoading = iframeModal.find('.dialog-lightbox-loading'),
                        modalContainer = iframeModal.find('.dialog-type-lightbox');

                    var content_key = jQuery(this).parent().attr('data-elementskit-widgetarea-key'),
                        index = jQuery(this).parent().attr('data-elementskit-widgetarea-index'),
                        url = window.elementskit.resturl + 'dynamic-content/content_editor/widget/' + content_key + '-' + index;

                    window.parent.jQuery('body').attr('data-elementskit-widgetarea-key', content_key);
                    window.parent.jQuery('body').attr('data-elementskit-widgetarea-load', 'false');
                    // console.log([iframe, modalContainer]);

                    modalContainer.show();
                    iframeModal.show();
                    iframeLoading.show();
                    iframe.contents().find('#elementor-loading').show();
                    iframe.css('z-index', '-1');
                    iframe.attr('src', url);

                    iframe.on('load', function () {
                        iframeLoading.hide();
                        iframe.show();
                        iframe.contents().find('#elementor-loading').hide();
                        iframe.css('z-index', '1');
                    });
                });

                if (typeof window.parent.jQuery != 'undefined') {
                    var iframeCloseButton = window.parent.jQuery('.widgetarea_iframe_modal').find('.eicon-close');
                    iframeCloseButton.on('click', function () {
                        window.parent.jQuery('body').attr('data-elementskit-widgetarea-load', 'true');
                    });
                }

            });
        },
    };

    jQuery(window).on('elementor/frontend/init', ElementsKit_WidgetArea.init);

}(jQuery, window.elementorFrontend));