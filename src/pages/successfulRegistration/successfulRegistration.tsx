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
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="space-y-6 p-6">
          <div className="text-green-600 text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-gray-800">
            Empresa registrada y Activada exitosamente
          </h1>
          <p className="text-sm text-gray-600">
            Bienvenido a <strong>{company.name}</strong>. Usa las siguientes
            credenciales para iniciar sesión en el sistema. <br />
            <strong className="text-red-500">
              Guarda esta información
            </strong>{" "}
            porque la necesitarás para ingresar. Luego podrás cambiar tu
            contraseña dentro del sistema.
          </p>

          <div className="bg-gray-100 p-4 rounded-md text-left space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div>
                <span className="font-medium text-gray-700">Usuario:</span>{" "}
                <span className="text-gray-900">{user_name}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyUser}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Copiar usuario"
              >
                {userCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <span className="font-medium text-gray-700">Contraseña:</span>{" "}
                <span className="text-gray-900">{password}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyPassword}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Copiar contraseña"
              >
                {passwordCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => window.open("http://localhost:5174", "_blank")}
          >
            Iniciar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessfulRegistration;
