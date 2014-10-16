var User = require('./user')
	, Match = require('./match');

module.exports = function(server, io) {
	var io = io
		, allClients = [];


	var init = function() {
		io.listen(server);
		io.on('connection', onSocket);		
	};

	var onSocket = function(socket) {
		socket.on('enter', receiveEnter.bind(this, socket));
		socket.on('game_leave', gameLeave.bind(this, socket));
		socket.on('disconnect', gameDisconnect.bind(this, socket));
	};

	var receiveEnter = function(socket) {
		var htUser = User.createUser()
			, htMatch = Match.joinMatch(htUser)
			, sMatchId = htMatch.sMatchId;

		socket.join(sMatchId);
		console.log('sMatchId = ' + sMatchId);
		setChannelInfo(socket, sMatchId, htUser.sUserId);
		
		socket.emit('enter_end', {
			htUser : htUser
			, htMatch : htMatch
		});
		
		if (Match.isMatchFull(htMatch)) {
			initMatch(socket, htMatch);
		}
	};

	var initMatch = function(socket, htMatch) {
		Match.initMatch(htMatch);
		io.to(htMatch.sMatchId)
			.emit('game_start', {htMatch : htMatch});
	};

	var gameLeave = function(socket, htData) {		
		var sMatchId = htData.sMatchId;
		socket.leave(sMatchId);
		Match.removePlayer(sMatchId, htData.sUserId);
		socket.to(sMatchId).emit('opponent_leave');
	};

	var gameDisconnect = function(socket) {
		var sMatchId = socket.sMatchId;
		if (!sMatchId) {
			return;
		}

		gameLeave(socket, {
			 sMatchId : sMatchId
			, sUserId : socket.sUserId 
		});
	};

	/**
	 * socket 객체에 channel 정보를 입력한다
	 */
	var setChannelInfo = function(socket, sMatchId, sUserId) {
		socket.sMatchId = sMatchId;
		socket.sUserId = sUserId;
	};

	init();
}
