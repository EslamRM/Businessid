<template>
  <div>
    <div class="d-flex addMore justify-content-end">
      <button
        type="button"
        class="md-button md-theme-default actionBtn"
        @click="addnewCountry"
      >
        <i class="material-icons">add</i>Add new country
      </button>
    </div>
    <shippingCountry />
    <newCountrySelect
    v-if="newCountrySelect"
    @emitCancelCountry = "getEmitCountry" />
  </div>
</template>
<script>
import shippingCountry from "./shippingCountry";
import newCountrySelect from "./newCountrySelect";
export default {
  components: { shippingCountry, newCountrySelect },
  data() {
    return {
      showShippingCountry: false,
      newCountrySelect: false
    };
  },
  methods: {
    addnewCountry() {
      this.newCountrySelect = true;
    },
    getEmitCountry()
    {
       this.newCountrySelect = false;
    }
  }
};
</script>
<style scoped>
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
</style>
