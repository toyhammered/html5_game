jewel.screens["game-screen"] = (function() {

	var firstRun = true,
        paused,
        pauseStart,
        cursor,
        gameState = {
            // game state variables
        };

    function startGame() {

		var board = jewel.board,
			display = jewel.display;
		gameState = {
			level: 0,
			score: 0,
			timer: 0, // setTimeout reference
			startTime: 0, // time at start of level
			endTime: 0 // time to game over
		}; // end of gameState object 
		updateGameInfo();
		jewel.audio.initialize();
		
        board.initialize(function() {
            display.initialize(function() {
                cursor = {
                    x : 0,
                    y : 0,
                    selected : false
                };
                display.redraw(board.getBoard(), function() {
                    advanceLevel();
                });
            });
        });
        paused = false;
        var overlay = jewel.dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "none";
	} // end of startGame function

	function updateGameInfo() {
		var $ = jewel.dom.$;
		$("#game-screen .score span")[0].innerHTML = 
			gameState.score;
		$("#game-screen .level span")[0].innerHTML =
			gameState.level;
	} // end of updateGameInfo function

	function setLevelTimer(reset) {
		var $ = jewel.dom.$;
		if (gameState.timer) {
			clearTimeout(gameState.timer);
			gameState.timer = 0;
		}
		if (reset) {
			gameState.startTime = Date.now();
			gameState.endTime =
				jewel.settings.baseLevelTimer *
				Math.pow(gameState.level,
						-0.05 * gameState.level);
		}
		var delta = gameState.startTime +
					gameState.endTime - Date.now(),
			percent = (delta / gameState.endTime) * 100,
			progress = $("#game-screen .time .indicator")[0];
		if (delta < 0) {
			gameOver();
		} else {
			progress.style.width = percent + "%";
			gameState.timer = setTimeout(setLevelTimer, 30);
		}
	} // end of setLevelTimer function

	function setCursor(x, y, select) {
		cursor.x = x;
		cursor.y = y;
		cursor.selected = select;
		jewel.display.setCursor(x, y, select);
	} // end of setCursor function

	function selectJewel(x, y) {
		if (paused) {
			return;
		}

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
					jewel.audio.play("match");
					display.removeJewels(boardEvent.data, next);
					break;
				case "refill":
					announce("No moves!");
					display.refill(boardEvent.data, next);
					break;
				case "score": // new score event
					addScore(boardEvent.data);
					next()
					break;
				case "badswap":
					jewel.audio.play("badswap");
					next();
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

	function gameOver() {
		jewel.audio.play("gameover");
		jewel.display.gameOver(function() {
			announce("Game Over");
		});
	} // end of gameOver function

	/* check here it might be jewel(s).settings */
	function addScore(points) {
		var settings = jewel.settings,
			nextLevelAt = Math.pow(
				settings.baseLevelScore,
				Math.pow(settings.baseLevelExp,
							gameState.level-1)
			);
		gameState.score += points;
		if (gameState.score >= nextLevelAt) {
			advanceLevel();
		}
		updateGameInfo();
	} // end of addScore function

	function advanceLevel() {
		jewel.audio.play("levelup");
        gameState.level++;
        announce("Level " + gameState.level);
        updateGameInfo();
        gameState.startTime = Date.now();
        gameState.endTime = jewel.settings.baseLevelTimer *
            Math.pow(gameState.level, -0.05 * gameState.level);
        setLevelTimer(true);
        jewel.display.levelUp();
    }

    function announce(str) {
    	var dom = jewel.dom,
    		$ = dom.$,
    		element = $("#game-screen .announcement")[0];
    	element.innerHTML = str;
    	dom.removeClass(element, "zoomfade");
    	setTimeout(function() {
    		dom.addClass(element, "zoomfade");
    	}, 1);
    } // end of announce function

	function moveCursor(x, y) {
		if (paused) {
			return;
		}
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

	function pauseGame() {
		if (paused) {
			return; // do nothing if already paused
		}
		var dom = jewel.dom,
			overlay = dom.$("#game-screen .pause-overlay")[0];
		overlay.style.display = "block";
		paused = true;
		pauseStart = Date.now();
		clearTimeout(gameState.timer);
		jewel.display.pause();
	} // end of pauseGame function

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

	function resumeGame() {
		var dom = jewel.dom,
			overlay = dom.$("#game-screen .pause-overlay")[0];
		overlay.style.display = "none";
		paused = false;

		var pauseTime = Date.now() - pauseStart;
		gameState.startTime += pauseTime;
		setLevelTimer();
		jewel.display.resume(pauseTime);
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