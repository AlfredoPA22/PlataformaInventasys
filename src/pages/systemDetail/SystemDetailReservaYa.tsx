import { Button } from "@/components/ui/button";
import { reservaYaPlansMock } from "@/utils/mock/planMock";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "📅",
    title: "Calendario inteligente",
    description:
      "Visualiza y gestiona la disponibilidad de tus servicios en tiempo real. Evita conflictos de horario y maximiza la ocupación de tu negocio.",
  },
  {
    icon: "🔔",
    title: "Notificaciones automáticas",
    description:
      "Tus clientes reciben confirmaciones y recordatorios automáticos por email o WhatsApp, reduciendo las ausencias y mejorando la experiencia.",
  },
  {
    icon: "🏢",
    title: "Múltiples sedes y servicios",
    description:
      "Gestiona varias sucursales, equipos y tipos de servicio desde un solo panel. Perfecto para negocios con varias ubicaciones.",
  },
  {
    icon: "📊",
    title: "Reportes de ocupación",
    description:
      "Analiza el rendimiento de cada sede, servicio y periodo. Toma decisiones basadas en datos reales de tu operación.",
  },
  {
    icon: "👥",
    title: "Gestión de clientes",
    description:
      "Historial completo de reservas por cliente, preferencias y frecuencia de visita para ofrecer un servicio personalizado.",
  },
  {
    icon: "⚙️",
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
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] text-white py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>📅</span>
            <span>Sistema de Reservas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Gestiona tus reservas con{" "}
            <span className="text-blue-300 drop-shadow-lg">ReservaYa</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-blue-100 leading-relaxed">
            La solución completa para gestionar turnos, disponibilidad y clientes
            en tiempo real. Perfecta para cualquier negocio que trabaje con citas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-semibold py-4 px-10 text-lg rounded-lg shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/planes-sistema?system=RESERVAYA")}
            >
              Ver planes y precios
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-[#1e3a8a] font-semibold py-4 px-10 text-lg rounded-lg hover:bg-white transition-all duration-300 hover:scale-105"
              onClick={() =>
                navigate(`/registrar-empresa?plan=prueba&system=RESERVAYA`)
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
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-8">
            Ideal para todo tipo de negocios
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
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
            <h2 className="text-4xl font-extrabold text-[#1e3a8a] mb-4">
              Todo lo que necesitas para gestionar reservas
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Herramientas diseñadas para simplificar tu operación y mejorar la
              experiencia de tus clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1e3a8a] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resumen de planes */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#1e3a8a] mb-4">
            Planes disponibles
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto">
            Desde una prueba gratuita hasta funcionalidades ilimitadas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reservaYaPlansMock.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border-2 text-left transition-all duration-300 hover:shadow-lg ${
                  i === 1
                    ? "border-[#3B82F6] bg-blue-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white"
                }`}
              >
                {i === 1 && (
                  <div className="inline-block bg-[#3B82F6] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Más Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#3B82F6] mb-1">{plan.name}</h3>
                <p className="text-2xl font-extrabold text-[#1e3a8a] mb-2">{plan.price}</p>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-1">
                  {plan.features.slice(0, 4).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#3B82F6] mt-0.5">✓</span>
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
            className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-semibold py-5 px-12 text-lg rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/planes-sistema?system=RESERVAYA")}
          >
            Ver todos los planes
          </Button>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empieza a gestionar tus reservas hoy
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            Prueba ReservaYa gratis por 7 días. Sin tarjeta de crédito.
          </p>
          <Button
            className="bg-white text-[#1d4ed8] hover:bg-blue-50 font-semibold py-5 px-12 text-lg rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() =>
              navigate(`/registrar-empresa?plan=prueba&system=RESERVAYA`)
            }
          >
            Probar ReservaYa gratis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SystemDetailReservaYa;
