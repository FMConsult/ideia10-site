<!doctype html>
<html lang="pt-br" ng-app="idea10">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="../assets/img/logo.png" width="140" height="140">

	<title>Ideia10</title>

	<!-- Bootstrap core CSS -->
	<link href="../assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

	<!-- Custom styles for this template -->
	<link href="../assets/css/carousel.css" rel="stylesheet">
</head>
<body ng-controller="ProjetosController">
	<div class="container">
		<div class="col-md-12">
			<div class="row">
				<div class="offset-md-4 col-md-4">
					<form class="form-signin">
						<div class="text-center">
							<img src="../assets/img/logo.png" alt="" width="65%">
						</div>
						<h1 class="h3 font-weight-normal text-center">Login</h1>
						<label for="inputEmail" class="sr-only">E-mail</label>
						<input type="email" id="inputEmail" class="form-control" ng-model="username" placeholder="E-mail" required="" autofocus="">
						<label for="inputPassword" ng-model="kye.password" class="sr-only">Senha</label>
						<input type="password" id="inputPassword" class="form-control" ng-model="password" placeholder="Senha" required="">
						<div class="checkbox">
							<label>
								<input type="checkbox" value="remember-me"> Lembrar Senha
							</label>
						</div>
						<button class="btn btn-lg btn-verde btn-block" ng-click=() type="submit">Entrar</button>
						<span>{{responseMessage}}</span>
						<br>
						<a href="">Forgot your password?</a> 
						<p class="text-muted text-center"><br>© 2017-2018</p>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script src="../assets/bower_components/jquery/dist/jquery.slim.min.js"></script>
	<script src="../assets/bower_components/popper.js/dist/umd/popper.min.js"></script>
	<script src="../assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="../assets/bower_components/holderjs/holder.min.js"></script>
	<script src="../assets/bower_components/instafeed.js/instafeed.min.js"></script>
	<script src="../assets/bower_components/summernote/dist/summernote.min.js"></script>

	<script src="../assets/bower_components/angular/angular.js"></script>
	<script src="../assets/bower_components/angular-summernote/dist/angular-summernote.min.js"></script>
	
	<script src="../assets/js/app.js"></script>
</body>
</html>