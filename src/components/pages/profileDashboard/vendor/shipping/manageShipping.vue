<template>
  <div class="shadowCard">
    <div class="md-layout stockLocationTitle">
      <span>Manage Shipping</span>
      <a
        @click="showDialog = true; clearForm()"
        class=" md-size-25 md-button md-accent md-theme-default iconButton"
      >
        <span class="material-icons">add</span>Add new City
      </a>
      <!-- Table Start -->
      <div
        class="md-layout-item md-size-100 tableContainer"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <md-table>
          <md-table-row class="header_table_wallet">
            <md-table-head md-numeric>
              <h3>Location</h3>
            </md-table-head>
            <md-table-head>
              <h3>Min. Price</h3>
            </md-table-head>
            <md-table-head>
              <h3>Min. Weight (Kg)</h3>
            </md-table-head>

            <md-table-head>
              <h3>Add. Price <br> per Kg.</h3>
            </md-table-head>
            <md-table-head class="action-btns">
              <h3>Action</h3>
            </md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(city,id) in shippingCities"
            :key="id"
            class="bg_row"
          >
            <md-table-cell md-numeric> {{ city.city }}, {{city.country}} </md-table-cell>
            <md-table-cell md-numeric> {{ city.currency +' '+ city.min_price }} </md-table-cell>
            <md-table-cell md-numeric> {{ city.min_weight }} </md-table-cell>
            <md-table-cell md-numeric> {{ city.currency +' '+ city.aditional_price_per_kg }} </md-table-cell>
            <md-table-cell class="md-layout actionsGroup action-btns">
              <md-button
                @click="updateCity(city, city.shipping_id)"
                class="md-layout-item md-size-45 md-raised md-primary "
              ><i class="material-icons ">edit</i></md-button>
              <md-button
                @click="deleteCity(city.shipping_id)"
                class="md-layout-item md-size-45 md-raised md-accent "
              ><i class="material-icons ">delete</i></md-button>
            </md-table-cell>

          </md-table-row>
          <!-- <tableFooter msg="No More Cities"></tableFooter> -->
        </md-table>
      </div>
      <!-- Table End -->
      <!-- Cards -->

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title class="title_modal_card mob_card_pl">Add new city</md-dialog-title>

        <md-button
          class="md-primary close_btn"
          @click="showDialog = false"
        >
          <i class="material-icons"> close </i>
        </md-button>
        <md-content>

          <div class="md-layout mt-4 modal_form">
            <input-component
              label="Country *"
              custom="true"
              :error="checkValidation('country')"
              :size="50"
            >
              <vSelect
                autocomplete="new-country"
                v-model="form.country"
                :reduce="element => element.name"
                label="name"
                :options="currencies"
                placeholder="Select Country"
                @input="countrySelected"
              >
              </vSelect>
            </input-component>
            <input-component
              label="City *"
              custom="true"
              :error="checkValidation('city')"
              :size="50"
            >
              <vSelect
                autocomplete="new-city"
                v-model="form.city"
                :reduce="element => element.location"
                label="location"
                :options="citiesList"
                :placeholder="citiesStatus"
                @input="citySelected"
              >
              </vSelect>
            </input-component>
            <input-component
              label="Currency *"
              custom="true"
              :error="checkValidation('currencyInp')"
              :size="50"
            >
              <vSelect
                autocomplete="new-currency"
                placeholder="Select Currency"
                v-model="form.currencyInp"
                :reduce="element => element.currency"
                label="currency"
                :options="currencies"
              >
              </vSelect>
            </input-component>
            <input-component
              label="Min. Weight (in KG) *"
              v-model="form.min_weight"
              :error="checkValidation('min_weight')"
              placeholder="Enter weight in KG"
              type="number"
              min="0.0"
              step="0.200"
              :size="50"
            >
            </input-component>
            <input-component
              placeholder="Min. Price *"
              label="Min. Price *"
              :error="checkValidation('min_price')"
              :customError="checkValidity('min_price')"
              customErrorMessage="Please Enter Legit Price"
              custom="true"
              :size="50"
            >
              <currency-input
                class="c-formInput c-form-placeholder"
                v-model="form.min_price"
                :distraction-free="false"
                :currency="form.currencyInp ? form.currencyInp : 'AED'"
                locale="en-US"
              />
            </input-component>
            <input-component
              placeholder="Additional Price Per (KG) *"
              label="Property price per Kg *"
              :error="checkValidation('aditional_price_per_kg')"
              :customError="checkValidity('aditional_price_per_kg')"
              customErrorMessage="Please Enter Legit Price"
              custom="true"
              :size="50"
            >
              <currency-input
                class="c-formInput c-form-placeholder"
                v-model="form.aditional_price_per_kg"
                :distraction-free="false"
                :currency="form.currencyInp ? form.currencyInp : 'AED'"
                locale="en-US"
              />
            </input-component>
            <div class="md-layout-item submit-button">
              <center>
                <loader-button
                  @click="addNewCity"
                  name="Add City"
                  icon="push_pin"
                  class="btn_save"
                  :loading="loading"
                  :disabled="submitted && $v.$invalid"
                  :fullWidth="true"
                ></loader-button>
              </center>
            </div>
          </div>

        </md-content>

      </md-dialog>
    </div>

  </div>
</template>
<script>
import inputComponent from "@/components/ui-components/input.vue"
import loaderButton from "@/components/ui-components/loader-button.vue"
import tableFooter from "@/components/pages/profileDashboard/components/NodataFound.vue"
import utils from "@/helpers/utils.js"
import country from "@/helpers/country.js"

import vSelect from "vue-select";
import { CurrencyInput } from "vue-currency-input";
import axios from "axios"
import {
  required,
  minValue,
  numeric
} from "vuelidate/lib/validators";
const greaterThanZero = (value) => value > 0
export default {
  name: "manageShipping",
  components: { inputComponent, loaderButton, tableFooter, vSelect, CurrencyInput },
  mixins: [country, utils],
  data: () => ({
    showDialog: false,
    submitted: false,
    loading: false,
    shippingCities: "",
    currencyInp: "AED",
    actionType: "add",
    form: {
      country: "",
      city: "",
      min_weight: 0,
      min_price: 0,
      aditional_price_per_kg: 0,
      currencyInp: "AED",
      shipping_id:null
    }
  }),
  created () {
    this.fetchAndAssign("/vendor/shipping/get-cities", {}, "shippingCities");
  },
  methods: {
    async addNewCity () {
      this.loading = true;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }

      //   set Url According to Action Type
      let url = "/vendor/shipping/add-city-fee";
      if (this.actionType === 'update') url = "/vendor/shipping/update-city-fee"
      const resp = await axios.post(url, this.form);
      const { message, result, success } = await resp.data;
      if (success) {
        this.fetchAndAssign("/vendor/shipping/get-cities", {}, "shippingCities");
        this.actionType = "add"
        this.showDialog = false
        this.$swal.fire(this.$helpers.successPopup(message));
        this.loading = false;
        this.submitted = false;
        this.clearForm();
        return
      }
      this.$swal.fire(this.$helpers.errorPopup(message));
      this.loading = false;
      this.submitted = false;
      return

    },
    async updateCity (city, ship_id) {
      for (var k in city) this.form[k] = city[k];
      this.showDialog = true;
      this.actionType = "update";
      this.form.shipping_id = ship_id;
    },
    async deleteCity (id) {
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: `Are you sure you want to Delete City ?`,
        html: "<p style='font-size: 10px;' >This Process cannot be undone</p>",
        cancelButtonColor: "rgb(100, 221, 23)",
        confirmButtonColor: "#ff5722",
        confirmButtonText: "Proceed",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading()
      })

      if (Reasons) {
        const resp = await axios.post("/vendor/shipping/delete-city-fee", { "shipping_id":id })
        const { success, message } = resp.data
        if (success) {
          this.fetchAndAssign("/vendor/shipping/get-cities", {}, "shippingCities");
          this.$swal.fire(this.$helpers.successPopup(message));
          return
        }
        this.$swal.fire(this.$helpers.successPopup(message));
        return
      }
    }
  },
  validations: {
    form: {
      country: { required },
      city: { required },
      currencyInp: { required },
      min_weight: { required, numeric },
      min_price: { required, minValue: greaterThanZero },
      aditional_price_per_kg: { required, minValue: greaterThanZero },
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

/* Table Styles */
.tableContainer {
  margin-top: 12px;
}
.bg_row {
  background-color: #f6f6f6;
}

.md-table.md-theme-default .md-table-row td {
  border: none !important;
}
.header_table_wallet {
  background-color: #213c64;
  margin-top: 32px;
}
.header_table_wallet h3 {
  color: #fff !important;
  font-weight: 400;
}
/* Action Button Styles */
.actionsGroup .md-button {
  height: 35px;
  min-width: 45px;
  margin: 0 8px 0 0;
}

.actionsGroup .md-button i {
  font-size: 18px;
}
.action-btns{
    min-width: 160px !important;
}
/* Table Styles End */

/* Modal Styles */

.title_modal_card {
  color: #535559;
  font-size: 16px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 13px;
}

.mob_card_pl {
  padding-left: 10px !important;
}

.modal_form {
  padding: 0px 12px;
  width: 600px;
}

.modal_form .md-layout-item {
  padding-right: 12px;
}

/* -- close button */
.close_btn {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 25px;
  width: 25px;
  min-width: 2px;
}
.close_btn i {
  font-size: 16px;
  color: #213a63;
  display: flex;
}

/* -- save button */
.btn_save span {
  margin-top: 3px;
}

.btn_save i {
  font-size: 16px;
  float: left;
  margin-right: 2px;
}
.btn_save {
  border: none;
  background-color: #ff5821;
  height: 40px;
  margin: 20px 0px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .close_btn {
    right: 11px;
    top: 7px;
  }
  .title_modal_card {
    font-size: 14px;
    padding-top: 12px;
  }

  .modal_credit .md-overlay.md-fixed,
  body > .md-overlay {
    z-index: 9999 !important;
  }

  .md-dialog {
    z-index: 99999;
  }
}

@media screen and (max-width: 600px) {
  .modal_form {
    width: 100%;
  }
  .modal_credit {
    width: 100%;
  }

  .close_btn {
    right: 2px;
  }

  .btn_save i {
    font-size: 14px;

    margin-right: 2px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 12px;
  }

  .title_modal_card {
    font-size: 13px;
    padding-top: 10px;
    padding-left: 10px;
  }
  .mob_card_pl {
    padding-left: 10px !important;
  }
  .box_billing {
    padding-left: 10px;
    padding-right: 10px;
  }
  .action-btns h3{
    padding-left: 18px;
  }
}

@media screen and (max-width: 300px) {
  .btn_save {
    height: 35px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 11px;
  }
}
</style>