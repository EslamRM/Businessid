<template>
  <div class="AddBoxTp1">
    <div class="container cstTp1">
      <div class="row AdsBoxTp1ImgBox">
                <div class="col-md-4 pr-0">
                        <img src="@/assets/images/subImage1.png" alt="">
                    </div>
                    <div class="col-md-4 pr-0">
                        <img src="@/assets/images/subImage2.png" alt="">
                    </div>
                    <div class="col-md-4">
                        <img src="@/assets/images/subImage3.jpg" alt="">
                    </div>
            </div>
    </div>
  </div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  name: "updateBoxTyp3",
  components: {
    Carousel3d,
    Slide
  }
};
</script>
<style scoped>

</style>
