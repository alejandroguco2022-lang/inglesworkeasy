import { Week } from '@/types/english-plan';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Lock, Play } from 'lucide-react';

interface WeekCardProps {
  week: Week;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  onClick: () => void;
}

export function WeekCard({ week, isActive, isCompleted, isLocked, progress, onClick }: WeekCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        w-full text-left p-5 rounded-2xl transition-all duration-300 animate-scale-in
        ${isActive 
          ? 'gradient-primary text-primary-foreground shadow-glow scale-[1.02]' 
          : isCompleted
            ? 'bg-card border-2 border-success shadow-soft'
            : isLocked
              ? 'bg-muted opacity-60 cursor-not-allowed'
              : 'bg-card shadow-soft hover:shadow-hover hover:scale-[1.01]'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          text-4xl p-3 rounded-xl
          ${isActive ? 'bg-primary-foreground/20' : 'bg-secondary'}
        `}>
          {week.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`
              text-xs font-bold px-2 py-0.5 rounded-full
              ${isActive 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-primary/10 text-primary'
              }
            `}>
              Semana {week.weekNumber}
            </span>
            {isCompleted && (
              <CheckCircle2 className="w-4 h-4 text-success" />
            )}
            {isLocked && (
              <Lock className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          
          <h3 className={`
            font-bold text-lg truncate
            ${isActive ? 'text-primary-foreground' : 'text-foreground'}
          `}>
            {week.title}
          </h3>
          
          <p className={`
            text-sm truncate
            ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}
          `}>
            {week.themeEs}
          </p>
          
          {!isLocked && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}>
                  Progreso
                </span>
                <span className={`font-semibold ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {progress}%
                </span>
              </div>
              <Progress 
                value={progress} 
                className={`h-2 ${isActive ? 'bg-primary-foreground/20' : ''}`}
                indicatorClassName={isActive ? 'bg-primary-foreground' : ''}
              />
            </div>
          )}
        </div>
        
        {isActive && (
          <div className="bg-primary-foreground/20 p-2 rounded-full">
            <Play className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  );
}
