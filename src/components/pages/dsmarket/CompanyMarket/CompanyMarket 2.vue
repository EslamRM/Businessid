<template>
  <div>
    <div class="pg-cnt-bx">
      <dsNav :page="Company"></dsNav>
      <div class="mrkt-rtr-1">
        <router-view :page="Company"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import dsNav from "../dsmarketNav";

import dsmarketHomePage from "../dsmarketHomePage";
export default {
  components: {
    dsmarketHomePage,
    dsNav
  },
  data() {
    return {};
  },
  computed: {
    Company() {
      return this.$route.params.name;
    }
  },
  created() {}
};
</script>
<style scope></style>
