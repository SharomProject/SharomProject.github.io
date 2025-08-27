// Obtener la raíz del proyecto
const rootURL = `${window.location.protocol}//${window.location.host}/`;

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dni") == null) {
      // Redirigir a una página específica
      const newPath = "dniexiste.html";
      location.replace(`${rootURL}${newPath}`);
    }
  });


  // Obtener el experimento desde localStorage
  const idExperimento = localStorage.getItem("exp");
  let mensajeExp;

  // Configurar mensaje inicial basado en el experimento
  switch (idExperimento.charAt(0)) {
    case "S":
      mensajeExp =
        "Responde las siguientes preguntas de manera rápida 😊<br><strong>RECUERDA:</strong> Esto será de manera anónima.";
      break;
    case "B":
      mensajeExp =
        "Responde las siguientes preguntas de manera rápida 😊<br><strong>RECUERDA:</strong> Esto será de manera anónima y “No tengas miedo de fallar, ten miedo de no intentar”.";
      break;
    case "P":
      mensajeExp =
        "Responde las siguientes preguntas de manera rápida 😊<br><strong>RECUERDA:</strong> Esto será de manera anónima y “La corrupción es enemiga del desarrollo”.";
      break;
    case "R":
      mensajeExp =
        "Responde las siguientes preguntas de manera rápida 😊<br><strong>RECUERDA:</strong> Esto será de manera anónima y “La integridad no se negocia”.";
      break;
    default:
      mensajeExp = "Error al cargar la página.";
  }

  // Mostrar mensaje inicial
  document.getElementById("mensajeInicial").innerHTML = mensajeExp;

  // Cargar preguntas y generar formulario dinámicamente
  // Obtener el contenedor donde se mostrarán las preguntas
  const contenedorPreguntas = document.getElementById(
    "contenedorPreguntas"
  );

  // Cargar las preguntas específicas según el caso
  const preguntasSeleccionadas = preguntas[idExperimento.charAt(0)] || [];

  // Mostrar las preguntas
  preguntasSeleccionadas.forEach((pregunta) => {
    const div = document.createElement("div");
    div.classList.add(
      "mb-4",
      "border",
      "rounded-3",
      "p-4",
      "bg-light-subtle",
      "shadow-sm"
    );

    if (idExperimento.charAt(0) === "R") {
      div.classList.add("pregunta-con-imagen");
      div.innerHTML = `
  <img src="${pregunta.imagen}" alt="Imagen relacionada">
  <div>
    <p class="fw-bold">${pregunta.texto}</p>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="pregunta-${pregunta.id}" value="si" required>
      <label class="form-check-label">Sí</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="pregunta-${pregunta.id}" value="no" required>
      <label class="form-check-label">No</label>
    </div>
  </div>
`;
    } else {
      div.innerHTML = `
  <p class="fw-bold">${pregunta.texto}</p>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="pregunta-${pregunta.id}" value="si" required>
    <label class="form-check-label">Sí</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="pregunta-${pregunta.id}" value="no" required>
    <label class="form-check-label">No</label>
  </div>
`;
    }

    contenedorPreguntas.appendChild(div);
  });

  // Preparar la lógica para registrar respuestas en Google Sheets
  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    // Recoger las respuestas del formulario
    const respuestas = preguntasSeleccionadas.map((pregunta) => {
      const seleccion = document.querySelector(
        `input[name="pregunta-${pregunta.id}"]:checked`
      );
      return {
        idPregunta: pregunta.id,
        respuesta: seleccion ? seleccion.value : null,
      };
    });

    // Mostrar las respuestas en la consola (simulación de envío)
    console.log("Respuestas recopiladas:", respuestas);
    console.log("experimento:", idExperimento);

    const formData = {
      idexperimento: idExperimento,
      dnientrevistado: localStorage.getItem("dni"),
      r1: respuestas[0].respuesta,
      r2: respuestas[1].respuesta,
      r3: respuestas[2].respuesta,
      r4: respuestas[3].respuesta,
      r5: respuestas[4].respuesta,
      r6: respuestas[5].respuesta,
      r7: respuestas[6].respuesta,
      r8: respuestas[7].respuesta,
      r9: respuestas[8].respuesta,
      r10: respuestas[9].respuesta,
    };

    // Lógica para enviar datos a Google Sheets
    fetch(
      "https://sheetdb.io/api/v1/fk99p94fx65ni?sheet=respuestas_experimentos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Formulario enviado exitosamente:", data);
        localStorage.setItem("dni", null);
        localStorage.setItem("exp", null);
        // console.log(localStorage.getItem("dni"), localStorage.getItem(exp));
        alert("¡Gracias por participar!");
        formulario.reset(); // Reiniciar el formulario
        const newPath = "agradecimiento.html";
        const rootURL = `${window.location.protocol}//${window.location.host}/`;
        window.location.href = `${rootURL}${newPath}`;
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un error al enviar el formulario. Intenta nuevamente.");
      });
  });
