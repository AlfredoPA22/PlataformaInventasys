export const CompanyStatus = {
  PENDING: "pendiente",
  ACTIVE: "activo",
  EXPIRED: "expirado",
  SUSPENDED: "suspendido",
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];
