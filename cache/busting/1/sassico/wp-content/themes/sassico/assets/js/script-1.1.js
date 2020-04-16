"use strict";

(function ($) {
  "use strict";

  $(window).on("scroll", function () {
    var scrolltop = $(window).scrollTop();
    if ($(document).width() < 992) {
      return;
    }
    if (scrolltop > 300) {
      $(".navbar-sticky").addClass("fixed-top");
    } else {
      $(".navbar-sticky").removeClass("fixed-top");
    }
  });
  $(".navbar-nav")
    .find(".dropdown-toggle")
    .on("click", function () {
      if ($(document).width() > 992) {
        return;
      }
      $(this)
        .siblings(".dropdown-menu")
        .slideToggle();
    });

  $(".nav-search").on("click", function () {
    $(this)
      .siblings(".search-block")
      .slideToggle();
  });

  $(window).on("load", function () {
    setTimeout(function () {
      $(".sassico-preloder").slideUp(800);
    }, 1000);
  });

  //  back to top

  $(window).on("scroll", function () {
    var scrolltop = $(window).scrollTop(),
      docHeight = $(document).height() / 2;

    if (scrolltop > docHeight) {
      $(".back_to_top, .sassico-back-to-top-wraper").fadeIn("slow");
    } else {
      $(".back_to_top, .sassico-back-to-top-wraper").fadeOut("slow");
    }
  });
  $("body, html").on("click", ".back_to_top, .sassico-back-to-top", function (
    e
  ) {
    e.preventDefault();
    $("html, body").animate({
        scrollTop: 0
      },
      800
    );
  });

  if ($(".sassico-service-column").length > 0) {
    $(".sassico-service-column").on("mouseenter mouseleave", function (event) {
      if (event.type === "mouseenter") {
        $(this)
          .children()
          .addClass("sassico-service-featured");
      }

      if (event.type === "mouseleave") {
        $(".sassico-service-column")
          // .not(this)
          .children()
          .removeClass("sassico-service-featured");
      }
    });
  }

  if ($(".sassico_direction_aware_hover_effects").length > 0) {
    $(".sassico_direction_aware_hover_effects").each(function () {
      if ($(window).width() < 991) {
        return;
      }

      $(this)
        .find(".elementor-row")
        .append('<div class="indicator"></div>');

      var leftPos = $(this)
        .find(".elementor-inner-column")
        .eq(1)
        .position().left,
        column = $(this).find(".elementor-inner-column"),
        indicator = ".indicator";

      column.siblings(indicator).css("width", column.outerWidth());
      column.siblings(indicator).css("left", leftPos);

      column.on("mouseenter mouseleave", function (event) {
        if (event.type === "mouseenter") {
          $(this)
            .siblings(indicator)
            .css("left", $(this).position().left);
        }
        if (event.type === "mouseleave") {
          $(this)
            .siblings(indicator)
            .css("left", leftPos);
        }
      });
    });
  }

  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "animated", // animation css class (default is animated)
    mobile: false // trigger animations on mobile devices (default is true)
  });
  wow.init();

  $('.xs_vertical_menu').each(function () {
    $(this).find('.menu-item-has-children > a').after('<i class="elementskit-submenu-indicator"></i>');
  });

  function elementskit_event_manager(_event, _selector, _fn) {
    $(document).on(_event, _selector, _fn);
  }
  elementskit_event_manager('click', '.xs_vertical_menu .elementskit-submenu-indicator', function (e) {
    if (e.target.className === 'elementskit-submenu-indicator') {
      var li = $(this).parent();
      var dropdown = li.find('>.elementskit-dropdown, >.elementskit-megamenu-panel');

      dropdown.find('.elementskit-dropdown-open').removeClass('elementskit-dropdown-open');

      if (dropdown.hasClass('elementskit-dropdown-open')) {
        dropdown.removeClass('elementskit-dropdown-open');
      } else {
        dropdown.addClass('elementskit-dropdown-open');
      }
    }
  });
})(jQuery);