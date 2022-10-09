<template>
  <div>
    <tabsBuyer :count="count" :active="active"></tabsBuyer>

    <router-view></router-view>
  </div>
</template>

<script>
import tabsBuyer from "./tabsBuyer"
export default {
  name: "vendorOrdersMain",
  components: {
    tabsBuyer
  },
  computed: {
    count () {
      return this.$store.state.Dashboard.buyerOrdersCount
    },
    active () {
      return this.$store.state.Dashboard.buyeractiveTab
    }
  }
}
</script>
<style  scoped>
.box_order {
  background: #fff;
  float: left;
  width: 100%;
  margin-top: 18px;
  margin-bottom: 18px;
  padding: 12px 0px;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-align: center;
}
.box_order span {
  color: #4c98d1;
  font-size: 18px;
  margin-bottom: 5px;
  float: left;
  width: 100%;
}
.box_order h2 {
  color: #535559;
  font-size: 14px;
  width: 100%;
}
</style>