import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Features from "./Features";
import Plans from "./Plans";
// import Features from "../components/Features";
// import Plans from "../components/Plans";
// import RegisterForm from "../components/RegisterForm";

const Home: React.FC = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero principal */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gestiona tu inventario con <span className="text-yellow-300">Inventasys</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            El sistema inteligente para llevar el control total de tus productos, ventas y almacenes.
          </p>
          <Button className="bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded shadow hover:bg-yellow-400">
            Empezar prueba gratuita
          </Button>
        </div>
      </section>

      {/* Características del sistema */}
      <section className="py-16 px-4 bg-white">
        <Features />
      </section>

      {/* Planes */}
      <section className="py-16 px-4 bg-gray-100">
        <Plans />
      </section>

      {/* Registro / Prueba gratuita */}
      <section className="py-16 px-4 bg-white">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Comienza ahora</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <RegisterForm /> */}
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-6 text-gray-500">
        &copy; {new Date().getFullYear()} Inventasys. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
