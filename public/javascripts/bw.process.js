bw.process = (function() {
	var main, view, socket;

	var _setDependency = function() {
		main = bw.main;
		view = bw.view;
		socket = bw.socket;
	};

	var exports = {
		name : 'bw.process'
	};

	exports.init = function() {
		_setDependency();
	};

	exports.receiveEnterEnd = function(htData) {
		main.setData(htData);

		if (!main.isMatchFull()) {
			view.showWaitLayer();
		}
	};

	exports.gameStart = function(htData) {
		var htMatch = htData.htMatch;

		main.setMatch(htMatch);
		view.showMatchInfo(htMatch);

		if (main.isUserTurn()) {
			view.showUserInputLayer();
		} else {
			view.showOpponentInputLayer();
		}

	};

	exports.gameLeave = function() {
		view.showNewGameLayer();
		socket.send('game_leave', {
			sUserId : main.getUserId()
			, sMatchId : main.getMatchId()
		});
	};

	exports.opponentLeave = function() {
		view.showOpponentLeaveLayer();
	};

	return exports;
}());