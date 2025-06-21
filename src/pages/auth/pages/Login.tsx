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
      <div className="relative flex items-center justify-center px-10 py-16 bg-gradient-to-br from-[#f5fbe6] via-[#eff6ff] to-[#f5fbe6] text-[#103953]">
        <div className="max-w-md space-y-6 text-center">
          <h2 className="text-3xl font-bold leading-tight drop-shadow-lg">
            Bienvenido a{" "}
            <span className="underline decoration-[#A0C82E]">Inventasys</span>
          </h2>
          <p className="text-base text-[#103953]">
            Gestiona tu inventario y operaciones desde un solo lugar con una
            experiencia fluida y profesional.
          </p>

          
        </div>
      </div>
    </div>
  );
}
