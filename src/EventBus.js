import Vue from 'vue'

export const EventBus = new Vue(
  {
    data(){
      return {
        projects:[
          {id:12,title:'project1'},
          {id:13,title:'project2'}
        ]
      }
    },
    methods:{
      findProject(id){
        this.projects.filter(x=>x.id == id)
      }
    }
  }
)
