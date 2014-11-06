var jewel = (function() {

	var settings = {
        rows: 8,
        cols: 8,
        baseScore: 100,
        baseLevelScore: 1500,
        baseLevelExp: 1.05,
        baseLevelTimer: 60000,
        numJewelTypes: 7,
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
                }
                // try to execute more scripts
                executeScriptQueue();
            };
            script.src = next.src;
            first.parentNode.insertBefore(script, first);
        } else {
            executeRunning = false;
        }
    }


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