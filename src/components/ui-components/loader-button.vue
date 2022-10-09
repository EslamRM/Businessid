<template>
  <md-button
    :class="{
      'md-raised md-primary': primary,
      'md-raised md-accent': !primary
    }"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <div class="md-layout md-gutter md-alignment-center-center">
      <div class="md-layout-item">{{ name }}</div>
      <transition :name="transition" v-if="loading">
        <div class="md-layout-item">
          <md-progress-spinner
            :class="{ 'md-accent': primary }"
            :md-diameter="20"
            :md-stroke="3"
            md-mode="indeterminate"
          ></md-progress-spinner>
        </div>
      </transition>
    </div>
  </md-button>
</template>

<script>
export default {
  name: "loader-button",
  props: {
    name: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean
    },
    transition: {
      type: String,
      default: "fade"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  }
};
</script>
