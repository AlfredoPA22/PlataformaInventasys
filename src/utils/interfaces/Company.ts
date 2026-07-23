import type { IPayment } from "./Payment";

export interface ICompanySubscription {
  system: string;
  plan: string;
  status: string;
  trial_expires_at?: string;
  subscription_expires_at?: string;
  notified_before_expiration?: boolean;
  latest_payment?: Pick<IPayment, "_id" | "status" | "paid_at" | "plan" | "system"> | null;
}

export interface ICompanyInput {
  name: string;
  legal_name?: string;
  nit?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  plan: string;
  currency: string;
  system?: string;
}

export interface ICompany {
  _id: string;
  name: string;
  legal_name: string;
  nit: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  image: string;
  currency: string;
  plan: string;
  status: string;
  trial_expires_at: Date;
  subscription_expires_at: Date;
  subscriptions?: ICompanySubscription[];
}

export interface ICompanyDeletionReport {
  companyName: string;
  products: number;
  brands: number;
  categories: number;
  providers: number;
  clients: number;
  warehouses: number;
  roles: number;
  users: number;
  saleOrders: number;
  saleOrderDetails: number;
  purchaseOrders: number;
  purchaseOrderDetails: number;
  salePayments: number;
  saleReturns: number;
  saleReturnDetails: number;
  productTransfers: number;
  productTransferDetails: number;
  productInventory: number;
  productSerials: number;
  notifications: number;
  payments: number;
  codeGenerators: number;
}

export interface ICompanyWithPayment {
  _id: string;
  name: string;
  legal_name: string;
  nit: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  image: string;
  currency: string;
  plan: string;
  status: string;
  trial_expires_at: Date;
  subscription_expires_at: Date;
  subscriptions?: ICompanySubscription[];
  latest_payment: IPayment;
}
