import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, ArrowDownLeft, Copy, Check, QrCode } from 'lucide-react';

interface RequestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const RequestMoneyModal: React.FC<RequestMoneyModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://paydra.bank/pay/${user.veloTag.replace('@', '')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 border border-slate-200 shadow-2xl text-slate-900 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-sky-500 text-white">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Request Money</h3>
            <p className="text-xs text-slate-500">Share your payment link or Paydra QR Code</p>
          </div>
        </div>

        {/* Paydra Payment Link */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase text-slate-400">Your Paydra Payment Link</span>
          <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-slate-200">
            <span className="truncate">paydra.bank/pay/{user.veloTag.replace('@', '')}</span>
            <button
              onClick={handleCopyLink}
              className="p-1.5 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
