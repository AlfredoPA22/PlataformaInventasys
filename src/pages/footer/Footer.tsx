import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[#0F3853] to-gray-900 text-white border-t border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo y descripción */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-[#A0C82E] bg-clip-text text-transparent">
            Inventasys
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-4">
            Plataforma SaaS para gestión de inventarios, ventas y control
            administrativo de pymes. Simplifica tu negocio con tecnología de vanguardia.
          </p>
          <div className="flex gap-4 mt-6">
            <a 
              href="mailto:inventasysbolivia@gmail.com" 
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#A0C82E] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              aria-label="Email"
            >
              📧
            </a>
            <a 
              href="tel:+59169040342" 
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#A0C82E] flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              aria-label="Teléfono"
            >
              📞
            </a>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-300 hover:text-[#A0C82E] transition-colors duration-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/detalles-sistema" className="text-gray-300 hover:text-[#A0C82E] transition-colors duration-300">
                Detalles del sistema
              </Link>
            </li>
            <li>
              <Link to="/planes-sistema" className="text-gray-300 hover:text-[#A0C82E] transition-colors duration-300">
                Planes
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="text-gray-300 hover:text-[#A0C82E] transition-colors duration-300">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-[#A0C82E]">📧</span>
              <a href="mailto:inventasysbolivia@gmail.com" className="hover:text-[#A0C82E] transition-colors duration-300">
                inventasysbolivia@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#A0C82E]">📞</span>
              <a href="tel:+59169040342" className="hover:text-[#A0C82E] transition-colors duration-300">
                +591 69040342
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#A0C82E]">📍</span>
              <span>Santa Cruz - Bolivia</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-sm text-gray-400 py-6 px-4">
        <p>© {new Date().getFullYear()} Inventasys. Todos los derechos reservados.</p>
        <p className="mt-2 text-xs text-gray-500">Hecho con ❤️ para simplificar tu negocio</p>
      </div>
    </footer>
  );
};

export default Footer;
