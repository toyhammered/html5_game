jewel.display = (function() {

	var cursor,
		jewels,
		jewelSprite,
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
			for (var y=0;y<cols;y++) {
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
		console.log("The Jewel Size in setup() is: " + jewelSize);

		boardElement.appendChild(canvas);

		/* appending the background we just created in createBackground */
		boardElement.appendChild(createBackground());
		boardElement.appendChild(canvas); 
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
		callback(); // possible error here page 187ish (less than)
	} // end of initialize function



	function drawJewel(type, x, y) {
		ctx.drawImage(jewelSprite,
            type * jewelSize, 0, jewelSize, jewelSize,
            x * jewelSize, y * jewelSize,
            jewelSize, jewelSize
        );
	} // end of function drawJewel

	function redraw(newJewels, callback) {
		var x, y;
        jewels = newJewels;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawJewel(jewels[x][y], x, y);
            } // end of for loop y
        } // end of for loop x
        callback();
        renderCursor();
	} // end of function redraw

	function renderCursor() {
		if (!cursor) {
			return;
		} // end of if !cursor
		var x = cursor.x,
			y = cursor.y;

		clearCursor();

		if (cursor.selected) {
			ctx.save();
			ctx.globalCompositeOperation = "lighter";
			ctx.globalAlpha = 0.8;
			drawJewel(jewels[x][y], x, y);
			ctx.restore();
		} // end of if cursor selected
		ctx.save();
		ctx.lineWidth = 0.05 * jewelSize;
		ctx.strokeStyle = "rgba(250,250,150,0.8)";
		ctx.strokeRect(
			(x + 0.05) * jewelSize, (y + 0.05) * jewelSize,
			0.9 * jewelSize, 0.9 * jewelSize
		);
		ctx.restore();

	} // end of renderCursor function

	function moveJewels(movedJewels, callback) {
        var n = movedJewels.length,
            mover, i;
        for (i=0;i<n;i++) {
            mover = movedJewels[i];
            clearJewel(mover.fromX, mover.fromY);
        }
        for (i=0;i<n;i++) {
            mover = movedJewels[i];
            drawJewel(mover.type, mover.toX, mover.toY);
        }
        callback();
    } // end of moveJewels function

    function removeJewels(removedJewels, callback) {
        var n = removedJewels.length;
        for (var i=0;i<n;i++) {
            clearJewel(removedJewels[i].x, removedJewels[i].y);
        }
        callback();
    } // end of removeJewels function

	function clearCursor() {
		if (cursor) {
			var x = cursor.x,
				y = cursor.y;
			clearJewel(x, y);
			drawJewel(jewels[x][y], x, y)
		} // end of if cursor
	} // end of clearCursor function 	

	function setCursor(x, y, selected) {
		clearCursor();
		if (arguments.length > 0) {
			cursor = {
				x: x,
				y: y,
				selected: selected
			};
		} else {
			cursor = null;
		} // end of cursor selected object
		renderCursor();
	} // end of setCursor function

	function clearJewel(x, y ) {
		ctx.clearRect(
			x * jewelSize, y * jewelSize, jewelSize, jewelSize
		);
	} // end of clearJewel function 

	return {
		initialize : initialize,
        redraw : redraw,
        setCursor : setCursor,
        moveJewels : moveJewels,
        removeJewels : removeJewels,
        refill : redraw
	}; // end of return

})(); // end of jewel.display function 




























