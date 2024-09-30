document.addEventListener('DOMContentLoaded', () => {
    const tipoCuestionario = () => {
        const idexperimento = localStorage.getItem('exp'); // Obtiene el valor de localStorage
        var mensajeExp = "";

        // Switch para determinar el mensaje a mostrar
        switch (idexperimento) {
            case 'BC':
                mensajeExp = "Situación para beneficio compartido";
                break;
            case 'PC':
                mensajeExp = "Situación para publicar la corrupción";
                break;
            case 'RC':
                mensajeExp = "Situación para recordatorio comportamental";
                break;
            case 'SC':
                mensajeExp = "Situación para sin control";
                break;
            default:
                mensajeExp = "XD";
        }

        // Inserta el mensaje en el div con id "mensaje"
        document.getElementById('mensaje').textContent = mensajeExp;
    };

    // Llama a la función tipoCuestionario cuando el DOM esté listo
    tipoCuestionario();
});

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
}
