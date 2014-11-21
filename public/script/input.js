jewel.input = (function() {

	var gpStates,
		gpPoller,
		inputHandlers;

	var keys = {
		
		37: "KEY_LEFT",
		38: "KEY_UP",
		39: "KEY_RIGHT",
		40: "KEY_DOWN",
		13: "KEY_ENTER",
		32: "KEY_SPACE",
		65: "KEY_A",
		66: "KEY_B",
		67: "KEY_C",
		/* ... alpha keys 68-87 ... */
		88: "KEY_X",
		89: "KEY_Y",
		90: "KEY_Z"

	}; // end of keys object

	

	function initialize() {
		var dom = jewel.dom,
            $ = dom.$,
            controls = jewel.settings.controls,
            board = $("#game-screen .game-board")[0];

		inputHandlers = {};
        dom.bind(board, "mousedown", function(event) {
            handleClick(event, "CLICK", event);
        }); // end of mousedown function

        dom.bind(board, "touchstart", function(event) {
            handleClick(event, "TOUCH", event.targetTouches[0]);
        }); // end of touchstart function

        dom.bind(document, "keydown", function(event) {
            var keyName = keys[event.keyCode];
            if (keyName && controls[keyName]) {
                event.preventDefault();
                trigger(controls[keyName]);
            }
        }); // end of keydown function

		if (getGamepads()) {
			gpStates = [];
			if (!gpPoller) {
				gpPoller = setInterval(pollGamepads, 1000/60);
				// workaround to make Firefox register gamepads
				window.addEventListener("gamepadconnected", function(){}, false);
			} // end of if !gpPoller
		} // end of if getGamepads

	} // end of initialize function

	function handleClick(event, control, click) {
		// is any action bound to this input control?
		var settings = jewel.settings,
			action = settings.controls[control];
		if (!action) {
			return;
		} // end of if action

		var board = jewel.dom.$("#game-screen .game-board")[0],
			rect = board.getBoundingClientRect(),
			relX, relY,
			jewelX, jewelY;

		// click position relative to board
		relX = click.clientX - rect.left;
		relY = click.clientY - rect.top;
		// jewel cordinates
		jewelX = Math.floor(relX / rect.width * settings.cols);
		jewelY = Math.floor(relY / rect.height * settings.rows);
		// trigger functions bound to action
		trigger(action, jewelX, jewelY);
		// prevent default click behavior
		event.preventDefault();


	} // end of handleClick function 

	
	function hasGamepads() {
        return !!getGamepads();
    } // end of hasGamepads

	function getGamepads() {
		if (navigator.gamepads) {
			return navigator.gamepads;
		} else if (navigator.getGamepads) {
			return navigator.getGamepads();
		} else if (navigator.webkitGetGamepads) {
			return navigator.webkitGetGamepads();
		} // end of if navigator gamepads
	} // end of getGamepads function

	function pollGamepads() {
		var gamepads = getGamepads(),
            i, gamepad, idx;
        for (i=0;i<gamepads.length;i++) {
            if (gamepads[i]) {
                gamepad = gamepads[i];
                idx = gamepad.index;
                if (gpStates[idx]) {
                    if (gpStates[idx].gamepad != gamepad) {
                        gamepadDisconnected(gpStates[idx]);
                        gamepadConnected(gamepad);
                    } // aend of if gpStates
                } else {
                    gamepadConnected(gamepad);
                } // end of if gpStates
                updateGamepadState(gamepad);
            } // end of if gamepads
        } // end of gamepads for loop
	} // end of pollGamepads function

	function gamepadConnected() {
		gpStates[gamepad.index] = {
            gamepad: gamepad,
            buttons: gamepad.buttons,
            axes: gamepad.axes
        };
        console.log("Gamepad[" + gamepad.index + "] connected");
	} // end of gamepadConnected function

	function gamepadDisconnected() {
		console.log("Gamepad[" + gamepad.index + "] disconnected");
        delete gpStates[gamepad.index];
	} // end of gamepadDisconnected function 

	function updateGamepadState(gamepad) {
		var state = gpStates[gamepad.index],
			i;
		for (var i=0;i<gamepad.buttons.length;i++) {
			if (gamepad.buttons[i] != state.buttons[i]) {
				state.buttons[i] = gamepad.buttons[i];
				if (state.buttons[i]) {
					gamepadButtonDown(gamepad, i);
				} // end of if state
			} // end of if gamepad buttons
		} // end of for loop gamepad

		for (var i=0; i<gamepad.axes.length;i++) {
			if (gamepad.axes[i] != state.axes[i]) {
				state.axes[i] = gamepad.axes[i];
				gamepadAxisChange(gamepad, i, state.axes[i]);
			} // end of if gamepad axes
		} // end of for gamepad axes
	} // end of updateGamepadState function

	function gamepadButtonDown() {
		var gpButtons = {
			0: "BUTTON_A"			
			},
			controls = jewel.settings.controls,
			button = gpButtons[buttonIndex];
		if (button && controls[button]) {
			trigger(controls[button]);
		} // end of if button && controls statement
	} // end of gamepadButtonDown function 

	function gamepadAxisChange(gamepad, axisIndex, axisValue) {
		var controls = jewel.settings.controls,
			controlName;

		if (axisIndex === 0 && axisValue === -1) {
			controlName = "LEFT_STICK_LEFT";
		} else if (axisIndex === 0 && axisValue === 1) {
			controlName = "LEFT_STICK_RIGHT";
		} else if (axisIndex === 1 && axisValue == -1) {
			controlName = "LEFT_STICK_UP";
		} else if (axisIndex === 1 && axisValue ===1) {
			controlName = "LEFT_STICK_DOWN";
		} // end of checking axis direction

		if (controlName && controls[controlName]) {
			trigger(controls[controlName]);
		} // end of if controlName and controls 
	 
	} // end of gamepadButtonDown function

	function bind(action, handler) {
		if (!inputHandlers[action]) {
			inputHandlers[action] = [];
		} // end of inputHandlers
		inputHandlers[action].push(handler);
	} // end of bind function

	function trigger(action) {
		var handlers = inputHandlers[action],
            args = Array.prototype.slice.call(arguments, 1);
        console.log("Game action: " + action);
        if (handlers) {
            for (var i=0;i<handlers.length;i++) {
                handlers[i].apply(null, args);
            } // end of handlers for loop
        } // end of handlers if
	} // end of trigger function

	
	return {
		initialize: initialize,
		bind: bind

	};

})(); // end of jewel.input function