import store from "@store/index";
import axios from "axios";
import { URL_API } from "./constants.js";
import router from '../router';

const instance = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Interceptor RESPONSE para errores en peticiones
 */
instance.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    if(!error.response){ // No hay conexion al backend
      return Promise.reject({ response: 
        { data: 
          { 
            message: 'Sin conexión, intente más tarde',
            handler: 'HTTP_INTERCEPTOR',
          },
          base: error.config.baseURL,
          url: error.config.url
        }
      })
    }
    if (error.response.status === 401) { // Error 401 token vencido o no valido
      store.commit('clearTokenSession');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

/**
 * Interceptor REQUEST para enviar token en el header
 */
instance.interceptors.request.use(
  (config) => {
    // Obtén el token del almacenamiento local o del estado de tu aplicación
    const tokenheader = localStorage.getItem('app_tk');

    // Si hay un token, agrégalo al encabezado Authorization
    if (tokenheader) {
      config.headers['Authorization'] = `Bearer ${tokenheader}`;
    }

    return config; // Devuelve la configuración modificada
  },
  (error) => {
    return Promise.reject(error); // Maneja errores en la solicitud
  }
);
export default instance;
