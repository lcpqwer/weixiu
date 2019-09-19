import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // jwt:sessionStorage.setItem('jwt')
    //
  },
  mutations: {
    getJson(){
      Vue.http.get('../data.json',{
      },{
        headers:{},
        emulateJSON:true
      }).then(response=>{
        this.state.newslist=response.data;
      },response=>{

      })
    }
    //
  },
  actions: {
    newJson(obj){
      obj.commit('getJson');
    }
    //
  },
  modules: {
    user,
    app
  }
})
