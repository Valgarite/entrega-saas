<?php
// include('../cuentas/auth.php');
include('../conexion_bdd/conexion.php');


$id = json_decode(file_get_contents("php://input"), TRUE);

$stmt = $conn->prepare("SELECT *
    FROM lote_tiene_producto
    JOIN producto
    ON lote_tiene_producto.idproducto = producto.id
    WHERE lote_tiene_producto.idlote = ?
    ");


$stmt->bind_param('i', $id['searchId']);
$stmt->execute();
$result = $stmt->get_result();

$num_of_rows = $result->num_rows;

while($row = $result->fetch_assoc()){
    $rows[]=$row;
}

// var_dump($rows);

echo json_encode($rows);
?>