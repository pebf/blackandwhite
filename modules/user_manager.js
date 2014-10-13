var Utils = require('./utils');

module.exports = (function() {
	exports = {};
	//var aUserList = [];

	exports.createUser = function() {
		var htUser = { sUserId : createUserId()};
		//addUserToList(htUser);
		return htUser;
	};
	
	var createUserId = function() {
		return Utils.getDateddssSS() + Utils.getRandom();
	};

	// var addUserToList = function(htUser) {
	// 	aUserList.push(htUser);
	// };

	// var removeUserFromListById = function(sId) {
	// 	aUserList.forEach(function(value, index, arr) {
	// 		if (value.id === sId) {
	// 			arr.splice(index, 1);
	// 		}
	// 	});
	// };

	return exports;
}());