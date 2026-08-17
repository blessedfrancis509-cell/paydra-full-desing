import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
  isMobileFrame: boolean;
  onExitMobileFrame: () => void;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({
  children,
  isMobileFrame,
  onExitMobileFrame,
}) => {
  if (!isMobileFrame) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-6 transition-all">
      {/* Top Controls Bar */}
      <div className="w-full max-w-sm flex items-center justify-between mb-3 text-white px-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold tracking-tight">Paydra Mobile Preview</span>
        </div>

        <button
          onClick={onExitMobileFrame}
          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Exit Desktop View</span>
        </button>
      </div>

      {/* iPhone Simulator Frame */}
      <div className="w-full max-w-[410px] h-[840px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 relative overflow-hidden flex flex-col">
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3 pointer-events-none shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
          <div className="w-2 h-2 rounded-full bg-indigo-900/60" />
        </div>

        {/* Inner Phone Screen */}
        <div className="w-full h-full rounded-[38px] bg-slate-50 overflow-y-auto overflow-x-hidden relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
