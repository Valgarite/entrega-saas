<?php
// include('../cuentas/auth.php');
include('../conexion_bdd/conexion.php');

$id = isset($_GET['id']) ? $_GET['id'] : '';
$lote = isset($_GET['lote']) ? $_GET['lote'] : '';

$stmt = $conn->prepare(
    'SELECT *
    FROM producto
    JOIN lote_tiene_producto
    ON lote_tiene_producto.idproducto = producto.id
    WHERE producto.id = ? AND lote_tiene_producto.idlote = ?
    '
);

$stmt->bind_param('ii', $id, $lote);
$stmt->execute();
$result = $stmt->get_result();

$num_of_rows = $result->num_rows;

$row = $result->fetch_assoc();

echo "
<table border='1'>
    <thead>
        <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Farmaceuta</td>
            <td>N° de Lote</td>
            <td>Cantidad del lote</td>
            <td>Costo</td>
            <td>F. de Vencimiento</td>
            <td>¿Agotado?</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ", $row["id"] ,"
            </td>
            <td>
                ", $row["nombre"] ,"
            </td>
            <td>
                ", $row["farmaceuta"] ,"
            </td>
            <td>
                ", $row["idlote"] ,"
            </td>
            <td>
                ", $row["cantidad"] ,"
            </td>
            <td>
                ", $row["coste_compra"] ,"
            </td>
            <td>
                ", $row["expiracion"] ,"
            </td>
            <td>
                ", $row["agotado"] ,"
            </td>
        </tr>
    </tbody>
</table>
"

?>