export function registerMockup() {
  return Promise.resolve({
    data: {
      success: true,
      token: 'mockup-token',
      user: { name: 'Mockup User' }
    }
  });
}

export function loginMockup() {
  return Promise.resolve({
    data: {
      success: true,
      token: 'mockup-token',
      user: { name: 'Mockup User' }
    }
  });
}

export function changePassMockup() {
  return Promise.resolve({

  })
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


export async function mockupMain(url, method) {
  console.log(url, method)
  if (url === '/auth/register') {
    return registerMockup();
  } else if(url === '/auth/login') {
    return loginMockup();
  } else if (url === '/task' && method === 'get'){
    return getTasksMockup();
  } else if (url === '/task' && method === 'post') {
    return createTaskMockup();
  } else if (url === '/auth/user/changepass') {
    return changePassMockup();
  }
}