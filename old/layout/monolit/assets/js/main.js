/*adaptive menu start*/
$('.menu.adaptive').on('click', function(){
	$(this).toggleClass('opened');
	if($(this).hasClass('opened')){
		$('.mobile_menu').toggleClass('opened').slideDown();
	}else{
		$('.mobile_menu').toggleClass('opened').slideUp();
	}

});
$('.mobile_menu .has-child').on('click', function(e){
	var parentLi=$(this);
	e.preventDefault();
	parentLi.toggleClass('opened');
	parentLi.find('.dropdown').slideToggle();
})

$('.mobile_menu .search-input-div input').on('keyup', function(e) {
	var inputValue = $(this).val();
	$('.center_block .stitle_form input').val(inputValue);
	if(e.keyCode == 13){
		$('.center_block .stitle_form form').submit();
	}
});

$('.center_block .stitle_form input').on('keyup', function(e) {
	var inputValue = $(this).val();
	$('.mobile_menu .search-input-div input').val(inputValue);
	if(e.keyCode == 13){
		$('.center_block .stitle_form form').submit();
	}
});

$('.fancy').fancybox({
	openEffect  : 'fade',
	closeEffect : 'fade',
	nextEffect : 'fade',
	prevEffect : 'fade',
});

$('.mobile_menu .search-button-div button').on('click', function(e) {
	e.preventDefault();
	var inputValue = $(this).parents().find('input').val();
	$('.center_block .stitle_form input').val(inputValue);
	$('.center_block .stitle_form form').submit();
});
/*adaptive menu end*/

$('.btn.btn-add').on('click', function(){
	$.ajax({
		type:"GET",
		url:arOptimusOptions['SITE_DIR']+"ajax/clearBasket.php",
		success: function(data){
		}
	});
})