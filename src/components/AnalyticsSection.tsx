import React from 'react';
import { Transaction } from '../types';
import { Sparkles, TrendingDown, ArrowUpRight, CheckCircle2, DollarSign, Wallet, Users } from 'lucide-react';

interface AnalyticsSectionProps {
  transactions: Transaction[];
  categoryBudgets: Record<string, { budgeted: number; spent: number }>;
  userBalance: number;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  transactions,
  categoryBudgets,
  userBalance,
}) => {
  return (
    <div className="space-y-4 text-slate-900 animate-fade-in">
      {/* Monthly Executive AI Spending Summary */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-indigo-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h3 className="text-sm font-black tracking-tight text-white">
            Paydra AI Executive Monthly Spending Report
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-indigo-200 uppercase font-bold block">Monthly Outflow</span>
            <span className="text-xl font-black text-white font-mono">₦245,000.00</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-indigo-200 uppercase font-bold block">Retained Surplus</span>
            <span className="text-xl font-black text-emerald-300 font-mono">₦705,290.45</span>
          </div>
        </div>

        <p className="text-xs text-indigo-100 leading-relaxed">
          💡 <strong className="text-amber-300 font-bold">AI Insight:</strong> You saved 74% of your income this month! Highest spend went to Software & Utility Bills.
        </p>
      </div>

      {/* Recipient Ranking (Who You Sent Money To) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
            Who You Sent Money To (August 2026)
          </h4>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Isaac Ayomide', bank: 'Kuda Bank', amount: 450000, pct: '65%' },
            { name: 'Chinedu Okonkwo', bank: 'GTBank', amount: 120000, pct: '18%' },
            { name: 'Blessing Paul', bank: 'OPAY', amount: 65000, pct: '10%' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{item.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">{item.bank}</span>
              </div>
              <div className="text-right">
                <span className="font-black text-slate-900 font-mono block">₦{item.amount.toLocaleString()}</span>
                <span className="text-[10px] text-indigo-600 font-bold">{item.pct} of transfers</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
