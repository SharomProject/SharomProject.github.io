const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('formulario');

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem("dni") == null) {
		location.replace('https://localhost:7063/dniexiste.html');
	} else {
		const inputs = document.querySelectorAll('input');
		inputs.forEach((input) => {
			input.addEventListener('keyup', validarFormulario);
			input.addEventListener('blur', validarFormulario);
		});
	}
});


const expresiones = {
	profesion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	dni: /^\d{8}$/, // 8 numeros.
}

let campos = {
	dni: false,
	profesion: false
}


formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	if (campos['dni'] && campos['profesion']) {
		recuperarDatos();
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
 	
});

const redirect = (exp, dni) => {
	localStorage.setItem('exp', exp);
	//location.replace('https://localhost:7063/portalparacuestionarios.html');
}

const recuperarDatos = () => {

	// Obtener los valores de los inputs del formulario
	const dni = document.getElementById('dni').value;
	const estadoCivil = document.querySelector('input[name="estado_civil"]:checked').value;
	const distrito = document.getElementById('distrito').value;
	const nivelEstudios = document.querySelector('input[name="nivel_estudios"]:checked').value;
	const profesion = document.getElementById('profesion').value;
	const ocupacion = document.querySelector('input[name="ocupacion"]:checked').value;
	const sector = document.querySelector('input[name="sector"]:checked').value;
	const seguro = document.querySelector('input[name="seguro"]:checked').value;
	const sistemaPrevisional = document.querySelector('input[name="sisprevi"]:checked').value;
	const consentimiento = document.getElementById('aceptar').checked ? 'Sí' : 'No';

	// Organizar los datos en un objeto
	const formData = {
		dni: dni,
		estadoCivil: estadoCivil,
		distrito: distrito,
		nivelEstudios: nivelEstudios,
		profesion: profesion,
		ocupacion: ocupacion,
		sector: sector,
		seguro: seguro,
		sistemaPrevisional: sistemaPrevisional,
		consentimiento: consentimiento
	};

	if (campos[dni] && campos[profesion]) {
		obtenerDatosParaValidacion().then(datos => {
			const dniExistente = datos.some(persona => persona.dni === dni);
			if (dniExistente) {
				const exp = obtenerExperimento(dni);
				localStorage.setItem("exp", exp);
				console.log(dni);
				console.log(exp);
				//evnair datos SheetBD

			} else {
				document.getElementById('formulario__mensaje-exito').classList.remove('mensaje-exito-activo');
				document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
				return;
			}
		});
	}
	

	alert(formData);
}

//nolosetúdime
function obtenerExperimento(dni) {
	const url = "https://sheetdb.io/api/v1/de641i4213xkw/search?dni=" + dni;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const exp = data[0].idexperimento;
			console.log(exp);
			return exp;
		})
		.catch(error => console.error('Error:', error));
}

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

const validarFormulario = (e) => {
	e.preventDefault();  // Asegúrate de que estás recibiendo el evento
	let event = e.target;  // Verifica que estás accediendo al elemento correcto
	switch (e.target.id) {
		case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
		break;

		case "profesion":
			validarCampo(expresiones.profesion, e.target, 'profesion');
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
