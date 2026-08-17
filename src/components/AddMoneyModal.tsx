import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, PlusCircle, CreditCard, Building2, Copy, Check, ShieldCheck } from 'lucide-react';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onAddFundsSuccess: (amount: number) => void;
}

export const AddMoneyModal: React.FC<AddMoneyModalProps> = ({
  isOpen,
  onClose,
  user,
  onAddFundsSuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const [cardAmount, setCardAmount] = useState('10000');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(user.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddViaCard = () => {
    const amt = parseFloat(cardAmount);
    if (!amt || amt <= 0) return alert('Please enter a valid amount');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAddFundsSuccess(amt);
      onClose();
      alert(`Successfully added ₦${amt.toLocaleString()} to your Paydra account!`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 p-5 sm:p-6 relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-md">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">Add Money to Wallet</h3>
            <p className="text-xs text-slate-500">Instant deposit via Bank Transfer or Debit Card</p>
          </div>
        </div>

        {/* Option 1: Instant Bank Transfer */}
        <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">
            Option 1: Transfer to Your Dedicated NUBAN
          </span>

          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Paydra Account Number</span>
              <span className="text-lg font-black font-mono text-slate-900">{user.accountNumber}</span>
              <span className="text-[10px] text-slate-500 block font-bold">{user.bankName}</span>
            </div>

            <button
              onClick={handleCopyAccount}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Option 2: Add via Debit Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider block">
            Option 2: Top-Up via Debit Card
          </span>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Enter Amount (₦)</label>
            <input
              type="number"
              value={cardAmount}
              onChange={(e) => setCardAmount(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900"
            />
          </div>

          <button
            onClick={handleAddViaCard}
            disabled={isProcessing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>{isProcessing ? 'Processing Deposit...' : 'Pay with Debit Card'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
