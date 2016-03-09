'use strict';

const PORT = 9999;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var Contacts = require('./contacts');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'));

app.get('/', function(req, res) {
	var indexPath = path.join(__dirname, 'index.html');
	res.sendFile(indexPath);	
	return;
});

app.get('/getcontacts', function(req, res) {
	Contacts.read(function(err, contacts) {
		if(err) {
			return res.status(400).send(err);
		}
		res.send(contacts);
	});
});

app.post('/addcontact', function(req, res) {
	Contacts.read(function(err, contacts) {
		if(err) {
			return res.status(400).send(err);
		}
		contacts.push(req.body);
		Contacts.write(contacts, function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			res.send('Added!');
		})
	});
});

app.delete('/removecontact/:index', function(req, res) {
	var index = req.params.index;
	Contacts.read(function(err, contacts) {
		if(err) {
			return res.status(400).send(err);
		}
		contacts.splice(index, 1);
		Contacts.write(contacts, function(err) {
			if(err) {
				return res.status(400).send(err);
			}
			res.send('Removed!');
		})
	});
});

app.put('/editcontact/:index', function(req, res) {
	var index = req.params.index;
	Contacts.read(function(err, contacts) {
		if(err) {
			return res.status(400).send(err);
		}
		contacts.splice(index, 1, req.body);
		Contacts.write(contacts, function(callback) {
			if(err) {
				return res.status(400).send(err);
			}
			res.send('Edit Saved!')
		})
	})
})

var server = http.createServer(app);

server.listen(PORT, function() {
	console.log(`Server listening on port ${PORT}...`);
});


