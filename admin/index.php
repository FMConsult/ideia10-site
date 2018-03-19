<?php

@session_start();

if(isset($_SESSION['user']))
	header('location: banner.php');
else
    header('location: login.php');

?>