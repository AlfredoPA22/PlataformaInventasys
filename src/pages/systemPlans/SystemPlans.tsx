import { Button } from "@/components/ui/button";
import Plans from "../home/Plans";
import { systemsMock } from "@/utils/mock/systemsMock";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SystemPlans() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const system = searchParams.get("system");

  if (!system) {
    return (
      <section className="min-h-screen px-4 py-20 bg-gray-50 flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3853] mb-4">
            ¿Qué sistema te interesa?
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto">
            Selecciona el sistema para ver sus planes y precios disponibles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {systemsMock.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border-2 p-8 bg-white text-left hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ borderColor: s.colorBorder }}
                onClick={() => navigate(`/planes-sistema?system=${s.id}`)}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 shadow"
                  style={{ backgroundColor: s.color }}
                >
                  {s.icon}
                </div>
                <h3
                  className="text-2xl font-extrabold mb-1"
                  style={{ color: s.colorText }}
                >
                  {s.name}
                </h3>
                <p className="text-sm text-gray-500 font-semibold mb-3">
                  {s.subtitle}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {s.description}
                </p>
                <Button
                  className="w-full font-semibold text-white py-5 rounded-lg hover:opacity-90 transition-all"
                  style={{ backgroundColor: s.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/planes-sistema?system=${s.id}`);
                  }}
                >
                  Ver planes de {s.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Plans system={system} />
      </div>
    </section>
  );
}
