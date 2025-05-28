import { LIST_COMPANY_ADMIN } from "@/graphql/queries/Company";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "sonner";

const useCompanyListAdmin = () => {
  const {
    data: { listCompanyAdmin: listCompanyAdmin } = [],
    loading: loadingListCompany,
    error,
  } = useQuery(LIST_COMPANY_ADMIN, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return { listCompanyAdmin, loadingListCompany };
};

export default useCompanyListAdmin;
