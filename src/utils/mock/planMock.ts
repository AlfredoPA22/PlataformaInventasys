import { CompanyPlan } from "../enums/companyPlan.enum";
import { pricePlanMock } from "./pricePlanMock";

export const myManagPlansMock = [
  {
    id: CompanyPlan.FREE,
    system: "MYMANAG",
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
      "Dashboard con datos generales y ventas por categoría",
      "Búsqueda de productos habilitada",
      "Reportes básicos en PDF (productos y ventas)",
      "Alertas de stock bajo (básico)",
      "Soporte por email (respuesta en 48h)",
    ],
  },
  {
    id: CompanyPlan.BASIC,
    system: "MYMANAG",
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
      "Dashboard completo con métricas por cliente, categoría y mes",
      "Movimientos detallados por producto y número de serie",
      "6 reportes en PDF: ventas, compras, productos, clientes, stock bajo y valor de inventario",
      "Alertas de stock bajo con exportación PDF",
      "Control de cuentas por cobrar",
      "Soporte por email (respuesta en 24h)",
    ],
  },
  {
    id: CompanyPlan.PRO,
    system: "MYMANAG",
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
      "Movimientos detallados y transferencias entre almacenes",
      "Gestión de productos serializados y no serializados",
      "Importación masiva de productos vía Excel o CSV",
      "8 reportes avanzados en PDF sin restricciones",
      "Análisis de rentabilidad por producto y categoría",
      "Reporte de valor de inventario y stock bajo",
      "Control completo de cuentas por cobrar",
      "Soporte prioritario (email y WhatsApp, respuesta en 6h)",
      "Acceso anticipado a nuevas funciones",
    ],
  },
];

export const reservaYaPlansMock = [
  {
    id: CompanyPlan.FREE,
    system: "RESERVAYA",
    name: "Gratis",
    price: "0 Bs / 7 días",
    description: "Prueba el sistema de reservas sin compromiso.",
    features: [
      "1 sede o local",
      "Hasta 5 servicios",
      "1 usuario",
      "Hasta 3 reservas por día",
      "Calendario básico de disponibilidad",
      "Gestión manual de reservas",
      "Soporte por email (respuesta en 48h)",
    ],
  },
  {
    id: CompanyPlan.BASIC,
    system: "RESERVAYA",
    name: "Básico",
    price: "199bs / mes",
    description: "Ideal para negocios con flujo constante de reservas.",
    features: [
      "Hasta 3 sedes o locales",
      "Hasta 50 servicios",
      "Hasta 5 usuarios",
      "Reservas ilimitadas",
      "Calendario avanzado de disponibilidad",
      "Gestión de turnos y horarios",
      "Notificaciones automáticas a clientes",
      "Reportes básicos de ocupación",
      "Soporte por email (respuesta en 24h)",
    ],
  },
  {
    id: CompanyPlan.PRO,
    system: "RESERVAYA",
    name: "Pro",
    price: "399bs / mes",
    description:
      "Para negocios con alto volumen de reservas y múltiples sedes.",
    features: [
      "Sedes ilimitadas",
      "Servicios ilimitados",
      "Usuarios ilimitados",
      "Reservas ilimitadas",
      "Calendario avanzado con gestión de recursos",
      "Notificaciones automáticas (email y WhatsApp)",
      "Reportes avanzados de ocupación y rendimiento",
      "Panel de análisis de clientes frecuentes",
      "Personalización de formularios de reserva",
      "Soporte prioritario (email y WhatsApp, respuesta en 6h)",
      "Acceso anticipado a nuevas funciones",
    ],
  },
];

// Backward compatibility
export const plansMock = myManagPlansMock;

export const getPlansBySystem = (system: string) => {
  if (system === "RESERVAYA") return reservaYaPlansMock;
  return myManagPlansMock;
};
