import React from 'react';
import { Beneficiary } from '../types';
import { Plus, User, Star } from 'lucide-react';

interface BeneficiariesRowProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (b: Beneficiary) => void;
  onAddBeneficiary: () => void;
}

export const BeneficiariesRow: React.FC<BeneficiariesRowProps> = ({
  beneficiaries,
  onSelectBeneficiary,
  onAddBeneficiary,
}) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Quick Send Beneficiaries</span>
        </h3>
        <button
          onClick={onAddBeneficiary}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
        >
          <span>+ Add New</span>
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {/* Add New Beneficiary Avatar Pill */}
        <button
          onClick={onAddBeneficiary}
          className="flex flex-col items-center gap-1.5 group shrink-0 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-indigo-50 border-2 border-dashed border-indigo-300 text-indigo-600 flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-indigo-100">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-slate-600 truncate max-w-[64px]">New</span>
        </button>

        {/* Saved Beneficiary Avatars */}
        {beneficiaries.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelectBeneficiary(b)}
            className="flex flex-col items-center gap-1.5 group shrink-0 cursor-pointer"
          >
            <div className="relative">
              {b.avatarUrl ? (
                <img
                  src={b.avatarUrl}
                  alt={b.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 transition-all group-hover:border-indigo-600 group-hover:scale-105 shadow-2xs"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-700 flex items-center justify-center font-extrabold text-sm transition-all group-hover:border-indigo-600 group-hover:scale-105">
                  {b.name.charAt(0)}
                </div>
              )}
              {b.isFavorite && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border border-white flex items-center justify-center">
                  <Star className="w-2 h-2 text-slate-950 fill-slate-950" />
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-800 truncate max-w-[68px] text-center">
              {b.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
