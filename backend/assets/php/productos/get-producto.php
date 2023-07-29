<?php
include('../cuentas/auth.php');
include('../conexion_bdd/conexion.php');

$rq = json_decode(file_get_contents("php://input"), TRUE);

$stmt = $conn->prepare(
    'SELECT *
    FROM producto
    LEFT JOIN lote_tiene_producto
    ON lote_tiene_producto.idproducto = producto.id
    WHERE producto.id = ?
    '
);

$stmt->bind_param('i', $rq['idSearch']);
$stmt->execute();
$result = $stmt->get_result();

$num_of_rows = $result->num_rows;

while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode(["rs1" => $rows]);
?>