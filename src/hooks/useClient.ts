import { getClient } from "@/api/client-api";
import { useQuery } from "react-query";

export function useClient(id) {
  const { data, isFetching, error } = useQuery(["clients", id], {
    queryFn: getClient,
  });

  return { data, isFetching, error };
}
