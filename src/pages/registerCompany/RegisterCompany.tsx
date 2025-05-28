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
import { useMutation } from "@apollo/client";
import { schemaFormRegisterCompany } from "./FormRegisterCompanyValidation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const planDetails: Record<
    CompanyPlan,
    { name: string; price: string; features: string[] }
  > = {
    prueba: {
      name: "Gratis",
      price: "0 Bs",
      features: [
        "1 Empresa",
        "Usuarios ilimitados",
        "1 Almacén",
        "Soporte básico",
      ],
    },
    basico: {
      name: "Básico",
      price: "99 Bs/mes",
      features: [
        "3 Empresas",
        "Usuarios ilimitados",
        "Multi-Almacén",
        "Soporte prioritario",
      ],
    },
    profesional: {
      name: "Premium",
      price: "199 Bs/mes",
      features: ["Empresas ilimitadas", "Integraciones", "Soporte dedicado"],
    },
  };

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
    <div className="grid md:grid-cols-2 gap-2 max-w-7xl mx-auto py-5 p-2">
      <section className="flex flex-col gap-5">
        {/* Card de título */}
        <Card className="shadow-md border border-gray-200">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              🧾 Registro de Empresa
            </h2>
            <p className="text-sm text-gray-600">
              Completa los datos de tu empresa para comenzar a usar la
              plataforma. Si seleccionas un plan de pago, podrás continuar al
              proceso de activación luego del registro.
            </p>
          </CardContent>
        </Card>

        {/* Información del plan (izquierda en desktop) */}
        {detectedPlan && (
          <Card className="bg-blue-50 border-blue-300 border shadow-md">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-blue-600 text-2xl font-bold">💼</div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-700">
                    Plan Seleccionado: {planDetails[detectedPlan].name}
                  </h2>
                  <p className="text-sm text-blue-600">
                    {planDetails[detectedPlan].price}
                  </p>
                </div>
              </div>
              <ul className="list-disc list-inside pl-4 text-blue-800 text-sm">
                {planDetails[detectedPlan].features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Formulario (derecha en desktop) */}
      <Card className="shadow-xl">
        <CardContent className="px-5 py-2">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Registrar Empresa
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
              { id: "country", label: "País", placeholder: "Ej: Bolivia" },
            ].map(({ id, label, placeholder, type = "text" }) => (
              <div key={id} className="space-y-1 m-1">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type}
                  name={id}
                  placeholder={placeholder}
                  value={values[id as keyof ICompanyInput] as string}
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
              <Label htmlFor="plan">Plan</Label>
              <Select
                name="plan"
                value={values.plan}
                onValueChange={(value) => setFieldValue("plan", value)}
                disabled={!!detectedPlan}
              >
                <SelectTrigger id="plan" className="w-full">
                  <SelectValue placeholder="Selecciona un plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CompanyPlan.FREE}>Gratis</SelectItem>
                  <SelectItem value={CompanyPlan.BASIC}>Básico</SelectItem>
                  <SelectItem value={CompanyPlan.PRO}>Premium</SelectItem>
                </SelectContent>
              </Select>
              <p
                className={`text-xs text-red-500 min-h-[0.25rem] transition-opacity duration-200 ${
                  errors.plan ? "opacity-100" : "opacity-0"
                }`}
              >
                {errors.plan ?? " "}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!dirty || !isValid || isSubmitting}
            >
              Registrar Empresa
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterCompany;
