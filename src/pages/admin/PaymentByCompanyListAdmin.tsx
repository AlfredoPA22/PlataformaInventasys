import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPROVE_PAYMENT, REJECT_PAYMENT } from "@/graphql/mutations/Payment";
import { LIST_COMPANY_ADMIN } from "@/graphql/queries/Company";
import { LIST_PAYMENT_BY_COMPANY } from "@/graphql/queries/Payment";
import usePaymentByCompanyList from "@/hooks/usePaymentByCompanyList";
import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { PaymentStatus } from "@/utils/enums/paymentStatus.enum";
import { getDate } from "@/utils/getDate";
import type { IPayment } from "@/utils/interfaces/Payment";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const getPaymentBadge = (status: string) => {
  switch (status) {
    case PaymentStatus.REVIEW:
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 font-semibold">
          ⏳ En revisión
        </Badge>
      );
    case PaymentStatus.APPROVED:
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
          ✓ Aprobado
        </Badge>
      );
    case PaymentStatus.REJECTED:
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
          ✗ Rechazado
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      );
  }
};

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
      <div className="max-w-7xl mx-auto py-8 px-4 flex items-center gap-3 text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        Cargando pagos...
      </div>
    );
  }

  const pendingCount = payments.filter((p) => p.status === PaymentStatus.REVIEW).length;

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Pagos de la empresa
              </h2>
              {companyName && (
                <p className="text-sm text-gray-500 mt-0.5">{companyName}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {pendingCount > 0 && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 text-sm px-3 py-1">
                  {pendingCount} pendiente{pendingCount > 1 ? "s" : ""} de revisión
                </Badge>
              )}
              <Link to="/admin">
                <Button variant="outline" size="sm">← Volver</Button>
              </Link>
            </div>
          </div>

          {payments.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No se encontraron pagos registrados para esta empresa.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Sistema</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment: IPayment) => (
                  <TableRow
                    key={payment._id}
                    className={
                      payment.status === PaymentStatus.REVIEW
                        ? "bg-amber-50 hover:bg-amber-100"
                        : undefined
                    }
                  >
                    <TableCell className="text-sm">{getDate(payment.paid_at)}</TableCell>
                    <TableCell className="text-sm">
                      {SYSTEM_LABELS[payment.system] ?? payment.system ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm capitalize">
                      {PLAN_LABELS[payment.plan] ?? payment.plan}
                    </TableCell>
                    <TableCell className="text-sm capitalize">
                      {payment.method || "—"}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {payment.amount} {payment.currency}
                    </TableCell>
                    <TableCell>{getPaymentBadge(payment.status)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={payment.status === PaymentStatus.REVIEW ? "default" : "outline"}
                        onClick={() => handleViewPayment(payment)}
                      >
                        {payment.status === PaymentStatus.REVIEW ? "Revisar" : "Ver detalle"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Payment detail dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle del Pago</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4 text-sm text-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Empresa</p>
                  <p className="font-medium">{selectedPayment.company?.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Estado</p>
                  {getPaymentBadge(selectedPayment.status)}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Sistema</p>
                  <p>{SYSTEM_LABELS[selectedPayment.system] ?? selectedPayment.system ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Plan</p>
                  <p className="capitalize">{PLAN_LABELS[selectedPayment.plan] ?? selectedPayment.plan}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Método de pago</p>
                  <p className="capitalize">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Monto</p>
                  <p className="font-semibold text-base">
                    {selectedPayment.amount} {selectedPayment.currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Fecha de pago</p>
                  <p>{getDate(selectedPayment.paid_at)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">ID</p>
                  <p className="text-xs text-gray-500 font-mono truncate">{selectedPayment._id}</p>
                </div>
              </div>

              {/* Billing info */}
              <div className="border-t pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Datos de facturación</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p>{selectedPayment.billing_info.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">NIT</p>
                    <p>{selectedPayment.billing_info.nit}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Email</p>
                    <p>{selectedPayment.billing_info.email}</p>
                  </div>
                </div>
              </div>

              {/* Proof */}
              {selectedPayment.proof_url && (
                <div className="border-t pt-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Comprobante</p>
                  <a
                    href={selectedPayment.proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800 text-sm"
                  >
                    Ver comprobante →
                  </a>
                </div>
              )}

              {/* Actions */}
              {selectedPayment.status === PaymentStatus.REVIEW && (
                <div className="border-t pt-4 flex justify-end gap-3">
                  <Button
                    variant="destructive"
                    onClick={() => handleConfirm("reject")}
                    disabled={isLoading}
                  >
                    Rechazar
                  </Button>
                  <Button
                    onClick={() => handleConfirm("approve")}
                    disabled={isLoading}
                  >
                    Aprobar pago
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {confirmAction === "approve" ? "Aprobar pago" : "Rechazar pago"}
            </DialogTitle>
            <DialogDescription>
              {confirmAction === "approve"
                ? "Se activará la suscripción de la empresa. ¿Estás seguro?"
                : "Se rechazará el pago y se notificará a la empresa. ¿Estás seguro?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmAction(null)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant={confirmAction === "reject" ? "destructive" : "default"}
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
