import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { UnitsView } from './components/UnitsView';
import { LessonView } from './components/LessonView';
import { AtlasHub } from './components/AtlasHub';
import { ComparisonsHub } from './components/ComparisonsHub';
import { QuestionsHub } from './components/QuestionsHub';
import { SearchModal } from './components/SearchModal';
import { TermExamModal } from './components/TermExamModal';
import { UnitAssessmentModal } from './components/UnitAssessmentModal';
import { useProgress } from './hooks/useProgress';
import { allUnits, allLessons, getLessonById, getUnitByLessonId } from './data/curriculumData';
import { Unit } from './types/curriculum';
import { BookOpen, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [activeAssessmentUnit, setActiveAssessmentUnit] = useState<Unit | null>(null);

  const {
    progress,
    toggleLessonCompleted,
    recordQuizScore,
    markFlashcardStatus,
    resetFlashcardsForLesson,
    recordFinalExamScore,
    setLastActiveLesson
  } = useProgress();

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setLastActiveLesson(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    setActiveLessonId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLesson = activeLessonId ? getLessonById(activeLessonId) : null;
  const activeUnit = activeLessonId ? getUnitByLessonId(activeLessonId) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        currentTab={activeLessonId ? 'units' : currentTab}
        onSelectTab={handleSelectTab}
        completedLessonsCount={progress.completedLessons.length}
        totalLessonsCount={allLessons.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFinalExam={() => setIsExamOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeLesson && activeUnit ? (
          <LessonView
            lesson={activeLesson}
            unit={activeUnit}
            allLessons={allLessons}
            onSelectLesson={handleSelectLesson}
            onBackToUnits={() => setActiveLessonId(null)}
            isCompleted={progress.completedLessons.includes(activeLesson.id)}
            onToggleCompleted={toggleLessonCompleted}
            onRecordQuizScore={recordQuizScore}
            knownFlashcards={progress.flashcardKnownList}
            reviewFlashcards={progress.flashcardReviewList}
            onMarkFlashcard={markFlashcardStatus}
            onResetFlashcards={resetFlashcardsForLesson}
          />
        ) : (
          <>
            {currentTab === 'dashboard' && (
              <Dashboard
                progress={progress}
                onSelectLesson={handleSelectLesson}
                onSelectUnit={(unitId) => {
                  const u = allUnits.find(item => item.id === unitId);
                  if (u) setActiveAssessmentUnit(u);
                }}
                onOpenAtlas={() => handleSelectTab('atlas')}
                onOpenComparisons={() => handleSelectTab('comparisons')}
                onOpenQuestions={() => handleSelectTab('questions')}
                onOpenFinalExam={() => setIsExamOpen(true)}
              />
            )}

            {currentTab === 'units' && (
              <UnitsView
                progress={progress}
                onSelectLesson={handleSelectLesson}
                onOpenUnitAssessment={(unit) => setActiveAssessmentUnit(unit)}
              />
            )}

            {currentTab === 'atlas' && (
              <AtlasHub onOpenLesson={handleSelectLesson} />
            )}

            {currentTab === 'comparisons' && (
              <ComparisonsHub onOpenLessonByTitle={(title) => {
                const l = allLessons.find(item => item.title === title);
                if (l) handleSelectLesson(l.id);
              }} />
            )}

            {currentTab === 'questions' && (
              <QuestionsHub onOpenFinalExam={() => setIsExamOpen(true)} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 text-right text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-600 flex items-center justify-center text-white text-xs font-black">
              د
            </div>
            <span className="font-bold text-slate-800">
              منصة الدراسات الاجتماعية التفاعلية · الصف الثاني الإعدادي (الفصل الدراسي الأول)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>كتاب الوزارة المعتمد: مصر وعلاقتها بآسيا وأوروبا</span>
            <span>·</span>
            <span>يتم حفظ تقدمك الدراسي محلياً على هذا الجهاز</span>
          </div>

          <p className="text-[11px] text-slate-400">
            جميع الحقوق التعليمية محفوظة لوزارة التربية والتعليم والتعليم الفني المصرية ©
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
      />

      <TermExamModal
        isOpen={isExamOpen}
        onClose={() => setIsExamOpen(false)}
        onRecordScore={recordFinalExamScore}
      />

      <UnitAssessmentModal
        unit={activeAssessmentUnit}
        isOpen={!!activeAssessmentUnit}
        onClose={() => setActiveAssessmentUnit(null)}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}
