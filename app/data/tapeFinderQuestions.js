export const questions = {
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
        {value: 'hombro', label: 'Hombro'},
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

  purpose: {
    id: 'purpose',
    question: '¿Cuál es tu objetivo?',
    type: 'single',
    options: [
      {
        value: 'recuperacion',
        label: 'Recuperación',
        description: 'Estoy lesionado y quiero sanar',
      },
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
    ],
    metafieldKey: 'purpose',
  },

  experience: {
    id: 'experience',
    question: '¿Has usado tape deportivo antes?',
    type: 'single',
    options: [
      {value: 'principiante', label: 'No, es mi primera vez'},
      {value: 'con_experiencia', label: 'Sí, ya lo he usado'},
    ],
    metafieldKey: 'experience_level',
  },
};

export const quizFlow = ['injury_category', 'body_part', 'purpose', 'experience'];
