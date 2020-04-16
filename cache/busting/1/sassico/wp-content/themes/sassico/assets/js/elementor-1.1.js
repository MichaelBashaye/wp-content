'use strict';

(function ($, elementor) {
    "use strict";

    var Sassico = {

        init: function init() {

            var widgets = {
                'sassico-testimonial.default': Sassico.Testimonial,
                'sassico-service.default': Sassico.Service,
                'sassico-languages-switch.default': Sassico.Language_Switch,
                'sassico-back-to-top.default': Sassico.Back_To_Top,
                'sassico-gallery-slider.default': Sassico.Gallery_Slider
            };

            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });

            elementor.hooks.addAction('frontend/element_ready/global', Sassico.GlobalCallback);
        },

        Testimonial: function Testimonial($scope) {
            if ($scope.find('.sassico-testimonial-slider').length > 0) {
                new Swiper($scope.find('.sassico-testimonial-slider'), {
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: $scope.find('.sassico-button-next'),
                        prevEl: $scope.find('.sassico-button-prev')
                    }
                });
            }

            if ($scope.find('.sassico-sync-slider-thumbs').length > 0 && $scope.find('.sassico-sync-slider-top').length > 0) {
                var galleryThumbs = new Swiper($scope.find('.sassico-sync-slider-thumbs'), {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    freeMode: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    breakpoints: {
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        }
                    }
                });
                new Swiper($scope.find('.sassico-sync-slider-top'), {
                    spaceBetween: 0,
                    navigation: {
                        nextEl: $scope.find('.sassico-button-next'),
                        prevEl: $scope.find('.sassico-button-prev')
                    },
                    thumbs: {
                        swiper: galleryThumbs
                    }
                });
            }
        },

        Service: function Service($scope) {
            if ($scope.find('.sassico-service-slider').length > 0) {
                var current = $scope.find('.sassico-service-slider'),
                    service_slider = new Swiper(current, {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        autoplay: {
                            delay: 2000
                        },
                        loop: current.data('loop') ? current.data('loop') : false,
                        navigation: {
                            nextEl: $scope.find('.xs-arrows-next'),
                            prevEl: $scope.find('.xs-arrows-prev')
                        },
                        breakpoints: {
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 30
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }
                    });

                current.on('mouseenter mouseleave', function (event) {
                    if (event.type === 'mouseenter') {
                        service_slider.autoplay.stop();
                    }
                    if (event.type === 'mouseleave') {
                        service_slider.autoplay.start();
                    }
                });
            }
        },

        Language_Switch: function Language_Switch($scope) {
            if ($scope.find('.xs-modal-popup').length > 0) {
                $scope.find('.xs-modal-popup').magnificPopup({
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: false,
                    callbacks: {
                        beforeOpen: function beforeOpen() {
                            this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
                        }
                    }
                });
                $scope.find('.flag-lists.flag-list-placeholder li a, .language_switch_two.placeholder_switch li a').on('click', function () {
                    alert("Sassico supports WPML plugin! The language list will be automatically added to your pages when you install the plugin. ");
                    return false;
                });
            }
        },

        Back_To_Top: function Back_To_Top($scope) {
            $scope.find('.sassico-back-to-top img').each(function () {
                var img = $(this);
                var attributes = img.prop("attributes");
                var imgURL = img.attr("src");
                $.get(imgURL, function (data) {
                    var svg = $(data).find('svg');
                    svg = svg.removeAttr('xmlns:a');
                    $.each(attributes, function () {
                        svg.attr(this.name, this.value);
                    });
                    img.replaceWith(svg);
                });
            });
        },

        Gallery_Slider: function Gallery_Slider($scope) {
            if ($scope.find('.xs-gallery-slider').length > 0) {
                var current = $scope.find('.xs-gallery-slider'),
                    gallery_slider = new Swiper(current, {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        loop: current.data('loop') ? current.data('loop') : false,
                        autoplay: {
                            delay: 2000
                        },
                        navigation: {
                            nextEl: $scope.find('.xs-arrows-next'),
                            prevEl: $scope.find('.xs-arrows-prev')
                        },
                        breakpoints: {
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }
                    });
                current.on('mouseenter mouseleave', function (event) {
                    if (event.type === 'mouseenter') {
                        gallery_slider.autoplay.stop();
                    }
                    if (event.type === 'mouseleave') {
                        gallery_slider.autoplay.start();
                    }
                });
            }
        }
    };

    $(window).on('elementor/frontend/init', Sassico.init);
})(jQuery, window.elementorFrontend);