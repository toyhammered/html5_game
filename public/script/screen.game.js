jewel.screens["game-screen"] = (function() {

	var firstRun = true,
		paused;

	function startGame() {

		var board = jewel.board,
			display = jewel.display;
		board.initialize(function() {
			display.initialize(function() {
				display.redraw(board.getBoard(), function() {
					// do nothing for now
				}); // end of redrawing display
			}); // end of displaying initialize
		}); // end of board initialization
		paused = false;
		/* error code here 
		var dom = jewel.dom,
			overlay = dom.$("#game-screen .pause-overlay")[0];
		overlay.style.display = "none";
		paused = true;
			end of error code */
	} // end of startGame function

	function pauseGame() {
		if (paused) {
			return; // do nothing if already paused
		} else {
			var dom = jewel.dom,
				overlay = dom.$("#game-screen .pause-overlay")[0];
			overlay.style.display = "block";
			paused = true;
		} // end of if paused 
	} // end of pauseGame function

	function resumeGame() {
		var dom = jewel.dom,
			overlay = dom.$("#game-screen .pause-overlay")[0];
		overlay.style.display = "none";
		paused = false;
	} // end of resumeGame function 

	function exitGame() {
		pauseGame();
		var confirmed = window.confirm(
			"Do you want to return tothe main menu?"
		);
		if (confirmed) {
			jewel.showScreen("main-menu");
		} else {
			resumeGame();
		} // end of if confirmed 

	} // end of exitGame function

	function setup() {
		var dom = jewel.dom;
		dom.bind("footer button.exit", "click", exitGame);
		dom.bind("footer button.pause", "click", pauseGame);
		dom.bind(".pause-overlay", "click", resumeGame);
	}// end of setup function

	function run() {
		if (firstRun) {
			setup();
			firstRun = false;
		}
		startGame();
	} // end of run function

	return {
		run: run
	};



})(); /* end of jewel.screens function */