<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: text/html; charset=utf-8');

include('../conexion_bdd/conexion.php');

$response =array();

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);
// var_dump($data);


if ( !isset($data['username'], $data['password']) ) {
    exit(json_encode(['message' => "Llene los campos", "status"=>"fail"]));
}

if ($stmt = $conn->prepare('SELECT id, pass FROM personal WHERE user = ?')) {
	
	$stmt->bind_param('s', $data['username']);
	$stmt->execute();

	$stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $password);
        $stmt->fetch();

        if (password_verify($data['password'], $password)) {

            session_start();
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $data['username'];
            $_SESSION['id'] = $id;
            $response = ['message'=>'Bienvenido ' . $_SESSION['name'] . '!', 'session_id' => session_id(), 'status' => 'success', 'user' => $_SESSION['name']];
        } else {
            // Incorrect password
            $response = ['message' => '¡Datos incorrectos!', 'status' => 'fail'];
        }
    } else {
        // Incorrect username
        $response = ['message' => '¡Datos incorrectos!', 'status' => 'fail'];
    }
    
    echo json_encode($response);

	$stmt->close();
}
?>