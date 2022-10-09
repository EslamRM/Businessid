<template>
  <div>
    <div class="wrp-tp-23">
      <div class="col-sm-12 p-0">
        <div class="div-2-auto detail-col col-sm-12 col-md-12 col-xl-9 pl-0 fl">
          <div class="product-info col-sm-12 pr-0 fl">
            <div class="col-sm-12 col-xl-6 pl-0 fl mob_pr_0 tab_pr_0">
              <div class="detail-pg-sldr mob_slider_btn">
                <WidgetSlider :product="product"></WidgetSlider>
              </div>
            </div>
            <div class="col-sm-12 col-xl-6 pr-0 fl mob_pl_0">
              <widgetContentCard :product="product"></widgetContentCard>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-12 col-xl-3 pr-0 fl mob_pl_0">
          <widgetSupplierCard :product="product"></widgetSupplierCard>
        </div>
      </div>
    </div>
    <div class="prdct-desc-bx-ch">
      <detailDescriptionBox :product="product"></detailDescriptionBox>
    </div>
    <div class="rc-prdct-bx-1 fl col-sm-12 p-0">
      <recommendedProducts
        :similarProduct="similarProduct"
      ></recommendedProducts>
    </div>
  </div>
</template>
<script>
import widgetSupplierCard from "./widgetSuplierCard";
import widgetContentCard from "./widgetContentCard";
import WidgetSlider from "./productImage";
import detailDescriptionBox from "./detailDescriptionBox";
import recommendedProducts from "./recommendedProducts";

export default {
  props: ["product", "similarProduct"],
  components: {
    widgetSupplierCard,
    widgetContentCard,
    WidgetSlider,
    detailDescriptionBox,
    recommendedProducts
  },
  created() {
    document.title = this.product.name + " " + "UAECT";
  }
};
</script>
<style scoped>
.product-info {
  /* border-right:1px solid rgb(226, 229, 241); */
  padding-right: 10px;
  padding: 15px;
  border-radius: 6px;
}
.div-1-255-cnt {
  flex: 0 0 255px;
  margin-left: 10px;
}
.div-1-480 {
  width: 480px;
}
.detail-col {
  position: relative;
  background-color: #fff;
  flex-flow: column;
}
.detail-pg-sldr {
  padding: 10px;
}
.wrp-tp-23 {
  padding-top: 1.1em;
}
.div-1-230-cnt {
  flex-flow: column;
  background: #fff;
  border-left: none;
}
.brd-rgt-1 {
  border-right: 1px solid #dae2ee;
}
.flex-bx-tp-1 {
  height: 100%;
  flex-flow: row;
}
.rc-prdct-bx-1 {
  position: relative;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  background-color: #fff;
  margin-top: 10px;

  padding-bottom: 18px !important;
}

@media screen and (max-width: 768px) {
  .detail-pg-sldr {
    padding: 0px;
  }
  .tab_pr_0 {
    padding-right: 0px;
  }
}

@media screen and (max-width: 768px) {
  .mob_pr_0 {
    padding-right: 0px;
  }
  .mob_pl_0 {
    padding-left: 0px;
  }
  .rc-prdct-bx-1 {
    margin-top: 10px;
    border-radius: 5px;
    padding-bottom: 3px !important;
  }

  .wrp-tp-23 {
    padding-top: 10px;
  }
  .detail-col {
    border-radius: 5px;
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  }
  .product-info {
    padding: 10px;
    padding-right: 10px !important;
  }

  .detail-col {
    padding-right: 0px;
  }
}
</style>
