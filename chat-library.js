(() => {
  const intents = [
    {
      id: 'saludo',
      keywords: ['hola', 'buenas', 'hello', 'holi', 'que tal', 'buen dia', 'buenas tardes', 'buenas noches'],
      replies: [
        'Hola. Soy el asistente de Enough. Puedo contarte sobre la filosofía del proyecto, la galería, el blog o la forma de contacto.',
        'Bienvenido a Enough. Si quieres, puedo orientarte sobre la visión del proyecto, el archivo visual o cómo seguir el proceso.'
      ]
    },
    {
      id: 'filosofia',
      keywords: ['filosofia', 'intencion', 'vision', 'concepto', 'idea', 'atmosfera', 'zumthor', 'alma', 'espacio'],
      replies: [
        'Enough parte de una idea simple: un espacio no debería impresionar solo en imágenes, sino sentirse verdadero cuando lo habitas. La intención está por encima del ruido.',
        'La filosofía de Enough busca atmósfera, carácter y coherencia. No se trata de decorar por tendencia, sino de construir espacios que digan algo real sobre quien los vive.'
      ]
    },
    {
      id: 'galeria',
      keywords: ['galeria', 'fotos', 'imagenes', 'proyectos', 'archivo visual', 'portafolio'],
      replies: [
        'La galería funciona como un archivo visual en desarrollo, con imágenes propias sobre luz, materia y atmósfera. Puedes verla en la sección "Galería".',
        'Si quieres recorrer el trabajo visual de Enough, la mejor entrada es la galería. Reúne observaciones y proyectos desde una mirada muy intencional.'
      ]
    },
    {
      id: 'blog',
      keywords: ['blog', 'articulos', 'textos', 'notas', 'reflexiones', 'escritos'],
      replies: [
        'El blog de Enough reúne notas y reflexiones sobre espacio, identidad y formas de habitar. Es la parte más verbal del proyecto.',
        'Si te interesa el criterio detrás del proyecto, el blog es clave. Allí se desarrolla la mirada de Enough con más profundidad.'
      ]
    },
    {
      id: 'sobre',
      keywords: ['quien eres', 'sobre ti', 'juanes', 'autor', 'fundador', 'creador'],
      replies: [
        'Enough está construido alrededor de la mirada de Juanes y de un proceso personal de archivo, observación y criterio.',
        'La sección "Sobre mí" muestra el lado más personal del proyecto y ayuda a entender desde dónde nace Enough.'
      ]
    },
    {
      id: 'servicios',
      keywords: ['servicios', 'que haces', 'ofreces', 'trabajo', 'proceso', 'metodo'],
      replies: [
        'Por ahora Enough no se presenta como un catálogo de servicios. La web muestra un proceso: observación, criterio, lenguaje y archivo.',
        'En esta etapa, Enough está más enfocado en construir una visión propia que en vender servicios de forma tradicional.'
      ]
    },
    {
      id: 'contacto',
      keywords: ['contacto', 'instagram', 'hablar', 'escribir', 'mensaje', 'redes', 'seguir'],
      replies: [
        'La forma más directa de contacto ahora mismo es Instagram: @juanes.thp.',
        'Si quieres seguir el proceso o escribir directamente, puedes hacerlo por Instagram en @juanes.thp.'
      ]
    },
    {
      id: 'ubicacion',
      keywords: ['donde', 'ubicacion', 'ciudad', 'pais', 'bucaramanga', 'colombia'],
      replies: [
        'Enough se presenta desde Bucaramanga, Colombia.',
        'El proyecto está situado en Bucaramanga, Colombia, aunque su mirada busca ser más amplia que un lugar puntual.'
      ]
    },
    {
      id: 'estado',
      keywords: ['en construccion', 'estado actual', 'actualmente', 'ahora', 'fase', 'etapa'],
      replies: [
        'Enough está en construcción. Esta etapa está enfocada en desarrollar archivo fotográfico y textos originales.',
        'Ahora mismo el proyecto está consolidando su voz visual y escrita, paso a paso.'
      ]
    },
    {
      id: 'precio',
      keywords: ['precio', 'precios', 'cuanto cuesta', 'costo', 'costos', 'presupuesto', 'tarifa', 'valor'],
      replies: [
        'La web no publica precios ni tarifas. Si quieres hablar de una necesidad concreta, lo mejor es escribir por Instagram para conversar el contexto.',
        'Enough no muestra presupuestos cerrados en esta etapa. Si tienes algo en mente, Instagram es el mejor canal para abrir la conversación.'
      ]
    },
    {
      id: 'tiempo',
      keywords: ['cuando', 'fecha', 'tiempo', 'demora', 'plazo', 'disponible'],
      replies: [
        'La web no muestra tiempos ni agenda pública. Si necesitas hablar de disponibilidad, conviene escribir directamente por Instagram.',
        'Por ahora no hay fechas o plazos publicados. Ese tipo de detalle tendría que conversarse de forma directa.'
      ]
    },
    {
      id: 'despedida',
      keywords: ['gracias', 'adios', 'chao', 'nos vemos'],
      replies: [
        'Con gusto. Si quieres, también puedo orientarte hacia la galería, el blog o el contacto.',
        'Gracias a ti. Si luego quieres seguir explorando Enough, aquí estaré.'
      ]
    }
  ];

  const fallbacks = [
    'No tengo una respuesta exacta para eso todavía. Puedo ayudarte con la filosofía de Enough, la galería, el blog, el proceso o el contacto por Instagram.',
    'Eso no aparece de forma explícita en la web por ahora. Si quieres, prueba preguntarme por la visión del proyecto, la galería o cómo contactar a Juanes.'
  ];

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
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
