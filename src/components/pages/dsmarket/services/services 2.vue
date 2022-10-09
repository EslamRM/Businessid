<template>
  <div class="lst-bx-wrp fltr-pg-1">
    <div class="container clearfix">
      <div class="ch-right-layout">
        <Service />
      </div>
    </div>
  </div>
</template>
<script>
// import navwithImageSlider from "../../ctcomponents/navwithImageSlider";
import Service from "../../../ctcomponents/services/service";
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
    Service
  }
};
</script>
<style scoped></style>
