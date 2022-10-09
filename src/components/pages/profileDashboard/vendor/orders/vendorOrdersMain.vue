<template>
  <div>
    <tabs :count="count" :active="active"></tabs>
    <div class="col-sm-12 pl-0 pr-0 display_none">
      <div class="col-sm-8 pl-0 pr-0 m-auto">
        <div class="col-sm-3 fl pl-0 padding_mob">
          <div class="box_order">
            <span>3</span>
            <h2>Total Orders</h2>
          </div>
        </div>
        <div class="col-sm-3 fl pl-0 padding_mob">
          <div class="box_order">
            <span>AED 160</span>
            <h2>Orders Value</h2>
          </div>
        </div>
        <div class="col-sm-3 fl pl-0 padding_mob">
          <div class="box_order">
            <span>1</span>
            <h2>Unique Buyers</h2>
          </div>
        </div>
        <div class="col-sm-3 fl pl-0 padding_mob">
          <div class="box_order">
            <span>84</span>
            <h2>Items Ordered</h2>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import tabs from "./tabs"
export default {
  name: "vendorOrdersMain",
  components: {
    tabs
  },
  computed: {
    count () {
      return this.$store.state.Dashboard.vendorOrdersCount
    },
    active () {
      return this.$store.state.Dashboard.activeTab
    }
  }
}
</script>
<style  scoped>
.display_none{display: none;}

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
@media screen and (max-width: 600px) {
.padding_mob{padding-right: 0px !important;}
}

</style>