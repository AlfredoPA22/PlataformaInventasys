import { cn } from "@/lib/utils";
import useAuth from "@/pages/auth/hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";

export function LoginForm({ className }: { className?: string }) {
  const { login } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (credentialResponse: any) => {
    await login({
      clientId: credentialResponse.clientId,
      credential: credentialResponse.credential,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-3 text-center mb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F3853]">
          Inicia sesión
        </h1>
        <p className="text-gray-600 text-sm text-balance max-w-sm">
          Solo se permite acceso con cuentas Gmail autorizadas
        </p>
      </div>

      <div className="grid gap-6 mt-6 justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#A0C82E]/20 to-transparent rounded-lg blur-xl"></div>
          <div className="relative bg-white border-2 border-gray-200 rounded-lg p-1 hover:border-[#A0C82E]/50 transition-all duration-300">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLogin(credentialResponse); // token de Google
              }}
              onError={() => {
                console.log("Error en el inicio de sesión con Google");
              }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="text-xs text-gray-500 font-medium">Acceso seguro</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Al iniciar sesión, aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>
    </div>
  );
}
