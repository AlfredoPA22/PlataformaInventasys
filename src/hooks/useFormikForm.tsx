import { setIsBlocked } from "@/redux/slices/blockUISlice";
import { type FormikValues, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ObjectSchema } from "yup";
// import { setIsBlocked } from "../redux/slices/blockUISlice";
// import { ToastSeverity } from "../utils/enums/toast.enum";
// import { showToast } from "../utils/toastUtils";

interface HookFormikFormProps<T> {
  initialValues: T;
  handleSubmit: () => Promise<void>;
  msgSuccess?: string;
  validationSchema?: ObjectSchema<object>;
}

export const useFormikForm = <T extends FormikValues>({
  initialValues,
  handleSubmit,
  msgSuccess,
  validationSchema,
}: HookFormikFormProps<T>) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema || undefined,
    onSubmit: async () => {
      try {
        dispatch(setIsBlocked(true));
        await handleSubmit();
        if (msgSuccess) {
          toast.success(msgSuccess);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(setIsBlocked(false));
      }
    },
  });

  return { ...formik };
};
