document.addEventListener("DOMContentLoaded", function() { //Ejecutamos desde el principio la llamada a la api
     
            fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0") //Llamada a la api de la primera generacion
            .then(response => response.json())//Recuperamos la respuesta de la api y la transformamos en un json
            .then(data => {// Resuelve la promesa con los datos recuperados de la API
                let promises = data.results.map(pokemon => //En este bloque recuperamos la url por cada uno de los pokemons con el map y generamos una nueva promesa
                    fetch(pokemon.url)// Realiza solicitud a la url para la obtención de datos 
                    .then(response => response.json())// Se parsea respuesta a JSON
                );

                Promise.all(promises) //Establecemos que las dos promesas anteriores se tienen que cumplir antes de que se pinte por pantalla
                .then(pokemons => { //Pokemons es la resolucion de la primera promesa donde recuperamos los pokemons
                    let tabla = document.getElementById('tabla');
                    let tableBodyAntiguo = document.getElementById('tableBody');
                    let tableBodyNuevo = document.createElement('tbody');
                    tableBodyNuevo.id = 'tableBody';
                    let text = "";
                    pokemons.forEach((pokemon, index) => { //Recorro todos los pokemons hasta el 151 y creo la tabla
                        let fila = document.createElement('tr');//Creación de tr
                        let columna1 = document.createElement('td');//creación de td
                        columna1.innerHTML =index+1;// Enumero la tabla
                        fila.appendChild(columna1);// Unión de columna a la fila
                        let columna2 = document.createElement('td');// creación de td
                        columna2.innerHTML = pokemon.name.toUpperCase();// Introudcción de datos en Mayúsculas
                        fila.appendChild(columna2);// Unión de columna a la fila
                    
                        pokemon.types.forEach((type,index) => { //Recorro el array types de cada uno de los pokemons
                            if(pokemon.types.length-1 === index){
                                text += traductor(type.type.name);   // Al ser un objeto se accede mediante el punto para poder acceder al tipo de Pokémon dentro de la API. 
                                let columna3 = document.createElement('td');
                                columna3.innerHTML = text;
                                fila.appendChild(columna3);
                                text = ""
                                }else{
                                  text += traductor(type.type.name) + ", "     // Traduzco las palabras.            
                                }
                        });
                        tableBodyNuevo.appendChild(fila);
                    });
                    document.getElementById('titulo').innerHTML = "Pokedex primera generación:"// Cambio el contenido del ID 'titulo' por "Pokedex primera generación:"
                    document.getElementById('numero').innerHTML = "Nº Pokedex"// Cambio el contenido del ID 'numero' por "Nº Pokedex"
                    document.getElementById('nombre').innerHTML = "Pokemon"// Cambio el contenido del ID 'nombre' por "Pokemon"
                    document.getElementById('tipo').innerHTML = "Tipo"// Cambia el contenido del ID 'tipo' a "Tipo"

                    tabla.replaceChild(tableBodyNuevo,tableBodyAntiguo); //Reemplazo el contenido del cuerpo por la tabla creada

                    document.getElementById("tabla").style.display = "table";// Hago que el estilo de visualización de la tabla sea visible
                    document.getElementById("cargando").style.display = "none"; // Oculta el elemento con el ID 'cargando'
                    document.getElementById("cuerpo").style.backgroundImage = "none"; //Elimino la imagen de fondo del ID 'cuerpo'
                    document.getElementById("iniciales").style.display = "inline";// Hago que el estilo de visualización del botón 'Pokemon Iniciales' sea visible
                    document.getElementById("legendarios").style.display = "inline";// Hago que el estilo de visualización del botón 'Pokemon Legendarios' sea visible
                    
                    // Función al clicar en el botón Pokémon iniciales te redirige a la página "./iniciales.html"
                    document.getElementById("iniciales").addEventListener('click', function() { 
                        window.location.href = "./iniciales.html";
                    });
                    // Función al clicar en el botón Pokémon Legendarios te redirige a la página "./legendarios.html"
                    document.getElementById("legendarios").addEventListener('click', function() { 
                        window.location.href = "./legendarios.html";
                    });
                });
            })
            .catch(error => console.log("Error cargando los datos:", error));//captura cualquier error que ocurra al cargar los datos desde la API.
    })
  
    const traductor = (tipo) => {// Función para traducir de inglés a Español
        if(tipo === "fire"){
          return "FUEGO";
        }else if(tipo === "grass"){
          return "PLANTA"
        }else if(tipo === "poison"){
          return "VENENO"
        }else if(tipo === "flying"){
          return "VOLADOR"
        }else if(tipo === "bug"){
          return "BICHO"
        }else if(tipo === "water"){
          return "AGUA"
        }else if(tipo === "normal"){
          return "NORMAL"
        }else if(tipo === "electric"){
          return "ELÉCTRICO"
        }else if(tipo === "ground"){
          return "TIERRA"
        }else if(tipo === "fairy"){
          return "HADA"
        }else if(tipo === "fighting"){
          return "LUCHA"
        }else if(tipo === "ice"){
          return "HIELO"
        }else if(tipo === "psychic"){
          return "PSÍQUICO"
        }else if(tipo === "ghost"){
          return "FANTASMA"
        }else if(tipo === "rock"){
          return "ROCA"
        }else if(tipo === "dragon"){
          return "DRAGON"
        }else if(tipo === "steel"){
          return "ACERO"
        }else{
          return "ERROR"
        }
      }