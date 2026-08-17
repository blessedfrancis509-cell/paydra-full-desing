import React, { useState, useEffect } from 'react';
import { VirtualCard, CardTheme } from '../types';
import { CreditCard, Lock, Unlock, Eye, EyeOff, Plus, Sparkles, ShieldCheck, Zap, Wifi, CheckCircle2 } from 'lucide-react';

interface CardsSectionProps {
  cards: VirtualCard[];
  onToggleFreeze: (cardId: string) => void;
  onUpdateLimit: (cardId: string, limit: number) => void;
  onCreateCard: (theme: CardTheme, brand: 'Mastercard' | 'Visa') => void;
}

const THEME_STYLES: Record<CardTheme, {
  bg: string;
  glow: string;
  chipBg: string;
  accent: string;
  label: string;
  textColor: string;
}> = {
  violet: {
    bg: 'bg-gradient-to-tr from-indigo-950 via-purple-900 to-indigo-800',
    glow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    chipBg: 'from-amber-200 via-amber-300 to-yellow-500',
    accent: 'text-purple-200',
    label: 'Royal Amethyst Metallic',
    textColor: 'text-white',
  },
  onyx: {
    bg: 'bg-gradient-to-tr from-slate-950 via-zinc-900 to-black',
    glow: 'from-slate-400/10 via-amber-500/10 to-transparent',
    chipBg: 'from-yellow-100 via-amber-300 to-amber-500',
    accent: 'text-amber-300',
    label: 'Onyx Black World Elite',
    textColor: 'text-white',
  },
  emerald: {
    bg: 'bg-gradient-to-tr from-emerald-950 via-teal-900 to-slate-950',
    glow: 'from-emerald-400/20 via-teal-500/10 to-transparent',
    chipBg: 'from-emerald-200 via-emerald-400 to-teal-500',
    accent: 'text-emerald-200',
    label: 'Emerald Sovereign Metallic',
    textColor: 'text-white',
  },
  frost: {
    bg: 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-sky-950',
    glow: 'from-sky-400/20 via-indigo-400/10 to-transparent',
    chipBg: 'from-slate-100 via-sky-200 to-indigo-300',
    accent: 'text-sky-200',
    label: 'Sapphire Ice Platinum',
    textColor: 'text-white',
  },
  gold: {
    bg: 'bg-gradient-to-tr from-amber-950 via-amber-900 to-yellow-950',
    glow: 'from-amber-400/25 via-yellow-400/15 to-transparent',
    chipBg: 'from-yellow-100 via-amber-300 to-amber-500',
    accent: 'text-amber-200',
    label: 'Calabar Royal Gold',
    textColor: 'text-amber-100',
  },
};

export const CardsSection: React.FC<CardsSectionProps> = ({
  cards,
  onToggleFreeze,
  onUpdateLimit,
  onCreateCard,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<CardTheme>('violet');

  // 10-second automatic theme switching for debit card preview
  useEffect(() => {
    const themes: CardTheme[] = ['violet', 'onyx', 'emerald', 'frost', 'gold'];
    const timer = setInterval(() => {
      setCurrentTheme((prev) => {
        const nextIdx = (themes.indexOf(prev) + 1) % themes.length;
        return themes[nextIdx];
      });
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const selectedCard = cards[activeCardIndex] || cards[0];
  const activeStyle = THEME_STYLES[currentTheme];

  return (
    <div className="space-y-6 text-slate-900 animate-fade-in max-w-3xl mx-auto">
      {/* Top Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Paydra Metallic Cards
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black border border-purple-200 flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>10s Auto-Design</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">Virtual & physical metallic cards for NGN & global online shopping</p>
        </div>

        <button
          onClick={() => onCreateCard(currentTheme, 'Mastercard')}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Virtual Card</span>
        </button>
      </div>

      {/* METALLIC CARD PREVIEW (SLEEK REALISTIC CARD RATIO & SHINE) */}
      {selectedCard && (
        <div className="space-y-4">
          <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl p-6 sm:p-7 text-white shadow-2xl overflow-hidden border border-white/20 transition-all duration-700 group cursor-pointer">
            {/* Metallic Theme Background */}
            <div className={`absolute inset-0 ${activeStyle.bg} transition-colors duration-700`} />

            {/* Glossy Reflective Diagonal Glare Streak */}
            <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            {/* Light Aura Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activeStyle.glow} pointer-events-none`} />

            {/* Micro Embossed Mesh Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

            {/* Card Content Layout */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Row 1: Brand & Contactless */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-sm shadow-md">
                    P
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest uppercase block text-white">PAYDRA</span>
                    <span className={`text-[9px] font-bold block ${activeStyle.accent}`}>{activeStyle.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-white/80 rotate-90" />
                  <span className="px-2.5 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[9px] font-extrabold uppercase tracking-wider border border-white/20">
                    {selectedCard.type}
                  </span>
                </div>
              </div>

              {/* Row 2: EMV Gold Smart Chip */}
              <div className="flex items-center gap-4 my-auto py-1">
                <div className={`w-12 h-9 rounded-lg bg-gradient-to-tr ${activeStyle.chipBg} p-1 border border-amber-600/50 shadow-md relative overflow-hidden flex flex-col justify-between`}>
                  <div className="w-full h-px bg-amber-800/40" />
                  <div className="w-full h-px bg-amber-800/40" />
                  <div className="w-full h-px bg-amber-800/40" />
                </div>

                {selectedCard.isFrozen && (
                  <span className="px-2.5 py-1 bg-amber-500/90 text-slate-950 text-[10px] font-black rounded-lg border border-amber-300 flex items-center gap-1">
                    <Lock className="w-3 h-3 stroke-[3]" />
                    <span>FROZEN</span>
                  </span>
                )}
              </div>

              {/* Row 3: 16-Digit Card Number */}
              <div>
                <span className="text-lg sm:text-2xl font-black font-mono tracking-widest text-white drop-shadow-md block">
                  {showCardDetails ? selectedCard.cardNumber : selectedCard.cardNumber.replace(/\d{4}/g, '•••• ')}
                </span>
              </div>

              {/* Row 4: Cardholder & Expiry & Brand Logo */}
              <div className="flex items-end justify-between pt-1">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Card Holder</span>
                  <span className="text-xs font-black tracking-wider text-white uppercase">{selectedCard.cardHolderName}</span>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Expires</span>
                  <span className="text-xs font-black font-mono text-white">{selectedCard.expiryMonth}/{selectedCard.expiryYear}</span>
                </div>

                {/* Mastercard / Visa Dual Circles */}
                <div className="flex items-center">
                  {selectedCard.brand === 'Mastercard' ? (
                    <div className="flex items-center -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-red-600/90 shadow-md" />
                      <div className="w-6 h-6 rounded-full bg-amber-400/90 shadow-md" />
                    </div>
                  ) : (
                    <span className="text-base font-black italic tracking-tighter text-white font-serif">VISA</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Switcher Quick Bar */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Theme Preview:</span>
            {(['violet', 'onyx', 'emerald', 'frost', 'gold'] as CardTheme[]).map((themeKey) => (
              <button
                key={themeKey}
                onClick={() => setCurrentTheme(themeKey)}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                  currentTheme === themeKey ? 'scale-110 border-indigo-600 ring-2 ring-indigo-300' : 'border-white hover:scale-105'
                } ${
                  themeKey === 'violet' ? 'bg-indigo-700' :
                  themeKey === 'onyx' ? 'bg-slate-900' :
                  themeKey === 'emerald' ? 'bg-emerald-600' :
                  themeKey === 'frost' ? 'bg-sky-600' : 'bg-amber-500'
                }`}
                title={THEME_STYLES[themeKey].label}
              />
            ))}
          </div>

          {/* Action Controls & Freeze Button */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => setShowCardDetails(!showCardDetails)}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              {showCardDetails ? <EyeOff className="w-4 h-4 text-indigo-600" /> : <Eye className="w-4 h-4 text-indigo-600" />}
              <span>{showCardDetails ? 'Hide CVV' : 'Show CVV'}</span>
            </button>

            <button
              onClick={() => onToggleFreeze(selectedCard.id)}
              className={`p-3 border rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                selectedCard.isFrozen
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {selectedCard.isFrozen ? <Unlock className="w-4 h-4 text-amber-600" /> : <Lock className="w-4 h-4 text-slate-600" />}
              <span>{selectedCard.isFrozen ? 'Unfreeze' : 'Freeze Card'}</span>
            </button>

            <div className="col-span-2 p-3 bg-indigo-50/80 border border-indigo-100 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">Limit: ₦{selectedCard.spendingLimitMonthly.toLocaleString()}</span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Spent: ₦{selectedCard.spentThisMonth.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
