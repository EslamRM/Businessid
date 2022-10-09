<template>
  <div>
    <div class="ftrd-sldr-1 ftrd-sldr-bx-1">
      <div class="category-heading">
        <h2>
          <span>Most Viewed D&S Products</span>
        </h2>
        <router-link class="view-all-btn" to="/">View All</router-link>
      </div>

      <carousel
        :perPage="5"
        :autoplay="false"
        :autoplayHoverPause="true"
        :paginationSize="0"
        paginationActiveColor="#bf1d2e"
        paginationColor="#213a63"
        easing="linear"
        :loop="true"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
        navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
      >
        <slide v-for="(newProduct,index) in newProducts" :key="index">
          <div class="sldr-cnt-bx">
            <div class="bravo-normal-offer">
              <div class="bravo-offer-image">
                <div class="place"></div>
                <router-link to="dsmarket/" class="product-link">
                  <div class="offer-image">
                    <img
                      class="inner-img"
                      :src="require(`../../../assets/images/${newProduct.prdctThmb}`)"
                      :alt="require(`../../../assets/images/${newProduct.prdctThmb}`)"
                    />
                  </div>
                </router-link>
              </div>
              <div class="main-section text-center">
                <div class="bravo-offer-price text-center">{{newProduct.prdctTittle}}</div>
                <div class="bravo-offer-moq text-center">
                  <span class="bld-txt-1">MOQ:</span>
                  {{newProduct.prdctMnq}}
                </div>
                <div class="bravo-offer-moq text-center">
                  <span class="bld-txt-1">Brand:</span>
                  {{newProduct.prdctBrand}}
                </div>
                <div class="bravo-offer-moq text-center">
                  <span class="bld-txt-1">AED:</span>
                  {{newProduct.prdctPrice}}
                </div>
                <md-button class="md-raised md-accent">Ask For Quotation</md-button>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {},
  data() {
    return {
      newProducts: [
        {
          prdctId: 1,
          prdctThmb: "sld1.jpg",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 125
        },
        {
          prdctId: 1,
          prdctThmb: "sld2.jpg",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 123,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 1252
        },
        {
          prdctId: 1,
          prdctThmb: "sld3.jpg",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "sld4.jpg",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "sld5.jpg",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "sld6.jpg",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        }
      ]
    };
  },
  components: {
    Carousel,
    Slide
  }
};
</script>
<style scoped>
.ftrd-sldr-1 {
  padding-left: 10px;
}
.sldr-cnt-bx .md-raised {
  height: 25px;
  font-size: 12px;
  margin-top: 20px;
  font-weight: 600;
}
.bravo-offer-moq {
  font-size: 13px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-weight: 500;
}
.ftrd-sldr-bx-1 {
  width: 100%;
  /* margin: 0 auto;
  margin-top: -160px; */
  position: relative;
  background: #fff;
  border: 1px solid #eeeeee;
  padding: 10px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding-bottom: 10px;
}
</style>
