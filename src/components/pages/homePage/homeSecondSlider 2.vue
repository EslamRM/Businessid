<template>
  <div class="cover-slider">
    <carousel
      :perPage="1"
      :autoplay="false"
      :autoplayHoverPause="true"
      :paginationEnabled="false"
      easing="linear"
      :loop="true"
      :navigationEnabled="false"
      navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
      navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
      :speed="1500"
      :interval="2000"
      :autoplayTimeout="7000"
    >
      <slide>
        <img src="../../../assets/images/secondSlider1.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider2.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider1.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider2.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider1.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider2.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider1.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider2.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider1.jpg" alt>
      </slide>
      <slide>
        <img src="../../../assets/images/secondSlider2.jpg" alt>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  }
};
</script>
<style scoped>
</style>
