<template>
  <div>
    <div class="bx-tp-1-prt">
      <div>
        <carousel
          :perPage="1"
          :autoplay="true"
          :autoplayHoverPause="true"
          :paginationSize="0"
          paginationActiveColor="#bf1d2e"
          paginationColor="#213a63"
          easing="linear"
          :loop="true"
          :navigationEnabled="false"
          navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
          navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
        >
          <slide>
            <div class="ad-bx-1">
              <img src="../../assets/images/slider1.jpg" alt>
            </div>
          </slide>
          <slide>
            <div class="ad-bx-1">
              <img src="../../assets/images/slider1.jpg" alt>
            </div>
          </slide>
        </carousel>
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
  }
};
</script>
<style scoped>
.bx-hd-1 {
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}
.md-button {
  height: 24px;
  font-size: 11px;
  margin-top: 10px;
  min-width: 20px;
  max-width: 100%;
}
.bravo-offer-price {
  font-size: 14px;
  margin-bottom: 4px;
}
.bravo-offer-moq {
  font-size: 12px;
  line-height: 1.5;
}
.bravo-normal-offer {
  padding: 5px;
}
</style>
