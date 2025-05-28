import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Features: React.FC = () => {
  const features = [
    {
      title: "Control de Stock en Tiempo Real",
      description:
        "Visualiza en todo momento tu inventario disponible por almacén o producto.",
    },
    {
      title: "Productos Serializados y No Serializados",
      description: "Administra lotes o unidades únicas con facilidad.",
    },
    {
      title: "Reportes y Análisis de Ventas",
      description: "Obtén informes claros para tomar decisiones inteligentes.",
    },
    {
      title: "Gestión de Usuarios y Permisos",
      description: "Controla el acceso al sistema con roles personalizados.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">
        ¿Qué puedes hacer con Inventasys?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {features.map((f, i) => (
          <Card key={i} className="text-left">
            <CardHeader>
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Link
        to="/detalles-sistema"
        className="inline-block text-blue-600 font-semibold hover:underline mb-12"
      >
        Ver detalles completos del sistema &rarr;
      </Link>
    </div>
  );
};

export default Features;
