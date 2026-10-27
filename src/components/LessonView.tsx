import React, { useState } from 'react';
import { LessonContent, Unit } from '../types/curriculum';
import { InteractiveMap } from './InteractiveMap';
import { ComparisonView } from './ComparisonView';
import { LessonInfographic } from './LessonInfographic';
import { QuestionBankView } from './QuestionBankView';
import { QuizEngine } from './QuizEngine';
import { FlashcardDeck } from './FlashcardDeck';
import { RevisionSheetModal } from './RevisionSheetModal';
import { 
  BookOpen, 
  Map, 
  Scale, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  Printer, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

interface LessonViewProps {
  lesson: LessonContent;
  unit: Unit;
  allLessons: LessonContent[];
  onSelectLesson: (lessonId: string) => void;
  onBackToUnits: () => void;
  isCompleted: boolean;
  onToggleCompleted: (lessonId: string) => void;
  onRecordQuizScore: (lessonId: string, score: number, total: number) => void;
  knownFlashcards: string[];
  reviewFlashcards: string[];
  onMarkFlashcard: (cardId: string, status: 'known' | 'review') => void;
  onResetFlashcards: (cardIds: string[]) => void;
}

type LessonTab = 'explanation' | 'map' | 'comparisons' | 'infographic' | 'questions' | 'quiz' | 'flashcards';

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  unit,
  allLessons,
  onSelectLesson,
  onBackToUnits,
  isCompleted,
  onToggleCompleted,
  onRecordQuizScore,
  knownFlashcards,
  reviewFlashcards,
  onMarkFlashcard,
  onResetFlashcards
}) => {
  const [activeTab, setActiveTab] = useState<LessonTab>('explanation');
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);

  const currentLessonIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Back bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={onBackToUnits}
            className="hover:text-slate-900 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>الوحدات الدراسية</span>
          </button>
          <span>/</span>
          <span>الوحدة {unit.unitNumber}: {unit.title}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRevisionModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>مذكرة الملخص والطباعة</span>
          </button>

          <button
            onClick={() => onToggleCompleted(lesson.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'تم إكمال الدرس بنجاح' : 'تحديد الدرس كمكتمل'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header Title Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-amber-800 mb-2">
          <span>الدرس رقم 0{lesson.lessonNumber}</span>
          <span>·</span>
          <span>{lesson.pageRange} بكتاب الوزارة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
          {lesson.heroIntro}
        </p>

        {/* Learning Objectives Pill Strip */}
        <div className="mt-5 pt-4 border-t border-amber-200/60">
          <span className="text-xs font-bold text-slate-800 block mb-2">
            أهداف التعلم ومخرجات الدرس:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {lesson.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Navigation Tabs for Lesson Sections */}
      <div className="border-b border-slate-200 mb-8 sticky top-16 z-30 bg-white/95 backdrop-blur-md pt-2">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'explanation'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>شرح الدرس المفصل</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>الخريطة التفاعلية ({lesson.mapData.points.length})</span>
          </button>

          {lesson.comparisons.length > 0 && (
            <button
              onClick={() => setActiveTab('comparisons')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'comparisons'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>جداول المقارنة ({lesson.comparisons.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('infographic')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'infographic'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>الإنفوجرافيك التعليمي</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>بنك الأسئلة ({lesson.questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>اختبار الدرس ({lesson.quiz.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>البطاقات الذكية ({lesson.flashcards.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Detailed Explanation (Section A) */}
      {activeTab === 'explanation' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Explanation Sections */}
          {lesson.explanationSections.map((sec, idx) => (
            <section
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-right"
            >
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
                {sec.heading}
              </h3>

              {sec.subheading && (
                <h4 className="text-sm font-bold text-amber-800 mb-3">
                  {sec.subheading}
                </h4>
              )}

              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="mt-4 space-y-2.5 pt-3 border-t border-slate-100">
                  {sec.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.highlightCallout && (
                <div className={`mt-5 p-4 rounded-xl border flex items-start gap-3 ${
                  sec.highlightCallout.type === 'enrichment'
                    ? 'bg-purple-50/70 border-purple-200/80 text-purple-950'
                    : 'bg-amber-50/70 border-amber-200/80 text-amber-950'
                }`}>
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold block mb-1">
                      {sec.highlightCallout.title}
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {sec.highlightCallout.content}
                    </p>
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Key Terms Grid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-100 text-amber-800">
                <BookOpen className="w-4 h-4" />
              </span>
              <span>المفاهيم والمصطلحات الرئيسية في الدرس</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.keyTerms.map((term, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-extrabold text-sm text-amber-900 mb-1.5">
                    {term.term}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Causes and Effects */}
          {lesson.causesAndEffects.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="p-1 rounded-md bg-sky-100 text-sky-800">
                  <Scale className="w-4 h-4" />
                </span>
                <span>شبكة الأسباب والنتائج في الدرس (بم تفسر وما النتائج)</span>
              </h3>

              <div className="space-y-3">
                {lesson.causesAndEffects.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className="font-bold text-amber-800 shrink-0">السبب (بم تفسر):</span>
                      <span className="text-slate-800 leading-relaxed">{item.cause}</span>
                    </div>
                    <div className="flex items-start gap-2 pt-1.5 border-t border-slate-200/60">
                      <span className="font-bold text-emerald-800 shrink-0">النتيجة (ما النتائج):</span>
                      <span className="text-slate-800 leading-relaxed">{item.effect}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Summary */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <h3 className="text-base sm:text-lg font-extrabold text-amber-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>ملخص الدرس والكبسولة الختامية للمذاكرة</span>
            </h3>
            <ul className="space-y-2.5">
              {lesson.finalSummary.map((sum, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{sum}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Map (Section B) */}
      {activeTab === 'map' && (
        <div className="animate-in fade-in duration-200">
          <InteractiveMap
            title={lesson.mapData.mapTitle}
            mapType={lesson.mapData.mapType}
            points={lesson.mapData.points}
            challengeQuestions={lesson.mapData.interactiveQuestions}
          />
        </div>
      )}

      {/* Tab 3: Comparison Tables (Section C) */}
      {activeTab === 'comparisons' && (
        <div className="animate-in fade-in duration-200 space-y-6">
          {lesson.comparisons.map(comp => (
            <ComparisonView key={comp.id} comparison={comp} />
          ))}
        </div>
      )}

      {/* Tab 4: Infographic (Section D) */}
      {activeTab === 'infographic' && (
        <div className="animate-in fade-in duration-200">
          <LessonInfographic
            infographic={lesson.infographic}
            lessonTitle={lesson.title}
          />
        </div>
      )}

      {/* Tab 5: Question Bank (Section E) */}
      {activeTab === 'questions' && (
        <div className="animate-in fade-in duration-200">
          <QuestionBankView
            questions={lesson.questions}
            title={`بنك أسئلة: ${lesson.title}`}
          />
        </div>
      )}

      {/* Tab 6: Interactive Quiz (Section F) */}
      {activeTab === 'quiz' && (
        <div className="animate-in fade-in duration-200">
          <QuizEngine
            quiz={lesson.quiz}
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            onRecordScore={onRecordQuizScore}
          />
        </div>
      )}

      {/* Tab 7: Flashcards (Section G) */}
      {activeTab === 'flashcards' && (
        <div className="animate-in fade-in duration-200">
          <FlashcardDeck
            flashcards={lesson.flashcards}
            lessonTitle={lesson.title}
            knownList={knownFlashcards}
            reviewList={reviewFlashcards}
            onMarkStatus={onMarkFlashcard}
            onReset={onResetFlashcards}
          />
        </div>
      )}

      {/* Bottom Lesson Navigation */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => {
              onSelectLesson(prevLesson.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-right cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">الدرس السابق</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">{prevLesson.title}</span>
            </div>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            onClick={() => {
              onSelectLesson(nextLesson.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 p-3 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/60 transition-colors text-left cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-amber-700 block font-semibold">الدرس التالي</span>
              <span className="text-xs sm:text-sm font-bold text-amber-950">{nextLesson.title}</span>
            </div>
            <ChevronLeft className="w-5 h-5 text-amber-700" />
          </button>
        ) : (
          <button
            onClick={onBackToUnits}
            className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700 cursor-pointer"
          >
            <span>العودة لقائمة الوحدات</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Revision Sheet Modal */}
      <RevisionSheetModal
        lesson={lesson}
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
      />
    </div>
  );
};
