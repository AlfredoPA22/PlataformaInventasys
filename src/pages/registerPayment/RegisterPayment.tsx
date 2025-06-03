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
import { CREATE_PAYMENT } from "@/graphql/mutations/Payment";
import { useFormikForm } from "@/hooks/useFormikForm";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import { PaymentMethod } from "@/utils/enums/paymentMethod.enum";
import type { ICompany } from "@/utils/interfaces/Company";
import type { IPaymentInput } from "@/utils/interfaces/Payment";
import { pricePlanMock } from "@/utils/mock/pricePlanMock";
import { uploadImage } from "@/utils/uploadImage";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QRImage from "../../assets/QRINVENTASYS.jpeg";
import { schemaFormRegisterPayment } from "./FormRegisterPaymentValidation";

const RegisterPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const state = location.state as {
    company: ICompany;
    plan: CompanyPlan;
  } | null;

  useEffect(() => {
    if (!state || !state.plan || state.plan === CompanyPlan.FREE) {
      navigate("/");
    }
  }, [state, navigate]);

  const company = state!.company;
  const plan = state!.plan;
  const amount =
    plan === CompanyPlan.BASIC
      ? pricePlanMock.basic
      : plan === CompanyPlan.PRO
      ? pricePlanMock.pro
      : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
  };

  const handleFileClear = () => {
    setSelectedImage(null);
  };

  const onSubmit = async () => {
    if (!selectedImage) {
      toast.error("Debes subir un comprobante de pago.");
      return;
    }

    const data = await uploadImage(selectedImage);
    values.proof_url = data;

    const { data: dataPayment } = await createPayment({
      variables: values,
    });

    if (dataPayment) {
      toast.success("Pago registrado correctamente.");
      setIsDialogOpen(false);
      handleFileClear();
      resetForm();

      const payment = dataPayment?.createPaymentLanding;
      navigate("/pago-exitoso", {
        state: {
          company: {
            _id: payment.company._id,
            name: payment.company.name,
          },
          plan: payment.plan,
          amount: payment.amount,
          email: payment.billing_info.email,
        },
      });
    }
  };

  const initialValues: IPaymentInput = {
    company: company._id,
    amount: amount,
    billing_email: "",
    billing_name: "",
    billing_nit: "",
    currency: "Bs",
    method: PaymentMethod.QR,
    plan: plan,
    proof_url: "",
  };

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    values,
    errors,
    dirty,
    isValid,
    isSubmitting,
  } = useFormikForm({
    initialValues,
    handleSubmit: onSubmit,
    validationSchema: schemaFormRegisterPayment,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paymentDetails: { [key: string]: any } = {
    [PaymentMethod.QR]: {
      title: "Escanea el siguiente código QR para realizar el pago",
      image: QRImage,
    },
    [PaymentMethod.TRANSFER]: {
      title: "Datos para transferencia bancaria",
      info: [
        { label: "Banco", value: "Banco Economico" },
        { label: "N° de cuenta", value: "1001903744" },
        { label: "Titular", value: "Alfredo Parada Aguilar" },
        { label: "CI", value: "9607112SC" },
      ],
    },
  };

  if (!state) return null;

  return (
    <div className="grid md:grid-cols-2 gap-2 max-w-7xl mx-auto py-5 p-2">
      <section className="flex flex-col gap-5">
        {/* Card de título */}
        <Card className="shadow-md border border-gray-200">
          <CardContent className="p-6 space-y-2">
            <p className="text-center text-sm text-gray-500 mb-1">
              Empresa:{" "}
              <span className="font-semibold text-gray-800">
                {company.name}
              </span>
            </p>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              💳 Registro de Pago
            </h2>
            <p className="text-sm text-gray-600">
              Para activar el sistema, completa el siguiente formulario de pago
              y adjunta el comprobante correspondiente.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Importante:</strong> El pago será revisado y verificado
              por el equipo de administración. Una vez aprobado, se enviarán tus
              credenciales de acceso al correo registrado en la facturación.
            </p>
            <p className="text-sm text-gray-600">
              Este proceso puede tomar hasta 24 horas hábiles. Si tienes dudas,
              puedes contactarnos por los medios de soporte disponibles.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border border-blue-300 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-blue-600 text-3xl">📦</div>
              <h2 className="text-xl font-bold text-blue-800">
                Resumen del Plan Seleccionado
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                Estás registrando el pago para activar el plan{" "}
                <strong className="uppercase">{plan}</strong>, el cual te brinda
                los siguientes beneficios:
              </p>

              <ul className="list-disc list-inside text-sm text-blue-800 pl-2">
                {plan === CompanyPlan.BASIC && (
                  <>
                    <li>Hasta 3 empresas</li>
                    <li>Usuarios ilimitados</li>
                    <li>Multi-Almacén</li>
                    <li>Soporte prioritario</li>
                  </>
                )}
                {plan === CompanyPlan.PRO && (
                  <>
                    <li>Empresas ilimitadas</li>
                    <li>Integraciones disponibles</li>
                    <li>Soporte dedicado</li>
                  </>
                )}
                {plan === CompanyPlan.FREE && (
                  <>
                    <li>1 empresa</li>
                    <li>1 almacén</li>
                    <li>Soporte básico</li>
                  </>
                )}
              </ul>

              <hr className="border-blue-300" />

              <p className="text-base text-gray-800">
                <strong className="text-lg text-blue-700">Monto total:</strong>{" "}
                <span className="text-lg font-semibold">{amount} Bs</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="shadow-xl h-fit">
        <CardContent className="px-5 py-2">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Registrar Pago
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              {
                id: "billing_name",
                label: "Nombre para facturacion",
                placeholder: "Ej: Inventasys SRL",
              },
              {
                id: "billing_email",
                label: "Correo para facturacion",
                placeholder: "empresa@email.com",
                type: "email",
              },
              {
                id: "billing_nit",
                label: "NIT para facturacion",
                placeholder: "Ej: 1234567890",
              },
            ].map(({ id, label, placeholder, type = "text" }) => (
              <div key={id} className="space-y-1 m-1">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type}
                  name={id}
                  placeholder={placeholder}
                  value={values[id as keyof IPaymentInput] as string}
                  onChange={handleChange}
                />
                <p
                  className={`text-xs text-red-500 min-h-[0.25rem] transition-all duration-200 ${
                    errors[id as keyof typeof errors]
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {errors[id as keyof typeof errors] ?? " "}
                </p>
              </div>
            ))}

            <div className="space-y-1 m-1">
              <Label htmlFor="method">Método de pago</Label>
              <Select
                name="method"
                value={values.method}
                onValueChange={(value) => setFieldValue("method", value)}
              >
                <SelectTrigger id="method" className="w-full">
                  <SelectValue placeholder="Selecciona un metodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethod.QR}>Qr</SelectItem>
                  <SelectItem value={PaymentMethod.TRANSFER}>
                    Transferencia
                  </SelectItem>
                </SelectContent>
              </Select>
              <p
                className={`text-xs text-red-500 min-h-[0.25rem] transition-opacity duration-200 ${
                  errors.method ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.method ?? " "}
              </p>
            </div>

            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) handleFileClear();
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subir comprobante de pago</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  {values.method && (
                    <div className="space-y-2 border rounded-md p-4 bg-muted/40">
                      <p className="text-sm font-semibold text-gray-700">
                        {paymentDetails[values.method]?.title}
                      </p>

                      {values.method === PaymentMethod.QR && (
                        <a
                          href={paymentDetails[PaymentMethod.QR].image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={paymentDetails[PaymentMethod.QR].image}
                            alt="QR de pago"
                            className="rounded-md border w-full max-h-60 object-contain cursor-zoom-in transition hover:opacity-80"
                          />
                        </a>
                      )}

                      {values.method === PaymentMethod.TRANSFER &&
                        paymentDetails[PaymentMethod.TRANSFER].info.map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (item: any, idx: number) => (
                            <p key={idx} className="text-sm text-gray-800">
                              <strong>{item.label}:</strong> {item.value}
                            </p>
                          )
                        )}
                    </div>
                  )}
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
                  <Button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    Confirmar pago
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              type="button"
              className="w-full"
              disabled={!dirty || !isValid || isSubmitting}
              onClick={() => setIsDialogOpen(true)}
            >
              Realizar Pago
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPayment;
