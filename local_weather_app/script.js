$(document).ready(function() {
	var source = "http://api.openweathermap.org/data/2.5/weather";
	var key = "c8e7fa10e9b32b58e31c0744ddbae914";
	var tempF;
	var tempC;
	var isInF = true;

	var hot = "https://wallpaperscraft.com/image/sea_sand_sky_81899_1920x1080.jpg";
	var warm = "https://wallpaperscraft.com/image/waterfall_trees_mountains_sky_grass_summer_87320_1920x1080.jpg";
	var cool = "https://wallpaperscraft.com/image/mountains_sky_reflection_grass_lake_river_93232_1920x1080.jpg";
	var cold = "https://wallpaperscraft.com/image/lake_grass_cloudy_bad_weather_despondency_mountains_52128_1920x1080.jpg";
	var freezing = "https://wallpaperscraft.com/image/sunset_winter_trees_landscape_86143_1920x1080.jpg";

	// main
	$.getJSON("http://ip-api.com/json", function(pos) {
	    var lat = pos.lat;
	    var lon = pos.lon;
	    console.log("Lat is " + lat + " And lon is " + lon);
	    source += "?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&dataType=jsonp";
	    getWeather(source);
	    $("#change").on("click", change);
	});

	// get the weather based on user's location
	function getWeather(source) {
	  $.getJSON(source, function(data) {
	    console.log(data);
	    $("#loc").html("You are in: <strong>" + data["name"] + "</strong>");
	    var des = "Current conditions: <strong>" + data["weather"][0].description + "</strong>" + "<img src='http://openweathermap.org/img/w/" + data['weather'][0].icon + ".png'>";
	    $("#des").html(des);

	    var tempK = data["main"].temp;
	    tempF = ((tempK * 9) / 5) - 459.67;
	    tempF = Math.round(tempF * 10) / 10;
	    tempC = tempK - 273.15;
	    tempC = Math.round(tempC * 10) / 10;
	    $("#temp").html("The temperature is <strong>" +  tempF + " °F</strong>");

	    loadBackground();

	  });
	}

	// change to F or C
	function change() {
	  if (isInF) {
	    $("#temp").html("The temperature is <strong>" + tempC + " °C</strong>");
	    $("#change").html("Show in Fahrenheit");
	    isInF = false;
	  } else {
	    $("#temp").html("The temperature is <strong>" + tempF + " °F</strong>");
	    $("#change").html("Show in Celsius");
	    isInF = true;        
	  }
	}

	// load background based on temperature
	function loadBackground() {
	  switch (true) {
	    case (tempF <= 32):
	      $("#background").css({"background-image":"url(" + freezing + ")", "background-size": "cover"});
	      break;
	    case (tempF < 50): // 32 < tempF < 50
	      $("#background").css({"background-image":"url(" + cold + ")", "background-size": "cover"});
	      break;
	    case (tempF < 65): // 50 <= tempF < 65
	      $("#background").css({"background-image":"url(" + cool + ")", "background-size": "cover"});
	      break;
	    case (tempF < 80): // 65 <= tempF < 80
	      $("#background").css({"background-image":"url(" + warm + ")", "background-size": "cover"});
	      break;
	    case (tempF >= 80):
	      $("#background").css({"background-image":"url(" + hot + ")", "background-size": "cover"});
	      break;
	    default:
	      $("#background").css("background-color", "#efefef");
	  }
	}
    
// api source:
// http://openweathermap.org/current#geo
// http://ip-api.com for faster request to access location instead of using geolocation
});