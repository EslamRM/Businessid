<template>
  <div>
    <div class="pg-cnt-bx">
      <div class="right-cnt-bx">
        <gridSlider1></gridSlider1>
        <gridSlider2></gridSlider2>
        <!-- <gridSlider3></gridSlider3> -->
      </div>
    </div>
  </div>
</template>
<script>
import gridSlider1 from "../../ctcomponents/gridSlider1";
import gridSlider2 from "../../ctcomponents/gridSlider2";
// import gridSlider3 from "../../ctcomponents/gridSlider3";
export default {
  data() {
    return {};
  },
  components: {
    gridSlider1,
    gridSlider2
    // gridSlider3
  }
};
</script>
<style scoped>
.pg-cnt-bx {
  transition: all 0.3s ease-in;
}
.top-sticky .pg-cnt-bx {
  padding-top: 69px;
}
</style>
