<template>
  <div>
    <div class="lst-bx-wrp fltr-pg-1">
      <div class="container clearfix">
        <div class="ch-right-layout">
          <Products />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navwithImageSlider from "../../../ctcomponents/navwithImageSlider";
import ctListingBox from "../../../ctcomponents/products/ctListingBox";
import Products from "../../../ctcomponents/products/products";
export default {
  name: "demands",
  data: () => ({
    array: [],
    boolean: false,
    string: null,
    novalue: null,
    disabled: true,
    obj1: { name: "obj1" },
    obj2: { name: "obj2" },
    obj: null,
    indeterminate: true
  }),
  components: {
    navwithImageSlider,
    ctListingBox,

    Products
  }
};
</script>
<style scoped></style>
