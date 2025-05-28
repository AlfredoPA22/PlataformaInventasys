import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Imágenes del sistema
import cliente from "@/assets/CLIENTE.png";
import compras from "@/assets/COMPRAS.png";
import dashboard from "@/assets/DASHBOARD.png";
import detalleCompra from "@/assets/DETALLE DE COMPRA.png";
import detalleVenta from "@/assets/DETALLE DE VENTA.png";
import home from "@/assets/home.png";
import inventario from "@/assets/INVENTARIO.png";
import pagos from "@/assets/PAGOS.png";
import permisos from "@/assets/PERMISOS.png";
import roles from "@/assets/ROLES.png";
import usuarios from "@/assets/USUARIOS.png";
import ventas from "@/assets/VENTAS.png";

const SystemDetail: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-2 py-5">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-blue-800">
            Detalles del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-12">
          {/* Introducción */}
          <section className="text-gray-700">
            <p className="text-lg">
              <strong>Inventasys</strong> es una plataforma SaaS desarrollada para la gestión integral de inventarios, compras, ventas, usuarios y almacenes. Pensado para pequeñas y medianas empresas, el sistema ofrece un entorno moderno, accesible y escalable para digitalizar operaciones y tomar decisiones estratégicas con base en datos en tiempo real.
            </p>
          </section>

          <Separator />

          {/* Características generales */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Funcionalidades clave
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Gestión de productos serializados y no serializados</li>
                <li>Módulo de compras con control de stock por lote</li>
                <li>Ventas con control de crédito, pagos parciales y estados</li>
                <li>Transferencias entre almacenes con validación de disponibilidad</li>
                <li>Reportes dinámicos con filtros por fecha, marca, categoría y cliente</li>
                <li>Panel administrativo con acceso a métricas y KPIs de ventas</li>
                <li>Soporte para múltiples empresas y múltiples almacenes</li>
                <li>Control de usuarios por roles y permisos detallados</li>
              </ul>
            </div>
            <img
              src={dashboard}
              alt="Dashboard"
              className="rounded-lg shadow-md"
            />
          </section>

          {/* Inventario y stock */}
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src={inventario}
              alt="Inventario"
              className="rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Control de inventario y stock
              </h2>
              <p className="text-gray-700">
                Visualizá la disponibilidad por almacén en tiempo real. El sistema actualiza automáticamente el stock al registrar compras, ventas o transferencias, ofreciendo trazabilidad por número de serie o por lote según corresponda.
              </p>
            </div>
          </section>

          {/* Reportes */}
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Reportes exportables
              </h2>
              <p className="text-gray-700">
                Generá informes detallados en formato PDF sobre ventas, compras, inventario, productos más vendidos y estados de clientes. Usá los filtros inteligentes para obtener la información exacta que necesitás.
              </p>
            </div>
            <img
              src={detalleVenta}
              alt="Detalle de Venta"
              className="rounded-lg shadow-md"
            />
          </section>

          {/* Gestión de usuarios y permisos */}
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src={usuarios}
              alt="Usuarios"
              className="rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">
                Control de acceso y roles
              </h2>
              <p className="text-gray-700">
                Creá usuarios con diferentes niveles de acceso según su rol. Definí permisos específicos para cada módulo y mantené segura la información de la empresa en todo momento.
              </p>
            </div>
          </section>

          {/* Capturas generales */}
          <section>
            <h2 className="text-xl font-semibold mb-6 text-blue-700 text-center">
              Vistas del sistema en acción
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {[
                  home,
                  cliente,
                  compras,
                  pagos,
                  detalleCompra,
                  roles,
                  permisos,
                  ventas,
                ].map((img, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-1/2 md:basis-1/3 px-2"
                  >
                    <div className="p-2">
                      <img
                        src={img}
                        alt={`Vista ${idx}`}
                        className="rounded-lg shadow-md object-contain h-60 w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDetail;