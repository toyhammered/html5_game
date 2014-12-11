jewel.backgroundSnow = (function() {

	function createBackgroundSnow() {
			var backgroundSnow = document.createElement("canvas"),
				bgSctx = backgroundSnow.getContext("2d");
			console.log('snow created');
			

			jewel.dom.addClass(backgroundSnow, "backgroundSnow"); // might need to be just background for "" why not just add and remove class?

			backgroundSnow.width = 320; //cols * jewelSize;
			backgroundSnow.height = 480; //rows * jewelSize;

			W = backgroundSnow.width;
			H = backgroundSnow.height;


			var mp = 250; //max particles
			var particles = [];
			for(var i = 0; i < mp; i++) {
				particles.push({
					x: Math.random()*W, //x-coordinate
					y: Math.random()*H, //y-coordinate
					r: Math.random()*2+1, //radius
					d: Math.random()*mp //density

				})
				
		} // end of for loop particles 
			
		//Lets draw the flakes
		function drawSnowFlakes() {
			
			bgSctx.clearRect(0, 0, W, H);
			bgSctx.fillStyle = "red";
			
			//console.log(RC);
			
			bgSctx.beginPath();
			for(var i = 0; i < mp; i++) {

				var p = particles[i];
				bgSctx.moveTo(p.x, p.y);
				bgSctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);

			}
			bgSctx.fill();
			updateSnow();
		} // end of drawSnowFlakes function 


		var angle = 0;
		function updateSnow() {
			angle += 0.01;
			for(var i = 0; i < mp; i++)
			{
				var p = particles[i];
				//Updating X and Y coordinates
				//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
				//Every particle has its own density which can be used to make the downward movement different for each flake
				//Lets make it more random by adding in the radius
				p.y += Math.cos(angle+p.d) + 1 + p.r/2;
				p.x += Math.sin(angle) * 2;
				
				//Sending flakes back from the top when it exits
				//Lets make it a bit more organic and let flakes enter from the left and right also.
				if(p.x > W+5 || p.x < -5 || p.y > H)
				{
					if(i%3 > 0) //66.67% of the flakes
					{
						particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
					}
					else
					{
						//If the flake is exitting from the right
						if(Math.sin(angle) > 0)
						{
							//Enter from the left
							particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
						}
						else
						{
							//Enter from the right
							particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
						}
					}
				}
			}
		} // end of updateSnow function 
		
		//animation loop
		setInterval(drawSnowFlakes, 33);
		
		return backgroundSnow;




		//requestAnimationFrame(cycle);
	} // end of createBackgroundSnow function 

	function setup() {
		createBackgroundSnow();
		appendSnow();
	}
	setup();
	function appendSnow() {
		var boardElement = document.getElementById("backgroundDiv");
		boardElement.appendChild(createBackgroundSnow());
		
	}


	return {
		createBackgroundSnow: createBackgroundSnow,
		setup: setup
	};


})();















