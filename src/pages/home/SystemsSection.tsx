import { Button } from "@/components/ui/button";
import { systemsMock } from "@/utils/mock/systemsMock";
import { useNavigate } from "react-router-dom";

const SystemsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3853] mb-4">
            Nuestros <span className="text-[#A0C82E]">Sistemas</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Elige el sistema que mejor se adapte a tu negocio. Cada uno con sus
            propios planes y características.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systemsMock.map((system) => (
            <div
              key={system.id}
              className="rounded-2xl border-2 p-8 flex flex-col gap-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              style={{
                borderColor: system.colorBorder,
                backgroundColor: system.colorBg,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                  style={{ backgroundColor: system.color }}
                >
                  {system.icon}
                </div>
                <div>
                  <h3
                    className="text-2xl font-extrabold"
                    style={{ color: system.colorText }}
                  >
                    {system.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500">
                    {system.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm">
                {system.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {system.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: system.color }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                <Button
                  className="flex-1 font-semibold py-5 rounded-lg text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: system.color }}
                  onClick={() => navigate(system.plansRoute)}
                >
                  Ver planes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 font-semibold py-5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    borderColor: system.colorBorder,
                    color: system.colorText,
                  }}
                  onClick={() => navigate(system.detailRoute)}
                >
                  Ver detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemsSection;
