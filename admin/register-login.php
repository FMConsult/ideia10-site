<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

function doPostRequest($url, $params=null) {
	$data_string = json_encode($params);
	
	$options = array(
		CURLOPT_URL 			=> $url,
		CURLOPT_RETURNTRANSFER 	=> true,
		CURLOPT_HEADER 			=> false,
		CURLOPT_POSTFIELDS 		=> $data_string,
		CURLOPT_FOLLOWLOCATION 	=> true,
		CURLOPT_ENCODING 		=> "",
		CURLOPT_AUTOREFERER 	=> true,
		CURLOPT_CONNECTTIMEOUT 	=> 120,
		CURLOPT_TIMEOUT 		=> 120,
		CURLOPT_MAXREDIRS 		=> 10,
		CURLOPT_HTTPHEADER 		=> array('Content-Type: application/json', 'Content-Length: '.strlen($data_string))
	);

	$curl = curl_init();
	curl_setopt_array($curl, $options);
	$response = curl_exec($curl); 
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

	return array('response' => $response, 'http_code' => htmlspecialchars($http_code), 'errors' => curl_error($curl));
}

$API_URL = 'http://186.226.56.5:1111/user/login';

$result = doPostRequest($API_URL, $_POST);

if($result['http_code'] == 200) {
	$_SESSION['user'] = json_decode($result['response'], true);
	header("HTTP/1.1 200 OK");
}
else {
	header("HTTP/1.1 404 Not Found");
	echo 'O usuário informado não foi localizado ou não tem permissão para acessar esta área!';
	echo PHP_EOL . '\n<br>' . json_encode($result['errors']);
}
?>