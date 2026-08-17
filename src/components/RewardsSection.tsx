import React from 'react';
import { Gift, Sparkles, Award, ArrowRight, Zap, PiggyBank } from 'lucide-react';

interface RewardsSectionProps {
  userBalance: number;
  onOpenBills: () => void;
  onOpenVaults: () => void;
}

export const RewardsSection: React.FC<RewardsSectionProps> = ({
  userBalance,
  onOpenBills,
  onOpenVaults,
}) => {
  return (
    <div className="space-y-5 text-slate-900 animate-fade-in">
      {/* Rewards Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-indigo-700 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-400 text-slate-950 font-black rounded-xl text-xs">
            🎁 Paydra Rewards
          </div>
          <span className="text-xs text-amber-300 font-extrabold">Instant Wallet Cashback</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-indigo-200 uppercase font-bold block">Cashback Earned</span>
            <span className="text-2xl font-black text-white font-mono">₦20.48</span>
          </div>

          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-indigo-200 uppercase font-bold block">Vouchers Claimed</span>
            <span className="text-2xl font-black text-amber-300 font-mono">3 Active</span>
          </div>
        </div>
      </div>

      {/* Friday Freebie & Daily Cashback Offers */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Active Daily Offers & Cashback</span>
        </h3>

        <div className="space-y-3">
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black flex items-center justify-center">
                📱
              </div>
              <div>
                <h4 className="text-xs font-black text-purple-950">2% Airtime & Data Cashback</h4>
                <p className="text-[10px] text-purple-700">Earn up to ₦500 cashback on every recharge</p>
              </div>
            </div>

            <button
              onClick={onOpenBills}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Recharge
            </button>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center">
                💰
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-950">16.5% APY SafeVault Savings</h4>
                <p className="text-[10px] text-emerald-700">Daily compounding interest on wallet savings</p>
              </div>
            </div>

            <button
              onClick={onOpenVaults}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Start Vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
