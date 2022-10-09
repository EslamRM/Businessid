<template>
  <div>
    <div class="pg-cnt-bx">
      <div class="BgTp1" v-if="LoadBanners">
        <!-- <div v-if="LoadBanners"> -->
        <homeMainSlider :banners="LoadBanners"></homeMainSlider>
        <!-- </div>  -->
        <!-- <div class="loader">
          <div class="circle-loader"></div>
        </div> -->
        <!-- <featureLogo></featureLogo> -->
        <updateBoxTyp4 :banners="LoadBanners[1].ads" />

        <promotedCompanies></promotedCompanies>
        <div v-if="isMobileCheck == 'true' || isTabletCheck == 'true'">
          <CompaniesBlock />
        </div>
        <updateBoxTyp4 :banners="LoadBanners[2].ads" />
        <updateBoxTyp2 />

        <updateBoxTyp4 :banners="LoadBanners[3].ads" />
        <updateBoxTyp4 :banners="LoadBanners[4].ads" />
        <updateBoxTyp2 />
        <homeFooterSlider :banners="LoadBanners" />
        <div v-if="isMobileCheck == 'true' || isTabletCheck == 'true'">
          <!-- <MobileCategories /> -->

          <!-- <mobileCtshots/> -->
        </div>
        <div v-else>
          <!-- <featuredSlider></featuredSlider> -->

          <!-- <updateBoxTyp1/> -->
          <!-- <updateBoxTyp3/> -->

          <!-- <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>
              <div class="bx-tp-home-cnt-3">
                <updateBoxTyp1></updateBoxTyp1>
              </div>
              <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>
              <div class="bx-tp-home-cnt-3">
                <updateBoxTyp2></updateBoxTyp2>
              </div>
              <div class="bx-tp-home-cnt-3">
                <grdGrid3></grdGrid3>
              </div>
              <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>

              <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>
              <div class="bx-tp-home-cnt-3">
                <grdGrid3></grdGrid3>
              </div>

              <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>
              <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>
              <div class="bx-tp-home-cnt-3">
                <grdGrid3></grdGrid3>
              </div>
              <div class="bx-tp-home-cnt-3">
                <recommendedBox></recommendedBox>
              </div>
              <div class="bx-tp-home-cnt-3">
                <updateBoxTyp3></updateBoxTyp3>
              </div>
              <div class="bx-tp-home-cnt-2">
                <secondSlider></secondSlider>
                <gridTwoRow></gridTwoRow>
              </div> -->
        </div>
      </div>
      <div class="md-layout-item" v-else>
        <center class="spinner-holder">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </center>
      </div>
    </div>
  </div>
</template>
<script>
import { isMobile, isTablet } from "mobile-device-detect";
import MobileCategories from "../../../mobileComponents/mobileCategoryBlock";
import CompaniesBlock from "../../../mobileComponents/HomeComponents/companyBlock";
import mobileCtshots from "../../../mobileComponents/HomeComponents/PhotosVideos";
import homeMainSlider from "./homeMainSlider";
import updateBoxTyp1 from "./updateBoxTyp1";
import updateBoxTyp2 from "./updateBoxTyp2";
import updateBoxTyp3 from "./updateBoxTyp3";
import updateBoxTyp4 from "./updateBoxTyp4";
import promotedCompanies from "./promotedCompanies";
import homeFooterSlider from "./homeFooterSlider";

export default {
  components: {
    homeMainSlider,
    updateBoxTyp1,
    promotedCompanies,
    MobileCategories,
    CompaniesBlock,
    mobileCtshots,
    updateBoxTyp2,
    updateBoxTyp3,
    updateBoxTyp4,
    homeFooterSlider
  },
  data() {
    return {
      isMobileCheck: isMobile ? "true" : "false",
      isTabletCheck: isTablet ? "true" : "false"
    };
  },
  computed: {
    LoadBanners() {
      return this.$store.getters.GET_BANNER_SLIDER;
    }
  },
  created() {
    const data = {
      type: "home"
    };
    this.$store.dispatch("homePageBanner", data);
  }
};
</script>
<style scope>
.spinner-holder {
  height: 100vh;
}
.spinner {
  width: 80px;
  height: 80px;
  position: fixed;
  top: 0px;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ff5722;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
.bx-tp-home-cnt-2 {
  background: #fff;
  margin-top: 30px;
  background: #fff;
  border: 1px solid #dcdee3;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding-bottom: 10px;
}
.bx-tp-home-cnt-3 {
  background: #fff;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #eeeeee;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
}
.pushSpace {
  margin-top: 2em;
}
</style>
