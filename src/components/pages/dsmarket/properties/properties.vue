<template>
  <div class="lst-bx-wrp fltr-pg-1">
    <div class="container clearfix">
      <div class="ch-right-layout">
        <Property />
      </div>
    </div>
  </div>
</template>
<script>
// import navwithImageSlider from "../../ctcomponents/navwithImageSlider";
import Property from "../../../ctcomponents/property/property";
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
    Property
  }
};
</script>
<style scoped></style>
