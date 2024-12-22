const preguntas = {
  S: [
    {
      id: 1,
      texto: "Usted se encuentra apurado para llegar a un evento o reunión comprometida y no se percata que ha cometido una infracción de tránsito. Un policía lo detiene para hacerle ver su infracción y le da entender que lo puede dejar avanzar si es que le da una suma de dinero, ¿usted aceptaría?"
    },
    {
      id: 2,
      texto: "Te encuentras caminando por la calle y se acerca una persona para ofrecerte un iPhone 16 al precio de S/ 1 000,00, tu consideras que esta es una buena oferta, ¿aceptarías comprar el teléfono?"
    },
    {
      id: 3,
      texto: "Usted se acerca a una entidad del gobierno para realizar un trámite urgente y el vigilante le pide un documento de identidad para facilitar su acceso. Se percata que olvidó su DNI, pero tiene urgencia en realizar dicho trámite ¿usted le ofrecería dinero al vigilante para que lo deje ingresar?"
    },
    {
      id: 4,
      texto: "Usted se ha comprometido en encontrar vacante en un colegio de prestigio para un familiar muy cercano. Se encuentra con una persona que le indica que puede conseguir dicha vacante a cambio de una suma de dinero razonable para él y para el director de dicha institución educativa indicando que se accederá a la vacante inmediatamente, ¿aceptaría pagar el dinero solicitado?"
    },
    {
      id: 5,
      texto: "Usted se encuentra en la cola para el ingreso a una actividad de entretenimiento que atrae a mucho público. Se percata que hay grupo de conocidos encabezando la cola de ingreso. ¿usted se acercaría a saludarlos con el propósito de saltarse la cola?"
    },
    {
      id: 6,
      texto: "Usted está llevando un curso de especialización/capacitación el cual se certifica con la aprobación de un examen. Lamentablemente, usted ha desaprobado dicha evaluación, que es un requisito en su centro de labores, ¿ofrecería dinero para cambiar el resultado de la evaluación?"
    },
    {
      id: 7,
      texto: "Usted ha sido penalizado con una multa por la municipalidad donde vive por haber cometido una infracción. Usted conoce a la autoridad a cargo de dicha área, ¿usaría su influencia para resolver este inconveniente?"
    },
    {
      id: 8,
      texto: "Usted está muy apurado por llegar a su destino, y le toca cruzar un semáforo el cual está con la luz roja; sin embargo, no se ven carros ni personas cruzar, ¿usted cruzaría el semáforo?"
    },
    {
      id: 9,
      texto: "Usted se encuentra en una combi y viene hablando por el teléfono, se distrae y se pasa del paradero autorizado donde debió bajar, ¿usted presionaría al conductor de la combi para que lo deje bajar en un lugar indebido?"
    },
    {
      id: 10,
      texto: "Usted tiene un amigo de la infancia cuyo estilo de vida es bastante ostentoso. Existen rumores de que sus ingresos provienen de actividades ilegales, por lo general llegan personas extrañas a su vivienda. La policía ha realizado un operativo para aprender a su amigo y le ha solicitado testificar en este caso, ¿aceptaría?"
    }
  ],
  B: [
    {
      id: 1,
      texto: "Usted se encuentra apurado para llegar a un evento o reunión comprometida y no se percata que ha cometido una infracción de tránsito. Un policía lo detiene para hacerle ver su infracción y le da entender que si lo infracciona él tendrá que hacer un papeleo para reportar y subir al sistema la papeleta correspondiente y usted tendrá que gastar tiempo, que no tiene para hacer el trámite de pagar la infracción en el municipio local, por lo que lo puede dejar avanzar si es que le da una suma de dinero con lo cual ambos se ahorrarían bastante trabajo, ¿usted aceptaría?"
    },
    {
      id: 2,
      texto: "Te encuentras caminando con un amigo por la calle y se acerca una persona para ofrecerte un iPhone 16 con sus correspondientes AirPods o audífonos inalámbricos de marca Apple al precio de S/ 1 000,00. Tu amigo considera que esta es una buena oferta y te dice que a él le interesa los AirPods y que podría contribuir con S/ 100,00 con lo cual podrías adquirir el iPhone al precio de S/ 900,00, ¿aceptarías comprar el teléfono?"
    },
    {
      id: 3,
      texto: "Usted se acerca a una entidad del gobierno para realizar un trámite urgente y el vigilante le pide un documento de identidad para facilitar su acceso. Se percata que olvidó su DNI, pero tiene urgencia en realizar dicho trámite. En ese momento se acerca una señora también olvidó su DNI y le propone darle dinero al vigilante para que las dejes ingresar para que le salga más barato entre los dos ¿usted le ofrecería dinero al vigilante para que lo deje ingresar?"
    },
    {
      id: 4,
      texto: "Usted se ha comprometido en encontrar vacante en un colegio de prestigio para un familiar muy cercano, se encuentra con un amigo del colegio, quién también está buscando vacante y le dice que puede conseguir dichas vacantes a cambio de una suma de dinero razonable, e incluso el director de dicha institución podría hacer un descuento por ambas vacantes ¿aceptaría la propuesta?"
    },
    {
      id: 5,
      texto: "Usted se encuentra en la cola para el ingreso a una actividad de entretenimiento que atrae a mucho público. Su prima y un grupo de amigos está encabezando la cola, se percata que usted ha llegado y lo contacta para adelantarse junto a ellos. ¿usted se acercaría a saludarlos con el propósito de saltarse la cola?"
    },
    {
      id: 6,
      texto: "Usted y otros tres amigos están llevando un curso de especialización/capacitación el cual se certifica con la aprobación de un examen. ¿Ofrecería dinero para cambiar el resultado de la evaluación?"
    },
    {
      id: 7,
      texto: "Usted ha sido penalizado con una multa por la municipalidad donde vive por haber cometido una infracción. ¿Usaría su influencia para resolver este inconveniente?"
    },
    {
      id: 8,
      texto: "Usted está muy apurado por llegar a su destino, y le toca cruzar un semáforo el cual está con la luz roja; sin embargo, en el sentido del color verde no se ven carros ni personas cruzar. En su mismo sentido llegan otras dos personas que al percatarse de la situación cruzan en luz roja ¿usted cruzaría el semáforo tras de ellos?"
    },
    {
      id: 9,
      texto: "Usted se encuentra en una combi y viene hablando por el teléfono, se distrae y se pasa del paradero autorizado donde debió bajar. Otra persona en la combi se percata de lo mismo y presiona al conductor para que pare en un lugar indebido ¿usted haría presión adicional para obligar a la parada?"
    },
    {
      id: 10,
      texto: "Usted tiene un amigo de la infancia cuyo estilo de vida es bastante ostentoso. Siempre lo invita a salir a su casa, además de salir a diferentes actividades de entretenimiento; por lo general, usted nunca se preocupa de la cuenta cuando sale con este amigo. Existen rumores de que sus ingresos provienen de actividades ilegales. Usted ha tenido oportunidad de conocer personas extrañas como parte de esta amistad. De improviso, la policía ha realizado un operativo para aprender a su amigo y le ha solicitado testificar a usted en este caso, ¿usted aceptaría?"
    }
  ],
  P: [
    {
      id: 1,
      texto: "Usted se encuentra apurado para llegar a un evento o reunión comprometida y no se percata que ha cometido una infracción de tránsito. Un policía lo detiene para hacerle ver su infracción y le da entender que lo puede dejar avanzar si es que le da una suma de dinero; en ese instante se percata que una cámara de seguridad está registrando el acontecimiento, ¿usted aceptaría pagar al policía?"
    },
    {
      id: 2,
      texto: "Te encuentras caminando por la calle y se acerca una persona para ofrecerte un iPhone 16 al precio de S/ 1 000,00, tu consideras que esta es una buena oferta. De pronto otra persona pasa y le increpa al vendedor que “seguro está vendiendo artículos robados” ¿aceptarías comprar el teléfono?"
    },
    {
      id: 3,
      texto: "Usted se acerca a una entidad del gobierno para realizar un trámite urgente y el vigilante le pide un documento de identidad para facilitar su acceso. Se percata que olvidó su DNI, pero tiene urgencia en realizar dicho trámite. De pronto se percata que hay personas reclamando porque alguien ingresó sin DNI porque le dio dinero al vigilante ¿usted le ofrecería dinero al vigilante para que lo deje ingresar?"
    },
    {
      id: 4,
      texto: "Usted se ha comprometido en encontrar vacante en un colegio de prestigio para un familiar muy cercano. Le han comentado que en el colegio de su interés han denunciado al director y otras personas por prestarse a vender indebidamente vacantes. De pronto le presentan a una persona que le indica que puede conseguir dicha vacante a cambio de una suma de dinero razonable para él y para el director de dicha institución educativa indicando que se accederá a la vacante inmediatamente, ¿aceptaría pagar el dinero solicitado?"
    },
    {
      id: 5,
      texto: "Usted se encuentra en la cola para el ingreso a una actividad de entretenimiento que atrae a mucho público. De cuando en cuando la gente reclama a algunas personas “¡Respete la cola! ¡Haz tu cola y no seas sinvergüenza!”. De pronto, se percata que hay grupo de conocidos encabezando la cola de ingreso. ¿usted se acercaría a saludarlos con el propósito de saltarse la cola?"
    },
    {
      id: 6,
      texto: "Usted está llevando un curso de especialización/capacitación el cual se certifica con la aprobación de un examen. Lamentablemente, usted ha desaprobado dicha evaluación, que es un requisito en su centro de labores y recuerda que en el pasado han detectado personas que presentaron certificados adulterados dado que no habían aprobado. ¿Ofrecería dinero para cambiar el resultado de la evaluación?"
    },
    {
      id: 7,
      texto: "Usted ha sido penalizado con una multa por la municipalidad donde vive por haber cometido una infracción. Usted conoce a la autoridad a cargo de dicha área quién ha salido en los medios periodísticos por acusaciones de tráfico de influencias, ¿usaría su influencia para resolver este inconveniente que lo aqueja?"
    },
    {
      id: 8,
      texto: "Usted está muy apurado por llegar a su destino, y le toca cruzar un semáforo el cual está con la luz roja; sin embargo, no se ven carros ni personas cruzar; pero también conoce que dichos semáforos generan fotopapeletas ¿usted cruzaría el semáforo?"
    },
    {
      id: 9,
      texto: "Usted se encuentra en una combi y viene hablando por el teléfono, se distrae y se pasa del paradero autorizado donde debió bajar, ¿usted presionaría al conductor de la combi para que lo deje bajar en un lugar indebido sabiendo que las personas están acostumbradas a reclamar cuando el conductor comete estas imprudencias?"
    },
    {
      id: 10,
      texto: "Usted tiene un amigo de la infancia cuyo estilo de vida es bastante ostentoso. Existen rumores de que sus ingresos provienen de actividades ilegales, por lo general llegan personas extrañas a su vivienda. Conoce que los vecinos de su amigo están denunciando algunos delitos. De pronto, la policía ha realizado un operativo para aprender a su amigo y le ha solicitado testificar en este caso, ¿aceptaría?"
    }
  ],
  R: [
    {
      id: 1,
      texto: "Usted se encuentra apurado para llegar a un evento o reunión comprometida y no se percata que ha cometido una infracción de tránsito. Un policía lo detiene para hacerle ver su infracción y le da entender que lo puede dejar avanzar si es que le da una suma de dinero, ¿usted aceptaría?",
      imagen: "./images/Pregunta1.jpg"
    },
    {
      id: 2,
      texto: "Te encuentras caminando por la calle y se acerca una persona para ofrecerte un iPhone 16 al precio de S/ 1 000,00, tu consideras que esta es una buena oferta, ¿aceptarías comprar el teléfono?",
      imagen: "./images/Pregunta2.png"
    },
    {
      id: 3,
      texto: "Usted se acerca a una entidad del gobierno para realizar un trámite urgente y el vigilante le pide un documento de identidad para facilitar su acceso. Se percata que olvidó su DNI, pero tiene urgencia en realizar dicho trámite ¿usted le ofrecería dinero al vigilante para que lo deje ingresar?",
      imagen: "./images/Pregunta3.jpg"
    },
    {
      id: 4,
      texto: "Usted se ha comprometido en encontrar vacante en un colegio de prestigio para un familiar muy cercano. Se encuentra con una persona que le indica que puede conseguir dicha vacante a cambio de una suma de dinero razonable para él y para el director de dicha institución educativa indicando que se accederá a la vacante inmediatamente, ¿aceptaría pagar el dinero solicitado?",
      imagen: "./images/Pregunta4.jpg"
    },
    {
      id: 5,
      texto: "Usted se encuentra en la cola para el ingreso a una actividad de entretenimiento que atrae a mucho público. Se percata que hay grupo de conocidos encabezando la cola de ingreso. ¿usted se acercaría a saludarlos con el propósito de saltarse la cola?",
      imagen: "./images/Pregunta5.png"
    },
    {
      id: 6,
      texto: "Usted está llevando un curso de especialización/capacitación el cual se certifica con la aprobación de un examen. Lamentablemente, usted ha desaprobado dicha evaluación, que es un requisito en su centro de labores, ¿ofrecería dinero para cambiar el resultado de la evaluación?",
      imagen: "./images/Pregunta6.png"
    },
    {
      id: 7,
      texto: "Usted ha sido penalizado con una multa por la municipalidad donde vive por haber cometido una infracción. Usted conoce a la autoridad a cargo de dicha área, ¿usaría su influencia para resolver este inconveniente?",
      imagen: "./images/Pregunta7.jpg"
    },
    {
      id: 8,
      texto: "Usted está muy apurado por llegar a su destino, y le toca cruzar un semáforo el cual está con la luz roja; sin embargo, no se ven carros ni personas cruzar, ¿usted cruzaría el semáforo?",
      imagen: "./images/Pregunta8.jpg"
    },
    {
      id: 9,
      texto: "Usted se encuentra en una combi y viene hablando por el teléfono, se distrae y se pasa del paradero autorizado donde debió bajar. Otra persona en la combi se percata de lo mismo y presiona al conductor para que pare en un lugar indebido ¿usted haría presión adicional para obligar a la parada?",
      imagen: "./images/Pregunta9.png"
    },
    {
      id: 10,
      texto: "Usted tiene un amigo de la infancia cuyo estilo de vida es bastante ostentoso. Existen rumores de que sus ingresos provienen de actividades ilegales, por lo general llegan personas extrañas a su vivienda. La policía ha realizado un operativo para aprender a su amigo y le ha solicitado testificar en este caso, ¿aceptaría?",
      imagen: "./images/Pregunta10.png"
    }
  ]
};

// Exportar preguntas globalmente
window.preguntas = preguntas;
