<template>
  <div
    class="md-layout-item md-xsmall-size-100"
    :class="sizeClasses"
  >
    <fieldset class="inline-through text-left">
      <label class="c-formLabel"> {{ label }} </label>
      <slot v-if="custom"></slot>
      <input
        v-else
        class="c-formInput c-form-placeholder"
        v-bind:value="value"
        @input="$emit('input', $event.target.value)"
        v-bind="$attrs"
      />
      <!-- <input
        v-else
        class="c-formInput c-form-placeholder"
        :type="type"
        :disabled="disabled"
        :step="step"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      /> -->
      <!-- <input
        v-else
        class="c-formInput c-form-placeholder"
        :type="type"
        :disabled="disabled"
        :value="valueFromComputed"
        :step="step"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="$emit('value-entered', inputValue)"
      /> -->

      <div
        class="c-forminlineError"
        v-if="error"
      >
        <span v-if="errorMessage">{{ errorMessage }} </span>
        <span v-else>{{ label }} is required.</span>
      </div>
      <div
        class="c-forminlineError"
        v-if="customError"
      >
        <span v-if="customErrorMessage">{{ customErrorMessage }} </span>
        <span v-else>{{ label }} is required.</span>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "input-component",
  inheritAttrs: false,
  data () {
    return {
      inputValue: this.value,
      sizeClasses: {
        [`md-size-${this.size}`]: true,
        [this.customClass]: true,
        // 'md-size-33 mb': size == '33', 'md-size-100 mb': size == '100'
      }
    };
  },
  props: [
    "value",
    // "placeholder",
    // "type",
    "label",
    // "disabled",
    "error",
    "custom",
    "size",
    "errorMessage",
    "customError",
    "customErrorMessage",
    "customClass"
    // "step"
  ],


};
</script>

<style scoped>
.inline-through {
  text-transform: capitalize;
}
.mb {
  margin-bottom: 15px;
  text-transform: capitalize;
}

.inline-through {
  width: 100%;

  display: block !important;
}

.vdpComponent {
  display: block !important;
}
.c-formInput {
  float: left;
  border: solid 1px #c8d2e0 !important;
  padding: 10px 10px !important;
  border-radius: 6px !important;
  padding-left: 10px !important;
  width: 100% !important;
  margin-top: 0px !important;
  margin-bottom: 5px !important;
}

.c-formSelect select,
.c-formSelect {
  height: auto !important;
}
.c-formSelect {
  float: left;
  border: solid 1px #c8d2e0 !important;
  padding: 10px 10px !important;
  border-radius: 6px !important;
  padding-left: 10px !important;
  width: 100% !important;
  margin-top: 0px !important;
}

.vue-tags-input {
  max-width: 100% !important;
}
.input_vat input {
  padding-top: 18px !important;
  padding-bottom: 18px !important;
}
</style>
