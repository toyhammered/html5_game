jewel.display = (function() {

	var canvas, ctx,
        cols, rows,
        cursor,
        jewelSize,
        jewels,
        jewelSprite,
        previousCycle,
        animations = [],
        firstRun = true,
        paused;

	function createBackground() {

		var background = document.createElement("canvas"),
			bgctx = background.getContext("2d");

		jewel.dom.addClass(background, "background");
		background.width = cols * jewelSize;
		background.height = rows * jewelSize;

		
		for (var x=0;x<cols;x++) {
			for (var y=0;y<cols;y++) {
				if ((x + y) % 2) {
					if ((x+ y) % 3) {
					bgctx.fillStyle = "rgba(0,0,0,0.5)"; //black
					bgctx.fillRect (
						x * jewelSize, y * jewelSize,
						jewelSize, jewelSize
					);
					} else {
						bgctx.fillStyle = "rgba(255,255,255,0.5)"; // white
					bgctx.fillRect (
						x * jewelSize, y * jewelSize,
						jewelSize, jewelSize
					);
					}	
				} else {
					if ((x+y) % 3) {
					bgctx.fillStyle = "rgba(255,217,2,0.5)"; // yellow
					bgctx.fillRect (
						x * jewelSize, y * jewelSize,
						jewelSize, jewelSize
					);
					} else {
						bgctx.fillStyle = "rgba(200,51,39,0.5);"; // red
						bgctx.fillRect (
						x * jewelSize, y * jewelSize,
						jewelSize, jewelSize
					);
					}
				}// end of if statement
			} // end of for loop for y cols
		} // end of for loop for x cols
		return background;
	} // end of createBackground function



	function setup() {
		var $ = jewel.dom.$,
			boardElement = $("#game-screen .game-board")[0];

		cols = jewel.settings.cols;
		rows = jewel.settings.rows;

		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		jewel.dom.addClass(canvas, "board");

		var rect = boardElement.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		jewelSize = rect.width / cols;
		console.log("The Jewel Size in setup() is: " + jewelSize);

		// boardElement.appendChild(canvas); possible duplicate?

		/* appending the background we just created in createBackground */
		boardElement.appendChild(createBackground());
		boardElement.appendChild(canvas); 
		/*-------------------------------------------------------------*/

		previousCycle = Date.now();
		requestAnimationFrame(cycle);

	} // end of setup function

	function cycle() {

		var now = Date.now();
		if (!paused) {
			// hide cursor while animating 
			if (animations.length === 0 ) {
				renderCursor(now);
			}
			renderAnimations(now, previousCycle);
		}
		previousCycle = now;
		requestAnimationFrame(cycle);
		
	} // end of cycle function

	function initialize(callback) {
		paused = false;
		if (firstRun) {
			setup();
			jewelSprite = new Image();
			jewelSprite.addEventListener("load", callback, false);
			jewelSprite.src = "public/img/sprites/jewels" + jewelSize + ".png"; // this src might be wrong, check here if issues with debugging
			firstRun = false;
		} else {
			callback(); // possible error here page 187ish (less than)
		}
	} // end of initialize function

	function drawJewel(type, x, y, scale, rot) {
		ctx.save();
		if (typeof scale !== "undefined" && scale > 0) {
			ctx.beginPath();
			ctx.translate(
				(x + 0.5) * jewelSize,
				(y + 0.5) * jewelSize
			); // end of translate
			ctx.scale(scale, scale);
			if (rot) {
				ctx.rotate(rot);
			} // end of rot if statement
			ctx.translate(
				-(x + 0.5) * jewelSize,
				-(y + 0.5) * jewelSize
			); // end of translate
		} // end of if typeof statement
		ctx.drawImage(jewelSprite,
			type * jewelSize, 0, jewelSize, jewelSize,
			x * jewelSize, y * jewelSize,
			jewelSize, jewelSize
		); // end of drawImage 
		ctx.restore();
	} // end of function drawJewel

	function redraw(newJewels, callback) {
		var x, y;
        jewels = newJewels;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawJewel(jewels[x][y], x, y);
            } // end of for loop y
        } // end of for loop x
        callback();
        //renderCursor();
	} // end of function redraw

	function renderCursor(time) {
		if (!cursor) {
			return;
		} // end of if !cursor
		var x = cursor.x,
			y = cursor.y,
			t1 = (Math.sin(time / 200) + 1) / 2,
			t2 = (Math.sin(time / 400) + 1) /2;


		clearCursor();

		if (cursor.selected) {
			ctx.save();
			ctx.globalCompositeOperation = "lighter";
			ctx.globalAlpha = 0.8 * t1;
			drawJewel(jewels[x][y], x, y);
			ctx.restore();
		} // end of if cursor selected
		ctx.save();
		ctx.lineWidth = 0.05 * jewelSize;
		ctx.strokeStyle = "rgba(250,250,150," + (0.5 + 0.5 * t2) + ")";
		ctx.strokeRect(
			(x + 0.05) * jewelSize, (y + 0.05) * jewelSize,
			0.9 * jewelSize, 0.9 * jewelSize
		);
		ctx.restore();

	} // end of renderCursor function

	function addAnimation(runTime, fncs) {
		var anim = {
			runTime: runTime,
			startTime: Date.now(),
			pos: 0,
			fncs: fncs
		}; // end of anim object
		animations.push(anim);
	} // end of addAnimation function

	function renderAnimations(time, lastTime) {
		var anims = animations.slice(0), // copy list
			n = anims.length,
			animTime,
			anim,
			i;

		// cal before() function
		for (i=0;i<n;i++) {
			anim = anims[i];
			if (anim.fncs.before) {
				anim.fncs.before(anim.pos);
			} // end of if anim before
			anim.lastPos = anim.pos;
			animTime = (lastTime - anim.startTime);
			anim.pos = animTime / anim.runTime;
			anim.pos = Math.max(0, Math.min(1, anim.pos));
		} // end of for loop

		animations = []; // reset animation list

		for (i=0;i<n;i++) {
			anim = anims[i];
			anim.fncs.render(anim.pos, anim.pos-anim.lastPos);
			if (anim.pos == 1) {
				if (anim.fncs.done) {
					anim.fncs.done();
				} // end of nested anim if statement
			} else { 
				animations.push(anim);
			} // end of anim if statement
		} // end of for loop
	} // end of renderAnimations function

	function moveJewels(movedJewels, callback) {
        var n = movedJewels.length,
            oldCursor = cursor;
        cursor = null;
        movedJewels.forEach(function(e) {
         	var x = e.fromX, y = e.fromY,
         		dx = e.toX - e.fromX,
         		dy = e.toY - e.fromY,
         		dist = Math.abs(dx) + Math.abs(dy);
         	addAnimation(200 * dist, {
         		before: function(pos) {
         			pos = Math.sin(pos * Math.PI / 2);
         			clearJewel(x + dx * pos, y + dy * pos);
         		}, // end of before
         		render: function(pos) {
         			pos = Math.sin(pos * Math.PI / 2);
         			drawJewel(
         				e.type,
         				x + dx * pos, y + dy * pos
         			); // end of draw Jewel
         		}, // end of render
         		done: function () {
         			if (--n == 0) {
         				cursor = oldCursor;
         				callback();
         			} // end of if -n
         		} // end of done
         	}); // end of addAnimation
         }); // end of movedJewels forEach statement
    } // end of moveJewels function

    function removeJewels(removedJewels, callback) {
        var n = removedJewels.length;
        removedJewels.forEach(function(e) {
        	addAnimation(400, {
        		before: function() {
        			clearJewel(e.x, e.y);
        		}, // end of before
        		render: function(pos) {
        			ctx.save();
        			ctx.globalAlpha = 1 - pos;
        			drawJewel(
        				e.type, e.x, e.y,
        				1 - pos, pos * Math.PI * 2
        			);
        			ctx.restore();
        		}, // end of render
        		done: function() {
        			if (--n == 0) { // should it be --n? or just -n?
        				callback();
        			} // end of -n if
        		} // end of done
        	}); // end of addAnimation
        }); // end of removedJewels forEach
    } // end of removeJewels function

    function refill(newJewels, callback) {
    	var lastJewel = 0;
    	addAnimation(1000, {
    		render: function(pos) {
    			var thisJewel = Math.floor(pos * cols * rows),
    				i, x, y;
    			for (i = lastJewel; i < thisJewel; i++) {
    				x = i % cols;
    				y = Math.floor(i / cols);
    				clearJewel(x, y);
    				drawJewel(newJewels[x][y], x, y);
    			} // end of for loop
    			lastJewel = thisJewel;
    			jewel.dom.transform(canvas,
    				"rotateX(" + (360 * pos) + "deg)");
    		}, // end of render function 
    		done: function() {
    			canvas.style.webkitTransform = "";
    			callback();
    		} // end of done function 
    	}) // end of addAnimation 
    } // end of refill function 

    function levelUp(callback) {
        addAnimation(1000, {
            before : function(pos) {
                var j = Math.floor(pos * rows * 2),
                    x, y;
                for (y=0,x=j;y<rows;y++,x--) {
                    if (x >= 0 && x < cols) { // boundary check
                        clearJewel(x, y);
                        drawJewel(jewels[x][y], x, y);
                    }
                }
            },
            render : function(pos) {
                var j = Math.floor(pos * rows * 2),
                    x, y;
                ctx.save(); // remember to save state
                ctx.globalCompositeOperation = "lighter";
                for (y=0,x=j;y<rows;y++,x--) {
                    if (x >= 0 && x < cols) { // boundary check
                        drawJewel(jewels[x][y], x, y, 1.1);
                    }
                }
                ctx.restore();
            },
            done : callback
        });
    } // end of levelUp function 

	function clearCursor() {
		if (cursor) {
			var x = cursor.x,
				y = cursor.y;
			clearJewel(x, y);
			drawJewel(jewels[x][y], x, y)
		} // end of if cursor
	} // end of clearCursor function 	

	function setCursor(x, y, selected) {
		clearCursor();
		if (arguments.length > 0) {
			cursor = {
				x: x,
				y: y,
				selected: selected
			};
		} else {
			cursor = null;
		} // end of cursor selected object
	} // end of setCursor function

	function clearJewel(x, y ) {
		ctx.clearRect(
			x * jewelSize, y * jewelSize, jewelSize, jewelSize
		);
	} // end of clearJewel function 

	

    function gameOver(callback) {
        addAnimation(1000, {
            render : function(pos) {
                canvas.style.left =
                    0.2 * pos * (Math.random() - 0.5) + "em";
                canvas.style.top =
                    0.2 * pos * (Math.random() - 0.5) + "em";
            },
            done : function() {
                canvas.style.left = "0";
                canvas.style.top = "0";
                explode(callback);
            }
        });
    } // end of gameOver function 


    function explode(callback) {
        var pieces = [],
            piece,
            x, y;
        for (x=0;x<cols;x++) {
            for (y=0;y<rows;y++) {
                piece = {
                    type : jewels[x][y],
                    pos : {
                        x : x + 0.5,
                        y : y + 0.5
                    },
                    vel : {
                        x : (Math.random() - 0.5) * 20,
                        y : -Math.random() * 10
                    },
                    rot : (Math.random() - 0.5) * 3
                }
                pieces.push(piece);
            }
        }

        addAnimation(2000, {
            before : function(pos) {
                ctx.clearRect(0,0,canvas.width,canvas.height);
            },
            render : function(pos, delta) {
                explodePieces(pieces, pos, delta);
            },
            done : callback
        });
    } // end of explode function 

    function explodePieces(pieces, pos, delta) {
        var piece, i;
        for (i=0;i<pieces.length;i++) {
            piece = pieces[i];

            piece.vel.y += 50 * delta;
            piece.pos.y += piece.vel.y * delta;
            piece.pos.x += piece.vel.x * delta;

            if (piece.pos.x < 0 || piece.pos.x > cols) {
                piece.pos.x = Math.max(0, piece.pos.x);
                piece.pos.x = Math.min(cols, piece.pos.x);
                piece.vel.x *= -1;
            }

            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.translate(piece.pos.x * jewelSize, piece.pos.y * jewelSize);
            ctx.rotate(piece.rot * pos * Math.PI * 4);
            ctx.translate(-piece.pos.x * jewelSize, -piece.pos.y * jewelSize);
            drawJewel(piece.type,
                piece.pos.x - 0.5,
                piece.pos.y - 0.5
            );
            ctx.restore();
        }
    } // end of explodePieces function 

    function pause() {
        paused = true;
    } // end of pause function

    function resume(pauseTime) {
        paused = false;
        for (var i=0;i<animations.length;i++) {
            animations[i].startTime += pauseTime;
        }
    } // end of resume function 

	return {
		initialize: initialize,
        redraw: redraw,
        setCursor: setCursor,
        moveJewels: moveJewels,
        removeJewels: removeJewels,
        refill: refill,
        levelUp: levelUp,
        gameOver: gameOver,
        pause: pause,
        resume: resume
	}; // end of return

})(); // end of jewel.display function 




























