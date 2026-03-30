import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SystemsSection from "./SystemsSection";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero principal */}
      <section className="relative bg-gradient-to-br from-[#0f3853] via-[#0d4a6b] to-[#0f3853] text-white py-32 px-4 text-center overflow-hidden">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#A0C82E] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-cover" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
            Soluciones de gestión para tu negocio con{" "}
            <span className="text-[#A0C82E] drop-shadow-lg">Inventasys</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-gray-100 leading-relaxed animate-slide-up delay-200">
            Desde el control de inventario hasta la gestión de reservas, tenemos
            el sistema que tu empresa necesita. Simple, efectivo y sin
            complicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-300">
            <Button
              className="bg-[#A0C82E] text-gray-900 font-semibold py-4 px-10 text-lg rounded-lg shadow-2xl hover:bg-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer transform"
              onClick={() => {
                document.getElementById("sistemas")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver sistemas disponibles
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-[#0f3853] font-semibold py-4 px-10 text-lg rounded-lg hover:bg-white hover:text-[#0f3853] transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => navigate("/nosotros")}
            >
              Conocer más
            </Button>
          </div>
        </div>

        {/* Olas decorativas en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Sección de beneficios destacados */}
      <section className="py-16 px-4 bg-white -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Tiempo Real",
                description: "Actualización instantánea de tus datos",
              },
              {
                icon: "🔒",
                title: "Seguro",
                description: "Tus datos protegidos con encriptación",
              },
              {
                icon: "📊",
                title: "Reportes",
                description: "Análisis detallados de tu negocio",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100 hover:border-[#A0C82E]/30 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#0F3853] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistemas disponibles */}
      <div id="sistemas">
        <SystemsSection />
      </div>

      {/* Llamado final */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0f3853] via-[#0d4a6b] to-[#0f3853] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#A0C82E] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para impulsar tu negocio?
          </h2>
          <p className="text-gray-200 mb-10 text-base md:text-xl leading-relaxed">
            Elige el sistema que necesitas y comienza con una prueba gratuita de
            7 días. Sin tarjeta de crédito, sin compromisos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-5 px-10 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/planes-sistema?system=MYMANAG")}
            >
              📦 Planes MyManag
            </Button>
            <Button
              className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-semibold py-5 px-10 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/planes-sistema?system=RESERVAYA")}
            >
              📅 Planes ReservaYa
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
