jewel.dom = (function() {

	function $(path, parent) {
		parent = parent || document;
		return parent.querySelectorAll(path);
	} // end of path, parent function

	function hasClass(el, clsName) {
		var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
		return regex.test(el.className);
	} // has class el, clsName function

	function addClass(el, clsName) {
		if (!hasClass(el, clsName)) {
			el.className += " " + className;
		}// end of if !hasClass statement
	}// end of function addClass

	function removeClass(el, clsName) {
		var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
		el.className = el.className.replace(regex, " ");
	}// end of removeClass function

	return {
		$: $,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass
	}; // end of return


})();