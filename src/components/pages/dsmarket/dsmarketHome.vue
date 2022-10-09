<template>
  <div>
    <!-- <div v-if="isMobileCheck == 'true' || isTabletCheck == 'true'"> -->
    <!-- <homeMainSlider />
      <mobileCategoryBlock />
      <categoryGrid />
      <div class="margin_bottom mb-2"></div> -->
    <!-- </div> -->
    <!-- <div v-else> -->
    <div class="pg-cnt-bx">
      <!--  <dsNav
        v-if="isMobileCheck == 'false' && isTabletCheck == 'false'"
      ></dsNav>-->
      <dsNav  v-if="isMobileCheck == 'false' || isTabletCheck == 'false' && currentRouteName !='dsmarketHomePage'"></dsNav>
      <div class="mrkt-rtr-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import dsNav from "./dsmarketNav";

import dsmarketHomePage from "./dsmarketHomePage";
import categoryGrid from "./categoryGrids";
import { isMobile, isTablet } from "mobile-device-detect";
import homeMainSlider from "../../pages/homePage/homeMainSlider";
import mobileCategoryBlock from "../../../mobileComponents/mobileCategoryBlock";
import productBlock from "../../../mobileComponents/HomeComponents/productBlock";
export default {
  components: {
    dsmarketHomePage,
    dsNav,
    homeMainSlider,
    mobileCategoryBlock,
    productBlock,
    categoryGrid
  },
  data() {
    return {
      isMobileCheck: isMobile ? "true" : "false",
      isTabletCheck: isTablet ? "true" : "false"
    };
  },
  computed:{
    currentRouteName() {
        return this.$route.name;
       
    }
  }
};
</script>
<style scope>
@media screen and (max-width: 1000px) {
  .brand {
    margin-top: 5px;
    margin-bottom: 4px;
    float: left;
    font-size: 13px;
    color: #555;
    text-align: left;
  }

  .title_brand {
    float: left;
    line-height: 18px;
    text-align: justify;
    color: #222;
  }

  .price_price {
    margin-top: 8px;
    float: left;
    font-size: 14px;
    text-align: left;
  }

  .offer_price {
    color: #777;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;
  }
  .color_aed {
    color: #777;
    font-size: 13px;
  }
  .offer_box {
    padding: 5px 6px;
    background-color: #cbfbc6;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin-top: -5px;
    font-size: 13px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    color: #64985c;
  }
  .price_product {
    font-weight: 600;
    font-size: 15px;
  }

  .wrapper_shadow {
    overflow: hidden;
    padding: 15px;
    float: left;
    width: 100%;
    background: #fff;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    text-align: center;
  }
  .card_margin {
    float: left;
    padding: 5px;
  }
  .appWrapper {
    min-height: 138vh;
  }
  .button_addtocart {
    border: solid 1px #ff5722;
    float: left;
    margin: 20px 0px 0px 0px;
    color: #ff5722;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .margin_bottom {
    overflow: hidden;
  }
}
@media screen and (max-width: 768px) {
  .ds-mr-nav-main .md-button {
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-top: 4px;
  }
}

@media screen and (max-width: 600px) {
  .card_margin {
    width: 50%;
  }
  .offer_price {
    float: left;
    clear: left;
    margin-left: 0px;
    margin-top: 3px;
    width: 100%;
    margin-bottom: 3px;
  }
  .container {
    padding-left: 0px;
    padding-right: 0px;
    -webkit-overflow-scrolling: touch;
  }

  .home-category-info-header h2 {
    margin-left: 10px;
  }
  .md-button-content {
    margin-left: 10px;
    margin-right: 10px;
  }
  .home-category-info-hot-words > li {
    margin-right: 0px;
  }
  .NavIcnTp1 {
    margin-left: -10px;
  }

  .md-button-content {
    margin-left: 6px;
    margin-right: 5px;
}
}
@media screen and (max-width: 320px) {
  .md-button-content {
    margin-left: 0px;
  }
  .md-button-content {
    font-size: 11px;
  }
  .md-button-content {

    margin-right: 0;
}
}
</style>
