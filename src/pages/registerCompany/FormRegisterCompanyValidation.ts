import { object, string } from "yup";

export const schemaFormRegisterCompany = object().shape({
  name: string()
    .required("El nombre comercial es requerido")
    .min(3, "Debe tener al menos 3 caracteres"),
  legal_name: string().optional(),
  nit: string()
    .optional()
    .matches(/^\d{7,13}$/, "Debe ser un NIT válido"),
  email: string()
    .optional()
    .email("Debe ser un correo electrónico válido"),
  phone: string()
    .optional()
    .matches(/^\d{7,15}$/, "Debe ser un número de teléfono válido"),
  address: string().optional(),
  country: string().optional(),
  plan: string().required("Debe seleccionar un plan"),
  currency: string().required("Debe seleccionar una moneda"),
});