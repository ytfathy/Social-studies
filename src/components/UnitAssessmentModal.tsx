import React, { useState } from 'react';
import { Unit } from '../types/curriculum';
import { QuestionBankView } from './QuestionBankView';
import { X, Award, BookOpen, CheckCircle2 } from 'lucide-react';

interface UnitAssessmentModalProps {
  unit: Unit | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const UnitAssessmentModal: React.FC<UnitAssessmentModalProps> = ({
  unit,
  isOpen,
  onClose,
  onSelectLesson
}) => {
  if (!isOpen || !unit) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {unit.assessment.title}
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {unit.assessment.page} بكتاب الوزارة المعتمد
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-right">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">توجيه امتحاني: </span>
            هذه الأسئلة هي التقييم الختامي الرسمي الوارد في نهاية الوحدة في كتاب المدرسة، وتشمل أسئلة الخريطة، وصح وخطأ مع التصويب، والاختيار من متعدد، وبم تفسر، وما النتائج. أجب بنفسك أولاً ثم اعرض الإجابة النموذجية.
          </div>

          <QuestionBankView
            questions={unit.assessment.questions}
            title={unit.assessment.title}
            subtitle={`تقييم شامل لدروس الوحدة ${unit.unitNumber}`}
          />
        </div>
      </div>
    </div>
  );
};
