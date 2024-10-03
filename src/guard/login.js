/**
 * Guard para proteger rutas que requiren login
 * @param to Route To
 * @param from Route from
 * @param {*} next
 */
export function guardNavigation(to, from, next) {
  const tokenAuth = localStorage.getItem('app_tk'); // obtenemos token
  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !tokenAuth) {
    next("/login"); // Redirige al login
  }
  // Si el usuario está autenticado y está intentando acceder a una ruta como login o register
  else if (!to.meta.requiresAuth && tokenAuth) {
    next("/"); // Redirige al home o cualquier otra ruta autenticada
  } else {
    next(); // Continúa a la ruta solicitada
  }
}
