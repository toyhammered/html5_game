jewel.display = (function() {
    var canvas, ctx,
        cols, rows,
        jewelSize,
        jewels,
        jewelSprite,
        firstRun = true;

    function createBackground() {
        var background = document.createElement("canvas"),
            bgctx = background.getContext("2d");

        jewel.dom.addClass(background, "background");
        background.width = cols * jewelSize;
        background.height = rows * jewelSize;

        bgctx.fillStyle = "rgba(225,235,255,0.15)";
        for (var x=0;x<cols;x++) {
            for (var y=0;y<cols;y++) {
                if ((x+y) % 2) {
                    bgctx.fillRect(
                        x * jewelSize, y * jewelSize,
                        jewelSize, jewelSize
                    );
                }
            }
        }
        return background;
    }

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
        
        boardElement.appendChild(createBackground());
        boardElement.appendChild(canvas);
    }

    function initialize(callback) {
        if (firstRun) {
            setup();
            jewelSprite = new Image();
            jewelSprite.addEventListener(
                "load", callback, false);
            jewelSprite.src = 
                "images/jewels" + jewelSize + ".png";
            firstRun = false;
        } else {
            callback();
        }
    }

    function drawJewel(type, x, y) {
        ctx.drawImage(jewelSprite,
            type * jewelSize, 0, jewelSize, jewelSize,
            x * jewelSize, y * jewelSize,
            jewelSize, jewelSize
        );
    }

    function redraw(newJewels, callback) {
        var x, y;
        jewels = newJewels;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawJewel(jewels[x][y], x, y);
            }
        }
        callback();
    }

    return {
        initialize : initialize,
        redraw : redraw
    };
})();
