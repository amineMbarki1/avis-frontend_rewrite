import httpClient from "./http-client";

export async function login(auth) {
  return httpClient.post("/api/login", auth).then((res) => res.data);
}
