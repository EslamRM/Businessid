<template>
  <div class="drawer">
    <div class="wrapper">
      <div class="inputWrapper">
        <input
          v-model="form.min"
          @input="onInput"
          type="number"
          name="min"
          class="textInput"
        />
        <span class="between">To</span
        ><input
          v-model="form.max"
          @input="onInput"
          type="number"
          name="max"
          class="textInput"
        />
        <!------  <button
          aria-label="Go"
          class="md-button md-theme-default goButton"
          @click="sortPrice"
        >
          Go
        </button>------>
      </div>
    </div>
  </div>

  <!-- <vue-range-slider
                          v-model="range"
                          :clickable="false"
                          @drag-end="sortPrice"
                          :min="min"
                          :max="max"
                          :formatter="formatter"
                          :tooltip-merge="tooltipMerge"
                          :enable-cross="enableCross"
                        ></vue-range-slider> -->
</template>

<script>
import VueRangeSlider from "vue-range-component";
export default {
  components: { VueRangeSlider },
  data() {
    return {
      form: {
        min: 0,
        max: 100000,
      },
    };
  },
  methods: {
    onInput() {
      setTimeout(() => {
        this.$emit("drag", this.form.min, this.form.max);
      }, 1000);
    },
  },
  created() {
    Object.keys(this.$route.query).forEach((key) => {
      // if (Object.keys(this.form).includes(key)) {
      let query = this.$route.query[key];
      if (key == "min_price") {
        this.form.min = query;
      } else if (key == "max_price") {
        this.form.max = query;
      }
      //   this.form[key] = query;
      // }
    });
  },
};
</script>
<style>
.drawer {
  padding-bottom: 10px;
  max-height: 2000px;
  -webkit-transition: max-height 0.15s ease-in;
  transition: max-height 0.15s ease-in;
}
.drawer .wrapper {
  padding: 0 5px;
}

.inputWrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.textInput {
  border: 1px solid #e2e5f1;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 10px;
  text-transform: uppercase;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
}
.between {
  text-transform: uppercase;
  font-size: 0.833333rem;
  margin: 0 8px;
  color: #b2bbd2;
}
.goButton {
  height: 32px !important;
  font-size: 12px;
  left: 3px;
  right: 0;
  min-width: 45px;
  margin-left: 4px;
  font-weight: 600;
  background-color: #ffeee8;
  color: rgba(255, 87, 34, 0.65) !important;
  border-radius: 2px;
  margin-right: 3px;
}
@media screen and (max-width: 768px) {
  .drawer .wrapper {
    padding: 0 0px;
    margin-left: -5px;
    margin-right: -5px;
    margin-top: -12px;
  }



.textInput {

  font-size: 13px;
  font-weight: 400;
color: #cfcfcf;
}










}
</style>
