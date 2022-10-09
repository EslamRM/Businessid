<template>
  <div>
    <div class="lst-bx-wrp fltr-pg-1">
      <div class="container clearfix">
        <div class="ch-right-layout">
          <Auto />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navwithImageSlider from "../../../ctcomponents/navwithImageSlider";
import Auto from "../../../ctcomponents/autos/autos";
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
.group-input {
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 10px;
  top: -21px;
}
.input-item {
  width: 45%;
}
.input-item .md-field {
  margin: 0;
}
.input-item .md-field label {
  font-size: 13px;
}
.md-list-item-text {
  font-size: 15px;
  font-weight: 600;
}
.expand-wrap .auto-scrol-bx {
  height: auto;
}
.button-wrap {
  width: 100%;
}
.button-wrap button {
  width: 95%;
  margin: 0 auto;
  display: table;
  height: 42px;
  margin-top: 1em;
}
.md-list-item {
  background: #f1f1f1;
}
</style>
