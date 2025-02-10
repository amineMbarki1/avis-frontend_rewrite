import httpClient from "./http-client";

export function scheduleReview(reviewRequest) {
  return httpClient
    .post("/api/review-requests", reviewRequest)
    .then((res) => res.data);
}

export function getReviewRequests({ queryKey, pageParam = 1 }) {
  const [_key, params] = queryKey as [string, Record<string, any>];
  let pageNum;
  if (params.page) pageNum = params.page;
  else pageNum = pageParam;
  return httpClient
    .get("/api/review-requests", {
      params: { ...params, page: pageNum },
    })
    .then((res) => res.data);
}

export function getReviewRequest({ queryKey }) {
  const [_key, id] = queryKey;

  return httpClient.get(`/api/review-requests/${id}`).then((res) => res.data);
}

export function toggleReviewRequest(id) {
  return httpClient
    .post(`/api/review-requests/${id}/toggle`)
    .then((res) => res.data);
}

export function cancelReviewRequest(id) {
  return httpClient
    .post(`/api/review-requests/${id}/cancel`)
    .then((res) => res.data);
}

export function getSMSEmailsReport() {
  return httpClient.get("/api/statistics/sms-emails").then((res) => res.data);
}
