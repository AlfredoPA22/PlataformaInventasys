import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold text-[#103953]">Inventasys</h2>
          <p className="text-sm text-gray-600 mt-2">
            Plataforma SaaS para gestión de inventarios, ventas y control
            administrativo de pymes.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Enlaces</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/detalles-sistema" className="hover:text-blue-600">
                Detalles del sistema
              </Link>
            </li>
            <li>
              <Link to="/planes-sistema" className="hover:text-blue-600">
                Planes
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="hover:text-blue-600">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Contacto</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📧 inventasysbolivia@gmail.com</li>
            <li>📞 +591 69040342</li>
            <li>📍 Santa Cruz - Bolivia</li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center text-xs text-gray-500 py-4 px-4">
        © {new Date().getFullYear()} Inventasys. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
