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
      <h2 className="text-4xl font-extrabold text-[#0F3953] mb-12">
        Planes que se adaptan a tu negocio
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plansMock.map((plan, index) => (
          <Card
            key={index}
            className="text-left shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#A0C92F] mb-1">
                {plan.name}
              </CardTitle>
              <p className="text-[#0F3953] font-bold text-xl">{plan.price}</p>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="mb-6 mt-4 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>

              <Button
                className="w-full mt-4 font-semibold text-white bg-[#A0C92F] hover:bg-[#92b82a] transition-colors cursor-pointer"
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
