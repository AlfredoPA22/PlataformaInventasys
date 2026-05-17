import { Button } from "@/components/ui/button";
import { reservaYaPlansMock } from "@/utils/mock/planMock";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  BellRing,
  Building2,
  BarChart3,
  Users,
  Settings,
  Check,
} from "lucide-react";

const features = [
  {
    Icon: Calendar,
    title: "Calendario inteligente",
    description:
      "Visualiza y gestiona la disponibilidad de tus servicios en tiempo real. Evita conflictos de horario y maximiza la ocupación de tu negocio.",
  },
  {
    Icon: BellRing,
    title: "Notificaciones automáticas",
    description:
      "Tus clientes reciben confirmaciones y recordatorios automáticos por email o WhatsApp, reduciendo las ausencias y mejorando la experiencia.",
  },
  {
    Icon: Building2,
    title: "Múltiples sedes y servicios",
    description:
      "Gestiona varias sucursales, equipos y tipos de servicio desde un solo panel. Perfecto para negocios con varias ubicaciones.",
  },
  {
    Icon: BarChart3,
    title: "Reportes de ocupación",
    description:
      "Analiza el rendimiento de cada sede, servicio y periodo. Toma decisiones basadas en datos reales de tu operación.",
  },
  {
    Icon: Users,
    title: "Gestión de clientes",
    description:
      "Historial completo de reservas por cliente, preferencias y frecuencia de visita para ofrecer un servicio personalizado.",
  },
  {
    Icon: Settings,
    title: "Formularios personalizables",
    description:
      "Adapta el proceso de reserva a tu negocio. Añade preguntas, campos y opciones según lo que necesites recopilar.",
  },
];

const useCases = [
  { icon: "💇", label: "Salones de belleza" },
  { icon: "🏥", label: "Clínicas y consultorios" },
  { icon: "🍽️", label: "Restaurantes" },
  { icon: "🏋️", label: "Gimnasios y estudios" },
  { icon: "🏨", label: "Hoteles y hospedajes" },
  { icon: "🎓", label: "Academias y tutorías" },
];

const SystemDetailReservaYa: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#1e3a8a] text-white py-32 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(59,130,246,0.2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-400 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white/80 mb-8 tracking-wide">
            <Calendar className="w-3.5 h-3.5" />
            Sistema de Reservas
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Gestiona tus reservas con{" "}
            <span className="text-blue-300">ReservaYa</span>
          </h1>
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-white/65 leading-relaxed">
            La solución completa para gestionar turnos, disponibilidad y clientes
            en tiempo real. Perfecta para cualquier negocio que trabaje con citas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => navigate("/planes-sistema?system=RESERVAYA")}
            >
              Ver planes y precios
            </Button>
            <Button
              variant="ghost"
              className="border border-white/25 text-white/80 hover:text-white hover:bg-white/10 font-medium py-3 px-8 text-sm rounded-lg transition-all duration-300"
              onClick={() => navigate("/registrar-empresa?plan=prueba&system=RESERVAYA")}
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
          <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
            ¿Para quién es?
          </p>
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-10">
            Ideal para todo tipo de negocios
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/5 hover:-translate-y-0.5 transition-all duration-200"
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
            <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
              Módulos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] tracking-tight mb-4">
              Todo lo que necesitas para gestionar reservas
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Herramientas diseñadas para simplificar tu operación y mejorar la experiencia de tus clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon, title, description }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#3B82F6]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#2563eb]" strokeWidth={1.7} />
                </div>
                <h3 className="text-base font-bold text-[#1e3a8a] mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans summary ────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-3">
            Precios
          </p>
          <h2 className="text-3xl font-bold text-[#1e3a8a] tracking-tight mb-4">
            Planes disponibles
          </h2>
          <p className="text-gray-500 text-base mb-12 max-w-md mx-auto">
            Desde una prueba gratuita hasta funcionalidades ilimitadas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {reservaYaPlansMock.map((plan, i) => {
              const isPopular = i === 1;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-6 border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    isPopular
                      ? "border-[#3B82F6] bg-[#3B82F6]/8 shadow-sm"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {isPopular && (
                    <div className="inline-block bg-[#3B82F6] text-white text-[10px] font-bold px-3 py-0.5 rounded-full mb-3 tracking-wide">
                      Más Popular
                    </div>
                  )}
                  <h3 className="text-base font-bold text-[#3B82F6] mb-1">{plan.name}</h3>
                  <p className="text-2xl font-extrabold text-[#1e3a8a] mb-1">{plan.price}</p>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 4).map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-3.5 h-3.5 text-[#3B82F6] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
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
            className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/planes-sistema?system=RESERVAYA")}
          >
            Ver todos los planes
          </Button>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#1e3a8a] text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(59,130,246,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-lg mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Empieza a gestionar tus reservas hoy
          </h2>
          <p className="text-white/55 mb-10 text-base leading-relaxed">
            Prueba ReservaYa gratis por 7 días. Sin tarjeta de crédito.
          </p>
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => navigate("/registrar-empresa?plan=prueba&system=RESERVAYA")}
          >
            Probar ReservaYa gratis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SystemDetailReservaYa;
