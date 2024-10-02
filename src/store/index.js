import { createStore } from "vuex";
import { test } from "../services/taskService";

export default createStore({
  state: {
    tasks: [],
    test: [],
    tkLogin: null, // token del login
  },
  getters: {
    sortByDateExpires(state) {},
  },
  mutations: {
    refreshTasks(state, value) {
      state.tasks = value;
    },
    refreshTest(state, value) {
      state.test = value;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("app_tk", token); // Guardar token en localStorage
    },
    clearToken(state) {
      state.tkLogin = null;
      localStorage.removeItem("app_tk"); // Eliminar token del almacenamiento
    },
  },
  actions: {
    async fetchTasks({ commit }, filters) {
      try {
        const response = await test(filters);
        console.log(response);
        if (response.data.success) {
          commit("refreshTest", response.data.data.services);
        }
      } catch (error) {
        console.log("STORE ERROR", error);
      }
    },
  },
  modules: {},
});
