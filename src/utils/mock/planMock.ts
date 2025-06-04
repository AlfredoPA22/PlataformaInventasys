import { CompanyPlan } from "../enums/companyPlan.enum";
import { pricePlanMock } from "./pricePlanMock";

export const plansMock = [
  {
    id: CompanyPlan.FREE,
    name: "Gratis",
    price: "0 Bs / 7 días",
    description:
      "Perfecto para probar el sistema sin compromiso antes de decidir.",
    features: [
      "1 almacén",
      "Hasta 10 productos",
      "1 usuario y 1 rol",
      "Compras, ventas y pagos limitados a 3 operaciones",
      "Hasta 3 clientes y 3 proveedores",
      "Hasta 3 marcas y 3 categorías",
      "Stock en tiempo real (básico)",
      "Dashboard limitado (datos generales, ventas por categoría)",
      "Búsqueda de productos habilitada",
      "Reportes básicos (PDF de productos y ventas)",
      "Soporte por email (respuesta en 48h)",
    ],
  },
  {
    id: CompanyPlan.BASIC,
    name: "Básico",
    price: `${pricePlanMock.basic}bs / mes`,
    description:
      "Ideal para pequeños negocios que requieren control completo de su inventario.",
    features: [
      "Hasta 3 almacenes",
      "Hasta 200 productos",
      "Hasta 3 usuarios y 3 roles",
      "Compras, ventas y pagos limitados a 100 operaciones por mes",
      "Hasta 50 clientes y 50 proveedores",
      "Hasta 50 marcas y 50 categorías",
      "Gestión completa de stock en tiempo real",
      "Dashboard completo con reportes por cliente, categoría y mes",
      "Movimientos detallados por producto y serie",
      "Exportación en PDF habilitada",
      "Reportes avanzados (por fecha, categoría, cliente, proveedor)",
      "Soporte por email (respuesta en 24h)",
    ],
  },
  {
    id: CompanyPlan.PRO,
    name: "Pro",
    price: `${pricePlanMock.pro}bs / mes`,
    description:
      "Para empresas que necesitan control total, operaciones ilimitadas y soporte avanzado.",
    features: [
      "Almacenes ilimitados",
      "Productos ilimitados",
      "Usuarios y roles ilimitados",
      "Compras, ventas y pagos ilimitados",
      "Clientes, proveedores, marcas y categorías ilimitadas",
      "Stock en tiempo real por almacén y producto",
      "Dashboard completo con todas las métricas",
      "Búsqueda de productos habilitada",
      "Movimientos detallados y transferencias entre almacenes",
      "Gestión de productos serializados y no serializados",
      "Importación masiva de productos vía Excel o CSV",
      "Reportes avanzados (por fecha, categoría, cliente, proveedor)",
      "Exportaciones en PDF sin restricciones",
      "Soporte prioritario (email y WhatsApp, respuesta en 6h)",
      "Acceso anticipado a nuevas funciones",
    ],
  },
];
