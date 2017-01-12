$(document).ready(function() {
	var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", 
								 "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

	var clientID = config.CLIENT_ID;

	var headers = {
		"accept": "application/vnd.twitchtv.v5+json",
		"client_id": clientID
	}

	var source = "https://api.twitch.tv/kraken/channels/freecodecamp?client_id=" + clientID + "&accept" + headers.accept;

	$.getJSON(source, function(data) {
		console.log(data);
	})

});


