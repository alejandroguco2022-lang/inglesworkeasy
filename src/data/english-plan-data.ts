import { Week, DailyRoutine } from '@/types/english-plan';

export const dailyRoutine: DailyRoutine[] = [
  { time: '5 min', activity: 'Review yesterday\'s vocabulary with flashcards', activityEs: 'Repasa el vocabulario de ayer con tarjetas', duration: '5 minutos' },
  { time: '5 min', activity: 'Learn new words and phrases', activityEs: 'Aprende nuevas palabras y frases', duration: '5 minutos' },
  { time: '3 min', activity: 'Practice pronunciation out loud', activityEs: 'Practica la pronunciación en voz alta', duration: '3 minutos' },
  { time: '2 min', activity: 'Complete the daily quiz', activityEs: 'Completa el quiz diario', duration: '2 minutos' },
];

export const motivationalMessages = [
  { english: "Every expert was once a beginner. Keep going! 🌟", spanish: "Todo experto fue una vez un principiante. ¡Sigue adelante! 🌟" },
  { english: "Small steps every day lead to big results! 🚀", spanish: "¡Pequeños pasos cada día llevan a grandes resultados! 🚀" },
  { english: "You're doing amazing! Consistency is key! 💪", spanish: "¡Lo estás haciendo increíble! ¡La constancia es la clave! 💪" },
  { english: "Learning a language is a journey, enjoy the ride! 🎯", spanish: "Aprender un idioma es un viaje, ¡disfruta el camino! 🎯" },
  { english: "Today's practice is tomorrow's fluency! ✨", spanish: "¡La práctica de hoy es la fluidez de mañana! ✨" },
];

export const weeks: Week[] = [
  {
    weekNumber: 1,
    title: "Hello, World!",
    titleEs: "¡Hola, Mundo!",
    theme: "Basic Greetings & Introductions",
    themeEs: "Saludos Básicos y Presentaciones",
    icon: "👋",
    conversationTopics: ["Meeting someone new", "Introducing yourself at work", "Basic phone greetings"],
    lessons: [
      {
        id: "w1-d1",
        title: "Greetings",
        titleEs: "Saludos",
        description: "Learn to say hello and goodbye in different situations",
        vocabulary: [
          { english: "Hello", spanish: "Hola", pronunciation: "heh-LOH", example: "Hello, how are you?", exampleEs: "Hola, ¿cómo estás?" },
          { english: "Good morning", spanish: "Buenos días", pronunciation: "gud MOR-ning", example: "Good morning, everyone!", exampleEs: "¡Buenos días a todos!" },
          { english: "Good afternoon", spanish: "Buenas tardes", pronunciation: "gud af-ter-NOON", example: "Good afternoon, Mr. Smith", exampleEs: "Buenas tardes, Sr. Smith" },
          { english: "Goodbye", spanish: "Adiós", pronunciation: "gud-BAI", example: "Goodbye, see you tomorrow!", exampleEs: "¡Adiós, nos vemos mañana!" },
          { english: "Nice to meet you", spanish: "Mucho gusto", pronunciation: "nais tu MIT yu", example: "Nice to meet you, I'm Carlos", exampleEs: "Mucho gusto, soy Carlos" },
        ],
        grammar: {
          title: "The Verb 'To Be'",
          titleEs: "El Verbo 'Ser/Estar'",
          explanation: "El verbo 'to be' es como un camaleón - cambia según quién habla. Piensa en él como tu identificación personal en inglés.",
          examples: [
            { english: "I am Carlos", spanish: "Yo soy Carlos" },
            { english: "You are my friend", spanish: "Tú eres mi amigo" },
            { english: "He is a developer", spanish: "Él es un desarrollador" },
            { english: "She is my boss", spanish: "Ella es mi jefa" },
          ],
          tip: "🎯 Truco fácil: I AM (yo soy), YOU ARE (tú eres), HE/SHE IS (él/ella es)"
        },
        phrases: [
          { english: "How are you?", spanish: "¿Cómo estás?", context: "Casual greeting" },
          { english: "I'm fine, thank you", spanish: "Estoy bien, gracias", context: "Polite response" },
          { english: "What's your name?", spanish: "¿Cuál es tu nombre?", context: "Meeting someone" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "How do you say 'Buenos días' in English?", options: ["Good night", "Good morning", "Good afternoon", "Hello"], correctAnswer: "Good morning", explanation: "'Good morning' se usa desde que amanece hasta el mediodía (12pm)" },
          { id: "q2", type: "translation", question: "Translate: 'Nice to meet you'", correctAnswer: "Mucho gusto", explanation: "Esta frase se usa cuando conoces a alguien por primera vez" },
          { id: "q3", type: "fill-blank", question: "I ___ a student", options: ["am", "is", "are", "be"], correctAnswer: "am", explanation: "Con 'I' (yo) siempre usamos 'am'" },
        ]
      },
      {
        id: "w1-d2",
        title: "Introducing Yourself",
        titleEs: "Presentándote",
        description: "Learn to talk about yourself",
        vocabulary: [
          { english: "Name", spanish: "Nombre", pronunciation: "neim", example: "My name is Ana", exampleEs: "Mi nombre es Ana" },
          { english: "From", spanish: "De (origen)", pronunciation: "from", example: "I am from Mexico", exampleEs: "Soy de México" },
          { english: "Work", spanish: "Trabajo/Trabajar", pronunciation: "werk", example: "I work at Google", exampleEs: "Trabajo en Google" },
          { english: "Live", spanish: "Vivir", pronunciation: "liv", example: "I live in the city", exampleEs: "Vivo en la ciudad" },
          { english: "Speak", spanish: "Hablar", pronunciation: "spiik", example: "I speak Spanish", exampleEs: "Hablo español" },
        ],
        grammar: {
          title: "Subject Pronouns",
          titleEs: "Pronombres Personales",
          explanation: "Los pronombres son las palabras que usamos para reemplazar nombres. Son como apodos cortos para las personas.",
          examples: [
            { english: "I am learning English", spanish: "Yo estoy aprendiendo inglés" },
            { english: "You are a programmer", spanish: "Tú eres programador" },
            { english: "We are a team", spanish: "Nosotros somos un equipo" },
            { english: "They are from Spain", spanish: "Ellos son de España" },
          ],
          tip: "🎯 I = Yo, You = Tú/Ustedes, He = Él, She = Ella, We = Nosotros, They = Ellos"
        },
        phrases: [
          { english: "My name is...", spanish: "Mi nombre es...", context: "Formal introduction" },
          { english: "I'm from...", spanish: "Soy de...", context: "Telling your origin" },
          { english: "I work as a...", spanish: "Trabajo como...", context: "Telling your job" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "Complete: '___ am from Mexico'", options: ["He", "I", "She", "You"], correctAnswer: "I", explanation: "'I' es el pronombre para hablar de ti mismo" },
          { id: "q2", type: "translation", question: "Translate: 'Trabajo como desarrollador'", correctAnswer: "I work as a developer", explanation: "'Work as' significa 'trabajar como'" },
        ]
      },
      {
        id: "w1-d3",
        title: "Numbers 1-20",
        titleEs: "Números del 1 al 20",
        description: "Learn to count and use numbers",
        vocabulary: [
          { english: "One, Two, Three", spanish: "Uno, Dos, Tres", pronunciation: "wan, tu, zri", example: "I have two computers", exampleEs: "Tengo dos computadoras" },
          { english: "Ten", spanish: "Diez", pronunciation: "ten", example: "There are ten people", exampleEs: "Hay diez personas" },
          { english: "Fifteen", spanish: "Quince", pronunciation: "fif-TEEN", example: "The meeting is at fifteen past", exampleEs: "La reunión es a las y quince" },
          { english: "Twenty", spanish: "Veinte", pronunciation: "TWEN-ti", example: "I need twenty minutes", exampleEs: "Necesito veinte minutos" },
        ],
        grammar: {
          title: "Plural Nouns",
          titleEs: "Sustantivos en Plural",
          explanation: "Para hacer plural en inglés, generalmente añadimos una 's' al final. ¡Es más fácil que en español!",
          examples: [
            { english: "One computer → Two computers", spanish: "Una computadora → Dos computadoras" },
            { english: "One file → Three files", spanish: "Un archivo → Tres archivos" },
          ],
          tip: "🎯 Regla simple: La mayoría de palabras solo necesitan una 's' al final para ser plural"
        },
        phrases: [
          { english: "How many?", spanish: "¿Cuántos?", context: "Asking quantity" },
          { english: "I have...", spanish: "Tengo...", context: "Expressing possession" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "How do you say 'quince' in English?", options: ["Fourteen", "Fifteen", "Fifty", "Five"], correctAnswer: "Fifteen", explanation: "Fifteen = 15, Fifty = 50, cuidado con la confusión!" },
        ]
      },
    ]
  },
  {
    weekNumber: 2,
    title: "At Work",
    titleEs: "En el Trabajo",
    theme: "Workplace Basics & IT Vocabulary",
    themeEs: "Vocabulario Básico del Trabajo e Informática",
    icon: "💼",
    conversationTopics: ["Asking for help at work", "Describing your job", "Basic tech support"],
    lessons: [
      {
        id: "w2-d1",
        title: "Office Vocabulary",
        titleEs: "Vocabulario de Oficina",
        description: "Learn words for the workplace",
        vocabulary: [
          { english: "Computer", spanish: "Computadora", pronunciation: "kom-PYOO-ter", example: "My computer is fast", exampleEs: "Mi computadora es rápida" },
          { english: "Meeting", spanish: "Reunión", pronunciation: "MII-ting", example: "We have a meeting at 10", exampleEs: "Tenemos una reunión a las 10" },
          { english: "Email", spanish: "Correo electrónico", pronunciation: "II-meil", example: "I'll send you an email", exampleEs: "Te enviaré un correo" },
          { english: "Project", spanish: "Proyecto", pronunciation: "PRO-yekt", example: "This project is important", exampleEs: "Este proyecto es importante" },
          { english: "Deadline", spanish: "Fecha límite", pronunciation: "DED-lain", example: "The deadline is Friday", exampleEs: "La fecha límite es el viernes" },
        ],
        grammar: {
          title: "Present Simple",
          titleEs: "Presente Simple",
          explanation: "Usamos el presente simple para hablar de rutinas, hábitos y verdades generales. ¡Es como describir tu día normal!",
          examples: [
            { english: "I work from 9 to 5", spanish: "Trabajo de 9 a 5" },
            { english: "She checks emails every morning", spanish: "Ella revisa correos cada mañana" },
            { english: "We have meetings on Mondays", spanish: "Tenemos reuniones los lunes" },
          ],
          tip: "🎯 Con he/she/it, añade 's' al verbo: I work → She works"
        },
        phrases: [
          { english: "Can you help me?", spanish: "¿Puedes ayudarme?", context: "Asking for help" },
          { english: "I need to...", spanish: "Necesito...", context: "Expressing needs" },
          { english: "Could you send me...?", spanish: "¿Podrías enviarme...?", context: "Polite request" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "She ___ at 9am every day", options: ["work", "works", "working", "worked"], correctAnswer: "works", explanation: "Con 'she' en presente simple, añadimos 's' al verbo" },
        ]
      },
      {
        id: "w2-d2",
        title: "IT & Systems",
        titleEs: "TI y Sistemas",
        description: "Technical vocabulary for IT professionals",
        vocabulary: [
          { english: "Server", spanish: "Servidor", pronunciation: "SER-ver", example: "The server is down", exampleEs: "El servidor está caído" },
          { english: "Database", spanish: "Base de datos", pronunciation: "DEI-ta-beis", example: "Check the database", exampleEs: "Revisa la base de datos" },
          { english: "Code", spanish: "Código", pronunciation: "kohd", example: "I'm writing code", exampleEs: "Estoy escribiendo código" },
          { english: "Bug", spanish: "Error/Bug", pronunciation: "bag", example: "There's a bug in the system", exampleEs: "Hay un error en el sistema" },
          { english: "Deploy", spanish: "Desplegar", pronunciation: "di-PLOI", example: "We need to deploy the update", exampleEs: "Necesitamos desplegar la actualización" },
        ],
        grammar: {
          title: "There is / There are",
          titleEs: "Hay (singular/plural)",
          explanation: "Usamos 'There is' para UNA cosa y 'There are' para VARIAS cosas. Es como decir 'Hay' en español.",
          examples: [
            { english: "There is a problem", spanish: "Hay un problema" },
            { english: "There are many users", spanish: "Hay muchos usuarios" },
          ],
          tip: "🎯 There IS = singular (uno), There ARE = plural (varios)"
        },
        phrases: [
          { english: "The system is not working", spanish: "El sistema no está funcionando", context: "Reporting problems" },
          { english: "Let me check", spanish: "Déjame revisar", context: "Troubleshooting" },
        ],
        quiz: [
          { id: "q1", type: "fill-blank", question: "There ___ three bugs in the code", options: ["is", "are", "be", "been"], correctAnswer: "are", explanation: "'Three bugs' es plural, así que usamos 'are'" },
        ]
      },
    ]
  },
  {
    weekNumber: 3,
    title: "Daily Life",
    titleEs: "Vida Diaria",
    theme: "Everyday Activities & Time",
    themeEs: "Actividades Cotidianas y el Tiempo",
    icon: "🌅",
    conversationTopics: ["Describing your day", "Making plans", "Talking about habits"],
    lessons: [
      {
        id: "w3-d1",
        title: "Daily Routine",
        titleEs: "Rutina Diaria",
        description: "Talk about your daily activities",
        vocabulary: [
          { english: "Wake up", spanish: "Despertar", pronunciation: "weik ap", example: "I wake up at 7am", exampleEs: "Me despierto a las 7am" },
          { english: "Breakfast", spanish: "Desayuno", pronunciation: "BREK-fast", example: "I have breakfast at home", exampleEs: "Desayuno en casa" },
          { english: "Commute", spanish: "Ir al trabajo", pronunciation: "ko-MYUT", example: "I commute by bus", exampleEs: "Voy al trabajo en autobús" },
          { english: "Lunch", spanish: "Almuerzo", pronunciation: "lanch", example: "Lunch is at noon", exampleEs: "El almuerzo es al mediodía" },
          { english: "Rest", spanish: "Descansar", pronunciation: "rest", example: "I rest after work", exampleEs: "Descanso después del trabajo" },
        ],
        grammar: {
          title: "Time Expressions",
          titleEs: "Expresiones de Tiempo",
          explanation: "Para decir la hora en inglés, piensa en el reloj como una pizza. Usamos 'at' para horas específicas.",
          examples: [
            { english: "At 9 o'clock", spanish: "A las 9 en punto" },
            { english: "In the morning", spanish: "En la mañana" },
            { english: "Every day", spanish: "Todos los días" },
          ],
          tip: "🎯 AT = hora exacta, IN = partes del día, ON = días de la semana"
        },
        phrases: [
          { english: "What time do you...?", spanish: "¿A qué hora...?", context: "Asking about schedule" },
          { english: "I usually...", spanish: "Usualmente yo...", context: "Describing habits" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "I have a meeting ___ 3pm", options: ["in", "on", "at", "to"], correctAnswer: "at", explanation: "Usamos 'at' para horas específicas" },
        ]
      },
    ]
  },
  {
    weekNumber: 4,
    title: "Making Connections",
    titleEs: "Haciendo Conexiones",
    theme: "Social Interactions & Feelings",
    themeEs: "Interacciones Sociales y Sentimientos",
    icon: "🤝",
    conversationTopics: ["Small talk", "Expressing opinions", "Making friends at work"],
    lessons: [
      {
        id: "w4-d1",
        title: "Feelings & Emotions",
        titleEs: "Sentimientos y Emociones",
        description: "Express how you feel",
        vocabulary: [
          { english: "Happy", spanish: "Feliz", pronunciation: "HA-pi", example: "I'm happy today", exampleEs: "Estoy feliz hoy" },
          { english: "Tired", spanish: "Cansado", pronunciation: "TAI-erd", example: "I'm tired after work", exampleEs: "Estoy cansado después del trabajo" },
          { english: "Excited", spanish: "Emocionado", pronunciation: "ik-SAI-ted", example: "I'm excited about the project", exampleEs: "Estoy emocionado por el proyecto" },
          { english: "Worried", spanish: "Preocupado", pronunciation: "WO-rid", example: "I'm worried about the deadline", exampleEs: "Estoy preocupado por la fecha límite" },
          { english: "Confident", spanish: "Seguro/Confiado", pronunciation: "KON-fi-dent", example: "I feel confident", exampleEs: "Me siento seguro" },
        ],
        grammar: {
          title: "Adjectives",
          titleEs: "Adjetivos",
          explanation: "En inglés, los adjetivos van ANTES del sustantivo. ¡Es al revés que en español!",
          examples: [
            { english: "A good developer", spanish: "Un buen desarrollador" },
            { english: "An important meeting", spanish: "Una reunión importante" },
          ],
          tip: "🎯 Español: sustantivo + adjetivo. Inglés: adjetivo + sustantivo"
        },
        phrases: [
          { english: "How do you feel?", spanish: "¿Cómo te sientes?", context: "Asking about feelings" },
          { english: "I feel...", spanish: "Me siento...", context: "Expressing feelings" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "That was a ___ meeting (interesante)", options: ["meeting interesting", "interesting meeting", "interestingly meeting"], correctAnswer: "interesting meeting", explanation: "En inglés el adjetivo va antes del sustantivo" },
        ]
      },
    ]
  },
  {
    weekNumber: 5,
    title: "Problem Solving",
    titleEs: "Resolviendo Problemas",
    theme: "Asking Questions & Getting Help",
    themeEs: "Haciendo Preguntas y Pidiendo Ayuda",
    icon: "🔧",
    conversationTopics: ["Asking for clarification", "Explaining problems", "Technical support"],
    lessons: [
      {
        id: "w5-d1",
        title: "Asking Questions",
        titleEs: "Haciendo Preguntas",
        description: "Learn to ask questions correctly",
        vocabulary: [
          { english: "What", spanish: "Qué", pronunciation: "wat", example: "What is the problem?", exampleEs: "¿Cuál es el problema?" },
          { english: "Where", spanish: "Dónde", pronunciation: "wer", example: "Where is the file?", exampleEs: "¿Dónde está el archivo?" },
          { english: "When", spanish: "Cuándo", pronunciation: "wen", example: "When is the deadline?", exampleEs: "¿Cuándo es la fecha límite?" },
          { english: "Why", spanish: "Por qué", pronunciation: "wai", example: "Why is this happening?", exampleEs: "¿Por qué está pasando esto?" },
          { english: "How", spanish: "Cómo", pronunciation: "hau", example: "How does this work?", exampleEs: "¿Cómo funciona esto?" },
        ],
        grammar: {
          title: "Question Formation",
          titleEs: "Formación de Preguntas",
          explanation: "Para hacer preguntas en inglés, movemos el verbo 'to be' o añadimos 'do/does' al inicio.",
          examples: [
            { english: "Is he working? (¿Está trabajando?)", spanish: "Are you ready? (¿Estás listo?)" },
            { english: "Do you understand?", spanish: "¿Entiendes?" },
            { english: "Does it work?", spanish: "¿Funciona?" },
          ],
          tip: "🎯 Con he/she/it usa 'does', con I/you/we/they usa 'do'"
        },
        phrases: [
          { english: "Can you explain?", spanish: "¿Puedes explicar?", context: "Asking for explanation" },
          { english: "I don't understand", spanish: "No entiendo", context: "Expressing confusion" },
          { english: "Could you repeat that?", spanish: "¿Podrías repetir eso?", context: "Asking for repetition" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "___ the server working?", options: ["Do", "Does", "Is", "Are"], correctAnswer: "Is", explanation: "'The server' es singular y usamos 'is' para preguntar con el verbo 'to be'" },
        ]
      },
    ]
  },
  {
    weekNumber: 6,
    title: "Putting It Together",
    titleEs: "Uniendo Todo",
    theme: "Conversations & Real Practice",
    themeEs: "Conversaciones y Práctica Real",
    icon: "🎯",
    conversationTopics: ["Job interviews", "Team meetings", "Professional networking"],
    lessons: [
      {
        id: "w6-d1",
        title: "Professional Conversations",
        titleEs: "Conversaciones Profesionales",
        description: "Practice complete work conversations",
        vocabulary: [
          { english: "Interview", spanish: "Entrevista", pronunciation: "IN-ter-vyu", example: "I have an interview tomorrow", exampleEs: "Tengo una entrevista mañana" },
          { english: "Experience", spanish: "Experiencia", pronunciation: "ik-SPIR-i-ens", example: "I have 5 years of experience", exampleEs: "Tengo 5 años de experiencia" },
          { english: "Skills", spanish: "Habilidades", pronunciation: "skilz", example: "My skills include Python and SQL", exampleEs: "Mis habilidades incluyen Python y SQL" },
          { english: "Goals", spanish: "Metas", pronunciation: "golz", example: "My goals are...", exampleEs: "Mis metas son..." },
          { english: "Opportunity", spanish: "Oportunidad", pronunciation: "op-or-TU-ni-ti", example: "This is a great opportunity", exampleEs: "Esta es una gran oportunidad" },
        ],
        grammar: {
          title: "Future with 'Will' and 'Going to'",
          titleEs: "Futuro con 'Will' y 'Going to'",
          explanation: "Usamos 'will' para decisiones del momento y 'going to' para planes. ¡Ambos hablan del futuro!",
          examples: [
            { english: "I will help you", spanish: "Te ayudaré (decisión ahora)" },
            { english: "I'm going to study tonight", spanish: "Voy a estudiar esta noche (plan)" },
          ],
          tip: "🎯 Will = decisiones espontáneas, Going to = planes ya decididos"
        },
        phrases: [
          { english: "I'm looking forward to...", spanish: "Espero con ansias...", context: "Expressing anticipation" },
          { english: "I would like to...", spanish: "Me gustaría...", context: "Polite requests" },
          { english: "Thank you for the opportunity", spanish: "Gracias por la oportunidad", context: "Professional gratitude" },
        ],
        quiz: [
          { id: "q1", type: "multiple-choice", question: "I ___ start the project next week (plan)", options: ["will", "am going to", "would", "could"], correctAnswer: "am going to", explanation: "Usamos 'going to' para planes ya decididos" },
        ]
      },
    ]
  },
];
