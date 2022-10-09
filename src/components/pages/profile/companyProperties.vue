<template>
  <div>
    <Property />
  </div>
</template>
<script>
import navwithImageSlider from "../../ctcomponents/navwithImageSlider";
import Property from "../../ctcomponents/property/property";
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
    Property
  }
};
</script>
<style scoped></style>
