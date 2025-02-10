import { getMerchant } from "@/api/merchant-api";
import { useQuery } from "react-query";

export function useMerchant(id) {
  const { data, isFetching, error } = useQuery(["merchants", id], {
    queryFn: getMerchant,
    keepPreviousData: true,
    select(data) {
      return data.data;
    },
  });

  return {
    error,
    data,
    isFetching,
  };
}
