import MainLayout from "@/components/main/MainLayout";
import Home from "@/pages/home/Home";
import SystemDetail from "@/pages/systemDetail/SystemDetail";
import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "@/pages/auth/pages/Login";
import SystemPlans from "@/pages/systemPlans/SystemPlans";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="detalles-sistema" element={<SystemDetail />} />
        <Route path="planes-sistema" element={<SystemPlans />} />
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
