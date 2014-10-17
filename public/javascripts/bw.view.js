bw.view = (function() {
	var main, util;

	var _setDependency = function() {
		main = bw.main;
		util = bw.util;
	};

	var exports = {
		name : 'bw.view'
	};

	var _htElement = {};

	exports.init = function() {
		_assignHTML();
		_setDependency();
	};

	var _assignHTML = function() {
		_htElement.board = $('._board');
		_htElement.board_new_game = _htElement.board.find('._board_new_game');
		_htElement.board_input_number = _htElement.board.find('._board_input_number');
		_htElement.board_restart = _htElement.board.find('._board_restart');
		_htElement.board_wait = _htElement.board.find('._board_wait');
		_htElement.board_opponent_leave = _htElement.board.find('._board_opponent_leave');
		_htElement.board_user_input = _htElement.board.find('._board_user_input');
		_htElement.board_opponent_input = _htElement.board.find('._board_opponent_input');
		

		_htElement.user_score = $('._user_score');
		_htElement.user_gauge = $('._user_guage');
		_htElement.opponent_score = $('._opponent_score');
		_htElement.opponent_gauge = $('._opponent_guage');
	};

	var _hideBoardInnerLayer = function() {
		_htElement.board.children().hide();
	};

	exports.showNewGameLayer = function() {
		_hideBoardInnerLayer();
		_htElement.board_new_game.show();
	};

	exports.showWaitLayer = function() {
		_hideBoardInnerLayer();
		_htElement.board_wait.show();
	};

	exports.showRestartLayer = function() {
		_hideBoardInnerLayer();
		_htElement.board_restart.show();
	};

	exports.showOpponentLeaveLayer = function() {
		_hideBoardInnerLayer();
		_htElement.board_opponent_leave.show();
	};

	exports.showUserInputLayer = function() {
		var str = '숫자를 입력해주세요(0 ~ {0})';		
		str = util.replaceStr(str, [ main.getUserTotalNumber() ]);		
		
		_hideBoardInnerLayer();		
		_htElement.board_user_input
			.show()
			.find('p')
			.html(str);			
	};

	exports.showOpponentInputLayer = function() {
		_hideBoardInnerLayer();
		_htElement.board_opponent_input.show();
	};

	exports.showMatchInfo = function(htMatch) {		
		var aUserList = htMatch.aUserList
			, sUserId = main.getUserId()
			, htUser, htOpponent;

		aUserList.forEach(function(value) {
			if (value.sUserId === sUserId) {
				htUser = value;
			} else {
				htOpponent = value;
			}
		});

		_showUserInfo(htUser);
		_showOpponentInfo(htOpponent);
	};

	var _showUserInfo = function(htUser) {
		_htElement.user_score.html(htUser.nMatchScore);
		_fillUserGauge(_htElement.user_gauge, htUser.nTotalNumber);
	};

	var _showOpponentInfo = function(htOpponent) {
		_htElement.opponent_score.html(htOpponent.nMatchScore);
		_fillUserGauge(_htElement.opponent_gauge, htOpponent.nTotalNumber);	
	};

	/**
	 * 점수에 맞게 게이지를 채운다.
	 */
	var _fillUserGauge = function(welGauge, nNum) {		
		var nBlockNumToFill = Math.floor(nNum / 20)
			, waelGaugeBlock = welGauge.find('._guage_block')
								.removeClass('on');

		for(var i = 4; i > -1; i--) {
			$(waelGaugeBlock[i]).addClass('on');
		}

	};

	return exports;
}());