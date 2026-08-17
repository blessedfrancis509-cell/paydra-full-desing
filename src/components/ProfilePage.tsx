import React, { useState } from 'react';
import { UserProfile, Currency } from '../types';
import {
  User,
  ShieldCheck,
  CreditCard,
  Bell,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Lock,
  Headphones,
  FileText,
  Users,
  Award,
} from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  selectedCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenSecurityModal: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  selectedCurrency,
  onCurrencyChange,
  onOpenSecurityModal,
  onLogout,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyTag = () => {
    navigator.clipboard.writeText(user.veloTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-slate-900 animate-fade-in max-w-2xl mx-auto pb-6">
      {/* 1. PROFILE HERO CARD (OPAY "ME" TAB STYLING IN ROYAL PURPLE & WHITE) */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md shrink-0"
              />

              <div>
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                  <span>{user.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                </h2>
                <div className="flex items-center gap-2 text-xs text-indigo-100">
                  <span className="font-mono">{user.phone}</span>
                  <span>•</span>
                  <button
                    onClick={handleCopyTag}
                    className="font-bold text-amber-300 hover:text-white flex items-center gap-0.5 cursor-pointer font-mono"
                  >
                    <span>{user.veloTag}</span>
                    {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-indigo-200" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-white shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
          </div>

          {/* Verification Badge Bar */}
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black rounded-full text-[10px] uppercase">
                {user.tier} Verified
              </span>
              <span className="text-indigo-100 text-[11px] font-medium">Daily Limit: ₦25,000,000</span>
            </div>

            <button
              onClick={() => alert('Your account is fully verified at Tier 3 with Maximum Limits!')}
              className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-0.5 cursor-pointer"
            >
              <span>Limits Info</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. REWARDS & CASHBACK SUMMARY STRIP */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black shrink-0">
            🎁
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Cashback Earned</span>
            <span className="text-sm font-black text-slate-900 font-mono">₦{user.cashbackBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
            🏆
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Referral Bonus</span>
            <span className="text-sm font-black text-slate-900 font-mono">₦4,200.00</span>
          </div>
        </div>
      </div>

      {/* 3. MENU GROUP 1: ACCOUNT & SECURITY */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-1">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2 block mb-1">
          Account & Security
        </span>

        {[
          { label: 'Security Center & PIN Reset', icon: Lock, action: onOpenSecurityModal, badge: 'High Security' },
          { label: 'KYC Verification & Account Tier', icon: ShieldCheck, action: () => alert('Tier 3 Verified'), badge: 'Tier 3 Active' },
          { label: 'Bank Statements & Tax Reports', icon: FileText, action: () => alert('Downloading e-Statement...') },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="w-full py-3 px-2 flex items-center justify-between text-left hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. MENU GROUP 2: REWARDS & SUPPORT */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-1">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-2 block mb-1">
          Rewards & Support
        </span>

        {[
          { label: 'Refer & Earn (Get ₦1,000)', icon: Gift, action: () => alert('Referral Link Copied!') },
          { label: '24/7 AI Customer Support', icon: Headphones, action: () => alert('Connecting to Paydra 24/7 Support...') },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="w-full py-3 px-2 flex items-center justify-between text-left hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </button>
          );
        })}
      </div>

      {/* 5. LOGOUT BUTTON */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out of Paydra Account</span>
      </button>
    </div>
  );
};
