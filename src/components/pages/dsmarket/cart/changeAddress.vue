<template>
  <div>
    <div class="container p_zero">
      <div class="changeWrap">
        <div class="sectionFlow">
          <div class="cart-head">
            <span> {{ type === 'checkout' ? 'Delivery Address' : 'Stock Location' }} </span>
            <a
              @click="back"
              class="d-flex align-items-center back-to-address"
            >
              <span class="material-icons">keyboard_arrow_left</span>Back to
              {{ type === 'checkout' ? 'Address' : 'Locations' }}
            </a>
          </div>
          <div class="addressBoxWrap">
            <ul>
              <li>

                <input-component
                  custom="true"
                  :error="checkValidation('latitude') || checkValidation('longitude')"
                  errorMessage="Please Select Location From Above Map.  Click on 'Locate Me' button."
                >
                  <GoogleMap @mapHandler="onClickAddMap"></GoogleMap>
                </input-component>

                <div class="contentIn">
                  <div class="editAddress">
                    <form autocomplete="on">
                      <div class="formField">
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field :class="{
                                'md-invalid':
                                  this.submitted &&
                                  !$v.form.contactname.required
                              }">
                              <label>Name</label>
                              <md-input
                                v-model="form.contactname"
                                required
                              ></md-input>
                              <span class="md-error">Name is Required</span>
                            </md-field>
                          </div>

                          <div class="md-layout-item col-sm-6  fl mb_pr_pl ">
                            <input-component
                              :class="{'tel-error': checkValidation('contactnumber')}"
                              custom="true"
                              :error="checkValidation('contactnumber')"
                              errorMessage="Contact Number is required."
                            >
                              <vue-tel-input
                                v-model="form.contactnumber"
                                placeholder="Contact Number"
                                v-bind="bindTelProps"
                              ></vue-tel-input>
                            </input-component>
                          </div>
                        </div>
                        <div class="col-sm-12 p-0 fl ">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.roomno.required
                              }">
                              <label>Room no.</label>
                              <md-input
                                v-model="form.roomno"
                                required
                              ></md-input>
                              <span class="md-error">Room No. is Required</span>
                            </md-field>
                          </div>
                          <div class="md-layout-item col-sm-6 fl mb_pr_pl mob_mt">
                            <md-field :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.building.required
                              }">
                              <label>Building</label>
                              <md-input
                                v-model="form.building"
                                required
                              ></md-input>
                              <span class="md-error">Building Name is Required</span>
                            </md-field>
                          </div>
                        </div>
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.landmark.required
                              }">
                              <label>Landmark</label>
                              <md-input
                                v-model="form.landmark"
                                required
                              ></md-input>
                              <span class="md-error">Landmark is Required</span>
                            </md-field>
                          </div>
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.street.required
                              }">
                              <label>Street</label>
                              <md-input
                                name="street"
                                v-model="form.street"
                                required
                              ></md-input>
                              <span class="md-error">Street is Required</span>
                            </md-field>
                          </div>
                        </div>

                        <div class="col-sm-12 p-0 fl">
                          <input-component
                            class="col-sm-6 fl mb_pr_pl mb-field"
                            label="Country *"
                            custom="true"
                            :size="50"
                            :error="checkValidation('country')"
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
                            class="col-sm-6  fl mb_pr_pl mb-field"
                            label="City *"
                            custom="true"
                            :size="50"
                            :error="checkValidation('city')"
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
                            class="col-sm-6 fl mb_pr_pl mb-field"
                            label="Area *"
                            custom="true"
                            :size="50"
                            :error="checkValidation('area')"
                          >
                            <vSelect
                              v-model="form.area"
                              :reduce="element => element.location"
                              label="location"
                              :options="areasList"
                              :placeholder="areaStatus"
                              taggable
                              push-tags
                            >
                            </vSelect>
                          </input-component>
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field :class="{
                                'md-invalid':
                                  this.submitted &&
                                  !$v.form.postal_code.required
                              }">
                              <label>Emirates Code</label>
                              <md-input
                                v-model="form.postal_code"
                                required
                              ></md-input>
                              <span class="md-error">Please Add Emirates Code.</span>
                            </md-field>
                          </div>
                        </div>

                        <div class=" addressLabel">
                          <label :class="{
                              'extra-invalid':
                                this.submitted &&
                                (!$v.form.available_from_time.required ||
                                  !$v.form.available_to_time.required)
                            }">Select Time Slot:</label>
                        </div>
                        <div class="col-sm-12 p-0 fl">
                          <input-component
                            type="time"
                            v-model="form.available_from_time"
                            label="Available From *"
                            class="col-sm-6  fl mb_pr_pl mb-field"
                            :error="checkValidation('available_from_time')"
                          >
                          </input-component>
                          <input-component
                            label="Available Uptill *"
                            type="time"
                            v-model="form.available_to_time"
                            class="col-sm-6  fl mb_pr_pl mb-field"
                            :error="checkValidation('available_to_time')"
                          >
                          </input-component>

                        </div>
                        <div
                          class=" addressLabel label_box"
                          v-if="type === 'checkout'"
                        >
                          <label :class="{
                              'extra-invalid':
                                this.submitted && !$v.form.type.required
                            }">Address Label</label>
                          <md-radio
                            v-model="form.type"
                            value="home"
                          >Home</md-radio>

                          <md-radio
                            v-model="form.type"
                            value="work"
                            class="small-padd"
                          >Work</md-radio>
                        </div>

                        <div class="btnWrap   mt-3">
                          <md-button
                            class="md-button md-raised md-accent saveAddress"
                            @click="addNewAddress()"
                          >
                            <span>{{
                              this.loading ? "Please Wait.." : "Add Address"
                            }}</span>
                          </md-button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoogleMap from "../../../pages/newsfeed/google-map";
import axios from "axios";
import { Datetime } from "vue-datetime";
import { required } from "vuelidate/lib/validators";

import vSelect from "vue-select";
import inputComponent from "@/components/ui-components/input.vue"
import countries from "@/helpers/country.js"
import utils from "@/helpers/utils.js"

export default {
  components: { GoogleMap, Datetime, inputComponent, vSelect },
  mixins: [countries, utils],
  props: {
    // Types - 1. checkout, 2. stock_location
    type: {
      type: String,
      default: 'checkout'
    },
    update_stock_location: {
      type: Object,
      default: () => ({})
    },
    // For Updating Personal Checkout Address
    update_address: {
      type: Object,
      default: () => ({})
    },
    action_name: {
      type: String,
      default: 'add_checkout_address'
    },
  },
  data () {
    return {
      showMaperror: false,
      isAddressConfirmed: true,
      initial: "Initial Value",
      radio: "accent",
      array: [],
      submitted: false,
      loading: false,
      submittedSuccessfully: false,
      form: {
        type: "",
        contactname: "",
        contactnumber: "",
        building: "",
        roomno: "",
        area: "",
        street: "",
        landmark: "",
        city: "",
        country: "",
        postal_code: "",
        latitude: "",
        longitude: "",
        available_from_time: "",
        available_to_time: "",

        // Only for Updating the Stock Location
        stock_location_id: "",
        // Only for Updating the Checkout Address
        addressid: ""
      },
      bindTelProps: {
        mode: "international",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,

        required: false,
        enabledCountryCode: false,
        enabledFlags: true,

        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "off",

        maxLen: 15,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: false
        }
      },

      //Only when Updating the address
      updateDetails: {}
    };
  },
  validations () {
    const form = {
      contactname: { required },
      contactnumber: { required },
      building: { required },
      roomno: { required },
      area: { required },
      street: { required },
      landmark: { required },
      city: { required },
      country: { required },
      postal_code: { required },
      latitude: { required },
      longitude: { required },
      available_from_time: { required },
      available_to_time: { required },
    }

    if (this.type === 'checkout') {
      form.type = { required }
    }

    return {
      form
    }
  },

  mounted () {
    console.log(this.update_stock_location)
    console.log(this.update_address.id)
    if (this.update_stock_location.id || this.update_address.id) {
      console.log("User is editting Address")
      this.update_address.id ? this.updateDetails = this.update_address : this.updateDetails = this.update_stock_location
      this.fetchAndAssign(this.updateDetails.details_url, { stock_location_id: this.updateDetails.id, addressid: this.updateDetails.id }, 'form');
    }
    // this.loadCountries();
  },
  methods: {
    async addNewAddress () {
      this.loading = true;
      this.submitted = true;

      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {

        //Checking whether the form is used to update the address, as we are directly filling from the response data
        if (this.updateDetails.id) {
          this.form.stock_location_id = this.updateDetails.id
          this.form.addressid = this.updateDetails.id
        }

        this.$store
          .dispatch(this.action_name, this.form)
          .then(response => {
            this.loading = false;
            if (response.success) {
              this.submittedSuccessfully = true;
              this.$swal.fire(this.$helpers.successPopup(response.message));
              this.back();
            }
          })
          .catch(error => {
            this.$swal.fire(
              this.$helpers.errorPopup("Address Not Added. Please Try Again.")
            );
          });
      }
    },
    // async countrySelected() {
    //   try {
    //     this.citiesList = [];
    //     this.citiesStatus = "Loading...";
    //     const parentid = await this.getCountryId();
    //     const rawResponse = await axios.post("api_country", {
    //       parentid: `${parentid.pk_countries_id}`
    //     });
    //     const response = await rawResponse.data;
    //     if (response.success) {
    //       this.citiesList = response.result;
    //     } else {
    //       this.citiesList = [];
    //       this.citiesStatus = "No Cities Found";
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // citySelected() {
    //   try {
    //     const postal_code = this.getPostalCodeObj();
    //     this.form.postal_code = postal_code.code;
    //   } catch (error) {
    //     console.log("No City Selected or City Postal Code Not Found");
    //   }
    // },
    // getPostalCodeObj() {
    //   return this.$helpers.selectObjectFromArray(
    //     this.citiesList,
    //     "location",
    //     this.form.city
    //   );
    // },
    // getCountryId() {
    //   return this.$helpers.selectObjectFromArray(
    //     this.countriesList,
    //     "name",
    //     this.form.country
    //   );
    // },
    // async loadCountries() {
    //   try {
    //     const rawResponse = await axios.post("api_country");
    //     const response = await rawResponse.data;
    //     this.countriesList = response.result;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    datePlaceholder (whichOne) {
      if (whichOne == "from") {
        return this.form.available_from_time
          ? this.available_from_time
          : "Available From";
      } else {
        return this.form.available_from_time
          ? this.available_from_time
          : "Available Upto";
      }
    },
    back () {
      console.log("Clicked Back Button");
      this.$emit("backToAddress");
      this.$emit("getCheckOutAddress");
    },
    onClickAddMap (value) {
      console.log(value);
      const data = value.address_components;

      this.form.latitude = value.geometry.location.lat();
      this.form.longitude = value.geometry.location.lng();

      if (data.length == 1) {
      } else if (data.length == 2) {
        this.form.city = data[0].long_name;
        this.form.country = data[1].long_name;
      } else if (data.length == 3) {
        this.form.area = data[0].long_name;
        this.form.city = data[1].long_name;
        this.form.country = data[2].long_name;
      } else if (data.length == 4) {
        this.form.area = data[0].long_name;
        this.form.street = data[1].long_name;
        this.form.city = data[2].long_name;
        this.form.country = data[3].long_name;
      } else if (data.length == 5) {
        this.form.area = data[0].long_name;
        this.form.street = data[1].long_name;
        this.form.city = data[3].long_name;
        this.form.country = data[4].long_name;
      } else if (data.length == 6) {
        this.form.area = data[1].long_name;
        this.form.street = data[2].long_name;
        this.form.city = data[4].long_name;
        this.form.country = data[5].long_name;
      }
      //else if (data.length == 3) {
      //   this.form.city = data[1];
      //   this.form.country = data[2];
      // } else if (data.length == 4) {
      //   this.form.city = data[2];
      //   this.form.country = data[3];
      // }

      // if()
    }
  }
};
</script>
<style scoped>
.mb-field {
  /* margin-bottom */
  margin: 4px 0 25px;
}
.label_box label {
  float: left;
  margin-top: 20px;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
}
.extra-invalid {
  color: var(--md-theme-default-fieldvariant, #ff1744);
  border-color: var(--md-theme-default-fieldvariant, #ff1744) !important;
  border-style: solid !important;
}

.vue-tel-input,
.vdatetime-input {
  border: none;
  display: flex;
  text-align: left;
  margin-top: 8px;
  border-radius: 0px;
  border-bottom: 1px solid #919191;
}

.tel-error .vue-tel-input {
  border-bottom: 1px solid red !important;
}
.close-error {
  font-size: 14px;
  cursor: pointer;
}
.error {
  position: absolute;
  top: 62px;
  left: 2.5%;
  right: 2.5%;
  background-color: rgba(253, 236, 236, 0.97);
  color: rgb(203, 117, 128);
  box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 3px 0px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(251, 211, 216);
  border-image: initial;
}
.error .inner {
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 11px;
}
.back-to-address {
  font-size: 13px;
  cursor: pointer;
  color: #555 !important;
  font-weight: 300;
}
.back-to-address span {
  font-size: 20px;
}
.headType {
  margin: 40px 0 30px;
  line-height: 34px;
  font-size: calc(45rem / 16);
  font-weight: 300;
}
.full-wrap {
  width: 100%;
  height: auto;
}
.sectionFlow {
  width: 100%;
  background: #ffffff;
  max-width: 801px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding: 17px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.cart-head {
  padding-bottom: 17px;
  font-size: 1.17em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: #555;
  font-family: "ProximaBold";
}
.changeWrap {
  display: flex;
  align-items: flex-start;
  margin-top: 51px;
}
.contentIn {
  padding: 0px;
  background-color: #fff;
  padding-bottom: 30px;
}
.changeTitle {
  font-size: 15px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 16px;
}
.currentLoc {
  height: 45px;
}
.ktPulse {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.ktPulse i {
  margin: 0 auto !important;
}
.txtbtn {
  position: relative;
  top: -8px;
}
.map.kt-pulse__ring {
  border-color: #ffffff;
}
.lauoutWrap {
  display: flex;
  justify-content: space-between;
}
.formField {
  width: 100%;
}
.saveAddress {
  height: 33px;
  padding-left: 10px;
  padding-right: 10px;
}
.btnSmall {
  height: 32px;
  border: 1px solid #f47320;
  justify-content: center;
  align-items: center;
  display: flex;
  text-transform: capitalize;
  font-size: 14px;
}
.btnSmall span {
  font-size: 22px;
  margin-right: 0.1em;
}
.addressBoxWrap {
  width: 100%;
  position: relative;
}
.addressBoxWrap ul li {
  width: 100%;
  margin-bottom: -1px;
}
.chooseAddress {
  padding: 16px 24px 16px;
  margin-bottom: 1.1em;
  justify-content: space-between;
}
.headWrapp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.7em;
}
.head {
  font-weight: 600;
}
.change {
  height: 31px;
  color: #f47320;
  padding: 0;
  min-width: 65px;
}
.deliverBtn {
  padding: 1px 24px 16px;
  margin-left: 2.6em;
}
.deliverBtn button {
  min-width: 141px !important;
}
.addressLabel label {
  font-size: 13px;
  font-weight: 600;
  margin-right: 1.1em;
  margin-left: 15px;
}
.btnWrap {
  margin: auto;

  width: fit-content;

  margin-top: 30px;
}

.changeWrap {
  margin-top: 40px;
}

.margin_top {
  margin-top: 5px;
}


@media screen and (max-width: 768px) {
.changeWrap{
    margin-top: 0;
}
.p_zero{padding: 0px;}
.changeWrap{
    width: 103%;
}
.cart-head span{font-size: 13px;}
.cart-head{
    padding-bottom: 0px;}
}


@media screen and (max-width: 600px) {
  .mb_pr_pl {
    padding-left: 0px;
    padding-right: 0px;
  }

  .mob_width_billing {
    width: 47%;
  }
  .mr_width {
    margin-left: 20px;
  }
  .input_mobile {
    width: 40px !important;
  }

  .changeWrap {
    padding-left: 5px;
    padding-right: 5px;
  }
  .cart-head {
    padding-bottom: 12px;
    font-size: 14px;
  }

  .sectionFlow {
    padding: 10px;
    margin-bottom: 0px;
  }

  .addressLabel label {
    margin-left: 0px;
  }

  .changeWrap {
    margin-top: 5px;
  }

  .md-field {
    margin: 4px 0 18px !important;
  }
  .btnWrap.justify--center.mt-3 {
    margin: auto;

    width: fit-content;

    margin-top: 30px;
  }
  .mob_mt {
    margin-top: 20px;
  }

  .contentIn {
    padding-bottom: 0px;
  }

  .addressBoxWrap ul li {
    border-bottom: none;
  }
.changeWrap {
    width: 100%;
}


}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .mr_width {
    margin-left: 23px;
  }
}

@media screen and (max-width: 300px) {
  .changeWrap {
    padding-left: 6px;
    padding-right: 46px;
    margin-top: 6px;
  }
  .mob_width_billing {
    width: 46%;
  }
  .addressLabel label {
    font-size: 11px;
    margin-left: 0px;
    margin-top: 13px;
  }
  .btnWrap {
    margin-top: 3px !important;
  }
  .sectionFlow {
    padding: 8px;
    margin-bottom: 0px;
  }

  .cart-head {
    font-size: 13px;
  }

  .label_box {
    display: inline-flex;
  }

  .md-radio {
    margin: 10px 16px 10px 0px !important;
  }
}
</style>
