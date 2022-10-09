<template>
  <div class="container cstTp1">
    <div class="cover-slider">
      <carousel
        v-if="banners"
        :perPage="1"
        :autoplay="true"
        :autoplayHoverPause="true"
        :paginationEnabled="true"
        easing="linear"
        :loop="true"
        paginationActiveColor="#f47320"
        paginationColor="rgba(255, 87, 34,0.5)"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
        navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
        :speed="500"
        :interval="5000"
        :autoplayTimeout="5000"
      >
        <slide v-for="(banner, index) in banners[0].ads" :key="index">
          <a :href="banner.link" target="_blank">
            <img
              :src="banner.file"
              alt
              :class="banners[0].type == 'home' ? 'homepageSLide' : ''"
          /></a>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  props: ["banners"],

  components: {
    Carousel,
    Slide
  }
};
</script>
<style scoped>
.loader {
  position: relative;
  right: 0;
  height: 100px;
  top: 10px;
}
.circle-loader {
  position: absolute;
  bottom: 0;
  left: 50%;
  top: 40px;
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
@media screen and (max-width: 767px) {
  .homepageSLide {
    height: 170px;
  }
}
</style>
