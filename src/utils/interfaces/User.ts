import type { JwtPayload } from "jwt-decode";
import type { ICompany } from "./Company";

export interface ILoginInput {
  clientId: string;
  credential: string;
}

export interface DecodedToken extends JwtPayload {
  id: string;
  fullName: string;
  email: string;
  picture: string;
  access: boolean;
  type: string;
}

export interface IUserLandingWithCompanies {
  _id: string;
  email: string;
  fullName: string;
  picture: string;
  user_type: string;
  createdAt: string;
  companies: ICompany[];
}
