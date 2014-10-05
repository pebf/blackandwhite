var UserManager = require('./user_manager');
var Match = require('./match');

module.exports = function(app) {
	var io
		, allClients = [];

	// var init = function() {		
		io = require('socket.io').listen(app);

		// io.configure(function() {
		// 	io.set('log level', 2);
		// 	io.set('transports'
		// 		, [ 'websocket'
		// 		, 'flashsocket'
		// 		, 'htmlfile'
		// 		, 'xhr-polling'
		// 		, 'jsonp-polling'
		// 	]);
		// });

		// io.of('/')
			io.on('connection', onSocket);
	// };

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
