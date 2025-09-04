import moment from "moment";

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
  let newData = dataMockup.map(item => {
    if (item.id === data.id) {
      item.status = item.status == "PENDIENTE" ? "HECHO" : "PENDIENTE";
    }
    return item;
  });

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
  data = {...JSON.parse(data)};
  const expiresDate = moment(data.expires)
  if(expiresDate.isValid()){
    data.expires = expiresDate.utcOffset(-4).format('YYYY-MM-DDTHH:mm:ss');
  }
  let dataMock = dataMockup.map(item => {
    if (item.id === data.id) {
      return {
        ...item,
        ...data,
        tags: data.tags,
        expires: data.expires ?? undefined,
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
  const expires = data.expires ? moment(data.expires, 'YYYY-MM-DD').utcOffset(-4).format('YYYY-MM-DDTHH:mm:ss') : undefined;
  const created = moment().utcOffset(-4).format('YYYY-MM-DDTHH:mm:ss');
  dataMock.push({
    ...data,
    expires: expires,
    id: crypto.randomUUID(),
    created_at: created,
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