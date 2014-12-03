jewel.storage = (function() {
	var db = window.localStorage;

	function set(key, value) {
		value = JSON.stringify(value);
		db.setItem(key,value);
	} // end of set function

	function get(key) {
		var value = db.getItem(key);
		try {
			retrun JSON.parse(value);
		} catch(e) {
			return;
		}
	} // end of get function

	return {
		set: set,
		get: get
	};


})();