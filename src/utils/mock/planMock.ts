import { CompanyPlan } from "../enums/companyPlan.enum";

export const plansMock = [
  {
    id: CompanyPlan.FREE,
    name: "Gratis",
    price: "0 Bs / 7 días",
    description:
      "Perfecto para probar el sistema sin compromiso antes de decidir.",
    features: [
      "1 Almacén",
      "Hasta 10 productos",
      "1 Usuario administrador",
      "1 Compra y 1 Venta disponibles",
      "Gestión de clientes y proveedores(limitado)",
      "Stock en tiempo real (limitado)",
      "Dashboard con métricas clave (limitado)",
      "Reportes básicos en PDF (limitado)",
      "Exportación en PDF (productos y ventas)",
      "Soporte por email (respuesta en 48h)",
    ],
  },
  {
    id: CompanyPlan.BASIC,
    name: "Básico",
    price: "59 Bs / mes",
    description:
      "Ideal para pequeños negocios que requieren control completo de su inventario.",
    features: [
      "Hasta 3 Almacenes",
      "Hasta 200 productos",
      "Hasta 3 usuarios",
      "Ventas y compras ilimitadas",
      "Gestión de clientes y proveedores",
      "Stock en tiempo real por almacén",
      "Dashboard con métricas clave",
      "Movimientos detallados por producto/serie",
      "Reportes filtrables por fechas y categorías",
      "Exportación en PDF",
      "Soporte por email (respuesta en 24h)",
    ],
  },
  {
    id: CompanyPlan.PRO,
    name: "Pro",
    price: "99 Bs / mes",
    description:
      "Para empresas que necesitan control total, operaciones ilimitadas y soporte avanzado.",
    features: [
      "Almacenes ilimitados",
      "Productos ilimitados",
      "Usuarios ilimitados",
      "Ventas y compras ilimitadas",
      "Gestión avanzada de clientes y proveedores",
      "Stock en tiempo real por almacén y producto",
      "Dashboard completo con métricas dinámicas",
      "Movimientos detallados (entradas, salidas, transferencias)",
      "Transferencias entre almacenes",
      "Gestión de productos serializados y no serializados",
      "Importación masiva de productos vía Excel o CSV",
      "Reportes avanzados por fecha, categoría, cliente, proveedor",
      "Exportaciones en PDF",
      "Soporte prioritario por email y WhatsApp (respuesta en 6h)",
      "Acceso anticipado a nuevas funciones",
    ],
  },
];
