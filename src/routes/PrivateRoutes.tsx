import { type FC } from "react";

import AdminRoute from "@/components/AdminRoute";
import AdminLayout from "@/pages/admin/AdminLayout";
import PaymentByCompanyListAdmin from "@/pages/admin/PaymentByCompanyListAdmin";
import MyAccount from "@/pages/myAccount/MyAccount";
import PaymentByCompanyList from "@/pages/payment/PaymentByCompanyList";
import RegisterCompany from "@/pages/registerCompany/RegisterCompany";
import RegisterPayment from "@/pages/registerPayment/RegisterPayment";
import SuccessfulPayment from "@/pages/successfulRegistration/successfulPayment";
import SuccessfulRegistration from "@/pages/successfulRegistration/successfulRegistration";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/registrar-empresa" element={<RegisterCompany />} />
        <Route path="/pago" element={<RegisterPayment />} />
        <Route path="/pagos/:id" element={<PaymentByCompanyList />} />
        <Route path="/registro-exitoso" element={<SuccessfulRegistration />} />
        <Route path="/pago-exitoso" element={<SuccessfulPayment />} />
        <Route path="/mi-cuenta" element={<MyAccount />} />

        {/* Rutas admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />
        <Route
          path="/pagos-admin/:id"
          element={
            <AdminRoute>
              <PaymentByCompanyListAdmin />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
};
export default PrivateRoutes;
