<!doctype html>
<html lang="pt-br" ng-app="idea10">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="../assets/img/logo.png">

	<title>Idea10</title>

	<!-- Bootstrap core CSS -->
	<link href="../assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="../assets/bower_components/summernote/dist/summernote.css" rel="stylesheet">
	<link href="../assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- Custom styles for this template -->
	<link href="../assets/css/carousel.css" rel="stylesheet">
</head>
<body ng-controller="LoginController">
	<div class="container">
		<div class="col-md-12">
			<div class="row">
				<div class="offset-md-4 col-md-4">
					<div class="form-signin" ng-submit="doLogin()">
						<div class="text-center">
							<img src="../assets/img/logo.png" alt="" width="65%">
						</div>
						<h1 class="h3 font-weight-normal text-center">Admin Login</h1>
						
						<label for="txtUsername" class="sr-only">Login</label>
						<input id="txtUsername" type="text" class="form-control" 
							placeholder="Login" autofocus=""
							ng-model="user.login">
						
						<label for="txtPassword" class="sr-only">Senha</label>
						<input id="txtPassword" type="password" class="form-control" 
							placeholder="Senha" required=""
							ng-model="user.password">
						
						<button type="button" 
							class="btn btn-lg btn-success btn-block" 
							ng-click="doLogin()">
							Entrar
						</button>
						
						<p class="alert alert-{{ login_response.type }}">
							<i class="fa fa-spin fa-spinner" ng-if="(login_response && login_response.type == 'success')"></i>
							<i class="fa fa-warning" ng-if="(login_response && login_response.type != 'success')"></i>
							{{ login_response.message }}
						</p>
						
						<br>
						
						<p class="text-muted text-center"><br>© 2017-2018</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script src="../assets/js/extras.js"></script>
	
	<script src="../assets/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="../assets/bower_components/sweetalert2/dist/sweetalert2.all.min.js"></script>
	<script src="../assets/bower_components/popper.js/dist/umd/popper.min.js"></script>
	<script src="../assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="../assets/bower_components/holderjs/holder.min.js"></script>
	<script src="../assets/bower_components/underscore/underscore-min.js"></script>
	<script src="../assets/bower_components/fancybox/dist/jquery.fancybox.min.js"></script>

	<script src="../assets/bower_components/angular/angular.js"></script>
	<script src="../assets/bower_components/angular-summernote/dist/angular-summernote.min.js"></script>
	<script src="../assets/bower_components/angular-input-masks/angular-input-masks-standalone.min.js"></script>
	<script src="../assets/bower_components/angular-bootstrap/ui-bootstrap.min.js"></script>
	<script src="../assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
	
	<script src="../assets/js/app.js"></script>
</body>
</html>'