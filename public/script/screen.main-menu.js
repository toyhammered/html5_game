jewel.screens["main-menu"] = (function() {
	var dom = jewel.dom,
			  firstRun = true;

	function setup() {
		dom.bind("#main-menu ul.menu", "click", function(e) {
			if (e.target.nodeName.toLowerCase() === "button") {
				var action = e.target.getAttribute("name");
				jewel.showScreen(action);
			} // end of targeting nodeName
		}) // end of function(e)
	} // end of function setup

	function run() {
		if (firstRun) {
			setup();
			firstRun = false;
		} // end of firstRun if statement
	} // end of function run

	return {
		run: run
	}; // end of return


})();