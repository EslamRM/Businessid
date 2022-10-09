<template>
  <div>
    <div class="container">
      <div class="changeWrap">
        <div class="sectionFlow">
          <div class="cart-head">
            <span>Delivery Address</span>
            <a
              @click="$router.go(-1)"
              class="d-flex align-items-center back-to-address"
            >
              <span class="material-icons">keyboard_arrow_left</span>Back to
              Address
            </a>
          </div>
          <div class="addressBoxWrap">
            <ul>
              <li>
                <GoogleMap @mapHandler="onClickAddMap"></GoogleMap>
                <!-- <div class="d-flex align-center chooseAddress">
                  <md-radio v-model="radio" value="Credit Card">
                    <div class="contentBox">
                      <div class="headWrapp">
                        <div class="head">
                          John Doe <span class="ml-2">056826326</span>
                        </div>
                      </div>
                      <p>Mirdif Garhoud, 7th street, Garhoud, 204</p>
                    </div>
                  </md-radio>
                </div>-->
                <div class="contentIn">
                  <div class="editAddress">
                    <!-- <div class="changeTitle">Edit Address</div> -->
                    <!-- <md-button class="md-button md-raised md-accent currentLoc">
                      <div class="ktPulse pos-rel">
                        <i class="md-icon md-icon-font">gps_fixed</i>
                        <span class="map kt-pulse__ring"></span>
                      </div>
                      <span class="txtbtn">Use my current location</span>
                    </md-button>-->
                    <form autocomplete="on">
                      <div class="formField">
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted &&
                                  !$v.form.contactname.required
                              }"
                            >
                              <label>Name</label>
                              <md-input
                                v-model="form.contactname"
                                required
                              ></md-input>
                              <span class="md-error">Name is Required</span>
                            </md-field>
                          </div>
                          <div
                            class="md-layout-item col-sm-6  fl mb_pr_pl margin_top"
                          >
                            <template>
                              <vue-tel-input
                                :class="{
                                  'extra-invalid':
                                    this.submitted &&
                                    !$v.form.contactnumber.required
                                }"
                                v-model="form.contactnumber"
                                placeholder="Mobile"
                                v-bind="bindTelProps"
                              ></vue-tel-input>
                            </template>

                            <div
                              v-if="submitted && $v.form.contactnumber.$error"
                              class="invalid-feedback"
                            >
                              <span v-if="!$v.form.contactnumber.required"
                                >Mobile is required</span
                              >
                            </div>
                          </div>
                          <!-- <div class="md-layout-item md-size-45 d-inline-flex">
                            <md-field>
                              <label>Mobile Number</label>
                              <vue-tel-input v-model="form.contactnumber"></vue-tel-input>
                            </md-field>
                          </div>-->
                        </div>
                        <div class="col-sm-12 p-0 fl">
                          <div
                            class="md-layout-item col-sm-6 fl mb_pr_pl mob_mt"
                          >
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.building.required
                              }"
                            >
                              <label>Building</label>
                              <md-input
                                v-model="form.building"
                                required
                              ></md-input>
                              <span class="md-error"
                                >Building Name is Required</span
                              >
                            </md-field>
                          </div>
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.roomno.required
                              }"
                            >
                              <label>Room no.</label>
                              <md-input
                                v-model="form.roomno"
                                required
                              ></md-input>
                              <span class="md-error">Room No. is Required</span>
                            </md-field>
                          </div>
                        </div>
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.area.required
                              }"
                            >
                              <label>Area</label>
                              <md-input v-model="form.area" required></md-input>
                              <span class="md-error">Area is Required</span>
                            </md-field>
                          </div>
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.street.required
                              }"
                            >
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
                        <!-- <div class="lauoutWrap">
                          <div class="md-layout-item md-size-100 d-inline-flex">
                            <md-field>
                              <label>Address (Area and Street)</label>
                              <md-textarea v-model="initial"></md-textarea>
                            </md-field>
                          </div>
                        </div>-->
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.country.required
                              }"
                            >
                              <md-select
                                name="country"
                                v-model="form.country"
                                placeholder="Country"
                                @md-selected="countrySelected()"
                                md-dense
                                reuquired
                              >
                                <md-option
                                  v-for="country in countriesList"
                                  :value="country.name"
                                  :key="country.id"
                                  >{{ country.name }}</md-option
                                >
                              </md-select>
                              <span class="md-error">Country is Required</span>
                            </md-field>
                          </div>

                          <div class="md-layout-item col-sm-6 fl mb_pr_pl">
                            <md-field
                              v-if="citiesList.length > 0"
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.city.required
                              }"
                            >
                              <md-select
                                name="city"
                                @md-selected="citySelected()"
                                v-model="form.city"
                                placeholder="Select City"
                                md-dense
                                required
                              >
                                <md-option
                                  v-for="city in citiesList"
                                  :value="city.location"
                                  :key="city.id"
                                  >{{ city.location }}</md-option
                                >
                              </md-select>
                              <span class="md-error">City is Required</span>
                            </md-field>
                            <md-field v-else>
                              <label>City</label>
                              <md-input
                                disabled
                                :placeholder="citiesStatus"
                              ></md-input>
                            </md-field>
                          </div>
                        </div>
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted && !$v.form.landmark.required
                              }"
                            >
                              <label>Landmark</label>
                              <md-input
                                v-model="form.landmark"
                                required
                              ></md-input>
                              <span class="md-error">Landmark is Required</span>
                            </md-field>
                          </div>
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted &&
                                  !$v.form.postal_code.required
                              }"
                            >
                              <label>Emirates Code</label>
                              <md-input
                                v-model="form.postal_code"
                                required
                              ></md-input>
                              <span class="md-error"
                                >Please add Emirates code.</span
                              >
                            </md-field>
                          </div>
                        </div>
                        <div class=" addressLabel">
                          <label
                            :class="{
                              'extra-invalid':
                                this.submitted &&
                                (!$v.form.available_from_time.required ||
                                  !$v.form.available_to_time.required)
                            }"
                            >Select Time Slot:</label
                          >
                        </div>
                        <div class="col-sm-12 p-0 fl">
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted &&
                                  !$v.form.available_from_time.required
                              }"
                            >
                              <i
                                class="material-icons"
                                style="padding-right: 10px; color: #ff5722"
                                >access_time</i
                              >

                              <datetime
                                type="time"
                                v-model="form.available_from_time"
                                use12-hour
                                class="theme-orange"
                                placeholder="Available From"
                              ></datetime>
                            </md-field>
                          </div>
                          <div class="md-layout-item col-sm-6  fl mb_pr_pl">
                            <md-field
                              :class="{
                                'md-invalid':
                                  this.submitted &&
                                  !$v.form.available_to_time.required
                              }"
                            >
                              <i
                                class="material-icons"
                                style="padding-right: 10px;  color: green"
                                >access_time</i
                              >
                              <datetime
                                type="time"
                                v-model="form.available_to_time"
                                use12-hour
                                class="theme-orange"
                                placeholder="Available Upto"
                              ></datetime>
                            </md-field>
                          </div>
                        </div>
                        <div class=" addressLabel label_box">
                          <label
                            :class="{
                              'extra-invalid':
                                this.submitted && !$v.form.type.required
                            }"
                            >Address Label</label
                          >
                          <md-radio v-model="form.type" value="home"
                            >Home</md-radio
                          >

                          <md-radio
                            v-model="form.type"
                            value="work"
                            class="small-padd"
                            >Work</md-radio
                          >
                        </div>

                        <div
                          v-if="this.submitted && !$v.form.latitude.required"
                          class="lauoutWrap"
                        >
                          <label
                            class="extra-invalid"
                            style="padding-bottom: 20px"
                          >
                            Please Select Location From Above Map.
                            <p style="color: grey">
                              Click on "Locate Me" button.
                            </p>
                          </label>
                        </div>

                        <div class="btnWrap  mt-3">
                          <md-button
                            class="md-button md-raised md-accent saveAddress"
                            @click="addNewAddress()"
                          >
                            <span>{{
                              this.loading ? "Please Wait.." : "Update Address"
                            }}</span>
                          </md-button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
              <li>
                <!-- <div class="d-flex align-center chooseAddress">
                  <md-radio v-model="radio" value="address 2">
                    <div class="contentBox">
                      <div class="headWrapp">
                        <div class="head">
                          John Doe <span class="ml-2">056826326</span>
                        </div>
                      </div>
                      <p>Rolla Sharjah, Rolla street, 111</p>
                    </div>
                  </md-radio>
                  <md-button class="change">Edit</md-button>
                </div>
                <div class="btnWrap mt-2 deliverBtn">
                  <md-button class="md-button md-raised md-accent saveAddress">
                    <span>Deliver Here</span>
                  </md-button>
                </div>-->
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
export default {
  components: { GoogleMap, Datetime },
  data() {
    return {
      showMaperror: false,
      isAddressConfirmed: true,
      initial: "Initial Value",
      radio: "accent",
      array: [],
      countriesList: [],
      citiesList: [],
      citiesStatus: "Loading Cities....",
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
        available_from_time: "10:00 AM",
        available_to_time: "08:00 PM",
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
      }
    };
  },
  validations: {
    form: {
      type: { required },
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
      available_to_time: { required }
    }
  },
  created() {
    const addressid = this.$route.query.addressid;
    this.addressDetails(addressid);
    this.loadCountries();
  },
  methods: {
    async addressDetails(addressid) {
      try {
        const response = await this.$store.dispatch("address_details", {
          addressid: addressid
        });
        this.form = await response.result;
        this.form.available_from_time = this.form.available_from_time.replace(
          / /g,
          "T"
        );
        this.form.available_to_time = this.form.available_to_time.replace(
          / /g,
          "T"
        );
      } catch (error) {
        console.log(error);
      }
    },
    async addNewAddress() {
      this.loading = true;
      this.submitted = true;

      console.log("submit button clicked!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        this.$store
          .dispatch("update_checkout_address", {
            ...this.form,
            addressid: this.$route.query.addressid
          })
          .then(response => {
            this.loading = false;
            if (response.success) {
              this.submittedSuccessfully = true;
              this.$swal.fire(this.$helpers.successPopup("Address Updated."));
              this.$router.go(-1);
            }
          })
          .catch(error => {
            this.$swal.fire(
              this.$helpers.successPopup(
                "Address Not Update. Please Try Again."
              )
            );
            console.log(error);
          });
      }
    },
    async countrySelected() {
      try {
        this.citiesList = [];
        this.citiesStatus = "Loading...";
        const parentid = await this.getCountryId();
        const rawResponse = await axios.post("api_country", {
          parentid: `${parentid.pk_countries_id}`
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.citiesList = response.result;
        } else {
          this.citiesList = [];
          this.citiesStatus = "No Cities Found";
        }
      } catch (error) {
        console.log(error);
      }
    },
    citySelected() {
      try {
        const postal_code = this.getPostalCodeObj();
        this.form.postal_code = postal_code.code;
      } catch (error) {
        console.log("No City Selected or City Postal Code Not Found");
      }
    },
    getPostalCodeObj() {
      return this.$helpers.selectObjectFromArray(
        this.citiesList,
        "location",
        this.form.city
      );
    },
    getCountryId() {
      return this.$helpers.selectObjectFromArray(
        this.countriesList,
        "name",
        this.form.country
      );
    },
    async loadCountries() {
      try {
        const rawResponse = await axios.post("api_country");
        const response = await rawResponse.data;
        this.countriesList = response.result;
      } catch (error) {
        console.log(error);
      }
    },
    back() {
      console.log("Clicked Back Button");
      this.$emit("backToAddress");
    },
    onClickAddMap(value) {
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
  margin-top: 17px;
  border-radius: 0px;
  border-bottom: 1px solid #919191;
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
  padding: 15px;
  background-color: rgb(247, 249, 254);
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
  border-bottom: 1px solid #f0f0f0;
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
@media screen and (max-width: 600px) {
  .mb_pr_pl {
    padding-left: 0px;
    padding-right: 0px;
  }

  .changeWrap {
    padding-left: 15px;
    padding-right: 15px;
  }
  .cart-head {
    padding-bottom: 12px;
    font-size: 14px;
  }

  .sectionFlow {
    padding: 13px;
  }

  .addressLabel label {
    margin-left: 0px;
  }

  .changeWrap {
    margin-top: 15px;
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
    padding-bottom: 25px;
  }
}
@media screen and (max-width: 300px) {
  .changeWrap {
    padding-left: 10px;
    padding-right: 50px;
    margin-top: 10px;
  }

  .addressLabel label {
    font-size: 12px;
    margin-left: 0px;
  }

  .sectionFlow {
    padding: 8px;
  }

  .cart-head {
    font-size: 13px;
  }

  .label_box {
    display: inline-flex;
  }
}
</style>
