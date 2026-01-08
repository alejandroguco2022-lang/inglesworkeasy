import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserProgress {
  currentWeek: number;
  currentDay: number;
  streak: number;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; totalQuestions: number; date: string }[];
}

export function useUserProgress(user: User | null) {
  const [progress, setProgress] = useState<UserProgress>({
    currentWeek: 1,
    currentDay: 1,
    streak: 0,
    completedLessons: [],
    quizScores: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgress({
        currentWeek: 1,
        currentDay: 1,
        streak: 0,
        completedLessons: [],
        quizScores: [],
      });
      setLoading(false);
      return;
    }

    try {
      // Fetch user progress
      const { data: userProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Fetch completed lessons
      const { data: completedLessons } = await supabase
        .from('completed_lessons')
        .select('lesson_id')
        .eq('user_id', user.id);

      // Fetch quiz scores
      const { data: quizScores } = await supabase
        .from('quiz_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      setProgress({
        currentWeek: userProgress?.current_week ?? 1,
        currentDay: userProgress?.current_day ?? 1,
        streak: userProgress?.streak ?? 0,
        completedLessons: completedLessons?.map(l => l.lesson_id) ?? [],
        quizScores: quizScores?.map(q => ({
          lessonId: q.lesson_id,
          score: q.score,
          totalQuestions: q.total_questions,
          date: q.completed_at,
        })) ?? [],
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateStreak = useCallback(async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingProgress) {
      const lastActivity = existingProgress.last_activity_date;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = existingProgress.streak;
      
      if (lastActivity === yesterdayStr) {
        newStreak += 1;
      } else if (lastActivity !== today) {
        newStreak = 1;
      }

      await supabase
        .from('user_progress')
        .update({ 
          streak: newStreak, 
          last_activity_date: today 
        })
        .eq('user_id', user.id);

      setProgress(prev => ({ ...prev, streak: newStreak }));
    } else {
      await supabase
        .from('user_progress')
        .insert({ 
          user_id: user.id, 
          streak: 1, 
          last_activity_date: today 
        });

      setProgress(prev => ({ ...prev, streak: 1 }));
    }
  }, [user]);

  const completeLesson = useCallback(async (lessonId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('completed_lessons')
        .upsert({ 
          user_id: user.id, 
          lesson_id: lessonId 
        }, { onConflict: 'user_id,lesson_id' });

      setProgress(prev => ({
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId) 
          ? prev.completedLessons 
          : [...prev.completedLessons, lessonId],
      }));

      await updateStreak();
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  }, [user, updateStreak]);

  const saveQuizScore = useCallback(async (lessonId: string, score: number, totalQuestions: number) => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('quiz_scores')
        .insert({ 
          user_id: user.id, 
          lesson_id: lessonId,
          score,
          total_questions: totalQuestions,
        })
        .select()
        .single();

      if (data) {
        setProgress(prev => ({
          ...prev,
          quizScores: [{
            lessonId: data.lesson_id,
            score: data.score,
            totalQuestions: data.total_questions,
            date: data.completed_at,
          }, ...prev.quizScores],
        }));
      }

      await updateStreak();
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  }, [user, updateStreak]);

  return {
    progress,
    loading,
    completeLesson,
    saveQuizScore,
    refetch: fetchProgress,
  };
}
