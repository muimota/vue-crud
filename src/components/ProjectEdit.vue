<template>
  <div>
    <h1>Project</h1>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Name</span>
      </div>
      <input v-model="project.title" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <router-link to="/">Project Edit</router-link>
    <button class="btn btn-default" @click="save()">log</button>
  </div>
</template>
<script>
  export default{
    props:{id:{default:null,type:Number}},
    data: ()=>({
      project:{}
    }),

    methods:{
      save(){
        console.log(this.project)
        if(this.id == null){
          this.$store.projects.push(this.project)
        }else{
          let storeObj = this.$store.project(this.id)
          Object.assign(storeObj,this.project)
          this.$router.push({name:'Home'})
        }
      }
    },
    created(){
      if(this.id != null){
        this.project = {...this.$store.project(this.id)}
      }
      if(!this.project){
        this.project = {}
      }
      console.log("...")
    }
  }
</script>
