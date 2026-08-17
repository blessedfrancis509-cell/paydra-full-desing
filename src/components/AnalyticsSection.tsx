import React, { useState } from 'react';
import { Transaction } from '../types';
import { Sparkles, TrendingDown, ArrowUpRight, CheckCircle2, DollarSign, Wallet, Users, Flame, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

interface AnalyticsSectionProps {
  transactions: Transaction[];
  categoryBudgets: Record<string, { budgeted: number; spent: number }>;
  userBalance: number;
}

interface VaultAssistantAdvice {
  message: string;
  cta: string;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  transactions,
  categoryBudgets,
  userBalance,
}) => {
  const [gModeEnabled, setGModeEnabled] = useState(false);
  const [lastBigSpendAmt, setLastBigSpendAmt] = useState<number | null>(450000);

  // Vault Assistant Advice Generator Engine
  const getAssistantAdvice = (): VaultAssistantAdvice => {
    if (lastBigSpendAmt && lastBigSpendAmt >= 100000 && gModeEnabled) {
      return {
        message: `Bro ah ah 😳 You just send ₦${lastBigSpendAmt.toLocaleString()}. If money finish nobody go send for you ioo!`,
        cta: `Move ₦50,000 into Emergency SafeVault Now 🛡️`,
      };
    }

    if (gModeEnabled) {
      return {
        message: `Bro calm down o 😅 Budget don reach 74%. Make we adjust am before weekend enter?`,
        cta: `Lock ₦20,000 into SafeVault (16.5% APY) 🚀`,
      };
    }

    return {
      message: `Your monthly spending is 28% higher than last month. We recommend setting a spending cap on transfer outflows.`,
      cta: `Create Auto-Save Vault Rule (Earn 16.5% APY) 📈`,
    };
  };

  const advice = getAssistantAdvice();

  return (
    <div className="space-y-4 text-slate-900 animate-fade-in">
      {/* PAYDRA AI VAULT ASSISTANT CARD (ROYAL PURPLE #6D28D9 BRANDING) */}
      <div className="bg-[#6D28D9] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-purple-500/30 space-y-4 relative overflow-hidden">
        {/* Glowing Orb Backdrop */}
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md text-amber-300 flex items-center justify-center font-black shadow-md border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Vault Assistant</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  AI Smart Mode
                </span>
              </h3>
              <p className="text-[11px] text-purple-200">Royal Purple Financial Advisory Engine</p>
            </div>
          </div>

          {/* G-Mode Toggle Switch */}
          <div className="flex items-center gap-2 bg-purple-950/60 p-1.5 rounded-2xl border border-purple-400/30">
            <span className="text-[10px] font-black uppercase text-purple-200 pl-1">
              {gModeEnabled ? '🔥 G-Mode ON' : '💼 Pro Mode'}
            </span>
            <button
              onClick={() => setGModeEnabled(!gModeEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                gModeEnabled ? 'bg-amber-400 justify-end' : 'bg-purple-800 justify-start'
              }`}
            >
              <div className={`w-5 h-5 rounded-full shadow-md transition-transform ${
                gModeEnabled ? 'bg-slate-950' : 'bg-white'
              }`} />
            </button>
          </div>
        </div>

        {/* AI Output Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 relative z-10">
          <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
            "{advice.message}"
          </p>

          <button
            onClick={() => alert(`Applied Vault Assistant recommendation: ${advice.cta}`)}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>{advice.cta}</span>
          </button>
        </div>
      </div>

      {/* Monthly Executive AI Spending Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h3 className="text-sm font-black tracking-tight text-white">
            Paydra AI Executive Monthly Cashflow Report
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
