<?php
include('../cuentas/auth.php');
include('../conexion_bdd/conexion.php');

$request = json_decode(file_get_contents("php://input"), TRUE);
$stmt = $conn->prepare('UPDATE lote_tiene_producto SET agotado = NOT agotado WHERE idlote = ? AND idproducto = ?');
$stmt->bind_param('ii', $request['id_lote'], $request['id_producto']);
$stmt->execute();
?>