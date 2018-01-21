<template>
  <div id="app">
    <h1>hola</h1>
    <router-view></router-view>
  </div>
</template>

<script>

import ProjectList from './components/ProjectList'

export default {
  data () {
    return {
      projects: ['hola cara de bola','proj02']
    }
  }
}
</script>

<style>
</style>
