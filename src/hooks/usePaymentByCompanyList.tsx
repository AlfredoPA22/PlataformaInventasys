import { LIST_PAYMENT_BY_COMPANY } from "@/graphql/queries/Payment";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "sonner";

const usePaymentByCompanyList = (companyId: string) => {
  const {
    data: { listPaymentLandingByCompany: listPaymentLandingByCompany } = [],
    loading: loadingListPayment,
    error,
  } = useQuery(LIST_PAYMENT_BY_COMPANY, {
    variables: { companyId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return { listPaymentLandingByCompany, loadingListPayment };
};

export default usePaymentByCompanyList;
