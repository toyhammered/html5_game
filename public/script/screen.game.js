jewel.screens["game-screen"] = (function() {

	var firstRun = true,
		paused,
		cursor;

	function startGame() {

		var board = jewel.board,
			display = jewel.display;
		board.initialize(function() {
			display.initialize(function() {
				cursor = {
					x: 0,
					y: 0,
					selected: false
				};
				display.redraw(board.getBoard(), function() {
					// do nothing for now
				}); // end of redrawing display
			}); // end of displaying initialize
		}); // end of board initialization
		paused = false;
        var overlay = jewel.dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "none";
		
	} // end of startGame function

	function setCursor(x, y, select) {
		cursor.x = x;
		cursor.y = y;
		cursor.selected = select;
		jewel.display.setCursor(x, y, select);
	} // end of setCursor function

	function selectJewel(x, y) {
		if (arguments.length === 0) {
			selectJewel(cursor.x, cursor.y);
			return;
		} // end of checking [something?]
		if (cursor.selected) {
			var dx = Math.abs(x - cursor.x),
				dy = Math.abs(y - cursor.y),
				dist = dx + dy;

			if (dist === 0) {
				// deselected the selected jewel
				setCursor(x, y, false);
			} else if (dist === 1) {
				// selected an ajacent jewel
				jewel.board.swap(cursor.x, cursor.y,
					x, y, playBoardEvents);
				setCursor(x, y, false);
			} else {
				// selected a diffrent jewel
				setCursor(x, y, true);
			} // end of checking dist
		} else {
			setCursor(x, y, true);
		} // end of if cursor selected
	} // end of selectJewel function

	function playBoardEvents(events) {
		var display = jewel.display;
		if (events.length > 0) {
			var boardEvent = events.shift(),
			next = function() {
				playBoardEvents(events);
			}; // end of next function
			switch (boardEvent.type) {
				case "move":
					display.moveJewels(boardEvent.data, next);
					break;
				case "remove":
					display.removeJewels(boardEvent.data, next);
					break;
				case "refill":
					display.refill(boardEvent.data, next);
					break;
				default:
					next();
					break;
			} // end of switch boardEvent
		} else {
			display.redraw(jewel.board.getBoard(), function () {
				// good to go again
			}); // end of display.redraw function 
		} // end of if else events.length
	} // end of playBoardEvents function

	function moveCursor(x, y) {
		var settings = jewel.settings;
		if (cursor.selected) {
			x += cursor.x;
			y += cursor.y;
			if (x >= 0 && x < settings.cols &&
				y >= 0 && y < settings.rows) {
				selectJewel(x, y);
			} // end of cursor position
		} else {
			x = (cursor.x + x + settings.cols) % settings.cols;
			y = (cursor.y + y + settings.rows) % settings.rows;
			setCursor(x, y, false);
		} // end of checking cursor position
		console.log("Cursor position: " + x + ", " + y);
	} // end of moveCursor function

	function moveUp() {
		moveCursor(0, -1);
	} // end of moveUp function

	function moveDown() {
		moveCursor(0, 1);
	} // end of moveDown function

	function moveLeft() {
		moveCursor(-1, 0);
	} // end of moveLeft function

	function moveRight() {
		moveCursor(1, 0);
	} // end of moveRight function

	

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

		//jewel.input.initialize();
		var input = jewel.input;
		input.initialize();
		input.bind("selectJewel", selectJewel);
		input.bind("moveUp", moveUp);
		input.bind("moveDown", moveDown);
		input.bind("moveLeft", moveLeft);
		input.bind("moveRight", moveRight);
	} // end of setup function

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