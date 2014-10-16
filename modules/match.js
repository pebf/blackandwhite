var Utils = require('./utils')
	, User = require('./user');

module.exports = (function() {
	var exports = {};

	var aMatchList = [];

	var createMatch = function(htUser) {
		var htMatch = {
			sMatchId : createMatchId()
			, aUserList : [htUser]
			, nRound : 0
			, aUserHasTurn : []
		};

		addMatchToList(htMatch);
		return htMatch;
	};

	var createMatchId = function() {
		return Utils.getRandom() + Utils.getDateddssSS();
	};

	var addUserToMatch = function (htMatch, htUser) {
		htMatch.aUserList.push(htUser);
	};

	var addMatchToList = function(htMatch) {
		aMatchList.push(htMatch);
	};

	var findNotFullMatch = function() {
		var htResult
			, htMatch;

		for (var i = 0; i < aMatchList.length; i++) {
			htMatch = aMatchList[i];

			if (!htMatch.aUserList) {
				continue;
			}

			if (htMatch.aUserList.length > 1) {
				continue;
			}

			// 플레이어가 없는 매치는 리스트에서 제거
			if (htMatch.aUserList.length == 0) {
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
		if (htMatch.aUserList && htMatch.aUserList.length > 1) {
			return true;
		}
		return false;
	};

	/**
	 * match에서 player를 제거한다
	 */
	exports.removePlayer = function(sMatchId, sUserId) {
		var htMatch = exports.getMatchById(sMatchId)
			, aUserList = htMatch.aUserList;
		
		for (var i = 0, nLength = aUserList.length; i < nLength; i++) {			
			if (aUserList[i].sUserId === sUserId)	{
				aUserList.splice(i, 1);
				return;
			}
		}

		_removeMatchHasNoPlayer(htMatch);
	};

	/**
	 * match에 참여하고 있는 player가 없다면 aMatchList에서 match를 제거한다.
	 */
	var _removeMatchHasNoPlayer = function(htMatch) {
		if (htMatch.aUserList.length > 0) {
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

	exports.initMatch = function(htMatch) {
		initMatchData(htMatch);
		decisionFirstUser(htMatch);
	};

	var initMatchData = function(htMatch) {
		var aUserList = htMatch.aUserList;
		htMatch.aUserHasTurn = [];
		htMatch.nRound = 0; 

		aUserList.forEach(function(htUser) {
			User.initUserForMatch(htUser);
		});
	};

	var decisionFirstUser = function(htMatch) {
		var nRandom = Math.floor(Math.random())
			, nNext = nRandom === 1 ? 0 : 1
			, aUserList = htMatch.aUserList
			, aUserHasTurn = htMatch.aUserHasTurn;
		
		aUserHasTurn.push(aUserList[nRandom].sUserId);
		aUserHasTurn.push(aUserList[nNext].sUserId);
	};
	
	return exports;
}());