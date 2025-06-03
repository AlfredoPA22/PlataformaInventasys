import Footer from "@/pages/footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
