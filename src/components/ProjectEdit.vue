<template>
  <div class="row">
    <div class="col-lg-12">
      <h1>Project:{{project.id}}</h1>
      <hr>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Name</span>
        </div>
        <input v-model="project.name" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Shortname</span>
        </div>
        <input v-model="project.shortname" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-12">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Memory</span>
        </div>
        <textarea v-model="project.memory" class="form-control"  rows="6"></textarea>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="input-group mb-3 ">
        <div class="input-group-prepend">
          <span class="input-group-text">Start Year</span>
        </div>
        <input v-model="project.startYear" type="number"  class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-4">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">End Year</span>
        </div>
        <input v-model="project.endYear" type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-4">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Type</span>
        </div>
        <select v-model="project.type">
          <option disabled value="">Please select one</option>
          <option>RCR</option>
          <option>Lab-A</option>
          <option>Lab-E</option>
          <option>Lab-F</option>

        </select>
      </div>
    </div>
    <div class="col-lg-12">
      <hr>
      <h6>Team:</h6>
      <input-tag :tags="project.team" :on-change="(tags)=>{project.team = tags}"></input-tag>
    </div>
    <div class="col-lg-12 mt-4">
      <h6>Tags:</h6>
      <input-tag :tags="project.tags" :on-change="(tags)=>{project.tags = tags}" ></input-tag>
    </div>
    <div class="col-lg-12 mt-4">
      <h6>References:</h6>
      <input-tag :tags="project.references" :on-change="(tags)=>{project.references = tags}" ></input-tag>
    </div>

    <div class="col-lg-12 mt-4">

      <router-link to="/" tag="button" class="btn btn-secondary">Back</router-link>
      <button class="btn btn-primary" @click="save()">Save Changes</button>
    </div>
  </div>
</template>
<script>

  import InputTag from 'vue-input-tag'

  export default{
    components: { InputTag },
    props:{id:{default:null,type:String}},
    data: ()=>({
      project:{
        id:'',
        type:'',
        name:'',
        shortname:'',
        startYear:0,
        endYear:0,
        team:[],
        tags:[]
      },
      resource:{}
    }),

    methods:{
      save(){
        let resource = this.$resource(`projects/${this.id}.json`)

        this.$store.projects[this.id] = this.project

        resource.update({},this.project).then(
          this.$router.push('/')
        )


      },
      loadData(){


        let data = this.$store.projects[this.id]

        console.log(this.id)
        let project = this.project
        project.id        = data.id
        project.name      = data.name
        project.type      = data.type
        project.shortname = data.shortname
        project.startYear = data.startYear | 0
        project.endYear   = data.endYear | 0
        project.team      = data.team
        project.memory    = data.memory
        project.tags      = data.tags
        project.references = data.references
      }
    },
    
    mounted(){

      if(this.$store.projects != {}){
        this.loadData()
      }
    }
  }
</script>
