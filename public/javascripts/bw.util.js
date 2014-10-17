bw.util = (function() {
	var exports = {
		name : 'bw.util'
	};

	exports.replaceStr = function(str, arr) {
		if (typeof str !== 'string') {
			return;
		}

		for (var i = 0, nLength = arr.length; i < nLength; i++) {
			str = str.replace('{' + i + '}', arr[i]);
		}

		return str;
	};

	return exports;
}());