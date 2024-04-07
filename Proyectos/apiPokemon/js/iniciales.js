document.addEventListener("DOMContentLoaded", function() { //Ejecutamos desde el principio la llamada a la api
     
    fetch("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0") //Llamada a la api de la primera generacion, son los primeros 9 Pokémon
    .then(response => response.json())//Recuperamos la respuesta de la api y la transformamos en un json
    .then(data => {// Resuelve la promesa con los datos recuperados de la API
        let promises = data.results.map(pokemon => //En este bloque recuperamos la url por cada uno de los pokemons con el map y generamos una nueva promesa
            fetch(pokemon.url)// Realiza solicitud a la url para la obtención de datos 
            .then(response => response.json())//Se parsea respuesta a JSON
        );

        Promise.all(promises) //Establecemos que las dos promesas anteriores se tienen que cumplir antes de que se pinte por pantalla
        .then(pokemons => { //Pokemons es la resolucion de la primera promesa donde recuperamos los pokemons
            let tabla = document.getElementById('tabla');
            let tableBodyAntiguo = document.getElementById('tableBody');
            let tableBodyNuevo = document.createElement('tbody');
            tableBodyNuevo.id = 'tableBody';
            let text = "";
            pokemons.forEach((pokemon, index) => { //Recorro todos los pokemons iniciales que son 9 y creo la tabla
                let fila = document.createElement('tr');//Creación de tr
                let columna1 = document.createElement('td');//creación de td
                columna1.innerHTML =index+1;// Enumero la tabla
                fila.appendChild(columna1);// Unión de columna a la fila
                let columna2 = document.createElement('td');//creación de td
                columna2.innerHTML = pokemon.name.toUpperCase();// Introducción de datos en Mayúsculas
                fila.appendChild(columna2);// Unión de columna a la fila
            
                pokemon.types.forEach((type,index) => { //Recorro el array types de cada uno de los pokemons
                    if(pokemon.types.length-1 === index){// Si es el último tipo en la lista, agrego el nombre traducido
                        text += traductor(type.type.name);    
                        let columna3 = document.createElement('td');//creación de td
                        columna3.innerHTML = text;//introduccion del tipo de pokémon
                        fila.appendChild(columna3);//unión de la columna con la fila
                        text = ""
                        }else{// Si no es el último tipo, añado el nombre traducido seguido de una coma
                          text += traductor(type.type.name) + ", " // Al ser un objeto se accede mediante el punto para poder acceder al tipo de Pokémon dentro de la API.                 
                        }
                });
                // Creo una columna para las imágenes de cada Pokémon inicial
                let columna4 = document.createElement('td');
                let imagen = document.createElement('img');
                imagen.src = `./img/${pokemon.name}.png`
                columna4.appendChild(imagen);
                fila.appendChild(columna4);
                tableBodyNuevo.appendChild(fila);
            });
            // Asigno los índices a las columnas de la tabla
            document.getElementById('numero').innerHTML = "Nº Pokedex"
            document.getElementById('nombre').innerHTML = "Pokemon"
            document.getElementById('tipo').innerHTML = "Tipo"

            
            tabla.replaceChild(tableBodyNuevo,tableBodyAntiguo); //Reemplazo el contenido del cuerpo por la tabla creada.

            // Función al clicar en el botón volver te redirige a la página "./1.pokemon.html" (página principal)
            document.getElementById("volver").addEventListener('click', function() { 
                window.location.href = "./1.pokeApi.html";
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