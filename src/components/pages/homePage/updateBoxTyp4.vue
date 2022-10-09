<template>
  <div class="AddBoxTp1 pb-0">
    <div class="container cstTp1">
      <div class="row AdsBoxTp1ImgBox TwoGrid">
        <div class="col-md-6 pb-2 pr-2">
          <a :href="banners[0].link">
            <img class="WidthFull" :src="banners[0].file" alt=""
          /></a>
        </div>
        <div class="col-md-6 pb-2 pl-2">
          <a :href="banners[1].link">
            <img class="WidthFull" :src="banners[1].file" alt=""
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  props: ["banners"],
  name: "updateBoxTyp3",
  components: {
    Carousel3d,
    Slide
  }
};
</script>
<style scoped></style>
