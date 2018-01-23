<template>
  <div>
  <h1>Projects</h1>
  <hr>
  <div class="col-lg-4">
    <div class="input-group mb-3 ">
      <div class="input-group-prepend">
        <span class="input-group-text">Filter</span>
      </div>
      <input  type="text" v-model="filter" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
  </div>
  <div class="col-lg-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Year</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in filteredProjects" @click="selectHandler(project)">
          <th scope="row">{{project.id}}</th>
          <td>{{project.shortname}}</td>
          <td>{{project.type}}</td>
          <td>{{project.startYear}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      filter:"",
      projects:[]
    }
  },
  computed:{
    filteredProjects(){
      let filteredProjects = Object.values(this.projects)
      //https://stackoverflow.com/a/3939752/2205297
      let r = new RegExp(this.filter,'i')
      if(this.filter.trim() != '' ){
        filteredProjects = filteredProjects.filter(
          project => project.shortname.match(r))
      }
      return filteredProjects
    }
  },
  methods:{
    selectHandler(project){
      console.log(project.id)
      const projectId = project.id
      this.$router.push({ name: 'projectEdit', params: { id:  projectId }}) // -> /user/123
    },

  },
  created(){
    debugger
    this.projects = this.$store.projects
  }
}

</script>
<style scoped>
  tr{
    cursor: pointer;
  }
  tr:hover{
    background-color: #EEE;
  }
</style>
