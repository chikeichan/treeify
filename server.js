var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://test:test@ds053130.mongolab.com:53130/angular-book')
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var dom;
var extractedDom;

var request = require("request");

//
app.get('/api/url', function(req,res){
	res.send(extractedDom);
	
});

app.post('/api/url',function(req,res){
	if(!!req.body.query){
		request({
		  uri: req.body.query,
		}, function(error, response, body) {
		  extractedDom = response.body;
		});
	}
})



//Express: Set Port 
app.set('port', process.env.PORT || 8080);

//Express: use view engine jade as template. Look into /views subfolder
app.set('../', path.join(__dirname,'../'));
app.set('view engine', 'jade');


//Express: serve base route / to localhost8080
app.use(express.static(path.join(__dirname,'/')));

app.use(function(req,res){
	res.render('404',{url: req.url});
})

//Http: create server
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express Server listing on port '+app.get('port'));
});