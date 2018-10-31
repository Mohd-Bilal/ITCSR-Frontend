import Vue from 'vue'
import Vuex from 'vuex'

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

  }
})
