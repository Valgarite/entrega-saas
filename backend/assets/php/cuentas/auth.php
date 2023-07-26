<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');

$sent_id=json_decode(file_get_contents("php://input"), TRUE);
// var_dump($sent_id);
session_id($sent_id['session']);
session_start();

if(@!$_SESSION['loggedin'] == TRUE){
    exit(json_encode(['Session'=>'Por favor, inicie sesión.']));
}
// var_dump($_SESSION)
?>