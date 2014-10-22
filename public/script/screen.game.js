jewel.screens["game-screen"] = (function() {

	var firstRun = true;

	function startGame() {
		var board = jewel.board,
			display = jewel.display;
		board.initialize(function() {
			// start the game here
		}) // end of board initialization
	} // end of startGame function

	function setup() {

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
	}



})(); /* end of jewel.screens function */