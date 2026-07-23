import { useState } from "react";
import CompanyListAdmin from "./CompanyListAdmin";
import SystemsAdmin from "./SystemsAdmin";
import UserListAdmin from "./UserListAdmin";

type AdminTab = "empresas" | "usuarios" | "sistemas";

const TAB_LABELS: Record<AdminTab, string> = {
  empresas: "Empresas",
  usuarios: "Usuarios",
  sistemas: "Sistemas",
};

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("empresas");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-0">
        <h1 className="text-2xl font-bold text-gray-800">Panel Administrativo</h1>
        <p className="text-sm text-gray-500 mt-1">Gestión de empresas, suscripciones y sistemas</p>

        {/* Tab bar */}
        <div className="flex gap-1 mt-5 border-b border-gray-200">
          {(Object.keys(TAB_LABELS) as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t transition-colors ${
                activeTab === tab
                  ? "bg-white border border-b-white border-gray-200 text-blue-700 -mb-px"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab === "empresas" && "🏢 "}
              {tab === "usuarios" && "👤 "}
              {tab === "sistemas" && "⚙️ "}
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "empresas" && <CompanyListAdmin />}
      {activeTab === "usuarios" && <UserListAdmin />}
      {activeTab === "sistemas" && <SystemsAdmin />}
    </div>
  );
};

export default AdminLayout;
