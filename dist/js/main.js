/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
  initialDate = new Date(),

  $document = $(document),
  $window = $(window),
  $html = $("html"),

  isDesktop = $html.hasClass("desktop"),
  isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch = "ontouchstart" in window,

  plugins = {
    pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
    rdNavbar: $(".rd-navbar"),
    navbarToggle: $(".rd-navbar-toggle"),
    swiper: $(".swiper-container")


  };

$(function () {
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
          .done(function () {
            $html.addClass("ie-10");
            PointerEventsPolyfill.initialize({});
          });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }

  /**
   * UI To Top
   * @description Enables ToTop Button
   */
  if (isDesktop) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }

  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }
});

new WOW().init();

var swiperAnimation = new SwiperAnimation();
var mySwiper = new Swiper('.slider__container', {
  //loop: true,
  speed: 600,
  effect: 'fade',
  autoplay: {
    delay: 5000,
  },
  on: {
    init: function () {
      swiperAnimation.init(this).animate();
    },
    slideChange: function () {
      swiperAnimation.init(this).animate();
    }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + 0 + (index + 1) + '</div>';
    },
  },
});

var swiperSliderInner = new Swiper('.slider-inner__slider-container', {
  speed: 600,
  //effect: 'fade',
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: '.btn-swiper-next',
    prevEl: '.btn-swiper-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletClass: 'swiper-pagination-bullet-inner-slider',
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + 0 + (index + 1) + '</div>';
    },
  },
});

var swiperAbout = new Swiper('.about-main__slider-container', {
  pagination: {
    el: '.swiper-pagination-about',
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'swiper-pagination-bullet-about',


  }
});

var swiperProduct = new Swiper('.product__slider-container', {
  //effect: 'fade',
  pagination: {
    el: '.swiper-pagination-product',
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'swiper-pagination-bullet-about'
  }
});

var swiperNewProduct = new Swiper('.product-new-main__slider-container', {
  pagination: {
    el: '.swiper-pagination-new-product',
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'swiper-pagination-bullet-product-new',


  }
});

var swiperPartners = new Swiper('.our-partners__slider-container', {
  slidesPerView: 4,
  spaceBetween: 0,
  // init: false,
  pagination: {
    el: '.swiper-pagination-partners',
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'swiper-pagination-bullet-partners'
  },
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 0,
    }
  }
});

/*year copyright*/
var now = new Date();
var getYear = now.getFullYear();
var elCopyrightYear = document.querySelector('#copyright');
if (elCopyrightYear) {
  elCopyrightYear.innerHTML = getYear;
}
/*button share*/
(function () {
  var share = document.querySelector('.share__icon');
  var hint = document.querySelector('.share__hint');
  if (share) {
    share.addEventListener('click', function () {
      hint.classList.toggle('share__hint--visible');
    })
  }
})();

(function () {
  var googleMap = document.getElementById("map");
  if (googleMap) {
    // initMap() - функция инициализации карты
    //noinspection JSAnnotator
    function initMap() {
      // Координаты центра на карте. Широта: 56.2928515, Долгота: 43.7866641
      var centerLatLng = new google.maps.LatLng(55.7184502, 37.6785179);
      // Обязательные опции с которыми будет проинициализированна карта
      var mapOptions = {
        center: centerLatLng, // Координаты центра мы берем из переменной centerLatLng
        zoom: 15,               // Зум по умолчанию. Возможные значения от 0 до 21
        scrollwheel: false,
        //styles:

      };
      // Создаем карту внутри элемента #map
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      // Создаем маркер на карте
      var marker = new google.maps.Marker({

        // Определяем позицию маркера
        position: {lat: 55.7184502, lng: 37.6785179},

        // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
        map: map,

        // Пишем название маркера - появится если навести на него курсор и немного подождать
        title: 'Delakrua',
        // Укажем свою иконку для маркера
        icon: 'dist/images/map-marker.png'

      });

      // Создаем наполнение для информационного окна
      var contentString = '<div>'+
        '<div>'+
        '</div>'+
        '<h3>Delakrua</h3>'+
        '<div>'+
        '<p>Cерия профессиональных средств по уходу за ногтями</p>'+
          '<p>г. Москва, станция метро Дубровка, ТК Дубровка, Линия 5, Место 190</p>'+
        '<p>Сайт: <a href="//www.delakrua.com" target="blank">www.delakrua.com</a>'+
        '</p>'+
        '</div>'+
        '</div>';

      // Создаем информационное окно
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });

      // Создаем прослушивание, по клику на маркер - открыть инфо-окно infowindow
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
// Ждем полной загрузки страницы, после этого запускаем initMap()
    google.maps.event.addDomListener(window, "load", initMap);
  }

})();


$(function () {
  $('[data-toggle="popover"]').popover({
    html: true
    }
  )
})

