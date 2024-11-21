window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

    // Seleccionamos los botones de sort-btn
    let botonesOrdenacion = document.querySelectorAll('.sort-btn');
    botonesOrdenacion[0].addEventListener('click', ordenarNombreAZ);
    botonesOrdenacion[1].addEventListener('click', ordenarNombreZA);

    // Boton para Cargar
    let botonCargarTarjetas = document.querySelector('.load-btn');  
    botonCargarTarjetas.addEventListener('click', cargarTarjetas);
    
    // Boton para Guardar
    let botonGuardarTarjetas = document.querySelector('.save-btn');  
    botonGuardarTarjetas.addEventListener('click', guardarTarjetas);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);

        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.textContent = filosofo.nombre;
        info.append(titulo);

        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // Añadimos info del país a filaInfo
        let pais = document.createElement('div');
        pais.classList.add('info-block');
        let bandera = document.createElement('img');
        bandera.src = filosofo.pais.bandera;
        bandera.alt = `Bandera de ${filosofo.pais.nombre}`;
        pais.append(bandera);
        let nombrePais = document.createElement('span');
        nombrePais.textContent = filosofo.pais.nombre;
        pais.append(nombrePais);
        filaInfo.append(pais);

        // Añadimos info de la corriente a filaInfo
        let corriente = document.createElement('div');
        corriente.classList.add('info-block');
        corriente.innerHTML = `<span>Corriente: </span>${filosofo.corriente}`;
        filaInfo.append(corriente);

        // Añadimos info del arma a filaInfo
        let arma = document.createElement('div');
        arma.classList.add('info-block');
        arma.innerHTML = `<span>Arma: </span>${filosofo.arma}`;
        filaInfo.append(arma);

        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);
        // Añadimos una a una las habilidades
        filosofo.habilidades.forEach((infoHabilidad) => {
            // Añadimos una caja de habilidad
            let habilidad = document.createElement('div');
            habilidad.classList.add('skill');
        
            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let icono = document.createElement('img');
            icono.src = "https://via.placeholder.com/16";
            icono.alt = `Icono de ${icono.habilidad}`;
            habilidad.append(icono);
        
            // 2.Etiqueta de habilidad
            let etiqueta = document.createElement('span');
            etiqueta.classList.add('skill-label');
            etiqueta.textContent = infoHabilidad.habilidad;
            habilidad.append(etiqueta);
        
            // 2.Barra de habilidad
            let barraContainer = document.createElement('div');
            barraContainer.classList.add('skill-bar');
            let barra = document.createElement('div');
            barra.classList.add('level');
            barra.style.width = `${(infoHabilidad.nivel / 4) * 100}%`;
            barraContainer.append(barra);
            habilidad.append(barraContainer);
        
            habilidades.append(habilidad);
        });

         // Añadimos el boton para eliminar
         let botonEliminar = document.createElement('div');
         botonEliminar.innerHTML = '&#x2716'; 
         botonEliminar.classList.add('botonEliminar');
 
         // Añadimos el listener al botón de eliminar
         botonEliminar.addEventListener('click', eliminarTarjeta);
         tarjeta.appendChild(botonEliminar);
        
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    });
}

function eliminarTarjeta(event) {
    event.target.parentElement.remove();
}

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

     // Eliminar totes les targetes de l'array 'tarjeta'
     let ordenadas = document.querySelector('.cards-container');
     tarjetas.forEach(tarjeta => ordenadas.removeChild(tarjeta));
 
     // Afegir 'tarjetasOrdenadas' al contenidor de cards
     let contenedor = document.querySelector('.cards-container');
     tarjetasOrdenadas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1);
    });

     // Eliminar totes les targetes de l'array 'tarjeta'
     let ordenadas = document.querySelector('.cards-container');
     tarjetas.forEach(tarjeta => ordenadas.removeChild(tarjeta));
 
     // Afegir 'tarjetasOrdenadas' al contenidor de cards
     let contenedor = document.querySelector('.cards-container');
     tarjetasOrdenadas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

function crearNuevaTarjeta(event) {
    event.preventDefault();
    let nuevoFilosofo = {};
        nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
        nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
        nuevoFilosofo.pais = {};
        nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;
        // Completar la funcion
        nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;  
        nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
        nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;

        nuevoFilosofo.habilidades = [];
        let habilidadesInputs = document.querySelectorAll('.create-card-form .skills'); 
        let habilidadesNombres = ["Sabiduría","Oratoria","Logica","Innovacion"]

        habilidadesInputs.forEach((input, index) => {
            nuevoFilosofo.habilidades.push({
                habilidad: habilidadesNombres[index],
                nivel: parseInt(input.value)
            });
        });

    crearTarjetas([nuevoFilosofo]);
}

function parsearTarjetas(tarjetas) {
    // En esta funcion extraemos los datos de cada tarjeta (nombre, imagen, país, corriente, arma y habilidades).
    let filosofosParseados = [];
    for (let tarjeta of tarjetas) {
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        // Completar funció
        filosofo.pais.nombre = tarjeta.querySelector('.info-block span').innerHTML; // País
        filosofo.pais.bandera = tarjeta.querySelector('.info-block img').src; 
        filosofo.corriente = tarjeta.querySelector('.info-row .info-block:nth-child(2)').textContent.split(': ')[1];
        filosofo.arma = tarjeta.querySelector('.info-row .info-block:nth-child(3)').textContent.split(': ')[1];
    
        filosofo.habilidades = [];
        let habilidades = tarjeta.querySelectorAll('.skills .skill');
        for (let habilidad of habilidades) {
            let habilidadParaGuardar = {};
            // Completar funció
            habilidadParaGuardar.habilidad = habilidad.querySelector('.skill-label').innerHTML;
            habilidadParaGuardar.nivel = Math.round(parseFloat(habilidad.querySelector('.level').style.width) / 25);
            filosofo.habilidades.push(habilidadParaGuardar);
        }
        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}


function cargarTarjetas() {
    // En esta funcion cargamos las tarjetas almacenadas en el Local Storage. 
    let tarjetasJSON = localStorage.getItem('tarjetas');
    if (tarjetasJSON) {
        let tarjetasData = JSON.parse(tarjetasJSON);
        let contenedor = document.querySelector('.cards-container');
        contenedor.innerHTML = ""
        crearTarjetas(tarjetasData)
    }
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]