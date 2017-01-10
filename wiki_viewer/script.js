$(document).ready(function() {

	var original = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&callback=?&search=";
	var source = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&callback=?&search=";
	var searchItem = "";

	$("#find").on("click", function() {
		source = original;
		$("#searchResults").html("");
		if ($("#searchItem").val().length === 0) {
			alert("Please enter a value!");
		} else {
			searchItem = document.getElementById("searchItem").value;
			console.log(searchItem);
			source += searchItem;
			getResults(source);
		}
	});

	function getResults(source) {
	  console.log("The source is " + source);
	  $.getJSON(source, function(data) {
	    console.log(data);
	    if (data[1].length === 0) {
	    	noResults();
	    } else {
		    	for (var i = 0; i < data[1].length; i++) {
	    			addResult(data[1][i], data[2][i], data[3][i]);
	    		}
	    	}
	  });
	}

	function addResult(title, des, link) {
		$("#searchResults").append("<a target='_blank' href='" + link + "'><li>" + "<h4>" + title
		+ "</h4>" + des + "</li></a>");
	}

	function noResults() {
		$("#searchResults").append("<li><h4>No results. Please try again!</h4></li>");		
	}

	$('#top').click(function() {
    $('html, body').animate({scrollTop: '0px'});
  });

});

