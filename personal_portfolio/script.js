$(document).ready(function() {
	$(".nav li").on("click", function() {
	  $(".nav li").removeClass("active");
	  $(this).addClass("active");
	});

	$(document).on("click", "a", function(event) {  
	  $("html, body").animate({
	    scrollTop: $( $.attr(this, 'href')).offset().top-70
	  }, 500);
	});
});