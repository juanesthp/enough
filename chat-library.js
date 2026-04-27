(() => {
  const intents = [
    {
      id: 'saludo',
      keywords: ['hola', 'buenas', 'hello', 'holi', 'que tal', 'buen dia', 'buenas tardes', 'buenas noches'],
      replies: [
        'Hola. Soy el asistente de Enough. Puedo contarte sobre la filosofia del proyecto, la galeria, el blog o la forma de contacto.',
        'Bienvenido a Enough. Si quieres, puedo orientarte sobre la vision del proyecto, el archivo visual o como seguir el proceso.'
      ]
    },
    {
      id: 'filosofia',
      keywords: ['filosofia', 'intencion', 'vision', 'concepto', 'idea', 'atmosfera', 'zumthor', 'alma', 'espacio'],
      replies: [
        'Enough parte de una idea simple: un espacio no deberia impresionar solo en imagenes, sino sentirse verdadero cuando lo habitas. La intencion esta por encima del ruido.',
        'La filosofia de Enough busca atmosfera, caracter y coherencia. No se trata de decorar por tendencia, sino de construir espacios que digan algo real sobre quien los vive.'
      ]
    },
    {
      id: 'galeria',
      keywords: ['galeria', 'fotos', 'imagenes', 'proyectos', 'archivo visual', 'portafolio'],
      replies: [
        'La galeria funciona como un archivo visual en desarrollo, con imagenes propias sobre luz, materia y atmosfera. Puedes verla en la seccion "Galeria".',
        'Si quieres recorrer el trabajo visual de Enough, la mejor entrada es la galeria. Reune observaciones y proyectos desde una mirada muy intencional.'
      ]
    },
    {
      id: 'blog',
      keywords: ['blog', 'articulos', 'textos', 'notas', 'reflexiones', 'escritos'],
      replies: [
        'El blog de Enough reune notas y reflexiones sobre espacio, identidad y formas de habitar. Es la parte mas verbal del proyecto.',
        'Si te interesa el criterio detras del proyecto, el blog es clave. Alli se desarrolla la mirada de Enough con mas profundidad.'
      ]
    },
    {
      id: 'sobre',
      keywords: ['quien eres', 'sobre ti', 'juanes', 'autor', 'fundador', 'creador'],
      replies: [
        'Enough esta construido alrededor de la mirada de Juanes y de un proceso personal de archivo, observacion y criterio.',
        'La seccion "Sobre mi" muestra el lado mas personal del proyecto y ayuda a entender desde donde nace Enough.'
      ]
    },
    {
      id: 'servicios',
      keywords: ['servicios', 'que haces', 'ofreces', 'trabajo', 'proceso', 'metodo'],
      replies: [
        'Por ahora Enough no se presenta como un catalogo de servicios. La web muestra un proceso: observacion, criterio, lenguaje y archivo.',
        'En esta etapa, Enough esta mas enfocado en construir una vision propia que en vender servicios de forma tradicional.'
      ]
    },
    {
      id: 'contacto',
      keywords: ['contacto', 'instagram', 'hablar', 'escribir', 'mensaje', 'redes', 'seguir'],
      replies: [
        'La forma mas directa de contacto ahora mismo es Instagram: @juanes.thp.',
        'Si quieres seguir el proceso o escribir directamente, puedes hacerlo por Instagram en @juanes.thp.'
      ]
    },
    {
      id: 'ubicacion',
      keywords: ['donde', 'ubicacion', 'ciudad', 'pais', 'bucaramanga', 'colombia'],
      replies: [
        'Enough se presenta desde Bucaramanga, Colombia.',
        'El proyecto esta situado en Bucaramanga, Colombia, aunque su mirada busca ser mas amplia que un lugar puntual.'
      ]
    },
    {
      id: 'estado',
      keywords: ['en construccion', 'estado actual', 'actualmente', 'ahora', 'fase', 'etapa'],
      replies: [
        'Enough esta en construccion. Esta etapa esta enfocada en desarrollar archivo fotografico y textos originales.',
        'Ahora mismo el proyecto esta consolidando su voz visual y escrita, paso a paso.'
      ]
    },
    {
      id: 'precio',
      keywords: ['precio', 'precios', 'cuanto cuesta', 'costo', 'costos', 'presupuesto', 'tarifa', 'valor'],
      replies: [
        'La web no publica precios ni tarifas. Si quieres hablar de una necesidad concreta, lo mejor es escribir por Instagram para conversar el contexto.',
        'Enough no muestra presupuestos cerrados en esta etapa. Si tienes algo en mente, Instagram es el mejor canal para abrir la conversacion.'
      ]
    },
    {
      id: 'tiempo',
      keywords: ['cuando', 'fecha', 'tiempo', 'demora', 'plazo', 'disponible'],
      replies: [
        'La web no muestra tiempos ni agenda publica. Si necesitas hablar de disponibilidad, conviene escribir directamente por Instagram.',
        'Por ahora no hay fechas o plazos publicados. Ese tipo de detalle tendria que conversarse de forma directa.'
      ]
    },
    {
      id: 'despedida',
      keywords: ['gracias', 'adios', 'chao', 'nos vemos'],
      replies: [
        'Con gusto. Si quieres, tambien puedo orientarte hacia la galeria, el blog o el contacto.',
        'Gracias a ti. Si luego quieres seguir explorando Enough, aqui estare.'
      ]
    }
  ];

  const fallbacks = [
    'No tengo una respuesta exacta para eso todavia. Puedo ayudarte con la filosofia de Enough, la galeria, el blog, el proceso o el contacto por Instagram.',
    'Eso no aparece de forma explicita en la web por ahora. Si quieres, prueba preguntarme por la vision del proyecto, la galeria o como contactar a Juanes.'
  ];

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function scoreIntent(normalizedMessage, intent) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (!normalizedKeyword) continue;
      if (normalizedMessage.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(' ') ? 3 : 2;
      }
    }
    return score;
  }

  function reply(message, history = []) {
    const normalizedMessage = normalize(message);
    const assistantTurns = history.filter((item) => item.role === 'assistant').length;

    let bestIntent = null;
    let bestScore = 0;
    for (const intent of intents) {
      const score = scoreIntent(normalizedMessage, intent);
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }

    if (bestIntent && bestScore > 0) {
      return {
        intent: bestIntent.id,
        reply: bestIntent.replies[assistantTurns % bestIntent.replies.length]
      };
    }

    return {
      intent: 'fallback',
      reply: fallbacks[assistantTurns % fallbacks.length]
    };
  }

  window.EnoughChatLibrary = { intents, reply };
})();
