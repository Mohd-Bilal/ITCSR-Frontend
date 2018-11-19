import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    project_id:-1,
    request_id:-1
  },
  mutations: {
    setProjectID(state,projectId){
      console.log("HEllo"+projectId);
      state.project_id = projectId;
    },
    setRequestID(state,requestID){
      console.log("HEllo"+requestID);
      state.request_id = requestID;
    }
  },
  actions: {

  }
})
