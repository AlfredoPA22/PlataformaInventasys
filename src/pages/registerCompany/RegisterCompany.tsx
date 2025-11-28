import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREATE_COMPANY } from "@/graphql/mutations/Company";
import { useFormikForm } from "@/hooks/useFormikForm";
import { CompanyPlan } from "@/utils/enums/companyPlan.enum";
import type { ICompanyInput } from "@/utils/interfaces/Company";
import { plansMock } from "@/utils/mock/planMock";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { schemaFormRegisterCompany } from "./FormRegisterCompanyValidation";
import { countriesMock } from "@/utils/mock/countryMock";
import { currenciesMock } from "@/utils/mock/currencyMock";

const RegisterCompany = () => {
  const navigate = useNavigate();

  const [createCompany] = useMutation(CREATE_COMPANY);

  const [searchParams] = useSearchParams();
  const param = searchParams.get("plan") ?? "";
  const detectedPlan = Object.values(CompanyPlan).includes(param as CompanyPlan)
    ? (param as CompanyPlan)
    : "";

  const onSubmit = async () => {
    const { data } = await createCompany({ variables: values });

    if (!data?.createCompany) {
      toast.error("Error al crear la empresa.");
      return;
    }

    const { company, adminCredentials } = data.createCompany;

    if (company.plan === CompanyPlan.FREE) {
      navigate("/registro-exitoso", {
        state: {
          company: company,
          user_name: adminCredentials.user_name,
          password: adminCredentials.password,
        },
      });
    } else {
      navigate(`/pago`, {
        state: {
          company: company,
          plan: company.plan,
        },
      });
    }

    resetForm();
  };

  useEffect(() => {
    if (detectedPlan) {
      setFieldValue("plan", detectedPlan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedPlan]);

  const initialValues: ICompanyInput = {
    name: "",
    legal_name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    plan: detectedPlan,
    currency: currenciesMock[0],
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
    initialValues: initialValues,
    handleSubmit: onSubmit,
    msgSuccess: "Empresa creada.",
    validationSchema: schemaFormRegisterCompany,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F3853] mb-4">
            Registro de <span className="text-[#A0C82E]">Empresa</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa los datos de tu empresa para comenzar a usar la plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="flex flex-col gap-6">
            {/* Card de información */}
            <Card className="shadow-xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50/50">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A0C82E] to-[#8BB429] rounded-xl flex items-center justify-center text-2xl">
                    🧾
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F3853]">
                    Información importante
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Completa todos los datos solicitados para crear tu cuenta empresarial.
                  Si seleccionas un plan de pago, podrás continuar al proceso de activación
                  luego del registro.
                </p>
                <div className="bg-[#A0C82E]/10 border border-[#A0C82E]/20 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#0F3853]">Nota:</strong> Los datos marcados con
                    <span className="text-red-500"> *</span> son obligatorios.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Información del plan (izquierda en desktop) */}
            {detectedPlan &&
              (() => {
                const planInfo = plansMock.find((p) => p.id === detectedPlan);

                return planInfo ? (
                  <Card className="shadow-xl border-2 border-[#A0C82E]/30 bg-gradient-to-br from-[#A0C82E]/10 via-white to-white">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#A0C82E] to-[#8BB429] rounded-xl flex items-center justify-center text-3xl">
                          💼
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-[#0F3853]">
                            Plan Seleccionado
                          </h2>
                          <p className="text-2xl font-extrabold text-[#A0C82E]">
                            {planInfo.name}
                          </p>
                          <p className="text-sm font-semibold text-gray-600">
                            {planInfo.price}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          Características incluidas:
                        </p>
                        <ul className="space-y-2">
                          {planInfo.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#A0C82E] text-lg mt-0.5">✓</span>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ) : null;
              })()}
          </section>

          {/* Formulario (derecha en desktop) */}
          <Card className="shadow-2xl border-2 border-gray-100 bg-white">
            <CardContent className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F3853] mb-2">
                  Datos de la Empresa
                </h2>
                <p className="text-sm text-gray-600">
                  Completa el formulario con la información de tu empresa
                </p>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
            {[
              {
                id: "name",
                label: "Nombre Comercial",
                placeholder: "Ej: Inventasys SRL",
              },
              {
                id: "legal_name",
                label: "Razón Social",
                placeholder: "Ej: Inventasys SRL LTDA",
              },
              { id: "nit", label: "NIT", placeholder: "Ej: 1234567890" },
              {
                id: "email",
                label: "Correo",
                placeholder: "empresa@email.com",
                type: "email",
              },
              {
                id: "phone",
                label: "Teléfono",
                placeholder: "Ej: +591 70000000",
                type: "tel",
              },
              {
                id: "address",
                label: "Dirección",
                placeholder: "Ej: Calle 123, Zona Centro",
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
                  value={values[id as keyof ICompanyInput] as string}
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
                  <Label htmlFor="country" className="text-sm font-semibold text-gray-700">
                    País
                  </Label>
                  <Select
                    name="country"
                    value={values.country}
                    onValueChange={(value) => setFieldValue("country", value)}
                  >
                    <SelectTrigger 
                      id="country" 
                      className={`w-full transition-all duration-200 ${
                        errors.country
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#A0C82E] focus:ring-[#A0C82E]"
                      }`}
                    >
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesMock.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p
                    className={`text-xs text-red-500 min-h-[1.25rem] transition-all duration-200 ${
                      errors.country ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.country ?? " "}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="currency" className="text-sm font-semibold text-gray-700">
                    Moneda
                  </Label>
                  <Select
                    name="currency"
                    value={values.currency}
                    onValueChange={(value) => setFieldValue("currency", value)}
                  >
                    <SelectTrigger 
                      id="currency" 
                      className="w-full border-gray-300 focus:border-[#A0C82E] focus:ring-[#A0C82E] transition-all duration-200"
                    >
                      <SelectValue placeholder="Selecciona una moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      {currenciesMock.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="plan" className="text-sm font-semibold text-gray-700">
                    Plan
                  </Label>
                  <Select
                    name="plan"
                    value={values.plan}
                    onValueChange={(value) => setFieldValue("plan", value)}
                    disabled={!!detectedPlan}
                  >
                    <SelectTrigger 
                      id="plan" 
                      className={`w-full transition-all duration-200 ${
                        errors.plan
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#A0C82E] focus:ring-[#A0C82E]"
                      } ${detectedPlan ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    >
                      <SelectValue placeholder="Selecciona un plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CompanyPlan.FREE}>Gratis</SelectItem>
                      <SelectItem value={CompanyPlan.BASIC}>Básico</SelectItem>
                      <SelectItem value={CompanyPlan.PRO}>Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <p
                    className={`text-xs text-red-500 min-h-[1.25rem] transition-all duration-200 ${
                      errors.plan ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {errors.plan ?? " "}
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#A0C82E] hover:bg-[#8BB429] text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Registrando...
                      </span>
                    ) : (
                      "Registrar Empresa"
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Al registrar, aceptas nuestros términos y condiciones
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

export default RegisterCompany;
