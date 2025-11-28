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
import { plansMock } from "@/utils/mock/planMock";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F3853] mb-4">
            Registro de <span className="text-[#A0C82E]">Pago</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa el formulario para activar tu plan y comenzar a usar Inventasys
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="flex flex-col gap-6">
            {/* Card de información */}
            <Card className="shadow-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50/50">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A0C82E] to-[#8BB429] rounded-xl flex items-center justify-center text-2xl">
                    💳
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F3853]">
                      Información de Pago
                    </h2>
                    <p className="text-sm text-gray-500">
                      Empresa: <span className="font-semibold text-gray-800">{company.name}</span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Para activar el sistema, completa el siguiente formulario de pago
                  y adjunta el comprobante correspondiente.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-blue-800">
                    ⚠️ Importante
                  </p>
                  <p className="text-sm text-gray-700">
                    El pago será revisado y verificado por el equipo de administración.
                    Una vez aprobado, se enviarán tus credenciales de acceso al correo
                    registrado en la facturación.
                  </p>
                  <p className="text-xs text-gray-600">
                    Este proceso puede tomar hasta 24 horas hábiles.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resumen del plan */}
            <Card className="shadow-xl border-2 border-[#A0C82E]/30 bg-gradient-to-br from-[#A0C82E]/10 via-white to-white">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#A0C82E] to-[#8BB429] rounded-xl flex items-center justify-center text-3xl">
                    📦
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#0F3853]">
                      Resumen del Plan
                    </h2>
                    <p className="text-sm text-gray-600">
                      Plan <span className="font-semibold uppercase text-[#A0C82E]">{plan}</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Características incluidas:
                  </p>
                  <ul className="space-y-2">
                    {plansMock
                      ?.find((p) => p.id === plan)
                      ?.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#A0C82E] text-lg mt-0.5">✓</span>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                  </ul>

                  <div className="bg-[#0F3853]/5 rounded-lg p-4 mt-4 border border-[#0F3853]/10">
                    <p className="text-sm text-gray-600 mb-1">Monto total a pagar</p>
                    <p className="text-3xl font-extrabold text-[#0F3853]">
                      {amount} <span className="text-lg">Bs</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Formulario */}
          <Card className="shadow-2xl border-2 border-gray-100 bg-white">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3853] mb-2">
                  Datos de Facturación
                </h2>
                <p className="text-sm text-gray-600">
                  Completa la información para la facturación
                </p>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
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
              <div key={id} className="space-y-1.5">
                <Label htmlFor={id} className="text-sm font-semibold text-gray-700">
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type}
                  name={id}
                  placeholder={placeholder}
                  value={values[id as keyof IPaymentInput] as string}
                  onChange={handleChange}
                  className={`transition-all duration-200 ${
                    errors[id as keyof typeof errors]
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#A0C82E] focus:ring-[#A0C82E]"
                  }`}
                />
                <p
                  className={`text-xs text-red-500 min-h-[1.25rem] transition-all duration-200 ${
                    errors[id as keyof typeof errors]
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {errors[id as keyof typeof errors] ?? " "}
                </p>
              </div>
            ))}

            <div className="space-y-1.5">
              <Label htmlFor="method" className="text-sm font-semibold text-gray-700">
                Método de pago
              </Label>
              <Select
                name="method"
                value={values.method}
                onValueChange={(value) => setFieldValue("method", value)}
              >
                <SelectTrigger 
                  id="method" 
                  className={`w-full transition-all duration-200 ${
                    errors.method
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-[#A0C82E] focus:ring-[#A0C82E]"
                  }`}
                >
                  <SelectValue placeholder="Selecciona un método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethod.QR}>QR</SelectItem>
                  <SelectItem value={PaymentMethod.TRANSFER}>
                    Transferencia Bancaria
                  </SelectItem>
                </SelectContent>
              </Select>
              <p
                className={`text-xs text-red-500 min-h-[1.25rem] transition-all duration-200 ${
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
              <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                  <DialogTitle className="text-2xl font-bold text-[#0F3853]">
                    Subir comprobante de pago
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 overflow-y-auto flex-1 pr-2">
                  {values.method && (
                    <div className="space-y-4 border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white">
                      <p className="text-base font-semibold text-[#0F3853]">
                        {paymentDetails[values.method]?.title}
                      </p>

                      {values.method === PaymentMethod.QR && (
                        <div className="flex justify-center">
                          <a
                            href={paymentDetails[PaymentMethod.QR].image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-[#A0C82E]/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                              <img
                                src={paymentDetails[PaymentMethod.QR].image}
                                alt="QR de pago"
                                className="relative rounded-xl border-4 border-white shadow-2xl w-full max-w-xs object-contain cursor-zoom-in transition-transform group-hover:scale-105"
                              />
                            </div>
                          </a>
                        </div>
                      )}

                      {values.method === PaymentMethod.TRANSFER && (
                        <div className="grid grid-cols-2 gap-4">
                          {paymentDetails[PaymentMethod.TRANSFER].info.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (item: any, idx: number) => (
                              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="proof_url" className="text-sm font-semibold text-gray-700">
                      Comprobante de pago
                    </Label>
                    <Input
                      id="proof_url"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border-gray-300 focus:border-[#A0C82E] focus:ring-[#A0C82E] transition-all duration-200"
                    />
                    {selectedImage && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                        <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Vista previa"
                            className="w-full max-h-64 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="mt-6 gap-3 flex-shrink-0 border-t pt-4">
                  <Button
                    onClick={() => {
                      handleFileClear();
                      setIsDialogOpen(false);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting || !selectedImage}
                    className="flex-1 bg-[#A0C82E] hover:bg-[#8BB429] text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Procesando...
                      </span>
                    ) : (
                      "Confirmar pago"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="pt-4">
              <Button
                type="button"
                className="w-full bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!dirty || !isValid || isSubmitting}
                onClick={() => setIsDialogOpen(true)}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Procesando...
                  </span>
                ) : (
                  "Continuar con el pago"
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Al continuar, serás redirigido para subir tu comprobante
              </p>
            </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPayment;
