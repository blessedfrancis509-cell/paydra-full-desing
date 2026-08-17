import React from 'react';
import { Transaction } from '../types';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Zap,
  ChevronRight,
  Receipt,
  Gift,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
  onOpenSendMoney: () => void;
  limit?: number;
  onViewAll?: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onSelectTransaction,
  onOpenSendMoney,
  limit,
  onViewAll,
}) => {
  const displayList = limit ? transactions.slice(0, limit) : transactions;

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'TRANSFER':
      case 'DEBIT':
        return <ArrowUpRight className="w-5 h-5 text-indigo-600" />;
      case 'INFLOW':
      case 'CREDIT':
        return <ArrowDownLeft className="w-5 h-5 text-emerald-600" />;
      case 'DATA':
      case 'AIRTIME':
        return <Smartphone className="w-5 h-5 text-purple-600" />;
      case 'BILL':
        return <Zap className="w-5 h-5 text-amber-600" />;
      default:
        return <Receipt className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
            Recent Transactions
          </h3>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {displayList.map((tx) => {
          const isDebit = tx.type === 'TRANSFER' || tx.type === 'DEBIT' || tx.type === 'DATA' || tx.type === 'AIRTIME' || tx.type === 'BILL';
          return (
            <button
              key={tx.id}
              onClick={() => onSelectTransaction(tx)}
              className="w-full py-3 flex items-center justify-between gap-3 text-left hover:bg-slate-50 rounded-2xl px-2 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isDebit ? 'bg-indigo-50 border border-indigo-100' : 'bg-emerald-50 border border-emerald-100'
                }`}>
                  {getIcon(tx.type)}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {tx.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                    <span>{tx.date} • {tx.time}</span>
                    <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 font-sans font-bold">
                      {tx.tag || tx.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs font-black tracking-tight block ${isDebit ? 'text-slate-900' : 'text-emerald-600'}`}>
                  {isDebit ? '-' : '+'}₦{tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Success</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
