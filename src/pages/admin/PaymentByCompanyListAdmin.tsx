import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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

const PaymentByCompanyListAdmin = () => {
  const { id } = useParams();
  const companyId: string = id || "";

  const dispatch = useDispatch();

  const { listPaymentLandingByCompany, loadingListPayment } =
    usePaymentByCompanyList(companyId);

  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const [open, setOpen] = useState(false);

  const [approvePaymentLanding] = useMutation(APPROVE_PAYMENT, {
    refetchQueries: [
      {
        query: LIST_COMPANY_ADMIN,
      },
    ],
  });
  const [rejectPaymentLanding] = useMutation(REJECT_PAYMENT, {
    refetchQueries: [
      {
        query: LIST_COMPANY_ADMIN,
      },
    ],
  });

  const handleViewPayment = (payment: IPayment) => {
    setSelectedPayment(payment);
    setOpen(true);
  };

  const handleApprovePayment = async (paymentId: string) => {
    try {
      dispatch(setIsBlocked(true));
      await approvePaymentLanding({
        variables: {
          paymentId,
        },
      });

      toast.success("Pago aprobado exitosamente");
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

  const handleRejectPayment = async (paymentId: string) => {
    try {
      dispatch(setIsBlocked(true));
      await rejectPaymentLanding({
        variables: {
          paymentId,
        },
      });

      toast.success("Pago rechazado");
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error);
    } finally {
      dispatch(setIsBlocked(false));
    }
  };

  if (loadingListPayment) {
    return (
      <div className="max-w-7xl mx-auto py-5 p-2">
        <p className="text-gray-600">Cargando pagos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5 p-2 space-y-2">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de pagos de la empresa
            </h2>
            <Link to="/admin">
              <Button>Volver a la lista</Button>
            </Link>
          </div>

          {listPaymentLandingByCompany.length === 0 ? (
            <p className="text-gray-600">
              No se encontraron pagos registrados.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead>Método de Pago</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listPaymentLandingByCompany.map((payment: IPayment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{payment._id}</TableCell>
                    <TableCell>{getDate(payment.paid_at)}</TableCell>
                    <TableCell className="capitalize">
                      {payment.method || "No especificado"}
                    </TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell className="capitalize">
                      {payment.status}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewPayment(payment)}
                      >
                        Ver Pago
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">🧾 Detalle del Pago</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div>
                <p className="font-medium text-gray-600">ID</p>
                <p className="truncate">{selectedPayment._id}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Empresa</p>
                <p>{selectedPayment.company?.name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Plan</p>
                <p className="capitalize">{selectedPayment.plan}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Método de Pago</p>
                <p className="capitalize">{selectedPayment.method}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Monto</p>
                <p>
                  {selectedPayment.amount} {selectedPayment.currency}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Estado</p>
                <p className="capitalize">{selectedPayment.status}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Fecha de Pago</p>
                <p>{getDate(selectedPayment.paid_at)}</p>
              </div>

              <div className="md:col-span-2 border-t pt-3">
                <p className="font-semibold text-gray-700 mb-2">
                  📄 Datos de Facturación
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-600">Nombre</p>
                    <p>{selectedPayment.billing_info.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">NIT</p>
                    <p>{selectedPayment.billing_info.nit}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-gray-600">Email</p>
                    <p>{selectedPayment.billing_info.email}</p>
                  </div>
                </div>
              </div>

              {selectedPayment.proof_url && (
                <div className="md:col-span-2 border-t pt-3">
                  <p className="font-semibold text-gray-700 mb-2">
                    📎 Comprobante
                  </p>
                  <a
                    href={selectedPayment.proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Ver Comprobante
                  </a>
                </div>
              )}

              {selectedPayment.status === PaymentStatus.REVIEW && (
                <div className="md:col-span-2 pt-6 flex justify-end gap-4">
                  <Button
                    onClick={() => handleRejectPayment(selectedPayment._id)}
                    variant="destructive"
                  >
                    ❌ Rechazar Pago
                  </Button>
                  <Button
                    onClick={() => handleApprovePayment(selectedPayment._id)}
                    variant="default"
                  >
                    ✅ Aprobar Pago
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentByCompanyListAdmin;
