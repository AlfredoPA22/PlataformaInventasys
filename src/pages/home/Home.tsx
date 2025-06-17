import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { useNavigate } from "react-router-dom";
import Features from "./Features";
import Plans from "./Plans";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Hero principal */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gestiona tu inventario con{" "}
            <span className="text-yellow-300">Inventasys</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Controla tu inventario, ventas y almacenes desde un solo lugar, sin
            complicaciones ni costos elevados. Inventasys te ofrece un sistema
            completo, diseñado para pequeñas y medianas empresas que buscan
            eficiencia sin gastar de más.
          </p>
          <Button
            className="bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded shadow hover:bg-yellow-400 cursor-pointer"
            onClick={() =>
              navigate(`/registrar-empresa?plan=${CompanyPlan.FREE}`)
            }
          >
            Empezar prueba gratuita
          </Button>
        </div>
      </section>

      {/* Características del sistema */}
      <section className="py-16 px-4 bg-white">
        <Features />
      </section>

      {/* Planes */}
      <section className="py-16 px-4 bg-gray-100">
        <Plans />
      </section>

      {/* Registro / Prueba gratuita */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Listo para optimizar tu inventario?
          </h2>
          <p className="text-gray-600 mb-10 text-base">
            Regístrate y empieza a usar Inventasys sin costo durante 7 días. No
            necesitas tarjeta.
          </p>
          <Card className="shadow-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Comienza gratis ahora
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <Button
                className="w-full mt-4 cursor-pointer"
                onClick={() =>
                  navigate(`/registrar-empresa?plan=${CompanyPlan.FREE}`)
                }
              >
                Probar gratis
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
