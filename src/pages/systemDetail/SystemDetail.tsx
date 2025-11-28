import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const SystemDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3853] via-[#0d4a6b] to-[#0f3853] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-slide-up">
            Detalles del <span className="text-[#A0C82E]">Sistema</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200">
            Descubre todas las funcionalidades que hacen de <strong>Inventasys</strong> la solución perfecta para tu negocio
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 -mt-8">
        <Card className="shadow-2xl border-2 border-gray-100 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 space-y-16">
          {/* Introducción */}
          <section className="text-center bg-gradient-to-br from-[#A0C82E]/10 to-transparent p-8 rounded-2xl border border-[#A0C82E]/20">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              <strong className="text-[#0F3853] text-2xl">Inventasys</strong> es una plataforma SaaS desarrollada
              para la gestión integral de inventarios, compras, ventas, usuarios
              y almacenes. Pensado para pequeñas y medianas empresas, el sistema
              ofrece un entorno moderno, accesible y escalable para digitalizar
              operaciones y tomar decisiones estratégicas con base en datos en
              tiempo real.
            </p>
          </section>

          {/* Características generales */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-[#A0C82E] to-[#8BB429] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3853]">
                  Funcionalidades clave
                </h2>
              </div>
              <ul className="space-y-4 text-gray-700">
                {[
                  "Gestión de productos serializados y no serializados",
                  "Módulo de compras con control de stock por lote",
                  "Ventas con control de crédito, pagos parciales y estados",
                  "Transferencias entre almacenes con validación de disponibilidad",
                  "Reportes dinámicos con filtros por fecha, marca, categoría y cliente",
                  "Panel administrativo con acceso a métricas y KPIs de ventas",
                  "Soporte para múltiples empresas y múltiples almacenes",
                  "Control de usuarios por roles y permisos detallados",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <span className="text-[#A0C82E] text-xl mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">✓</span>
                    <span className="text-base md:text-lg leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src="https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/ruozowu0hae7q6jalbmz.png"
                alt="Dashboard"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-4 border-white"
              />
            </div>
          </section>

          <Separator className="my-8" />

          {/* Inventario y stock */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src="https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412866/MyManag/assets/abogfnyzmhuwckcbhgpx.png"
                alt="Inventario"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-4 border-white"
              />
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-[#A0C82E] to-[#8BB429] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3853]">
                  Control de inventario y stock
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Visualizá la disponibilidad por almacén en tiempo real. El
                sistema actualiza automáticamente el stock al registrar compras,
                ventas o transferencias, ofreciendo trazabilidad por número de
                serie o por lote según corresponda.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Reportes */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-[#A0C82E] to-[#8BB429] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3853]">
                  Reportes exportables
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Generá informes detallados en formato PDF sobre ventas, compras,
                inventario, productos más vendidos y estados de clientes. Usá
                los filtros inteligentes para obtener la información exacta que
                necesitás.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src="https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/u0jemxwhrgbmxxyxxpqv.png"
                alt="Detalle de Venta"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-4 border-white"
              />
            </div>
          </section>

          <Separator className="my-8" />

          {/* Gestión de usuarios y permisos */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src="https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/o1xjrujgfinukcfuq1ct.png"
                alt="Usuarios"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-4 border-white"
              />
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-[#A0C82E] to-[#8BB429] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3853]">
                  Control de acceso y roles
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Creá usuarios con diferentes niveles de acceso según su rol.
                Definí permisos específicos para cada módulo y mantené segura la
                información de la empresa en todo momento.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Capturas generales */}
          <section className="py-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-1 h-12 bg-gradient-to-b from-[#A0C82E] to-[#8BB429] rounded-full"></div>
                <h2 className="text-2xl md:text-4xl font-bold text-[#0F3853]">
                  Vistas del sistema en acción
                </h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explora las diferentes pantallas y funcionalidades de Inventasys
              </p>
            </div>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {[
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/hlxvfxszxi5kn4ldubwb.png",
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/vaeesgrpjuvpy70c4ydr.png",
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/r5quy2yaloxeerlvctni.png",
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/ss4oiqthkfjvt7urlnff.png",
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412863/MyManag/assets/b4ixxzejvumympiautiz.png",
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412865/MyManag/assets/ki9tapglzbggvzyiy4jw.png",
                  "https://res.cloudinary.com/dbt5vgimv/image/upload/v1748412864/MyManag/assets/chupex1ndzdq4dtjrxxs.png",
                ].map((img, idx) => (
                  <CarouselItem
                    key={idx}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-2 group">
                      <div className="relative overflow-hidden rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#A0C82E]/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#A0C82E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={img}
                          alt={`Vista ${idx + 1}`}
                          className="rounded-lg object-contain h-64 w-full transform group-hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200" />
              <CarouselNext className="right-0 md:-right-12 bg-white/90 hover:bg-white shadow-lg border-2 border-gray-200" />
            </Carousel>
          </section>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default SystemDetail;
