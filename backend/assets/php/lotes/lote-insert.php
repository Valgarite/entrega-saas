<?php
// var_dump($lotes);
$lotes = json_decode(file_get_contents("php://input"), TRUE);
if (!isset($lotes)) {
    exit('¿No se enviaron productos?');
}

if (
    $lotes['id'] == "" ||
    in_array("", $lotes['producto']) || count($lotes['producto'])==0 ||
    in_array("", $lotes['cantidad']) || count($lotes['cantidad'])==0 ||
    in_array("", $lotes['precio']) || count($lotes['precio'])==0 ||
    in_array("", $lotes['fecha']) || count($lotes['fecha'])==0
) {
    exit(json_encode(['message' =>'Hay contenido vacío en el formulario.', 'result' => 'fail']));
}
$tiempo_ingreso = date('Y-m-d H:i:s',time());

$id_personal = $_SESSION['id'];

$lote_id = $lotes['id'];

$verificacion = $conn->prepare("SELECT id FROM lote WHERE id = ?");
$verificacion->bind_param('i', $lote_id);
$verificacion->execute();
$res_vrfcn = $verificacion->get_result();

if (mysqli_num_rows($res_vrfcn) > 0) {
    exit(json_encode(['message' =>'Este número de lote ya ha sido registrado', 'result' => 'fail']));
}

// var_dump($lotes);

$stmt1 = $conn->prepare('INSERT INTO lote VALUES (?, ?, ?)');
$stmt1->bind_param('sss', $lote_id, $tiempo_ingreso, $id_personal);
$stmt1->execute();

$stmt2 = $conn->prepare('INSERT INTO lote_tiene_producto VALUES (?, ?, ?, ?, ?, ?)');
$i=0;
while ($i < count($lotes['producto'])) {
    $bool = 0;
    $stmt2->bind_param('iidsdi', $lote_id, $lotes['producto'][$i], $lotes['cantidad'][$i], $lotes['fecha'][$i], $lotes['precio'][$i], $bool);
    $stmt2->execute();
    $i++;
}
    
$conn->close();

exit(json_encode(['message' => '¡Lote registrado exitosamente!', 'result' => 'success']))
// $insert_ids = [];
// $i = 0;
// while ($i < count($lotes['producto'])) {
//     // Bind parameters (s = string, i = int, b = blob, etc), in our case the username is a string so we use "s"
//     // array_push($insert_ids, $stmt->insert_id);
//     $i++;
// }
?>