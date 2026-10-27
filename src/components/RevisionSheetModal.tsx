import React from 'react';
import { LessonContent } from '../types/curriculum';
import { X, Printer, BookOpen, CheckCircle, Lightbulb, FileText } from 'lucide-react';

interface RevisionSheetModalProps {
  lesson: LessonContent;
  isOpen: boolean;
  onClose: () => void;
}

export const RevisionSheetModal: React.FC<RevisionSheetModalProps> = ({
  lesson,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Topbar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                مذكرة المراجعة السريعة والامتحانية
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {lesson.title} · {lesson.pageRange}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة المذكرة</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-right print:p-0">
          {/* Header Banner */}
          <div className="border-b-2 border-amber-600 pb-4 text-center">
            <span className="text-xs font-bold text-amber-800 block mb-1">
              جمهورية مصر العربية · وزارة التربية والتعليم · الصف الثاني الإعدادي
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ملخص درس: {lesson.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              مصر وعلاقتها بآسيا وأوروبا (الفصل الدراسي الأول)
            </p>
          </div>

          {/* Core Ideas */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-3 border-amber-600 pr-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>أهم الأفكار والمعلومات الأساسية الواردة بالدرس</span>
            </h4>
            <ul className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {lesson.revisionSheet.coreIdeas.map((idea, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Terms */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-3 border-amber-600 pr-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>أهم المصطلحات والمفاهيم التي يجب حفظها</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.keyTerms.map((term, idx) => (
                <div key={idx} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
                  <span className="font-extrabold text-xs text-amber-950 block mb-1">
                    {term.term}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Causes and Effects */}
          {lesson.causesAndEffects.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-3 border-amber-600 pr-2">
                <span>أهم الأسباب والنتائج (بم تفسر وما النتائج)</span>
              </h4>
              <div className="space-y-2.5">
                {lesson.causesAndEffects.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <p className="text-amber-900 font-bold mb-1">
                      <span className="text-slate-500 font-normal">السبب: </span>
                      {item.cause}
                    </p>
                    <p className="text-emerald-900 font-bold">
                      <span className="text-slate-500 font-normal">النتيجة: </span>
                      {item.effect}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Exam Questions */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-r-3 border-amber-600 pr-2">
              <span>أهم الأسئلة الامتحانية المتكررة مع إجاباتها النموذجية</span>
            </h4>
            <div className="space-y-3">
              {lesson.revisionSheet.topExamQuestions.map((q, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {q.type}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                      {q.q}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 font-medium mr-2">
                    <span className="text-emerald-700 font-bold">الإجابة: </span>
                    {q.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
