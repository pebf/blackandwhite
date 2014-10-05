var Utils = require('./utils');

module.exports = function() {
	//var aUserList = [];

	var createUser = function() {
		var htUser = {};
		htUser.id = createUserId();

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
}