jewel.board = (function() {

	/* game functions go here */
	var settings,
		jewels,
		cols,
		rows,
		baseScore,
		numJewelTypes;

	function initialize(callback) {
		settings = jewel.settings;
		numJewelTypes = settings.numJewelTypes;
		baseScore = settings.baseScore;
		cols = settings.cols;
		rows = settings.rows;
		fillBoard();

		if (callback) {
			callback();
		} // end of callback
	} /* end of initialized(callback) function */

	function fillBoard() {
		var x, y,
			type;

		jewels = [];
		for (x=0; x < cols; x++) {
			jewels[x] = [];
			for (y=0; y < rows; y++) {
				type = randomJewel();
				while ((type === getJewel(x-1, y) &&
						type === getJewel(x-2, y )) ||
						(type === getJewel(x, y-1) &&
						type === getJewel(x, y-2))) {
					type = randomJewel();
				} // end of while loop to check for chains (3 in a row) during startup
				jewels[x][y] = type;
			} // end of rows for loop
		} // end of cols for loop
	} /* end of fillBoard function */


	function randomJewel() {
		return Math.floor(Math.random() * numJewelTypes);
	} /* end of randomJewel function */


	function getJewel(x,y) {
		if (x < 0 || x > cols-1 || y < 0 || y > rows-1) {
			return -1;
		} else {
			return jewels[x][y];
		} // end of if else statement against out of bounds errors 
	  	  // this means if a jewel is trying to be generated outside of the borders, this will never affect the board
	} /* end of getJewel function */


	/* type jewel.board.print() to console to get board data */
	function print() {
		var str = "";
		for (var y = 0; y < rows; y++) {
			for (var x=0; x < cols; x++) {
				str += getJewel(x,y) + " ";
			} /* end of checking cols (var x) */
			str += "\r\n";
		} /* end of checking rows (var y) */
		console.log(str);
	} /* end of print function */

	return {
		/* exposed functions go here */
		initialize: initialize,
		print: print

	};



})();