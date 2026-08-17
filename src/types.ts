export type Currency = 'NGN' | 'USD' | 'EUR' | 'GBP';

export type TransactionStatus = 'SUCCESSFUL' | 'PENDING' | 'FAILED';

export type TransactionCategory =
  | 'Transfer'
  | 'Bills'
  | 'Utilities'
  | 'Income'
  | 'Food & Dining'
  | 'Shopping'
  | 'Entertainment'
  | 'Transport'
  | 'Health'
  | 'Subscriptions'
  | 'General';

export interface Transaction {
  id: string;
  reference: string;
  type: 'DEBIT' | 'CREDIT' | 'INFLOW' | 'TRANSFER' | 'DATA' | 'AIRTIME' | 'BILL';
  title: string;
  amount: number;
  currency: Currency;
  fee: number;
  date: string;
  time: string;
  status: TransactionStatus;
  recipientName?: string;
  recipientAccount?: string;
  recipientBank?: string;
  senderName?: string;
  category: TransactionCategory;
  note?: string;
  tag?: string;
  cashbackEarned?: number;
  receiptCode?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  veloTag?: string;
  avatarUrl?: string;
  isFavorite?: boolean;
}

export type CardTheme = 'onyx' | 'emerald' | 'violet' | 'frost' | 'gold';

export interface VirtualCard {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  brand: 'Mastercard' | 'Visa';
  type: 'Virtual' | 'Physical';
  theme: CardTheme;
  isFrozen: boolean;
  spendingLimitMonthly: number;
  spentThisMonth: number;
  onlineTransactionsEnabled: boolean;
  atmWithdrawalsEnabled: boolean;
  internationalEnabled: boolean;
}

export interface VaultGoal {
  id: string;
  title: string;
  category: 'Emergency' | 'Investment' | 'Savings' | 'Education' | 'Travel' | 'Gadgets';
  targetAmount: number;
  currentAmount: number;
  interestRateAPY: number;
  startDate: string;
  targetDate?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  icon: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'INFO' | 'DEBIT' | 'CREDIT' | 'SECURITY' | 'REWARD';
  read: boolean;
  amount?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  bankName: string;
  veloTag: string;
  avatarUrl: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  dailyLimit: number;
  singleTxLimit: number;
  bvnMasked: string;
  ninMasked: string;
  cashbackBalance: number;
}
