import React, { useState } from 'react';
import { getAllComparisons } from '../data/curriculumData';
import { ComparisonView } from './ComparisonView';
import { Scale, BookOpen, Filter, Search } from 'lucide-react';

interface ComparisonsHubProps {
  onOpenLessonByTitle: (title: string) => void;
}

export const ComparisonsHub: React.FC<ComparisonsHubProps> = () => {
  const allComps = getAllComparisons();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const filteredComps = allComps.filter(item => {
    const matchesUnit = selectedUnit === 'all' || item.unitTitle.includes(selectedUnit);
    const matchesQuery = !searchQuery.trim() ||
      item.table.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.table.entityA.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.table.entityB.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-md">
        <div className="flex items-center gap-2.5 text-xs font-bold text-amber-400 mb-2">
          <Scale className="w-4 h-4" />
          <span>مركز المقارنات المنهجية الشاملة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
          جداول المقارنة بين الظواهر الجغرافية والحضارات
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          أهم جداول المقارنة المنصوص عليها في كتاب الدراسات الاجتماعية: قارن بين آسيا وأوروبا، الطاقة الأحفورية والمتجددة، حضارات العراق وفينيقيا، ممالك اليمن، الهند والصين، نظم الغابات، والحشائش والصحاري، وإسبرطة وأثينا، والفن القبطي.
        </p>

        {/* Filter Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مقارنة أو ظاهرة أو دولة..."
              className="w-full pl-3 pr-10 py-2.5 text-xs bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-slate-400 text-right"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['all', 'الملامح الطبيعية', 'الحضارات القديمة في قارة آسيا', 'النُّظُم البيئية', 'الحضارات القديمة في قارة أوروبا'].map((unitName, i) => (
              <button
                key={i}
                onClick={() => setSelectedUnit(unitName === 'all' ? 'all' : unitName)}
                className={`px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  (selectedUnit === 'all' && unitName === 'all') || selectedUnit === unitName
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {unitName === 'all' ? 'جميع الوحدات' : unitName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparisons Feed */}
      <div className="space-y-6">
        {filteredComps.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Scale className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">لا توجد مقارنات مطابقة للبحث</p>
          </div>
        ) : (
          filteredComps.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 pr-2">
                <span className="font-semibold text-amber-800">{item.unitTitle}</span>
                <span>·</span>
                <span>درس: {item.lessonTitle}</span>
              </div>
              <ComparisonView comparison={item.table} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
