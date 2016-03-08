'use strict';

var app = angular.module('myApp', [])

app.controller('mainCtrl', function($scope, $http) {
	$scope.contacts = [];

	loadContacts();
	function loadContacts() {
		$http({
			url: '/getcontacts'
		})
		.then(function(res) {
			var contacts = res.data;
			contacts.forEach((contact) => $scope.contacts.push(contact));
			return;
		}, function(err) {
			return console.error(err);
		});
	};

	$scope.addContact = function() {
		var contact = angular.copy($scope.newContact);
		$http({
			method: 'POST',
			url: '/addcontact',
			data: 
			{
				name: $scope.newContact.name,
				phone: $scope.newContact.phone,
				email: $scope.newContact.email,
				editing: false
			}
		})
		.then(function(res) {
			console.log('res: ', res);
			$scope.contacts.push(contact);
			$scope.newContact = {};
			return;
		}, function(err) {
			return console.error(err);
		});
	};

	$scope.removeContact = function(contact) {
		var index = $scope.contacts.indexOf(contact);
		$http({
			method: 'DELETE',
			url: `/removecontact/${index}`
		})
		.then(function(res) {
			$scope.contacts.splice(index, 1);
			return;
		}, function(err) {
			return console.error(err);
		});
	};

	$scope.editInfo = function(contact) {
		contact.editing = true;
	};

	$scope.submitEdit = function(contact) {
		contact.editing = false;
		var index = $scope.contacts.indexOf(contact);
		$scope.contacts[index].name = contact.name;
		$scope.contacts[index].phone = contact.phone;
		$scope.contacts[index].email = contact.email;
		$http({
			method: 'PUT',
			url: `/editcontact/${index}`,
			data: 
			{
				name: contact.name,
				phone: contact.phone,
				email: contact.email,
				editing: false
			}
		})
		.then(function(res) {
			return;
		}, function(err) {
			return console.error(err);
		});
	};

});


