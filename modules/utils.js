module.exports = (function() {
	exports = {};

	exports.getDateddssSS = function() {
		var oDate = new Date()

		return '' + oDate.getDate()
			+ oDate.getSeconds()
			+ oDate.getMilliseconds();		
	};

	exports.getRandom = function() {
		return Math.floor(Math.random() * 100) + 1;
	};

	return exports;
}());