import { getReviewRequests } from "@/api/schedule-request-api";
import { useState } from "react";
import { useQuery } from "react-query";

export function useReviewRequests() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const { data, isFetching, error } = useQuery(
    ["review-requests", { page, limit, filters }],
    {
      queryFn: getReviewRequests,
      keepPreviousData: true,
    }
  );

  return {
    data: data?.data,
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
