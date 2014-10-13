bw.view = (function() {
	var exports = {
		name : 'bw.view'
	};

	var _htElement = {};

	exports.init = function() {
		_assignHTML();
	};

	var _assignHTML = function() {
		_htElement.board = $('._board');
		_htElement.board_new_game = _htElement.board.find('._board_new_game');
		_htElement.board_input_number = _htElement.board.find('._board_input_number');
		_htElement.board_restart = _htElement.board.find('._board_restart');
		_htElement.board_wait = _htElement.board.find('._board_wait');
		_htElement.board_opponent_leave = _htElement.board.find('._board_opponent_leave');
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

	return exports;
}());