jewel.screens["splash-screen"] = (function() {
	var firstRun = true;

	function setup() {
		jewel.dom.bind("#splash-screen", "click", function() {
			jewel.showScreen("main-menu");
		}); // end of splash-screen click
	} // end of function setup

	function run() {
		if (firstRun) {
			setup();
			firstRun = false;
		} // end of firstRun if
	} // end of function run

	return {
		run: run
	};


})();