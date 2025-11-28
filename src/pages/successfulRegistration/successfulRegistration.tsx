import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const SuccessfulRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userCopied, setUserCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const state = location.state as {
    company: {
      name: string;
    };
    user_name: string;
    password: string;
  } | null;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { company, user_name, password } = state;

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success("Contraseña copiada al portapapeles");
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const handleCopyUser = () => {
    navigator.clipboard.writeText(user_name);
    toast.success("Usuario copiado al portapapeles");
    setUserCopied(true);
    setTimeout(() => setUserCopied(false), 2000);
  };

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
            ¡<span className="text-[#A0C82E]">Registro Exitoso</span>!
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto animate-slide-up delay-200">
            Bienvenido a <strong className="text-[#0F3853]">{company.name}</strong>
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-gray-100 bg-white">
          <CardContent className="p-8 md:p-12 space-y-8">
            {/* Mensaje de bienvenida */}
            <div className="bg-gradient-to-br from-[#A0C82E]/10 via-white to-white border-2 border-[#A0C82E]/20 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-center">
                Tu empresa ha sido registrada y activada exitosamente. Usa las siguientes
                credenciales para iniciar sesión en el sistema.
              </p>
              <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-red-700">
                  ⚠️ Guarda esta información
                </p>
                <p className="text-xs text-red-600 mt-1">
                  La necesitarás para ingresar. Podrás cambiar tu contraseña dentro del sistema.
                </p>
              </div>
            </div>

            {/* Credenciales */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#0F3853] mb-4 flex items-center gap-2">
                <span className="text-2xl">🔑</span>
                Tus credenciales de acceso
              </h2>

              {/* Usuario */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#A0C82E]/50 transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Usuario</p>
                    <p className="text-lg font-mono font-semibold text-gray-900 break-all">
                      {user_name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUser}
                    className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                      userCopied
                        ? "bg-green-100 text-green-600"
                        : "bg-[#A0C82E]/10 text-[#A0C82E] hover:bg-[#A0C82E]/20"
                    }`}
                    title="Copiar usuario"
                  >
                    {userCopied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Contraseña */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#A0C82E]/50 transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Contraseña</p>
                    <p className="text-lg font-mono font-semibold text-gray-900 break-all">
                      {password}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                      passwordCopied
                        ? "bg-green-100 text-green-600"
                        : "bg-[#A0C82E]/10 text-[#A0C82E] hover:bg-[#A0C82E]/20"
                    }`}
                    title="Copiar contraseña"
                  >
                    {passwordCopied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Próximos pasos
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Haz clic en el botón de abajo para iniciar sesión en el sistema.
                    Una vez dentro, podrás cambiar tu contraseña y comenzar a gestionar
                    tu inventario.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="flex-1 bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() =>
                  window.open(import.meta.env.VITE_CLIENT_INVENTORY, "_blank")
                }
              >
                Iniciar sesión en el sistema
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

export default SuccessfulRegistration;
