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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { logout } = useAuth();

  const user = useSelector((state: RootState) => state.authSlice);

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Inventasys
        </Link>

        {/* Menú en desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Inicio
          </Link>
          <Link
            to="/detalles-sistema"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Detalles
          </Link>
          <Link
            to="/planes-sistema"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Planes
          </Link>
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <a href={`/registrar-empresa?plan=${CompanyPlan.FREE}`}>
              Probar gratis
            </a>
          </Button>
          {user.isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full border-2 border-transparent hover:border-blue-600 transition">
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
                  <Link to="/mi-cuenta" className="text-xs text-gray-500">
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
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-gray-700" />
            </SheetTrigger>
            <SheetContent side="left" className="space-y-1 p-6">
              {user.isAuthenticated && (
                <p className="text-sm text-gray-700">Hola, {user.fullName}</p>
              )}
              <Link
                to="/"
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Inicio
              </Link>
              <Link
                to="/detalles-sistema"
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Detalles
              </Link>
              <Link
                to="/planes-sistema"
                className="block text-lg text-gray-700 hover:text-blue-600"
              >
                Planes
              </Link>
              <Button
                asChild
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <a href={`/registrar-empresa?plan=${CompanyPlan.FREE}`}>
                  Probar gratis
                </a>
              </Button>
              {user.isAuthenticated && (
                <Button variant="outline" className="w-full" onClick={logout}>
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
