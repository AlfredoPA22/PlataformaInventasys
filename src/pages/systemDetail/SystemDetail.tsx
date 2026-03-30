import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { myManagPlansMock } from "@/utils/mock/planMock";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "📦",
    title: "Control de stock en tiempo real",
    description:
      "Visualiza la disponibilidad por almacén al instante. El sistema actualiza automáticamente el stock al registrar compras, ventas o transferencias.",
  },
  {
    icon: "🏪",
    title: "Múltiples almacenes",
    description:
      "Gestiona varios depósitos o sucursales desde un solo panel. Transfiere productos entre almacenes con validación automática de disponibilidad.",
  },
  {
    icon: "🛒",
    title: "Compras y ventas integradas",
    description:
      "Módulo completo de compras y ventas con control de crédito, pagos parciales y seguimiento de estados en tiempo real.",
  },
  {
    icon: "📊",
    title: "Reportes exportables",
    description:
      "Genera informes detallados en PDF sobre ventas, compras, inventario y productos más vendidos. Filtra por fecha, categoría, cliente o proveedor.",
  },
  {
    icon: "👥",
    title: "Usuarios y roles",
    description:
      "Crea usuarios con diferentes niveles de acceso según su rol. Define permisos específicos para cada módulo del sistema.",
  },
  {
    icon: "📋",
    title: "Productos serializados",
    description:
      "Soporte para productos serializados y no serializados. Trazabilidad completa por número de serie o por lote según corresponda.",
  },
];

const useCases = [
  { icon: "🛍️", label: "Tiendas y retail" },
  { icon: "🏭", label: "Distribuidoras" },
  { icon: "💊", label: "Farmacias" },
  { icon: "🔧", label: "Ferreterías" },
  { icon: "👗", label: "Boutiques y moda" },
  { icon: "🍎", label: "Supermercados" },
];

const screenshots = [
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/hlxvfxszxi5kn4ldubwb.png",
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/vaeesgrpjuvpy70c4ydr.png",
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/r5quy2yaloxeerlvctni.png",
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/ss4oiqthkfjvt7urlnff.png",
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/b4ixxzejvumympiautiz.png",
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412865/MyManag/assets/ki9tapglzbggvzyiy4jw.png",
  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/chupex1ndzdq4dtjrxxs.png",
];

const SystemDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0f3853] via-[#0d4a6b] to-[#0f3853] text-white py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#A0C82E] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>📦</span>
            <span>Sistema de Inventario</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Controla tu inventario con{" "}
            <span className="text-[#A0C82E] drop-shadow-lg">MyManag</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-100 leading-relaxed">
            La plataforma integral para gestionar productos, almacenes, compras
            y ventas. Pensada para pymes que necesitan control real sin
            complicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-4 px-10 text-lg rounded-lg shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/planes-sistema?system=MYMANAG")}
            >
              Ver planes y precios
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-[#0f3853] font-semibold py-4 px-10 text-lg rounded-lg hover:bg-white transition-all duration-300 hover:scale-105"
              onClick={() =>
                navigate("/registrar-empresa?plan=prueba&system=MYMANAG")
              }
            >
              Probar gratis
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0F3853] mb-8">
            Ideal para todo tipo de negocios
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-100 hover:border-[#A0C82E] hover:bg-[#A0C82E]/5 transition-all duration-200"
              >
                <span className="text-3xl">{uc.icon}</span>
                <span className="text-xs font-semibold text-gray-700 text-center">{uc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-[#0F3853] mb-4">
              Todo lo que necesitas para gestionar tu inventario
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Herramientas diseñadas para simplificar tu operación y darte
              visibilidad total de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-green-100 hover:border-[#A0C82E] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#A0C82E]/15 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0F3853] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capturas del sistema */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#0F3853] mb-4">
            El sistema en acción
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto">
            Explora las diferentes pantallas y funcionalidades de MyManag
          </p>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {screenshots.map((img, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2 group">
                    <div className="relative overflow-hidden rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#A0C82E]/50 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        className="rounded-lg object-contain h-64 w-full transform group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200" />
            <CarouselNext className="right-0 md:-right-12 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200" />
          </Carousel>
        </div>
      </section>

      {/* Resumen de planes */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#0F3853] mb-4">
            Planes disponibles
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto">
            Desde una prueba gratuita hasta funcionalidades ilimitadas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {myManagPlansMock.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border-2 text-left transition-all duration-300 hover:shadow-lg ${
                  i === 1
                    ? "border-[#A0C82E] bg-[#A0C82E]/10 shadow-lg scale-105"
                    : "border-gray-200 bg-white"
                }`}
              >
                {i === 1 && (
                  <div className="inline-block bg-[#A0C82E] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Más Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#A0C82E] mb-1">{plan.name}</h3>
                <p className="text-2xl font-extrabold text-[#0F3853] mb-2">{plan.price}</p>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-1">
                  {plan.features.slice(0, 4).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#A0C82E] mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs text-gray-400 mt-2">
                      +{plan.features.length - 4} características más
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <Button
            className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-5 px-12 text-lg rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/planes-sistema?system=MYMANAG")}
          >
            Ver todos los planes
          </Button>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0f3853] via-[#0d4a6b] to-[#0f3853] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empieza a controlar tu inventario hoy
          </h2>
          <p className="text-gray-200 mb-10 text-lg">
            Prueba MyManag gratis por 7 días. Sin tarjeta de crédito.
          </p>
          <Button
            className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-5 px-12 text-lg rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() =>
              navigate("/registrar-empresa?plan=prueba&system=MYMANAG")
            }
          >
            Probar MyManag gratis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SystemDetail;
