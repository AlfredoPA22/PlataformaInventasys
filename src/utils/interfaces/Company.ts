import type { IPayment } from "./Payment";

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
  latest_payment: IPayment;
}
