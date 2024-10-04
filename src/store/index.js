import { createStore } from "vuex";
import { getTasks } from "../services/taskService";

export default createStore({
  state: {
    tasks: [],
    userData: {},
    tkLogin: null, // token del login
  },
  getters: {
    dataTaskTable: (state) => (filter) => {
      if(filter){
        const tmp = [...state.tasks]
        if(filter.value === 'created'){
          return tmp.sort((x,y) => {
            return new Date(y.created_at).getTime() - new Date(x.created_at).getTime()
          })
        }else if(filter.value === 'vencimiento'){
          return tmp.sort((x,y) => {
            return new Date(y.expires).getTime() - new Date(x.expires).getTime()
          })
        }else if(filter.value === 'pendiente'){
          return tmp.filter(x => x.status === 'PENDIENTE');
        }
      }
      return state.tasks;
    },
  },
  mutations: {
    refreshTasks(state, value) {
      state.tasks = value;
    },
    setTokenSession(state, token) {
      localStorage.setItem("app_tk", token); // Guardar token en localStorage
      state.token = token;
    },
    setUserSession(state, userData){
      localStorage.setItem('dataUser', JSON.stringify(userData))
      state.userData = userData;
    },
    loadSessionData(state, data){
      state.token = data.token ?? null;
      state.userData = data.user; 
    },
    clearTokenSession(state) {
      state.userData = {};
      state.tkLogin = null;
      localStorage.removeItem("app_tk"); // Eliminar token del almacenamiento
      localStorage.removeItem("dataUser"); 
    },
  },
  actions: {
    async fetchTasks({ commit, state }, filters) {
      try {
        const response = await getTasks(filters);
        console.log(response);
        if (response.data.success) {
          console.log('Esta dentro')
          commit("refreshTasks", response.data.data);
          console.log(state.tasks)
        }
      } catch (error) {
        console.log("STORE ERROR", error);
      }
    },
    getDataSession({ commit, state }){
      const token = localStorage.getItem('app_tk');
      const user = localStorage.getItem('dataUser');
      const data = {token: token ?? null, user: user ?? {}}
      commit('loadSessionData', data)
    }
  },
  modules: {},
});
