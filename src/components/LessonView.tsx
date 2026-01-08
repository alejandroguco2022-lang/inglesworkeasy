import { Lesson } from '@/types/english-plan';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, Lightbulb, BookOpen, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  onStartQuiz: () => void;
}

export function LessonView({ lesson, onComplete, onStartQuiz }: LessonViewProps) {
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'phrases'>('vocab');

  const tabs = [
    { id: 'vocab', label: 'Vocabulario', icon: BookOpen },
    { id: 'grammar', label: 'Gramática', icon: Lightbulb },
    { id: 'phrases', label: 'Frases', icon: MessageSquare },
  ] as const;

  return (
    <div className="animate-slide-up space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{lesson.title}</h2>
        <p className="text-muted-foreground">{lesson.titleEs}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-card text-foreground shadow-soft' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'vocab' && (
          <div className="space-y-3">
            {lesson.vocabulary.map((item, index) => (
              <Card key={index} className="p-4 shadow-soft hover:shadow-hover transition-all duration-300">
                <div className="flex items-start gap-4">
                  <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-lg font-bold text-foreground">{item.english}</span>
                      <span className="text-sm text-muted-foreground">/{item.pronunciation}/</span>
                    </div>
                    <p className="text-primary font-medium">{item.spanish}</p>
                    <div className="mt-2 p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-foreground italic">"{item.example}"</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.exampleEs}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'grammar' && (
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl gradient-primary">
                <Lightbulb className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">{lesson.grammar.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.grammar.titleEs}</p>
              </div>
            </div>
            
            <p className="text-foreground mb-4 leading-relaxed">{lesson.grammar.explanation}</p>
            
            <div className="space-y-2 mb-4">
              {lesson.grammar.examples.map((ex, index) => (
                <div key={index} className="p-3 bg-secondary rounded-lg">
                  <p className="font-medium text-foreground">{ex.english}</p>
                  <p className="text-sm text-muted-foreground">{ex.spanish}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-accent/10 rounded-xl border-l-4 border-accent">
              <p className="text-foreground font-medium">{lesson.grammar.tip}</p>
            </div>
          </Card>
        )}

        {activeTab === 'phrases' && (
          <div className="space-y-3">
            {lesson.phrases.map((phrase, index) => (
              <Card key={index} className="p-4 shadow-soft hover:shadow-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-secondary text-xs font-medium rounded-full text-muted-foreground">
                    {phrase.context}
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground mb-1">{phrase.english}</p>
                <p className="text-primary">{phrase.spanish}</p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onComplete} className="flex-1">
          Marcar como completada
        </Button>
        <Button variant="hero" onClick={onStartQuiz} className="flex-1">
          Tomar Quiz 📝
        </Button>
      </div>
    </div>
  );
}
