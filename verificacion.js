
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const dni = document.getElementById('dni').value;
    const expresion = /^\d{8}$/;
    if (expresion.test(dni)) {
        obtenerDatosParaValidacion().then(datos => {
            const dniExistente = datos.some(persona => persona.dni === dni);
            if (dniExistente) {
                localStorage.setItem("dni", dni);
                document.getElementById('formulario__mensaje-exito').classList.add('mensaje-exito-activo');
                alert("DNI verificado correctamente. Se redirigirá a la ficha sociodemográfica.");
                location.href= 'https://localhost:7063/sociodemografico.html';
            } else {
                document.getElementById('formulario__mensaje-exito').classList.remove('mensaje-exito-activo');
                document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
                return;
            }
        });
    } else {
        document.getElementById('formulario__mensaje').innerHTML = "Ingrese un DNI válido (8 números).";
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        return;
    }
});


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

const validarCampo = () => {
    const expresion = /^\d{8}$/;
    const dni = document.getElementById('dni');
    if (expresion.test(dni.value)) {
        // Aplicar clases al contenedor y al input directamente
        document.getElementById(`grupo__dni`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__dni`).classList.add('formulario__grupo-correcto');

        dni.classList.remove('formulario__input-incorrecto'); // Añadir clases al input mismo
        dni.classList.add('formulario__input-correcto');

        // Cambiar el icono de validación
        document.querySelector(`#grupo__dni .formulario__validacion-estado`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__dni .formulario__validacion-estado`).classList.remove('fa-times-circle');

        // Ocultar el mensaje de error
        document.querySelector(`#grupo__dni .formulario__input-error`).classList.remove('formulario__input-error-activo');
    } else {
        // Aplicar clases al contenedor y al input directamente
        document.getElementById(`grupo__dni`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__dni`).classList.remove('formulario__grupo-correcto');

        dni.classList.remove('formulario__input-correcto');
        dni.classList.add('formulario__input-incorrecto');

        // Cambiar el icono de validación
        document.querySelector(`#grupo__dni .formulario__validacion-estado`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__dni .formulario__validacion-estado`).classList.remove('fa-check-circle');

        // Mostrar el mensaje de error
        document.querySelector(`#grupo__dni .formulario__input-error`).classList.add('formulario__input-error-activo');      
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarCampo);
        input.addEventListener('blur', validarCampo);
    });
});
