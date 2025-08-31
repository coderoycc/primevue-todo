export function register(credentials) {
  return http.post("/auth/register", credentials);
}
/**
 * Login a la aplicacion <<JWT>>
 * @param {Object} credentials
 * @returns {Promise}
 */
export function login(credentials) {
  return http.post("/auth/login", credentials);
}

export function changePass(form) {
  return http.put("/auth/user/changepass", form);
}

export function changeStatus(data) {
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
  const toReturns = !date ? null : date.toISOString().split('T')[0];
  return toReturns; 
}


export async function mockupMain(url) {
  console.log(url)
  return { 
    data: { 
      success: true, 
      token: 'mockup-token', 
      user: { name: 'Mockup User' } 
    } 
  };
}