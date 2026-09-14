import React from 'react';
import { Package, Weight, Box, DollarSign, Layers } from 'lucide-react';
import { AggregatedShipment } from '../types';

interface SummaryCardsProps {
  data: AggregatedShipment[];
  rawCount: number;
  totalCodesCount?: number;
  isFiltered?: boolean;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  data,
  rawCount,
  totalCodesCount,
  isFiltered = false,
}) => {
  const totalCartons = data.reduce((acc, item) => acc + (Number(item.totalCartons) || 0), 0);
  const totalWeight = data.reduce((acc, item) => acc + (Number(item.totalWeight) || 0), 0);
  const totalVolume = data.reduce((acc, item) => acc + (Number(item.totalVolume) || 0), 0);
  const totalCustomsUSD = data.reduce((acc, item) => acc + (Number(item.totalCustomsUSD) || 0), 0);

  const cards = [
    {
      id: 'stat-codes',
      label: isFiltered ? 'الأكواد المصفاة' : 'الأكواد المجمعة',
      value: `${data.length} ${data.length === 1 ? 'كود' : 'أكواد'}`,
      sub: isFiltered
        ? `${rawCount} شحنة مصفاة (${totalCodesCount || 0} كلي)`
        : `تم دمج ${rawCount} شحنة فرعية`,
      icon: Layers,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      id: 'stat-cartons',
      label: 'عدد الكارتون (مجموع)',
      value: totalCartons.toLocaleString('en-US'),
      sub: isFiltered ? 'كرتونة مطابقة للبحث' : 'كرتونة إجمالية',
      icon: Package,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      id: 'stat-weight',
      label: 'الوزن الإجمالي',
      value: `${totalWeight.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      sub: 'كيلوغرام (kg)',
      icon: Weight,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 'stat-volume',
      label: 'الحجم الإجمالي',
      value: `${totalVolume.toFixed(3)}`,
      sub: 'متر مكعب (CBM)',
      icon: Box,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      id: 'stat-customs-amount',
      label: 'إجمالي مبلغ الجمرك',
      value: `$${totalCustomsUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      sub: isFiltered ? 'الجمرك للنتائج المصفاة ($)' : 'بالدولار ($) حصرياً',
      icon: DollarSign,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div id="summary-metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">{card.label}</span>
              <div className={`p-2 rounded-lg border ${card.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800 tracking-tight font-mono">{card.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{card.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
