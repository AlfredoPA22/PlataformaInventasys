import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Stock en tiempo real con alertas de stock bajo",
    description:
      "Visualiza el inventario actualizado al instante desde cualquier dispositivo. Configura niveles mínimos por producto y recibe alertas automáticas antes de quedarte sin existencias.",
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
    title: "8 reportes avanzados exportables en PDF",
    description:
      "Ventas, compras, productos, valor de inventario, rentabilidad por producto y categoría, cuentas por cobrar y stock bajo. Filtra por fecha, almacén, cliente o proveedor.",
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

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
            Funcionalidades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F3853] tracking-tight mb-4">
            ¿Qué puedes hacer con Inventasys?
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Herramientas diseñadas para las necesidades reales de tu negocio,
            todo desde un solo lugar.
          </p>
        </div>

        {/* Feature rows — alternating image position */}
        <div className="flex flex-col gap-10 mb-14">
          {features.map((f, i) => {
            const imageRight = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col ${
                  imageRight ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 items-center rounded-2xl border border-gray-100 bg-slate-50/60 p-8 hover:border-[#A0C82E]/25 hover:shadow-md transition-all duration-300`}
              >
                {/* Image */}
                <div className="w-full md:w-5/12 flex-shrink-0">
                  <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-auto max-h-60 object-contain p-4"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#A0C82E]/15 text-[#6a8c1e] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F3853] mb-3 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA link */}
        <div className="text-center">
          <Link
            to="/detalles-sistema"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F3853] hover:text-[#A0C82E] transition-colors duration-300 group"
          >
            Ver detalles completos del sistema
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
