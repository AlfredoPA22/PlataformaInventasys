import Footer from "@/pages/footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
