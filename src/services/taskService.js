import moment from "moment";
import http from "../config/httpAxios.config";
export async function getTasks(filter) {
  return http.get("/task", filter);
}

export async function changeStatus(data) {
  const status = data.status == "PENDIENTE" ? "HECHO" : "PENDIENTE";
  return http.patch(`/task/${data.id}`, { status });
}
export async function update(data) {
  return http.put(`/task/${data.id}`, {
    ...data, 
    tags: tagsToString(data.tags),
    expires: dateExpires(data.expires)
  });
}

export async function create(data){
  return http.post('/task', {
    ...data, 
    tags: tagsToString(data.tags), 
    expires: dateExpires(data.expires)
  });
}

/**
 * Convierte un array de "tags" a string para enviarlo a backend
 */
function tagsToString(tags){
  return tags ? tags.join(',') : '';
}

function dateExpires(date){
  const toReturns = moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : null;
  return toReturns; 
}