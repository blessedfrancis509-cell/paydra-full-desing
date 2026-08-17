import React from 'react';
import { Transaction } from '../types';
import { BillsPage } from './BillsPage';

interface BillsAndServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onCompleteBillPayment: (tx: Transaction) => void;
}

export const BillsAndServicesModal: React.FC<BillsAndServicesModalProps> = ({
  isOpen,
  onClose,
  userBalance,
  onCompleteBillPayment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 max-h-[92vh] overflow-y-auto p-4 sm:p-6">
        <BillsPage
          userBalance={userBalance}
          onCompleteBillPayment={(tx) => {
            onCompleteBillPayment(tx);
            onClose();
          }}
          onBackToOverview={onClose}
        />
      </div>
    </div>
  );
};
