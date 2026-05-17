import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a2535] text-white">
      {/* Accent top border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#A0C82E] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src="https://res.cloudinary.com/dyyd4no6j/image/upload/v1750462264/icono_inventasys_ca6zei.png"
              alt="Inventasys"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-white">Inventasys</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
            Plataforma SaaS para gestión de inventarios, ventas y control
            administrativo de pymes. Simplifica tu negocio con tecnología accesible.
          </p>
          <div className="flex gap-3">
            <a
              href="mailto:inventasysbolivia@gmail.com"
              className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#A0C82E] flex items-center justify-center transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+59169040342"
              className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#A0C82E] flex items-center justify-center transition-all duration-300"
              aria-label="Teléfono"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
            Navegación
          </h3>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Inicio" },
              { to: "/detalles-sistema", label: "MyManag" },
              { to: "/detalles-reservaya", label: "ReservaYa" },
              { to: "/planes-sistema", label: "Planes" },
              { to: "/nosotros", label: "Nosotros" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-white/50 hover:text-[#A0C82E] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
            Contacto
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#A0C82E] mt-0.5 flex-shrink-0" />
              <a
                href="mailto:inventasysbolivia@gmail.com"
                className="text-sm text-white/50 hover:text-[#A0C82E] transition-colors duration-200 break-all"
              >
                inventasysbolivia@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#A0C82E] mt-0.5 flex-shrink-0" />
              <a
                href="tel:+59169040342"
                className="text-sm text-white/50 hover:text-[#A0C82E] transition-colors duration-200"
              >
                +591 69040342
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#A0C82E] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/50">Santa Cruz, Bolivia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 text-center py-5 px-4">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Inventasys · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
