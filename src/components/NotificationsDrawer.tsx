import React from 'react';
import { NotificationItem } from '../types';
import { X, Bell, CheckCheck, ShieldCheck, Gift, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-5 space-y-4 overflow-y-auto text-slate-900 border-l border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">Notifications</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark Read</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.read ? 'bg-slate-50 border-slate-200' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
