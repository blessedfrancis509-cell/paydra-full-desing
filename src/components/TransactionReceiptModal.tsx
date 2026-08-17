import React from 'react';
import { Transaction } from '../types';
import { X, CheckCircle2, Share2, Download, RefreshCw, ShieldCheck, Copy, Check } from 'lucide-react';

interface TransactionReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onRepeatTransfer?: (tx: Transaction) => void;
}

export const TransactionReceiptModal: React.FC<TransactionReceiptModalProps> = ({
  transaction,
  onClose,
  onRepeatTransfer,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!transaction) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 space-y-4 p-5 sm:p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Stamp */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-100 animate-bounce">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">Transaction Successful</h3>
          <span className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-tight block font-sans">
            ₦{transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] rounded-full border border-emerald-200">
            NIP Verified • Zero Fee Charged
          </span>
        </div>

        {/* Receipt Details Table */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-bold">Transaction Type</span>
            <span className="font-extrabold text-slate-900">{transaction.title}</span>
          </div>

          {transaction.recipientName && (
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-bold">Recipient</span>
              <span className="font-extrabold text-slate-900">{transaction.recipientName}</span>
            </div>
          )}

          {transaction.recipientBank && (
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-bold">Bank Name</span>
              <span className="font-extrabold text-indigo-700">{transaction.recipientBank}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-bold">Transaction Reference</span>
            <button
              onClick={handleCopyRef}
              className="flex items-center gap-1 font-mono font-bold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <span>{transaction.reference}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 font-bold">Date & Time</span>
            <span className="font-mono text-slate-800 font-bold">{transaction.date} • {transaction.time}</span>
          </div>
        </div>

        {/* Security Assurance Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Paydra Microfinance Bank • CBN Licensed & NDIC Insured</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => alert('Sharing transaction receipt...')}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-700" />
            <span>Share Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
