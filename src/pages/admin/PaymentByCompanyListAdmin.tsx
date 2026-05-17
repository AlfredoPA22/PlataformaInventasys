import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { APPROVE_PAYMENT, REJECT_PAYMENT } from "@/graphql/mutations/Payment";
import { LIST_COMPANY_ADMIN } from "@/graphql/queries/Company";
import { LIST_PAYMENT_BY_COMPANY } from "@/graphql/queries/Payment";
import usePaymentByCompanyList from "@/hooks/usePaymentByCompanyList";
import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { PaymentStatus } from "@/utils/enums/paymentStatus.enum";
import { getDate } from "@/utils/getDate";
import type { IPayment } from "@/utils/interfaces/Payment";
import { useMutation } from "@apollo/client";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Receipt,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; cls: string; dot: string }> = {
  [PaymentStatus.REVIEW]: {
    label: "En revisión",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  [PaymentStatus.APPROVED]: {
    label: "Aprobado",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  [PaymentStatus.REJECTED]: {
    label: "Rechazado",
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
};

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = statusConfig[status] ?? {
    label: status,
    cls: "bg-gray-100 text-gray-500 border-gray-200",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <div className="text-sm font-medium text-gray-800">{children}</div>
  </div>
);

const SYSTEM_LABELS: Record<string, string> = {
  MYMANAG: "MyManag",
  RESERVAYA: "ReservaYa",
};

const PLAN_LABELS: Record<string, string> = {
  prueba: "Prueba",
  basico: "Básico",
  profesional: "Profesional",
};

type ConfirmAction = "approve" | "reject";

const PaymentByCompanyListAdmin = () => {
  const { id } = useParams();
  const companyId: string = id || "";

  const dispatch = useDispatch();

  const { listPaymentLandingByCompany, loadingListPayment } =
    usePaymentByCompanyList(companyId);

  const payments: IPayment[] = listPaymentLandingByCompany ?? [];

  const companyName = payments.length > 0 ? payments[0].company?.name : null;

  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  const refetchConfig = {
    refetchQueries: [
      { query: LIST_COMPANY_ADMIN },
      { query: LIST_PAYMENT_BY_COMPANY, variables: { companyId } },
    ],
  };

  const [approvePaymentLanding, { loading: approving }] = useMutation(
    APPROVE_PAYMENT,
    refetchConfig
  );
  const [rejectPaymentLanding, { loading: rejecting }] = useMutation(
    REJECT_PAYMENT,
    refetchConfig
  );

  const handleViewPayment = (payment: IPayment) => {
    setSelectedPayment(payment);
    setDetailOpen(true);
  };

  const handleConfirm = (action: ConfirmAction) => {
    setConfirmAction(action);
  };

  const handleExecuteAction = async () => {
    if (!selectedPayment || !confirmAction) return;
    try {
      dispatch(setIsBlocked(true));
      if (confirmAction === "approve") {
        await approvePaymentLanding({ variables: { paymentId: selectedPayment._id } });
        toast.success("Pago aprobado exitosamente");
      } else {
        await rejectPaymentLanding({ variables: { paymentId: selectedPayment._id } });
        toast.success("Pago rechazado");
      }
      setConfirmAction(null);
      setDetailOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

  const isLoading = approving || rejecting;

  if (loadingListPayment) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-[#A0C82E] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Cargando pagos...</p>
        </div>
      </div>
    );
  }

  const pendingCount = payments.filter((p) => p.status === PaymentStatus.REVIEW).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#A0C82E] transition-colors mb-2 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Volver al panel
          </Link>
          <h1 className="text-2xl font-bold text-[#0F3853] tracking-tight">
            Pagos de empresa
          </h1>
          {companyName && (
            <p className="text-sm text-gray-400 mt-0.5">{companyName}</p>
          )}
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
            <AlertCircle className="w-3.5 h-3.5" />
            {pendingCount} pendiente{pendingCount > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {payments.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <Receipt className="w-10 h-10 opacity-30" strokeWidth={1.3} />
            <p className="text-sm">No hay pagos registrados para esta empresa.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-gray-100 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              <span>Fecha</span>
              <span>Sistema</span>
              <span>Plan</span>
              <span>Método</span>
              <span>Monto</span>
              <span>Estado</span>
              <span />
            </div>

            <div className="divide-y divide-gray-50">
              {payments.map((payment: IPayment) => {
                const isPending = payment.status === PaymentStatus.REVIEW;
                return (
                  <div
                    key={payment._id}
                    className={`px-6 py-4 transition-colors duration-150 ${
                      isPending
                        ? "bg-amber-50/40 hover:bg-amber-50/60"
                        : "hover:bg-slate-50/70"
                    }`}
                  >
                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr_auto] gap-4 items-center">
                      <span className="text-sm text-gray-700">{getDate(payment.paid_at)}</span>
                      <span className="text-sm text-gray-600">
                        {SYSTEM_LABELS[payment.system] ?? payment.system ?? "—"}
                      </span>
                      <span className="text-sm text-gray-600 capitalize">
                        {PLAN_LABELS[payment.plan] ?? payment.plan}
                      </span>
                      <span className="text-sm text-gray-600 capitalize">
                        {payment.method || "—"}
                      </span>
                      <span className="text-sm font-semibold text-[#0F3853]">
                        {payment.amount} {payment.currency}
                      </span>
                      <StatusBadge status={payment.status} />
                      <button
                        className={`h-7 text-xs px-3 rounded-lg font-medium transition-all duration-150 cursor-pointer ${
                          isPending
                            ? "bg-[#A0C82E] hover:bg-[#8BB429] text-white"
                            : "bg-transparent border border-gray-200 text-gray-600 hover:bg-slate-100 hover:border-gray-300"
                        }`}
                        onClick={() => handleViewPayment(payment)}
                      >
                        {isPending ? "Revisar" : "Ver"}
                      </button>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#0F3853]">
                            {SYSTEM_LABELS[payment.system] ?? payment.system} · {PLAN_LABELS[payment.plan] ?? payment.plan}
                          </p>
                          <p className="text-xs text-gray-500">{getDate(payment.paid_at)}</p>
                        </div>
                        <StatusBadge status={payment.status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {payment.amount} {payment.currency}
                        </span>
                        <button
                          className={`h-7 text-xs px-4 rounded-lg font-medium transition-all duration-150 cursor-pointer ${
                            isPending
                              ? "bg-[#A0C82E] hover:bg-[#8BB429] text-white"
                              : "border border-gray-200 bg-transparent text-gray-600 hover:bg-slate-100"
                          }`}
                          onClick={() => handleViewPayment(payment)}
                        >
                          {isPending ? "Revisar" : "Ver detalle"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Payment detail dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0F3853] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#A0C82E]" />
              Detalle del pago
            </DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Empresa">
                  {selectedPayment.company?.name}
                </DetailRow>
                <DetailRow label="Estado">
                  <StatusBadge status={selectedPayment.status} />
                </DetailRow>
                <DetailRow label="Sistema">
                  {SYSTEM_LABELS[selectedPayment.system] ?? selectedPayment.system ?? "—"}
                </DetailRow>
                <DetailRow label="Plan">
                  <span className="capitalize">
                    {PLAN_LABELS[selectedPayment.plan] ?? selectedPayment.plan}
                  </span>
                </DetailRow>
                <DetailRow label="Método de pago">
                  <span className="capitalize">{selectedPayment.method}</span>
                </DetailRow>
                <DetailRow label="Monto">
                  <span className="text-base font-bold text-[#0F3853]">
                    {selectedPayment.amount} {selectedPayment.currency}
                  </span>
                </DetailRow>
                <DetailRow label="Fecha de pago">
                  {getDate(selectedPayment.paid_at)}
                </DetailRow>
                <DetailRow label="ID">
                  <span className="text-xs font-mono text-gray-500 truncate block">
                    {selectedPayment._id}
                  </span>
                </DetailRow>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Datos de facturación
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <DetailRow label="Nombre">
                    {selectedPayment.billing_info.name}
                  </DetailRow>
                  <DetailRow label="NIT">
                    {selectedPayment.billing_info.nit}
                  </DetailRow>
                  <div className="col-span-2">
                    <DetailRow label="Email">
                      {selectedPayment.billing_info.email}
                    </DetailRow>
                  </div>
                </div>
              </div>

              {selectedPayment.proof_url && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Comprobante
                  </p>
                  <a
                    href={selectedPayment.proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#A0C82E] hover:text-[#6a8c1e] font-medium transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Ver comprobante
                  </a>
                </div>
              )}

              {selectedPayment.status === PaymentStatus.REVIEW && (
                <div className="border-t border-gray-100 pt-4 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 text-sm rounded-xl"
                    onClick={() => handleConfirm("reject")}
                    disabled={isLoading}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Rechazar
                  </Button>
                  <Button
                    className="bg-[#A0C82E] hover:bg-[#8BB429] text-white text-sm font-medium rounded-xl"
                    onClick={() => handleConfirm("approve")}
                    disabled={isLoading}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Aprobar pago
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0F3853]">
              {confirmAction === "approve" ? "Aprobar pago" : "Rechazar pago"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 pt-1">
              {confirmAction === "approve"
                ? "Se activará la suscripción de la empresa. ¿Estás seguro?"
                : "Se rechazará el pago y se notificará a la empresa. ¿Estás seguro?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-2">
            <Button
              variant="ghost"
              className="text-gray-500"
              onClick={() => setConfirmAction(null)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              className={
                confirmAction === "reject"
                  ? "bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium"
                  : "bg-[#A0C82E] hover:bg-[#8BB429] text-white rounded-xl font-medium"
              }
              onClick={handleExecuteAction}
              disabled={isLoading}
            >
              {isLoading
                ? "Procesando..."
                : confirmAction === "approve"
                ? "Sí, aprobar"
                : "Sí, rechazar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentByCompanyListAdmin;
