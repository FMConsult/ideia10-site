var app = angular.module('idea10', ['summernote','ui.utils.masks','ui.bootstrap'], function($httpProvider){
	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	var param = function(obj) {
		var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

		for(name in obj) {
			value = obj[name];

			if(value instanceof Array) {
				for(i=0; i < value.length; ++i) {
					subValue = value[i];
					fullSubName = name + '[' + i + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if(value instanceof Object) {
				for(subName in value) {
					subValue = value[subName];
					fullSubName = name + '[' + subName + ']';
					innerObj = {};
					innerObj[fullSubName] = subValue;
					query += param(innerObj) + '&';
				}
			}
			else if(value !== undefined && value !== null)
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
		}

		return query.length ? query.substr(0, query.length - 1) : query;
	};

	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});

app.filter('NumberFormat', NumberFormat);
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

app.controller('LoginController', function($scope, $http){
	$scope.doLogin = function() {
		if(!isEmpty($scope.user) && (!isEmpty($scope.user.login) && !isEmpty($scope.user.password))) {
			$http({
				method: 'POST',
				url: "register-login.php",
				data: angular.copy($scope.user)
			}).then(
				function successCallback(response) {
					if(response.status === 200)
						window.location.href = "banner.php";
				},
				function errorCallback(response){
					swal({
						title: 'Desculpe!', 
						text: response.data, 
						type: (response.status == 404) ? 'warning' : 'error'
					});
				}
			);
		}
		else
			swal('Atenção!', 'Os campos login e senha não foram preenchidos corretamente!', 'warning');
	}
});

app.controller('ProjetosController', function($scope, $http){
	$scope.projeto = {};
	$scope.category = {};
	$scope.index = {};

	$scope.saveProjeto = function() {
		$http({
			method: 'POST',
			url: baseUrlApi()+ 'project',
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
			url: baseUrlApi()+ 'project/'+ item.id
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
			url: baseUrlApi()+ 'category',
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

	$scope.loadProjects = function() {
		$http({
			method: 'GET',
			url: baseUrlApi()+ 'projects'
		}).then(
			function successCallback(response) {
				$scope.projects = response.data;
			},
			function erroCallback(response){

			});
	}

	$scope.loadCategories = function() {
		$http({
			method: 'GET',
			url: baseUrlApi()+ 'categories'
		}).then(
			function successCallback(response) {
				$scope.categories = response.data;
			},
			function erroCallback(response){

			});
	}

	$scope.loadInstagramFeed = function() {
		$scope.instagram_feed = {};
		$http({
			method: 'GET',
			url: baseUrlApi()+ 'external/instagram/feed'
		}).then(
			function successCallback(response) {
				$scope.instagram_feed = response.data;
			},
			function erroCallback(response){
				$scope.instagram_feed = null;
			});
	}

	$scope.loadInstagramFeed();
});

app.controller('BannersController', function($scope, $http){
	$scope.banner = {};
	$scope.index = {};

	$scope.baseUrlApi = function() {
		return baseUrlApi();
	}

	$scope.saveBanner = function() {
		$http({
			method: 'POST',
			url: baseUrlApi()+ 'banner',
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
			url: baseUrlApi()+ 'banner/'+ item.id
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
			url: baseUrlApi()+ 'banners'
		}).then(
			function successCallback(response) {
				$scope.banners = response.data;
			},
			function erroCallback(response){

			});
	}

	setTimeout(function(){
		$("[type='file']").on('change', function(){
			var file = this.files[0]; // get selected file
			var reader = new FileReader();

			$scope.fileModel = $(this).data().model; // get attribute model name
			
			if(isEmpty($scope.banner))
				$scope.banner = {};

			if(isEmpty($scope.banner[$scope.fileModel])) // validate if is empty
				$scope.banner[$scope.fileModel] = {}; // create as object

			// detect file type
			var type = file.type.substring(file.type.indexOf('/')+1, file.type.length);
			if(isEmpty(type))
				type = file.name.substring((file.name.lastIndexOf('.')+1), file.name.length);

			$scope.banner[$scope.fileModel].name = file.name; // file name
			$scope.banner[$scope.fileModel].type = type; // file type
			$scope.banner[$scope.fileModel].size = (file.size / 1024); // file size

			// adjust file size string name
			if($scope.banner[$scope.fileModel].size < 1024)
				$scope.banner[$scope.fileModel].size = numberFormat($scope.banner[$scope.fileModel].size, 2, ',', '.') + ' KB';
			else if($scope.banner[$scope.fileModel].size > 1024)
				$scope.banner[$scope.fileModel].size = numberFormat($scope.banner[$scope.fileModel].size, 2, ',', '.') + ' MB';

			// after loading file...
			reader.onload = function (e) {
				$scope.banner[$scope.fileModel].path = e.target.result; // get base64 string of file
				$scope.banner[$scope.fileModel].updated = true;
				setTimeout(function(){
					$scope.$apply(); // apply changes in the screen
				},1);
			}

			if(!isEmpty(file))
				reader.readAsDataURL(file);
		});
	}, 10);

	loadBanners();
});

app.controller('SimulatorController', function($scope, $http) {
	function resetBudget() {
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
			},
			instalation: {
				dimensions: {
					height: 0,
					width: 0,
					total: 0
				}
			}
		};
		$scope.resetGettyImagesAPISearch();
	}

	function loadMaterials(){
		$http({
			method: 'GET',
			url: baseUrlApi() + 'materials'
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

	$scope.resetGettyImagesAPISearch = function(){
		$scope.budget.category = null;
		$scope.budget.image = null;
		$scope.getty_images = {
			search_options: {
				current_count: 0,
				show: false,
				number_of_people: [
					{
						label: 'Ninguém',
						value: 'none',
						selected: false
					},{
						label: 'Uma pessoa',
						value: 'one',
						selected: false
					},{
						label: 'Duas Pessoas',
						value: 'two',
						selected: false
					},{
						label: 'Grupo de Pessoas',
						value: 'group',
						selected: false
					}
				],
				orientations: [
					{
						label: 'Horizontal',
						value: 'Horizontal',
						selected: false
					},{
						label: 'Vertical',
						value: 'Vertical',
						selected: false
					},{
						label: 'Quadrado',
						value: 'Square',
						selected: false
					},{
						label: 'Horizontal panorâmica',
						value: 'PanoramicHorizontal',
						selected: false
					},{
						label: 'Vertical panorâmica',
						value: 'PanoramicVertical',
						selected: false
					}
				],
				compositions: [
					{
						label: 'Abstrato',
						value: 'abstract',
						selected: false
					},{
						label: 'Espontânea',
						value: 'candid',
						selected: false
					},{
						label: 'Primeiro plano',
						value: 'close_up',
						selected: false
					},{
						label: 'Espaço para texto',
						value: 'copy_space',
						selected: false
					},{
						label: 'Figura para recortar',
						value: 'cut_out',
						selected: false
					},{
						label: 'Moldura completa',
						value: 'full_frame',
						selected: false
					},{
						label: 'Corpo inteiro',
						value: 'full_length',
						selected: false
					},{
						label: 'Fotografia da cabeça',
						value: 'headshot',
						selected: false
					},{
						label: 'Olhando para a camera',
						value: 'looking_at_camera',
						selected: false
					},{
						label: 'Macro',
						value: 'macro',
						selected: false
					},{
						label: 'Retrato',
						value: 'portrait',
						selected: false
					},{
						label: 'Dispersa',
						value: 'sparse',
						selected: false
					},{
						label: 'Natureza Morta',
						value: 'still_life',
						selected: false
					},{
						label: 'Fotografia de três quartos',
						value: 'three_quarter_length',
						selected: false
					},{
						label: 'Da cintura para cima',
						value: 'waist_up',
						selected: false
					}
				],
				forward: {
					filters: {},
					phrase: '',
					page: 0
				},
				actual: {
					filters: {},
					phrase: '',
					page: 0
				}
			},
			search_data: {}
		};
	}

	$scope.loadImagesByGettyImagesAPI = function(){
		$scope.getty_images.search_options.scrollYOffset = $('#getty-images-container').scrollTop();
		$scope.getty_images.search_options.is_loading = true;

		var gettyimages_api_url = 'https://api.gettyimages.com/v3/search/images';
			gettyimages_api_url += '?phrase='+ $scope.getty_images.search_options.actual.phrase;
			gettyimages_api_url += '&page_size=24';
		
		$scope.getty_images.search_options.actual.filters = {
			number_of_people: _.map(_.where($scope.getty_images.search_options.number_of_people, {selected: true}), function(obj){return obj.value;}).join(','),
			orientations: _.map(_.where($scope.getty_images.search_options.orientations, {selected: true}), function(obj){return obj.value;}).join(','),
			compositions: _.map(_.where($scope.getty_images.search_options.compositions, {selected: true}), function(obj){return obj.value;}).join(',')
		};

		if($scope.getty_images.search_options.actual.filters.number_of_people.length > 0 || $scope.getty_images.search_options.actual.filters.orientations.length > 0 || $scope.getty_images.search_options.actual.filters.compositions.length > 0)
			gettyimages_api_url += '&' + $.param(_.omit($scope.getty_images.search_options.actual.filters, function(obj, index){if(obj.length == 0){return index;}}));

		if(!_.isEqual($scope.getty_images.search_options.forward, $scope.getty_images.search_options.actual))
			$scope.getty_images.search_options.actual.page = 1;
		else if($scope.getty_images.search_data.result_count > 24)
			$scope.getty_images.search_options.actual.page++;
		
		gettyimages_api_url += '&page='+ $scope.getty_images.search_options.actual.page;

		var request_options = {
			method: 'GET',
			headers: {
				'Api-Key': 'ptpxjnvsct7mbcyy8ru75rz6'
			},
			url: gettyimages_api_url
		};

		$http(request_options).then(function(response) {
			angular.forEach(response.data.images, function(image) {
				if(image.max_dimensions.height > image.max_dimensions.width)
					image.orientation = 'vertical';
				else if(image.max_dimensions.width > image.max_dimensions.height)
					image.orientation = 'horizontal';
			});

			if($scope.getty_images.search_options.actual.page == 1) {
				$scope.getty_images.search_options.current_count = response.data.images.length;
				$scope.getty_images.search_data = response.data;
			}
			else {
				$scope.getty_images.search_options.current_count += response.data.images.length;
				$scope.getty_images.search_data.images = _.union($scope.getty_images.search_data.images, response.data.images);
				setTimeout(function() {
					$('#getty-images-container').animate({
						scrollTop: ($scope.getty_images.search_options.scrollYOffset + 100)
					}, 1000);
				}, 10);
			}

			$scope.getty_images.search_options.forward = angular.copy($scope.getty_images.search_options.actual);
			$scope.getty_images.search_options.is_loading = false;
		});
	}

	$scope.getImageGridColumns = function(image) {
		var columns = ($scope.getty_images.search_options.show) ? '3' : '2';
		if(image.orientation == 'horizontal')
			columns = ($scope.getty_images.search_options.show) ? '4' : '3';
		return columns;
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

	$scope.goToSelectImage = function(){
		if(isEmpty($scope.budget.material.dimensions.height)){
			swal('Oops...', 'Você esqueceu de informar a altura do(a) '+ $scope.budget.material.name +'!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.material.dimensions.width)){
			swal('Oops...', 'Você esqueceu de informar a largura do(a) '+ $scope.budget.material.name +'!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.local.dimensions.height)){
			swal('Oops...', 'Você esqueceu de informar a altura da área de impressão!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.local.dimensions.width)){
			swal('Oops...', 'Você esqueceu de informar a largura da área de impressão!', 'warning');
			return false;
		}
		if(isEmpty($scope.budget.instalation.dimensions.height)){
			swal('Oops...', 'Você esqueceu de informar a altura da área de instalação!', 'warning');
			return false;
		}

		if(isEmpty($scope.budget.instalation.dimensions.width)){
			swal('Oops...', 'Você esqueceu de informar a largura da área de instalação!', 'warning');
			return false;
		}
		
		var a = $scope.budget.local.dimensions.width;
		var b = $scope.budget.local.dimensions.height;
		var dimensao_impressao = (a * b);

		var c = $scope.budget.instalation.dimensions.width;
		var d = $scope.budget.instalation.dimensions.height;
		var dimensao_instalacao = (c * d);

		if(isEmpty(dimensao_instalacao < dimensao_impressao)){
			swal('Oops...', 'o tamanho da área de impressão deve ser menor que o tamanho da area de instalação!', 'warning');
			return false;
		} else {
		$scope.step = 3;
		}
	}

	$scope.selectImage = function(image){
		// clear selected image in range
		if(!isEmpty($scope.budget.category)) {
			angular.forEach($scope.budget.category.images, function(_image){
				_image.selected = false;
			});
		}
		else {
			angular.forEach($scope.getty_images.search_data.images, function(_image){
				_image.selected = false;
			});
		}

		// select specified item
		image.selected = true;
		$scope.budget.image = image;

		if(!isEmpty($scope.budget.category))
			$scope.budget.image.origin = 'default_database';
		else {
			$scope.budget.image.origin = 'getty_images';
			$scope.budget.image.path = image.display_sizes[0].uri;
			$scope.budget.image.code = image.id;
		}

		// move to next step
		$scope.step = 4;
	}

	$scope.goBack = function(step_back){
		$scope.step = step_back;
	}

	$scope.getEnderecoByCEP = function(){
		if(!isEmpty($scope.budget.customer.postal_code) && $scope.budget.customer.postal_code.length > 0) {
			swal({
				title: "Aguarde!",
				text: "Buscando informações...",
				showConfirmButton: false
			});

			$http({
				method: 'GET',
				url: 'https://viacep.com.br/ws/'+ $scope.budget.customer.postal_code +'/json/'
			}).then(
				function successCallback(response) {
					$scope.budget.customer.address = response.data.logradouro;
					$scope.budget.customer.district = response.data.bairro;
					$scope.budget.customer.city = response.data.localidade;
					$scope.budget.customer.state = response.data.uf;
					$('[ng-model="budget.customer.number"]').focus()
					swal.close();
				},
				function errorCallback(response){
					swal.close();
				}
			);
		}
	}

	$scope.confirmBudgetRequest = function(){
		$scope.budget.print_value = ($scope.budget.material.cost * $scope.budget.local.dimensions.total);
		
		swal({
			title: "Aguarde!",
			text: "Enviando informações...",
			showConfirmButton: false
		});

		$http({
			method: 'POST',
			url: baseUrlApi() + 'budget',
			data: JSON.stringify($scope.budget)
		}).then(function(response) {
			resetBudget();
			swal.close();
			swal({
				title: "Obrigado!",
				text: "Agradecemos o seu interesse em nossos produtos, em breve um de nossos consultores entrará em contato para prosseguir com seu pedido.",
				type: "success"
			});
		}, function(response){
			console.log(response);
			swal.close();
			swal({
				title: "Oops..!",
				text: response.data,
				type: "error"
			});
		});
	}

	resetBudget();
	loadMaterials();
	loadImageCategories();
});

app.controller('ContactController', function($scope, $http){
	$scope.sendContactEmail = function() {
		$('#btn-send-email').button('toggle');
		$scope.loading = true;
		if(!isEmpty($scope.contact) && (!isEmpty($scope.contact.full_name) && !isEmpty($scope.contact.phone_number) && !isEmpty($scope.contact.email))) {
			$http({
				method: 'POST',
				url: baseUrlApi() + 'contact/send/email',
				data: JSON.stringify($scope.contact)
			}).then(
				function successCallback(response) {
					$scope.contact = null;
					swal({
						title: 'Obrigado!', 
						text: response.data, 
						type: 'success'
					});
					$('#btn-send-email').button('toggle');
					$scope.loading = false;
				},
				function errorCallback(response){
					swal({
						title: 'Desculpe!', 
						text: response.data, 
						type: (response.status == 404) ? 'warning' : 'error'
					});
					$('#btn-send-email').button('toggle');
					$scope.loading = false;
				}
			);
		}
		else {
			swal('Atenção!', 'Os campos Nome Completo, Telefone e E-mail não foram preenchidos corretamente!', 'warning');
			$scope.loading = false;
		}
	}
});