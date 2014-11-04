var jewel = (function() {

	var settings = { /* settings for the game to check */
		rows: 8,	 /* this is an 8x8 game */
		cols: 8,
		baseScore: 100,	/* 100 points per jewel, can be changed */
		numJewelTypes: 7, /* number of diffrent jewels */

		controls: {

			// keyboard
			KEY_UP: "moveUp",
			KEY_LEFT: "moveLeft",
			KEY_DOWN: "moveDown",
			KEY_RIGHT: "moveRight",
			KEY_ENTER: "selectJewel",
			KEY_SPACE: "selectJewel",

			// mouse and touch
			CLICK: "selectJewel",
			TOUCH: "selectJewel",

			// gamepad
			BUTTON_A: "selectJewel",
			LEFT_STICK_UP: "moveUp",
			LEFT_STICK_DOWN: "moveDown",
			LEFT_STICK_LEFT: "moveLeft",
			LEFT_STICK_RIGHT: "moveRight"
		}
	};


	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executeRunning = false;


	function executeScriptQueue() {
		var next = scriptQueue[0],
			first, script;
		if (next && next.loaded) {
			executeRunning = true;
			// remove the first element in the queue
			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onload = function() {
				if (next.callback) {
					next.callback();
				} //end of next.callback if statement

				// try to execute more scripts
				executeScriptQueue();

			}; // end of script.onload function
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		} else { 
			executeRunning = false;
		} // end of next && next.loaded if statement


	}// end of executeScriptQueue



	function getLoadProgress() {
		return numResourcesLoaded / numResources;
	} // preload everything

	function load(src, callback) {
		var image, queueEntry;
		numResources++;

		// add this resource to the execution queue
		queueEntry = {
			src: src,
			callback: callback,
			loaded: false
		};
		scriptQueue.push(queueEntry); //pushing to scriptQueue array

		image = new Image();
		image.onload = image.onerror = function() {
			numResourcesLoaded++;
			queueEntry.loaded = true;

			if(!executeRunning) {
				executeScriptQueue();
			}
		};// end of image.onerror
		image.src = src;

	}// end of load


	function preload(src) {
		var image = new Image();
		image.src = src;
	}

	// hide the active screen (if any) and show the screen with the specified id
	function showScreen (screenId) {
		var dom = jewel.dom,
			$ = dom.$,
			activeScreen = $("#game .screen.active")[0],
			screen = $("#" + screenId)[0];

		if (!jewel.screens[screenId]) {
			alert("This module is not implemented yet!");
			return;
		} //end of module implentation if statement

		if (activeScreen) {
			dom.removeClass(activeScreen, "active");
		} //end of activeScreen if statement
		dom.addClass(screen, "active");

		// run the screen module
		jewel.screens[screenId].run();

	} // end of showSCreen Function

	function isStandalone() {
		return (window.navigator.standalone !== false);
	} //end of stand alone function


	function hasWebWorkers() {
		return ("Worker" in window);
	} // end of function hasWebWorkers

	
	function setup() {

		// hide the address bar on Android devices
		if (/Android/.test(navigator.userAgent)) {
			$("html")[0].style.height = "200%"
			setTimeout(function() {
				window.scrollTo(0,1);
			}, 0);
		} //end of if statement for Android test

		// disable native touchmove behavior to prevent overscroll
		jewel.dom.bind(document, "touchmove", function(event) {
			event.preventDefault();
		});


		if (isStandalone()) {
			showScreen("splash-screen");
		} else {
			showScreen("install-screen");
		} // end of stand alone if statement
		console.log("Success!"); // debugging purposes
		
	}// end of setup

	function swap(x1, y1, x2, y2, callback) {
		var tmp, swap1, swap2,
			events = [];

		swap1 = {
			type: "move",
			data: [{
				type: getJewel(x1, y1),
				fromX: x1, fromY: y1, toX: x2, toY: y2
			}, {
				type: getJewel(x2, y2),
				fromX: x2, fromY: y2, toX: x1, toY: y1
			}]
		}; // end of swap1 object 

		swap2 = {
			type: "move",
			data: [{
				type: getJewel(x2, y2),
				fromX: x1, fromY: y1, toX: x2, toY: y2
			}, {
				type: getJewel(x1, y1),
				fromX: x2, fromY: y2, toX: x1, toY: y1
			}]
		}; // end of swap2 object 

		if (isAdjacent(x1, y1, x2, y2)) {
			events.push(swap1);
			if (canSwap(x1, y1, x2, y2)) {
				tmp = getJewel(x1, y1);
				jewels[x1][y1] = getJewel(x2, y2);
				jewels[x2][y2] = tmp;
				events = events.concat(check());
			} else {
				events.push(swap2, {type: "badswap"});
			} // end of canSwap if statement
			callback(events);
		} // end of isAdjacent if statement	

	} // end of swap function

	// expose public methods
	return {	
	// remember when adding more returns to put commas "," after each one except the last!!
		getLoadProgress: getLoadProgress,
        hasWebWorkers: hasWebWorkers,
        isStandalone: isStandalone,
        preload: preload,
        load: load,
        setup: setup,
        showScreen : showScreen,
        settings: settings,
        screens: {}
	}; // end of return

})(); // this will auto execute on load of game