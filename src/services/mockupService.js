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

export function getTasksMockup(){
  const dataMockup = window.data || [];
  return Promise.resolve({
    data: {
      success: true,
      data: dataMockup.reverse(),
    }
  })
}

export function changePassMockup() {
  return Promise.resolve({
    data: {
      success: true,
    }
  })
}

export function changeStatus(data) {
  const dataMockup = window.data || [];
  console.log(data)
  let newData = dataMockup.map(item => {
    if (item.id === data.id) {
      item.status = item.status == "PENDIENTE" ? "HECHO" : "PENDIENTE";
    }
    return item;
  });
  console.log(newData)
  window.data = newData;
  return Promise.resolve({
    data: {
      success: true,
      data: newData,
    }
  })
}

export async function updateTaskMockup(data) {
  const dataMockup = window.data || [];
  let dataMock = dataMockup.map(item => {
    if (item.id === data.id) {
      return {
        ...item,
        ...data,
        tags: tagsToString(data.tags),
        expires: dateExpires(data.expires)
      };
    }
    return item;
  });
  return Promise.resolve({
    data: {
      success: true,
      data: dataMock,
    }
  });
}

export async function createTaskMockup(data){
  // decodificar
  data = {
    ...JSON.parse(data),
  }
  const dataMock = window.data || [];
  dataMock.push({
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "PENDIENTE",
  })
  return Promise.resolve({
    data: {
      success: true,
      data: dataMock,
    }
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


export async function mockupMain(url, method, body) {
  console.log(url, method, body)
  if (url === '/auth/register') {
    return registerMockup();
  } else if(url === '/auth/login') {
    return loginMockup();
  } else if (url === '/task' && method === 'get'){
    return getTasksMockup();
  } else if (url === '/task' && method === 'post') {
    return createTaskMockup(body);
  } else if (url === '/auth/user/changepass') {
    return changePassMockup();
  } else if (url.startsWith('/task/') && method === 'patch') {
    const id = url.split('/')[2];
    return changeStatus({ ...body, id });
  } else if (url.startsWith('/task') && method === 'put') {
    return updateTaskMockup(body);
  }
}