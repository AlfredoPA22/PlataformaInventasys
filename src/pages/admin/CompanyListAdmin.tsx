import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ADJUST_SUBSCRIPTION } from "@/graphql/mutations/Company";
import { LIST_COMPANY_ADMIN } from "@/graphql/queries/Company";
import useCompanyListAdmin from "@/hooks/useCompanyListAdmin";
import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { getDate } from "@/utils/getDate";
import type { ICompanySubscription, ICompanyWithPayment } from "@/utils/interfaces/Company";
import { useMutation } from "@apollo/client";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const STATUS_LABELS: Record<string, string> = {
  activo: "Activo",
  pendiente: "Pendiente",
  expirado: "Expirado",
  suspendido: "Suspendido",
};

const PLAN_LABELS: Record<string, string> = {
  prueba: "Prueba",
  basico: "Básico",
  profesional: "Profesional",
};

const SYSTEM_LABELS: Record<string, string> = {
  MYMANAG: "MyManag",
  RESERVAYA: "ReservaYa",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "activo":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Activo</Badge>;
    case "pendiente":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">Pendiente</Badge>;
    case "expirado":
      return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">Expirado</Badge>;
    case "suspendido":
      return <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100">Suspendido</Badge>;
    default:
      return <Badge variant="outline" className="capitalize">{status}</Badge>;
  }
};

const getPaymentBadge = (status: string | undefined) => {
  if (!status) return <span className="text-gray-400 text-sm">Sin pago</span>;
  switch (status) {
    case "en_revision":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 font-semibold">⏳ En revisión</Badge>;
    case "aprobado":
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">✓ Aprobado</Badge>;
    case "rechazado":
      return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">✗ Rechazado</Badge>;
    default:
      return <Badge variant="outline" className="capitalize">{status}</Badge>;
  }
};

const getPlanBadge = (plan: string) => {
  switch (plan) {
    case "prueba":
      return <Badge variant="outline" className="text-gray-600">Prueba</Badge>;
    case "basico":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">Básico</Badge>;
    case "profesional":
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100">Profesional</Badge>;
    default:
      return <Badge variant="outline" className="capitalize">{plan}</Badge>;
  }
};

const getRemainingDays = (company: ICompanyWithPayment): number | null => {
  const now = new Date();

  if (company.subscriptions && company.subscriptions.length > 0) {
    const active = company.subscriptions.find((s) => s.status === "activo");
    const sub = active || company.subscriptions[0];
    const rawDate = sub.plan === "prueba" ? sub.trial_expires_at : sub.subscription_expires_at;
    if (rawDate && !isNaN(Number(rawDate))) {
      const diff = new Date(Number(rawDate)).getTime() - now.getTime();
      return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
    }
  }

  const rawDate =
    company.plan === "prueba"
      ? company.trial_expires_at
      : company.subscription_expires_at;

  if (!rawDate) return null;
  const expiresAt = !isNaN(Number(rawDate)) ? new Date(Number(rawDate)) : null;
  if (!expiresAt || isNaN(expiresAt.getTime())) return null;

  const diff = expiresAt.getTime() - now.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
};

const getDaysDisplay = (company: ICompanyWithPayment) => {
  if (company.status === "pendiente") return <span className="text-gray-400">—</span>;
  if (company.status === "expirado")
    return <span className="text-red-600 font-semibold text-sm">Expirado</span>;

  const days = getRemainingDays(company);
  if (days === null) return <span className="text-gray-400">—</span>;
  if (days === 0) return <span className="text-red-600 font-semibold text-sm">Hoy</span>;
  if (days <= 3)
    return <span className="text-red-600 font-semibold text-sm">{days} días</span>;
  if (days <= 7)
    return <span className="text-amber-600 font-medium text-sm">{days} días</span>;
  return <span className="text-green-700 text-sm">{days} días</span>;
};

const getExpiresDate = (company: ICompanyWithPayment): string => {
  if (company.subscriptions && company.subscriptions.length > 0) {
    const active = company.subscriptions.find((s) => s.status === "activo");
    const sub = active || company.subscriptions[0];
    const rawDate = sub.plan === "prueba" ? sub.trial_expires_at : sub.subscription_expires_at;
    if (rawDate) return getDate(rawDate as unknown as Date) ?? "—";
  }
  const rawDate =
    company.plan === "prueba"
      ? company.trial_expires_at
      : company.subscription_expires_at;
  return rawDate ? (getDate(rawDate as unknown as Date) ?? "—") : "—";
};

const toDateInputValue = (rawDate: string | Date | null | undefined): string => {
  if (!rawDate) return "";
  const ts = Number(rawDate);
  const d = isNaN(ts) ? new Date(rawDate as string) : new Date(ts);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().substring(0, 10);
};

interface AdjustForm {
  companyId: string;
  system: string;
  plan: string;
  status: string;
  subscription_expires_at: string;
  trial_expires_at: string;
}

const CompanyListAdmin = () => {
  const { listCompanyAdmin, loadingListCompany } = useCompanyListAdmin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterPayment, setFilterPayment] = useState("todos");

  // Adjust subscription dialog state
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustCompany, setAdjustCompany] = useState<ICompanyWithPayment | null>(null);
  const [adjustForm, setAdjustForm] = useState<AdjustForm>({
    companyId: "",
    system: "MYMANAG",
    plan: "prueba",
    status: "activo",
    subscription_expires_at: "",
    trial_expires_at: "",
  });

  const [adjustSubscription, { loading: adjusting }] = useMutation(ADJUST_SUBSCRIPTION, {
    refetchQueries: [{ query: LIST_COMPANY_ADMIN }],
  });

  const companies: ICompanyWithPayment[] = listCompanyAdmin ?? [];

  const stats = useMemo(() => {
    const pendingReview = companies.filter(
      (c) => c.latest_payment?.status === "en_revision"
    ).length;
    const active = companies.filter((c) => c.status === "activo").length;
    const expiringSoon = companies.filter((c) => {
      if (c.status !== "activo") return false;
      const days = getRemainingDays(c);
      return days !== null && days <= 7;
    }).length;
    const expired = companies.filter((c) => c.status === "expirado").length;
    return { total: companies.length, pendingReview, active, expiringSoon, expired };
  }, [companies]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        !search ||
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "todos" || c.status === filterStatus;

      const paymentStatus = c.latest_payment?.status ?? "sin_pago";
      const matchPayment =
        filterPayment === "todos" ||
        (filterPayment === "sin_pago" ? !c.latest_payment : paymentStatus === filterPayment);

      return matchSearch && matchStatus && matchPayment;
    });
  }, [companies, search, filterStatus, filterPayment]);

  const openAdjustDialog = (company: ICompanyWithPayment) => {
    setAdjustCompany(company);

    // Determine default system: use first subscription if exists, else MYMANAG
    const firstSub: ICompanySubscription | undefined = company.subscriptions?.[0];
    const defaultSystem = firstSub?.system ?? "MYMANAG";
    const defaultPlan = firstSub?.plan ?? company.plan ?? "prueba";
    const defaultStatus = firstSub?.status ?? company.status ?? "activo";
    const defaultExpires = firstSub?.plan === "prueba"
      ? toDateInputValue(firstSub?.trial_expires_at)
      : toDateInputValue(firstSub?.subscription_expires_at ?? company.subscription_expires_at);

    setAdjustForm({
      companyId: company._id,
      system: defaultSystem,
      plan: defaultPlan,
      status: defaultStatus,
      subscription_expires_at: defaultPlan === "prueba" ? "" : defaultExpires,
      trial_expires_at: defaultPlan === "prueba" ? defaultExpires : "",
    });
    setAdjustOpen(true);
  };

  // When system changes in the form, fill in existing sub data if available
  const handleSystemChange = (system: string) => {
    if (!adjustCompany) return;
    const sub = adjustCompany.subscriptions?.find((s) => s.system === system);
    const plan = sub?.plan ?? (system === "MYMANAG" ? adjustCompany.plan : "prueba") ?? "prueba";
    const status = sub?.status ?? (system === "MYMANAG" ? adjustCompany.status : "pendiente") ?? "pendiente";
    const subExpires = sub?.plan === "prueba"
      ? ""
      : toDateInputValue(sub?.subscription_expires_at ?? (system === "MYMANAG" ? adjustCompany.subscription_expires_at : null));
    const trialExpires = sub?.plan === "prueba"
      ? toDateInputValue(sub?.trial_expires_at ?? (system === "MYMANAG" ? adjustCompany.trial_expires_at : null))
      : "";

    setAdjustForm((f) => ({
      ...f,
      system,
      plan,
      status,
      subscription_expires_at: subExpires,
      trial_expires_at: trialExpires,
    }));
  };

  const handleAdjustSubmit = async () => {
    try {
      dispatch(setIsBlocked(true));
      const variables: Record<string, string | null> = {
        companyId: adjustForm.companyId,
        system: adjustForm.system,
        plan: adjustForm.plan,
        status: adjustForm.status,
        subscription_expires_at: adjustForm.subscription_expires_at
          ? new Date(adjustForm.subscription_expires_at).toISOString()
          : null,
        trial_expires_at: adjustForm.trial_expires_at
          ? new Date(adjustForm.trial_expires_at).toISOString()
          : null,
      };
      await adjustSubscription({ variables });
      toast.success("Suscripción ajustada exitosamente");
      setAdjustOpen(false);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

  if (loadingListCompany) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 flex items-center gap-3 text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        Cargando empresas...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 space-y-4">
      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total empresas</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className={`border-0 shadow-sm ${stats.pendingReview > 0 ? "bg-amber-50 ring-1 ring-amber-200" : "bg-white"}`}>
          <CardContent className="p-4">
            <p className="text-xs text-amber-600 uppercase tracking-wide font-medium">Pagos en revisión</p>
            <p className={`text-2xl font-bold mt-1 ${stats.pendingReview > 0 ? "text-amber-700" : "text-gray-800"}`}>
              {stats.pendingReview}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <p className="text-xs text-green-600 uppercase tracking-wide">Activas</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{stats.active}</p>
          </CardContent>
        </Card>
        <Card className={`border-0 shadow-sm ${stats.expiringSoon > 0 ? "bg-red-50 ring-1 ring-red-200" : "bg-white"}`}>
          <CardContent className="p-4">
            <p className="text-xs text-red-500 uppercase tracking-wide">Por vencer (&le;7 días)</p>
            <p className={`text-2xl font-bold mt-1 ${stats.expiringSoon > 0 ? "text-red-600" : "text-gray-800"}`}>
              {stats.expiringSoon}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table card */}
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Lista de empresas</h2>
            <span className="text-sm text-gray-500">{filtered.length} de {companies.length} empresas</span>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Buscar por nombre o correo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-xs"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="sm:w-44">
                <SelectValue placeholder="Estado empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                {Object.entries(STATUS_LABELS).map(([val, label]) => (
                  <SelectItem key={val} value={val}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPayment} onValueChange={setFilterPayment}>
              <SelectTrigger className="sm:w-48">
                <SelectValue placeholder="Estado de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los pagos</SelectItem>
                <SelectItem value="en_revision">⏳ En revisión</SelectItem>
                <SelectItem value="aprobado">✓ Aprobado</SelectItem>
                <SelectItem value="rechazado">✗ Rechazado</SelectItem>
                <SelectItem value="sin_pago">Sin pago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Sistemas</TableHead>
                <TableHead>Vence</TableHead>
                <TableHead>Días restantes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Último pago</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((company: ICompanyWithPayment) => {
                  const isPendingReview = company.latest_payment?.status === "en_revision";
                  const systems = company.subscriptions ?? [];
                  return (
                    <TableRow
                      key={company._id}
                      className={isPendingReview ? "bg-amber-50 hover:bg-amber-100" : undefined}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{company.name}</p>
                          <p className="text-xs text-gray-500">{company.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {systems.length > 0 ? (
                            systems.map((sub) => (
                              <Badge
                                key={sub.system}
                                variant="outline"
                                className="text-xs px-1.5 py-0"
                              >
                                {SYSTEM_LABELS[sub.system] ?? sub.system}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {company.status === "pendiente" ? "—" : getExpiresDate(company)}
                      </TableCell>
                      <TableCell>{getDaysDisplay(company)}</TableCell>
                      <TableCell>{getStatusBadge(company.status)}</TableCell>
                      <TableCell>{getPlanBadge(company.plan)}</TableCell>
                      <TableCell>{getPaymentBadge(company.latest_payment?.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant={isPendingReview ? "default" : "outline"}
                            onClick={() => navigate(`/pagos-admin/${company._id}`)}
                          >
                            {isPendingReview ? "⏳ Revisar" : "Ver pagos"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => openAdjustDialog(company)}
                          >
                            Ajustar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                    {companies.length === 0
                      ? "No hay empresas registradas."
                      : "Sin resultados para los filtros aplicados."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Adjust subscription dialog */}
      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajustar suscripción</DialogTitle>
            {adjustCompany && (
              <p className="text-sm text-gray-500 mt-1">{adjustCompany.name}</p>
            )}
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Sistema */}
            <div className="space-y-1.5">
              <Label>Sistema</Label>
              <Select
                value={adjustForm.system}
                onValueChange={handleSystemChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SYSTEM_LABELS).map(([val, label]) => (
                    <SelectItem key={val} value={val}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Show current subs for context */}
              {adjustCompany?.subscriptions && adjustCompany.subscriptions.length > 0 && (
                <div className="mt-2 rounded-md border border-gray-100 bg-gray-50 p-3 space-y-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">Suscripciones actuales:</p>
                  {adjustCompany.subscriptions.map((sub) => (
                    <div key={sub.system} className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="font-medium">{SYSTEM_LABELS[sub.system] ?? sub.system}:</span>
                      <span>{PLAN_LABELS[sub.plan] ?? sub.plan}</span>
                      <span>·</span>
                      {getStatusBadge(sub.status)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Plan */}
            <div className="space-y-1.5">
              <Label>Plan</Label>
              <Select
                value={adjustForm.plan}
                onValueChange={(v) => setAdjustForm((f) => ({ ...f, plan: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prueba">Prueba (gratuito)</SelectItem>
                  <SelectItem value="basico">Básico</SelectItem>
                  <SelectItem value="profesional">Profesional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select
                value={adjustForm.status}
                onValueChange={(v) => setAdjustForm((f) => ({ ...f, status: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="expirado">Expirado</SelectItem>
                  <SelectItem value="suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fecha expiración suscripción (solo para planes de pago) */}
            {adjustForm.plan !== "prueba" && (
              <div className="space-y-1.5">
                <Label>Fecha de expiración de suscripción</Label>
                <Input
                  type="date"
                  value={adjustForm.subscription_expires_at}
                  onChange={(e) =>
                    setAdjustForm((f) => ({ ...f, subscription_expires_at: e.target.value }))
                  }
                />
                <p className="text-xs text-gray-400">Deja en blanco para no cambiar la fecha de expiración.</p>
              </div>
            )}

            {/* Fecha expiración prueba (solo para plan prueba) */}
            {adjustForm.plan === "prueba" && (
              <div className="space-y-1.5">
                <Label>Fecha de expiración del período de prueba</Label>
                <Input
                  type="date"
                  value={adjustForm.trial_expires_at}
                  onChange={(e) =>
                    setAdjustForm((f) => ({ ...f, trial_expires_at: e.target.value }))
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAdjustOpen(false)} disabled={adjusting}>
              Cancelar
            </Button>
            <Button onClick={handleAdjustSubmit} disabled={adjusting}>
              {adjusting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyListAdmin;
