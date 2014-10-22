jewel.display = (function() {

	var jewelSprite,
		canvas, ctx,
		cols, rows,
		jewelSize,
		firstRun = true;

	function createBackground() {

		var background = document.createElement("canvas"),
			bgctx = background.getContext("2d");

		jewel.dom.addClass(background, "background");
		background.width = cols * jewelSize;
		background.height = rows * jewelSize;

		bgctx.fillStyle = "rgba(225,235,255,0.15)";
		for (var x=0;x<cols;x++) {
			for (var y=0;y<cols;y++){
				if ((x + y) % 2) {
					bgctx.fillRect (
						x * jewelSize, y * jewelSize,
						jewelSize, jewelSize
					);
				} // end of if statement
			} // end of for loop for y cols
		} // end of for loop for x cols
		return background;
	} // end of createBackground function

	function setup() {
		var $ = jewel.dom.$,
			boardElement = $("#game-screen .game-board")[0];

		cols = jewel.settings.cols;
		rows = jewel.settings.rows;

		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		jewel.dom.addClass(canvas, "board");

		var rect = boardElement.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		jewelSize = rect.width / cols;

		boardElement.appendChild(canvas);

		/* appending the background we just created in createBackground */
		boardElement.appendChild(createBackground());
		boardElement.appendChild(canvas); // some type of error here 
		/*-------------------------------------------------------------*/


	} // end of setup function

	function initialize(callback) {
		if (firstRun) {
			setup();
			jewelSprite = new Image();
			jewelSprite.addEventListener("load", callback, false);
			jewelSprite.src = "../public/img/sprites/jewels" + jewelSize + ".png"; // this src might be wrong, check here if issues with debugging
			firstRun = false;
		}
		callback();
	} // end of initialize function

	return {
		initialize: initialize
	}; // end of return

})(); // end of jewel.display function 