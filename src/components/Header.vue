<template>

  <ul class="nav nav-tabs justify-content-center">
    <li class="nav-item">
      <router-link to="/" tag="a" class="nav-link" active-class="active" exact>
        Projects
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/references" tag="a" class="nav-link" active-class="active" exact>
        References
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/taxonomy" tag="a" class="nav-link" active-class="active" exact>
        Taxonomy
      </router-link>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link">
        Professionals
      </a>
    </li>
    <li>
      <button class="btn btn-info" @click="download" >Download File</button>
    </li>
  </ul>
</template>

<script>

export default {
  methods:{
    download(){
      //https://stackoverflow.com/a/30800715/2205297
      let exportObj = this.$store
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", 'export.json');
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

    }
  }
}

</script>

<style scoped>
  .nav-link{
    color:#AAA;
  }
  .nav-link.active{
    color:black;
  }
</style>
