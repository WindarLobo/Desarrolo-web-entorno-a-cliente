<?php

// permitimos petición desde orígenes distintos
include('cors.php');

// Cabecera para indicar que vamos a enviar datos JSON, de tal modo que no se realice caché de los mismos.
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: mon, 26 Jul 1997 05:00:00 GMT');

$cadena = '{"nombre":"Juan", "edad":25}';
echo $cadena;
?>
