import { createStore } from "vuex";
import { getTasks } from "../services/taskService";

export default createStore({
  state: {
    tasks: [],
    userData: {},
    tkLogin: null, // token del login
  },
  getters: {
    dataTaskFilter: (state) => (filter) => {
      console.log(filter)
      if(filter){
        const tmp = [...state.tasks]
        if(filter === 'vencimiento'){
          return tmp.sort((x,y) => {
            return new Date(y.expires).getTime() - new Date(x.expires).getTime()
          })
        }else if(filter === 'pendiente'){
          return tmp.filter(x => x.status === 'PENDIENTE');
        }else if(filter === 'hecho'){
          return tmp.filter(x => x.status == 'HECHO');
        }else if(filter === 'today'){
          const today = new Date().toLocaleDateString().split('/');
          const todayFormat = `${today[2]}-${today[1].padStart(2,'0')}-${today[0].padStart(2,'0')}`;
          return tmp.filter(x => x.expires === todayFormat);
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
      state.tkLogin = token;
    },
    setUserSession(state, userData){
      localStorage.setItem('dataUser', JSON.stringify(userData))
      state.userData = userData;
    },
    loadSessionData(state, data){
      state.tkLogin = data.token ?? null;
      state.userData = JSON.parse(data.user);
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
        if (response.data.success) {
          commit("refreshTasks", response.data.data);
        }
      } catch (error) {
        console.log("STORE ERROR", error);
      }
    },
    getDataSession({ commit, state }){
      const token = localStorage.getItem('app_tk');
      const user = localStorage.getItem('dataUser');
      const data = {token: token ?? null, user: user ?? '{}'}
      commit('loadSessionData', data)
    }
  },
  modules: {},
});
