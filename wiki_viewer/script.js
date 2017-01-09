$(document).ready(function() {

	var source = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&callback=?&search=cricket";
	// var source = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srsearch="
	var searchItem = "";

	$("#find").click(getResults(source));

	// $("#find").on("click", function() {
	//   searchItem = document.getElementById("searchItem").value;
	//   source += searchItem;
	//   console.log(source);
	//   getResults(source);
	// });

	function getResults(source) {
	  console.log("The source is " + source);
	  console.log(source);
	  $.getJSON(source, function(data) {
	    console.log("Json activate");
	    console.log(data);
	    for (var i = 0; i < 10; i++) {
	    	addResult(data[1][i], data[2][i], data[3][i]);
	    }
	  });
	}

	function addResult(title, des, link) {

		$("#searchResults").append("<li>" + "<a target='_blank' href='" + link + "'>" + "<h3>" + title
		+ "</h3>" + "</a>" + "<br>" + des + "</li>");

	}

});

