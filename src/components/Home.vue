<template>
  <div>
  <h1>Home</h1>
  <project-list :projects="bus" field="id"></project-list>
  </div>
</template>

<script>
import {EventBus} from './../EventBus.js'
import ProjectList from './ProjectList'

export default{
  data(){
    return {
      bus:EventBus.projects
    }
  },
  'components':{
    'project-list':ProjectList
  }
}

</script>
