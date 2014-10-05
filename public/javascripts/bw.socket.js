bw.socket = (function(){
	var view;

	var _setDependency = function() {
		view = bw.view;
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
		oSocket = io.connect('/');
		oSocket
			.on('enter_end', function(){console.log('enter_end')});
	};

	exports.sendEnter = function() {
		oSocket.emit('enter');
	};

	return exports;
}());