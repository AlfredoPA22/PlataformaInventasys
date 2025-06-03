import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { plansMock } from "@/utils/mock/planMock";
import { useNavigate } from "react-router-dom";

export default function SystemPlans() {
  const navigate = useNavigate();

  const handleStart = (planId: string) => {
    navigate(`/registrar-empresa?plan=${planId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-5 p-2 grid gap-8 md:grid-cols-3">
      {plansMock.map((plan) => (
        <Card
          key={plan.id}
          className="shadow-xl hover:shadow-2xl transition-all"
        >
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              {plan.name}
            </h2>
            <p className="text-center text-2xl font-bold text-gray-800">
              {plan.price}
            </p>
            <p className="text-center text-sm text-gray-600">
              {plan.description}
            </p>
            <ul className="text-sm space-y-1 pt-2 text-gray-700">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <Button
              className="w-full mt-4 cursor-pointer"
              onClick={() => handleStart(plan.id)}
            >
              Empezar con este plan
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
