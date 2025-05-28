export const PaymentStatus = {
  REVIEW: "en_revision",
  APPROVED: "aprobado",
  REJECTED: "rechazado",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
