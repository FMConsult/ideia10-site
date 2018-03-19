<?php

session_start();

function doPostRequest($url, $params) {
	$curl = curl_init($url);

	$data_string = json_encode($params);

	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Content-Length: ' . strlen($data_string))
	); 

	$response = array(
		'data' => curl_exec($curl),
		'info' => curl_getinfo($curl)
	);

	return $response;
}

$API_URL = 'http://'. $_SERVER['SERVER_NAME'] .':8080/user/login';

$result = doPostRequest($API_URL, $_POST);

if($result['info']['http_code'] == 200) {
	$_SESSION['user'] = $result['data'];
	header("HTTP/1.1 200 OK");
}
else {
	header("HTTP/1.1 404 Not Found");
	echo 'O usuário informado não foi localizado ou não tem permissão para acessar esta área!';
}
?>