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
import {
  Package,
  Warehouse,
  ShoppingCart,
  BarChart3,
  Users,
  ClipboardList,
  Check,
} from "lucide-react";

const features = [
  {
    Icon: Package,
    title: "Stock en tiempo real con alertas",
    description:
      "Visualiza la disponibilidad por almacén al instante. Configura niveles mínimos y recibe alertas automáticas de stock bajo antes de quedarte sin existencias.",
  },
  {
    Icon: Warehouse,
    title: "Múltiples almacenes",
    description:
      "Gestiona varios depósitos o sucursales desde un solo panel. Transfiere productos entre almacenes con validación automática de disponibilidad.",
  },
  {
    Icon: ShoppingCart,
    title: "Compras, ventas y crédito",
    description:
      "Módulo completo de compras y ventas con gestión de crédito a clientes, pagos parciales y control de cuentas por cobrar en tiempo real.",
  },
  {
    Icon: BarChart3,
    title: "8 reportes avanzados en PDF",
    description:
      "Ventas, compras, productos, valor de inventario, rentabilidad por producto y categoría, cuentas por cobrar y stock bajo. Filtra y exporta en PDF sin límites.",
  },
  {
    Icon: Users,
    title: "Usuarios y roles",
    description:
      "Crea usuarios con diferentes niveles de acceso según su rol. Define permisos específicos para cada módulo del sistema.",
  },
  {
    Icon: ClipboardList,
    title: "Productos serializados y por lote",
    description:
      "Soporte completo para productos con número de serie y productos por lote. Trazabilidad total desde la compra hasta la venta o transferencia.",
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#0f3853] text-white py-32 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(160,200,46,0.18) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#A0C82E] rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-sky-400 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white/80 mb-8 tracking-wide">
            <Package className="w-3.5 h-3.5" />
            Sistema de Inventario
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Controla tu inventario con{" "}
            <span className="text-[#A0C82E]">MyManag</span>
          </h1>
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/65 leading-relaxed">
            Gestiona productos, almacenes, compras, ventas y rentabilidad en un
            solo lugar. Con alertas de stock bajo y 8 reportes avanzados en PDF,
            pensado para pymes que necesitan control real.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => navigate("/planes-sistema?system=MYMANAG")}
            >
              Ver planes y precios
            </Button>
            <Button
              variant="ghost"
              className="border border-white/25 text-white/80 hover:text-white hover:bg-white/10 font-medium py-3 px-8 text-sm rounded-lg transition-all duration-300"
              onClick={() => navigate("/registrar-empresa?plan=prueba&system=MYMANAG")}
            >
              Probar gratis
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0 80L80 68C160 56 320 32 480 22C640 12 800 16 960 24C1120 32 1280 44 1360 50L1440 56V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
            ¿Para quién es?
          </p>
          <h2 className="text-2xl font-bold text-[#0F3853] mb-10">
            Ideal para todo tipo de negocios
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#A0C82E]/40 hover:bg-[#A0C82E]/5 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-2xl">{uc.icon}</span>
                <span className="text-[11px] font-semibold text-gray-600 text-center leading-tight">
                  {uc.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
              Módulos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F3853] tracking-tight mb-4">
              Todo lo que necesitas para gestionar tu inventario
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Herramientas diseñadas para simplificar tu operación y darte visibilidad total de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon, title, description }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#A0C82E]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-[#A0C82E]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#6a8c1e]" strokeWidth={1.7} />
                </div>
                <h3 className="text-base font-bold text-[#0F3853] mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
            Capturas
          </p>
          <h2 className="text-3xl font-bold text-[#0F3853] tracking-tight mb-4">
            El sistema en acción
          </h2>
          <p className="text-gray-500 text-base mb-12 max-w-md mx-auto leading-relaxed">
            Explora las diferentes pantallas y funcionalidades de MyManag
          </p>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {screenshots.map((img, idx) => (
                <CarouselItem key={idx} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="group p-1">
                    <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#A0C82E]/30 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={img}
                        alt={`Vista ${idx + 1}`}
                        className="rounded-lg object-contain h-56 w-full"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 bg-white shadow-md border border-gray-200 hover:border-[#A0C82E]/40" />
            <CarouselNext className="right-0 md:-right-12 bg-white shadow-md border border-gray-200 hover:border-[#A0C82E]/40" />
          </Carousel>
        </div>
      </section>

      {/* ── Plans summary ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
            Precios
          </p>
          <h2 className="text-3xl font-bold text-[#0F3853] tracking-tight mb-4">
            Planes disponibles
          </h2>
          <p className="text-gray-500 text-base mb-12 max-w-md mx-auto">
            Desde una prueba gratuita hasta funcionalidades ilimitadas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {myManagPlansMock.map((plan, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-6 border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    isPopular
                      ? "border-[#A0C82E] bg-[#A0C82E]/8 shadow-sm"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {isPopular && (
                    <div className="inline-block bg-[#A0C82E] text-white text-[10px] font-bold px-3 py-0.5 rounded-full mb-3 tracking-wide">
                      Más Popular
                    </div>
                  )}
                  <h3 className="text-base font-bold text-[#A0C82E] mb-1">{plan.name}</h3>
                  <p className="text-2xl font-extrabold text-[#0F3853] mb-1">{plan.price}</p>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 4).map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-3.5 h-3.5 text-[#A0C82E] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-xs text-gray-400 mt-1 pl-5">
                        +{plan.features.length - 4} características más
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>

          <Button
            className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/planes-sistema?system=MYMANAG")}
          >
            Ver todos los planes
          </Button>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0f3853] text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(160,200,46,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-lg mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Empieza a controlar tu inventario hoy
          </h2>
          <p className="text-white/55 mb-10 text-base leading-relaxed">
            Prueba MyManag gratis por 7 días. Sin tarjeta de crédito.
          </p>
          <Button
            className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/registrar-empresa?plan=prueba&system=MYMANAG")}
          >
            Probar MyManag gratis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SystemDetail;
