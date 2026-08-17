import React from 'react';
import { Currency } from '../types';
import { X, ArrowLeftRight, Lock } from 'lucide-react';

interface ConvertFXModalProps {
  isOpen: boolean;
  onClose: () => void;
  balances: Record<Currency, number>;
  onConvertSuccess: (fromCurr: Currency, toCurr: Currency, fromAmt: number, toAmt: number) => void;
}

export const ConvertFXModal: React.FC<ConvertFXModalProps> = ({
  isOpen,
  onClose,
  balances,
  onConvertSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 border border-slate-200 shadow-2xl text-slate-900 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-purple-600 text-white">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">FX Currency Swap</h3>
            <p className="text-xs text-slate-500">Real-time interbank NGN / USD / EUR exchange</p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs space-y-2 text-amber-900">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <Lock className="w-4 h-4 text-amber-700" />
            <span>CBN FX Tier 3 Verification Active</span>
          </div>
          <p>Multi-currency conversions operate under Central Bank of Nigeria interbank rate guidelines.</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
        >
          Close FX Swap
        </button>
      </div>
    </div>
  );
};
