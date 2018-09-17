var http = require('http');
var url = require('url');
var markdown = require('markdown').markdown;
var querystring = require('querystring');

var start = function(req, res) {
	var page = url.parse(req.url).pathname;
	console.log(page);
	res.writeHead(200, {'Content-Type':'text/plain'});
	if (page=='/') {
		res.write('<h1>Hi!</h1>');
	} else if (page == '/basement') {
		res.write('wine cellar.');
	} else if (page =='/bedroom') {
		res.write('private');
	}
	res.end();
}

var server = http.createServer(start);
server.on('close', function() {
	console.log('bye!');
});

server.listen(8080);
console.log(markdown.toHTML('A paragraph in *markdown*!'))