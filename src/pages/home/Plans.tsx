import { Button } from "@/components/ui/button";
import { getPlansBySystem } from "@/utils/mock/planMock";
import { systemsMock } from "@/utils/mock/systemsMock";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface PlansProps {
  system?: string;
}

const Plans: React.FC<PlansProps> = ({ system = "MYMANAG" }) => {
  const navigate = useNavigate();
  const plans = getPlansBySystem(system);
  const systemInfo = systemsMock.find((s) => s.id === system);
  const accentColor = systemInfo?.color ?? "#A0C82E";

  const handleStart = (planId: string) => {
    navigate(`/registrar-empresa?plan=${planId}&system=${system}`);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">

      {/* Heading */}
      <div className="text-center mb-14">
        {systemInfo && (
          <div
            className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: accentColor }}
          >
            <span>{systemInfo.icon}</span>
            <span>{systemInfo.name}</span>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F3853] tracking-tight mb-4">
          Planes que se adaptan a tu negocio
        </h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          {system === "RESERVAYA"
            ? "Elige el plan perfecto y comienza a gestionar tus reservas de manera eficiente"
            : "Elige el plan perfecto y comienza a gestionar tu inventario de manera eficiente"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {plans.map((plan, index) => {
          const isPopular = index === 1;
          return (
            <div
              key={index}
              className={`relative rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isPopular
                  ? "shadow-lg"
                  : "border-gray-100 bg-white shadow-sm"
              }`}
              style={
                isPopular
                  ? {
                      borderColor: accentColor,
                      background: `linear-gradient(160deg, ${accentColor}0d 0%, white 50%)`,
                    }
                  : {}
              }
            >
              {/* Popular badge */}
              {isPopular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[11px] font-semibold px-4 py-1 rounded-full shadow-md whitespace-nowrap"
                  style={{ backgroundColor: accentColor }}
                >
                  Más Popular
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: accentColor }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-3xl font-extrabold text-[#0F3853] tracking-tight">
                    {plan.price}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-5" />

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-7">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${accentColor}1a` }}
                      >
                        <Check
                          className="w-2.5 h-2.5"
                          strokeWidth={2.5}
                          style={{ color: accentColor }}
                        />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className="w-full font-semibold text-sm py-5 rounded-xl transition-all duration-300 cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: isPopular ? accentColor : "#0F3853",
                    color: "white",
                  }}
                  onClick={() => handleStart(plan.id)}
                >
                  Empezar con este plan
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Plans;
