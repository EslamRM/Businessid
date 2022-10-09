<template>
  <div class="page-padd-cmn">
    <div class="container">
      <div class="profile-dashbord-box">
        <div class="prof-dash-bord-bx content">
          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import listingGrid1 from "./vendor/listingGrid1";
import listingGrid2 from "./vendor/listingGrid2";
export default {
  components: {
    listingGrid1,
    listingGrid2
  }
};
</script>
<style scoped>
.profile-dashbord-box {
  display: block;
}
.prof-dash-bord-bx.content {
  text-align: center;
}
</style>
