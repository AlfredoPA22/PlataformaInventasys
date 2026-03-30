import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPlansBySystem } from "@/utils/mock/planMock";
import { systemsMock } from "@/utils/mock/systemsMock";
import { useNavigate } from "react-router-dom";

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
    <section className="max-w-6xl mx-auto text-center px-4 py-16">
      <div className="mb-16">
        {systemInfo && (
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: accentColor }}>
            <span>{systemInfo.icon}</span>
            <span>{systemInfo.name}</span>
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3953] mb-6">
          Planes que se adaptan a tu negocio
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {system === "RESERVAYA"
            ? "Elige el plan perfecto y comienza a gestionar tus reservas de manera eficiente"
            : "Elige el plan perfecto para tu empresa y comienza a gestionar tu inventario de manera eficiente"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`text-left shadow-xl rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
              index === 1
                ? "shadow-2xl scale-105"
                : "border-gray-200 bg-white"
            }`}
            style={
              index === 1
                ? {
                    borderColor: accentColor,
                    background: `linear-gradient(to bottom right, ${accentColor}18, white)`,
                  }
                : {}
            }
          >
            {index === 1 && (
              <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: accentColor }}
              >
                Más Popular
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: accentColor }}
              >
                {plan.name}
              </CardTitle>
              <div className="mb-2">
                <span className="text-[#0F3953] font-extrabold text-3xl">{plan.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="mb-8 mt-4 space-y-3 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lg mt-0.5" style={{ color: accentColor }}>✓</span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-4 font-semibold text-white py-6 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:opacity-90"
                style={{
                  backgroundColor: index === 1 ? accentColor : "#0F3953",
                }}
                onClick={() => handleStart(plan.id)}
              >
                Empezar con este plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Plans;
