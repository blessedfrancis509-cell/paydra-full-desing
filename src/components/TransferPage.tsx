import React, { useState } from 'react';
import { Beneficiary, Transaction } from '../types';
import {
  Send,
  Building2,
  UserCheck,
  Search,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Star,
  Users,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { triggerSuccessConfetti } from '../utils/confetti';

interface TransferPageProps {
  beneficiaries: Beneficiary[];
  userBalance: number;
  onCompleteTransfer: (tx: Transaction) => void;
  onOpenSendModal: () => void;
}

const POPULAR_BANKS = [
  { name: 'Paydra Bank', code: '999991', bg: 'bg-purple-600 text-white' },
  { name: 'OPAY', code: '999992', bg: 'bg-emerald-600 text-white' },
  { name: 'PalmPay', code: '999993', bg: 'bg-purple-600 text-white' },
  { name: 'Kuda Bank', code: '50211', bg: 'bg-indigo-700 text-white' },
  { name: 'Moniepoint', code: '50515', bg: 'bg-indigo-600 text-white' },
  { name: 'GTBank', code: '058', bg: 'bg-amber-600 text-white' },
  { name: 'Zenith Bank', code: '057', bg: 'bg-red-600 text-white' },
  { name: 'Access Bank', code: '044', bg: 'bg-amber-500 text-slate-950' },
  { name: 'First Bank', code: '011', bg: 'bg-indigo-900 text-amber-300' },
  { name: 'UBA', code: '033', bg: 'bg-red-700 text-white' },
];

export const TransferPage: React.FC<TransferPageProps> = ({
  beneficiaries,
  userBalance,
  onCompleteTransfer,
  onOpenSendModal,
}) => {
  const [transferType, setTransferType] = useState<'PAYDRA' | 'BANK'>('BANK');
  const [selectedBank, setSelectedBank] = useState('Kuda Bank');
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [paydraTag, setPaydraTag] = useState('');
  const [amount, setAmount] = useState('5000');
  const [note, setNote] = useState('');
  const [isLoadingName, setIsLoadingName] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'FORM' | 'PIN' | 'SUCCESS'>('FORM');
  const [pin, setPin] = useState(['', '', '', '']);
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);

  const handleAccountChange = (val: string) => {
    setAccountNumber(val);
    if (val.length === 10) {
      setIsLoadingName(true);
      setTimeout(() => {
        setIsLoadingName(false);
        setRecipientName('Isaac Ayomide Olamide');
      }, 600);
    } else {
      setRecipientName('');
    }
  };

  const handleProceed = () => {
    const numAmt = parseFloat(amount);
    if (!numAmt || numAmt <= 0) return alert('Please enter a valid transfer amount');
    if (numAmt > userBalance) return alert('Insufficient balance');
    if (transferType === 'BANK' && (!accountNumber || accountNumber.length < 10)) {
      return alert('Please enter a valid 10-digit account number');
    }
    if (transferType === 'PAYDRA' && !paydraTag) {
      return alert('Please enter recipient Paydra tag');
    }

    setStep('PIN');
  };

  const handleConfirmPin = (enteredPin: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      triggerSuccessConfetti();

      const newTx: Transaction = {
        id: `tx_trf_${Date.now()}`,
        reference: `PAYDRA-TRF-${Date.now().toString().slice(-6)}`,
        type: 'TRANSFER',
        title: `Transfer to ${recipientName || paydraTag || 'Beneficiary'}`,
        amount: parseFloat(amount),
        currency: 'NGN',
        fee: 0,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'SUCCESSFUL',
        recipientName: recipientName || paydraTag || 'Beneficiary',
        recipientAccount: accountNumber || '9012847591',
        recipientBank: transferType === 'PAYDRA' ? 'Paydra Bank' : selectedBank,
        category: 'Transfer',
        note: note || 'Transfer',
        tag: '#Transfer',
        receiptCode: `RCP-TRF-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      setCompletedTx(newTx);
      onCompleteTransfer(newTx);
      setStep('SUCCESS');
    }, 1200);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-6 text-slate-900 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Paydra NIP Instant Transfer
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
              ₦0 Transfer Fee
            </span>
          </div>
          <p className="text-xs text-slate-500">Send money instantly to any bank or Paydra tag in Nigeria</p>
        </div>

        <div className="px-3.5 py-2 bg-indigo-50/80 border border-indigo-100 rounded-2xl flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] text-slate-500 font-bold">Balance:</span>
          <span className="text-sm font-black text-indigo-900">
            ₦{userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {step === 'FORM' && (
        <div className="space-y-5">
          {/* Transfer Type Selection Cards (To Paydra Tag vs To Bank Account) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTransferType('BANK')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-left ${
                transferType === 'BANK'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-2xs ${
                transferType === 'BANK' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}>
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black block">To Other Bank</span>
                <span className={`text-[10px] block ${transferType === 'BANK' ? 'opacity-90' : 'text-slate-500'}`}>
                  NIP Instant Transfer
                </span>
              </div>
            </button>

            <button
              onClick={() => setTransferType('PAYDRA')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-left ${
                transferType === 'PAYDRA'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-2xs ${
                transferType === 'PAYDRA' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black block">To Paydra Tag</span>
                <span className={`text-[10px] block ${transferType === 'PAYDRA' ? 'opacity-90' : 'text-slate-500'}`}>
                  Instant & Free (@tag)
                </span>
              </div>
            </button>
          </div>

          {/* Quick Beneficiary Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Recent Beneficiaries</label>
              <span className="text-[11px] text-indigo-600 font-bold">1-Tap Autofill</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {beneficiaries.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    if (transferType === 'BANK') {
                      setSelectedBank(b.bankName);
                      setAccountNumber(b.accountNumber);
                      setRecipientName(b.name);
                    } else {
                      setPaydraTag(b.veloTag || `@${b.name.toLowerCase().replace(/\s+/g, '')}`);
                    }
                  }}
                  className="px-3 py-2 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black">
                    {b.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="block text-[11px] font-extrabold">{b.name.split(' ')[0]}</span>
                    <span className="block text-[9px] text-slate-500 font-mono">{b.bankName}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {transferType === 'BANK' ? (
            <div className="space-y-4">
              {/* Popular Banks Grid Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Select Bank</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {POPULAR_BANKS.map((b) => (
                    <button
                      key={b.code}
                      onClick={() => setSelectedBank(b.name)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        selectedBank === b.name
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block text-xs font-extrabold truncate">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Number Input */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Account Number</label>
                <input
                  type="text"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => handleAccountChange(e.target.value)}
                  placeholder="Enter 10-digit NUBAN account number"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {isLoadingName && (
                <div className="text-xs text-indigo-600 font-bold flex items-center gap-2 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <span>Looking up NIP Account Name...</span>
                </div>
              )}

              {recipientName && !isLoadingName && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-emerald-700 uppercase font-bold block">Verified Recipient</span>
                    <span className="text-sm font-black text-emerald-950">{recipientName}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Paydra Tag (@username)</label>
                <input
                  type="text"
                  value={paydraTag}
                  onChange={(e) => setPaydraTag(e.target.value)}
                  placeholder="@username"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Amount & Quick Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Transfer Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[1000, 5000, 10000, 50000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="py-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Note / Narration (Optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Payment for design service"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900"
            />
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Confirm Transfer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 'PIN' && (
        <div className="space-y-5 text-center py-6 max-w-md mx-auto">
          <h3 className="text-lg font-black text-slate-900">Confirm Security PIN</h3>
          <p className="text-xs text-slate-500">Enter your 4-digit Paydra authorization PIN to authorize transfer</p>

          {isProcessing ? (
            <div className="py-10 space-y-3">
              <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <span className="text-xs font-bold text-indigo-700 block">Authorizing NIP Instant Transfer...</span>
            </div>
          ) : (
            <div className="space-y-6">
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
                      if (e.target.value && idx < 3) {
                        const nextInput = document.getElementById(`trf_pin_${idx + 1}`);
                        nextInput?.focus();
                      }
                      if (newPin.join('').length === 4) {
                        handleConfirmPin(newPin.join(''));
                      }
                    }}
                    id={`trf_pin_${idx}`}
                    className="w-12 h-12 text-center bg-slate-100 border border-slate-300 rounded-2xl text-lg font-black text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                ))}
              </div>

              <button
                onClick={() => handleConfirmPin(pin.join(''))}
                className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
              >
                Authorize Transfer of ₦{parseFloat(amount).toLocaleString()}
              </button>
            </div>
          )}
        </div>
      )}

      {step === 'SUCCESS' && completedTx && (
        <div className="space-y-5 text-center py-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-100 animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">Transfer Successful!</h3>
            <span className="text-3xl font-black text-indigo-900 block font-sans">
              ₦{completedTx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <p className="text-xs text-slate-500 mt-1">Sent to {completedTx.recipientName}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 text-left border border-slate-200/80">
            <div className="flex justify-between"><span className="text-slate-500">Bank:</span><strong className="text-slate-900">{completedTx.recipientBank}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Account:</span><strong className="text-slate-900 font-mono">{completedTx.recipientAccount}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Reference:</span><strong className="text-slate-900 font-mono text-[10px]">{completedTx.reference}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Transfer Fee:</span><strong className="text-emerald-600 font-bold">₦0.00 FREE</strong></div>
          </div>

          <button
            onClick={() => setStep('FORM')}
            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
          >
            Make Another Transfer
          </button>
        </div>
      )}
    </div>
  );
};
