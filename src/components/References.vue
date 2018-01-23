<template>
  <div>
  <h1>References</h1>
  <hr>
  <div class="row">
    <div class="col-lg-4">
      <div class="input-group mb-3 ">
        <div class="input-group-prepend">
          <span class="input-group-text">Filter</span>
        </div>
        <input  type="text" v-model="filter" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
    </div>
    <div class="col-lg-4">
      <router-link :to="{name:'referenceEdit'}" tag="button" class="btn btn-primary">
        New Reference
      </router-link>

    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reference in filteredReferences" @click="selectHandler(reference)">
            <th scope="row">{{reference.id}}</th>
            <td>{{reference.shortname}}</td>
            <td>{{reference.type}}</td>
            <td>{{reference.startYear}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      filter:"",
      references:[]
    }
  },
  computed:{
    filteredReferences(){
      let filteredReferences = Object.values(this.references)
      //https://stackoverflow.com/a/3939752/2205297
      let r = new RegExp(this.filter,'i')
      if(this.filter.trim() != '' ){
        filteredReferences = filteredReferences.filter(
          reference => reference.shortname.match(r))
      }
      return filteredReferences
    }
  },
  methods:{
    selectHandler(reference){
      console.log(reference.id)
      this.$router.push({ name: 'referenceEdit', params: { id:  reference.id }}) // -> /user/123
    },

  },
  created(){
    this.references = Object.values(this.$store.references)
  }
}

</script>
<style scoped>
  tr{
    cursor: pointer;
  }
  tbody>tr:hover{
    background-color: #EEE;
  }
</style>
