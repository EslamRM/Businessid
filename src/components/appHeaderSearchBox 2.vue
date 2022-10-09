<template>
  <div class="at-src-bx-1">
    <div class="src-bx-1">
      <input
        type="text"
        v-on:blur="handleBlur"
        @focus="searchCategory"
        class="big-data"
        placeholder="What are you looking for..."
      />
      <div class="btn-act desTpView" to="/search-result">
        <md-button><i class="material-icons">search</i></md-button>
      </div>
    </div>
    <div v-if="isFocused" class="categorytAppeared">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutocompleteBox",
  data: () => ({
    inline: null,
    isFocused: false
  }),
  methods: {
    searchCategory() {
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
    }
  }
};
</script>

<style scoped>
.at-src-bx-1 {
  width: 350px;
  display: inline-block;
}
.src-bx-1 {
  position: relative;
  display: inline-block;
}
.src-bx-1 input {
  border: 1px solid #e4e4e4;
  width: 405px;
  /* padding: 7px 10px; */
  margin-left: 0px;
  border-radius: 3px;
  height: 31px;
  padding-left: 7px;
  font-size: 13px;
}
input[type="text"].big-data::-webkit-input-placeholder {
  font-size: 12px;
  font-weight: 300;
}
.src-bx-1 input:focus {
  outline: none;
  box-shadow: 0 0px 4px 0 rgba(32, 33, 36, 0.11);
}

.src-bx-1 i {
  font-size: 23px;
  color: #ff5722;
  outline: none !important;
  display: flex;
  align-items: center;
}
.btn-act {
  width: 45px;
  height: 31px;
  display: flex;
  position: absolute;
  right: 0px;
  top: 0;
}
.btn-act .md-button {
  width: 45px;
  height: 31px;
  min-width: 45px;
  padding: 0;
  margin: 0;
  background: #eee;
  border-radius: 0px 3px 3px 0px;
}
.categorytAppeared {
  border-radius: 0 0 2px 2px;
  position: absolute;
  background-color: #fff;
  color: #000;
  z-index: 9;
  top: 31px;
  -webkit-box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  white-space: nowrap;
  width: 359px !important;

  left: 16px;
  height: 200px;
}
@media only screen and (max-width: 768px) {
  .at-src-bx-1 {
    width: 100%;
  }
  .src-bx-1 input {
    width: 100%;
    margin-left: 0px;
  }
}
</style>
