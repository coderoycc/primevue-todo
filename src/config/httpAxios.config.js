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
 * Interceptor RESPONSE para cerrar session cuando el token haya vencido.
 */
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
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
