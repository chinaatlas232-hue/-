import React from 'react';
import { RawShipmentRow } from '../types';

interface RawDataViewerProps {
  rows: RawShipmentRow[];
  isOpen: boolean;
  onClose: () => void;
}

export const RawDataViewer: React.FC<RawDataViewerProps> = ({ rows, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">جدول البيانات الخام الأصلي الكامل ({rows.length} شحنة)</h3>
            <p className="text-xs text-slate-500">تم استبعاد الحقول الفارغة (الاسم، الهاتف، العنوان) والاحتفاظ حصرياً بالأعمدة الـ 7 المطلوبة في جدول التلخيص</p>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors"
          >
            إغلاق
          </button>
        </div>

        {/* Table container */}
        <div className="p-4 overflow-auto flex-1">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold sticky top-0">
                <th className="py-2.5 px-3 text-center">No.</th>
                <th className="py-2.5 px-3">الكود</th>
                <th className="py-2.5 px-3">Shipping mark</th>
                <th className="py-2.5 px-3">رقم دخول المخزن</th>
                <th className="py-2.5 px-3">نوع البضاعة</th>
                <th className="py-2.5 px-3 text-center">عدد الكارتون</th>
                <th className="py-2.5 px-3 text-center">الوزن</th>
                <th className="py-2.5 px-3 text-center">حجم</th>
                <th className="py-2.5 px-3">رقم الحاوية</th>
                <th className="py-2.5 px-3">Staff</th>
                <th className="py-2.5 px-3 text-left">المجموع</th>
                <th className="py-2.5 px-3 text-left">الزبون دفع</th>
                <th className="py-2.5 px-3 text-left">المكتب دفع</th>
                <th className="py-2.5 px-3 text-left">نقل داخلي</th>
                <th className="py-2.5 px-3 text-center">%</th>
                <th className="py-2.5 px-3 text-left">قيمة الفاتورة بالدولار</th>
                <th className="py-2.5 px-3">رقم قيد الادخال</th>
                <th className="py-2.5 px-3">رقم الفاتورة</th>
                <th className="py-2.5 px-3 text-left">سعر البيع</th>
                <th className="py-2.5 px-3 text-left">مبلغ الجمرك</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rows.map((r) => (
                <tr key={`raw-${r.no}-${r.shippingMark}`} className="hover:bg-slate-50">
                  <td className="py-2 px-3 text-center text-slate-400 font-mono">{r.no}</td>
                  <td className="py-2 px-3 font-mono font-bold text-indigo-900">{r.code}</td>
                  <td className="py-2 px-3 font-mono">{r.shippingMark}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{r.warehouseReceiptNo}</td>
                  <td className="py-2 px-3">{r.goodsType}</td>
                  <td className="py-2 px-3 text-center font-mono font-semibold">{r.cartons}</td>
                  <td className="py-2 px-3 text-center font-mono">{r.weight.toFixed(2)}</td>
                  <td className="py-2 px-3 text-center font-mono">{r.volume.toFixed(3)}</td>
                  <td className="py-2 px-3 font-mono text-slate-700 font-medium">{r.containerNo}</td>
                  <td className="py-2 px-3">{r.staff}</td>
                  <td className="py-2 px-3 text-left font-mono font-semibold text-slate-900">¥{r.totalYuan.toLocaleString('en-US')}</td>
                  <td className="py-2 px-3 text-left font-mono">¥{r.customerPaidYuan.toLocaleString('en-US')}</td>
                  <td className="py-2 px-3 text-left font-mono">¥{r.officePaidYuan.toLocaleString('en-US')}</td>
                  <td className="py-2 px-3 text-left font-mono">¥{r.internalShippingYuan.toFixed(2)}</td>
                  <td className="py-2 px-3 text-center font-mono">{r.exchangeRate}</td>
                  <td className="py-2 px-3 text-left font-mono font-semibold text-emerald-700">${r.invoiceAmountUSD.toLocaleString('en-US')}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{r.entryNo}</td>
                  <td className="py-2 px-3 font-mono">{r.invoiceNo}</td>
                  <td className="py-2 px-3 text-left font-mono">${r.sellingPriceUSD.toFixed(2)}</td>
                  <td className="py-2 px-3 text-left font-mono">${r.customsAmountUSD.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
