import http from "../config/httpAxios.config";
export async function getTasks(filter) {}
export async function test(filters) {
  console.log(filters);
  return http.get("/app/master/list_service_names");
}
export async function changeStatus(data) {
  const status = data.status == "PENDIENTE" ? "HECHO" : "PENDIENTE";
  return http.patch(`/task/${data.id}`, { status });
}
export async function update(data) {
  return http.put(`/task/${data.id}`, data);
}
