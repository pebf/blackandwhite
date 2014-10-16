var Utils = require('./utils');

module.exports = (function() {
	exports = {};
	
	var nInitialMatchScore = 0
		, nInitialTotalNumber = 99;


	exports.createUser = function() {
		var htUser = {
			 sUserId : createUserId()
			 , nMatchScore : nInitialMatchScore
			 , nTotalNumber : nInitialTotalNumber
		};
		//addUserToList(htUser);
		return htUser;
	};
	
	var createUserId = function() {
		return Utils.getDateddssSS() + Utils.getRandom();
	};

	exports.initUserForMatch = function(htUser) {
		htUser.nMatchScore = nInitialMatchScore;
		htUser.nTotalNumber = nInitialTotalNumber;
	};

	return exports;
}());