import React, { useState, useEffect } from 'react';
import { VirtualCard, CardTheme } from '../types';
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sliders,
  AlertCircle,
  Receipt,
  HelpCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface CardsSectionProps {
  cards: VirtualCard[];
  onToggleFreeze: (cardId: string) => void;
  onUpdateLimit: (cardId: string, limit: number) => void;
  onCreateCard: (theme: CardTheme, brand: 'Mastercard' | 'Visa') => void;
}

export const CardsSection: React.FC<CardsSectionProps> = ({
  cards,
  onToggleFreeze,
  onUpdateLimit,
  onCreateCard,
}) => {
  const [cardTypeTab, setCardTypeTab] = useState<'VIRTUAL' | 'PHYSICAL'>('PHYSICAL');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [cardDesignVariant, setCardDesignVariant] = useState<number>(0);

  // 10-second automatic card pattern rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCardDesignVariant((prev) => (prev + 1) % 4);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const selectedCard = cards[activeCardIndex] || cards[0];

  return (
    <div className="space-y-5 text-slate-900 animate-fade-in max-w-md mx-auto pb-6">
      {/* 1. TOP HEADER BAR */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Cards</h1>
        <button
          onClick={() => alert('Paydra Card Q&A Help Center')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
        >
          <span>Q&A</span>
        </button>
      </div>

      {/* 2. SUB TABS (VIRTUAL CARD | PHYSICAL CARD) */}
      <div className="flex items-center justify-center gap-8 border-b border-slate-200 pb-2 text-sm font-bold">
        <button
          onClick={() => setCardTypeTab('VIRTUAL')}
          className={`pb-2 relative cursor-pointer transition-colors ${
            cardTypeTab === 'VIRTUAL' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Virtual Card</span>
          {cardTypeTab === 'VIRTUAL' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setCardTypeTab('PHYSICAL')}
          className={`pb-2 relative cursor-pointer transition-colors ${
            cardTypeTab === 'PHYSICAL' ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Physical Card</span>
          {cardTypeTab === 'PHYSICAL' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* 3. EXACT OPAY CARD DESIGN WITH LANDMARK BRIDGE VECTOR & SHAPES */}
      {selectedCard && (
        <div className="space-y-4">
          <div className="relative w-full aspect-[1.58/1] rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/90 overflow-hidden bg-slate-50 transition-all duration-700 group cursor-pointer">
            {/* Background Floating Squiggles & Dots Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10%" cy="15%" r="3" fill="#6D28D9" />
                <circle cx="90%" cy="20%" r="4" fill="#10B981" />
                <circle cx="80%" cy="40%" r="2" fill="#F59E0B" />
                <path d="M 20 80 Q 30 70 40 80 T 60 80" fill="none" stroke="#6D28D9" strokeWidth="2" />
                <path d="M 200 40 Q 210 30 220 40 T 240 40" fill="none" stroke="#10B981" strokeWidth="2" />
                <path d="M 120 120 Q 130 110 140 120 T 160 120" fill="none" stroke="#6D28D9" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Card Top Row: Paydra Logo & Verve/Mastercard */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-indigo-500 flex items-center justify-center text-white font-black text-xs shadow-xs">
                    P
                  </div>
                  <span className="text-xl font-black text-indigo-900 tracking-tight font-sans">Paydra</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-sm font-black italic tracking-tighter text-red-600 font-serif">Verve</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase block">DEBIT</span>
                </div>
              </div>

              {/* Gold EMV Chip */}
              <div className="my-auto py-1 flex items-center gap-2">
                <div className="w-10 h-8 rounded-md bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 border border-amber-600/50 shadow-xs p-1 flex flex-col justify-between">
                  <div className="w-full h-px bg-amber-800/40" />
                  <div className="w-full h-px bg-amber-800/40" />
                  <div className="w-full h-px bg-amber-800/40" />
                </div>
              </div>

              {/* Cardholder & Card Number Overlay */}
              {showCardDetails && (
                <div className="py-1">
                  <span className="text-xs font-black font-mono tracking-widest text-slate-900 block">
                    {selectedCard.cardNumber}
                  </span>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono pt-0.5">
                    <span>{selectedCard.cardHolderName}</span>
                    <span>EXP {selectedCard.expiryMonth}/{selectedCard.expiryYear} • CVV {selectedCard.cvv}</span>
                  </div>
                </div>
              )}

              {/* Bottom Vector Landmark Artwork (Lekki Ikoyi Link Bridge & National Theatre Shapes) */}
              <div className="w-full h-20 relative overflow-hidden rounded-b-2xl mt-auto">
                <svg className="w-full h-full" viewBox="0 0 350 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* National Stadium Dome */}
                  <path d="M 30 75 Q 75 35 120 75 Z" fill="#0D9488" opacity="0.85" />
                  <path d="M 40 75 Q 75 45 110 75 Z" fill="#14B8A6" opacity="0.6" />

                  {/* Lekki Cable Bridge Pylons & Cables */}
                  <path d="M 175 10 L 175 75" stroke="#0D9488" strokeWidth="4" />
                  <path d="M 280 20 L 280 75" stroke="#0D9488" strokeWidth="4" />

                  {/* Cables */}
                  <line x1="175" y1="10" x2="135" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />
                  <line x1="175" y1="25" x2="145" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />
                  <line x1="175" y1="40" x2="155" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />
                  <line x1="175" y1="10" x2="215" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />
                  <line x1="175" y1="25" x2="205" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />

                  <line x1="280" y1="20" x2="245" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />
                  <line x1="280" y1="35" x2="260" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />
                  <line x1="280" y1="20" x2="315" y2="75" stroke="#0D9488" strokeWidth="1.5" opacity="0.8" />

                  {/* Bridge Deck Base */}
                  <rect x="0" y="70" width="350" height="10" fill="#1E1B4B" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. CARD LOCK STATUS BANNER (PINK/PURPLE CONTAINER MATCHING SCREENSHOT) */}
          <div className="p-4 bg-pink-100/80 border border-pink-200 rounded-3xl flex items-center justify-between text-slate-900 shadow-2xs">
            <div className="space-y-1 max-w-[240px]">
              <h4 className="text-xs font-black text-slate-900 leading-snug">
                {selectedCard.isFrozen
                  ? 'Your card has been locked. Unlock your card to enjoy more benefits.'
                  : 'Your card is active and unlocked for online & POS payments.'}
              </h4>

              <button
                onClick={() => onToggleFreeze(selectedCard.id)}
                className="mt-1 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-full shadow-md transition-all cursor-pointer"
              >
                {selectedCard.isFrozen ? 'Unblock Card' : 'Lock Card'}
              </button>
            </div>

            <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shrink-0">
              {selectedCard.isFrozen ? <Lock className="w-7 h-7" /> : <Unlock className="w-7 h-7" />}
            </div>
          </div>

          {/* 5. 4 ACTION ICONS GRID (DETAILS, CARD SETTINGS, MANAGE DISPUTE, TRANSACTIONS) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="grid grid-cols-4 gap-3 text-center">
              {/* Details */}
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {showCardDetails ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </div>
                <span className="text-xs font-bold text-slate-800">Details</span>
              </button>

              {/* Card Settings */}
              <button
                onClick={() => {
                  const limitStr = prompt('Enter monthly card spending limit (₦):', '1000000');
                  if (limitStr) onUpdateLimit(selectedCard.id, parseFloat(limitStr));
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Card Settings</span>
              </button>

              {/* Manage Dispute */}
              <button
                onClick={() => alert('Opening Paydra Card Dispute Resolution Center...')}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Manage Dispute</span>
              </button>

              {/* Transactions */}
              <button
                onClick={() => alert('Showing card transaction history...')}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Receipt className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Transactions</span>
              </button>
            </div>
          </div>

          {/* 6. BOTTOM PROMO BANNER (LOST YOUR PAYDRA DEBIT CARD?) */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-4 flex items-center justify-between shadow-2xs">
            <div className="space-y-1">
              <h4 className="text-xs font-black text-indigo-950">Lost Your Paydra Debit Card?</h4>
              <p className="text-[10px] text-indigo-700">Block lost card & order replacement instantly</p>
              <button
                onClick={() => alert('Paydra Card Replacement Request initiated')}
                className="mt-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                View
              </button>
            </div>

            <div className="w-14 h-14 bg-indigo-200/60 rounded-2xl flex items-center justify-center text-indigo-800 font-black text-xl shadow-inner shrink-0">
              💳
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
