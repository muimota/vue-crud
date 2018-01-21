<template>
  <div class="row">
    {{project.title}}
    <button class="btn btn-dafault" @click="randomTitle">
  </div>
</template>
<script>
  export default{
    props=['project']
  }
</script>
