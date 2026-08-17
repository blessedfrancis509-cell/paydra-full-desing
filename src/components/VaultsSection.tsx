import React, { useState } from 'react';
import { VaultGoal, Transaction } from '../types';
import { PiggyBank, Plus, ShieldCheck, TrendingUp, Sparkles, Lock, DollarSign, Wallet } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'VAULTS' | 'INSIGHTS'>(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('500000');
  const [category, setCategory] = useState<VaultGoal['category']>('Savings');

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
    <div className="space-y-5 text-slate-900 animate-fade-in">
      {/* Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Paydra Finance & SafeVaults
          </h2>
          <p className="text-xs text-slate-500">High-yield high-security wealth builder & monthly cashflow AI</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-100 rounded-2xl flex text-xs font-bold">
            <button
              onClick={() => setActiveTab('VAULTS')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'VAULTS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600'
              }`}
            >
              SafeVaults
            </button>
            <button
              onClick={() => setActiveTab('INSIGHTS')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'INSIGHTS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600'
              }`}
            >
              AI Insights
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-1 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Vault</span>
          </button>
        </div>
      </div>

      {activeTab === 'INSIGHTS' ? (
        <AnalyticsSection
          transactions={transactions}
          categoryBudgets={categoryBudgets}
          userBalance={userBalance}
        />
      ) : (
        <div className="space-y-4">
          {/* High Yield Banner */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 text-white rounded-3xl border border-indigo-800 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-md shrink-0">
                🚀
              </div>
              <div>
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                  Earn up to 16.5% Annual Interest APY
                </span>
                <p className="text-xs text-indigo-100">
                  Daily interest payout compounded directly into your Paydra wallet!
                </p>
              </div>
            </div>
          </div>

          {/* Vaults Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vaults.map((vault) => {
              const progressPct = Math.min(100, Math.round((vault.currentAmount / vault.targetAmount) * 100));
              return (
                <div key={vault.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                        <PiggyBank className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{vault.title}</h4>
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {vault.interestRateAPY}% APY Interest
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">Saved: ₦{vault.currentAmount.toLocaleString()}</span>
                      <span className="text-slate-900">Target: ₦{vault.targetAmount.toLocaleString()}</span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const amtStr = prompt('Enter amount to deposit into vault (₦):', '10000');
                      if (amtStr) {
                        const amt = parseFloat(amtStr);
                        if (amt > 0) onDepositVault(vault.id, amt);
                      }
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 font-extrabold text-xs rounded-2xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    + Quick Top-Up Vault
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-black text-slate-900">Create New SafeVault</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Vault Goal Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. New Car Fund"
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
                Create Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
