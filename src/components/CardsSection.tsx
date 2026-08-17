import React, { useState, useEffect } from 'react';
import { VirtualCard, CardTheme } from '../types';
import { CreditCard, Lock, Unlock, Eye, EyeOff, Plus, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface CardsSectionProps {
  cards: VirtualCard[];
  onToggleFreeze: (cardId: string) => void;
  onUpdateLimit: (cardId: string, limit: number) => void;
  onCreateCard: (theme: CardTheme, brand: 'Mastercard' | 'Visa') => void;
}

const THEME_STYLES: Record<CardTheme, { bg: string; border: string; accent: string; label: string }> = {
  violet: {
    bg: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950',
    border: 'border-purple-500/30',
    accent: 'text-purple-300',
    label: 'Yoruba Adire Pattern',
  },
  onyx: {
    bg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-black',
    border: 'border-slate-700/50',
    accent: 'text-slate-300',
    label: 'Edo Bronze Pattern',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    label: 'Igbo Nsibidi Pattern',
  },
  frost: {
    bg: 'bg-gradient-to-br from-sky-900 via-indigo-950 to-slate-950',
    border: 'border-sky-400/30',
    accent: 'text-sky-300',
    label: 'Calabar Gold Pattern',
  },
  gold: {
    bg: 'bg-gradient-to-br from-amber-800 via-amber-950 to-slate-950',
    border: 'border-amber-400/40',
    accent: 'text-amber-300',
    label: 'Hausa Arewa Pattern',
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
    <div className="space-y-6 text-slate-900 animate-fade-in">
      {/* Header */}
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
          <p className="text-xs text-slate-500">Virtual & physical debit cards for global NGN & FX transactions</p>
        </div>

        <button
          onClick={() => onCreateCard(currentTheme, 'Mastercard')}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Card</span>
        </button>
      </div>

      {/* METALLIC DEBIT CARD DISPLAY WITH 10S THEME ROTATION */}
      {selectedCard && (
        <div className="space-y-4">
          <div className={`relative w-full h-56 sm:h-64 rounded-3xl p-6 text-white shadow-2xl overflow-hidden border ${activeStyle.bg} ${activeStyle.border} transition-all duration-700`}>
            {/* Background Tribal Texture Overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Top Row: Paydra Metallic Logo & Brand */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xs border border-white/30">
                    P
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-widest uppercase block">PAYDRA</span>
                    <span className={`text-[9px] font-bold block ${activeStyle.accent}`}>{activeStyle.label}</span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                  {selectedCard.type}
                </span>
              </div>

              {/* EMV Chip & Contactless */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-8 bg-gradient-to-r from-amber-200 to-amber-400 rounded-lg border border-amber-500/50 shadow-inner flex items-center justify-center">
                  <div className="w-6 h-5 border border-amber-600/40 rounded-xs" />
                </div>
                <Zap className="w-5 h-5 text-amber-300 opacity-80" />
              </div>

              {/* Card Number */}
              <div>
                <span className="text-lg sm:text-xl font-black font-mono tracking-widest text-white drop-shadow-md">
                  {showCardDetails ? selectedCard.cardNumber : selectedCard.cardNumber.replace(/\d{4}/g, '••••')}
                </span>
              </div>

              {/* Card Holder & Expiry */}
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Card Holder</span>
                  <span className="text-xs font-extrabold tracking-wider">{selectedCard.cardHolderName}</span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">Expires</span>
                  <span className="text-xs font-extrabold font-mono">{selectedCard.expiryMonth}/{selectedCard.expiryYear}</span>
                </div>

                <div className="font-black italic text-lg tracking-tight text-amber-400">
                  {selectedCard.brand}
                </div>
              </div>
            </div>
          </div>

          {/* Card Controls & Freeze Toggle */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setShowCardDetails(!showCardDetails)}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              {showCardDetails ? <EyeOff className="w-4 h-4 text-indigo-600" /> : <Eye className="w-4 h-4 text-indigo-600" />}
              <span>{showCardDetails ? 'Hide CVV & Number' : 'Show Card Details'}</span>
            </button>

            <button
              onClick={() => onToggleFreeze(selectedCard.id)}
              className={`p-3 border rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                selectedCard.isFrozen
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              {selectedCard.isFrozen ? <Unlock className="w-4 h-4 text-amber-600" /> : <Lock className="w-4 h-4 text-slate-600" />}
              <span>{selectedCard.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
            </button>

            <div className="col-span-2 p-3 bg-indigo-50/80 border border-indigo-100 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">Monthly Limit: ₦{selectedCard.spendingLimitMonthly.toLocaleString()}</span>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Spent: ₦{selectedCard.spentThisMonth.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
