<template>
  <div>
    <DsmarketMenu />
    <!--  <div class="topheadBox">


 <div class="spn-tp-121">Manage Store</div>

      <div class="bx-ch-13 topPos">

        <div
          class="show-bx-1 ctSelect mr-4"
          style="margin-bottom: 0px;width:170px"
        >
          <select>
            <option value="">Category By</option>
            <option>All </option>
            <option>Products </option>
            <option>Properties </option>
            <option>Autos </option>
            <option>Services </option>
          </select>
        </div>
        <div class="switchView mr-0">
          <span
            class="swtc-bx-lnk-1"
            :class="{ active: requestForItemStyle }"
            @click="requestForItemStyle = !requestForItemStyle"
          >
            <i class="material-icons">view_list</i>
          </span>
          <span
            class="swtc-bx-lnk-1"
            :class="{ active: requestForItemStyle }"
            @click="requestForItemStyle = !requestForItemStyle"
          >
            <i class="material-icons">view_headline</i>
          </span>
        </div>
      </div>
    </div>-->
    <router-view></router-view>
  </div>
</template>
<script>
import DsmarketMenu from "@/components/pages/profile/dsMarketMenu";
import axios from "axios";
import { mapState } from "vuex";
export default {
  components: { DsmarketMenu },
  data () {
    return {};
  },
  computed: {
    ...mapState({
      tabs: state => state.profile.profilePage
    })
  }
};
</script>
<style scoped>
.mng-lnk-bx-1 .md-button-content {
  display: flex;
  align-items: center;
}
.topheadBox {
  padding: 14px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 6px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.switchView {
  max-height: 30px;
}
</style>
