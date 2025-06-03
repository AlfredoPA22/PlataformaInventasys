import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gradient-to-tr from-blue-100 via-white to-purple-100">
      {/* Lado del formulario */}
      <div className="flex flex-col justify-center px-8 py-12 md:px-16 bg-white shadow-md">
        <div className="max-w-md mx-auto w-full space-y-6">
          <LoginForm />
        </div>
      </div>

      {/* Lado derecho con branding atractivo */}
      <div className="relative flex items-center justify-center px-10 py-14 bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] to-white text-blue-800">
        <div className="max-w-md space-y-6 text-center">
          <h2 className="text-3xl font-bold leading-tight drop-shadow-lg">
            Bienvenido a{" "}
            <span className="underline decoration-amber-300">Inventasys</span>
          </h2>
          <p className="text-base text-blue-700">
            Gestiona tu inventario y operaciones desde un solo lugar con una
            experiencia fluida y profesional.
          </p>

          <p className="text-sm mt-4 text-blue-600">
            ¿No tienes cuenta?{" "}
            <span className="font-semibold text-blue-800 underline">
              Prueba gratis por 7 días.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
