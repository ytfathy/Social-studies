import React, { useState } from 'react';
import { QuestionItem, QuestionCategory } from '../types/curriculum';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Filter, Search, CheckCircle2 } from 'lucide-react';

interface QuestionBankViewProps {
  questions: QuestionItem[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const categoryLabels: Record<QuestionCategory, string> = {
  direct: 'سؤال وجواب مباشر',
  why: 'بم تفسر؟',
  results: 'ما النتائج المترتبة على؟',
  compare: 'قارن بين',
  prove: 'دلل على صحة العبارة',
  terms: 'ما المقصود بالمصطلح؟',
  complete: 'أكمل العبارات',
  mcq: 'اختر الإجابة الصحيحة',
  true_false: 'صح أم خطأ مع التصويب',
  map: 'أسئلة الخرائط',
  critical: 'التفكير والاستنتاج'
};

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  title = 'بنك الأسئلة والإجابات النموذجية',
  subtitle,
  compact = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyTextbook, setShowOnlyTextbook] = useState(false);

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const revealAll = () => {
    const all: Record<string, boolean> = {};
    questions.forEach(q => { all[q.id] = true; });
    setRevealedIds(all);
  };

  const hideAll = () => {
    setRevealedIds({});
  };

  const availableCategories = Array.from(new Set(questions.map(q => q.category)));

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSource = !showOnlyTextbook || q.isTextbookOriginal;
    const matchesQuery = !searchQuery.trim() || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSource && matchesQuery;
  });

  return (
    <div className="space-y-4 my-6">
      {/* Header & Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-amber-100 text-amber-800">
                <HelpCircle className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mr-7">
              {subtitle || `إجمالي ${questions.length} سؤالاً شاملاً مع الإجابات النموذجية ومصادر كتاب الوزارة`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={revealAll}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              عرض كل الإجابات
            </button>
            <button
              onClick={hideAll}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              إخفاء الكل
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة أو الإجابات..."
              className="w-full pl-3 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-right"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              جميع الأنواع ({questions.length})
            </button>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {categoryLabels[cat as QuestionCategory] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle textbook original only */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOnlyTextbook}
              onChange={(e) => setShowOnlyTextbook(e.target.checked)}
              className="w-3.5 h-3.5 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
            />
            <span>عرض أسئلة كتاب الوزارة الأصلية فقط</span>
          </label>
          <span className="tabular-nums font-medium">
            يُعرض الآن {filteredQuestions.length} سؤالاً
          </span>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">لا توجد أسئلة تطابق البحث</p>
            <p className="text-xs text-slate-400 mt-1">جرّب تغيير كلمات البحث أو اختيار نوع أسئلة آخر</p>
          </div>
        ) : (
          filteredQuestions.map((item, index) => {
            const isRevealed = !!revealedIds[item.id];

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs hover:border-slate-300"
              >
                <div className="p-4 sm:p-5">
                  {/* Category and metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {categoryLabels[item.category] || item.category}
                      </span>
                      {item.isTextbookOriginal ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          سؤال كتاب الوزارة
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          تدريب إضافي
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      {item.source}
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    <span className="text-slate-400 font-mono ml-2 font-normal">
                      #{index + 1}
                    </span>
                    {item.question}
                  </h4>

                  {/* MCQ Options if available */}
                  {item.options && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {item.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border flex items-center justify-between ${
                            isRevealed && optIdx === item.correctOptionIndex
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isRevealed && optIdx === item.correctOptionIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reveal button */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleReveal(item.id)}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span>إخفاء الإجابة النموذجية</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>عرض الإجابة النموذجية</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-slate-400">
                      {isRevealed ? 'انقر للإخفاء' : 'حاول الإجابة أولاً ثم تحقق'}
                    </span>
                  </div>

                  {/* Revealed Answer Box */}
                  {isRevealed && (
                    <div className="mt-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 animate-in fade-in duration-200 text-right">
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-amber-900">
                          الإجابة النموذجية المعتمدة:
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                        {item.answer}
                      </p>

                      {item.correction && (
                        <div className="mt-2 text-xs text-rose-800 bg-rose-50 p-2 rounded border border-rose-200">
                          <span className="font-bold">تصويب العبارة: </span>
                          {item.correction}
                        </div>
                      )}

                      {item.explanation && (
                        <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-amber-200/50">
                          <span className="font-semibold text-slate-700">توضيح: </span>
                          {item.explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
