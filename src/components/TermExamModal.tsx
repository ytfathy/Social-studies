import React, { useState, useEffect } from 'react';
import { comprehensiveTermExamQuestions, TermExamQuestion } from '../data/termRevisionData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Printer, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface TermExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordScore: (score: number, total: number) => void;
}

export const TermExamModal: React.FC<TermExamModalProps> = ({
  isOpen,
  onClose,
  onRecordScore
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number | boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('طالب مجتهد');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 mins
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen || isSubmitted || !isTimerActive) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSubmitted, isTimerActive]);

  if (!isOpen) return null;

  const handleSelect = (qId: string, ans: string | number | boolean) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: ans
    }));
  };

  const calculateTotalScore = () => {
    let score = 0;
    comprehensiveTermExamQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += q.points;
      }
    });
    return score;
  };

  const totalPossiblePoints = comprehensiveTermExamQuestions.reduce((acc, q) => acc + q.points, 0);

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateTotalScore();
    onRecordScore(score, totalPossiblePoints);
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const score = calculateTotalScore();
  const percentage = Math.round((score / totalPossiblePoints) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                اختبار الفصل الدراسي الأول الشامل المعتمد
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                مطابق تماماً لاختبار نهاية الفصل بكتاب الوزارة (ص 102 - 104)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold tabular-nums">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Exam Body */}
        <div className="p-6 sm:p-8 space-y-8 text-right">
          {/* Certificate / Result Hero if submitted */}
          {isSubmitted && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 border-2 border-amber-300 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                {percentage >= 85 ? 'شهادة تفوق وامتياز في الدراسات الاجتماعية 🌟' : percentage >= 50 ? 'شهادة اجتياز الاختبار بنجاح 🎉' : 'نتيجة الاختبار - بحاجة لمزيد من المراجعة 📚'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                منحت هذه النتيجة للطالب: <span className="font-extrabold text-slate-900">{studentName}</span>
              </p>

              <div className="flex items-center justify-center gap-8 py-3">
                <div>
                  <span className="text-4xl font-black text-slate-900 tabular-nums">{score}</span>
                  <span className="text-xs text-slate-500 block font-bold">من {totalPossiblePoints} درجة</span>
                </div>
                <div className="h-10 w-px bg-amber-300" />
                <div>
                  <span className={`text-4xl font-black tabular-nums ${percentage >= 60 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {percentage}%
                  </span>
                  <span className="text-xs text-slate-500 block font-bold">النسبة المئوية</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة بطاقة النتيجة</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الاختبار</span>
                </button>
              </div>
            </div>
          )}

          {/* Student Info before submitting */}
          {!isSubmitted && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">اسم الطالب/الطالبة:</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="اكتب اسمك هنا..."
                  className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <span className="text-xs text-slate-500">
                عدد الأسئلة: {comprehensiveTermExamQuestions.length} سؤالاً · الدرجة الكلية: {totalPossiblePoints} درجة
              </span>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {comprehensiveTermExamQuestions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4"
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
                      <span className="text-amber-700 ml-2 font-mono">س{idx + 1}.</span>
                      {q.question}
                    </h5>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
                      {q.points} درجات
                    </span>
                  </div>

                  {/* MCQ Options */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isThisCorrect = q.correctAnswer === optIdx;

                        let style = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
                        if (isSelected && !isSubmitted) {
                          style = 'bg-amber-100/80 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-300';
                        } else if (isSubmitted) {
                          if (isThisCorrect) {
                            style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isSelected && !isThisCorrect) {
                            style = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                          } else {
                            style = 'bg-slate-50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelect(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-right flex items-center justify-between cursor-pointer ${style}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* True / False Choices */}
                  {q.type === 'true_false' && (
                    <div className="grid grid-cols-2 gap-3">
                      {[true, false].map((boolVal) => {
                        const isSelected = userAns === boolVal;
                        const isThisCorrect = q.correctAnswer === boolVal;

                        let style = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
                        if (isSelected && !isSubmitted) {
                          style = 'bg-amber-100/80 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-300';
                        } else if (isSubmitted) {
                          if (isThisCorrect) {
                            style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isSelected && !isThisCorrect) {
                            style = 'bg-rose-50 border-rose-300 text-rose-900';
                          } else {
                            style = 'bg-slate-50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={String(boolVal)}
                            disabled={isSubmitted}
                            onClick={() => handleSelect(q.id, boolVal)}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${style}`}
                          >
                            {boolVal ? 'صواب' : 'خطأ'}
                            {isSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div className={`p-3.5 rounded-xl text-xs ${
                      isCorrect ? 'bg-emerald-50 text-emerald-950' : 'bg-rose-50 text-rose-950'
                    }`}>
                      <p className="font-semibold mb-1">
                        {isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة غير صحيحة'}
                      </p>
                      <p className="text-slate-700">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit bar */}
          {!isSubmitted && (
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                تأكد من إجابة جميع الأسئلة قبل النقر على تسليم الاختبار
              </span>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>تسليم الاختبار ورصد الدرجة</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
