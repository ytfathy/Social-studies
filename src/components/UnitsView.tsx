import React from 'react';
import { Unit, LessonContent, StudentProgress } from '../types/curriculum';
import { allUnits } from '../data/curriculumData';
import { BookOpen, CheckCircle2, ChevronLeft, Award, FileText, ArrowLeft } from 'lucide-react';

interface UnitsViewProps {
  progress: StudentProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenUnitAssessment: (unit: Unit) => void;
}

export const UnitsView: React.FC<UnitsViewProps> = ({
  progress,
  onSelectLesson,
  onOpenUnitAssessment
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="text-right border-b border-slate-200 pb-5">
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded inline-block mb-1.5">
          منهج الصف الثاني الإعدادي · الفصل الدراسي الأول
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          فهرس الوحدات والدروس المعتمدة
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          اختر أي درس لبدء المذاكرة التفاعلية وحل التمارين والخرائط، أو خض التقييم الختامي للوحدة
        </p>
      </div>

      {/* Units List */}
      <div className="space-y-10">
        {allUnits.map(unit => {
          const completedCount = unit.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const percentage = Math.round((completedCount / unit.lessons.length) * 100);

          return (
            <div
              key={unit.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs text-right"
            >
              {/* Unit Header with Cover Art */}
              <div className="relative bg-slate-900 text-white p-6 sm:p-8 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-25 bg-cover bg-center"
                  style={{ backgroundImage: `url(${unit.image})` }}
                />
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400">
                    <span>الوحدة رقم {unit.unitNumber}</span>
                    <span>·</span>
                    <span>{unit.lessons.length} دروس</span>
                    <span>·</span>
                    <span>{percentage}% مكتمل</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-2">
                    {unit.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {unit.description}
                  </p>

                  <button
                    onClick={() => onOpenUnitAssessment(unit)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>فتح التقييم الختامي على الوحدة {unit.unitNumber}</span>
                  </button>
                </div>
              </div>

              {/* Learning Objectives box */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block mb-1.5">
                  نواتج تعلم الوحدة (ما ستكتسبه بنهاية دراستها):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {unit.learningObjectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lessons Cards */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {unit.lessons.map(lesson => {
                  const isDone = progress.completedLessons.includes(lesson.id);
                  const quizScore = progress.quizScores[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`p-5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between hover:shadow-sm ${
                        isDone
                          ? 'bg-emerald-50/20 border-emerald-200 hover:border-emerald-400'
                          : 'bg-white border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                            الدرس 0{lesson.lessonNumber}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                            isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {isDone ? 'تمت المذاكرة' : 'لم يبدأ بعد'}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1.5">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                          {lesson.heroIntro}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium">{lesson.pageRange}</span>
                        <div className="flex items-center gap-2">
                          {quizScore && (
                            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded tabular-nums">
                              الاختبار: {quizScore.highestScore}/{quizScore.total}
                            </span>
                          )}
                          <span className="font-bold text-amber-700 flex items-center gap-1">
                            <span>دخول الدرس</span>
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
