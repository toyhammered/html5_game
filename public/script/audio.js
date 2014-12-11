jewel.audio = (function() {

	var extension,
		sounds,
		activeSounds;


	function initialize() {
		extension = formatTest();
		if (!extension) {
			return;
		}
		sounds = {};
		activeSounds = [];
	} // end of initialize function

	function formatTest() {
		var audio = new Audio(),
			types = [
				["ogg", "audio/ogg; codecs='vorbis'"],
				["mp3", "audio/mpeg"]
			];
		for (var i=0; i<types.length;i++) {
			if (audio.canPlayType(types[i][1]) == "probably") {
			
				return types[i][0];
			}
		} // end of for loop checking types of audio
		for (i=0;i<types.length;i++) {
            if (audio.canPlayType(types[i][1]) == "maybe") {
            	

                return types[i][0];
            }
        }

	} // end of formatTest function 

	function createAudio(name) {
		var el = new Audio("public/sounds/" + name + "." + extension); // check file location is correct
		console.log(el);
		//alert(el);

		if (name == "red_like_roses"){
			backgroundMusic = el;
			backgroundMusic.volume = 0.3;
		} else {
			jewel.dom.bind(el, "ended", cleanActive);
			sounds[name] = sounds[name] || [];
			sounds[name].push(el);
		}
	
		return el;

	} // end of createAudio function

	function getAudioElement(name) {
		if (sounds[name]) {
			for (var i=0,n=sounds[name].length;i<n;i++) {
				if (sounds[name][i].ended) {

					return sounds[name][i];
				} // end of if sounds name
			} // end of for loop
		}
		return createAudio(name);

	} // end of getAudioElement function

	function play(name) {
		var audio = getAudioElement(name);

		audio.play();
		activeSounds.push(audio);
	} // end of play function

	function stop() {
		for (var i=activeSounds.length-1;i>=0;i--) {   // check if it shouldnt be i-- or something
			activeSounds[i].stop();
		} // stopping active Sounds
		activeSounds.length = 0;
		

	} // end of stop function

	
	function pause() {
		backgroundMusic.pause();
	}


	function cleanActive() {
		for (var i=0;i<activeSounds.length;i++) {
			if (activeSounds[i].ended) {
				activeSounds.splice(i,1);
			} // end of active sounds
		}
	} // end of cleanActive function


	


	return {
		initialize: initialize,
		play: play,
		stop: stop,
		pause: pause
	};

})(); // end of jewel.audio function