import React from 'react';
import { Unit, LessonContent, StudentProgress } from '../types/curriculum';
import { allUnits, allLessons } from '../data/curriculumData';
import { 
  BookOpen, 
  Map, 
  Scale, 
  HelpCircle, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  ChevronLeft,
  Flame,
  FileText,
  Compass
} from 'lucide-react';

interface DashboardProps {
  progress: StudentProgress;
  onSelectLesson: (lessonId: string) => void;
  onSelectUnit: (unitId: string) => void;
  onOpenAtlas: () => void;
  onOpenComparisons: () => void;
  onOpenQuestions: () => void;
  onOpenFinalExam: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onSelectLesson,
  onSelectUnit,
  onOpenAtlas,
  onOpenComparisons,
  onOpenQuestions,
  onOpenFinalExam
}) => {
  const completedCount = progress.completedLessons.length;
  const totalCount = allLessons.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Resume last active lesson
  const lastActiveLesson = allLessons.find(l => l.id === progress.lastActiveLessonId) || allLessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-900/40">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>المنهج الدراسي المصري الجديد المطور 2026 / 2027</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black mb-3 tracking-tight leading-tight">
            منصة الدراسات الاجتماعية التفاعلية
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed mb-6 font-medium">
            مصر وعلاقتها بآسيا وأوروبا (الأرض والحضارة والتنمية) · الصف الثاني الإعدادي (الفصل الدراسي الأول). منصتك الرقمية الشاملة للخرائط، المقارنات، الإنفوجرافيك، وبنك الأسئلة المعتمد.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectLesson(lastActiveLesson.id)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>متابعة المذاكرة: {lastActiveLesson.title}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenFinalExam}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>اختبار نهاية الفصل الدراسي</span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark-free pattern */}
        <div className="absolute -left-12 -bottom-12 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Student Progress Overview Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">إنجاز الدروس</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 tabular-nums">{completedCount}</span>
              <span className="text-xs text-slate-400 font-bold">من {totalCount} دروس</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">نسبة الإتقان العامة</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-600 tabular-nums">{percentage}%</span>
              <span className="text-xs text-slate-400 font-bold">من المنهج</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">البطاقات المتقنة</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-sky-600 tabular-nums">
                {progress.flashcardKnownList.length}
              </span>
              <span className="text-xs text-slate-400 font-bold">بطاقة ذكية</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">بطاقات تحتاج لمراجعة</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-rose-600 tabular-nums">
                {progress.flashcardReviewList.length}
              </span>
              <span className="text-xs text-slate-400 font-bold">مفهوم للمراجعة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Feature Hub */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <span>الأقسام الرئيسية السريعة للمنصة</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">تصفح شامل لكل الموارد</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={onOpenAtlas}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              أطلس الخرائط التفاعلي
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              جميع خرائط التضاريس والمعادن والغابات والحضارات مع وضع التحدي التفاعلي.
            </p>
          </div>

          <div
            onClick={onOpenComparisons}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              مركز المقارنات الشاملة
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              جداول مقارنة منهجية واضحة تلخص أوجه الشبه والاختلاف وتضمن أعلى الدرجات.
            </p>
          </div>

          <div
            onClick={onOpenQuestions}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              بنك الأسئلة والامتحانات
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              أكثر من 150 سؤالاً من كتاب الوزارة مصنفة (بم تفسر، ما النتائج، دلل، صح وخطأ).
            </p>
          </div>

          <div
            onClick={onOpenFinalExam}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              الاختبار النهائي الشامل
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              محاكاة لاختبار نهاية الفصل الدراسي الأول مع توقيت زمني وشهادة تقدير فورية.
            </p>
          </div>
        </div>
      </div>

      {/* Units & Lessons Detailed Inventory Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              خريطة وحدات ودروس الكتاب المدرسي
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              يمكنك الدخول لأي درس مباشرة دون شروط والاطلاع على الخرائط والأنشطة
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            4 وحدات · 11 درساً كاملاً
          </span>
        </div>

        <div className="space-y-6">
          {allUnits.map(unit => {
            const unitCompletedCount = unit.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const unitPercent = Math.round((unitCompletedCount / unit.lessons.length) * 100);

            return (
              <div
                key={unit.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs"
              >
                {/* Unit Header Row */}
                <div className="relative bg-slate-900 text-white p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${unit.image})` }}
                  />
                  <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400">
                      <span>الوحدة {unit.unitNumber}</span>
                      <span>·</span>
                      <span>{unit.lessons.length} دروس</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black mb-1.5">
                      {unit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                      {unit.subtitle}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-4 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-slate-400 block font-medium">إنجاز الوحدة</span>
                      <span className="text-lg font-black text-amber-400 tabular-nums">
                        {unitPercent}% ({unitCompletedCount}/{unit.lessons.length})
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectUnit(unit.id)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      تقييم الوحدة الختامي
                    </button>
                  </div>
                </div>

                {/* Lessons Cards Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {unit.lessons.map(lesson => {
                    const isDone = progress.completedLessons.includes(lesson.id);
                    const quizResult = progress.quizScores[lesson.id];

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`p-5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between hover:shadow-sm ${
                          isDone
                            ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-400'
                            : 'bg-white border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                              الدرس 0{lesson.lessonNumber}
                            </span>
                            <div className="flex items-center gap-2">
                              {quizResult && (
                                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded tabular-nums">
                                  درجة الاختبار: {quizResult.highestScore}/{quizResult.total}
                                </span>
                              )}
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                                isDone
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                <CheckCircle2 className="w-3 h-3" />
                                {isDone ? 'مكتمل' : 'لم يبدأ'}
                              </span>
                            </div>
                          </div>

                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                            {lesson.title}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {lesson.heroIntro}
                          </p>
                        </div>

                        {/* Card metadata footers */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span className="font-medium text-[11px]">{lesson.pageRange}</span>
                          <span className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                            <span>فتح الدرس</span>
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </span>
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
    </div>
  );
};
