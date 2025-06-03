import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { plansMock } from '@/utils/mock/planMock';

const Plans: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto text-center px-4 py-10">
      <h2 className="text-3xl font-bold mb-12">Planes que se adaptan a tu negocio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plansMock.map((plan, index) => (
          <Card key={index} className="text-left shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl mb-1">{plan.name}</CardTitle>
              <p className="text-blue-700 font-bold text-lg">{plan.price}</p>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔️ {feature}</li>
                ))}
              </ul>
              <Button className="w-full">Seleccionar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plans;