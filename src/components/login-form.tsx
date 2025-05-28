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
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión con Google</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Solo se permite acceso con cuentas Gmail autorizadas
        </p>
      </div>

      <div className="grid gap-6 mt-4">
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
  );
}
