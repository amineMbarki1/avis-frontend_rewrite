import { useState } from "react";
import { useQuery } from "react-query";
import { getClients } from "@/api/client-api";

export function useClients({ initialFilters }: { initialFilters?: any }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState(initialFilters);
  const { data, isFetching, error } = useQuery(
    ["clients", { page, limit, filters }],
    {
      queryFn: getClients,
      keepPreviousData: true,
      select(data) {
        return data.data;
      },
    }
  );

  return {
    data,
    setPage,
    setLimit,
    error,
    page,
    limit,
    isFetching,
    setFilters,
    filters,
  };
}
