import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { useNavigate } from "react-router-dom";
import Features from "./Features";
import Plans from "./Plans";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero principal */}
      <section className="relative bg-[#0f3853] text-white py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-cover" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Control total de tu inventario con{" "}
            <span className="text-[#A0C82E]">Inventasys</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-100">
            La herramienta ideal para pymes que necesitan una solución simple,
            efectiva y sin complicaciones. Administra productos, almacenes y
            ventas en un solo lugar.
          </p>
          <Button
            className="bg-[#A0C82E] text-gray-900 font-semibold py-3 px-8 text-lg rounded-md shadow-md hover:bg-yellow-400 transition cursor-pointer"
            onClick={() =>
              navigate(`/registrar-empresa?plan=${CompanyPlan.FREE}`)
            }
          >
            Empezar prueba gratuita
          </Button>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Features />
        </div>
      </section>

      {/* Planes */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <Plans />
        </div>
      </section>

      {/* Llamado final */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#FFDF20]/10 via-white to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#103953] mb-4">
            ¿Listo para optimizar tu inventario?
          </h2>
          <p className="text-[#103953]/80 mb-10 text-base md:text-lg">
            Comienza con una prueba gratuita de 7 días, sin necesidad de
            tarjeta. Aprovecha todo el poder de{" "}
            <strong className="text-[#A0C82E]">Inventasys</strong> sin riesgos.
          </p>

          <Card className="shadow-2xl border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl text-center text-[#103953]">
                Regístrate en segundos
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <Button
                className="w-full text-base font-semibold bg-[#A0C82E] hover:bg-[#8BB429] text-white py-2 transition-colors duration-200 cursor-pointer"
                onClick={() =>
                  navigate(`/registrar-empresa?plan=${CompanyPlan.FREE}`)
                }
              >
                Probar gratis ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
