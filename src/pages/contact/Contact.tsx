import React from "react";

const ContactPage: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Descripción */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            En <strong>Inventasys</strong>, democratizamos la
            tecnología para pequeñas y medianas empresas. Desarrollamos
            soluciones de software accesibles, funcionales y listas para usar,
            enfocadas en la gestión de inventario, ventas y control
            administrativo. Nuestra misión es que cualquier negocio, sin
            importar su tamaño, pueda acceder a herramientas digitales
            eficientes sin necesidad de grandes inversiones. Ofrecemos planes
            simples, precios justos y una plataforma intuitiva que crece junto a
            tu empresa.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-2">
            Contacto
          </h3>
          <p className="text-gray-600 mb-4">
            Si deseas más información, necesitas soporte o quieres conocer
            nuestras soluciones empresariales, puedes contactarnos a través de
            los siguientes medios:
          </p>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>📧 Correo:</strong> inventasysbolivia@gmail.com
            </p>
            <p>
              <strong>📞 Teléfono:</strong> +591 69040342
            </p>
            <p>
              <strong>📍 Dirección:</strong> Magisterio sur Calle #8, 8vo
              anillo, Santa Cruz - Bolivia
            </p>
            <p>
              <strong>🕒 Horarios:</strong> Lunes a Viernes de 9:00 a 18:00
            </p>
          </div>
        </div>

        {/* Imagen ilustrativa */}
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dbt5vgimv/image/upload/v1748939408/MyManag/assets/j8wmbhw5322sneft86wy.jpg"
            alt="Contacto Inventasys"
            className="w-full max-w-md h-auto object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
