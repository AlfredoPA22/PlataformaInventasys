export const CompanyPlan = {
  FREE: "prueba",
  BASIC: "basico",
  PRO: "profesional",
} as const;

export type CompanyPlan = (typeof CompanyPlan)[keyof typeof CompanyPlan];
