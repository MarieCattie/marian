/* Add here all your JS customizations */
/* jshint esversion: 9 */
$('.tableWrap').scroll(function(){
    var $this = $(this),
        scrollPercentage = 100 * $this.scrollLeft() / ($(this).find('table').width()-$this.width());
    var scrollResult = scrollPercentage;
    console.log(scrollResult);
    if(scrollResult > 90) {
        $(this).addClass("notFade");
        console.log("yep");
    } else {
        $(this).removeClass("notFade");
        console.log("nope");
    }
});

$(function ($) {
    $('.detail img').each(function () {
        // пропускаем обработку картинок из комментариев
        if (this.dataset.src.indexOf('burlakastudio.realcommenter') !== -1) return true;
        var checkWrap = $(this).parent().get(0).tagName;
        var link = $(this).attr('data-src');
        if (checkWrap != "A") {
            $(this).wrap('<a href="' + link + '" class="fancybox cont-img"></a>');
        }
    });
});

// Виджет с соц. сетями
$(function ($) {

    if (window.screen.width < 1200) {

        $(document).on('click', '.social-widget__toggle', function () {

            $(this).parent().toggleClass('__active');

            return false;
        });
    }
});

// Виджет с соц. сетями
$(function ($) {

    $(".popup-link").fancybox({
        fitToView: false,
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        width: '100%',
        maxWidth: 500,
    });
});


// Добавление data артибука всем кнопка вызова формы
$(document).ready(function () {

    $(function ($) {

        let popup_btns = $('[data-event="jqm"]');

        popup_btns.each(function () {

                let link = $(location).attr('pathname');

                $(this).attr('data-autoload-link', link);

        });

    });

    // фикс изображений в кейсах
    const images = $('.img-responsive1');
    images.each((i, item) => {
        const src = item.src;
        if (src.indexOf('data:image/') !== -1) {
            item.src = item.dataset.src;
           // item.dataset.src = src;
        }
    });
});

//Активный курсор при вызове строки поиска
$(function() {
    $(document).on('click', '.inline-search-show', function() {
        let input = $('input#title-search-input');
        if (typeof input !== 'undefined') {
            input.focus();
        }
    })
});

// Убираем символы пробела
$('.right_block').html(function (i, h) {
    return h.replace(/&nbsp;/g, ' ');
});
// Общая функция для переключения карточек в режим слайдера для мобилки
function toggleSlick(selector, params = {}){
    let minWidth = params.minWidth || 0;
    let maxWidth = params.maxWidth || 1025;
    const defaultParams  = {
		autoplay: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        //slickPause: 1,
        prevArrow: false,
        centerMode: true,
        variableWidth: true,
        nextArrow: false,
        adaptiveHeight: true,
        customPaging: function (slider, i) {
            return "<button><div class='progress'></div></button>";
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    variableWidth: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 678,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: false,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: false,
                }
            },
        ]
    };
    const resultParams = { ...defaultParams, ...params };

    if (document.documentElement.clientWidth < maxWidth && document.documentElement.clientWidth > minWidth) {
        if (!$(selector + ' .slick-track')[0]) {
            const slider = $(selector).slick(resultParams);

            $(".slick-dots .slick-active .progress").css({
                transition: "unset",
                width: "0",
            });
            slider.slick('slickPause');
            $(document).ready(() => {
                setTimeout(() => {
                    $(".slick-dots .slick-active .progress").css({
                        transition: "",
                        width: "",
                    });
                    slider.slick('slickPlay');
                }, 2500)
            })
        }
    } else {
        if ($(selector + ' .slick-track')[0]) {
            $(selector).slick('unslick');
        }
    }
}

// фикс согласия с пользовательским соглашением
$(document).click((e) => {
    if (e.target.attributes['for']) {
        $(e.target).siblings('input[type=checkbox]').trigger('click');
    }
});