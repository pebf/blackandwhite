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
		exports.setMatch(htData.htMatch);
	};

	var _setUser = function(htData) {
		for (key in htData) {
			htUser[key] = htData[key];
		}
	};

	exports.setMatch = function(htData) {
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

	exports.isUserTurn = function() {
		if (htMatch.aUserHasTurn[0] === htUser.sUserId) {
			return true;
		}

		return false;
	};

	exports.getUserTotalNumber = function() {
		return exports.getUserFromMatch().nTotalNumber;

	};

	exports.getUserFromMatch = function() {
		console.log(htMatch);
		
		var aUserList = htMatch.aUserList;
		console.log(aUserList);
		if (aUserList[0].sUserId === htUser.sUserId) {
			return aUserList[0];
		}

		return aUserList[1];
	}
	

	return exports;
}());
