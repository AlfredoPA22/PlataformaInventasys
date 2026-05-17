import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_PAYMENT } from "@/graphql/mutations/Payment";
import { LIST_PAYMENT_BY_COMPANY } from "@/graphql/queries/Payment";
import usePaymentByCompanyList from "@/hooks/usePaymentByCompanyList";
import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { PaymentStatus } from "@/utils/enums/paymentStatus.enum";
import { getDate } from "@/utils/getDate";
import type { IPayment } from "@/utils/interfaces/Payment";
import { uploadImage } from "@/utils/uploadImage";
import { useMutation } from "@apollo/client";
import { ArrowLeft, ExternalLink, Receipt } from "lucide-react";
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

const PaymentByCompanyList = () => {
  const { id } = useParams();
  const companyId: string = id || "";

  const dispatch = useDispatch();

  const [updatePaymentLanding] = useMutation(UPDATE_PAYMENT, {
    refetchQueries: [
      {
        query: LIST_PAYMENT_BY_COMPANY,
        variables: { companyId },
      },
    ],
  });

  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { listPaymentLandingByCompany, loadingListPayment } =
    usePaymentByCompanyList(companyId);

  const handleViewPayment = (payment: IPayment) => {
    setSelectedPayment(payment);
    setOpen(true);
  };

  const handleUpdateProof = (payment: IPayment) => {
    setSelectedPayment(payment);
    setIsDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
  };

  const handleFileClear = () => {
    setSelectedImage(null);
  };

  const onSubmitProof = async () => {
    try {
      if (!selectedImage) {
        toast.error("Debes subir un comprobante de pago.");
        return;
      }

      dispatch(setIsBlocked(true));

      const data = await uploadImage(selectedImage);

      const { data: dataPayment } = await updatePaymentLanding({
        variables: {
          paymentId: selectedPayment?._id,
          proof_url: data,
        },
      });

      if (dataPayment) {
        toast.success("Comprobante actualizado.");
        setIsDialogOpen(false);
        setOpen(false);
        handleFileClear();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/mi-cuenta"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#A0C82E] transition-colors mb-2 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Volver a mi cuenta
          </Link>
          <h1 className="text-2xl font-bold text-[#0F3853] tracking-tight">
            Historial de pagos
          </h1>
        </div>
        <div className="w-10 h-10 bg-[#A0C82E]/10 rounded-xl flex items-center justify-center">
          <Receipt className="w-5 h-5 text-[#6a8c1e]" strokeWidth={1.7} />
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {listPaymentLandingByCompany.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <Receipt className="w-10 h-10 opacity-30" strokeWidth={1.3} />
            <p className="text-sm">No hay pagos registrados.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-gray-100 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              <span>Fecha</span>
              <span>Método</span>
              <span>Plan</span>
              <span>Monto</span>
              <span>Estado</span>
              <span />
            </div>

            <div className="divide-y divide-gray-50">
              {listPaymentLandingByCompany.map((payment: IPayment) => (
                <div
                  key={payment._id}
                  className="px-6 py-4 hover:bg-slate-50/70 transition-colors duration-150"
                >
                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_auto] gap-4 items-center">
                    <span className="text-sm text-gray-700">{getDate(payment.paid_at)}</span>
                    <span className="text-sm text-gray-600 capitalize">{payment.method || "—"}</span>
                    <span className="text-sm text-gray-600 capitalize">{payment.plan}</span>
                    <span className="text-sm font-semibold text-[#0F3853]">{payment.amount}</span>
                    <StatusBadge status={payment.status} />
                    <button
                      className="h-7 text-xs text-gray-500 hover:text-[#0F3853] hover:bg-slate-100 border border-gray-200 hover:border-gray-300 rounded-lg px-3 transition-all duration-150 cursor-pointer"
                      onClick={() => handleViewPayment(payment)}
                    >
                      Ver
                    </button>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0F3853] capitalize">{payment.plan}</span>
                      <StatusBadge status={payment.status} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{getDate(payment.paid_at)}</span>
                      <span className="font-medium text-gray-700">{payment.amount}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-8 text-xs mt-1"
                      onClick={() => handleViewPayment(payment)}
                    >
                      Ver detalle
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* View detail dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
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
                <DetailRow label="Plan">
                  <span className="capitalize">{selectedPayment.plan}</span>
                </DetailRow>
                <DetailRow label="Estado">
                  <StatusBadge status={selectedPayment.status} />
                </DetailRow>
                <DetailRow label="Monto">
                  {selectedPayment.amount} {selectedPayment.currency}
                </DetailRow>
                <DetailRow label="Método de pago">
                  <span className="capitalize">{selectedPayment.method}</span>
                </DetailRow>
                <DetailRow label="Fecha de pago">
                  {getDate(selectedPayment.paid_at)}
                </DetailRow>
                <DetailRow label="Empresa">
                  {selectedPayment.company?.name}
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

              {(selectedPayment.status === PaymentStatus.REJECTED ||
                selectedPayment.status === PaymentStatus.REVIEW) && (
                <div className="border-t border-gray-100 pt-4 flex justify-end">
                  <Button
                    className="bg-[#A0C82E] hover:bg-[#8BB429] text-white text-sm font-medium px-5 rounded-xl"
                    onClick={() => handleUpdateProof(selectedPayment)}
                  >
                    Actualizar comprobante
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload proof dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) handleFileClear();
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#0F3853]">
              Actualizar comprobante
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Label htmlFor="proof_url" className="text-sm text-gray-700">
              Selecciona la imagen del comprobante
            </Label>
            <Input
              id="proof_url"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Vista previa"
                className="rounded-xl border border-gray-100 w-full max-h-52 object-contain"
              />
            )}
          </div>

          <DialogFooter className="mt-2 gap-2">
            <Button
              variant="ghost"
              className="text-gray-500"
              onClick={() => {
                handleFileClear();
                setIsDialogOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#A0C82E] hover:bg-[#8BB429] text-white font-medium rounded-xl"
              onClick={() => onSubmitProof()}
            >
              Actualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentByCompanyList;
