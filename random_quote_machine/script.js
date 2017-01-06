var source = "https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

$(document).ready(function() {
	generateQuote(); //load quote immediately

	$("#generate").on("click", function() {
	  generateQuote();
	});

	function generateQuote() {
	  $.getJSON(source, function(data) {
	  $("#quote").html("<i style='color: #1e1d1d' class='fa fa-quote-left' aria-hidden='true'></i>" + " " + data["quoteText"] + "<i style='color: #1e1d1d' class='fa fa-quote-right' aria-hidden='true'></i>");
	  $("#author").html(data["quoteAuthor"]);
	      
	  $("#tweet").html("<a target='blank' class='twitter-share-button' href='https://twitter.com/intent/tweet?text=" + data["quoteText"] + "- " + data["quoteAuthor"] + "'>" + "<i style='color:#55acee' class='fa fa-twitter fa-3x' aria-hidden='true'></i>Tweet</a>");
	    });
	}

});

// api quotes source:
// http://forismatic.com/en/api/
