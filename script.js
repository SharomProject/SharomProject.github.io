const formulario = document.getElementById('participantForm');
const inputs = document.querySelectorAll('participantForm');

const recuperarDatos = () => {
 // event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  //validarCampo(expresiones.dni, e.target, 'dni');
	//validarCampo(expresiones.dni, e.target, 'dni');
	
  // Capturar los valores del formulario
  const dni = document.getElementById('dni').value;
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const edad = document.getElementById('edad').value;
  const correo = document.getElementById('correo').value;
  const distrito = document.querySelector('input[name="distrito"]:checked').value;
            // Crear un objeto con los datos
  const formData = {
    dni: dni,
    nombres: nombres,
    apellidos: apellidos,
    edad: edad,
    correo: correo,
    distrito: distrito
  }

  fetch('https://script.google.com/macros/s/AKfycbxbgpXRNLE91xr41E2pPrhEV9I_HjpDQ4AjMqfHW_eQVv3kPB4hejRSwmetf9sJj9EP/exec', {
    method: 'POST',
	headers: {
		'Content-Type':'application/json'
	},
    body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => {
    alert('Datos enviados correctamente');
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


const expresiones = {
	nomapellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	dni: /^\d{8}$/, // 8 numeros.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
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
	console.log(event);
	switch (e.target.name) {
		case "nombres":
			validarCampo(expresiones.nombres, e.target, 'nombres');
			console.log('zi', e.target.value);
		break;
		case "apellidos":
			validarCampo(expresiones.apellidos, e.target, 'apellidos');
			console.log('zi', e.target.value);
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			console.log('zi', e.target.value);
		break;
		case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
			console.log('zi4', e.target.value);
		break;
		case "edad":
			const edad = e.target.value;
			if(Number.isInteger(edad) && edad>=20){
				document.getElementById('grupo__edad').classList.remove('formulario__grupo-incorrecto');
				document.getElementById('grupo__edad').classList.add('formulario__grupo-correcto');
			    	document.querySelector('#grupo__edad i').classList.add('fa-check-circle');
			   	document.querySelector('#grupo__edad i').classList.remove('fa-times-circle');
			    	document.querySelector('#grupo__edad .formulario__input-error').classList.remove('formulario__input-error-activo');
			    	campos[edad] = true;
	    		} else {
		    		document.getElementById('grupo__edad').classList.add('formulario__grupo-incorrecto');
		    		document.getElementById('grupo__edad').classList.remove('formulario__grupo-correcto');
		    		document.querySelector('#grupo__edad i').classList.add('fa-times-circle');
		    		document.querySelector('#grupo__edad i').classList.remove('fa-check-circle');
		    		document.querySelector('#grupo__edad .formulario__input-error').classList.add('formulario__input-error-activo');
		   		campos[edad] = false;
	    		}
			console.log('zi3', e.target.value);
    		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
		console.log('zi2', input.value);
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
		console.log('zi1', input.value);
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	recuperarDatos();
 	
});
