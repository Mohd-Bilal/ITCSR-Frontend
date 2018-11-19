import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    project_id:-1
  },
  mutations: {
    setProjectID(state,projectId){
      console.log("HEllo"+projectId);
      state.project_id = projectId;
    }
  },
  actions: {

  },
  plugins:[createPersistedState()]
})
