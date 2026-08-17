import React from 'react';
import { ShieldCheck, PiggyBank, CreditCard, ChevronRight, Sparkles } from 'lucide-react';

interface InfoCarouselProps {
  onOpenSecurityModal: () => void;
  onNavigateVaults: () => void;
  onNavigateCards: () => void;
}

export const InfoCarousel: React.FC<InfoCarouselProps> = ({
  onOpenSecurityModal,
  onNavigateVaults,
  onNavigateCards,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Paydra Smart Features</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: SafeVault High Yield */}
        <button
          onClick={onNavigateVaults}
          className="p-4 bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl text-left border border-indigo-800 shadow-xs hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-amber-400 text-slate-950 font-black rounded-xl text-xs">
              16.5% APY
            </div>
            <PiggyBank className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">High-Yield SafeVaults</h4>
            <p className="text-[10px] text-indigo-200 mt-0.5">Build daily interest on your savings</p>
          </div>
        </button>

        {/* Card 2: Metallic Virtual Cards */}
        <button
          onClick={onNavigateCards}
          className="p-4 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl text-left border border-slate-800 shadow-xs hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-500 text-white font-black rounded-xl text-xs">
              Virtual NGN/FX
            </div>
            <CreditCard className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">Paydra Metallic Cards</h4>
            <p className="text-[10px] text-slate-300 mt-0.5">10s auto-rotating Naija design themes</p>
          </div>
        </button>

        {/* Card 3: Security & Verification */}
        <button
          onClick={onOpenSecurityModal}
          className="p-4 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl text-left border border-emerald-800 shadow-xs hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-emerald-400 text-slate-950 font-black rounded-xl text-xs">
              Tier 3 KYC
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">Account Security Center</h4>
            <p className="text-[10px] text-emerald-200 mt-0.5">PIN, Biometrics & CBN Insurance</p>
          </div>
        </button>
      </div>
    </div>
  );
};
