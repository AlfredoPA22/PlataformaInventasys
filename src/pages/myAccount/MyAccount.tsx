import { Button } from "@/components/ui/button";
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
import useCompanyList from "@/hooks/useCompanyList";
import type { RootState } from "@/redux/store";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { CompanyStatus } from "@/utils/enums/companyStatus.enum";
import { PaymentStatus } from "@/utils/enums/paymentStatus.enum";
import { getDate } from "@/utils/getDate";
import type { ICompany, ICompanyWithPayment } from "@/utils/interfaces/Company";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  ExternalLink,
  CreditCard,
  ArrowUpRight,
  Clock,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

/* ── Helpers ─────────────────────────────────────────────────────── */

const statusConfig: Record<string, { label: string; cls: string }> = {
  activo:   { label: "Activo",   cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  inactivo: { label: "Inactivo", cls: "bg-gray-100   text-gray-500   border-gray-200"    },
  expirado: { label: "Expirado", cls: "bg-red-50     text-red-600    border-red-200"      },
  pendiente:{ label: "Pendiente",cls: "bg-amber-50   text-amber-700  border-amber-200"    },
};

const planConfig: Record<string, { label: string; cls: string }> = {
  [CompanyPlan.FREE]:  { label: "Free",  cls: "bg-slate-100  text-slate-600  border-slate-200"  },
  [CompanyPlan.BASIC]: { label: "Basic", cls: "bg-blue-50    text-blue-700   border-blue-200"   },
  [CompanyPlan.PRO]:   { label: "Pro",   cls: "bg-violet-50  text-violet-700 border-violet-200" },
};

const paymentConfig: Record<string, { label: string; cls: string }> = {
  [PaymentStatus.APPROVED]: { label: "Aprobado", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  [PaymentStatus.REVIEW]:   { label: "En revisión",cls: "bg-amber-50  text-amber-700  border-amber-200"   },
  [PaymentStatus.REJECTED]: { label: "Rechazado",cls: "bg-red-50    text-red-600    border-red-200"      },
};

const Badge: React.FC<{ cls: string; label: string }> = ({ cls, label }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
    {label}
  </span>
);

/* ── Component ───────────────────────────────────────────────────── */

const MyAccount = () => {
  const user = useSelector((state: RootState) => state.authSlice);
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState<ICompanyWithPayment | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { listCompany, loadingListCompany } = useCompanyList();

  const getSuperiorPlans = (currentPlan: string): string[] => {
    const order: string[] = [CompanyPlan.FREE, CompanyPlan.BASIC, CompanyPlan.PRO];
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

  const DaysCell: React.FC<{ company: ICompanyWithPayment }> = ({ company }) => {
    if (company.status === "inactivo") return <span className="text-gray-400">—</span>;
    const days = getRemainingDays(company);
    if (days === 0)
      return <span className="inline-flex items-center gap-1 text-red-600 text-xs font-semibold"><AlertCircle className="w-3.5 h-3.5" />Expirado</span>;
    const cls =
      days <= 3 ? "text-red-600 font-semibold" :
      days <= 7 ? "text-amber-600 font-medium" :
                  "text-emerald-700 font-medium";
    return <span className={`text-sm ${cls}`}>{days} días</span>;
  };

  /* Loading */
  if (loadingListCompany) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#A0C82E] border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">Cargando empresas asociadas…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── User card ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1 bg-gradient-to-r from-[#0F3853] via-[#A0C82E] to-[#0F3853]" />

          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#A0C82E]/30 flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#0F3853] flex items-center justify-center flex-shrink-0 text-white text-xl font-bold">
                {user.fullName?.charAt(0) ?? "U"}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-[#0F3853] truncate">{user.fullName}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-400">
                <BadgeCheck className="w-3.5 h-3.5" />
                ID: {user.id}
              </div>
            </div>

            {/* Go to system */}
            {listCompany.length > 0 && (
              <Button
                className="bg-[#0F3853] hover:bg-[#0d2f44] text-white text-sm font-medium gap-2 flex-shrink-0"
                onClick={() => window.open(import.meta.env.VITE_CLIENT_INVENTORY, "_blank")}
              >
                <ExternalLink className="w-4 h-4" />
                Ir al sistema
              </Button>
            )}
          </div>
        </div>

        {/* ── Companies ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F3853]/8 flex items-center justify-center">
              <Building2 className="w-4.5 h-4.5 text-[#0F3853]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">Empresas Asociadas</h2>
              <p className="text-xs text-gray-400">{listCompany.length} empresa{listCompany.length !== 1 ? "s" : ""} registrada{listCompany.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {listCompany.length === 0 ? (
            /* Empty state */
            <div className="py-16 flex flex-col items-center gap-4 text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Sin empresas registradas</p>
                <p className="text-xs text-gray-400 mt-1">Registra tu empresa para comenzar a gestionar tu negocio.</p>
              </div>
              <Button
                className="bg-[#A0C82E] hover:bg-[#8BB429] text-white text-sm font-medium mt-2"
                onClick={() => navigate("/registrar-empresa")}
              >
                Registrar empresa
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-100">
                      {["Empresa", "Correo", "Expira", "Días rest.", "Estado", "Plan", "Último pago", "Acciones"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {listCompany.map((company: ICompanyWithPayment) => {
                      const isInactive = company.status === "inactivo";
                      const expiresAt =
                        company.plan === CompanyPlan.FREE
                          ? company.trial_expires_at
                          : company.subscription_expires_at;
                      const days = getRemainingDays(company);
                      const statusC = statusConfig[company.status] ?? { label: company.status, cls: "bg-gray-100 text-gray-500 border-gray-200" };
                      const planC   = planConfig[company.plan]   ?? { label: company.plan,   cls: "bg-gray-100 text-gray-500 border-gray-200" };
                      const latestPay = company.latest_payment?.status;
                      const payC    = latestPay ? paymentConfig[latestPay] : null;

                      return (
                        <tr key={company._id} className="hover:bg-slate-50/70 transition-colors duration-150">
                          <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{company.name}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{company.email}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            {!isInactive ? getDate(expiresAt) : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-4 py-3">
                            <DaysCell company={company} />
                          </td>
                          <td className="px-4 py-3">
                            <Badge cls={statusC.cls} label={statusC.label} />
                          </td>
                          <td className="px-4 py-3">
                            <Badge cls={planC.cls} label={planC.label} />
                          </td>
                          <td className="px-4 py-3">
                            {payC
                              ? <Badge cls={payC.cls} label={payC.label} />
                              : <span className="text-xs text-gray-400">Sin pago</span>
                            }
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-gray-200 hover:border-[#0F3853] hover:text-[#0F3853] gap-1"
                                onClick={() => navigate(`/pagos/${company._id}`)}
                              >
                                <CreditCard className="w-3 h-3" />
                                Pagos
                              </Button>

                              {(company.status === CompanyStatus.EXPIRED ||
                                (company.status === CompanyStatus.PENDING && !company.latest_payment) ||
                                (days <= 3 && company.plan !== CompanyPlan.FREE)) &&
                                company.plan !== CompanyPlan.FREE &&
                                company.latest_payment?.status !== PaymentStatus.REVIEW && (
                                  <Button
                                    size="sm"
                                    className="h-7 text-xs bg-[#A0C82E] hover:bg-[#8BB429] text-white gap-1"
                                    onClick={() => navigate("/pago", { state: { company, plan: company.plan } })}
                                  >
                                    <Clock className="w-3 h-3" />
                                    Pagar
                                  </Button>
                                )}

                              {company.plan !== CompanyPlan.PRO &&
                                company.latest_payment?.status !== PaymentStatus.REVIEW && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="h-7 text-xs gap-1"
                                    onClick={() => {
                                      setSelectedCompany(company);
                                      setSelectedPlan(getSuperiorPlans(company.plan)[0]);
                                    }}
                                  >
                                    <ArrowUpRight className="w-3 h-3" />
                                    Mejorar
                                  </Button>
                                )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {listCompany.map((company: ICompanyWithPayment) => {
                  const isInactive = company.status === "inactivo";
                  const expiresAt =
                    company.plan === CompanyPlan.FREE
                      ? company.trial_expires_at
                      : company.subscription_expires_at;
                  const days = getRemainingDays(company);
                  const statusC = statusConfig[company.status] ?? { label: company.status, cls: "bg-gray-100 text-gray-500 border-gray-200" };
                  const planC   = planConfig[company.plan]   ?? { label: company.plan,   cls: "bg-gray-100 text-gray-500 border-gray-200" };
                  const latestPay = company.latest_payment?.status;
                  const payC    = latestPay ? paymentConfig[latestPay] : null;

                  return (
                    <div key={company._id} className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-800">{company.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{company.email}</p>
                        </div>
                        <Badge cls={statusC.cls} label={statusC.label} />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-gray-400 mb-1">Plan</p>
                          <Badge cls={planC.cls} label={planC.label} />
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-gray-400 mb-1">Días restantes</p>
                          {!isInactive ? <DaysCell company={company} /> : <span className="text-gray-300">—</span>}
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-gray-400 mb-1">Expira</p>
                          <p className="text-gray-700">{!isInactive ? getDate(expiresAt) : "—"}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-gray-400 mb-1">Último pago</p>
                          {payC ? <Badge cls={payC.cls} label={payC.label} /> : <span className="text-gray-400">Sin pago</span>}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs gap-1 border-gray-200"
                          onClick={() => navigate(`/pagos/${company._id}`)}
                        >
                          <CreditCard className="w-3 h-3" />
                          Ver Pagos
                        </Button>

                        {(company.status === CompanyStatus.EXPIRED ||
                          (company.status === CompanyStatus.PENDING && !company.latest_payment) ||
                          (days <= 3 && company.plan !== CompanyPlan.FREE)) &&
                          company.plan !== CompanyPlan.FREE &&
                          company.latest_payment?.status !== PaymentStatus.REVIEW && (
                            <Button
                              size="sm"
                              className="text-xs bg-[#A0C82E] hover:bg-[#8BB429] text-white gap-1"
                              onClick={() => navigate("/pago", { state: { company, plan: company.plan } })}
                            >
                              <Clock className="w-3 h-3" />
                              Registrar Pago
                            </Button>
                          )}

                        {company.plan !== CompanyPlan.PRO &&
                          company.latest_payment?.status !== PaymentStatus.REVIEW && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="text-xs gap-1"
                              onClick={() => {
                                setSelectedCompany(company);
                                setSelectedPlan(getSuperiorPlans(company.plan)[0]);
                              }}
                            >
                              <ArrowUpRight className="w-3 h-3" />
                              Cambiar Plan
                            </Button>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Change plan dialog ───────────────────────────────── */}
        <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#0F3853]">Cambio de Plan</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-1">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-[#0F3853]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4.5 h-4.5 text-[#0F3853]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Empresa</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedCompany?.name}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-400">Plan actual</p>
                  <p className="text-sm font-semibold capitalize text-gray-800">{selectedCompany?.plan}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#A0C82E]" />
                <div className="text-right">
                  <p className="text-xs text-gray-400">Nuevo plan</p>
                  <p className="text-sm font-semibold capitalize text-[#A0C82E]">{selectedPlan ?? "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Solo puedes cambiar a un plan superior. No es posible volver a un plan anterior.
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1.5">Selecciona el nuevo plan:</p>
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
                          {plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="mt-2">
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => setSelectedCompany(null)}
              >
                Cancelar
              </Button>
              <Button
                disabled={!selectedPlan}
                className="bg-[#0F3853] hover:bg-[#0d2f44] text-white text-sm gap-2"
                onClick={() => {
                  navigate("/pago", { state: { company: selectedCompany, plan: selectedPlan } });
                  setSelectedCompany(null);
                }}
              >
                <CreditCard className="w-4 h-4" />
                Continuar con el pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyAccount;
