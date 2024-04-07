 <?php
            // Encabezado que indica que el contenido es devuelto en JSON 
            header("Content-Type: application/json; charset=UTF-8");

            //se crea la variable objeto para recibir la información en formato JSON
            $objeto = json_decode($_GET["objeto"],false);
        

            // Se crea la conexión
            $conexion = new mysqli("localhost", "root", "", "pokemon");

            //Comprobamos la conexión
            if ($conexion ->connect_error){
                die("Error en la conexion: ".$conexion->connect_error);
            }else{
                //Conexión correcta
                
                //Creamos la consulta SQL
                $sql = "SELECT id, nombre, tipo, generacion FROM $objeto->tabla WHERE tipo = '$objeto->valor'"; //Importante escapar con comillas simples para poder igualar el valor del tipo en base de datos con el valor que le pasa el usuario
                
                //Se ejecuta la consulta
                $resultado = $conexion->query($sql);

                // Se crea el array de lo que se obtiene de la tabla
                $salida = array();

                // Se recuperan todas las filas de la tabla
                $salida = $resultado->fetch_all(MYSQLI_ASSOC);
            
                
                echo json_encode($salida);// Convierte en formato JSON los datos de la tabla
            }
            //Se cierra conexión
            $conexion->close();

    ?>