import { QueryFunctionContext } from "react-query";
import httpClient from "./http-client";

export async function createClient({ client, params }) {
  return httpClient
    .post("/api/clients", client, { params })
    .then((res) => res.data);
}

export async function updateClient({ id, client }) {
  return httpClient.put(`/api/clients/${id}`, client).then((res) => res.data);
}
export async function deleteClient(id) {
  return httpClient.delete(`/api/clients/${id}`).then((res) => res.data);
}

export function getClients({ queryKey, pageParam = 1 }: QueryFunctionContext) {
  const [_key, params] = queryKey as [string, Record<string, any>];
  let pageNum;
  if (params.page) pageNum = params.page;
  else pageNum = pageParam;

  return httpClient
    .get("/api/clients", {
      params: { ...params, page: pageNum },
    })
    .then((res) => res.data);
}

export function getClient(id) {
  return httpClient.get(`/api/clients/${id}`).then((res) => res.data);
}
