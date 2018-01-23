import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStash from 'vue-stash'
import VueResource from 'vue-resource'
import App from './App.vue'

import Projects from './components/Projects'
import ProjectEdit from './components/ProjectEdit'

Vue.use(VueRouter)
Vue.use(VueStash)
Vue.use(VueResource)

Vue.http.options.root = 'https://vue-http-ec65d.firebaseio.com/'

const router = new VueRouter({
  routes:[
    {path: '/' ,  component:Projects, name:'projects'},
    {path: '/project/:id', component:ProjectEdit, name:'projectEdit', props:true}

  ],
  mode:'history',

})

//load the main json before init Vue
Vue.http.get('projects.json')
  .then(response =>{
    return response.json()
  })
  .then(data =>{
    init(data)
  })


function init(data){

  new Vue({
    el: '#app',
    router,
    data(){
      return {
        store:{
          projects:data
        }
      }
    },
    mounted(){
      console.log('init!!')
      //populate store
      this.$http.get('projects.json')
        .then(response =>{
          return response.json()
        })
        .then(data =>{
          this.store.projects = data
        })

    },
    render: h => h(App)
  })
}
