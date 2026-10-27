import React, { useState } from 'react';
import { Flashcard } from '../types/curriculum';
import { RotateCw, Check, AlertCircle, RotateCcw, Lightbulb, Sparkles, Filter } from 'lucide-react';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  lessonTitle: string;
  knownList: string[];
  reviewList: string[];
  onMarkStatus: (cardId: string, status: 'known' | 'review') => void;
  onReset: (cardIds: string[]) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  flashcards,
  lessonTitle,
  knownList,
  reviewList,
  onMarkStatus,
  onReset
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'need_review'>('all');

  const cardIds = flashcards.map(f => f.id);

  const displayedCards = activeFilter === 'need_review'
    ? flashcards.filter(f => reviewList.includes(f.id))
    : flashcards;

  const currentCard = displayedCards[currentIndex] || displayedCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < displayedCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleMark = (status: 'known' | 'review') => {
    if (!currentCard) return;
    onMarkStatus(currentCard.id, status);
    handleNext();
  };

  if (!currentCard) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center my-6">
        <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <h4 className="text-base font-bold text-slate-900 mb-1">
          رائع! لا توجد بطاقات تحتاج إلى مراجعة حالياً
        </h4>
        <p className="text-xs text-slate-500 mb-4">
          لقد أتقنت جميع بطاقات هذا الدرس أو قمت بتحديدها جميعاً كـ «أعرف الإجابة».
        </p>
        <button
          onClick={() => {
            setActiveFilter('all');
            setCurrentIndex(0);
          }}
          className="px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          عرض جميع بطاقات الدرس ({flashcards.length})
        </button>
      </div>
    );
  }

  const isCurrentKnown = knownList.includes(currentCard.id);
  const isCurrentReview = reviewList.includes(currentCard.id);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs my-6">
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mb-1">
            البطاقات التعليمية الذكية
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {lessonTitle}
          </h3>
        </div>

        {/* Counter and Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveFilter(activeFilter === 'all' ? 'need_review' : 'all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeFilter === 'need_review'
                ? 'bg-rose-100 text-rose-900 border border-rose-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>
              {activeFilter === 'need_review'
                ? `المحتاج مراجعة فقط (${reviewList.filter(id => cardIds.includes(id)).length})`
                : `كل البطاقات (${flashcards.length})`}
            </span>
          </button>

          <button
            onClick={() => onReset(cardIds)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="إعادة ضبط حالة جميع البطاقات"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between text-xs py-3 text-slate-500">
        <span>
          البطاقة <span className="font-bold text-slate-900 font-mono">{currentIndex + 1}</span> من{' '}
          <span className="font-bold text-slate-900 font-mono">{displayedCards.length}</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>متقن: {knownList.filter(id => cardIds.includes(id)).length}</span>
          </span>
          <span className="text-rose-700 font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>للمراجعة: {reviewList.filter(id => cardIds.includes(id)).length}</span>
          </span>
        </div>
      </div>

      {/* Flashcard Area (Interactive Flip) */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[220px] sm:min-h-[260px] bg-gradient-to-br from-amber-50/70 via-white to-slate-50 border-2 border-dashed border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center cursor-pointer select-none transition-all duration-300 hover:shadow-sm hover:border-amber-400 group relative"
      >
        {/* Card tag */}
        <div className="w-full flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
            {currentCard.topic}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-[11px] group-hover:text-amber-700 transition-colors">
            <RotateCw className="w-3.5 h-3.5" />
            <span>انقر للقلب</span>
          </div>
        </div>

        {/* Center content */}
        <div className="my-auto py-4">
          {!isFlipped ? (
            <div>
              <span className="text-xs text-slate-400 font-bold block mb-2">
                المصطلح / السؤال
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed max-w-lg">
                {currentCard.front}
              </h4>
              {currentCard.hint && (
                <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>تلميح: {currentCard.hint}</span>
                </p>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <span className="text-xs text-emerald-600 font-bold block mb-2">
                الإجابة / التعريف النموذجي
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed max-w-lg whitespace-pre-line">
                {currentCard.back}
              </p>
            </div>
          )}
        </div>

        {/* Status footprint */}
        <div className="w-full text-left">
          {isCurrentKnown && (
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              ✓ تم تعيينها كـ «أعرف الإجابة»
            </span>
          )}
          {isCurrentReview && (
            <span className="text-[11px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">
              ! تم تعيينها كـ «أحتاج إلى مراجعة»
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: أعرف الإجابة - أحتاج إلى مراجعة */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={() => handleMark('review')}
          className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>أحتاج إلى مراجعة</span>
        </button>

        <button
          onClick={() => handleMark('known')}
          className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <Check className="w-4 h-4 text-emerald-600" />
          <span>أعرف الإجابة</span>
        </button>
      </div>

      {/* Next and Prev Controls */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer font-medium"
        >
          ← البطاقة السابقة
        </button>
        <button
          onClick={handleNext}
          className="text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
        >
          البطاقة التالية →
        </button>
      </div>
    </div>
  );
};
