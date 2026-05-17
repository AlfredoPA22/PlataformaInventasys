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

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({
  to,
  children,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative text-sm font-medium text-gray-600 hover:text-[#0F3853] transition-colors duration-200 group"
  >
    {children}
    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#A0C82E] transition-all duration-300 group-hover:w-full rounded-full" />
  </Link>
);

const Header: React.FC = () => {
  const { logout } = useAuth();
  const user = useSelector((state: RootState) => state.authSlice);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-opacity duration-200 hover:opacity-85"
        >
          <img
            src="https://res.cloudinary.com/dyyd4no6j/image/upload/v1750462264/icono_inventasys_ca6zei.png"
            alt="Inventasys"
            className="sm:h-12 h-9 w-auto"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-[#0F3853] to-[#2a6d94] bg-clip-text text-transparent sm:inline hidden">
            Inventasys
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/">Inicio</NavLink>

          {/* Sistemas dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#0F3853] transition-colors duration-200 outline-none cursor-pointer">
              Sistemas
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 shadow-lg border-gray-100">
              <DropdownMenuLabel className="text-[10px] text-gray-400 uppercase tracking-wider">
                Ver detalles
              </DropdownMenuLabel>
              {sistemas.map((s) => (
                <DropdownMenuItem key={s.id} asChild>
                  <Link to={s.detailRoute} className="flex items-center gap-2.5 cursor-pointer px-3 py-2">
                    <span className="text-base">{s.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.subtitle}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Planes dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#0F3853] transition-colors duration-200 outline-none cursor-pointer">
              Planes
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 shadow-lg border-gray-100">
              <DropdownMenuLabel className="text-[10px] text-gray-400 uppercase tracking-wider">
                Ver planes por sistema
              </DropdownMenuLabel>
              {sistemas.map((s) => (
                <DropdownMenuItem key={s.id} asChild>
                  <Link to={s.plansRoute} className="flex items-center gap-2.5 cursor-pointer px-3 py-2">
                    <span className="text-base">{s.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.subtitle}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink to="/nosotros">Nosotros</NavLink>

          <Button
            asChild
            className="bg-[#0F3853] hover:bg-[#0d2f44] text-white text-sm font-medium px-5 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <a href={`/registrar-empresa?plan=${CompanyPlan.FREE}`}>
              Probar gratis
            </a>
          </Button>

          {user.isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-2 ring-transparent hover:ring-[#A0C82E]/60 transition-all duration-300 cursor-pointer">
                  <img
                    src={
                      user.picture ||
                      "https://ui-avatars.com/api/?name=Usuario&background=0D8ABC&color=fff"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-lg border-gray-100">
                <DropdownMenuLabel className="text-sm font-semibold text-gray-800">
                  {user.fullName}
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/mi-cuenta" className="text-xs text-gray-500 cursor-pointer">
                    Mi cuenta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-sm text-red-500 cursor-pointer"
                  onClick={logout}
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu className="w-5 h-5 text-gray-600" />
            </SheetTrigger>
            <SheetContent side="left" className="p-6 space-y-1">
              {user.isAuthenticated && (
                <p className="text-sm text-gray-500 mb-3">Hola, {user.fullName}</p>
              )}

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-[#A0C82E] py-1.5 transition-colors duration-200"
              >
                Inicio
              </Link>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Sistemas
                </p>
                {sistemas.map((s) => (
                  <Link
                    key={`detail-${s.id}`}
                    to={s.detailRoute}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-1.5 pl-1 text-gray-700 hover:text-[#A0C82E] transition-colors duration-200"
                  >
                    <span>{s.icon}</span>
                    <span className="text-sm font-medium">{s.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Planes
                </p>
                {sistemas.map((s) => (
                  <Link
                    key={`plans-${s.id}`}
                    to={s.plansRoute}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-1.5 pl-1 text-gray-700 hover:text-[#A0C82E] transition-colors duration-200"
                  >
                    <span>{s.icon}</span>
                    <span className="text-sm font-medium">{s.name}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/nosotros"
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-gray-700 hover:text-[#A0C82E] py-1.5 transition-colors duration-200"
              >
                Nosotros
              </Link>

              {user.isAuthenticated && (
                <Link
                  to="/mi-cuenta"
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-gray-700 hover:text-[#A0C82E] py-1.5 transition-colors duration-200"
                >
                  Mi cuenta
                </Link>
              )}

              <div className="pt-3 space-y-2">
                <Button
                  asChild
                  className="bg-[#0F3853] hover:bg-[#0d2f44] text-white w-full text-sm font-medium"
                >
                  <a href={`/registrar-empresa?plan=${CompanyPlan.FREE}`}>
                    Probar gratis
                  </a>
                </Button>

                {user.isAuthenticated && (
                  <Button
                    variant="outline"
                    className="w-full text-sm text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => { logout(); setOpen(false); }}
                  >
                    Cerrar sesión
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
