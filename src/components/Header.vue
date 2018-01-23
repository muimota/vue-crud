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
      <router-link to="/team" tag="a" class="nav-link" active-class="active" exact>
        Professionals
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {

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
