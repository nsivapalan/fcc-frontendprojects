$(document).ready(function() {
	var usernames = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", 
								 "storbeck", "habathcx", "robotcaleb", "noobs2ninjas", "brunofin", "comster404"];

 	var isLive;	
	var areLive = [];

	var clientID = config.CLIENT_ID;

	var headers = {
		"accept": "application/vnd.twitchtv.v5+json",
		"client_id": clientID
	}

	/*
	Channel info
	Get the information of a channel like the name, logo, URL, etc. 
	*/
	var channelOriginal = "https://api.twitch.tv/kraken/channels/"
	var channelSource = "https://api.twitch.tv/kraken/channels/";
	var channelChange = "?client_id=" + headers.client_id  + "&accept" + headers.accept;

	/*
	Live status info
	Get the live status of a channel.
	*/
	var original = "https://api.twitch.tv/kraken/streams/"
	var source = "https://api.twitch.tv/kraken/streams/";
	var change = "?client_id=" + headers.client_id  + "&accept" + headers.accept;

	/*Main function*/
	function main() {

		for (var i = 0; i < usernames.length; i++) {
			changeLiveSource(usernames[i]);
			getLiveInfo();
			if (!isLive) {
				changeChannelSource(usernames[i]);
				getChannelInfo();
			}
		}

	}

	function changeChannelSource(name) {
		channelSource = channelOriginal;
		channelSource += name + channelChange;
	}

	function changeLiveSource(name) {
		source = original;
		source += name + change;
	}

	function getChannelInfo() {
		$.getJSON(channelSource, function(data) {
			console.log(data);
			$("#results").append("<a target='_blank' align='left' href='" + data['url'] + "''>" 
				+ "<li class='offline'><img class='pic' src='" + data['logo'] + "' />" 
				+ "<h2>" + data['name'] + "</h2>"
				+ "<p>Offline</p>" + "</li></a><br>");
		})
	}

	function getLiveInfo() {
		$.getJSON(source, function(data) {
			console.log(data);
			if (data["stream"] !== null) {
				isLive = true;
				$("#results").append("<a target='_blank' align='left' href='" + data["stream"]["channel"]["url"] + "''>" 
					+ "<li class='online'><img class='pic' src='" + data["stream"]["channel"]["logo"] + "' />" 
					+ "<h2>" + data["stream"]["channel"]['display_name'] + "</h2>" 
					+ "<p><strong>Currently streaming</strong>: " + data["stream"]["channel"]['status'] 
					+ "</p></li></a><br>");
			} else {
				isLive = false;
			}
		});
	}

	main();

});


