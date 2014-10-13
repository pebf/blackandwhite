var Utils = require('./utils');

module.exports = (function() {
	var exports = {};

	var aMatchList = [];

	var createMatch = function(htUser) {
		var htMatch = {
			sMatchId : createMatchId()
			, aPlayerList : [htUser]
			, nRound : 0
		};

		addMatchToList(htMatch);
		return htMatch;
	};

	var createMatchId = function() {
		return Utils.getRandom() + Utils.getDateddssSS();
	};

	var addUserToMatch = function (htMatch, htUser) {
		htMatch.aPlayerList.push(htUser);
	};

	var addMatchToList = function(htMatch) {
		aMatchList.push(htMatch);
	};

	var findNotFullMatch = function() {
		var htResult
			, htMatch;

		for (var i = 0; i < aMatchList.length; i++) {
			htMatch = aMatchList[i];

			if (!htMatch.aPlayerList) {
				continue;
			}

			if (htMatch.aPlayerList.length > 1) {
				continue;
			}

			// 플레이어가 없는 매치는 리스트에서 제거
			if (htMatch.aPlayerList.length == 0) {
				arr.splice(index, 1);
			}

			return htMatch;
		}
	};

	/**
	 * 현재 인원이 채워지지 않은 방 또는 새로운 방을 생성하여 반환한다.
	 */
	exports.joinMatch = function(htUser) {
		var htMatch = findNotFullMatch();

		if (htMatch) {
			addUserToMatch(htMatch, htUser);
		} else {
			htMatch = createMatch(htUser);
		}

		return htMatch;
	};

	exports.isMatchFull = function(htMatch) {
		if (htMatch.aPlayerList && htMatch.aPlayerList.length > 1) {
			return true;
		}
		return false;
	};

	/**
	 * match에서 player를 제거한다
	 */
	exports.removePlayer = function(sMatchId, sUserId) {
		var htMatch = exports.getMatchById(sMatchId)
			, aPlayerList = htMatch.aPlayerList;
		
		for (var i = 0, nLength = aPlayerList.length; i < nLength; i++) {			
			if (aPlayerList[i].sUserId === sUserId)	{
				aPlayerList.splice(i, 1);
				return;
			}
		}

		_removeMatchHasNoPlayer(htMatch);
	};

	/**
	 * match에 참여하고 있는 player가 없다면 aMatchList에서 match를 제거한다.
	 */
	var _removeMatchHasNoPlayer = function(htMatch) {
		if (htMatch.aPlayerList.length > 0) {
			return;
		}

		for (var i = 0, nLength = aMatchList.length; i < nLength; i++) {
			if (htMatch.sMatchId === aMatchList[i].sMatchId) {
				aMatchList.splice(i, 1);
			}
		}
	};

	exports.getMatchById = function(sMatchId) {
		var htMatch;
		for (var i = 0, nLength = aMatchList.length; i < nLength; i++) {
			htMatch = aMatchList[i];
			if (sMatchId === htMatch.sMatchId) {
				return htMatch;
			}
		}
	};

	return exports;
}());