import { getBusiness } from "@/api/business-api";
import { useQuery } from "react-query";

export function useBusiness(id) {
  const { data, isFetching, error } = useQuery(["businesses", id], {
    queryFn: getBusiness,
    select(data) {
      return data?.data;
    },
  });

  return { data, isFetching, error };
}
