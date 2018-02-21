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
</head>
<body ng-controller="BannersController">
	<header>
		<nav class="navbar">
			<h4>IDEA10 ADMIN</h4>
			<ul class="nav nav-tabs justify-content-end " role="tablist">
				<li class="nav-item">
					<a class="nav-link active" href="#">Banners</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="projetos.php">Projetos</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="index.php?#">Sair</a>
				</li>
			</ul>
		</nav>
	</header>

	<div class="container">
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<h4 class="display-4">Cadastro de Banners</h4>	

				<form class="form">
					<div class="row">
						<div class="col-lg-6">
							<div class="form-group">
								<label class="control-label">Nome do Banner</label>
								<input class="form-control" type="text" ng-model="banner.title">
							</div>
						</div>

						<div class="col-lg-5">
							<div class="form-group">
								<label class="control-label">Selecione o Arquivo</label>
								<input class="form-control" type="file">
							</div>
						</div>

						<div class="col-lg-1">
							<div class="form-group">
								<label class="control-label">&nbsp;</label>
								<div class="controls">
									<button class="btn btn-success float-right">Salvar</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>	
		</div>

		<table class="table table-bordered ">
			<thead class="thead-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">IMAGEM</th>
					<th scope="col">DATA</th>
					<th scope="col" alingh="center">AÇÕES</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in banners">
					<th scope="row">{{ item.id }}</th>
					<td>{{ item.Image.name }}</td>
					<td>{{ item.data }}</td>
					<td class="text-center"><button type="button" class="btn btn-danger" ng-click="deleteBanner(item)">
					EXCLUIR
					</button>
					</td>
				</tr>
			</tbody>
		</table>							
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