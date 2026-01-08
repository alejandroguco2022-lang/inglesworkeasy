import { useState } from 'react';
import { weeks } from '@/data/english-plan-data';
import { WeekCard } from '@/components/WeekCard';
import { LessonView } from '@/components/LessonView';
import { QuizView } from '@/components/QuizView';
import { ConversationSimulator } from '@/components/ConversationSimulator';
import { TranslationExercise } from '@/components/TranslationExercise';
import { DailyRoutineView } from '@/components/DailyRoutineView';
import { AuthModal } from '@/components/AuthModal';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useUserProgress } from '@/hooks/useUserProgress';
import { 
  BookOpen, 
  MessageSquare, 
  Languages, 
  Calendar,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  LogIn,
  LogOut,
  Loader2
} from 'lucide-react';

type View = 'home' | 'week' | 'lesson' | 'quiz' | 'conversation' | 'translation' | 'routine';

export default function Index() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, loading: authLoading, signUp, signIn, signOut } = useAuth();
  const { progress, loading: progressLoading, completeLesson, saveQuizScore } = useUserProgress(user);

  const currentWeek = weeks[selectedWeek];
  const currentLesson = currentWeek?.lessons[selectedLesson];

  const getWeekProgress = (weekIndex: number) => {
    const week = weeks[weekIndex];
    const completed = week.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    return Math.round((completed / week.lessons.length) * 100);
  };

  const totalProgress = Math.round(
    (progress.completedLessons.length / weeks.reduce((acc, w) => acc + w.lessons.length, 0)) * 100
  );

  const handleBack = () => {
    if (currentView === 'lesson' || currentView === 'quiz') {
      setCurrentView('week');
    } else {
      setCurrentView('home');
    }
  };

  const handleCompleteLesson = async () => {
    if (currentLesson) {
      await completeLesson(currentLesson.id);
    }
    setCurrentView('week');
  };

  const handleQuizComplete = async (score: number) => {
    if (currentLesson) {
      await saveQuizScore(currentLesson.id, score, currentLesson.quiz.length);
    }
  };

  const navItems = [
    { id: 'home' as View, icon: BookOpen, label: 'Plan' },
    { id: 'conversation' as View, icon: MessageSquare, label: 'Conversar' },
    { id: 'translation' as View, icon: Languages, label: 'Traducir' },
    { id: 'routine' as View, icon: Calendar, label: 'Rutina' },
  ];

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {currentView !== 'home' && !['conversation', 'translation', 'routine'].includes(currentView) ? (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ChevronLeft className="w-5 h-5 mr-1" />
                Volver
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl gradient-primary">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground">English in 6 Weeks</h1>
                  <p className="text-xs text-muted-foreground">Tu camino al inglés</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="font-bold text-foreground">{progress.streak}🔥</span>
              </div>
              {user ? (
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                  <LogIn className="w-4 h-4 mr-1" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {currentView === 'home' && (
          <div className="space-y-6 animate-slide-up">
            {/* Login prompt for guests */}
            {!user && (
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  💡 <button onClick={() => setShowAuthModal(true)} className="font-semibold text-primary hover:underline">
                    Inicia sesión
                  </button> para guardar tu progreso y mantener tu racha.
                </p>
              </div>
            )}

            {/* Progress Overview */}
            <div className="p-5 rounded-2xl gradient-card shadow-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-foreground">Tu Progreso General</h2>
                <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {progress.completedLessons.length} lecciones completadas de {weeks.reduce((acc, w) => acc + w.lessons.length, 0)}
              </p>
            </div>

            {/* Weeks */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg text-foreground">Plan de 6 Semanas</h2>
              {weeks.map((week, index) => (
                <WeekCard
                  key={week.weekNumber}
                  week={week}
                  isActive={index === 0 && progress.completedLessons.length === 0}
                  isCompleted={getWeekProgress(index) === 100}
                  isLocked={index > 0 && getWeekProgress(index - 1) < 50}
                  progress={getWeekProgress(index)}
                  onClick={() => {
                    if (!(index > 0 && getWeekProgress(index - 1) < 50)) {
                      setSelectedWeek(index);
                      setCurrentView('week');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'week' && currentWeek && (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <span className="text-5xl mb-3 block">{currentWeek.icon}</span>
              <h2 className="text-2xl font-bold text-foreground">{currentWeek.title}</h2>
              <p className="text-muted-foreground">{currentWeek.titleEs}</p>
              <p className="text-sm text-primary mt-2">{currentWeek.themeEs}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Lecciones de esta semana</h3>
              {currentWeek.lessons.map((lesson, index) => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(index);
                      setCurrentView('lesson');
                    }}
                    className={`
                      w-full text-left p-4 rounded-xl transition-all duration-300 shadow-soft hover:shadow-hover
                      ${isCompleted ? 'bg-success/10 border-2 border-success/30' : 'bg-card'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center font-bold
                        ${isCompleted ? 'bg-success text-success-foreground' : 'gradient-primary text-primary-foreground'}
                      `}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.titleEs}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Conversation Topics */}
            <div className="p-4 bg-secondary rounded-xl">
              <h4 className="font-semibold text-foreground mb-2">💬 Temas de conversación</h4>
              <ul className="space-y-1">
                {currentWeek.conversationTopics.map((topic, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {currentView === 'lesson' && currentLesson && (
          <LessonView
            lesson={currentLesson}
            onComplete={handleCompleteLesson}
            onStartQuiz={() => setCurrentView('quiz')}
          />
        )}

        {currentView === 'quiz' && currentLesson && (
          <QuizView
            questions={currentLesson.quiz}
            onComplete={handleQuizComplete}
            onBack={() => setCurrentView('lesson')}
          />
        )}

        {currentView === 'conversation' && <ConversationSimulator />}
        {currentView === 'translation' && <TranslationExercise />}
        {currentView === 'routine' && <DailyRoutineView streak={progress.streak} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id || 
                (item.id === 'home' && ['week', 'lesson', 'quiz'].includes(currentView));
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-xl transition-all duration-300
                    ${isActive ? 'gradient-primary text-primary-foreground' : ''}
                  `}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onSignUp={signUp}
        onSignIn={signIn}
      />
    </div>
  );
}
