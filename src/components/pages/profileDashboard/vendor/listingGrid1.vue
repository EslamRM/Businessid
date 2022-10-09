<template>
  <div>
    <div class="tp-1-txt align_heading">What are You Listing?</div>
    <div class="tp-2-txt align_text">
      Select which category your ad fits into
    </div>
    <div class="grd-tp-bx-1">
      <div
        v-for="(link, id) in dashboard_market_type"
        :key="id"
        class="lnk-tp-lst-1"
      >
        <router-link v-if="link.access === '1'" :to="link.path">
          <div class="lnk-tp-lst-1-bx">
            <i class="material-icons lnk-tp-lst-1-icn"> {{ link.icon }} </i>
            <div class="lnk-txt-1">{{ link.label }}</div>
          </div>
        </router-link>
      </div>
      <!-- <router-link
        v-if="checkAccess('adding_demand')"
        :to="{
          path: '/dashboard/vendor/add',
          query: {
            market_type: 'demand',
          },
        }"
        class="lnk-tp-lst-1"
      >
        <div class="lnk-tp-lst-1-bx">
          <i class="material-icons lnk-tp-lst-1-icn">pan_tool</i>
          <div class="lnk-txt-1">Demands</div>
        </div>
      </router-link> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "addNewInStore",
  computed: {
    ...mapState({
      dashboard_market_type: state => state.profile.dashboard_market_type,
    })
  },
};
</script>
<style scoped>
.grd-tp-bx-1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.lnk-tp-lst-1 {
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 143px;
  height: 143px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  margin-left: 15px;
  margin-bottom: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: 0.3s;
}
.lnk-tp-lst-1:nth-child(3n + 4),
.lnk-tp-lst-1:first-child {
  margin-left: 0;
}
.lnk-tp-lst-1-bx {
  margin: 0 auto;
}
.lnk-tp-lst-1:hover {
  box-shadow: 0 4px 12px 0 rgba(255, 87, 34, 0.6);
}
.lnk-tp-lst-1-icn {
  font-size: 45px;
  color: #213a63 !important;
  color: #ff5722 !important;
}
.lnk-txt-1 {
  color: #ff5722 !important;
  color: #191919 !important;
  font-size: 16px;
  font-weight: 500;
  margin-top: 6px;
}
.align_heading {
  text-align: center;
}
.align_text {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .align_heading {
    text-align: center;
    font-size: 20px;
  }
  .align_text {
    text-align: center;
    font-size: 14px;
  }

  .tp-2-txt {
    margin-bottom: 2em;
  }

  .lnk-tp-lst-1-icn {
    font-size: 40px;
  }

  .lnk-txt-1 {
    font-size: 12px;
  }
}

@media screen and (max-width: 600px) {
  .align_heading {
    text-align: center;
    font-size: 14px;
  }
  .align_text {
    text-align: center;
    font-size: 12px;
  }
  .lnk-tp-lst-1-icn {
    font-size: 34px;
  }
  .lnk-tp-lst-1 {
    width: 115px;
    height: 115px;
  }

  .lnk-txt-1 {
    font-size: 12px;
  }
  .arrange_mob {
    margin-left: 0px;
    margin-right: 15px;
  }
  .arrange_foodbox {
    margin-left: 0px;
  }
  .tp-2-txt {
    margin-bottom: 2em;
  }
}

@media screen and (max-width: 300px) {
  .lnk-tp-lst-1 {
    width: 80px;
    height: 80px;
    margin: 0px 4px 4px 0px;

    border-radius: 3px;
  }

  .lnk-txt-1 {
    font-size: 11px;
    line-height: 12px;
  }

  .tp-2-txt {
    margin-bottom: 1.5em;
    font-size: 10px;
    line-height: 16px;
  }

  .tp-1-txt {
    margin-bottom: 6px;
  }

  .lnk-tp-lst-1-icn {
    font-size: 26px;
  }
}
</style>
