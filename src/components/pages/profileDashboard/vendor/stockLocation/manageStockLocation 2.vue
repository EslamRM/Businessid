<template>
  <div class="cart-wrap">
    <section class="col-sm-12 col-md-12 col-xl-12 left fl p_zero">
      <AddressForm
        v-if="addressForm"
        type="stock_location"
        :update_stock_location="update_stock_location"
        :action_name="action_name"
        @backToAddress="() => {addressForm = false; action_name='add_stock_location'; update_stock_location = {}}"
        @getCheckOutAddress="getLocations"
      />
      <div
        v-else
        class="shadowCard"
      >
        <div class="md-layout stockLocationTitle">
          <span>Stock Locations</span>
          <a
            @click="addressForm = true"
            class=" md-size-25 md-button md-accent md-theme-default iconButton"
          >
            <span class="material-icons">add</span>Add new Location
          </a>
        </div>
        <div
          class="md-layout "
          v-if="locations"
        >
          <div
            class="md-layout-item address md-size-45"
            v-for="address in locations"
            :key="address.id"
          >
            <CheckOutAddress
              type="stock_location"
              :address="address"
              @delete-address="deleteAddress"
              @edit-address="editAddress"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AddressForm from "@/components/pages/dsmarket/cart/changeAddress.vue"
import CheckOutAddress from "@/components/pages/dsmarket/cart/CheckOutAddress.vue"
import utils from "@/helpers/utils.js"
export default {
  name: "manageStockLocation",
  mixins: [utils],
  components: { AddressForm, CheckOutAddress },
  data: () => ({
    addressForm: false,
    locations: [],
    action_name: 'add_stock_location',
    update_stock_location: {
      id: "",
      url: "",
    }
  }),
  created () {
    this.getLocations()
  },
  methods: {
    getLocations () {
      this.fetchAndAssign("/vendor/stock-location/get", {}, "locations")
    },
    async deleteAddress (address_id) {
      const res = await this.fetchAndAssign('/vendor/stock-location/delete', { stock_location_id: address_id });
      console.log(res)
      if (res.success) {
        this.getLocations()
        this.$swal.fire(this.$helpers.successPopup(res.message));
        return
      }
      this.$swal.fire(this.$helpers.errorPopup(res.message));
      return
      console.log(res)
    },
    editAddress (address_id) {
      this.update_stock_location = {
        id: address_id,
        details_url: "/vendor/stock-location/details",
      }
      this.action_name = "update_stock_location"
      this.addressForm = true
    }
  }
}
</script>

<style scoped>
/* Main Card */
.shadowCard {
  width: 100%;
  background: #ffffff;
  margin-bottom: 2em;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
/* Stock Locations stockLocationTitle */
.stockLocationTitle {
  color: #191919;
  font-size: 1.11em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
/* Add Address Button */
.iconButton {
  height: 29px;
  border: 1px solid #f47320;
  justify-content: center;
  align-items: center;
  display: flex;
  text-transform: capitalize;
  font-size: 13px;
  padding: 5px;
}
.iconButton span {
  font-size: 20px;
}

/* For Making Margin of Address Card Zero */
.changeWrap {
  margin-top: 0px !important;
}

/* Single Address Card */
.address {
  margin: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
}
@media screen and (max-width:768px) {
.p_zero{padding: 0px;}
.shadowCard { width: 103%;}
  .stockLocationTitle{ font-size: 13px;} 
  .iconButton{margin-right: 0px !important; font-size: 12px;}
}

@media screen and (max-width:600px) {

  .stockLocationTitle{ font-size: 12px;} 

.iconButton {
    font-size: 12px; margin-right: 0px;}
.shadowCard{
    width: 100%;
}
}

</style>