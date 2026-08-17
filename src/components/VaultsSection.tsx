import React, { useState } from 'react';
import { VaultGoal, Transaction } from '../types';
import {
  PiggyBank,
  Plus,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Lock,
  DollarSign,
  Wallet,
  Settings,
  ChevronRight,
  Eye,
  EyeOff,
  Gift,
  Target,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { AnalyticsSection } from './AnalyticsSection';

interface VaultsSectionProps {
  vaults: VaultGoal[];
  onCreateVault: (title: string, targetAmount: number, category: VaultGoal['category'], APY: number) => void;
  onDepositVault: (vaultId: string, amt: number) => void;
  transactions: Transaction[];
  categoryBudgets: Record<string, { budgeted: number; spent: number }>;
  userBalance: number;
  initialTab?: 'VAULTS' | 'INSIGHTS';
}

export const VaultsSection: React.FC<VaultsSectionProps> = ({
  vaults,
  onCreateVault,
  onDepositVault,
  transactions,
  categoryBudgets,
  userBalance,
  initialTab = 'VAULTS',
}) => {
  const [financeSubTab, setFinanceSubTab] = useState<'SAVINGS' | 'LOAN'>('SAVINGS');
  const [showBalance, setShowBalance] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('500000');
  const [category, setCategory] = useState<VaultGoal['category']>('Savings');

  const paydraWealthBalance = 3173.66;
  const interestToday = 0.09;
  const totalSavingsBalance = userBalance + paydraWealthBalance;

  const handleCreate = () => {
    if (!title) return alert('Please enter vault title');
    const target = parseFloat(targetAmount);
    if (!target || target <= 0) return alert('Please enter valid target amount');

    onCreateVault(title, target, category, 16.5);
    setIsModalOpen(false);
    setTitle('');
    alert('SafeVault created with 16.5% Annual APY interest!');
  };

  return (
    <div className="space-y-5 text-slate-900 animate-fade-in max-w-md mx-auto pb-6">
      {/* 1. TOP HEADER (FINANCE WITH SETTINGS GEAR) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Finance</h1>
        <button
          onClick={() => alert('Paydra Finance Settings')}
          className="p-2 text-slate-700 hover:text-indigo-600 bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Finance Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* 2. SUB TABS (SAVINGS | LOAN WITH HOT BADGE) */}
      <div className="flex items-center gap-8 border-b border-slate-200 pb-2 text-sm font-bold">
        <button
          onClick={() => setFinanceSubTab('SAVINGS')}
          className={`pb-2 relative cursor-pointer transition-colors ${
            financeSubTab === 'SAVINGS' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Savings</span>
          {financeSubTab === 'SAVINGS' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setFinanceSubTab('LOAN')}
          className={`pb-2 relative cursor-pointer transition-colors flex items-center gap-1.5 ${
            financeSubTab === 'LOAN' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Loan</span>
          <span className="px-2 py-0.2 bg-rose-500 text-white font-black text-[9px] rounded-full">
            Hot
          </span>
        </button>
      </div>

      {financeSubTab === 'LOAN' ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900">Paydra Nano Loans</h3>
          <p className="text-xs text-slate-500">Get instant zero-collateral overdraft up to ₦250,000</p>
          <button
            onClick={() => alert('Paydra Loan Application approved!')}
            className="w-full py-3 bg-indigo-600 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer"
          >
            Apply for Instant Loan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 3. HERO PURPLE SAVINGS CARD (EXACT LAYOUT FROM SCREENSHOT 1) */}
          <div className="bg-[#6D28D9] text-white rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-purple-200 font-bold">
                <span>Total Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:text-white cursor-pointer"
                >
                  {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={() => alert('Opening daily interest history...')}
                className="text-xs font-bold text-purple-200 hover:text-white flex items-center gap-0.5 cursor-pointer"
              >
                <span>Interest Credited Today</span>
                <span className="font-extrabold text-amber-300 ml-1">+₦{interestToday.toFixed(2)}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
                {showBalance ? `₦${totalSavingsBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '•••••••••'}
              </span>
            </div>

            {/* Breakdown List */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-2 text-xs">
              <div className="text-purple-200 font-extrabold uppercase text-[10px]">Available Balance</div>

              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white font-bold">Wallet</span>
                <div className="flex items-center gap-1 font-mono font-bold">
                  <span>₦{userBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                </div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/10">
                <span className="text-white font-bold">PaydraWealth</span>
                <div className="flex items-center gap-1 font-mono font-bold">
                  <span>₦{paydraWealthBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  <span className="text-emerald-300 text-[10px]">+₦{interestToday.toFixed(2)}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                </div>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-white font-bold">Fixed Savings</span>
                <div className="flex items-center gap-1 font-mono font-bold">
                  <span>₦250,000.00</span>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. 5 QUICK SAVINGS ICONS ROW (PaydraWealth, Targets, SafeBox, Fixed, Spend & Save) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { label: 'PaydraWealth', icon: PiggyBank, action: () => setIsModalOpen(true) },
                { label: 'Targets', icon: Target, action: () => setIsModalOpen(true) },
                { label: 'SafeBox', icon: Lock, action: () => setIsModalOpen(true) },
                { label: 'Fixed', icon: Lock, action: () => setIsModalOpen(true) },
                { label: 'Spend & Save', icon: Wallet, action: () => setIsModalOpen(true) },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={item.action}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-purple-50 text-indigo-600 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform border border-purple-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 tracking-tight truncate w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. PROMO CARDS & BANNERS GRID (MATCHING SCREENSHOT 2) */}
          <div className="space-y-3">
            {/* Mint Green Affiliate Banner */}
            <div className="bg-emerald-100/80 border border-emerald-200 rounded-3xl p-4 flex items-center justify-between text-slate-900 shadow-2xs">
              <div className="space-y-1 max-w-[230px]">
                <span className="text-xs font-black text-emerald-950 block">Paydra Affiliate Program</span>
                <p className="text-[10px] text-emerald-800 leading-snug">
                  Earn up to ₦50,000 every week by inviting friends
                </p>
                <button
                  onClick={() => alert('Referral link copied!')}
                  className="mt-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-full shadow-xs cursor-pointer"
                >
                  Save Now
                </button>
              </div>

              <div className="w-14 h-14 bg-emerald-300/60 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0">
                💰
              </div>
            </div>

            {/* Grid 2-Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-950">Big Friday</span>
                  <span className="px-2 py-0.2 bg-rose-500 text-white text-[9px] font-black rounded-full">NEW</span>
                </div>
                <p className="text-[10px] text-emerald-800">Get 25% p.a. every Friday!</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-3xl p-4 space-y-2">
                <span className="text-xs font-black text-purple-950 block">Find a Target</span>
                <p className="text-[10px] text-purple-800">Join 6 Million+ members saving together</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1 bg-purple-600 text-white font-bold text-[10px] rounded-xl cursor-pointer"
                >
                  Join Now
                </button>
              </div>
            </div>

            {/* Embedded AI Vault Assistant Section */}
            <AnalyticsSection
              transactions={transactions}
              categoryBudgets={categoryBudgets}
              userBalance={userBalance}
            />
          </div>

          {/* Footer Security Badge */}
          <div className="pt-2 text-center text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>PaydraWealth and Savings Powered by CBN Licensed Microfinance Bank</span>
          </div>
        </div>
      )}

      {/* Create Vault Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 border border-slate-200 shadow-2xl text-slate-900">
            <h3 className="text-base font-black text-slate-900">Create SafeVault Target Goal</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Goal Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. New iPhone Fund"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Target Amount (₦)</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-1/2 py-3 bg-slate-100 font-bold rounded-2xl text-xs text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="w-1/2 py-3 bg-indigo-600 text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
