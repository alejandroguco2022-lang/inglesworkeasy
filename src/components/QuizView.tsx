import { useState } from 'react';
import { QuizQuestion } from '@/types/english-plan';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function QuizView({ questions, onComplete, onBack }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; correct: boolean; explanation: string }[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, {
      question: currentQuestion.question,
      correct: answer === currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation
    }]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);

  if (currentIndex >= questions.length) {
    return (
      <div className="animate-slide-up text-center py-8">
        <div className="inline-flex p-6 rounded-full gradient-primary mb-6 shadow-glow">
          <Trophy className="w-16 h-16 text-primary-foreground" />
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-2">¡Quiz Completado!</h2>
        <p className="text-muted-foreground mb-6">Tu puntuación final</p>
        
        <div className={`
          text-6xl font-bold mb-6
          ${percentage >= 70 ? 'text-success' : percentage >= 50 ? 'text-warning' : 'text-destructive'}
        `}>
          {percentage}%
        </div>
        
        <p className="text-lg text-foreground mb-8">
          {percentage >= 70 
            ? '¡Excelente trabajo! 🎉 Estás progresando muy bien.' 
            : percentage >= 50 
              ? '¡Buen esfuerzo! 💪 Sigue practicando.' 
              : 'No te preocupes, la práctica hace al maestro. 📚'
          }
        </p>

        <div className="space-y-3 mb-8">
          {answers.map((answer, index) => (
            <Card key={index} className={`p-4 ${answer.correct ? 'border-success/50' : 'border-destructive/50'}`}>
              <div className="flex items-start gap-3">
                {answer.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                )}
                <div className="text-left">
                  <p className="font-medium text-foreground">{answer.question}</p>
                  <p className="text-sm text-muted-foreground mt-1">{answer.explanation}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <Button variant="hero" size="lg" onClick={onBack}>
          Volver a la lección
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-muted-foreground">
          Pregunta {currentIndex + 1} de {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${i < currentIndex 
                  ? 'gradient-primary' 
                  : i === currentIndex 
                    ? 'bg-primary animate-pulse-soft' 
                    : 'bg-secondary'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <Card className="p-6 shadow-card mb-6">
        <h3 className="text-xl font-bold text-foreground mb-6">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
              className={`
                w-full p-4 rounded-xl text-left font-medium transition-all duration-300
                ${showResult
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-success text-success-foreground'
                    : option === selectedAnswer
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-secondary text-muted-foreground'
                  : 'bg-secondary hover:bg-primary/10 text-foreground hover:scale-[1.02]'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-background/50 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
                {showResult && option === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 ml-auto" />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Explanation */}
      {showResult && (
        <Card className={`p-4 mb-6 animate-scale-in ${isCorrect ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <p className="text-sm text-foreground mt-1">{currentQuestion.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Next button */}
      {showResult && (
        <Button variant="hero" size="lg" className="w-full" onClick={handleNext}>
          {isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
