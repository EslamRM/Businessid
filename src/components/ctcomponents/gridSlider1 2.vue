<template>
  <div>
    <div class="bx-tp-1-prt smallCarouselWrap">
      <div class="bx-hd-1">
        <span>Latest Products</span>
      </div>
      <div>
        <carousel
          :perPage="1.5"
          :autoplay="false"
          :autoplayHoverPause="true"
          :paginationSize="0"
          paginationActiveColor="#bf1d2e"
          paginationColor="#213a63"
          easing="linear"
          :loop="true"
          :navigationEnabled="true"
          navigationNextLabel="<div class='md-button md-theme-default smallCarousel'><i class='material-icons'>keyboard_arrow_right</i></div>"
          navigationPrevLabel="<div class='md-button md-theme-default smallCarousel prev'><i class='material-icons'>keyboard_arrow_left</i></div>"
        >
          <slide v-for="(product, index) in products" :key="index">
            <div class="loader" v-if="showLoader">
              <div class="circle-loader"></div>
            </div>
            <div class="offer-item" v-else>
              <ProductList :product="product" />
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import ProductList from "@/components/ctcomponents/products/productList.vue"
export default {
  components: {
    Carousel,
    Slide,
    ProductList
  },
  data () {
    return {
      showLoader: true,
      page: 1,
    }
  },
  created () {

    this.$store
      .dispatch("LoadProducts", { page: this.page })
      .then(response => {
        this.showLoader = false;
      })
      .catch(error => {
        this.showLoader = false;
      });
  },
  computed: {
    products () {
      return this.$store.getters.getProducts;
    }
  }
};
</script>
<style scoped>
.bx-hd-1 {
  font-size: 15px;
  font-weight: 500;
  padding: 11px;
  display: flex;
  align-items: center;
  height: 35px;
  color: #444;
}
.bx-hd-1 span {
  top: 2px;
  position: relative;
}

.loader {
  position: relative;
  right: 25%;
  height: 60px;
}
.circle-loader {
  position: absolute;
  bottom: 0;
  right: 20%;

  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
