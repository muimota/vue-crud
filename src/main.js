import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStash from 'vue-stash'
import VueResource from 'vue-resource'
import App from './App.vue'

import Projects from './components/Projects'
import ProjectEdit from './components/ProjectEdit'
import References from './components/References'

Vue.use(VueRouter)
Vue.use(VueStash)
Vue.use(VueResource)

Vue.http.options.root = 'https://vue-http-ec65d.firebaseio.com/'

const router = new VueRouter({
  routes:[
    {path: '/' ,  component:Projects, name:'projects'},
    {path: '/project/:id', component:ProjectEdit, name:'projectEdit', props:true},
    {path: '/references', component:References, name:'references'}
  ],
  mode:'history',

})

//load the main json before init Vue

let data = {'projects':null,'references':null}
for(let key in data){
  Vue.http.get(key+'.json')
    .then(response =>{
      return response.json()
    })
    .then(jsonData =>{
      data[key]=jsonData
      if(!Object.values(data).includes(null)){
        debugger
        init(data)
      }
    })
}

function init(data){

  new Vue({
    el: '#app',
    router,
    data(){
      return {
        store:{...data}

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
