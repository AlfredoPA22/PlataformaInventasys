import type { ICompany } from "./Company";

export interface IPayment {
  _id: string;
  company: ICompany;
  plan: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  paid_at: Date;
  proof_url: string;
  billing_info: {
    name: string;
    nit: string;
    email: string;
  };
}

export interface IPaymentInput {
  amount: number;
  billing_email?: string;
  billing_name?: string;
  billing_nit?: string;
  company: string;
  currency: string;
  method: string;
  plan: string;
  proof_url: string;
}
