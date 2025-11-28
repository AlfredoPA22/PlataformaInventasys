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
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0F3853] mb-6">
            ¿Qué puedes hacer con Inventasys?
          </h2>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-base md:text-xl leading-relaxed">
            Nuestro sistema está diseñado para adaptarse a las necesidades reales
            de tu negocio, facilitando la gestión desde un solo lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((f, i) => (
            <Card
              key={i}
              className="text-left shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border-2 border-transparent hover:border-[#A0C82E]/30 transform hover:scale-105 bg-gradient-to-br from-white to-gray-50/50"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold text-[#0F3853] text-center">
                  {f.title}
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/2 p-6 flex justify-center bg-gradient-to-br from-[#A0C82E]/10 to-transparent rounded-lg">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-auto max-h-64 object-contain drop-shadow-lg"
                  />
                </div>
                <CardContent className="w-full md:w-1/2 p-6">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <Link
          to="/detalles-sistema"
          className="inline-flex items-center gap-2 text-[#0F3853] font-semibold text-base md:text-lg hover:text-[#A0C82E] transition-all duration-300 group"
        >
          Ver detalles completos del sistema
          <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
        </Link>
      </div>
    </section>
  );
};

export default Features;
