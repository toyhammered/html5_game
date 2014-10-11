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
			el.className += " " + clsName;
		}// end of if !hasClass statement
	}// end of function addClass

	function removeClass(el, clsName) {
		var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
		el.className = el.className.replace(regex, " ");
	}// end of removeClass function

	function bind(element, event, handler) {
		if (typeof element == "string") {
			element = $(element)[0];
		} // end of if statement string
		element.addEventListener(event, handler, false);
	} // end of function bind


	return {
		$: $,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		bind: bind
	}; // end of return


})();