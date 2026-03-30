import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/pages/auth/hooks/useAuth";
import type { RootState } from "@/redux/store";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const sistemas = [
  {
    id: "MYMANAG",
    name: "MyManag",
    subtitle: "Inventario",
    icon: "📦",
    detailRoute: "/detalles-sistema",
    plansRoute: "/planes-sistema?system=MYMANAG",
  },
  {
    id: "RESERVAYA",
    name: "ReservaYa",
    subtitle: "Reservas",
    icon: "📅",
    detailRoute: "/detalles-reservaya",
    plansRoute: "/planes-sistema?system=RESERVAYA",
  },
];

const Header: React.FC = () => {
  const { logout } = useAuth();

  const user = useSelector((state: RootState) => state.authSlice);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md py-4 sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex justify-center items-center gap-3 text-2xl font-bold group transition-transform duration-300 hover:scale-105"
        >
          <img
            src="https://res.cloudinary.com/dyyd4no6j/image/upload/v1750462264/icono_inventasys_ca6zei.png"
            alt="Inventasys logo"
            className="sm:h-16 h-10 w-auto transition-transform duration-300 group-hover:rotate-3"
          />
          <span className="text-2xl font-bold text-[#0F3853] sm:inline bg-gradient-to-r from-[#0F3853] to-[#A0C82E] bg-clip-text text-transparent">
            Inventasys
          </span>
        </Link>

        {/* Menú en desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-[#0F3853] font-medium transition-colors duration-300 relative group"
          >
            Inicio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A0C82E] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Dropdown Sistemas / Detalles */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#0F3953] font-medium transition-colors duration-300 outline-none cursor-pointer">
              Sistemas
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuLabel className="text-xs text-gray-400">
                Ver detalles
              </DropdownMenuLabel>
              {sistemas.map((s) => (
                <DropdownMenuItem key={s.id} asChild>
                  <Link
                    to={s.detailRoute}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span>{s.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.subtitle}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown Planes */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-[#0F3953] font-medium transition-colors duration-300 outline-none cursor-pointer">
              Planes
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuLabel className="text-xs text-gray-400">
                Ver planes por sistema
              </DropdownMenuLabel>
              {sistemas.map((s) => (
                <DropdownMenuItem key={s.id} asChild>
                  <Link
                    to={s.plansRoute}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span>{s.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.subtitle}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/nosotros"
            className="text-gray-700 hover:text-[#0F3853] font-medium transition-colors duration-300 relative group"
          >
            Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A0C82E] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Button
            asChild
            className="bg-[#A0C82E] text-[#0F3853] hover:bg-yellow-400 font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <a href={`/registrar-empresa?plan=${CompanyPlan.FREE}`}>
              Probar gratis
            </a>
          </Button>

          {user.isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border-2 border-transparent hover:border-[#A0C82E] transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-md hover:shadow-lg">
                  <img
                    src={
                      user.picture ||
                      "https://ui-avatars.com/api/?name=Usuario&background=0D8ABC&color=fff"
                    }
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-sm font-semibold">
                  {user.fullName}
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    to="/mi-cuenta"
                    className="text-xs text-gray-500 cursor-pointer"
                  >
                    Mi cuenta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-sm text-red-600 cursor-pointer"
                  onClick={logout}
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Menú en mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-gray-700" />
            </SheetTrigger>
            <SheetContent side="left" className="space-y-1 p-6">
              {user.isAuthenticated && (
                <p className="text-sm text-gray-700 mb-2">Hola, {user.fullName}</p>
              )}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Inicio
              </Link>

              {/* Sistemas mobile */}
              <div className="pt-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Sistemas
                </p>
                {sistemas.map((s) => (
                  <Link
                    key={`detail-${s.id}`}
                    to={s.detailRoute}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-1.5 pl-2 text-gray-700 hover:text-blue-600"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-base">{s.name}</span>
                  </Link>
                ))}
              </div>

              {/* Planes mobile */}
              <div className="pt-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Planes
                </p>
                {sistemas.map((s) => (
                  <Link
                    key={`plans-${s.id}`}
                    to={s.plansRoute}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-1.5 pl-2 text-gray-700 hover:text-blue-600"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-base">{s.name}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/nosotros"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600 pt-1"
              >
                Nosotros
              </Link>

              {user.isAuthenticated && (
                <Link
                  to="/mi-cuenta"
                  onClick={() => setOpen(false)}
                  className="block text-lg text-gray-700 hover:text-blue-600"
                >
                  Mi cuenta
                </Link>
              )}

              <Button
                asChild
                className="bg-[#A0C82E] text-[#0F3853] hover:bg-yellow-400 w-full mt-2"
              >
                <a href={`/registrar-empresa?plan=${CompanyPlan.FREE}`}>
                  Probar gratis
                </a>
              </Button>

              {user.isAuthenticated && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Cerrar sesión
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
