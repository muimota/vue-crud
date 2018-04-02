import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStash from 'vue-stash'
import VueResource from 'vue-resource'
import App from './App.vue'

import Projects from './components/Projects'
import ProjectEdit from './components/ProjectEdit'

import References from './components/References'
import ReferenceEdit from './components/ReferenceEdit'

import Taxonomy from './components/Taxonomy'

import Header from './components/Header.vue'
import Autocomplete from 'v-autocomplete'


Vue.component('app-header',Header)
Vue.use(VueRouter)
Vue.use(VueStash)
Vue.use(VueResource)
Vue.use(Autocomplete)

Vue.http.options.root = 'https://vue-http-ec65d.firebaseio.com/'

const router = new VueRouter({
  routes:[
    {path: '/' ,  component:Projects, name:'projects'},
    {path: '/project/:id', component:ProjectEdit, name:'projectEdit', props:true},
    {path: '/references', component:References, name:'references'},
    {path: '/reference/:id', component:ReferenceEdit, name:'referenceEdit', props:true},
    {path: '/taxonomy', component:Taxonomy, name:'taxonomy'}
  ],
  mode:'history',
  //base:'/ines/editor/'

})

//load the main json before init Vue

let data = {'projects':null,'references':null}

for(let key in data){
  Vue.http.get(key+'.json')
    .then(response =>response.json())
    .then(jsonData =>{
      jsonData = jsonData || {}
      data[key]=jsonData
      //if there are no nulls consider all data is loaded
      if(!Object.values(data).includes(null)){
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
    },
    render: h => h(App)
  })
}
