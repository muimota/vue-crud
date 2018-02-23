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
    </div>
    <div class="col-lg-12">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Shortname</span>
        </div>
        <input v-model="project.shortname" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-8">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Typology</span>
        </div>
        <input v-model="project.typology" type="text" id="inputGroup-sizing-default" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-4">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="typeSelect">Type</label>
        </div>
        <select v-model="project.type" class="custom-select" id="typeSelect">
          <option value="">Please select one</option>
          <option>RCR</option>
          <option>LabA-Architecture</option>
          <option>LabA-Scenography</option>
          <option>LabA-Audiovisual</option>
        </select>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Memory</span>
        </div>
        <textarea v-model="memory" class="form-control"  rows="6"></textarea>
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
      <div class="input-group mb-3 ">
        <div class="input-group-prepend">
          <span class="input-group-text">m<sup>2</sup></span>
        </div>
        <input v-model.number="project.surface" type="number" step="0.01" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>

    <hr>
    <div class="col-lg-9 mt-4">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Reference</span>
        </div>
        <v-autocomplete class="form-control" :items="items" v-model="item"  :min-len="1" :get-label="getLabel" :wait="0" :auto-select-one-item="false" :component-item="template" @update-items="updateItems">
        </v-autocomplete>
      </div>
    </div>
    <div class="col-lg-3 mt-4">
      <button class="btn btn-secondary" @click="addReference">Add Reference</button>
    </div>
    <div class="col-lg-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col-sm-10" >Reference</th>
            <th scope="col" class="col-sm-2" >Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="referenceItem in referenceItems" >
            <td>{{referenceItem.shortname}}</td>
            <td><span class="badge-button badge badge-secondary badge-danger" @click="deleteReference(referenceItem.id)">Delete</span></h6></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-lg-12">
      <hr>
      <h6>Team:</h6>
      <input-tag :tags="project.team" :on-change="(tags)=>{project.team = tags}"></input-tag>
    </div>

    <div class="col-lg-12 mt-4">
      <h6>Space:</h6>
      <input-tag :tags="project.space" :on-change="(tags)=>{project.space = tags}" ></input-tag>
      <h6>Atmosphere:</h6>
      <input-tag :tags="project.atmosphere" :on-change="(tags)=>{project.atmosphere = tags}" ></input-tag>
      <h6>Materiality:</h6>
      <input-tag :tags="project.materiality" :on-change="(tags)=>{project.materiality = tags}" ></input-tag>
    </div>

    <div class="col-lg-12 mt-4">

      <router-link :to="{name:'projects'}" tag="button" class="btn btn-secondary">Back</router-link>
      <button class="btn btn-primary" @click="save()">Save Changes</button>
    </div>
  </div>
</template>
<script>

  import InputTag from 'vue-input-tag'
  import ItemTemplate from './ItemTemplate.vue'

  export default{
    components: { InputTag },
    props:{id:{default:null,type:String}},
    data: ()=>({
      project:{
        id:'',
        name:'',
        shortname:'',
        typology:'',
        type:'',
        startYear:0,
        endYear:0,
        surface:0,
        team:[],
        space:[],
        atmosphere:[],
        materiality:[],
        references:[]
      },
      memory:"",
      //autocomplete-variables
      items:[],
      item:null,
      template: ItemTemplate
    }),
    computed:{

      referenceItems(){
        let referenceItems = []
        for(let referenceId of this.project.references){
          let referenceItem = this.$store.references[referenceId]
          referenceItems.push(referenceItem)
        }
        return referenceItems
      }
    },
    methods:{
      save(){
        let projRes = this.$resource(`projects/${this.id}.json`)
        let dataRes = this.$resource(`data/${this.id}.json`)

        this.$store.projects[this.id] = this.project

        projRes.update({},this.project).then( ()=>{
          let memory = (this.memory.trim().length == 0 ) ? null : this.memory.trim()

          dataRes.update({},{'memory':memory}).then(
            this.$router.push({name:'projects'})
          )
          }
        )
      },
      loadData(){


        let data = this.$store.projects[this.id]

        let project         = this.project
        project.id          = data.id
        project.name        = data.name
        project.type        = data.type
        project.shortname   = data.shortname
        project.typology    = data.typology
        project.surface     = data.surface
        project.startYear   = data.startYear | 0
        project.endYear     = data.endYear | 0
        project.team        = data.team
        project.space       = data.space       || []
        project.atmosphere  = data.atmosphere  || []
        project.materiality = data.materiality || []
        project.references  = data.references  || []

        //load external data
        let resource = this.$resource(`data/${this.id}.json`)
          resource.get({}).then(response => {

            if( response.body ){
              this.memory = response.body.memory || ""
            }

          })


      },
      getLabel (item) {
       if (item) {
         return item.shortname
       }
       return ''
     },
     updateItems (text) {
       if(text == null){return}
       let filteredItems = Object.values(this.$store.references)
       //https://stackoverflow.com/a/3939752/2205297
       let r = new RegExp(text,'i')
       if(text.trim() != '' ){
         filteredItems = filteredItems.filter(
           reference => reference.shortname.match(r))
       }
       this.items =  filteredItems

     },
     addReference(){
       console.log(this.item)

       if(this.item){
         let referenceId = this.item.id
         if(!this.project.references.includes(referenceId)){
           this.project.references.push(referenceId)
         }
       }
     },
     deleteReference(itemId){
       console.log(itemId)
       let index = this.project.references.indexOf(itemId)
       this.project.references.splice(index,1)
     }
   },
    mounted(){

      if(this.$store.projects != {}){
        this.loadData()
      }
    }
  }
</script>

<style>
.v-autocomplete-list{
  position: absolute;
  z-index: 1;
  display: inline-block;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.v-autocomplete-item{
  display:block;
}
.v-autocomplete-item-active{
  background-color: #EEE;
}
.v-autocomplete-input{
  width: 100%;
  border: none;
}
.badge-button{
  cursor: pointer;
}
</style>
