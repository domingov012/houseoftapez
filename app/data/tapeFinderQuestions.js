export const questions = {
  sport: {
    id: 'sport',
    question: '¿Qué deporte practicas?',
    type: 'single',
    options: [
      {value: 'rugby', label: 'Rugby'},
      {value: 'futbol', label: 'Fútbol'},
      {value: 'running', label: 'Running / Trekking'},
      {value: 'hockey', label: 'Hockey'},
      {value: 'otro', label: 'Otro'},
    ],
    metafieldKey: 'sport',
  },

  purpose: {
    id: 'purpose',
    question: '¿Cuál es tu objetivo?',
    type: 'single',
    options: [
      {
        value: 'actividad',
        label: 'Usar durante actividad',
        description: 'Quiero soporte mientras entreno/juego',
      },
      {
        value: 'prevencion',
        label: 'Prevención',
        description: 'Quiero evitar lesiones futuras',
      },
      {
        value: 'otro',
        label: 'Otro uso',
        description: 'Grip en accesorios, sujetar calcetines, etc.',
      },
    ],
    metafieldKey: 'purpose',
  },

  injury_category: {
    id: 'injury_category',
    question: '¿Qué tipo de lesión o molestia tienes?',
    type: 'single',
    options: [
      {
        value: 'muscular',
        label: 'Muscular',
        description: 'Dolor, contractura, desgarro',
      },
      {
        value: 'articular',
        label: 'Articular',
        description: 'Esguince, inestabilidad, dolor en articulación',
      },
      {
        value: 'osea',
        label: 'Ósea / Soporte',
        description: 'Fractura en recuperación, soporte rígido',
      },
    ],
    metafieldKey: 'injury_category',
  },

  body_part: {
    id: 'body_part',
    question: '¿En qué zona específica?',
    type: 'single',
    optionsByCategory: {
      muscular: [
        {value: 'gemelo', label: 'Gemelo / Pantorrilla'},
        {value: 'muslo', label: 'Muslo / Cuádriceps'},
        {value: 'espalda', label: 'Espalda'},
        {value: 'cuello', label: 'Cuello'},
      ],
      articular: [
        {value: 'tobillo', label: 'Tobillo'},
        {value: 'rodilla', label: 'Rodilla'},
        {value: 'muneca', label: 'Muñeca'},
        {value: 'codo', label: 'Codo'},
        {value: 'hombro', label: 'Hombro'},
      ],
      osea: [
        {value: 'muneca', label: 'Muñeca / Mano'},
        {value: 'tobillo', label: 'Tobillo / Pie'},
        {value: 'dedos', label: 'Dedos'},
      ],
    },
    metafieldKey: 'body_parts',
  },

  support_level: {
    id: 'support_level',
    question: '¿Qué nivel de soporte necesitas?',
    type: 'single',
    options: [
      {
        value: 'elastico',
        label: 'Elástico',
        description: 'Flexibilidad y soporte suave, ideal para prevención',
      },
      {
        value: 'rigido',
        label: 'Rígido',
        description: 'Inmovilización y soporte firme para lesiones serias',
      },
      {
        value: 'no_se',
        label: 'No estoy seguro',
        description: 'Te mostraremos opciones versátiles',
      },
    ],
    metafieldKey: 'support_level',
  },
};

// Default flow, but 'otro' purpose will skip injury/body/support questions
export const quizFlow = [
  'sport',
  'purpose',
  'injury_category',
  'body_part',
  'support_level',
];

// Early exit condition - if purpose is 'otro', skip to results
export const earlyExitConditions = {
  purpose: {
    value: 'otro',
    skipTo: 'results',
  },
};

// Skip conditions - skip certain questions based on previous answers
export const skipConditions = {
  support_level: {
    // Skip support_level question if injury is muscular (always elastic)
    skipWhen: (answers) => answers.injury_category === 'muscular',
  },
};
