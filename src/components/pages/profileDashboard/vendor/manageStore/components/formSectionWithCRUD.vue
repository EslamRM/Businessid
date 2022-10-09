<template>
  <!-- Auto Payment Method -->
  <div class="form-section" :style="{'background-color':addAlpha(color,0.1)}">
    <!-- Form Title -->
    <div class="form-section-title">
      <div class="d-inline-flex align-center">
        <span class="squareBadge mr-3"> {{ number }} </span>{{ title }}
      </div>
      <div class="d-inline-flex align-center gap-1">
        <md-button
          v-if="deleteButton"
          class="md-raised md-primary btn_edit"
          @click="$emit('deleteColor', number - 1)"
        >
          <i class="material-icons">delete</i>
        </md-button>

        <button
          @click="toggleDiv('contentDiv')"
          type="button"
          class="md-button md-theme-default toggleboxBtn"
        >
          <span class="material-icons" v-if="contentDiv"
            >keyboard_arrow_up</span
          >
          <span class="material-icons" v-else>keyboard_arrow_down</span>
        </button>
      </div>
    </div>
    <!-- Form Title -->
    <!-- Form Content -->
    <transition name="expand">
      <div v-if="contentDiv">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "formSection",
  props: {
    number: {
      type: String,
    },
    title: {
      type: String,
    },
    color: {
      type: String,
    },
    deleteButton: {
      type: Boolean,
    },
  },
  data() {
    return {
      contentDiv: true,
    };
  },
  methods: {
    toggleDiv(div) {
      this[div] = !this[div];
    },
    addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
      const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      console.log(color + _opacity.toString(16).toUpperCase());
      if(color==undefined)
      {
        return 'unset';
      }
      return color + _opacity.toString(16).toUpperCase();
    },
  },
};
</script>
<style scoped>
/*-----------------Form Section---------------------- */
.form-section {
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
  padding: 21px;
  height: 100%;
  margin-bottom: 1.55em;
}

.form-section-title {
  font-size: 1.4rem;
  font-weight: 600;
  padding: 9px 0;
  text-align: left;
  border-bottom: 1px solid #eeee;
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggleboxBtn {
  height: 25px;
  min-width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

@media screen and (max-width: 768px) {
  .form-section {
    padding: 15px;
    padding-top: 5px;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 600px) {
  .form-section-title {
    padding: 0px 0;
    font-size: 11px;
  }
  .form-section {
    padding: 10px;
    padding-top: 3px;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .toggleboxBtn {
    height: 18px;
    min-width: 18px;
    margin: 6px 8px;
    margin-right: 0;
  }

  .toggleboxBtn span {
    font-size: 14px;
  }

  .squareBadge {
    font-size: 11px;
  }
}

.btn_edit {
  min-width: 20px;
  height: 32px;
  border-radius: 3px;
  width: 38px;
}

.gap-1 {
  gap: 1rem;
}
</style>
