var UserManager = require('./user_manager');
var Match = require('./match');

module.exports = function(server, io) {
	var allClients = [];

	var init = function() {
		io.listen(server);
		io.on('connection', onSocket);
	};

	var onSocket = function(socket) {
		socket.on('enter', receiveEnter.bind(this, socket));
	};

	var receiveEnter = function(socket) {
		var htUser = UserManager.createUser()
			, htMatch = Match.joinMatch(htUser);

		socket.emit('enter_end', {
			htUser : htUser
			, htMatch : htMatch
		});
	};

	init();
}
