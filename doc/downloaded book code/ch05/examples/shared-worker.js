var c = 0;
	
addEventListener("connect", function(event) {
	var id = c++,
		port = event.ports[0];
	
	port.postMessage("You are now connected as #" + id);

	port.addEventListener("message", function(event) {
		if (event.data == "Hello") {
			port.postMessage("And hello to you, #" + id);
		}
	}, false);
	port.start();

}, false);
