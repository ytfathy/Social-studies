import React from 'react';
import { ComparisonTable } from '../types/curriculum';
import { Scale, Check, Lightbulb } from 'lucide-react';

interface ComparisonViewProps {
  comparison: ComparisonTable;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ comparison }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden my-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/60 p-5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="p-1.5 rounded-lg bg-amber-600 text-white">
            <Scale className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {comparison.title}
          </h3>
        </div>
        {comparison.subtitle && (
          <p className="text-xs text-slate-600 mr-7">
            {comparison.subtitle}
          </p>
        )}
      </div>

      {/* Similarities section if present */}
      {comparison.similarities && comparison.similarities.length > 0 && (
        <div className="px-5 py-3.5 bg-emerald-50/60 border-b border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-emerald-800">
              أوجه الشبه والاتفاق المشتركة:
            </span>
          </div>
          <ul className="space-y-1.5">
            {comparison.similarities.map((sim, i) => (
              <li key={i} className="text-xs text-emerald-900 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{sim}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Responsive Table / Side-by-side Cards */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
              <th className="py-3 px-4 font-bold w-1/4">وجه المقارنة</th>
              <th className="py-3 px-4 font-bold text-amber-900 bg-amber-50/50 w-3/8">
                {comparison.entityA}
              </th>
              <th className="py-3 px-4 font-bold text-sky-900 bg-sky-50/50 w-3/8">
                {comparison.entityB}
              </th>
              {comparison.entityC && (
                <th className="py-3 px-4 font-bold text-emerald-900 bg-emerald-50/50">
                  {comparison.entityC}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparison.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-800 bg-slate-50/30">
                  {row.aspect}
                </td>
                <td className="py-3.5 px-4 text-slate-700 leading-relaxed bg-amber-50/20">
                  {row.itemA}
                </td>
                <td className="py-3.5 px-4 text-slate-700 leading-relaxed bg-sky-50/20">
                  {row.itemB}
                </td>
                {comparison.entityC && (
                  <td className="py-3.5 px-4 text-slate-700 leading-relaxed bg-emerald-50/20">
                    {row.itemC}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Note */}
      {comparison.summaryNote && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-slate-800 block mb-0.5">
              خلاصة سهلة للحفظ والمراجعة:
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {comparison.summaryNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
