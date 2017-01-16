$(document).ready(function() {
	var usernames = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", 
								 "storbeck", "habathcx", "robotcaleb", "noobs2ninjas", "brunofin", "comster404", "lvagewgweagwg32523"];

 	var isLive;	
	var name;

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
			name = usernames[i];
			console.log(name);
			changeLiveSource(name);
			getLiveInfo();
			if (!isLive) {
				changeChannelSource(name);
				getChannelInfo();
			}
		}

	}

	$("#on").on("click", function() {
		showAll();
		$(".offline").css("display", "none");
		$(".inactive").css("display", "none");
	});

	$("#off").on("click", function() {
		showAll();
		$(".online").css("display", "none");
		$(".inactive").css("display", "none");
	});

	$("#na").on("click", function() {
		showAll();
		$(".online").css("display", "none");
		$(".offline").css("display", "none");
	});


	$("#all").on("click", function() {
		showAll();
	});

	function showAll() {
		$(".online").css("display", "");
		$(".offline").css("display", "");
		$(".inactive").css("display", "");
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
			$("#results").append("<a target='_blank' href='" + data['url'] + "''>" 
				+ "<li class='offline'><img class='pic' src='" + data['logo'] + "' />" 
				+ "<h2>" + data['name'] + "</h2>"
				+ "<p>Offline</p>" + "</li></a><br>");
		})
		.fail(function() {
			$("#results").append("<li class='inactive'><img class='pic' src='https://s9.postimg.org/w8q60kdr3/inactive.gif' />" 
				+ "<h2>" + name + "</h2>"
				+ "<p>This account does not exist.</p>" + "</li></a><br>");
			console.log("name is " + name);
		});
	}

	function getLiveInfo() {
		$.getJSON(source, function(data) {
			console.log(data);
			if (data["stream"] !== null) {
				isLive = true;
				$("#results").append("<a target='_blank' href='" + data["stream"]["channel"]["url"] + "''>" 
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
