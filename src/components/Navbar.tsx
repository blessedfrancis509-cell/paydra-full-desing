import React from 'react';
import { UserProfile, Currency } from '../types';
import { Bell, Headphones, QrCode, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  selectedCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  unreadNotificationCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-all text-slate-900 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: User Avatar + Greetings + Tier Badge (OPay Style) */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity cursor-pointer group"
          title="Open Profile Page"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600 shadow-xs shrink-0"
          />
          <div className="flex flex-col">
            <h1 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight flex items-center gap-1">
              <span>Hi, {user.name.split(' ')[0]}</span>
            </h1>
            <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 inline-block w-fit">
              Tier 3 Verified
            </span>
          </div>
        </button>

        {/* Right Icons: Customer Service (Headset), Notifications (Bell), Scan QR */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Customer Service Support */}
          <button
            onClick={() => alert('🎧 Opening Paydra 24/7 AI Customer Support')}
            className="p-2 text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-2xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            title="Customer Support"
          >
            <Headphones className="w-4 h-4" />
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-2xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Scan QR Code */}
          <button
            onClick={onOpenProfile}
            className="p-2 text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-2xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            title="Scan QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
