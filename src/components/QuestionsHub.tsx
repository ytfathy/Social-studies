import React, { useState } from 'react';
import { getAllQuestions, allUnits, allLessons } from '../data/curriculumData';
import { generalTermQuestions } from '../data/termRevisionData';
import { QuestionBankView } from './QuestionBankView';
import { HelpCircle, BookOpen, Layers, Award } from 'lucide-react';

interface QuestionsHubProps {
  onOpenFinalExam: () => void;
}

export const QuestionsHub: React.FC<QuestionsHubProps> = ({ onOpenFinalExam }) => {
  const [activeTab, setActiveTab] = useState<'term_revision' | 'all_lessons'>('term_revision');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');

  const lessonQuestions = getAllQuestions().map(item => item.question);

  const displayedQuestions = activeTab === 'term_revision'
    ? generalTermQuestions
    : selectedUnitId === 'all'
      ? lessonQuestions
      : allUnits.find(u => u.id === selectedUnitId)?.lessons.flatMap(l => l.questions) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-md">
        <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-400 mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>مركز بنك الأسئلة والمراجعة الشاملة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
          بنك الأسئلة المعتمد والامتحانات النموذجية
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          أكبر بنك أسئلة لمادة الدراسات الاجتماعية للصف الثاني الإعدادي: تدرب على أسئلة كتاب الوزارة الرسمية، أسئلة علل وبم تفسر، ما النتائج، دلل تاريخياً، صح وخطأ مع التصويب، وأسئلة الخرائط.
        </p>

        {/* Action button to final exam */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('term_revision')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'term_revision'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              المراجعة العامة للفصل الدراسي الأول (ص 96 - 102)
            </button>
            <button
              onClick={() => setActiveTab('all_lessons')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all_lessons'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              أسئلة جميع دروس المنهج ({lessonQuestions.length})
            </button>
          </div>

          <button
            onClick={onOpenFinalExam}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>خوض اختبار نهاية الفصل الدراسي</span>
          </button>
        </div>
      </div>

      {/* Unit filter when in all_lessons mode */}
      {activeTab === 'all_lessons' && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-700 whitespace-nowrap">الوحدة:</span>
          <button
            onClick={() => setSelectedUnitId('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold cursor-pointer transition-colors ${
              selectedUnitId === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            جميع الوحدات
          </button>
          {allUnits.map(u => (
            <button
              key={u.id}
              onClick={() => setSelectedUnitId(u.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold cursor-pointer transition-colors ${
                selectedUnitId === u.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              الوحدة {u.unitNumber}: {u.title}
            </button>
          ))}
        </div>
      )}

      {/* Question bank view */}
      <QuestionBankView
        questions={displayedQuestions}
        title={activeTab === 'term_revision' ? 'المراجعة العامة على الفصل الدراسي الأول (كتاب الوزارة ص 96 - 102)' : 'بنك أسئلة دروس المنهج'}
        subtitle={`يضم هذا القسم ${displayedQuestions.length} سؤالاً وتدريباً مع الإجابات النموذجية`}
      />
    </div>
  );
};
