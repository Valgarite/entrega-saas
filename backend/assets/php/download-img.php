<?php

$dir = './image/';
$id = isset($_GET['id']) ? $_GET['id'] : '';


if (ctype_digit($id) && $id != '') {

    $filename = $dir . $id . '.png';


    if (file_exists($filename)) {

        header('Content-Type: image/png');
        header('Access-Control-Allow-Origin: *');

        readfile($filename);
    } else {
        http_response_code(404);
        echo 'Archivo no encontrado';
    }
} else {
    http_response_code(400);
    echo 'Id de imagen inválido';
}
?>