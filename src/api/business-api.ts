import httpClient from "./http-client";
import { QueryFunctionContext } from "react-query";

export function createBusiness(business) {
  return httpClient.post("/api/businesses", business).then((res) => res.data);
}

export function updateBusiness({ business, id }) {
  return httpClient
    .put(`/api/businesses/${id}`, business)
    .then((res) => res.data);
}

export function deleteBusiness(id) {
  return httpClient.delete(`/api/businesses/${id}`).then((res) => res.data);
}

export function getBusiness({ queryKey }: QueryFunctionContext) {
  const [_key, id] = queryKey as [string, Record<string, any>];

  return httpClient.get(`/api/businesses/${id}`).then((res) => res.data);
}

export function getBusinesses({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext) {
  const [_key, params] = queryKey as [string, Record<string, any>];

  let pageNum;
  if (params.page) pageNum = params.page;
  else pageNum = pageParam;

  return httpClient
    .get("/api/businesses", { params: { ...params, page: pageNum } })
    .then((res) => res.data);
}
