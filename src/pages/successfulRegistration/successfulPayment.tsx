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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Hero Section con animación */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#A0C82E]/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-5xl shadow-2xl transform animate-scale-in">
              ✓
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F3853] mb-4 animate-slide-up">
            ¡Pago <span className="text-[#A0C82E]">Registrado</span>!
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto animate-slide-up delay-200">
            El comprobante de pago para{" "}
            <strong className="text-[#0F3853]">{company.name}</strong> ha sido enviado correctamente
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-gray-100 bg-white">
          <CardContent className="p-8 md:p-12 space-y-8">
            {/* Información del pago */}
            <div className="bg-gradient-to-br from-[#A0C82E]/10 via-white to-white border-2 border-[#A0C82E]/20 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-[#0F3853] mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Detalles del pago
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Plan seleccionado</p>
                  <p className="text-lg font-bold text-[#0F3853] uppercase">{plan}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Monto pagado</p>
                  <p className="text-lg font-bold text-[#A0C82E]">{amount} Bs</p>
                </div>
              </div>
            </div>

            {/* Información importante */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏰</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Próximos pasos
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Tu pago será verificado por nuestro equipo dentro de las próximas{" "}
                    <strong className="text-blue-800">24 horas hábiles</strong>. Una vez aprobado,
                    recibirás tus credenciales de acceso al correo registrado en la facturación.
                  </p>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-xl">💡</div>
                <div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#0F3853]">Nota:</strong> Si tienes alguna pregunta o
                    necesitas asistencia, puedes contactarnos a través de los medios de soporte
                    disponibles en nuestra página.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="flex-1 bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/mi-cuenta")}
              >
                Ir a Mi cuenta
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-gray-300 hover:border-[#A0C82E] hover:text-[#A0C82E] font-semibold py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/")}
              >
                Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
