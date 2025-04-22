$(document).ready(function() {

    // Содержание на мобильной версии
    $(document).on("click", "#contentToggle", function() {
        $(document).find("#contentTitle").toggleClass("active")
        $(document).find("#contentList").slideToggle();
    })
    $(window).on('resize', function () {
        
    })
    
    //Параметры для слайдера
    const param = {
        maxWidth: 520,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }
    let timer;
    toggleSlick('.service-1c-publications__items', param);
    toggleSlick('.service-1c-program__items', param);
    toggleSlick('.service-1c__prices--mobile', param);
    toggleSlick('.program-services-quality__block', param);

    function updateSlider() {
        timer = setTimeout(() => {
            toggleSlick('.service-1c-publications__items', param);
            toggleSlick('.service-1c-program__items', param);
            toggleSlick('.service-1c__prices--mobile', param);
            toggleSlick('.program-services-quality__block', param);
        }, 250);
    }
    $(window).resize(function(){
        if(timer) clearInterval(timer);
        updateSlider();
    });
    
    //Аккордеон
    $('.service-1c__accordion-header').click(function () {
        var $accordionItem = $(this).parent();
        var $accordionContent = $accordionItem.find('.service-1c__accordion-content');

        // Закрываем все открытые аккордеоны
        $('.service-1c__accordion-item').not($accordionItem).removeClass('active').find('.service-1c__accordion-content').slideUp();
        $('.service-1c__accordion-item').not($accordionItem).find('.service-1c__accordion-icon').css('transform', 'rotate(0deg)');

        // Открываем или закрываем текущий аккордеон
        $accordionItem.toggleClass('active');
        $accordionContent.stop().slideToggle();
    });
    const reviewSliderParams = {
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: $('.programs-reviews__slider-prev'),
        nextArrow: $('.programs-reviews__slider-next'),
        infinite: true,
        centerMode: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    arrows: false
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    arrows: false
                }
            }
        ]
    };

    function initReviewSlider() {
        $('.programs-reviews__slider').slick(reviewSliderParams);
    }

    // Инициализация слайдера при загрузке страницы
    initReviewSlider();

    // Обновление слайдера при изменении размера окна
    $(window).resize(function() {
        initReviewSlider();
    });
    $(document).on("click", ".program-services-quality__showmore--clients", function() {
        const itemText = $(this).closest(".program-services-quality__item--clients").find('.program-services-quality__text--clients').text()

        console.log(itemText)
        $(document).find(".program-services-quality__fixed-popup--clients").find(".program-services-quality__fixed-popup-wrapper--clients").find("#popup-clients-text").html(itemText)
        $(document).find(".program-services-quality__fixed-popup--clients").addClass('popup-show')
    })
    $(document).on("click", ".program-services-quality__fixed-popup-button--clients", function() {
        $(".program-services-quality__fixed-popup--clients").removeClass("popup-show")
    })
    $(document).on("click", ".program-services-quality__fixed-popup--clients", function(e) {
        $(".program-services-quality__fixed-popup--clients").removeClass("popup-show")
    })
    $(document).on("click", ".program-services-quality__fixed-popup-wrapper--clients", function(e) {
        e.stopPropagation();
    })
    $('.program-services-quality__button.show-text-js.text-more, .program-services-quality__button.show-text-js.text-collapse').click((e => {
        $(e.target).parent().children('.text-more').toggleClass('d-none');
        $(e.target).parent().children('.text-collapse').toggleClass('d-none');
        $(e.target).parent().children('.program-services-quality__text__full').toggleClass('d-none');
        $(e.target).parent().children('.program-services-quality__text').toggleClass('transparent-color');
    }));
})


