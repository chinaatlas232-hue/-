import React, { useState } from 'react';
import { X, ClipboardPaste, RotateCcw, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { RawShipmentRow } from '../types';
import { parseTableText, INITIAL_RAW_DATA } from '../utils/shipmentProcessor';

interface DataImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataLoaded: (rows: RawShipmentRow[]) => void;
}

export const DataImporterModal: React.FC<DataImporterModalProps> = ({
  isOpen,
  onClose,
  onDataLoaded,
}) => {
  const [inputText, setInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleProcess = () => {
    if (!inputText.trim()) {
      setErrorMsg('يرجى لصق بيانات الجدول أولاً.');
      return;
    }

    try {
      const parsed = parseTableText(inputText);
      if (parsed.length === 0) {
        setErrorMsg('لم يتم العثور على صفوف صالحة. تأكد من تنسيق الجدول (Markdown أو Excel نسخ/لصق).');
        return;
      }
      setErrorMsg('');
      onDataLoaded(parsed);
      onClose();
    } catch {
      setErrorMsg('حدث خطأ أثناء معالجة النص. يرجى التحقق من التنسيق.');
    }
  };

  const handleResetToDefault = () => {
    onDataLoaded(INITIAL_RAW_DATA);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">استيراد أو لصق جدول شحنات جديد</h3>
              <p className="text-xs text-slate-500">الصق جدول Markdown أو خلايا منسوجة من Excel / Google Sheets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm flex-1">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 text-xs text-indigo-900 leading-relaxed">
            <div className="font-bold mb-1 flex items-center gap-1.5 text-indigo-950">
              <AlertCircle className="w-4 h-4 text-indigo-600" />
              القواعد المطبقة تلقائياً:
            </div>
            <ul className="list-disc list-inside space-y-1 mr-2 text-slate-700">
              <li>دمج الأكواد المتكررة وجمع (الكرتون، الوزن، الحجم، ومبلغ الجمرك).</li>
              <li>استبدال قيمة الفاتورة بمبلغ الجمرك حصرياً بالدولار ($).</li>
              <li>استبعاد الحقول الفارغة (الاسم، الهاتف، العنوان) تماماً.</li>
              <li>تطبيق دالة نوع الشحنة: رقم حاوية يبدأ بـ <strong>RQ</strong> = "بحري"، ويبدأ بـ <strong>RA</strong> = "شحنة جوية".</li>
            </ul>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1.5">
              الصق نص الجدول هنا:
            </label>
            <textarea
              dir="ltr"
              rows={10}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="| No. | الكود | Shipping mark | ... | عدد الكارتون | الوزن | حجم | رقم الحاوية | ... | المجموع |"
              className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            استعادة بيانات المسألة الحالية (15 شحنة)
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/70 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleProcess}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ClipboardPaste className="w-4 h-4" />
              معالجة وتجميع البيانات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
