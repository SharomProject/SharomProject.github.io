const formulario = document.getElementById('participantForm');
const inputs = document.querySelectorAll('participantForm');

const recuperarDatos = () => {
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
	nombres: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
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
			    	campos[edad] = true;
	    		} else {
		    		document.getElementById('grupo__edad').classList.add('formulario__grupo-incorrecto');
		    		document.getElementById('grupo__edad').classList.remove('formulario__grupo-correcto');
		    		document.querySelector('#grupo__edad i').classList.add('fa-times-circle');
		    		document.querySelector('#grupo__edad i').classList.remove('fa-check-circle');
		    		document.querySelector('#grupo__edad .formulario__input-error').classList.add('formulario__input-error-activo');
		   		campos[edad] = false;
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
	if(campos.nombres && campos.apellidos && campos.dni && campos.correo && campos.edad && !(distrito === null) && !(distrito.length === 0)){
		if(recuperarDatos()){
			formulario.reset();
			document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
			setTimeout(() => {
				document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
			}, 5000);
			document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
				icono.classList.remove('formulario__grupo-correcto');
			});
		} else {
			
		}
	} else {
     		if(distrito == null){
       			if(Number.isInteger(edad) && edad>=20){
	 		    document.getElementById(`grupo__distrito`).classList.remove('formulario__grupo-incorrecto');
	 		    document.getElementById(`grupo__distrito`).classList.add('formulario__grupo-correcto');
			    document.querySelector(`#grupo__distrito .formulario__input-error`).classList.remove('formulario__input-error-activo');
	 		    campos[edad] = true;
	     		} else {
	 		    document.getElementById(`grupo__distrito`).classList.add('formulario__grupo-incorrecto');
	 		    document.getElementById(`grupo__distrito`).classList.remove('formulario__grupo-correcto');
			    document.querySelector(`#grupo__distrito .formulario__input-error`).classList.add('formulario__input-error-activo');
	 		    campos[edad] = false;
	    		}
    		}
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
 	
});


