import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Plans: React.FC = () => {
  const plans = [
    {
      name: 'Gratis',
      price: '0 Bs',
      features: ['1 usuario', '100 productos', '1 almacén', 'Soporte limitado'],
    },
    {
      name: 'Pro',
      price: '150 Bs / mes',
      features: ['Hasta 5 usuarios', '10.000 productos', '5 almacenes', 'Soporte prioritario'],
    },
    {
      name: 'Empresarial',
      price: 'Consultar',
      features: ['Usuarios ilimitados', 'Productos ilimitados', 'Múltiples almacenes', 'Atención personalizada'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-12">Planes que se adaptan a tu negocio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className="text-left">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <p className="text-blue-700 font-bold text-lg mt-2">{plan.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="mb-4 space-y-1 text-sm text-gray-600">
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
