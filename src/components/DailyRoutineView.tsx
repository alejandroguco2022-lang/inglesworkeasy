import { dailyRoutine, motivationalMessages } from '@/data/english-plan-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Flame, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DailyRoutineViewProps {
  streak: number;
}

export function DailyRoutineView({ streak }: DailyRoutineViewProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [motivationalMessage, setMotivationalMessage] = useState(motivationalMessages[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setMotivationalMessage(motivationalMessages[randomIndex]);
  }, []);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const allCompleted = completedSteps.length === dailyRoutine.length;

  return (
    <div className="animate-slide-up space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Tu Rutina Diaria</h2>
        <p className="text-muted-foreground">15 minutos que cambiarán tu vida</p>
      </div>

      {/* Streak Card */}
      <Card className="p-6 gradient-primary text-primary-foreground shadow-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-foreground/20 rounded-xl">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Tu racha actual</p>
              <p className="text-4xl font-bold">{streak} días 🔥</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/80 text-sm">Meta semanal</p>
            <p className="text-2xl font-bold">7 días</p>
          </div>
        </div>
      </Card>

      {/* Motivational Message */}
      <Card className="p-5 bg-accent/10 border-accent/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-accent shrink-0" />
          <div>
            <p className="font-medium text-foreground">{motivationalMessage.english}</p>
            <p className="text-sm text-muted-foreground mt-1">{motivationalMessage.spanish}</p>
          </div>
        </div>
      </Card>

      {/* Daily Steps */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Tu rutina de 15 minutos
        </h3>
        
        {dailyRoutine.map((step, index) => (
          <Card 
            key={index}
            className={`
              p-4 cursor-pointer transition-all duration-300
              ${completedSteps.includes(index) 
                ? 'bg-success/10 border-success/30' 
                : 'shadow-soft hover:shadow-hover'
              }
            `}
            onClick={() => toggleStep(index)}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center font-bold
                ${completedSteps.includes(index) 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-secondary text-foreground'
                }
              `}>
                {completedSteps.includes(index) ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {step.time}
                  </span>
                </div>
                <p className={`font-medium ${completedSteps.includes(index) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {step.activityEs}
                </p>
                <p className="text-sm text-muted-foreground">{step.activity}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Completion */}
      {allCompleted && (
        <Card className="p-6 gradient-accent text-accent-foreground text-center animate-scale-in shadow-glow">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-xl font-bold mb-2">¡Rutina Completada!</h3>
          <p className="text-accent-foreground/80">
            ¡Excelente trabajo! Has completado tu práctica de hoy.
            <br />
            ¡Nos vemos mañana! 💪
          </p>
        </Card>
      )}

      {!allCompleted && (
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            {completedSteps.length} de {dailyRoutine.length} pasos completados
          </p>
        </div>
      )}
    </div>
  );
}
