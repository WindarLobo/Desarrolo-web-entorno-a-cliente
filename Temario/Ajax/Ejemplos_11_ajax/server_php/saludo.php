<?php

// permitimos petición desde orígenes distintos
include('cors.php');

$resultado = "Bienvenido, " . $_REQUEST['nombre'] . " " . $_REQUEST['apellido'];
echo $resultado;

?>
