<template>
  <div>
    <div>
      <div class="carousel-bx-rc-1">
        <div class="category-heading">
          <h2>
            <span>Updates From Ct Shots</span>
          </h2>
          <a href="#" class="view-all-btn">View All</a>
        </div>
        <carousel
          :centerMode="true"
          :perPage="6"
          :autoplay="false"
          :autoplayHoverPause="true"
          :paginationEnabled="false"
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
                        :src="require(`../../assets/images/${newProduct.prdctThmb}`)"
                        :alt="require(`../../assets/images/${newProduct.prdctThmb}`)"
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
                  <md-button class="md-raised" :md-ripple="false">Ask For Quotation</md-button>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
        <div class="ad-bx-tp-1">
          <img class="ad-bx-tp-1-img" :src="require(`../../assets/images/secondSlider1.jpg`)" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  },
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
        }
      ]
    };
  }
};
</script>
<style scoped>
.md-button {
  height: 30px;
  padding: 2px 5px;
  margin: 0px;
  margin-top: 15px;
  font-size: 11px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #191919 !important;
}
.carousel-bx-rc-1 {
  padding: 10px;
}
.bravo-offer-price {
  font-weight: 500;
  font-size: 15px;
}
.view-all-btn {
  border: 1px solid #191919;
  color: #191919 !important;
  font-size: 12px;
  padding: 6px 12px;
  display: inline-flex;
}
</style>

