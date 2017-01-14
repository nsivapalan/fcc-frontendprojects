$(document).ready(function() {
	var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", 
								 "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

	var clientID = config.CLIENT_ID;

	var headers = {
		"accept": "application/vnd.twitchtv.v5+json",
		"client_id": clientID
	}

	var original = "https://api.twitch.tv/kraken/streams/"
	var source = "https://api.twitch.tv/kraken/streams/";
	var change = "?client_id=" + headers.client_id  + "&accept" + headers.accept;

	// main
	for (var i in usernames) {
		source = original;
		source += usernames[i];
		source += change;
		// source = changeSource(i);
		getInfo();
	}

	// function changeSource(name) {
	// 	source = original;
	// 	source += usernames[name];
	// 	source += change;
	// }

	function getInfo() {
		$.getJSON(source, function(data) {
			console.log(data);
			if (data["stream"] !== null) {
				$("#results").append("<a target='_blank' align='left' href='" + data["stream"]["channel"]["url"] + "''>" 
					+ "<li class='online'><img class='pic' src='" + data["stream"]["channel"]["logo"] + "' />" 
					+ "<h2>" + data["stream"]["channel"]['display_name'] + "</h2>" + "<p><small>" + data["stream"]["channel"]['status'] + "</p></li></a><br>");
			}
		});
	}


});


