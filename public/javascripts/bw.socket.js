bw.socket = (function(){
	var process;

	var _setDependency = function() {
		process = bw.process;
	};

	var exports = {
		name : 'bw.socket'
	};

	var oSocket;

	exports.init = function() {
		_setDependency();
		_attachSocketEvent();
	};

	var _attachSocketEvent = function() {
		oSocket = io.connect('/')
			.on('enter_end', process.receiveEnterEnd)
			.on('game_start', process.gameStart)
			.on('opponent_leave', process.opponentLeave)
			.on('restart', process.restart);
	};

	exports.send = function(sEvt, htData) {
		oSocket.emit(sEvt, htData);
	};

	return exports;
}());