import React from 'react';
import { BookOpen, Map, Scale, HelpCircle, Award, Compass, Search } from 'lucide-react';

export type NavTab = 'dashboard' | 'units' | 'atlas' | 'comparisons' | 'questions' | 'exam';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onOpenSearch: () => void;
  onOpenFinalExam: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  completedLessonsCount,
  totalLessonsCount,
  onOpenSearch,
  onOpenFinalExam
}) => {
  const completionPercentage = Math.round((completedLessonsCount / Math.max(1, totalLessonsCount)) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 text-right cursor-pointer group"
              title="الصفحة الرئيسية للمنصة"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-xs group-hover:bg-amber-700 transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none group-hover:text-amber-700 transition-colors">
                  منصة الدراسات الاجتماعية
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  الصف الثاني الإعدادي · الفصل الدراسي الأول
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'text-amber-700 font-bold border-b-2 border-amber-600'
                  : 'hover:text-slate-900'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => onSelectTab('units')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'units'
                  ? 'text-amber-700 font-bold border-b-2 border-amber-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              الوحدات والدروس
            </button>
            <button
              onClick={() => onSelectTab('atlas')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'atlas'
                  ? 'text-amber-700 font-bold border-b-2 border-amber-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" />
              أطلس الخرائط التفاعلي
            </button>
            <button
              onClick={() => onSelectTab('comparisons')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'comparisons'
                  ? 'text-amber-700 font-bold border-b-2 border-amber-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <Scale className="w-4 h-4" />
              المقارنات الشاملة
            </button>
            <button
              onClick={() => onSelectTab('questions')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'questions'
                  ? 'text-amber-700 font-bold border-b-2 border-amber-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              بنك الأسئلة والامتحانات
            </button>
          </nav>

          {/* Zone 3: 1 primary action + search trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="بحث في المنهج والمصطلحات والأسئلة"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenFinalExam}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>اختبار الفصل الدراسي الأول</span>
            </button>

            {/* Quick completion indicator */}
            <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 tabular-nums">
                  {completionPercentage}%
                </span>
                <span className="text-[10px] text-slate-600 block leading-none">
                  {completedLessonsCount} من {totalLessonsCount} دروس
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-emerald-500 transition-all duration-500"
                  style={{ height: `${completionPercentage}%` }}
                />
                <span className="relative z-10 text-[10px] font-bold text-slate-800">
                  {completedLessonsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav strip */}
      <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            currentTab === 'dashboard' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          الرئيسية
        </button>
        <button
          onClick={() => onSelectTab('units')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            currentTab === 'units' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          الوحدات والدروس
        </button>
        <button
          onClick={() => onSelectTab('atlas')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            currentTab === 'atlas' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          الخرائط التفاعلية
        </button>
        <button
          onClick={() => onSelectTab('comparisons')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            currentTab === 'comparisons' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          المقارنات
        </button>
        <button
          onClick={() => onSelectTab('questions')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
            currentTab === 'questions' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          بنك الأسئلة
        </button>
      </div>
    </header>
  );
};
