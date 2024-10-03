import AppLayout from "@views/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";
import { guardNavigation } from "../guard/login";
const routesApp = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "task-list",
        component: () => import("@views/tasks/List.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@views/tasks/Calendar.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routesApp,
    {
      path: "/login",
      name: "login",
      component: () => import("@views/auth/Login.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@views/auth/Register.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/:pathMatch(.*)*", // Ruta para 404
      component: () => import("@views/NotFound.vue"),
    },
  ],
});

router.beforeEach(guardNavigation);
export default router;
