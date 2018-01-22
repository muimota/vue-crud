<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="project in projects" @click="clickHandler(project)"> {{ project[field] }}</li>
  </ul>
</template>

<script>
  export default {
    props:['projects','field'],
    methods:{
      clickHandler(project){
        this.$emit('selected', project)
      }
    }

  }
</script>

<style scoped>
  .list-group-item:hover{
    background-color: #eee;
  }
</style>
