
var server = require("http").createServer();

server.on("connection", function(socket) {
    console.log("Connection from: ", socket.address().address);
});

server.on("request", function(request, response) {
    console.log("Request:", request.method, request.url);
    
    response.writeHead(
        200, 
        {
            "Content-Type" : "text/plain"
        }
    );
    
    response.write("It Works!");
    
    response.end();
});

server.listen(9999);