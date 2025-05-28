import { LIST_COMPANY } from "@/graphql/queries/Company";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "sonner";

const useCompanyList = () => {
  const {
    data: { listCompany: listCompany } = [],
    loading: loadingListCompany,
    error,
  } = useQuery(LIST_COMPANY, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return { listCompany, loadingListCompany };
};

export default useCompanyList;
