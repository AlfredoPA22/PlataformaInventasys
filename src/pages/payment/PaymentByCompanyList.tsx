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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UPDATE_PAYMENT } from "@/graphql/mutations/Payment";
import { LIST_PAYMENT_BY_COMPANY } from "@/graphql/queries/Payment";
import usePaymentByCompanyList from "@/hooks/usePaymentByCompanyList";
import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { PaymentStatus } from "@/utils/enums/paymentStatus.enum";
import { getDate } from "@/utils/getDate";
import type { IPayment } from "@/utils/interfaces/Payment";
import { uploadImage } from "@/utils/uploadImage";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

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
              Lista de pagos
            </h2>
            <Link to="/mi-cuenta">
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

              {(selectedPayment.status === PaymentStatus.REJECTED ||
                selectedPayment.status === PaymentStatus.REVIEW) && (
                <div className="md:col-span-2 pt-2 flex justify-end">
                  <Button onClick={() => handleUpdateProof(selectedPayment)}>
                    Actualizar comprobante
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) handleFileClear();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar comprobante de pago</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Label htmlFor="proof_url">Comprobante</Label>
            <Input
              id="proof_url"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Vista previa"
                className="rounded-md border w-full max-h-60 object-contain"
              />
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              onClick={() => {
                handleFileClear();
                setIsDialogOpen(false);
              }}
              variant="ghost"
            >
              Cancelar
            </Button>
            <Button type="button" onClick={() => onSubmitProof()}>
              Actualizar comprobante
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentByCompanyList;
