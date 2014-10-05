bw = {};

bw.main = (function() {
	// imports
	var view, socket;

	var _setDependency = function() {
		view = bw.view;
		socket = bw.socket;
	};

	var exports = {
		name : 'bw.main'
	};

	exports.init = function() {
		_setDependency();
		_attachEvent();

		view.init();
		socket.init();
	};

	function _attachEvent() {
		$(document.body).on('click', _onClick);
	};

	function _onClick(we) {
		var welTarget = $(we.target);

		if (welTarget.hasClass('_enter')) {
			socket.sendEnter();
		};
	};

	return exports;
}());
