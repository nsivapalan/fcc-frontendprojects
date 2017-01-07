// var source = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&suggest=1&callback=?&search="
var source = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srsearch="
var searchItem = "";

$("#find").on("click", function() {
  searchItem = document.getElementById("searchItem").value;
  source += searchItem;
  getResults(source);
  
});

function getResults(source) {
  console.log("The source is " + source);
  $.getJSON(source, function(data) {
    console.log("Json activate");
    console.log(data[0]);
  });
}