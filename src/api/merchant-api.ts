import { Merchant } from "@/components/merchant-form";
import httpClient from "./http-client";
import { QueryFunctionContext } from "react-query";

export function createMerchant(merchant: Merchant) {
  return httpClient.post("/api/merchants", merchant).then((res) => res.data);
}

export function updateMerchant({ id, merchant }) {
  return httpClient
    .put(`/api/merchants/${id}`, merchant)
    .then((res) => res.data);
}

export function deleteMerchant(id) {
  return httpClient.delete(`/api/merchants/${id}`).then((res) => res.data);
}

export function getMerchants({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext) {
  const [_key, params] = queryKey as [string, Record<string, any>];
  let pageNum;
  if (params.page) pageNum = params.page;
  else pageNum = pageParam;

  return httpClient
    .get("/api/merchants", {
      params: { ...params, page: pageNum },
    })
    .then((res) => res.data);
}

export async function getMerchant({ queryKey }: QueryFunctionContext) {
  const [_key, id] = queryKey;
  return httpClient.get(`/api/merchants/${id}`).then((res) => res.data);
}

export async function getMerchantStatistics() {
  return httpClient.get("/api/statistics/merchants").then((res) => res.data);
}
