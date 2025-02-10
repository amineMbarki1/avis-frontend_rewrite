import { useQuery } from "react-query";
import { getBusinesses } from "@/api/business-api";
import { useState } from "react";

export function useBusinesses({ initialFilters }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState(initialFilters);

  const { data, isFetching, error } = useQuery(
    ["businesses", { page: 1, limit: 10, filters }],
    {
      queryFn: getBusinesses,

      keepPreviousData: true,
      select(data) {
        return data.data;
      },
    }
  );

  return {
    data,
    setFilters,
    filters,
    page,
    setPage,
    limit,
    setLimit,
    isFetching,
    error,
  };
}
