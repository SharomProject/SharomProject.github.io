const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('formulario');

const recuperarDatos = () => {
  const dni = document.getElementById('dni').value;
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const edad = document.getElementById('edad').value;
  const correo = document.getElementById('correo').value;
  const sexo = document.querySelector('input[name="sexo"]:checked').value;
  const distrito = document.querySelector('input[name="distrito"]:checked').value;
  console.log(document.querySelector('input[name="sexo"]:checked').value);


  const formData = {
    dni: dni,
    nombres: nombres,
    apellidos: apellidos,
    edad: edad,
    correo: correo,
    sexo: sexo,
    distrito: distrito
  };

obtenerDatosParaValidacion().then(datos => {
    
    // Paso 1: Validar si el DNI ya existe
    const dniExistente = datos.some(persona => persona.dni === formData.dni);
    if (dniExistente) {
      alert('Ya se ha registrado a este DNI, pruebe con otro.');
      return;
    }

    // Paso 2: Validar cuotas de edad y género
    const esValidoCuotas = validarCuotas(formData.edad, formData.sexo, formData.distrito, datos);
    if (!esValidoCuotas) {
      alert('El límite de personas en este rango de edad y género ha sido alcanzado.');
      return;
    }
    
    // Paso 3: Contar cuantos experimentos hay asignados para poder asignar uno válido
    const conteo = {};
    
    datos.forEach(persona => {
      if (persona.idexperimento) {
        conteo[persona.idexperimento] = (conteo[persona.idexperimento] || 0) + 1;
      }
    });
    
    const experimentos = [
    'SCC1', 'SCC2', 'SCC3', 'SCC4', 'SCC5', 'SCC6', 'SCC7', 'SCC8', 'SCBI1', 'SCBI2',
    'BCC1', 'BCC2', 'BCC3', 'BCC4', 'BCC5', 'BCC6', 'BCC7', 'BCC8', 'BCBI1', 'BCBI2',
    'PCC1', 'PCC2', 'PCC3', 'PCC4', 'PCC5', 'PCC6', 'PCC7', 'PCC8', 'PCBI1', 'PCBI2',
    'RCC1', 'RCC2', 'RCC3', 'RCC4', 'RCC5', 'RCC6', 'RCC7', 'RCC8', 'RCBI1', 'RCBI2'
  ];

  // Filtrar experimentos que tienen menos de 10 asignaciones
  const experimentosDisponibles = experimentos.filter(experimento => {
    return (conteo[experimento] || 0) < 10;  // Si no está en el conteo, tiene 0 asignaciones
  });

  if (experimentosDisponibles.length === 0) {
    alert('No hay experimentos disponibles para asignar.');
    return;
  }

  // Seleccionar uno de los experimentos disponibles de manera aleatoria
  const experimentoAleatorio = experimentosDisponibles[Math.floor(Math.random() * experimentosDisponibles.length)];

  const formDataIdExperimento = {
    dni: dni,
    nombres: nombres,
    apellidos: apellidos,
    edad: edad,
    correo: correo,
    sexo: sexo,
    distrito: distrito,
    idexperimento: experimentoAleatorio
  };

    // Paso 4: Si todas las validaciones son correctas, enviar los datos
    enviarDatos(formDataIdExperimento);
  });
}

//método para enviar datos, una vez se haya validado todo
function enviarDatos(formData) {
  fetch('https://sheetdb.io/api/v1/de641i4213xkw', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.created === 1) {
        alert('Datos enviados correctamente');
      } else {
        alert('Error al enviar los datos');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// Obtener todos los datos de la hoja (o una búsqueda específica) para validar antes de enviar
function obtenerDatosParaValidacion() {
  return fetch('https://sheetdb.io/api/v1/de641i4213xkw', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    return data;  // Devolvemos los datos como array para que se puedan procesar en otra parte del código
  })
  .catch(error => {
    console.error('Error al obtener los datos para validación:', error);
  });
}

// Método para validar las cuotas entre un rango de edades, género y distrito
function validarCuotas(edad, genero, distrito, datos) {
  console.log('edad de la persona: ' + edad);
  console.log('género de la persona: ' + genero);
  // Obtener los límites de acuerdo al género, edad y distrito
  const limiteMasculino = identificarLimiteMasculino(edad, distrito);
  const limiteFemenino = identificarLimiteFemenino(edad, distrito);

  console.log('Limite masculino: ' + limiteMasculino);
  console.log('Limite femenino: ' + limiteFemenino);

  // Obtener el rango de edad correspondiente
  const rangoEdad = obtenerRangoEdad(edad);
  
  // Filtrar los datos por el rango de edad, género y distrito
  const personasEnRango = datos.filter(persona => {
    return persona.edad >= rangoEdad.edad_min && persona.edad <= rangoEdad.edad_max &&
           persona.sexo === genero && persona.distrito === distrito;
  });

  console.log('Personas en rango: ' + personasEnRango.length);

  if (genero === 'M' && personasEnRango.length >= limiteMasculino) {
    return false;  // Límite de hombres alcanzado
  } else if (genero === 'F' && personasEnRango.length >= limiteFemenino) {
    return false;  // Límite de mujeres alcanzado
  }
  
  return true;  // No se ha alcanzado el límite
}


// Método para identificar el límite masculino basado en edad y distrito
function identificarLimiteMasculino(edad, distrito) {
  const rangos = [
    { distrito: "Cajamarca", edad_min: 20, edad_max: 24, total_masculino: 23 },
    { distrito: "Cajamarca", edad_min: 25, edad_max: 29, total_masculino: 22 },
    { distrito: "Cajamarca", edad_min: 30, edad_max: 34, total_masculino: 21 },
    { distrito: "Cajamarca", edad_min: 35, edad_max: 39, total_masculino: 18 },
    { distrito: "Cajamarca", edad_min: 40, edad_max: 44, total_masculino: 15 },
    { distrito: "Cajamarca", edad_min: 45, edad_max: 49, total_masculino: 13 },
    { distrito: "Cajamarca", edad_min: 50, edad_max: 54, total_masculino: 11 },
    { distrito: "Cajamarca", edad_min: 55, edad_max: 59, total_masculino: 8 },
    { distrito: "Cajamarca", edad_min: 60, edad_max: 64, total_masculino: 7 },
    { distrito: "Cajamarca", edad_min: 65, edad_max: 100, total_masculino: 15 },
    { distrito: "Los Baños del Inca", edad_min: 20, edad_max: 24, total_masculino: 6 },
    { distrito: "Los Baños del Inca", edad_min: 25, edad_max: 29, total_masculino: 6 },
    { distrito: "Los Baños del Inca", edad_min: 30, edad_max: 34, total_masculino: 6 },
    { distrito: "Los Baños del Inca", edad_min: 35, edad_max: 39, total_masculino: 5 },
    { distrito: "Los Baños del Inca", edad_min: 40, edad_max: 44, total_masculino: 4 },
    { distrito: "Los Baños del Inca", edad_min: 45, edad_max: 49, total_masculino: 3 },
    { distrito: "Los Baños del Inca", edad_min: 50, edad_max: 54, total_masculino: 2 },
    { distrito: "Los Baños del Inca", edad_min: 55, edad_max: 59, total_masculino: 2 },
    { distrito: "Los Baños del Inca", edad_min: 60, edad_max: 64, total_masculino: 2 },
    { distrito: "Los Baños del Inca", edad_min: 65, edad_max: 100, total_masculino: 4 }
  ];

  const rangoEncontrado = rangos.find(rango => {
    return rango.distrito === distrito && edad >= rango.edad_min && edad <= rango.edad_max;
  });

  return rangoEncontrado ? rangoEncontrado.total_masculino : 0; // Devolver el límite o 0 si no se encuentra
}

// Método para identificar el límite femenino basado en edad y distrito
function identificarLimiteFemenino(edad, distrito) {
  const rangos = [
    { distrito: "Cajamarca", edad_min: 20, edad_max: 24, total_femenino: 25 },
    { distrito: "Cajamarca", edad_min: 25, edad_max: 29, total_femenino: 24 },
    { distrito: "Cajamarca", edad_min: 30, edad_max: 34, total_femenino: 23 },
    { distrito: "Cajamarca", edad_min: 35, edad_max: 39, total_femenino: 20 },
    { distrito: "Cajamarca", edad_min: 40, edad_max: 44, total_femenino: 17 },
    { distrito: "Cajamarca", edad_min: 45, edad_max: 49, total_femenino: 14 },
    { distrito: "Cajamarca", edad_min: 50, edad_max: 54, total_femenino: 11 },
    { distrito: "Cajamarca", edad_min: 55, edad_max: 59, total_femenino: 9 },
    { distrito: "Cajamarca", edad_min: 60, edad_max: 64, total_femenino: 7 },
    { distrito: "Cajamarca", edad_min: 65, edad_max: 100, total_femenino: 17 },
    { distrito: "Los Baños del Inca", edad_min: 20, edad_max: 24, total_femenino: 6 },
    { distrito: "Los Baños del Inca", edad_min: 25, edad_max: 29, total_femenino: 6 },
    { distrito: "Los Baños del Inca", edad_min: 30, edad_max: 34, total_femenino: 6 },
    { distrito: "Los Baños del Inca", edad_min: 35, edad_max: 39, total_femenino: 5 },
    { distrito: "Los Baños del Inca", edad_min: 40, edad_max: 44, total_femenino: 4 },
    { distrito: "Los Baños del Inca", edad_min: 45, edad_max: 49, total_femenino: 3 },
    { distrito: "Los Baños del Inca", edad_min: 50, edad_max: 54, total_femenino: 3 },
    { distrito: "Los Baños del Inca", edad_min: 55, edad_max: 59, total_femenino: 2 },
    { distrito: "Los Baños del Inca", edad_min: 60, edad_max: 64, total_femenino: 2 },
    { distrito: "Los Baños del Inca", edad_min: 65, edad_max: 100, total_femenino: 4 }
  ];

  const rangoEncontrado = rangos.find(rango => {
    return rango.distrito === distrito && edad >= rango.edad_min && edad <= rango.edad_max;
  });

  return rangoEncontrado ? rangoEncontrado.total_femenino : 0; // Devolver el límite o 0 si no se encuentra
}


// Función para obtener el rango de edad basado en la edad y el distrito
function obtenerRangoEdad(edad) {
  const rangos = [
    { edad_min: 20, edad_max: 24 },
    { edad_min: 25, edad_max: 29 },
    { edad_min: 30, edad_max: 34 },
    { edad_min: 35, edad_max: 39 },
    { edad_min: 40, edad_max: 44 },
    { edad_min: 45, edad_max: 49 },
    { edad_min: 50, edad_max: 54 },
    { edad_min: 55, edad_max: 59 },
    { edad_min: 60, edad_max: 64 },
    { edad_min: 65, edad_max: 100 }
  ];

  const rangoEncontrado = rangos.find(rango => {
    return edad >= rango.edad_min && edad <= rango.edad_max;
  });

  return rangoEncontrado ? rangoEncontrado : { edad_min: 0, edad_max: 0 };  // Si no encuentra el rango, devuelve 0
}


const expresiones = {
	nombres: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	dni: /^\d{8}$/, // 8 numeros.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

let campos = {
	dni: false,
	nombres: false,
	apellidos: false,
	edad: false,
	correo:false,
	distrito: false
}

const validarFormulario = (e) => {
	e.preventDefault();  // Asegúrate de que estás recibiendo el evento
	let event = e.target;  // Verifica que estás accediendo al elemento correcto
	switch (e.target.id) {
		case "nombres":
			validarCampo(expresiones.nombres, e.target, 'nombres');
		break;
		case "apellidos":
			validarCampo(expresiones.apellidos, e.target, 'apellidos');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
		break;
		case "edad":
			const edad = parseInt(e.target.value);
			if(Number.isInteger(edad) && edad>=20){
				document.getElementById('grupo__edad').classList.remove('formulario__grupo-incorrecto');
				document.getElementById('grupo__edad').classList.add('formulario__grupo-correcto');
			    	document.querySelector('#grupo__edad i').classList.add('fa-check-circle');
			   	document.querySelector('#grupo__edad i').classList.remove('fa-times-circle');
			    	document.querySelector('#grupo__edad .formulario__input-error').classList.remove('formulario__input-error-activo');
			    	campos['edad'] = true;
				console.log('sixd');
	    		} else {
		    		document.getElementById('grupo__edad').classList.add('formulario__grupo-incorrecto');
		    		document.getElementById('grupo__edad').classList.remove('formulario__grupo-correcto');
		    		document.querySelector('#grupo__edad i').classList.add('fa-times-circle');
		    		document.querySelector('#grupo__edad i').classList.remove('fa-check-circle');
		    		document.querySelector('#grupo__edad .formulario__input-error').classList.add('formulario__input-error-activo');
		   		campos['edad'] = false;
				console.log('xdno');
	    		}
    		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		// Aplicar clases al contenedor y al input directamente
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		
		input.classList.remove('formulario__input-incorrecto'); // Añadir clases al input mismo
		input.classList.add('formulario__input-correcto');
		
		// Cambiar el icono de validación
		document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.remove('fa-times-circle');
		
		// Ocultar el mensaje de error
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
		console.log('si');
	} else {
		// Aplicar clases al contenedor y al input directamente
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		
		input.classList.remove('formulario__input-correcto');
		input.classList.add('formulario__input-incorrecto');
		
		// Cambiar el icono de validación
		document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__validacion-estado`).classList.remove('fa-check-circle');
		
		// Mostrar el mensaje de error
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
		console.log(campos[campo]);
		console.log('noxd');
	}
}

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
    });
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('xd');
	console.log(campos['nombres']);
	console.log(campos['apellidos']);
	console.log(campos['dni']);
	console.log(campos['correo']);
	console.log(campos['edad']);
	if(campos['nombres'] && campos['apellidos'] && campos['dni'] && campos['correo'] && campos['edad']){
		recuperarDatos();
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
 	
});
