<?php
// include('../cuentas/auth.php');
include('../conexion_bdd/conexion.php');

$id = json_decode(file_get_contents("php://input"), TRUE);

$stmt = $conn->prepare("SELECT user
FROM lote
JOIN personal
ON lote.idpersonal = personal.id
WHERE lote.id = ?");

$stmt->bind_param('i', $id['searchId']);
$stmt->execute();
$result = $stmt->get_result();

$num_of_rows = $result->num_rows;

$row = $result->fetch_assoc();

// var_dump($row);

echo json_encode(["message" => $row['user']]);
?>