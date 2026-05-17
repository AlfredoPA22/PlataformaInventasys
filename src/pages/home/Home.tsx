import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SystemsSection from "./SystemsSection";
import { Zap, ShieldCheck, BarChart3 } from "lucide-react";

const benefits = [
  {
    Icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    title: "Tiempo Real",
    description: "Stock, ventas y compras actualizados al instante en todos tus almacenes. Sin recargar, sin demoras.",
  },
  {
    Icon: ShieldCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Seguro y Confiable",
    description: "Tus datos protegidos en la nube. Accede desde cualquier dispositivo con total seguridad.",
  },
  {
    Icon: BarChart3,
    iconBg: "bg-[#A0C82E]/10",
    iconColor: "text-[#6a8c1e]",
    title: "Reportes Avanzados",
    description: "8 tipos de reportes exportables a PDF: ventas, compras, rentabilidad, stock bajo, cuentas por cobrar y más.",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-[#0f3853] text-white py-36 px-4 text-center overflow-hidden">

        {/* Dot-grid pattern */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(160,200,46,0.18) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Soft ambient glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#A0C82E] rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-sky-500 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Eyebrow badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 border border-white/20 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white/80 mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A0C82E]" />
            Plataforma SaaS para pymes · Bolivia
          </div>

          <h1 className="animate-slide-up text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight mb-6">
            Gestiona tu negocio con{" "}
            <span className="text-[#A0C82E]">Inventasys</span>
          </h1>

          <p className="animate-slide-up delay-200 text-base md:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto mb-10">
            Desde el control de inventario hasta la gestión de reservas, tenemos
            el sistema que tu empresa necesita. Simple, efectivo y sin complicaciones.
          </p>

          <div className="animate-slide-up delay-300 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-3 px-8 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                document.getElementById("sistemas")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver sistemas disponibles
            </Button>
            <Button
              variant="ghost"
              className="border border-white/25 text-white/80 hover:text-white hover:bg-white/10 font-medium py-3 px-8 text-sm rounded-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate("/nosotros")}
            >
              Conocer más
            </Button>
          </div>

          <p className="animate-fade-in delay-500 mt-6 text-xs text-white/35 tracking-wide">
            7 días gratis · Sin tarjeta de crédito · Cancela cuando quieras
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80L80 68C160 56 320 32 480 22C640 12 800 16 960 24C1120 32 1280 44 1360 50L1440 56V80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Benefit cards ────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map(({ Icon, iconBg, iconColor, title, description }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-[#A0C82E]/30 hover:shadow-md bg-white transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F3853] mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems ──────────────────────────────────────────── */}
      <div id="sistemas">
        <SystemsSection />
      </div>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#0f3853] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(160,200,46,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#A0C82E] rounded-full blur-3xl opacity-5" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-sky-400 rounded-full blur-3xl opacity-5" />

        <div className="max-w-xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            ¿Listo para impulsar tu negocio?
          </h2>
          <p className="text-white/55 mb-10 text-base leading-relaxed">
            Elige el sistema que necesitas y comienza con una prueba gratuita de
            7 días. Sin tarjeta de crédito, sin compromisos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-3 px-7 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => navigate("/planes-sistema?system=MYMANAG")}
            >
              Planes MyManag
            </Button>
            <Button
              className="bg-white/10 hover:bg-white/18 border border-white/20 text-white font-medium py-3 px-7 text-sm rounded-lg transition-all duration-300"
              onClick={() => navigate("/planes-sistema?system=RESERVAYA")}
            >
              Planes ReservaYa
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
