<?php
    include('../cuentas/auth.php');
    include('../conexion_bdd/conexion.php');

    $query = "SELECT * FROM lote ORDER BY ingreso DESC";
    
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));

    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    echo json_encode($rows);
?>