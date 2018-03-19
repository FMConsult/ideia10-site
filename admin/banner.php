<?php include('restrict.php'); ?>
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
<body class="admin" ng-controller="BannersController">
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
								<input class="form-control" type="text" ng-model="banner.name">
							</div>
						</div>

						<div class="col-lg-5">
							<div class="form-group">
								<label class="control-label">Selecione o Arquivo</label>
								<input class="form-control" type="file" data-model="attachment">
							</div>
						</div>

						<div class="col-lg-1">
							<div class="form-group">
								<label class="control-label">&nbsp;</label>
								<div class="controls">
									<button class="btn btn-success float-right"
										ng-click="saveBanner()">
										Salvar
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="row" ng-if="(banner.attachment)">
						<div class="col-lg-12 text-center">
							<img class="img-fluid img-thumbnail" src="{{ banner.attachment.path }}">
						</div>
					</div>
				</form>
			</div>	
		</div>

		<table class="table table-bordered ">
			<thead class="thead-light">
				<tr>
					<th class="text-middle" scope="col" width="200">IMAGEM</th>
					<th class="text-middle" scope="col">NOME</th>
					<th class="text-middle" scope="col" width="60">AÇÕES</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in banners">
					<td class="text-middle">
						<img class="img-fluid img-thumbnail" src="{{ baseUrlApi() + item.file.file_path }}">
					</td>
					<td class="text-middle">{{ item.name }}</td>
					<td class="text-middle text-center">
						<button type="button" class="btn btn-danger" ng-click="deleteBanner(item)">
							Excluir
						</button>
					</td>
				</tr>
			</tbody>
		</table>							
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
</html>