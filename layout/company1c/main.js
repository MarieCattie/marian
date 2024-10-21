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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    }
    let timer;
    toggleSlick('.service-1c-publications__items', param);
    toggleSlick('.service-1c-program__items', param);
    toggleSlick('.service-1c__prices--mobile', param);
    function updateSlider() {
        timer = setTimeout(() => {
            toggleSlick('.service-1c-publications__items', param);
            toggleSlick('.service-1c-program__items', param);
            toggleSlick('.service-1c__prices--mobile', param);
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
})

//бургер
$('.burger').on("click", function () {
    $(this).toggleClass('c');
    $(document).find("#mobilemenu").toggleClass('show');

})

//Футер
$('.footer__menu-block-title').on('click', function (e) {
    e.preventDefault();

    if (!$(this).hasClass("active")) {
        $(".footer__menu-block-items").slideUp(400);
    }
    $(this).toggleClass("active");
    $(this).next().slideToggle();
})
