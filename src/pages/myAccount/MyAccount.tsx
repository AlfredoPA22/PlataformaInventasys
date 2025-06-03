import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCompanyList from "@/hooks/useCompanyList";
import type { RootState } from "@/redux/store";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { CompanyStatus } from "@/utils/enums/companyStatus.enum";
import { getDate } from "@/utils/getDate";
import type { ICompany, ICompanyWithPayment } from "@/utils/interfaces/Company";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const user = useSelector((state: RootState) => state.authSlice);
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] =
    useState<ICompanyWithPayment | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { listCompany, loadingListCompany } = useCompanyList();

  const getSuperiorPlans = (currentPlan: string): string[] => {
    const order: string[] = [
      CompanyPlan.FREE,
      CompanyPlan.BASIC,
      CompanyPlan.PRO,
    ];
    const currentIndex = order.indexOf(currentPlan);
    return order.slice(currentIndex + 1);
  };

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
        <p className="text-gray-600">Cargando empresas asociadas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5 p-2 space-y-2">
      <Card>
        <CardContent className="p-6 space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Información de cuenta
          </h2>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Nombre:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Empresas Asociadas
            </h2>
            {listCompany.length > 0 && (
              <Button
                onClick={() => window.open("http://localhost:5174", "_blank")}
              >
                Ir al sistema
              </Button>
            )}
          </div>
          {listCompany.length === 0 ? (
            <p className="text-gray-600">
              No se encontraron empresas registradas.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Fecha de expiracion</TableHead>
                  <TableHead>Dias restantes</TableHead>
                  <TableHead>Estado de empresa</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Ultimo pago</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listCompany?.map((company: ICompanyWithPayment) => {
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
                          onClick={() => navigate(`/pagos/${company._id}`)}
                        >
                          Ver Pagos
                        </Button>
                        {(company.status === CompanyStatus.EXPIRED ||
                          (company.status === CompanyStatus.PENDING &&
                            !company.latest_payment) ||
                          (days <= 3 && company.plan !== CompanyPlan.FREE)) &&
                          company.plan !== CompanyPlan.FREE && (
                            <Button
                              size="sm"
                              onClick={() =>
                                navigate("/pago", {
                                  state: {
                                    company: company,
                                    plan: company.plan,
                                  },
                                })
                              }
                            >
                              Registrar Pago
                            </Button>
                          )}
                        {company.plan !== CompanyPlan.PRO && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setSelectedCompany(company);
                              const superiores = getSuperiorPlans(company.plan);
                              setSelectedPlan(superiores[0]);
                            }}
                          >
                            Cambiar de Plan
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }) || (
                  <TableRow>
                    <TableCell colSpan={6}>
                      No hay empresas asociadas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <Dialog
          open={!!selectedCompany}
          onOpenChange={() => setSelectedCompany(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualización de Plan</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Empresa:</p>
                <p className="font-semibold">{selectedCompany?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Plan actual:</p>
                <p className="capitalize font-semibold">
                  {selectedCompany?.plan}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Selecciona el nuevo plan:
                </p>
                <Select
                  value={selectedPlan || undefined}
                  onValueChange={(val) => setSelectedPlan(val as CompanyPlan)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCompany &&
                      getSuperiorPlans(selectedCompany.plan).map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan.charAt(0).toUpperCase() +
                            plan.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                disabled={!selectedPlan}
                onClick={() => {
                  navigate("/pago", {
                    state: {
                      company: selectedCompany,
                      plan: selectedPlan,
                    },
                  });
                  setSelectedCompany(null);
                }}
              >
                Continuar con el pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default MyAccount;
