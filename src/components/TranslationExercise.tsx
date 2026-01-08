import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface TranslationItem {
  spanish: string;
  english: string;
  structure: string;
  tips: string[];
}

const exercises: TranslationItem[] = [
  {
    spanish: "Necesito ayuda con el servidor",
    english: "I need help with the server",
    structure: "Sujeto + need + complemento",
    tips: ["'Necesitar' = 'need'", "'Ayuda' = 'help'", "'Con' = 'with'"]
  },
  {
    spanish: "¿Cuándo es la reunión?",
    english: "When is the meeting?",
    structure: "Palabra interrogativa + verbo to be + sujeto",
    tips: ["'Cuándo' = 'When'", "'Es' = 'is'", "En preguntas, el verbo va antes del sujeto"]
  },
  {
    spanish: "Trabajo de lunes a viernes",
    english: "I work from Monday to Friday",
    structure: "Sujeto + verbo + from...to...",
    tips: ["'De...a' = 'from...to'", "Los días de la semana van en mayúscula"]
  },
  {
    spanish: "El código tiene un error",
    english: "The code has an error",
    structure: "Sujeto + has/have + complemento",
    tips: ["'Tiene' = 'has' (para he/she/it)", "'Un' = 'an' antes de vocal"]
  },
  {
    spanish: "¿Puedes enviarme el archivo?",
    english: "Can you send me the file?",
    structure: "Can + sujeto + verbo + complemento",
    tips: ["'Puedes' = 'Can you'", "'Enviarme' = 'send me'", "'El archivo' = 'the file'"]
  },
  {
    spanish: "Estoy trabajando en el proyecto",
    english: "I am working on the project",
    structure: "Sujeto + am/is/are + verbo-ing",
    tips: ["Presente continuo: to be + verbo-ing", "'En' (proyectos) = 'on'"]
  },
];

export function TranslationExercise() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentExercise = exercises[currentIndex];

  const checkAnswer = () => {
    const normalizedUser = userAnswer.toLowerCase().trim().replace(/[?.!]/g, '');
    const normalizedCorrect = currentExercise.english.toLowerCase().replace(/[?.!]/g, '');
    setIsCorrect(normalizedUser === normalizedCorrect);
    setShowResult(true);
  };

  const nextExercise = () => {
    setCurrentIndex((prev) => (prev + 1) % exercises.length);
    setUserAnswer('');
    setShowResult(false);
  };

  const resetExercises = () => {
    setCurrentIndex(0);
    setUserAnswer('');
    setShowResult(false);
  };

  return (
    <div className="animate-slide-up space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Traducción y Gramática</h2>
        <p className="text-muted-foreground">Traduce las oraciones y aprende las reglas</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">
          Ejercicio {currentIndex + 1} de {exercises.length}
        </span>
        <Button variant="ghost" size="sm" onClick={resetExercises}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reiniciar
        </Button>
      </div>

      {/* Exercise Card */}
      <Card className="p-6 shadow-card">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Traduce al inglés:</p>
          <p className="text-2xl font-bold text-foreground">"{currentExercise.spanish}"</p>
        </div>

        <Input
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Escribe tu traducción aquí..."
          className="mb-4 text-lg"
          onKeyPress={(e) => e.key === 'Enter' && !showResult && checkAnswer()}
          disabled={showResult}
        />

        {!showResult ? (
          <Button variant="hero" className="w-full" onClick={checkAnswer} disabled={!userAnswer.trim()}>
            Verificar respuesta
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Result */}
            <div className={`
              p-4 rounded-xl flex items-start gap-3
              ${isCorrect ? 'bg-success/10' : 'bg-destructive/10'}
            `}>
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive shrink-0" />
              )}
              <div>
                <p className={`font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                  {isCorrect ? '¡Excelente!' : 'Casi...'}
                </p>
                {!isCorrect && (
                  <p className="text-foreground mt-1">
                    Respuesta correcta: <span className="font-semibold">{currentExercise.english}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Structure explanation */}
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="font-semibold text-primary mb-2">📐 Estructura:</p>
              <p className="text-foreground">{currentExercise.structure}</p>
            </div>

            {/* Tips */}
            <div className="p-4 bg-accent/10 rounded-xl">
              <p className="font-semibold text-accent mb-2">💡 Consejos:</p>
              <ul className="space-y-1">
                {currentExercise.tips.map((tip, index) => (
                  <li key={index} className="text-foreground text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="hero" className="w-full" onClick={nextExercise}>
              Siguiente ejercicio
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
