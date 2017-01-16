$(document).ready(function() {
	var usernames = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", 
								 "storbeck", "habathcx", "robotcaleb", "noobs2ninjas", "brunofin", "comster404"];

 	var isLive;	
	var name;

	var clientID = config.CLIENT_ID;

	var headers = {
		"accept": "application/vnd.twitchtv.v5+json",
		"client_id": clientID
	}

	var channelOriginal = "https://api.twitch.tv/kraken/channels/"
	var channelSource = "https://api.twitch.tv/kraken/channels/";
	var channelChange = "?client_id=" + headers.client_id  + "&accept" + headers.accept;

	var original = "https://api.twitch.tv/kraken/streams/"
	var source = "https://api.twitch.tv/kraken/streams/";
	var change = "?client_id=" + headers.client_id  + "&accept" + headers.accept;


	$("#on").on("click", function() {
		$(".online").fadeIn();
		$(".offline").fadeOut();
		$(".inactive").fadeOut();
	});

	$("#off").on("click", function() {
		$(".offline").fadeIn();
		$(".online").fadeOut();
		$(".inactive").fadeOut();
	});

	$("#na").on("click", function() {
		$(".inactive").fadeIn();
		$(".online").fadeOut();
		$(".offline").fadeOut();
	});

	$("#all").on("click", function() {
		showAll();
	});


	/*
	Main function, called once, that executes ajax functions to display all channels.
	*/
	function main() {

		for (var i = 0; i < usernames.length; i++) {
			name = usernames[i];
			changeLiveSource(name);
			getLiveInfo();
			if (!isLive) {
				changeChannelSource(name);
				getChannelInfo();
			}
		}

	}

	/*
	Show all channels - online, offline, and inactive.
	*/
	function showAll() {
		$(".online").fadeIn();
		$(".offline").fadeIn();
		$(".inactive").fadeIn();
	}

	/*
	Change the channel source to get general status and info of that respective channel.
	*/
	function changeChannelSource(name) {
		channelSource = channelOriginal;
		channelSource += name + channelChange;
	}

	/*
	Change the live source to get the live status of that respective channel.
	*/
	function changeLiveSource(name) {
		source = original;
		source += name + change;
	}

	/*
	Live status info
	Get the information of a channel like the name, logo, URL, etc. 
	*/
	function getLiveInfo() {
		$.ajax({
			type: 'GET',
			url: source,
			success: function(data) {
				if (data["stream"] !== null) {
					isLive = true;
					$("#results").append("<a target='_blank' href='" + data["stream"]["channel"]["url"] + "''>" 
						+ "<li class='online'><img class='pic' src='" + data["stream"]["channel"]["logo"] + "' />" 
						+ "<h2>" + data["stream"]["channel"]['display_name'] + "</h2>" 
						+ "<p><em>Currently streaming</em>: <strong>" + data["stream"]["channel"]['status'] 
						+ "</strong></p></li></a><br>");
				} else {
					isLive = false;
				}
			},
			async: false // to go in order
		})
	}

	/*
	Channel info
	Get the live status of a channel.
	*/
	function getChannelInfo() {
		$.ajax({
			type: 'GET',
			url: channelSource,
			success: function(data) {
				$("#results").append("<a target='_blank' href='" + data['url'] + "''>" 
					+ "<li class='offline'><img class='pic' src='" + data['logo'] + "' />" 
					+ "<h2>" + data['name'] + "</h2>"
					+ "<p><em>Status</em>: <strong>Offline</strong></p>" + "</li></a><br>");				
			},
			error: function() {
				$("#results").append("<li class='inactive'><img class='pic' src='https://s9.postimg.org/w8q60kdr3/inactive.gif' />" 
					+ "<h2>" + name + "</h2>"
					+ "<p><em>Status</em>: <strong>This account does not exist.</strong></p>" + "</li></a><br>");
				console.log("name is " + name);
			},
			async: false
		})
	}

	main();

});
