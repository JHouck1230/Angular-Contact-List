'use strict';

var contactsFilename = './data/contacts.json';

var fs = require('fs');

exports.read = function(callback) {
	fs.readFile(contactsFilename, function(err, data) {
		var contacts = JSON.parse(data);
		callback(err, contacts);
	})
};

exports.write = function(contacts, callback) {
	var contactsJSON = JSON.stringify(contacts);
	fs.writeFile(contactsFilename, contactsJSON, function(err) {
		callback(err);
	});
};