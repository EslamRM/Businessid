<template>
  <div>
    <div class="newcountryWrap">
      <div class="md-layout md-gutter m-0">
        <div class="md-layout-item md-size-100 md-small-size-100">
          <fieldset class="inline-through text-left">
            <label class="c-formLabel">Choose Country </label>
            <div class="show-bx-1 ctSelect">
              <select>
                <option value="">India</option>
                <option value="">Kuwait</option>
              </select>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="actionWrap">
                    <button
                      type="button"
                      class="md-button md-theme-default actionBtn"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      class="md-button md-theme-default actionBtn"
                      @click="cancelSelect"
                    >
                      Cancel
                    </button>
                  </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
     showCountrySelect: false
    };
  },
  methods: {
    cancelSelect() {
      this.$emit('emitCancelCountry')
    }
  }
};
</script>
<style scoped>
.countryTable{
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.addMore button {
  height: 31px;
  background-color: rgb(223, 227, 233);
  margin-bottom: 1.1em;
  color: #213a63;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.addMore button i {
  font-size: 20px;
  color: #213a63;
}
.c-formLabel {
  padding-left: 12px;
}
.newcountryWrap {
  display: flex;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin-top: 2em;
  padding: 15px;
  align-items: center;
}
.md-layout {
  width: 33%;
}
.md-layout-item {
  padding: 0 !important;
}
.actionWrap {
  display: flex;
  margin-top: 24px
}
.actionWrap .actionBtn {
height: 27px;
    min-width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: rgb(223, 227, 233);
  margin-right: 0.55em;
  color: rgb(33, 58, 99, 1);
    font-size: 12px;
}
</style>
