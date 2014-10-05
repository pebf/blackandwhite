module.exports = function() {
	var aMatchList = [];

	var createMatch = function(htUser) {
		var htMatch = {
			aPlayerList : [htUser]
			, nRound : 0
		}

		addMatchToList(htMatch);
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

	var joinMatch = function(htUser) {
		var htMatch = findNotFullMatch();

		if (htMatch) {
			addUserToMatch(htMatch);
		} else {
			htMatch = createMatch(htUser);
		}

		return htMatch;
	};
}