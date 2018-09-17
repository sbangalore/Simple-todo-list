var express = require('express');
var favicon = require('serve-favicon');
var session = require('cookie-session'); 
var bodyparser = require('body-parser');

var app = express();
var urlencodedParser = bodyparser.urlencoded({extended: false})

app.use(session({secret: 'todotopsecret'}))
.use(function(req, res, next) {
	if (typeof(req.session.todolist) == 'undefined') {
		req.session.todolist = [];
	}
	next();
})
.use(express.static(__dirname + '/public'))
.use(favicon(__dirname + '/public/favicon.ico'))
.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.render('page.ejs', {todolist: req.session.todolist});
})
.post('/add', urlencodedParser, function(req, res) {
	req.session.todolist.push(req.body.user_input);
	res.redirect('/');
})
.get('/delete/:id', urlencodedParser, function(req,res) {
	req.session.todolist.splice(req.params.id, 1);
	res.redirect('/');
})
.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page cannot be found.');
})

app.listen(8080);