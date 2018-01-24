<template>
  <div>
  <hr>
    <app-header></app-header>
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
          <th scope="col">Tag</th>
          <th scope="col">Projects</th>
          <th scope="col">References</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in filteredTags">
          <th>{{tag.name}}</th>
          <td>{{tag.projects}}</td>
          <td>{{tag.references}}</td>

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
      tags:[]
    }
  },

  computed:{
    filteredTags(){
      let filteredTags = Object.values(this.tags)
      //https://stackoverflow.com/a/3939752/2205297
      let r = new RegExp(this.filter,'i')
      if(this.filter.trim() != '' ){
        filteredTags = filteredTags.filter(
          tag => tag.name.match(r))
      }
      return filteredTags
    }
  },
  methods:{
    countTags(){
      let tagsCounter = {}

      let projects = this.$store.projects
      for(let key in projects){
        if( 'tags' in projects[key]){
          let projectTags = projects[key].tags
          for(let tag of projectTags){
            if( tag in tagsCounter){
              tagsCounter[tag].projects ++
            }else{
              tagsCounter[tag] = { 'projects':1, 'references':0}
            }
          }
        }
      }
      //ire al infierno
      let references = this.$store.references
      for(let key in references){
        if( 'tags' in references[key]){
          let referenceTags = references[key].tags
          for(let tag of referenceTags){
            if( tag in tagsCounter){
              tagsCounter[tag].references ++
            }else{
              tagsCounter[tag] = { 'projects':0, 'references':1}
            }
          }
        }
      }

      for(let tagname in tagsCounter){
        let tagData = tagsCounter[tagname]
        tagData.name = tagname
        this.tags.push(tagData)
      }

    },
    selectHandler(project){
      console.log(project.id)
      const projectId = project.id
      this.$router.push({ name: 'projectEdit', params: { id:  projectId }}) // -> /user/123
    },

  },
  created(){
    this.countTags()
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
