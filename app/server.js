//server.js

var express = require('express');
var url = require('url');

var redis = require('redis');
var app = express();
var client = redis.createClient();
var myfunction = require('./myfunction');

client.on('connect', function(){
	console.log('connected');
});
client.set('count', 0);

app.get('/', function(req, res){
	var url_parts = url.parse(req.url,true);
	var query = url_parts.query;
	
	res.setHeader("Content-Type", "text/html");

	myfunction.appendJsonTofile('input.json',query,myCallback);
	
	myfunction.incrIfParamHasCount(query,myCallback);
	
	res.send(query);

});



var myCallback = function (err, data) {
    if (err) return console.error(err);
    console.log(data);
};


app.listen(3000);