var idea10App = angular.module('idea10', ['summernote']);

idea10App.controller('ProjetosController', function($scope, $http){
	$scope.projeto = {};
	$scope.category = {};
idea10App.controller('BannerController', function($scope, $http){
	$scope.banner = {};

	$scope.saveBanner = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/banner',
			data: JSON.stringify($scope.banner)
		}).then(
			function successCallback(response) {
				$scope.banner = {};
				loadProjects();
			},
			function erroCallback(response){

			});
	}
$scope.deleteBanner = function(item) {
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/banner/'+ item.id
		}).then(
			function successCallback(response) {
				loadBanners();
			},
			function erroCallback(response){

			});
	}

	$scope.saveProjeto = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/project',
			data: JSON.stringify($scope.projeto)
		}).then(
			function successCallback(response) {
				$scope.projeto = {};
				loadProjects();
			},
			function erroCallback(response){

			});
	}

	$scope.deleteProjeto = function(item) {
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/project/'+ item.id
		}).then(
			function successCallback(response) {
				loadProjects();
			},
			function erroCallback(response){

			});
	}

	$scope.saveCategory = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/category',
			data: JSON.stringify($scope.category)
		}).then(
			function successCallback(response) {
				$('#categoryModal').modal('hide');
				loadCategories();
				$scope.category= {};
			},
			function erroCallback(response){

			});
	}

	function loadProjects() {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/projects'
		}).then(
			function successCallback(response) {
				$scope.projects = response.data;
			},
			function erroCallback(response){

			});
	}

	function loadCategories() {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/categories'
		}).then(
			function successCallback(response) {
				$scope.categories = response.data;
			},
			function erroCallback(response){

			});
	}

	loadProjects();
	loadCategories();
	loadBanners();

});