import React, { useState } from 'react';
import { Currency } from '../types';
import {
  Eye,
  EyeOff,
  Send,
  PlusCircle,
  Zap,
  ChevronRight,
  Smartphone,
  Wifi,
  Tv,
  Gamepad2,
  PiggyBank,
  Sparkles,
  Plus,
  ShieldCheck,
  UserCheck,
  Check,
  Copy,
} from 'lucide-react';

interface BalanceCardProps {
  balances: Record<Currency, number>;
  selectedCurrency: Currency;
  accountNumber: string;
  bankName: string;
  veloTag: string;
  onOpenSendMoney: () => void;
  onOpenAddMoney: () => void;
  onOpenRequestMoney: () => void;
  onOpenPayBills: (category?: 'DATA' | 'AIRTIME' | 'ELECTRICITY' | 'TV' | 'BETTING') => void;
  onOpenFXSwap: () => void;
  onOpenTransactions: () => void;
  onOpenVaults: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balances,
  selectedCurrency,
  accountNumber,
  bankName,
  veloTag,
  onOpenSendMoney,
  onOpenAddMoney,
  onOpenRequestMoney,
  onOpenPayBills,
  onOpenFXSwap,
  onOpenTransactions,
  onOpenVaults,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const formatBalance = (amount: number, curr: Currency) => {
    const symbol = curr === 'NGN' ? '₦' : curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£';
    return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-slate-900">
      {/* 1. HERO BALANCE CARD (OPAY DESIGN IN PURPLE & WHITE) */}
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-950 p-5 sm:p-7 text-white shadow-xl shadow-indigo-600/25 overflow-hidden">
        {/* Floating Glass Orbs */}
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-gradient-to-tr from-white/15 via-indigo-300/10 to-transparent border border-white/20 backdrop-blur-md pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full border border-purple-400/20 bg-purple-500/10 pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Top Row: Available Balance & Transaction History Link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-100 flex items-center gap-1">
                <span>Available Balance</span>
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 text-indigo-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                title={showBalance ? "Hide Balance" : "Show Balance"}
              >
                {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              onClick={onOpenTransactions}
              className="text-xs font-bold text-indigo-200 hover:text-white flex items-center gap-0.5 cursor-pointer hover:underline"
            >
              <span>Transaction History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Balance Amount & Add Money Button */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
              {showBalance ? formatBalance(balances[selectedCurrency], selectedCurrency) : '•••••••••'}
            </h2>

            <button
              onClick={onOpenAddMoney}
              className="px-4 py-2 bg-white text-indigo-900 hover:bg-purple-50 font-black text-xs rounded-full shadow-md flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Add Money</span>
            </button>
          </div>

          {/* Mini Recent Activity Ticker Row */}
          {showBalance && (
            <div className="py-1 px-3 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-between text-[10px] font-mono text-indigo-100 border border-white/10">
              <span className="truncate">Transfer to Isaac Ayomide</span>
              <span className="font-extrabold text-amber-300">-₦450,000.00</span>
            </div>
          )}

          {/* 3 Primary Transfer Action Buttons (To Paydra, To Bank, Withdraw) */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/15">
            <button
              onClick={onOpenSendMoney}
              className="py-2.5 px-3 bg-white/15 hover:bg-white/25 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>To Paydra</span>
            </button>

            <button
              onClick={onOpenSendMoney}
              className="py-2.5 px-3 bg-white/15 hover:bg-white/25 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <Send className="w-4 h-4 text-indigo-200" />
              <span>To Bank</span>
            </button>

            <button
              onClick={onOpenAddMoney}
              className="py-2.5 px-3 bg-white/15 hover:bg-white/25 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SERVICES QUICK GRID (SPECIFIC DIRECT PAGE REDIRECTION) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 text-center">
          {[
            { label: 'Airtime', icon: Smartphone, color: 'bg-purple-100 text-purple-700', action: () => onOpenPayBills('AIRTIME') },
            { label: 'Data', icon: Wifi, color: 'bg-indigo-100 text-indigo-700', action: () => onOpenPayBills('DATA') },
            { label: 'Betting', icon: Gamepad2, color: 'bg-emerald-100 text-emerald-700', action: () => onOpenPayBills('BETTING') },
            { label: 'TV', icon: Tv, color: 'bg-amber-100 text-amber-700', action: () => onOpenPayBills('TV') },
            { label: 'Electricity', icon: Zap, color: 'bg-amber-100 text-amber-700', action: () => onOpenPayBills('ELECTRICITY') },
            { label: 'SafeBox', icon: PiggyBank, color: 'bg-purple-100 text-purple-700', action: onOpenVaults },
            { label: 'Loan', icon: Sparkles, color: 'bg-indigo-100 text-indigo-700', action: () => onOpenPayBills('DATA') },
            { label: 'More', icon: ChevronRight, color: 'bg-slate-100 text-slate-700', action: () => onOpenPayBills() },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${item.color} flex items-center justify-center font-bold transition-all group-hover:scale-105 shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PROMOTIONAL AD BANNERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-3xl p-4 flex items-center justify-between border border-purple-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-md shrink-0">
              🎁
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">Receive money, win up to ₦1k!</h4>
              <p className="text-[10px] text-purple-200">Win up to ₦1k bonus</p>
            </div>
          </div>
          <button
            onClick={onOpenSendMoney}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl shadow-xs shrink-0 cursor-pointer"
          >
            Win
          </button>
        </div>

        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-4 flex items-center justify-between border border-indigo-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-black flex items-center justify-center text-lg shadow-md shrink-0">
              🚀
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">Cash up for grabs!</h4>
              <p className="text-[10px] text-indigo-200">Invite 3 friends & get ₦4,200 bonus</p>
            </div>
          </div>
          <button
            onClick={onOpenSendMoney}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};
