import React, { useState } from 'react';
import { InfographicSection } from '../types/curriculum';
import { Maximize2, Minimize2, Printer, ArrowDown, Sparkles, Compass, CheckCircle } from 'lucide-react';

interface LessonInfographicProps {
  infographic: InfographicSection;
  lessonTitle: string;
}

export const LessonInfographic: React.FC<LessonInfographicProps> = ({
  infographic,
  lessonTitle
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md transition-all duration-300 ${
        isFullScreen ? 'fixed inset-0 z-50 rounded-none overflow-y-auto p-6 bg-slate-950' : 'p-6 my-6'
      }`}
    >
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-amber-400">
              إنفوجرافيك تعليمي بصري
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">{lessonTitle}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {infographic.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="طباعة الإنفوجرافيك"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">طباعة</span>
          </button>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title={isFullScreen ? 'تصغير' : 'ملء الشاشة'}
          >
            {isFullScreen ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">إغلاق ملء الشاشة</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">عرض كامل</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Kicker */}
      <div className="my-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <p className="text-sm text-slate-300 leading-relaxed">
          {infographic.summary}
        </p>
      </div>

      {/* Visual Flow Steps / Timeline */}
      {infographic.flowSteps && infographic.flowSteps.length > 0 && (
        <div className="my-6">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            مسار التطور والمفاهيم المتسلسلة
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {infographic.flowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex flex-col justify-between hover:border-amber-500/50 transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-black mb-3">
                    0{step.step}
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1.5">
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
                {idx < infographic.flowSteps!.length - 1 && (
                  <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 text-slate-600 z-10">
                    ←
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories & Classifications */}
      {infographic.categories && infographic.categories.length > 0 && (
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {infographic.categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-4.5"
            >
              <h5 className="text-sm font-bold text-sky-400 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                {cat.name}
              </h5>
              <ul className="space-y-2">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Takeaway footer */}
      {infographic.takeaway && (
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-start gap-3 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
          <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-300 block mb-1">
              الخلاصة الجوهرية للدرس:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {infographic.takeaway}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
