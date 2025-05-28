import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCompanyListAdmin from "@/hooks/useCompanyListAdmin";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { getDate } from "@/utils/getDate";
import type { ICompany, ICompanyWithPayment } from "@/utils/interfaces/Company";
import { useNavigate } from "react-router-dom";

const CompanyListAdmin = () => {
  const { listCompanyAdmin, loadingListCompany } = useCompanyListAdmin();

  const navigate = useNavigate();

  const getRemainingDays = (company: ICompany): number => {
    const now = new Date();
    const rawDate =
      company.plan === CompanyPlan.FREE
        ? company.trial_expires_at
        : company.subscription_expires_at;

    const expiresAt =
      rawDate && !isNaN(Number(rawDate)) ? new Date(Number(rawDate)) : null;

    if (!expiresAt || isNaN(expiresAt.getTime())) return 0;

    const diff = expiresAt.getTime() - now.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  if (loadingListCompany) {
    return (
      <div className="max-w-7xl mx-auto py-5 p-2">
        <p className="text-gray-600">Cargando empresas</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5 p-2 space-y-2">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de empresas
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Fecha de expiracion</TableHead>
                <TableHead>Dias restantes</TableHead>
                <TableHead>Estado de empresa</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado de pago</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listCompanyAdmin?.length > 0 ? (
                listCompanyAdmin.map((company: ICompanyWithPayment) => {
                  const days = getRemainingDays(company);
                  const isInactive = company.status === "inactivo";
                  const expiresAt =
                    company.plan === CompanyPlan.FREE
                      ? company.trial_expires_at
                      : company.subscription_expires_at;

                  return (
                    <TableRow key={company._id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>
                        {!isInactive ? getDate(expiresAt) : "-"}
                      </TableCell>
                      <TableCell>
                        {!isInactive ? (
                          days === -1 ? (
                            <span className="text-red-600 font-semibold">
                              Expirado
                            </span>
                          ) : (
                            <span
                              className={
                                days <= 3
                                  ? "text-red-600 font-semibold"
                                  : days <= 7
                                  ? "text-yellow-600 font-medium"
                                  : "text-green-700"
                              }
                            >
                              {days} días
                            </span>
                          )
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="capitalize">
                        {company.status}
                      </TableCell>
                      <TableCell className="capitalize">
                        {company.plan}
                      </TableCell>
                      <TableCell className="capitalize">
                        {company.latest_payment?.status || "Sin pago"}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(`/pagos-admin/${company._id}`)
                          }
                        >
                          Ver Pagos
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No hay empresas registradas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyListAdmin;
