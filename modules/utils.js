module.exports = function() {
	var getDateddssSS = function() {
		var oDate = new Date()

		return '' + oDate.getDate()
			+ oDate.getSeconds()
			+ oDate.getMilliseconds();		
	};

	var getRandom = function() {
		return Math.floor(Math.random() * 100) + 1;
	};
};