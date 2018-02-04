var app = angular.module('idea10', ['summernote','ui.utils.masks']);

app.filter('NumberFormat', NumberFormat)
app.filter('DateFormat', DateFormat);

function NumberFormat() {
	return filter;

	////////////////////////
	function filter(number, decimals, dec_point, thousands_sep) {
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
				var k = Math.pow(10, prec);
				return '' + (Math.round(n * k) / k)
				.toFixed(prec);
			};
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}
};

function DateFormat() {
	return filter;

	////////////////////////
	function filter(inputFormat,tipo) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		if (isEmpty(inputFormat)) return "" ;
		if(inputFormat.length < 6){
			return "" ;
		}else if(inputFormat == '0000-00-00'){
			return "" ;
		}else if(tipo == 'date-m/y'){;
			if(inputFormat.length == 6)
				return inputFormat.substring(0,2)+'/'+inputFormat.substring(2,6);
			else{
				var arr = inputFormat.split('-');
				return arr[1]+'/'+arr[0];
			}
		}

		inputFormat = inputFormat.replace(/-/g,"/");
		var d = new Date(inputFormat);
		if(tipo == null || tipo == "dateTime"){
			var hora = d.getHours() < 10 ? '0'+d.getHours() : d.getHours() ;
			var minutos = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes() ;
			var segundos = d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds() ;

			return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear()+' '+hora+':'+minutos+':'+segundos;
		}else if(tipo=="time"){
			var hora = d.getHours() < 10 ? '0'+d.getHours() : d.getHours() ;
			var minutos = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes() ;
			var segundos = d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds() ;
			return hora+':'+minutos+':'+segundos;
		}else if(tipo=='time-HH:mm'){
			var hora = d.getHours() < 10 ? '0'+d.getHours() : d.getHours() ;
			var minutos = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes() ;
			return hora+':'+minutos;
		}
		else
			return pad(d.getDate())+'/'+pad(d.getMonth()+1)+'/'+d.getFullYear();
	}
};

app.controller('ProjetosController', function($scope, $http){
	$scope.projeto = {};
	$scope.category = {};
	$scope.index = {};

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
});

app.controller('BannersController', function($scope, $http){
	$scope.banner = {};
	$scope.index = {};

	$scope.saveBanner = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/banner',
			data: JSON.stringify($scope.banner)
		}).then(
			function successCallback(response) {
				$scope.banner = {};
				loadBanners();
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

	function loadBanners() {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/banners'
		}).then(
			function successCallback(response) {
				$scope.banners = response.data;
			},
			function erroCallback(response){

			});
	}

	loadBanners();
});

app.controller('SimulatorController', function($scope, $http) {
	$scope.step = 1;
	$scope.budget = {
		material: {
			dimensions: {
				height: 0,
				width: 0,
				total: 0
			}
		},
		local: {
			dimensions: {
				height: 0,
				width: 0,
				total: 0
			}
		}
	};

	function loadMaterials(){
		$http({
			method: 'GET',
			url: 'assets/data/materials.json'
		}).then(function(response) {
			$scope.materials = response.data;

			angular.forEach($scope.materials, function(_material){
				_material.selected = false;
			});
		});
	}

	function loadImageCategories(){
		$http({
			method: 'GET',
			url: 'assets/data/image-categories.json'
		}).then(function(response) {
			$scope.image_categories = response.data;

			angular.forEach($scope.image_categories, function(_material){
				_material.selected = false;
			});
		});
	}

	$scope.selectMaterial = function(material) {
		// unselect all itens
		angular.forEach($scope.materials, function(_material){
			_material.selected = false;
		});
		// select specified item
		material.selected = true;
		$scope.budget.material = _.extend($scope.budget.material, material);
		// move to next step
		$scope.step = 2;
	}

	$scope.calculateTotalDimension = function(model) {
		$scope.budget[model].dimensions.total = ($scope.budget[model].dimensions.width * $scope.budget[model].dimensions.height);
	}

	$scope.goToSelectImage = function() {
		if(isEmpty($scope.budget.material.dimensions.height)){
			swal('Oops...', 'Você esqueceu de informar a altura do(a) '+ $scope.budget.material.name +'!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.material.dimensions.width)){
			swal('Oops...', 'Você esqueceu de informar a largura do(a) '+ $scope.budget.material.name +'!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.local.dimensions.height)){
			swal('Oops...', 'Você esqueceu de informar a altura da área de instalação!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.local.dimensions.width)){
			swal('Oops...', 'Você esqueceu de informar a largura da área de instalação!', 'warning');
			return false;
		}

		$scope.step = 3;
		loadImageCategories();
	}

	loadMaterials();
});