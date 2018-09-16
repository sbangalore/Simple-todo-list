var http = require('http');

var onStart = function(req, res) {
	res.writeHead(200);
	res.end('<h1>Hi!</h1>');
}

var server = http.createServer(onStart);
server.listen(8080);
