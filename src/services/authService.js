import http from "../config/httpAxios.config";
/**
 * Envio de nuevo usuario
 * @param {Object} credentials
 * @returns {Promise}
 */
export async function register(credentials) {
  return http.post("/auth/register", credentials);
}
/**
 * Login a la aplicacion <<JWT>>
 * @param {Object} credentials
 * @returns {Promise}
 */
export async function login(credentials) {
  return http.post("/auth/login", credentials);
}
