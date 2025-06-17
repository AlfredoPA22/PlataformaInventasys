import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessfulPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    company: {
      _id: string;
      name: string;
    };
    plan: string;
    amount: number;
    email?: string;
  } | null;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { company, plan, amount } = state;

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="space-y-6 p-6">
          <div className="text-green-600 text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-gray-800">Pago registrado</h1>
          <p className="text-sm text-gray-600">
            El comprobante de pago para la empresa{" "}
            <strong>{company.name}</strong> ha sido enviado correctamente.
          </p>

          <div className="bg-gray-100 p-4 rounded-md text-left space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-700">Plan:</span>{" "}
              <span className="uppercase">{plan}</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Monto:</span> {amount}{" "}
              Bs
            </p>
          </div>

          <p className="text-xs text-gray-500">
            Tu pago será verificado por nuestro equipo dentro de las próximas{" "}
            <strong>24 horas hábiles</strong>. Una vez aprobado, recibirás tus
            credenciales al correo de la cuenta.
          </p>

          <Button className="w-full cursor-pointer" onClick={() => navigate("/mi-cuenta")}>
            Ir a Mi cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessfulPayment;
