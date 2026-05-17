import React from "react";
import { Mail, Phone, MapPin, Clock, Package, Calendar } from "lucide-react";

const values = [
  {
    title: "Accesibilidad",
    description:
      "Tecnología empresarial al alcance de cualquier pyme, sin grandes inversiones ni conocimientos técnicos.",
  },
  {
    title: "Simplicidad",
    description:
      "Interfaces intuitivas diseñadas para que cualquier persona pueda operar el sistema desde el primer día.",
  },
  {
    title: "Crecimiento",
    description:
      "Planes que escalan con tu negocio. Empieza gratis y crece sin cambiar de plataforma.",
  },
];

const products = [
  {
    Icon: Package,
    name: "MyManag",
    color: "#A0C82E",
    bg: "bg-[#A0C82E]/10",
    text: "text-[#6a8c1e]",
    description:
      "Sistema de gestión de inventario con stock en tiempo real, compras, ventas, rentabilidad y 8 reportes avanzados en PDF.",
  },
  {
    Icon: Calendar,
    name: "ReservaYa",
    color: "#3B82F6",
    bg: "bg-blue-50",
    text: "text-blue-600",
    description:
      "Sistema de reservas y turnos con calendario inteligente, notificaciones automáticas y reportes de ocupación.",
  },
];

const ContactPage: React.FC = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#0f3853] text-white py-24 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(160,200,46,0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#A0C82E] rounded-full blur-3xl animate-pulse-soft opacity-30" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium text-white/80 mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A0C82E]" />
            Santa Cruz, Bolivia
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Sobre <span className="text-[#A0C82E]">Inventasys</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Democratizamos la tecnología para que cualquier pyme boliviana
            tenga acceso a herramientas digitales de calidad.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0 60L80 50C160 40 320 20 480 14C640 8 800 10 960 16C1120 22 1280 32 1360 37L1440 42V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Misión ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
                Quiénes somos
              </p>
              <h2 className="text-3xl font-bold text-[#0F3853] tracking-tight mb-5">
                Tecnología para pymes bolivianas
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-4">
                En <strong className="text-[#0F3853]">Inventasys</strong>, desarrollamos
                soluciones SaaS accesibles, funcionales y listas para usar, enfocadas en
                la gestión de inventario, ventas, reservas y control administrativo.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Nuestra misión es que cualquier negocio, sin importar su tamaño, pueda
                acceder a herramientas digitales eficientes sin necesidad de grandes
                inversiones ni equipos técnicos. Ofrecemos planes simples, precios
                justos y una plataforma que crece junto a tu empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-[#A0C82E]/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-[#A0C82E]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#A0C82E]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F3853] mb-1">{v.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Productos ────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
              Nuestros productos
            </p>
            <h2 className="text-2xl font-bold text-[#0F3853] tracking-tight">
              Dos sistemas, un ecosistema
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {products.map(({ Icon, name, bg, text, description }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${text}`} strokeWidth={1.7} />
                </div>
                <h3 className={`text-base font-bold ${text} mb-2`}>{name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacto ─────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-[#A0C82E] uppercase tracking-widest mb-3">
                Contacto
              </p>
              <h2 className="text-3xl font-bold text-[#0F3853] tracking-tight mb-4">
                Hablemos
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                ¿Necesitas más información, soporte o quieres una demo de nuestros sistemas?
                Contáctanos por cualquiera de estos medios.
              </p>

              <ul className="space-y-5">
                {[
                  {
                    Icon: Mail,
                    label: "Correo electrónico",
                    value: "inventasysbolivia@gmail.com",
                    href: "mailto:inventasysbolivia@gmail.com",
                  },
                  {
                    Icon: Phone,
                    label: "Teléfono / WhatsApp",
                    value: "+591 69040342",
                    href: "tel:+59169040342",
                  },
                  {
                    Icon: MapPin,
                    label: "Dirección",
                    value: "Magisterio sur Calle #8, 8vo anillo, Santa Cruz - Bolivia",
                    href: null,
                  },
                  {
                    Icon: Clock,
                    label: "Horario de atención",
                    value: "Lunes a Viernes, 9:00 – 18:00",
                    href: null,
                  },
                ].map(({ Icon, label, value, href }, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A0C82E]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-[#6a8c1e]" strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium text-[#0F3853] hover:text-[#A0C82E] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#0F3853]">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src="https://res.cloudinary.com/dbt5vgimv/image/upload/v1748939408/MyManag/assets/j8wmbhw5322sneft86wy.jpg"
                alt="Contacto Inventasys"
                className="w-full max-w-sm h-auto object-contain rounded-2xl border border-gray-100 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
