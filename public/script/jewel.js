var jewel = (function() {

	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executeRunning = false;

	var settings = { /* settings for the game to check */
		rows: 8,	 /* this is an 8x8 game */
		cols: 8,
		baseScore: 100,	/* 100 points per jewel, can be changed */
		numJewelTypes: 7 /* number of diffrent jewels */
	};


	function getLoadProgress() {
		return numResourcesLoaded / numResources;
	} // preload everything


	function preload(src) {
		var image = new Image();
		image.src = src;
	}

	function hasWebWorkers() {
		return ("Worker" in window);
	} // end of function hasWebWorkers

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

	function isStandalone() {
		return (window.navigator.standalone !== false);
	} //end of stand alone function

	function setup() {
		if (isStandalone()) {
			showScreen("splash-screen");
		} else {
			showScreen("install-screen");
		} // end of stand alone if statement
		console.log("Success!"); // debugging purposes

		// disable native touchmove behavior to prevent overscroll
		jewel.dom.bind(document, "touchmove", function(event) {
			event.preventDefault();
		});

		// hide the address bar on Android devices
		if (/Android/.test(navigator.userAgent)) {
			$("html")[0].style.height = "200%"
			setTimeout(function() {
				window.scrollTo(0,1);
			}, 0);
		} //end of if statement for Android test
		
	}// end of setup

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

	




	// expose public methods
	return {	
	// remember when adding more returns to put commas "," after each one except the last!!
		getLoadProgress: getLoadProgress,
		preload: preload,
		load: load,
		setup: setup,
		showScreen: showScreen,
		screens: {},
		isStandalone: isStandalone,
		settings: settings,
		hasWebWorkers: hasWebWorkers
	}; // end of return






})(); // this will auto execute on load of game