importScripts("prime.js");

addEventListener("message", function(e) {
	var res = isPrime(e.data);
	postMessage(res);
}, false);