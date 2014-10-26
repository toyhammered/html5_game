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

		//try again if new board has no moves
		if (!hasMoves()) {
			fillBoard();
		} // no moves present 
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



	/* returns the number of jewels in the longest chain
		this includes (x,y) */
	function checkChain(x, y) {
		var type= getJewel(x,y),
			left = 0, right =0,
			down = 0, up = 0;

		// look right
		while (type === getJewel(x + right + 1, y)) {
			right++;
		} // end of looking right

		// look left
		while (type === getJewel(x - left - 1, y)) {
			left++;
		} // end of looking left

		// look up
		while (type === getJewel(x, y + up + 1)) {
			up++;
		} // end of looking up

		// look down
		while (type === getJewel(x, y - down - 1)) {
			down++;
		} // end of looking down
		return Math.max(left + 1 + right, up + 1 + down); /* returns a number of jewels in the largest chain */

	} /* end of checkChain function */

	function canSwap(x1, y1, x2, y2) {
		var type1 = getJewel(x1,y1),
			type2 = getJewel(x2,y2),
			chain;

		if (!isAdjacent(x1, y1, x2 ,y2)) {
			return false;
		} // end of isAdjacent if statement 

		//temporarily swap jewels
		jewels[x1][y1] = type2;
		jewels[x2][y2] = type1;

		chain = (checkChain(x2, y2) > 2 ||
				 checkChain(x1, y1) > 2);

		// swap back
		jewels[x1][y1] = type1;
		jewels[x2][y2] = type2;

		return chain;

	} /* end of canSwap function */


    // returns true if (x1,y1) is adjacent to (x2,y2)
    function isAdjacent(x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2),
            dy = Math.abs(y1 - y2);
        return (dx + dy === 1);
    } // end of isAdjacent function 

    // returns a two-dimensional map of chain-lengths
    function getChains() {
        var x, y,
            chains = [];

        for (x = 0; x < cols; x++) {
            chains[x] = [];
            for (y = 0; y < rows; y++) {
                chains[x][y] = checkChain(x, y);
            }
        }
        return chains;
    } // end of getChains function 

    function check(events) {
		var chains = getChains(),
			hadChains = false, score = 0,
			removed = [], moved = [], gaps = [];

		for (var x = 0; x < cols; x++) {
			gaps[x] = 0;
			for (var y = rows-1; y >=0; y--) { // what does this thing at end of for loop mean, some kind of HTML Entity(decimal) &#x2013;
				if (chains[x][y] > 2 ) {			 // XML numeric entity: &#x2013 is equivilent to (--) 
					hadChains = true;
					gaps[x]++;
					removed.push({
						x: x, y: y,
						type: getJewel(x, y)
					});

					// add points to user
					score += baseScore *
							 Math.pow(2, (chains[x][y] - 3));

				} else if (gaps[x] > 0) {
					moved.push({
						toX: x, toY: y + gaps[x],
						fromX: x, fromY: y,
						type: getJewel(x,y)
					});
					jewels[x][y + gaps[x]] = getJewel(x, y);
				} // else if moved.push
			} // end of for loop checking y

		} // end of for loop checking x

		events = events || [];
		// checking the board recursively 
		if (hadChains) {
			events.push({
				type: "remove",
				data: removed
			}, {
				type: "score",
				data: score
			}, {
				type: "move",
				data: moved
			});
			if (!hasMoves()) {
				fillBoard();
				events.push({
					type: "refill",
					data: getBoard()
				});
			} // loading new board if no more moves available 
			return check(events);
		} else {
			return events;
		} // end of if statement hadChains

	} /* end of check function */

	function swap(x1, y1, x2, y2, callback) {
		var tmp,
			events;

		if (canSwap(x1, y1, x2, y2)) {

			// swap the jewels
			tmp = getJewel(x1, y1);
			jewels[x1][y1] = getJewel(x2, y2);
			jewels[x2][y2] = tmp;

			// check the board and get list of events
			events = check();

			callback(events);
		} else {
			callback(false);
		} // end of if canSwap statement
	} // end of swap function 

	// returns true if at least one match can be made
	function hasMoves() {
		for (var x = 0; x < cols; x++) {
			for (var y = 0; y < rows; y++) {
				if (canJewelMove(x,y)) {
					return true;
				}
			}
		}
		return false;
	} /* end of hasMoves function */

	// returns true if (x,y) is a valid position and if
	// the jewel at (x,y) can be swapped with a neighbor
	function canJewelMove(x, y) {
        return ((x > 0 && canSwap(x, y, x-1 , y)) ||
                (x < cols-1 && canSwap(x, y, x+1 , y)) ||
                (y > 0 && canSwap(x, y, x , y-1)) ||
                (y < rows-1 && canSwap(x, y, x , y+1)));
    } // end of canJewelMove function 

	// create a copy of the jewel board
	function getBoard() {
		var copy = [],
			x;

		for (x=0; x < cols; x++) {
			copy[x] = jewels[x].slice(0);
		}
		return copy;
	} // end of getBoard function

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
		initialize : initialize,
        swap : swap,
        canSwap : canSwap,
        getBoard : getBoard,
        print : print
		
	};



})();