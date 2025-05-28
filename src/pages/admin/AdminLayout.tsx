import CompanyListAdmin from './CompanyListAdmin'

const AdminLayout = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
        🛠️ Panel Administrativo
      </h1>
      <CompanyListAdmin />
    </div>
  );
};

export default AdminLayout;
