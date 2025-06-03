import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Features: React.FC = () => {
  const features = [
    {
      title: "Stock en tiempo real por almacén y producto",
      description:
        "Visualiza el inventario actualizado al instante desde cualquier dispositivo. Controla salidas, entradas y movimientos con precisión por almacén y evita quiebres de stock.",
      image:
        "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748938044/MyManag/assets/a9jo9i8evi9pnv6nwzft.png",
    },
    {
      title: "Gestión de productos serializados y no serializados",
      description:
        "Administra unidades únicas con número de serie o lotes masivos con facilidad. Lleva trazabilidad completa desde la compra hasta la venta o transferencia.",
      image:
        "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748938044/MyManag/assets/l25nrp8iqak8drjmcpq5.png",
    },
    {
      title: "Reportes filtrables y exportables",
      description:
        "Genera reportes por fechas, almacenes, categorías, clientes o proveedores. Descarga en PDF y toma decisiones respaldadas por datos.",
      image:
        "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748938043/MyManag/assets/jsmdcqjnymal9lndiguh.png",
    },
    {
      title: "Transferencias entre almacenes con validación",
      description:
        "Transfiere productos de un almacén a otro asegurando stock disponible. Valida cantidades, gestiona el estado de cada envío y conserva el historial de cada movimiento.",
      image:
        "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748938044/MyManag/assets/omosao9kqgtym6rvljgi.png",
    },
  ];

  return (
    <section className="px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          ¿Qué puedes hacer con Inventasys?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-base md:text-lg">
          Nuestro sistema está diseñado para adaptarse a las necesidades reales
          de tu negocio, facilitando la gestión desde un solo lugar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((f, i) => (
            <Card
              key={i}
              className="text-left shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-semibold text-blue-800 text-center">
                  {f.title}
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 p-4 flex justify-center">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-auto max-h-60 object-contain"
                  />
                </div>
                <CardContent className="w-full md:w-1/2 p-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    {f.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <Link
          to="/detalles-sistema"
          className="inline-block text-blue-600 font-medium text-sm md:text-base hover:underline transition-colors"
        >
          Ver detalles completos del sistema &rarr;
        </Link>
      </div>
    </section>
  );
};

export default Features;
