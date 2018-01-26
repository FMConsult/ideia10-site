<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="../assets/img/logo.png">

	<title>Idea10</title>

	<!-- Bootstrap core CSS -->
	<link href="../assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- Custom styles for this template -->
</head>
<body>
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
		
		
	</div>	

	<div class="container">
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<h4 class="display-4">Cadastro de Projetos</h4>	

				<form class="form">
					<div class="row">
						<div class="col-lg-6">
							<div class="form-group">
								<label class="control-label">Titulo</label>
								<input class="form-control" type="text">
							</div>
						</div>

						<div class="col-lg-5">
							<div class="form-group">
								<label class="control-label">Categoria</label>
								<select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
									<option selected>Choose...</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
						</div>

						<div class="col-lg-1">
							<div class="form-group">
								<label class="control-label">&nbsp;</label>
								<div class="controls">
									<button class="btn btn-primary float-right">Salvar</button>
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
					<th scope="col">DATA</th>
					<th scope="col">TITULO</th>
					<th scope="col">CATEGORIA</th>
					<th scope="col">AÇÕES</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>IMAGEM</td>
					<td>DATA</td>
					<td class="text-center"><button type="button" class="btn btn-danger">EXCLUIR</button></td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>IMAGEM</td>
					<td>DATA</td>
					<td class="text-center"><button type="button" class="btn btn-danger">EXCLUIR</button></td>
				<tr>
					<th scope="row">2</th>
					<td>IMAGEM</td>
					<td>DATA</td>
					<td class="text-center"><button type="button" class="btn btn-danger">EXCLUIR</button></td>
				</tr>
			</tbody>
		</table>							


		</table>
		</div>	
	</div>



	
	<script src="../assets/bower_components/jquery/dist/jquery.slim.min.js"></script>
	<script src="../assets/bower_components/popper.js/dist/umd/popper.min.js"></script>
	<script src="../assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="../assets/bower_components/holderjs/holder.min.js"></script>
	<script src="../assets/bower_components/instafeed/instafeed.min.js"></script>
</body>
</html>