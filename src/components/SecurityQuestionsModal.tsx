import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SecurityQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityQuestionsModal: React.FC<SecurityQuestionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
      alert('Security PIN updated successfully!');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 border border-slate-200 shadow-2xl text-slate-900 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-indigo-600 text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Paydra Security Center</h3>
            <p className="text-xs text-slate-500">Manage transaction PIN & biometrics</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 block">Set New 4-Digit Security PIN</label>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                type="password"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => {
                  const newPin = [...pin];
                  newPin[idx] = e.target.value;
                  setPin(newPin);
                }}
                className="w-12 h-12 text-center bg-slate-100 border border-slate-300 rounded-2xl text-lg font-black text-slate-900"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
        >
          {saved ? 'PIN Saved!' : 'Save New Security PIN'}
        </button>
      </div>
    </div>
  );
};
