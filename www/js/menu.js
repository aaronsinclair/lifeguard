jQuery(document).ready(function() {
	
	/* $(".systemmenu").click(function() {
		$(".systemsubmenu").toggle();
		var state=$(".systemsubmenu").css("display");
		$.post( "/ajax/functions.php", {'state': state, 'updateMenuState': 1}, function( data ) {
		  console.log(data);
		});
	}); */

	$(document).on('click','.menu-button-wrap .toggle-menu',function(){
		$('nav').toggleClass('show-mobile-menu');
	});
	
});