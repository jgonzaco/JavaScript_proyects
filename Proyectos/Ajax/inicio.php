<?php
            // Encabezado que indica que el contenido es devuelto en JSON 
            header("Content-Type: application/json; charset=UTF-8");

            //Crear la conexión
            $conexion = new mysqli("localhost", "root", "", "pokemon");

            //Comprobamos la conexión
            if ($conexion ->connect_error){
                die("Error en la conexion: ".$conexion->connect_error);
            }else{
                //Conexión correcta
                
                //Creamos la consulta SQL
                $sql = "SELECT id, nombre, tipo, generacion FROM pk";
                
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