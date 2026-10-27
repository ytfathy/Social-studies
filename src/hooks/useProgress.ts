import { useState, useEffect } from 'react';
import { StudentProgress } from '../types/curriculum';

const STORAGE_KEY = 'prep2_social_studies_progress_v1';

const defaultProgress: StudentProgress = {
  completedLessons: [],
  bookmarkedQuestions: [],
  flashcardReviewList: [],
  flashcardKnownList: [],
  quizScores: {},
  unitAssessmentScores: {},
  lastActiveLessonId: 'lesson-1-1'
};

export function useProgress() {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const toggleLessonCompleted = (lessonId: string) => {
    setProgress(prev => {
      const exists = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter(id => id !== lessonId)
          : [...prev.completedLessons, lessonId]
      };
    });
  };

  const markLessonCompleted = (lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
  };

  const recordQuizScore = (lessonId: string, score: number, total: number) => {
    setProgress(prev => {
      const existing = prev.quizScores[lessonId];
      const attempts = (existing?.attempts || 0) + 1;
      const highestScore = Math.max(existing?.highestScore || 0, score);
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [lessonId]: {
            highestScore,
            lastScore: score,
            attempts,
            total
          }
        }
      };
    });
  };

  const markFlashcardStatus = (cardId: string, status: 'known' | 'review') => {
    setProgress(prev => {
      const cleanKnown = prev.flashcardKnownList.filter(id => id !== cardId);
      const cleanReview = prev.flashcardReviewList.filter(id => id !== cardId);
      if (status === 'known') {
        return {
          ...prev,
          flashcardKnownList: [...cleanKnown, cardId],
          flashcardReviewList: cleanReview
        };
      } else {
        return {
          ...prev,
          flashcardKnownList: cleanKnown,
          flashcardReviewList: [...cleanReview, cardId]
        };
      }
    });
  };

  const resetFlashcardsForLesson = (cardIds: string[]) => {
    setProgress(prev => ({
      ...prev,
      flashcardKnownList: prev.flashcardKnownList.filter(id => !cardIds.includes(id)),
      flashcardReviewList: prev.flashcardReviewList.filter(id => !cardIds.includes(id))
    }));
  };

  const recordUnitAssessmentScore = (unitId: string, score: number, total: number) => {
    setProgress(prev => {
      const existing = prev.unitAssessmentScores[unitId];
      const highestScore = Math.max(existing?.highestScore || 0, score);
      return {
        ...prev,
        unitAssessmentScores: {
          ...prev.unitAssessmentScores,
          [unitId]: {
            highestScore,
            total
          }
        }
      };
    });
  };

  const recordFinalExamScore = (score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      finalExamScore: {
        score,
        total,
        date: new Date().toLocaleDateString('ar-EG')
      }
    }));
  };

  const setLastActiveLesson = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      lastActiveLessonId: lessonId
    }));
  };

  const resetAllProgress = () => {
    setProgress(defaultProgress);
  };

  return {
    progress,
    toggleLessonCompleted,
    markLessonCompleted,
    recordQuizScore,
    markFlashcardStatus,
    resetFlashcardsForLesson,
    recordUnitAssessmentScore,
    recordFinalExamScore,
    setLastActiveLesson,
    resetAllProgress
  };
}
