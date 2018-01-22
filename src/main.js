import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStash from 'vue-stash';
import App from './App.vue'

import Home from './components/Home'
import ProjectEdit from './components/ProjectEdit'

Vue.use(VueRouter)
Vue.use(VueStash)

const router = new VueRouter({
  routes:[
    {path: '/' ,  component:Home, name:'Home'},
    {path: '/project/new/', component:ProjectEdit, name:'projectNew'},
    {path: '/project/:id', component:ProjectEdit, name:'projectEdit', props:true}

  ],
  mode:'history',

})



new Vue({
  el: '#app',
  router,
  data:{
    store:{
      projects: [{id:1,title:'hola cara de bola'},{id:2,title:'proj02'}],
      project(id){
        let project = this.projects.filter((project) => project.id == id)
        console.log(project)
        return project[0]
      }
    }
  },
  render: h => h(App)
})
