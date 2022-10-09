<template>
  <div>
    <div class="detail-subscribe">
      <ul class="detail-breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised md-accent">Home</md-button>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised">Ds Market</md-button>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised">Supplies</md-button>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised">Gift cards</md-button>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised">Festive & Party Supplies</md-button>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised">Event & Party Supplies</md-button>
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/">
            <md-button class="md-raised">Gift cards</md-button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.detail-subscribe {
  margin: 15px auto;
  position: relative;
  z-index: 1;
}
.detail-breadcrumb {
  display: inline-block;
  list-style: none;
}
.breadcrumb-item {
  display: inline-block;
  margin-right: 5px;
}
.md-button {
  height: 27px;
  padding: 5px 8px;
  margin: 0px;
  font-size: 13px;
}
</style>
