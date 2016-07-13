var bg_x = 0;
jQuery(document).ready( function($){

	$( '#More-domains' ).hide();
	$( '#Add-caption' ).click(function(){
		$( this ).toggleClass( 'invert' );
		$( 'i', this ).toggleClass( 'invert' );
		$( '#More-domains' ).toggle();
		$( '.more', '#Add-domains' ).toggle();
	});

	$("input, textarea", "#Offer").keydown( function(){
		$(this).removeClass("error");
	});

	$( "#new_offer, #new_try" ).click(function(){
		$("#f_offer").val("");
		$("#msg, #error_msg").fadeOut( 200, function(){ $("#Offer").fadeIn(500); } ); 
	});

});