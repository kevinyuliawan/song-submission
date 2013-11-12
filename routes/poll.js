var songs = [];

var votes = [];


songs.push({
	title: 'Song 1',
	artist: 'Artist 1',
	link: 'http://song1.com',
	username: 'User 1',
	userVote: 0,
	totalVotes: 0
});

songs.push({
	title: 'Song 2',
	artist: 'Artist 2',
	username: 'User 2',
	link: 'http://song2.com',
	userVote: 0,
	totalVotes: 0
});


var options = [];

var newSong = {
	title: '',
	artist: '',
	link: '',
	userVote: 0,
	totalVotes: 0
};

var totalSongSubmissions = 0;

var totalVoteSubmissions = 0;

function addSong(song){
	// TODO

};

function submitVote(){
  // TODO
};

exports.getSongs = function(req, res){
	res.send(songs);
};

exports.postSongs = function(req, res){
	var userSong = {
		title:  req.body.title,
		artist: req.body.artist,
		link:   req.body.link,
		username: req.body.username,
		userVote: 0,
		totalVotes: 0
	};
	songs.push(userSong);
	totalSongSubmissions++;
	res.send(songs);
}

exports.postVotes = function(req, res){
	console.log(req);
	for(var i=0;i<req.body.length;i++){
		songs[i].totalVotes += req.body[i].userVote;
		songs[i].userVote = 0;
	};
	totalVoteSubmissions++;
	var voteObject = {
		person: req.headers.cookie,
		votes: req.body,
		time: req._startTime,
		address: req._remoteAddress,
		useragent: req.headers['user-agent']
	};
	votes.push(voteObject);
	res.send(songs);
}

exports.getAdminVotes = function(req, res){
	res.send(votes);
}

exports.getAdminSongs = function(req, res){
	res.send(songs);
}

exports.getAdminClear = function(req, res){
	songs = [];
	votes = [];
	res.send("All songs and vote submissions have been cleared!");
}