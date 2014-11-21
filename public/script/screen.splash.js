jewel.screens["splash-screen"] = (function() {
	var firstRun = true;

	function checkProgress() {
		var $ = jewel.dom.$,
			p = jewel.getLoadProgress() * 100;

		$("#splash-screen .indicator")[0].style.width = p + "%";
		if (p == 100) {
			setup();
		} else {
			setTimeout(checkProgress, 30);
		} // end of progress check

	} /* end of checkProgress function */

	function setup() {
		var dom = jewel.dom,
			$ = dom.$,
			screen = $("#splash-screen")[0];

		$(".continue",screen)[0].style.display = "block";

		dom.bind(screen, "click", function() {
			jewel.showScreen("main-menu");
		}); // end of splash-screen click
	} // end of function setup

	function run() {
		if (firstRun) {
			checkProgress()
			firstRun = false;
		} // end of firstRun if
	} // end of function run

	return {
		run: run
	};


})();