 <?php
  $succss = "";
   if(isset($_POST['submitForm'] )){


   $usr_email = $_POST['username'];
   $usr_password = $_POST['password'];

   $error = array();
   if(empty($usr_email) or      !filter_var($usr_email,FILTER_SANITIZE_EMAIL)){
    $error[] = "Empty or invalid email address";
    }
    if(empty($usr_password)){
    $error[] = "Enter your password";   
      }
    if(count($error) == 0){
    $con = new MongoClient();
    if($con){
        // Select Database
        $db = $con->lrs;
        // Select Collection
        $Login = $db->Login;
        $qry = array("username" => $usr_email,"password" => md5($usr_password));
        $result = $Login->findOne($qry);
        if($result){
            $success = "You are successully loggedIn";
            // Rest of code up to you....   
        }           
    } else {
        die("Mongo DB not installed");
    }   
}
  }   
 ?>