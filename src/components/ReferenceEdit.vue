<template>
  <div class="row">
    <div class="col-lg-12">
      <h1>Reference:{{reference.id}}</h1>
      <hr>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Name</span>
        </div>
        <input v-model="reference.name" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Shortname</span>
        </div>
        <input v-model="reference.shortname" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Link</span>
        </div>
        <input v-model="reference.link" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-12">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Description</span>
        </div>
        <textarea v-model="description" class="form-control"  rows="6"></textarea>
      </div>
    </div>
    <div class="col-lg-5">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="typeSelect">Type</label>
        </div>
        <select v-model="reference.type" class="custom-select" id="typeSelect">
          <option value="">Please select one</option>
          <option>Conference</option>
          <option>font</option>
          <option>Biblio</option>
          <option>Study</option>
        </select>
      </div>
    </div>
    <div class="col-lg-12 mt-4">
      <h6>Tags:</h6>
      <input-tag :tags="reference.tags" :on-change="(tags)=>{reference.tags = tags}" ></input-tag>
    </div>

    <div class="col-lg-6 mt-4">
      <router-link :to="{name:'references'}" tag="button" class="btn btn-secondary">Back</router-link>
      <button class="btn btn-primary" @click="save()">Save Changes</button>
    </div>
    <div class="col-lg-3 mt-4"></div>
    <div class="col-lg-3 mt-4">
      <button class="btn btn-danger pull-right"
        @click="deleteReference(reference.id)" :disabled="deleteable == false" >Delete Reference</button>
    </div>
  </div>
</template>
<script>

  import InputTag from 'vue-input-tag'


  export default{
    components: { InputTag },
    props:{id:{default:null,type:String}},
    data: ()=>({
      reference:{
        id:'',
        type:'',
        name:'',
        shortname:'',
        link:'',
        tags:[]
      },
      description:"",
    }),
    computed:{
      deleteable(){

        let deleteable  = true

        for(let projectId in this.$store.projects){

          let project = this.$store.projects[projectId]

          if('references' in project && project.references.includes(this.reference.id)){
            deleteable = false
          }

        }

        return deleteable

      }

    },
    methods:{
      save(){
        let refRes = this.$resource(`references/${this.id}.json`)
        let dataRes = this.$resource(`data/${this.id}.json`)

        this.$store.references[this.id] = this.reference

        refRes.update({},this.reference).then( ()=>{
          let description = (this.description.trim().length == 0 ) ? null : this.description.trim()

          dataRes.update({},{'description':description}).then(
            this.$router.push({name:'references'})
          )
          }
        )
      },

      deleteReference(){

        if(confirm("seguro?") == false){
          return
        }

        delete this.$store.references[this.id]

        let resource = this.$resource(`references/${this.id}.json`)

        resource.delete({id:this.id}).then(
          this.$router.push({name:'references'})
        )

      },
      loadData(){


        let data = this.$store.references[this.id]

        console.log(this.id)
        let reference = this.reference
        reference.id        = data.id
        reference.name      = data.name
        reference.type      = data.type
        reference.shortname = data.shortname
        reference.link      = data.link
        reference.tags      = data.tags

        //load external data
        let resource = this.$resource(`data/${this.id}.json`)
          resource.get({}).then(response => {

            if( response.body ){
              this.description = response.body.description || ""
            }

          })

      }
    },

    mounted(){

      if(this.id == null){
        let lastId
        let referenceIds = Object.keys(this.$store.references)
        referenceIds.sort()

        if(referenceIds .length == 0){
          lastId = 0
        }else{
          lastId = referenceIds[referenceIds.length - 1].split('REF-')[1] | 0
        }
        // TODO: avoid mutating a prop, this shouldbe in parent component
        this.id = this.reference.id = 'REF-'+(""+(lastId + 1)).padStart(4, "0")

      }else{

        this.loadData()

      }

    }

  }
</script>
