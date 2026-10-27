import React, { useState } from 'react';
import { MapPoint } from '../types/curriculum';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

interface InteractiveMapProps {
  title: string;
  mapType: string;
  points: MapPoint[];
  challengeQuestions?: {
    prompt: string;
    targetPointId: string;
    feedback: string;
  }[];
  compact?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  title,
  mapType,
  points,
  challengeQuestions = [],
  compact = false
}) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(points[0] || null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [challengeResult, setChallengeResult] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showChallengeMode, setShowChallengeMode] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('all');

  const currentChallenge = challengeQuestions[currentChallengeIndex];

  const handlePointClick = (point: MapPoint) => {
    setSelectedPoint(point);

    if (showChallengeMode && currentChallenge) {
      if (point.id === currentChallenge.targetPointId) {
        setChallengeResult({
          isCorrect: true,
          message: currentChallenge.feedback
        });
      } else {
        const correctPoint = points.find(p => p.id === currentChallenge.targetPointId);
        setChallengeResult({
          isCorrect: false,
          message: `إجابة غير صحيحة، لقد نقرت على «${point.arabicName}». الإجابة الصحيحة هي: «${correctPoint?.arabicName}».`
        });
      }
    }
  };

  const nextChallenge = () => {
    setChallengeResult(null);
    setCurrentChallengeIndex((prev) => (prev + 1) % challengeQuestions.length);
  };

  const filteredPoints = filterType === 'all' 
    ? points 
    : points.filter(p => p.type === filterType);

  const getMarkerColor = (type: MapPoint['type']) => {
    switch (type) {
      case 'mountain': return 'bg-amber-700 text-white border-amber-900';
      case 'plateau': return 'bg-orange-600 text-white border-orange-800';
      case 'river': return 'bg-sky-600 text-white border-sky-800';
      case 'sea': return 'bg-blue-700 text-white border-blue-900';
      case 'strait': return 'bg-indigo-600 text-white border-indigo-800';
      case 'city': return 'bg-emerald-600 text-white border-emerald-800';
      case 'mineral': return 'bg-purple-600 text-white border-purple-800';
      case 'biome': return 'bg-teal-600 text-white border-teal-800';
      default: return 'bg-slate-700 text-white border-slate-900';
    }
  };

  const getTypeName = (type: MapPoint['type']) => {
    switch (type) {
      case 'mountain': return 'جبال وقمم';
      case 'plateau': return 'هضاب';
      case 'river': return 'أنهار وسهول فيضية';
      case 'sea': return 'بحار ومسطحات مائية';
      case 'strait': return 'مضايق وممرات ملاحية';
      case 'city': return 'مدن وحواضر تاريخية';
      case 'mineral': return 'معادن ومصادر طاقة';
      case 'biome': return 'نظام بيئي ومناخي';
      default: return 'موقع جغرافي';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            الخريطة التفاعلية التعليمية الرسمية · انقر على أي موقع لمعرفة بياناته التضاريسية والتاريخية
          </p>
        </div>

        <div className="flex items-center gap-2">
          {challengeQuestions.length > 0 && (
            <button
              onClick={() => {
                setShowChallengeMode(!showChallengeMode);
                setChallengeResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showChallengeMode 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {showChallengeMode ? 'الخروج من وضع التحدي' : 'اختبر معلوماتك على الخريطة'}
            </button>
          )}

          <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              title="تكبير"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              title="تصغير"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              title="إعادة ضبط العرض"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Challenge bar if active */}
      {showChallengeMode && currentChallenge && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-right">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-800">
                  سؤال الخريطة ({currentChallengeIndex + 1} من {challengeQuestions.length})
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {currentChallenge.prompt}
              </p>
            </div>
            {challengeQuestions.length > 1 && (
              <button
                onClick={nextChallenge}
                className="text-xs font-medium text-amber-900 underline hover:text-amber-700 whitespace-nowrap cursor-pointer shrink-0"
              >
                السؤال التالي ←
              </button>
            )}
          </div>

          {challengeResult && (
            <div className={`mt-2 p-2.5 rounded-lg text-xs flex items-center gap-2 ${
              challengeResult.isCorrect ? 'bg-emerald-100 text-emerald-900 font-medium' : 'bg-rose-100 text-rose-900'
            }`}>
              {challengeResult.isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{challengeResult.message}</span>
            </div>
          )}
        </div>
      )}

      {/* Main Map Container */}
      <div className="relative bg-slate-100 overflow-hidden" style={{ minHeight: compact ? '320px' : '460px' }}>
        {/* SVG Base Map */}
        <div
          className="w-full h-full relative transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-auto select-none pointer-events-auto"
            style={{ minHeight: compact ? '320px' : '460px' }}
          >
            {/* Water background */}
            <rect width="1000" height="600" fill="#E0F2FE" />

            {/* Latitude and Longitude Grids */}
            <path d="M 0 100 L 1000 100" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 0 250 L 1000 250" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 0 400 L 1000 400" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 0 540 L 1000 540" stroke="#0284C7" strokeWidth="1.5" /> {/* Equator */}

            <text x="20" y="535" fill="#0369A1" fontSize="11" fontWeight="bold">دائرة الاستواء 0°</text>
            <text x="20" y="395" fill="#0369A1" fontSize="11">مدار السرطان 23.5° ش</text>
            <text x="20" y="95" fill="#0369A1" fontSize="11">الدائرة القطبية الشمالية 66.5° ش</text>

            {/* Europe Landmass Outline (Stylized schematic accurate to textbook proportions) */}
            <path
              d="M 120 280 C 140 220, 220 180, 290 190 C 330 200, 370 240, 390 280 C 370 330, 320 370, 270 380 C 210 390, 160 360, 140 330 Z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Scandinavia */}
            <path
              d="M 240 140 C 270 120, 310 130, 320 190 C 290 200, 260 180, 240 140 Z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* British Isles */}
            <path
              d="M 120 220 C 140 200, 160 210, 150 250 C 130 260, 115 240, 120 220 Z"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Iberian Peninsula */}
            <path
              d="M 140 330 C 170 330, 185 360, 175 390 C 145 400, 130 380, 140 330 Z"
              fill="#FEF3C7"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Italy */}
            <path
              d="M 250 340 C 270 360, 280 400, 270 415 C 255 410, 250 370, 250 340 Z"
              fill="#FEF3C7"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Greece */}
            <path
              d="M 310 370 C 335 380, 340 410, 325 430 C 305 410, 305 385, 310 370 Z"
              fill="#FEF3C7"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            {/* Asia Landmass Outline (Major body) */}
            <path
              d="M 390 250 C 480 150, 720 140, 860 220 C 920 300, 940 440, 880 500 C 800 540, 740 460, 680 500 C 620 540, 560 520, 500 480 C 440 450, 400 360, 390 250 Z"
              fill="#FFFBEB"
              stroke="#FDE68A"
              strokeWidth="2"
            />

            {/* Arabian Peninsula */}
            <path
              d="M 430 430 C 470 420, 510 440, 520 520 C 470 545, 420 500, 430 430 Z"
              fill="#FEF3C7"
              stroke="#FCD34D"
              strokeWidth="1.5"
            />

            {/* Indian Subcontinent */}
            <path
              d="M 580 430 C 640 430, 670 470, 640 545 C 610 570, 570 510, 580 430 Z"
              fill="#FEF9C3"
              stroke="#FDE047"
              strokeWidth="1.5"
            />

            {/* Southeast Asia & Islands */}
            <path
              d="M 720 460 C 760 480, 770 520, 745 550 C 720 540, 710 500, 720 460 Z"
              fill="#ECFDF5"
              stroke="#A7F3D0"
              strokeWidth="1.5"
            />
            {/* Indonesian Archipelago dots */}
            <ellipse cx="780" cy="560" rx="35" ry="10" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1" />
            <ellipse cx="850" cy="565" rx="30" ry="12" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1" />
            {/* Japan Archipelago */}
            <path
              d="M 870 320 C 890 310, 910 360, 890 400 C 875 380, 865 340, 870 320 Z"
              fill="#F8FAFC"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />

            {/* Ural Mountains Divider */}
            <path
              d="M 400 150 Q 395 240 410 330"
              stroke="#B45309"
              strokeWidth="3.5"
              strokeDasharray="2 4"
            />
            <text x="390" y="240" fill="#92400E" fontSize="11" fontWeight="bold" transform="rotate(-75 390 240)">
              جبال أورال (الحد الفاصل)
            </text>

            {/* Major Seas Labels */}
            <text x="210" y="425" fill="#0369A1" fontSize="12" fontWeight="bold">البحر المتوسط</text>
            <text x="350" y="360" fill="#0369A1" fontSize="11" fontWeight="bold">البحر الأسود</text>
            <text x="420" y="320" fill="#0369A1" fontSize="11" fontWeight="bold">بحر قزوين</text>
            <text x="415" y="480" fill="#0369A1" fontSize="11" fontWeight="bold">البحر الأحمر</text>
            <text x="540" y="480" fill="#0369A1" fontSize="11" fontWeight="bold">بحر العرب</text>
            <text x="660" y="480" fill="#0369A1" fontSize="11" fontWeight="bold">خليج البنغال</text>
            <text x="580" y="585" fill="#0369A1" fontSize="13" fontWeight="bold">المحيط الهندي</text>
            <text x="920" y="420" fill="#0369A1" fontSize="13" fontWeight="bold" transform="rotate(90 920 420)">المحيط الهادي</text>
            <text x="50" y="260" fill="#0369A1" fontSize="13" fontWeight="bold">المحيط الأطلنطي</text>
            <text x="500" y="45" fill="#0369A1" fontSize="13" fontWeight="bold">المحيط القطبي الشمالي</text>
          </svg>

          {/* Interactive HTML Hotspot Markers overlaid on SVG coordinates */}
          {filteredPoints.map((point) => {
            const isSelected = selectedPoint?.id === point.id;
            const isTargetInChallenge = showChallengeMode && currentChallenge?.targetPointId === point.id;

            return (
              <div
                key={point.id}
                onClick={() => handlePointClick(point)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-20 group"
                style={{
                  left: `${point.coordinates.x}%`,
                  top: `${point.coordinates.y}%`
                }}
              >
                <div className={`flex items-center justify-center rounded-full p-1.5 shadow-md border-2 transition-transform ${
                  isSelected ? 'scale-125 ring-3 ring-amber-400' : 'group-hover:scale-110'
                } ${getMarkerColor(point.type)}`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>

                {/* Marker label tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap shadow-sm pointer-events-none transition-opacity ${
                  isSelected 
                    ? 'bg-slate-900 text-white opacity-100' 
                    : 'bg-white text-slate-800 opacity-80 group-hover:opacity-100 border border-slate-200'
                }`}>
                  {point.arabicName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Point Inspector & Detail Card */}
      {selectedPoint && (
        <div className="p-5 border-t border-slate-200 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${getMarkerColor(selectedPoint.type)}`}>
                {getTypeName(selectedPoint.type)}
              </span>
              <h4 className="text-base font-extrabold text-slate-900">
                {selectedPoint.arabicName}
              </h4>
            </div>
            <span className="text-xs text-slate-600 font-medium">
              موقع محدد ومطابق لنص كتاب الوزارة
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {selectedPoint.description}
          </p>

          {selectedPoint.curriculumNotes && (
            <div className="mt-2 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{selectedPoint.curriculumNotes}</span>
            </div>
          )}
        </div>
      )}

      {/* Legend & Filter Controls */}
      <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-700">تصفية المعالم:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              filterType === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            الكل ({points.length})
          </button>
          {Array.from(new Set(points.map(p => p.type))).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === type ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {getTypeName(type)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
