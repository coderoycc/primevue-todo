import AppLayout from "@views/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routesApp = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "task-list",
        component: () => import("@views/tasks/List.vue"),
      },
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@views/tasks/Calendar.vue"),
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
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@views/auth/Register.vue"),
    },
  ],
});
export default router;
