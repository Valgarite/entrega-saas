<?php
include('../conexion_bdd/conexion.php');

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);

//añadir verificación de rol del creador después
if(!isset($data['username'], $data['password'], $data['fecha_nac'])){
    exit(json_encode(['message' => 'Datos vacíos']));
}
// prepare and bind
$stmt = $conn->prepare("INSERT INTO personal (user, pass, nacimiento) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $password, $fecha_nac);

$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$fecha_nac = $data['fecha_nac'];
$stmt->execute();

echo json_encode(['message' => 'success']);

$stmt->close();
$conn->close();
?>