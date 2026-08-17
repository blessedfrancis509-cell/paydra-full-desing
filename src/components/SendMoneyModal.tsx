import React, { useState } from 'react';
import { Beneficiary, Transaction } from '../types';
import { X, Send, Search, CheckCircle2, ShieldCheck, UserCheck, Building2, User } from 'lucide-react';
import { triggerSuccessConfetti } from '../utils/confetti';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiaries: Beneficiary[];
  userBalance: number;
  onCompleteTransfer: (tx: Transaction) => void;
  prefilledBeneficiary?: Beneficiary | null;
}

const NIGERIAN_BANKS = [
  { name: 'Paydra Bank', code: '999991', color: 'bg-purple-600 text-white' },
  { name: 'Kuda Bank', code: '50211', color: 'bg-purple-600 text-white' },
  { name: 'OPAY', code: '999992', color: 'bg-emerald-600 text-white' },
  { name: 'PalmPay', code: '999993', color: 'bg-purple-600 text-white' },
  { name: 'GTBank', code: '058', color: 'bg-amber-600 text-white' },
  { name: 'Zenith Bank', code: '057', color: 'bg-red-600 text-white' },
  { name: 'Access Bank', code: '044', color: 'bg-amber-500 text-slate-950' },
  { name: 'First Bank', code: '011', color: 'bg-indigo-900 text-amber-400' },
  { name: 'United Bank for Africa (UBA)', code: '033', color: 'bg-red-700 text-white' },
  { name: 'Moniepoint Microfinance Bank', code: '50515', color: 'bg-indigo-600 text-white' },
];

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  isOpen,
  onClose,
  beneficiaries,
  userBalance,
  onCompleteTransfer,
  prefilledBeneficiary,
}) => {
  const [transferMode, setTransferMode] = useState<'BANK' | 'TAG'>('BANK');
  const [accountNumber, setAccountNumber] = useState(prefilledBeneficiary?.accountNumber || '');
  const [selectedBank, setSelectedBank] = useState(prefilledBeneficiary?.bankName || 'Kuda Bank');
  const [recipientName, setRecipientName] = useState(prefilledBeneficiary?.name || '');
  const [paydraTag, setPaydraTag] = useState(prefilledBeneficiary?.veloTag || '');
  const [amount, setAmount] = useState('5000');
  const [note, setNote] = useState('');
  const [isLoadingName, setIsLoadingName] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'DETAILS' | 'PIN' | 'SUCCESS'>('DETAILS');
  const [pin, setPin] = useState(['', '', '', '']);
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);

  if (!isOpen) return null;

  const handleAccountChange = (val: string) => {
    setAccountNumber(val);
    if (val.length === 10) {
      setIsLoadingName(true);
      setTimeout(() => {
        setIsLoadingName(false);
        setRecipientName('Isaac Ayomide Olamide');
      }, 700);
    } else {
      setRecipientName('');
    }
  };

  const handleInitiate = () => {
    const numAmt = parseFloat(amount);
    if (!numAmt || numAmt <= 0) return alert('Please enter a valid amount');
    if (numAmt > userBalance) return alert('Insufficient balance');
    if (transferMode === 'BANK' && (!accountNumber || accountNumber.length < 10)) {
      return alert('Please enter 10-digit account number');
    }
    if (transferMode === 'TAG' && !paydraTag) {
      return alert('Please enter recipient Paydra Tag');
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
        recipientBank: transferMode === 'TAG' ? 'Paydra Bank' : selectedBank,
        category: 'Transfer',
        note: note || 'Money Transfer',
        tag: '#Transfer',
        receiptCode: `RCP-TRF-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      setCompletedTx(newTx);
      onCompleteTransfer(newTx);
      setStep('SUCCESS');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'DETAILS' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">Send Money</h3>
                <p className="text-xs text-slate-500">Zero transfer fee to any bank in Nigeria</p>
              </div>
            </div>

            {/* Mode Selector Pill */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setTransferMode('BANK')}
                className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  transferMode === 'BANK' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>To Bank Account</span>
              </button>
              <button
                onClick={() => setTransferMode('TAG')}
                className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  transferMode === 'TAG' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>To Paydra Tag</span>
              </button>
            </div>

            {transferMode === 'BANK' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 cursor-pointer"
                  >
                    {NIGERIAN_BANKS.map((b) => (
                      <option key={b.code} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Account Number</label>
                  <input
                    type="text"
                    maxLength={10}
                    value={accountNumber}
                    onChange={(e) => handleAccountChange(e.target.value)}
                    placeholder="e.g. 2019482751"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900"
                  />
                </div>

                {isLoadingName && (
                  <div className="text-xs text-indigo-600 font-bold flex items-center gap-1.5">
                    <span className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span>Resolving Account Name...</span>
                  </div>
                )}

                {recipientName && !isLoadingName && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified: {recipientName}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Paydra Tag / Username</label>
                  <input
                    type="text"
                    value={paydraTag}
                    onChange={(e) => setPaydraTag(e.target.value)}
                    placeholder="@username"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Amount (₦)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-mono font-bold text-slate-900"
              />

              <div className="grid grid-cols-4 gap-2 pt-2">
                {[1000, 5000, 10000, 50000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 font-bold text-xs rounded-xl border border-slate-200 cursor-pointer"
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Note / Narration (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Lunch money"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900"
              />
            </div>

            <button
              onClick={handleInitiate}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              Proceed to Confirm Transfer
            </button>
          </div>
        )}

        {step === 'PIN' && (
          <div className="space-y-4 text-center py-4">
            <h3 className="text-base font-black text-slate-900">Enter Security PIN</h3>
            <p className="text-xs text-slate-500">Enter your 4-digit Paydra authorization PIN</p>

            {isProcessing ? (
              <div className="py-8 space-y-3">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <span className="text-xs font-bold text-indigo-700 block">Processing NIP Instant Transfer...</span>
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
                          const nextInput = document.getElementById(`pin_${idx + 1}`);
                          nextInput?.focus();
                        }
                        if (newPin.join('').length === 4) {
                          handleConfirmPin(newPin.join(''));
                        }
                      }}
                      id={`pin_${idx}`}
                      className="w-12 h-12 text-center bg-slate-100 border border-slate-300 rounded-2xl text-lg font-black text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleConfirmPin(pin.join(''))}
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
                >
                  Confirm & Transfer ₦{parseFloat(amount).toLocaleString()}
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'SUCCESS' && completedTx && (
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-100 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">Transfer Successful!</h3>
              <span className="text-3xl font-black text-indigo-900 block font-sans">
                ₦{completedTx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <p className="text-xs text-slate-500 mt-1">Sent to {completedTx.recipientName}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 text-left border border-slate-200/80">
              <div className="flex justify-between"><span className="text-slate-500">Bank:</span><strong className="text-slate-900">{completedTx.recipientBank}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Account:</span><strong className="text-slate-900 font-mono">{completedTx.recipientAccount}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Reference:</span><strong className="text-slate-900 font-mono text-[10px]">{completedTx.reference}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Fee:</span><strong className="text-emerald-600 font-bold">₦0.00 FREE</strong></div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
            >
              Done & Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
