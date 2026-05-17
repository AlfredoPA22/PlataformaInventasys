import { Button } from "@/components/ui/button";
import { systemsMock } from "@/utils/mock/systemsMock";
import { useNavigate } from "react-router-dom";

const SystemsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
            Nuestros productos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F3853] tracking-tight mb-4">
            Elige el sistema para tu negocio
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Cada sistema está diseñado para un tipo de operación específica, con
            planes flexibles y prueba gratuita.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemsMock.map((system) => (
            <div
              key={system.id}
              className="group bg-white rounded-2xl p-8 flex flex-col gap-6 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-400"
              style={{
                boxShadow: "0 1px 3px 0 rgba(0,0,0,.04)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = `0 20px 40px -12px ${system.color}22`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0,0,0,.04)")
              }
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0"
                  style={{ backgroundColor: system.colorBg, border: `1.5px solid ${system.colorBorder}` }}
                >
                  {system.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: system.colorText }}>
                    {system.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{system.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{system.description}</p>

              {/* Features */}
              <ul className="space-y-2.5">
                {system.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle cx="8" cy="8" r="8" fill={system.color} fillOpacity="0.12" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke={system.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                <Button
                  className="flex-1 font-semibold py-2.5 rounded-lg text-white text-sm transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: system.color }}
                  onClick={() => navigate(system.plansRoute)}
                >
                  Ver planes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 font-medium py-2.5 rounded-lg text-sm transition-all duration-300"
                  style={{ borderColor: system.colorBorder, color: system.colorText }}
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
