import type { JwtPayload } from "jwt-decode";

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
