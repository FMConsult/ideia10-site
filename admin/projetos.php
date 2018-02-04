<!doctype html>
<html lang="en" ng-app="idea10">
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
<body ng-controller="ProjetosController">
	<header>
		<nav class="navbar">
			<h4>IDEA10 ADMIN</h4>
			<ul class="nav nav-tabs justify-content-end " role="tablist">
				<li class="nav-item">
					<a class="nav-link" href="banner.php">Banners</a>
				</li>
				<li class="nav-item">
					<a class="nav-link active" href="#">Projetos</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Sair</a>
				</li>
			</ul>
		</nav>
	</header>

	<div class="container">
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<h4 class="display-4">Cadastro de Projetos</h4>	

				<form class="form">
					<div class="row">
						<div class="col-lg-8">
							<div class="form-group">
								<label class="control-label">Titulo</label>
								<input class="form-control" type="text" ng-model="projeto.title">
							</div>
						</div>

						<div class="col-lg-4">
							<div class="form-group">
								<label class="control-label">Categoria</label>
								<div class="input-group">
									<select class="form-control" 
										ng-options="category as category.name for category in categories track by category.id" 
										ng-model="projeto.category"></select>
									<div class="input-group-append">
										<button class="btn btn-success" type="button" data-toggle="modal" data-target="#categoryModal">
											<i class="fa fa-plus-circle"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-lg-12">
							<summernote height="300" ng-model="projeto.text"></summernote>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<label class="control-label">&nbsp;</label>
								<div class="controls">
									<button class="btn btn-success float-right" ng-click="saveProjeto()">
										Salvar
									</button>
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
					<th scope="col">TITULO</th>
					<th scope="col">CATEGORIA</th>
					<th scope="col">AÇÕES</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in projects">
					<th scope="row">{{ item.id }}</th>
					<td>{{ item.title }}</td>
					<td>{{ item.category.name }}</td>
					<td class="text-center">
						<button type="button" class="btn btn-danger btn-sm"
							ng-click="deleteProjeto(item)">
							EXCLUIR
						</button>
					</td>
				</tr>
				
			</tbody>
		</table>							
		</div>	
	</div>

	<!-- Modal -->
	<div class="modal" tabindex="-1" role="dialog" id="categoryModal">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title">Cadastro de Categorias</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form class="form">
	        	<div class="row">
	        		<div class="col-lg-12">
	        			<div class="form-group">
	        				<label class="control-label">Nome da Categoria:</label>
	        				<input class="form-control" ng-model="category.name">
	        			</div>
	        		</div>
	        	</div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
	        <button type="button" class="btn btn-success" ng-click="saveCategory()">Adicionar</button>
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