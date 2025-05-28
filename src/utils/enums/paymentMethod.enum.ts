export const PaymentMethod = {
  QR: "qr",
  TRANSFER: "transferencia",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
