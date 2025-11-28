import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plansMock } from "@/utils/mock/planMock";
import { useNavigate } from "react-router-dom";

const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = (planId: string) => {
    navigate(`/registrar-empresa?plan=${planId}`);
  };

  return (
    <section className="max-w-6xl mx-auto text-center px-4 py-16">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F3953] mb-6">
          Planes que se adaptan a tu negocio
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Elige el plan perfecto para tu empresa y comienza a gestionar tu inventario de manera eficiente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plansMock.map((plan, index) => (
          <Card
            key={index}
            className={`text-left shadow-xl rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
              index === 1 
                ? 'border-[#A0C92F] bg-gradient-to-br from-[#A0C92F]/10 to-white shadow-2xl scale-105' 
                : 'border-gray-200 hover:border-[#A0C92F]/50 bg-white'
            }`}
          >
            {index === 1 && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#A0C92F] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold text-[#A0C92F] mb-2">
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
                    <span className="text-[#A0C92F] text-lg mt-0.5">✓</span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full mt-4 font-semibold text-white py-6 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg ${
                  index === 1
                    ? 'bg-[#A0C92F] hover:bg-[#92b82a]'
                    : 'bg-[#0F3953] hover:bg-[#0d4a6b]'
                }`}
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
