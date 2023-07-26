<?php

$productos = json_decode(file_get_contents("php://input"), TRUE);
if (!isset($productos)) {
    exit(json_encode(['message' => '¿No se enviaron productos?']));
}

// var_dump($productos);

if (in_array("", $productos['nombre']) || in_array("", $productos['farmaceuta'])) {
    exit(json_encode(['message' => 'Contenido vacío.']));
}

$stmt = $conn->prepare('INSERT INTO producto(nombre, farmaceuta) VALUES (?, ?)');
$insert_ids = [];
$i = 0;

$array_response = ['message' => '¡Productos registrados exitosamente!'];
while ($i < count($productos['nombre'])) {

    $stmt->bind_param('ss', $productos['nombre'][$i], $productos['farmaceuta'][$i]);
    $stmt->execute();
    
    // array_push($insert_ids, $stmt->insert_id);
    if(!empty($productos['image'])){
        $request = $productos['image'];
        $image_parts = explode(";base64,", $request);      
        $image_type_aux = explode("image/", $image_parts[0]); 
        $image_base64 = base64_decode($image_parts[1]);      
        $fi = new FilesystemIterator("image/", FilesystemIterator::SKIP_DOTS);
        $filenumber = iterator_count($fi);
        
        $file = 'image/' . $filenumber . '.png';      
        if(file_put_contents($file, $image_base64)){
            $last_id = $stmt -> insert_id;
            $stmt2 = $conn->prepare('UPDATE producto SET img_url = ? WHERE id = ?');
            $stmt2->bind_param('si', $filenumber, $last_id);
            $stmt2->execute();
            $response[] = array('sts'=>true,'msg'=>'Successfully uploaded');
            array_push($array_response, $response);
        }
    }
    $i++;
    }
    // var_dump($array_response);
exit (json_encode($array_response));

// var_dump($productos);
?>