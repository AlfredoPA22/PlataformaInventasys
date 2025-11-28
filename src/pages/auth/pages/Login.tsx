import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Lado del formulario */}
      <div className="flex flex-col justify-center px-8 py-12 md:px-16 bg-white/95 backdrop-blur-sm relative overflow-hidden">
        {/* Efectos de fondo decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A0C82E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F3853]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-md mx-auto w-full space-y-8 relative z-10">
          {/* Logo y branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <img
                src="https://res.cloudinary.com/dyyd4no6j/image/upload/v1750462264/icono_inventasys_ca6zei.png"
                alt="Inventasys logo"
                className="h-12 w-auto"
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0F3853] to-[#A0C82E] bg-clip-text text-transparent">
                Inventasys
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Plataforma de gestión de inventarios
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>

      {/* Lado derecho con branding atractivo */}
      <div className="relative hidden lg:flex items-center justify-center px-10 py-16 bg-gradient-to-br from-[#0f3853] via-[#0d4a6b] to-[#0f3853] text-white overflow-hidden">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#A0C82E] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-md space-y-8 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <img
                src="https://res.cloudinary.com/dyyd4no6j/image/upload/v1750462264/icono_inventasys_ca6zei.png"
                alt="Inventasys logo"
                className="h-16 w-auto"
              />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Bienvenido a{" "}
            <span className="text-[#A0C82E] drop-shadow-lg">Inventasys</span>
          </h2>
          
          <p className="text-lg text-gray-100 leading-relaxed">
            Gestiona tu inventario y operaciones desde un solo lugar con una
            experiencia fluida y profesional.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-semibold">Control Total</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm font-semibold">Tiempo Real</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm font-semibold">Seguro</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">📈</div>
              <p className="text-sm font-semibold">Reportes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
