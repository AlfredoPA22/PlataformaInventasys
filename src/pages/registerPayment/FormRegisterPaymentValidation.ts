import { number, object, string } from "yup";

export const schemaFormRegisterPayment = object().shape({
  amount: number()
    .typeError("El monto debe ser un número")
    .required("El monto es requerido")
    .positive("El monto debe ser mayor a 0"),
  billing_name: string()
    .required("El nombre de facturacion es requerido")
    .min(3, "Debe tener al menos 3 caracteres"),
  billing_email: string()
    .notRequired()
    .email("Debe ser un correo electrónico válido"),
  billing_nit: string()
    .notRequired()
    .matches(/^\d{7,13}$/, "Debe ser un NIT válido"),
  method: string().required("Debe seleccionar un método"),
});
