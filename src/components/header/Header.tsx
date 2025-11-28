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
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A0C82E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/detalles-sistema"
            className="text-gray-700 hover:text-[#0F3853] font-medium transition-colors duration-300 relative group"
          >
            Detalles
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A0C82E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/planes-sistema"
            className="text-gray-700 hover:text-[#0F3853] font-medium transition-colors duration-300 relative group"
          >
            Planes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A0C82E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/nosotros"
            className="text-gray-700 hover:text-[#0F3853] font-medium transition-colors duration-300 relative group"
          >
            Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A0C82E] transition-all duration-300 group-hover:w-full"></span>
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
                <p className="text-sm text-gray-700">Hola, {user.fullName}</p>
              )}
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Inicio
              </Link>
              <Link
                to="/mi-cuenta"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Mi cuenta
              </Link>
              <Link
                to="/detalles-sistema"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Detalles
              </Link>
              <Link
                to="/planes-sistema"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Planes
              </Link>
              <Link
                to="/nosotros"
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Nosotros
              </Link>
              <Button
                asChild
            className="bg-[#A0C82E] text-[#0F3853] hover:bg-yellow-400"
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
