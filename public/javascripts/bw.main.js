bw = {};

bw.main = (function() {
	// imports
	var view, socket;

	var _setDependency = function() {
		view = bw.view;
		socket = bw.socket;
		process = bw.process;
	};

	var _initModules = function() {
		view.init();
		socket.init();
		process.init();
	};

	var exports = {
		name : 'bw.main'
	};

	var htUser = {}
		, htMatch = {};

	exports.init = function() {
		_setDependency();
		_initModules();
		_attachEvent();		
	};

	function _attachEvent() {
		$(document.body).on('click', _onClick);
	};

	function _onClick(we) {
		var welTarget = $(we.target);

		if (welTarget.hasClass('_enter')) {
			socket.send('enter');
		} else if (welTarget.hasClass('_game_restart')) {

		} else if (welTarget.hasClass('_game_leave')) {
			process.gameLeave();
		}
	};

	exports.setData = function(htData) {
		_setUser(htData.htUser);
		_setMatch(htData.htMatch);
	};

	var _setUser = function(htData) {
		for (key in htData) {
			htUser[key] = htData[key];
		}
	};

	var _setMatch = function(htData) {
		for (key in htData) {
			htMatch[key] = htData[key];
		}
	};

	exports.isMatchFull = function() {
		if (htMatch.aUserList && htMatch.aUserList.length > 1) {
			return true;
		}
		return false;
	};

	exports.getUserId = function() {
		return htUser.sUserId;
	};

	exports.getMatchId = function() {
		return htMatch.sMatchId;
	};

	return exports;
}());
