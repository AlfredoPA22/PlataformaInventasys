import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";

const plans = [
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
      "Exportaciones en PDF y Excel",
      "Soporte prioritario por email y WhatsApp (respuesta en 6h)",
      "Acceso anticipado a nuevas funciones",
    ],
  },
];

export default function SystemPlans() {
  const navigate = useNavigate();

  const handleStart = (planId: string) => {
    navigate(`/registrar-empresa?plan=${planId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-5 p-2 grid gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className="shadow-xl hover:shadow-2xl transition-all"
        >
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              {plan.name}
            </h2>
            <p className="text-center text-2xl font-bold text-gray-800">
              {plan.price}
            </p>
            <p className="text-center text-sm text-gray-600">
              {plan.description}
            </p>
            <ul className="text-sm space-y-1 pt-2 text-gray-700">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <Button
              className="w-full mt-4"
              onClick={() => handleStart(plan.id)}
            >
              Empezar con este plan
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
