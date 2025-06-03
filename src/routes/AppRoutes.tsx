import MainLayout from "@/components/main/MainLayout";
import Login from "@/pages/auth/pages/Login";
import ContactPage from "@/pages/contact/Contact";
import Home from "@/pages/home/Home";
import SystemDetail from "@/pages/systemDetail/SystemDetail";
import SystemPlans from "@/pages/systemPlans/SystemPlans";
import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="detalles-sistema" element={<SystemDetail />} />
        <Route path="planes-sistema" element={<SystemPlans />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
