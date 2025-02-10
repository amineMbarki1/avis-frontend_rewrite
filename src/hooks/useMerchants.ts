import { getMerchants } from "@/api/merchant-api";
import { useState } from "react";
import { useQuery } from "react-query";

export function useMerchants() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching, error } = useQuery(["merchants", { page, limit }], {
    queryFn: getMerchants,
    keepPreviousData: true,
  });

  return {
    data: data?.data,
    setPage,
    setLimit,
    error,
    page,
    limit,
    isFetching,
  };
}
