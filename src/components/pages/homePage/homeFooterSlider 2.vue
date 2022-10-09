<template>
  <div class="container cstTp1">
    <div class="cover-slider m-0">
      <carousel
        v-if="banners[5]"
        :perPage="1"
        :autoplay="true"
        :autoplayHoverPause="true"
        :paginationEnabled="false"
        easing="linear"
        :loop="true"
        paginationActiveColor="#f47320"
        paginationColor="rgba(255, 87, 34,0.5)"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
        navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
        :speed="500"
        :interval="2000"
        :autoplayTimeout="7000"
      >
        <slide v-for="image in banners[5].ads" :key="image.id">
          <a :href="image.link"> <img :src="image.file" alt/></a>
        </slide>

        <!-- <slide>
        <img src="@/assets/images/mobile/ak1.jpg" alt>
      </slide> -->
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
<style scoped></style>
