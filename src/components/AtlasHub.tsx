import React, { useState } from 'react';
import { allLessons } from '../data/curriculumData';
import { InteractiveMap } from './InteractiveMap';
import { Map, Compass, Layers, Globe2, BookOpen } from 'lucide-react';

interface AtlasHubProps {
  onOpenLesson: (lessonId: string) => void;
}

export const AtlasHub: React.FC<AtlasHubProps> = ({ onOpenLesson }) => {
  // Extract all maps from lessons
  const mapsList = allLessons.map(l => ({
    lessonId: l.id,
    lessonTitle: l.title,
    mapData: l.mapData
  }));

  const [selectedMapIndex, setSelectedMapIndex] = useState(0);
  const activeMap = mapsList[selectedMapIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-md">
        <div className="flex items-center gap-2.5 text-xs font-bold text-sky-400 mb-2">
          <Globe2 className="w-4 h-4" />
          <span>أطلس الخرائط التفاعلي المعتمد</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
          أطلس قارتي آسيا وأوروبا وحضارات العالم القديم
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          استكشف خرائط التضاريس، توزيع الثروات المعدنية ومصادر الطاقة، مسارات الحضارات وطريق الحرير، ونظم الغابات والبحار مع اختبارات تحديد المواقع المباشرة.
        </p>

        {/* Quick map selector strip */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {mapsList.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMapIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedMapIndex === idx
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{m.mapData.mapTitle.replace('خريطة ', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Interactive Map Container */}
      <div className="mb-8">
        <InteractiveMap
          title={activeMap.mapData.mapTitle}
          mapType={activeMap.mapData.mapType}
          points={activeMap.mapData.points}
          challengeQuestions={activeMap.mapData.interactiveQuestions}
        />
      </div>

      {/* Jump to associated lesson button */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span className="text-xs sm:text-sm font-bold text-amber-950">
            ترتبط هذه الخريطة بدرس: «{activeMap.lessonTitle}»
          </span>
        </div>
        <button
          onClick={() => onOpenLesson(activeMap.lessonId)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          فتح الدرس الكامل ←
        </button>
      </div>
    </div>
  );
};
