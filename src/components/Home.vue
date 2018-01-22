<template>
  <div>
  <h1>Home</h1>
  <project-list :projects="projects" field="shortname" @selected="selectHandler"></project-list>
  </div>
</template>

<script>
import ProjectList from './ProjectList'

export default {
  data(){
    return {
      projects:[]
    }
  },
  components:{
    'project-list':ProjectList
  },
  methods:{
    selectHandler(project){
      console.log(project.id)
      const projectId = project.id
      this.$router.push({ name: 'projectEdit', params: { id:  projectId }}) // -> /user/123
    },
    getData(){
      this.$http.get('projects.json')
        .then(response =>{
          return response.json()
        })
        .then(data =>{
          this.projects = Object.values(data)
        })
    }
  },
  created(){
    //this.resource = this.$resource('projects.json')
    this.getData()
  }
}

</script>
