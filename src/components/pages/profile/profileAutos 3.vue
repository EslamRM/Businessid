<template>
  <div>
    <Auto />
  </div>
</template>
<script>
import navwithImageSlider from "../../ctcomponents/navwithImageSlider";
import Auto from "../../ctcomponents/autos/autos";
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
    Auto
  }
};
</script>
<style scoped>
.md-checkbox {
  font-size: 12px;
}
.ch-right-layout {
  width: 940px;
}
</style>

