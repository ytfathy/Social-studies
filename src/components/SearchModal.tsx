import React, { useState } from 'react';
import { searchCurriculum } from '../data/curriculumData';
import { Search, X, BookOpen, Lightbulb, HelpCircle, ArrowLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = searchCurriculum(query);
  const totalResults = results.lessons.length + results.terms.length + results.questions.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن درس، مفهوم، معدن، إمبراطور، قارة، أو سؤال..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none text-right font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 text-right divide-y divide-slate-100">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-slate-400">
              اكتب كلمة للبحث مثل: «الهيمالايا»، «حمورابي»، «سد مأرب»، «النيكل»، «تساي لون»، «دقلديانوس»...
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              لم يتم العثور على نتائج لكلمة «{query}»
            </div>
          ) : (
            <div className="space-y-4">
              {/* Matched Lessons */}
              {results.lessons.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-2">
                    الدروس المطابقة ({results.lessons.length})
                  </span>
                  <div className="space-y-1.5">
                    {results.lessons.map(l => (
                      <button
                        key={l.id}
                        onClick={() => {
                          onSelectLesson(l.id);
                          onClose();
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-amber-50 text-right flex items-center justify-between text-xs transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="font-bold text-slate-900">{l.title}</span>
                          <span className="text-[10px] text-slate-400">({l.pageRange})</span>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Key Terms */}
              {results.terms.length > 0 && (
                <div className="pt-3">
                  <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-2">
                    المصطلحات والمفاهيم ({results.terms.length})
                  </span>
                  <div className="space-y-2">
                    {results.terms.map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onSelectLesson(t.lessonId);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 hover:bg-sky-100/60 transition-colors cursor-pointer text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sky-950">{t.term}</span>
                          <span className="text-[10px] text-slate-500">{t.lessonTitle}</span>
                        </div>
                        <p className="text-slate-600 line-clamp-2 leading-relaxed">{t.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Questions */}
              {results.questions.length > 0 && (
                <div className="pt-3">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                    الأسئلة والتدريبات ({results.questions.length})
                  </span>
                  <div className="space-y-2">
                    {results.questions.map((q, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          onSelectLesson(q.lessonId);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-amber-50/50 transition-colors cursor-pointer text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">{q.question.question}</span>
                          <span className="text-[10px] text-slate-400">{q.lessonTitle}</span>
                        </div>
                        <p className="text-slate-500 line-clamp-1">الإجابة: {q.question.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
