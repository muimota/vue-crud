<template>
  <div>
  <h1>Home</h1>
  <project-list :projects="projects" field="title" @selected="selectHandler"></project-list>
  </div>
</template>

<script>
import ProjectList from './ProjectList'

export default {
  store:['projects'],
  components:{
    'project-list':ProjectList
  },
  methods:{
    selectHandler(project){
      console.log(project.id)
      const projectId = project.id
      this.$router.push({ name: 'projectEdit', params: { id:  projectId }}) // -> /user/123

    }
  }
}

</script>
