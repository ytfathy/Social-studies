import React, { useState } from 'react';
import { QuizQuestion } from '../types/curriculum';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowLeft, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';

interface QuizEngineProps {
  quiz: QuizQuestion[];
  lessonId: string;
  lessonTitle: string;
  onRecordScore?: (lessonId: string, score: number, total: number) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quiz,
  lessonId,
  lessonTitle,
  onRecordScore
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number | boolean>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = quiz[currentIndex];

  const handleSelectAnswer = (ans: string | number | boolean) => {
    if (submittedQuestions[currentQ.id]) return; // already submitted
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: ans
    }));
  };

  const handleSubmitCurrent = () => {
    const userAnswer = selectedAnswers[currentQ.id];
    if (userAnswer === undefined) return;

    setSubmittedQuestions(prev => ({
      ...prev,
      [currentQ.id]: true
    }));

    const isCorrect = userAnswer === currentQ.correctAnswer;
    if (isCorrect) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Complete quiz
      setQuizCompleted(true);
      const score = calculateScore();
      if (onRecordScore) {
        onRecordScore(lessonId, score, quiz.length);
      }
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    return quiz.reduce((acc, q) => {
      return selectedAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const finalScore = calculateScore();
    const percentage = Math.round((finalScore / quiz.length) * 100);
    const isPassing = percentage >= 60;
    const isPerfect = percentage === 100;

    const wrongQuestions = quiz.filter(q => selectedAnswers[q.id] !== q.correctAnswer);

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center my-6 shadow-xs animate-in fade-in duration-300">
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
          isPerfect ? 'bg-amber-100 text-amber-700' : isPassing ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          <Award className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          {isPerfect ? 'نتيجة ممتازة! درجة نهائية 🌟' : isPassing ? 'أحسنت! اجتزت الاختبار بنجاح 🎉' : 'محاولة جيدة، تحتاج إلى مراجعة بعض النقاط 📖'}
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          اختبار: {lessonTitle}
        </p>

        {/* Score circle */}
        <div className="flex items-center justify-center gap-6 my-6">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tabular-nums">
              {finalScore}
            </span>
            <span className="text-lg text-slate-400 font-bold block">
              من {quiz.length} أسئلة
            </span>
          </div>
          <div className="h-12 w-px bg-slate-200" />
          <div className="text-center">
            <span className={`text-4xl sm:text-5xl font-black tabular-nums ${
              isPassing ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {percentage}%
            </span>
            <span className="text-xs text-slate-400 font-bold block">
              النسبة المئوية
            </span>
          </div>
        </div>

        {/* Topics to review if any mistakes */}
        {wrongQuestions.length > 0 && (
          <div className="my-6 text-right bg-slate-50 rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-2 mb-3 text-amber-900 font-bold text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>نقاط تحتاج إلى مراجعة وتأكيد من الكتاب المدرسي:</span>
            </div>
            <div className="space-y-3">
              {wrongQuestions.map((wq, i) => (
                <div key={i} className="text-xs border-r-2 border-amber-500 pr-3 py-1">
                  <p className="font-semibold text-slate-800">{wq.question}</p>
                  <p className="text-emerald-700 mt-1">
                    <span className="font-bold">الإجابة الصحيحة: </span>
                    {wq.type === 'mcq' && wq.options ? wq.options[wq.correctAnswer as number] : String(wq.correctAnswer === true ? 'صواب' : wq.correctAnswer === false ? 'خطأ' : wq.correctAnswer)}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{wq.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={restartQuiz}
          className="mt-4 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة الاختبار لتحسين الدرجة</span>
        </button>
      </div>
    );
  }

  const isCurrentSubmitted = !!submittedQuestions[currentQ.id];
  const userCurrentAnswer = selectedAnswers[currentQ.id];
  const isCorrect = userCurrentAnswer === currentQ.correctAnswer;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden my-6 shadow-xs">
      {/* Top quiz bar */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
          <span className="text-xs font-bold text-slate-800">
            اختبار الدرس التفاعلي · السؤال {currentIndex + 1} من {quiz.length}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono tabular-nums">
          {Math.round(((currentIndex) / quiz.length) * 100)}% مكتمل
        </span>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-100 h-1">
        <div
          className="bg-amber-600 h-1 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / quiz.length) * 100}%` }}
        />
      </div>

      {/* Question Body */}
      <div className="p-6 sm:p-8">
        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mb-3">
          {currentQ.type === 'mcq' ? 'اختر الإجابة الصحيحة' : currentQ.type === 'true_false' ? 'حدد صواب أم خطأ' : 'سؤال تطبيقي'}
        </span>

        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-6">
          {currentQ.question}
        </h4>

        {/* MCQ Choices */}
        {currentQ.type === 'mcq' && currentQ.options && (
          <div className="space-y-2.5 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = userCurrentAnswer === idx;
              const isThisCorrect = currentQ.correctAnswer === idx;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';
              if (isSelected && !isCurrentSubmitted) {
                btnStyle = 'bg-amber-50 border-amber-400 text-amber-900 font-bold ring-2 ring-amber-300';
              } else if (isCurrentSubmitted) {
                if (isThisCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isThisCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isCurrentSubmitted}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 bg-white">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isCurrentSubmitted && isThisCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isCurrentSubmitted && isSelected && !isThisCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True / False Choices */}
        {currentQ.type === 'true_false' && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[true, false].map((boolVal) => {
              const isSelected = userCurrentAnswer === boolVal;
              const isThisCorrect = currentQ.correctAnswer === boolVal;

              let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50';
              if (isSelected && !isCurrentSubmitted) {
                btnStyle = 'bg-amber-50 border-amber-400 text-amber-900 font-bold ring-2 ring-amber-300';
              } else if (isCurrentSubmitted) {
                if (isThisCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                } else if (isSelected && !isThisCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={String(boolVal)}
                  disabled={isCurrentSubmitted}
                  onClick={() => handleSelectAnswer(boolVal)}
                  className={`p-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${btnStyle}`}
                >
                  {boolVal ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>صواب</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>خطأ</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation & Feedback Card */}
        {isCurrentSubmitted && (
          <div className={`p-4 rounded-xl mb-6 text-right animate-in fade-in duration-200 border ${
            isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs sm:text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>إجابة صحيحة! أحسنت 🌟</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>إجابة غير دقيقة! لاحظ التوضيح:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 text-xs text-slate-600 disabled:opacity-30 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>السابق</span>
          </button>

          {!isCurrentSubmitted ? (
            <button
              onClick={handleSubmitCurrent}
              disabled={userCurrentAnswer === undefined}
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>تحقق من الإجابة</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentIndex < quiz.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
