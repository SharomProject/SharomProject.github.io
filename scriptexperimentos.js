document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función tipoCuestionario cuando el DOM esté listo
    tipoCuestionario();
});

const tipoCuestionario = () => {
    const idexperimento = localStorage.getItem("exp"); // Obtiene el valor de localStorage
    var mensajeExp = "";

    // Switch para determinar el mensaje a mostrar
    switch (idexperimento.charAt(0)) {
        case 'B':
            mensajeExp = "Situación para beneficio compartido";
            break;
        case 'P':
            mensajeExp = "Situación para publicar la corrupción";
            break;
        case 'R':
            mensajeExp = "Situación para recordatorio comportamental";
            break;
        case 'S':
            mensajeExp = "Situación para sin control";
            break;
        default:
            mensajeExp = "XD";
    }

    // Inserta el mensaje en el div con id "mensaje"
    document.getElementById('mensaje').textContent = mensajeExp;
};
const enviarrespuestas = () => {
    const respuestas = {
        idexperimento: localStorage.getItem('exp'),
        dni: localStorage.getItem('dni'),
        r1: 'si',
        r2: 'si',
        r3: 'si',
        r4: 'si',
        r5: 'si',
        r6: 'si',
        r7: 'si',
        r8: 'si',
        r9: 'si',
        r10: 'si'
    }

    //enviar respuestas
    //alert ok
    alert("oka");
    //alert nose
}

const formulario = document.getElementById("form");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarrespuestas();
    location.replace("https://localhost:7063/agracemiento.html");
});
