<template>
  <div>
    <div class="col-sm-12 mob_size wrapper_order_table">
      <p class="info" v-if="user_type === 'company'">
        You cannot alter your company name unless if you submit same trade
        licence with new name to edit@uaect.com
      </p>
      <section>
        <div class="col-sm-12 col-md-6 p-0">
          <md-field>
            <label class="form-label">
              {{ user_type === "company" ? "Company Name" : "Trade Name" }}
            </label>
            <md-input
              :disabled="user_type === 'company'"
              v-model="form.trade_name_en"
              required
            ></md-input>
          </md-field>
        </div>
      </section>
      <section>
        <div class="head col-sm-12 p-0 margin_text">Account Incharge</div>
        <div class="col-sm-12 p-0">
          <div class="row">
            <div class="col-sm-12 col-md-4 fl">
              <md-field
                :class="{
                  'md-invalid':
                    this.submitted && !$v.form.first_name_en.required,
                }"
              >
                <label>First Name</label>
                <md-input v-model="form.first_name_en" required></md-input>
                <span class="md-error">First Name is Required</span>
              </md-field>
            </div>
            <div class="col-sm-12 col-md-4 fl">
              <md-field
                :class="{
                  'md-invalid':
                    this.submitted && !$v.form.last_name_en.required,
                }"
              >
                <label class="form-label">Last Name</label>
                <md-input required v-model="form.last_name_en"></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="col-sm-12 col-md-4 fl selectInput">
              <p class="label">Select Gender</p>
              <v-select
                v-model="form.gender"
                :options="['male', 'female', 'others']"
                placeholder="Select Gender"
              ></v-select>

              <transition name="fade">
                <p
                  class="error"
                  v-if="this.submitted && !$v.form.gender.required"
                >
                  Gender is required
                </p>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="col-sm-12 p-0">
          <div class="row">
            <div class="col-sm-12 col-md-4 fl wrap_mobile margin_mob">
              <p class="label">Mobile Number *</p>
              <template>
                <vue-tel-input
                  :class="{
                    'extra-invalid': this.submitted && !$v.form.mobile.required,
                  }"
                  v-model="form.mobile"
                  placeholder="Mobile Number"
                  :enabledCountryCode="true"
                  :validCharactersOnly="true"
                ></vue-tel-input>
              </template>

              <transition name="fade">
                <p
                  class="error-num"
                  v-if="this.submitted && !$v.form.mobile.required"
                >
                  Mobile Number is required
                </p>
              </transition>
            </div>
            <div class="col-sm-12 col-md-4 fl wrap_mobile">
              <p class="label">Phone Number *</p>
              <template>
                <vue-tel-input
                  :class="{
                    'extra-invalid': this.submitted && !$v.form.phone.required,
                  }"
                  v-model="form.phone"
                  placeholder="Phone Number"
                  :enabledCountryCode="true"
                  :validCharactersOnly="true"
                ></vue-tel-input>
              </template>

              <transition name="fade">
                <p
                  class="error-num"
                  v-if="this.submitted && !$v.form.phone.required"
                >
                  Phone Number is required
                </p>
              </transition>
            </div>
            <div class="col-sm-12 col-md-4 fl">
              <md-field>
                <label>Website</label>
                <md-input v-model="form.website"></md-input>
              </md-field>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="head col-sm-12 p-0">Other Details</div>
        <div class="col-sm-12 p-0 input-grp">
          <div class="row">
            <div class="col-sm-12 col-md-4 fl selectInput">
              <p class="label">Country *</p>
              <v-select
                v-model="form.country"
                :reduce="(element) => element.name"
                label="name"
                :options="currencies"
                placeholder="Select Country"
                @input="countrySelected"
              />
              <transition name="fade">
                <p
                  class="error"
                  v-if="this.submitted && !$v.form.country.required"
                >
                  Country is required
                </p>
              </transition>
            </div>
            <div class="col-sm-12 col-md-4 fl">
              <p class="label">City *</p>
              <v-select
                v-model="form.city"
                :reduce="(element) => element.location"
                label="location"
                :options="citiesList"
                :placeholder="citiesStatus"
              >
              </v-select>
              <transition name="fade">
                <p
                  class="error"
                  v-if="this.submitted && !$v.form.city.required"
                >
                  Country is required
                </p>
              </transition>
            </div>
            <div class="col-sm-12 col-md-4 fl selectInput">
              <p class="label">Nationality *</p>
              <v-select
                v-model="form.nationality"
                :reduce="(element) => element.name"
                label="name"
                :options="currencies"
                placeholder="Select Nationality"
              />
              <transition name="fade">
                <p
                  class="error"
                  v-if="this.submitted && !$v.form.nationality.required"
                >
                  Nationality is required
                </p>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="head col-sm-12 p-0">Activities *</div>
        <div class="md-layout mt-4">
          <div class="md-layout-item md-size-100">
            <v-select
              v-model="form.activities"
              multiple
              :options="autocompleteItems"
              @search="onSearch"
              placeholder="Choose Activities eg: Shipping, Trade"
            ></v-select>
          </div>
          <div class="md-layout-item md-size-100">
            <transition name="fade">
              <p
                class="error"
                v-if="this.submitted && !$v.form.activities.required"
              >
                Activities are required
              </p>
            </transition>
          </div>
        </div>
      </section>

      <section>
        <div class="md-layout mt-4">
          <div class="md-layout-item md-size-100">
            <div class="head p-0">About Us</div>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field
              :class="{
                'md-invalid': this.submitted && !$v.form.established.required,
              }"
            >
              <label>Established In</label>
              <md-input
                v-model="form.established"
                type="number"
                required
              ></md-input>
              <span class="md-error">Established In is Required</span>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100">
            <h4 class="label">Description *</h4>
            <vue-editor
              :editor-toolbar="customToolbar"
              v-model="form.description_en"
            ></vue-editor>
          </div>
        </div>
      </section>

      <div class="btn-wrap text-center">
        <loaderButton
          class="padding_button"
          @click="submitForm"
          name="Save Changes"
          :loading="loading"
        ></loaderButton>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import debounce from "lodash.debounce";
import uniqby from "lodash.uniqby";
import map from "lodash.map";
import { required } from "vuelidate/lib/validators";

import country from "@/helpers/country.js";
import { mapState } from 'vuex'

import { VueEditor } from "vue2-editor";
import loaderButton from "@/components/ui-components/loader-button.vue";
import inputComponent from "@/components/ui-components/input.vue";
export default {
  mixins: [country],
  components: { loaderButton, VueEditor, inputComponent },
  data () {
    return {

      autocompleteItems: [],
      currencies: [],
      citiesList: [],
      citiesStatus: "Loading Cities....",
      submitted: false,
      loading: false,
      submittedSuccessfully: false,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],

      ],
      form: {
        city: "",
        country: "",
        cover: null,
        description_en: "<h1>Some initial content</h1>",
        established: "",
        first_name_en: "",
        gender: "",
        last_name_en: "",
        logo: "",
        mobile: "",
        nationality: "",
        phone: "",
        trade_name_en: "",
        website: "",
        activities: [],
      }
    };
  },
  validations: {
    form: {
      first_name_en: { required },
      last_name_en: { required },
      gender: { required },
      city: { required },
      country: { required },
      nationality: { required },
      phone: { required },
      mobile: { required },
      activities: { required },
      established: { required },
    }
  },
  mounted () {
    this.getBasicInfo();
    this.postRequest("api_country", {}, "currencies");

  },
  // watch: {
  //   tag: "initItems",
  //   country () {
  //     this.countrySelected(this.form.country);
  //   }
  // },
  computed: {
    // country () {
    //   return this.form.country;
    // },
    ...mapState({
      user_type: state => state.user.profile.profile.user_type,
      userid: state => state.user.profile.profile.userid
    })
  },
  methods: {
    async submitForm () {
      this.loading = true;
      this.submitted = true;
      console.log(this.form);
      await this.$v.$touch();
      if (await this.$v.$invalid) {
        this.loading = false;
        return;
      }
      try {
        const response = await axios.post("/profile/info/update", this.form);
        if (await response.data.success) {
          this.loading = false;
          await this.$swal.fire(
            this.$helpers.successPopup("Your Info has been updated.")
          );
        } else {
          this.loading = false;
          await this.$swal.fire(
            this.$helpers.errorPopup("Error Updating Info.")
          );
        }
      } catch (error) {
        this.loading = false;
        await this.$swal.fire(this.$helpers.errorPopup("Error Updating Info."));
      }
    },
    async getBasicInfo () {
      const response = await axios.post("profile", {
        profileid: this.userid
      });
      if (!response.data.success) return;
      this.form = response.data.profile;
      // Prefill Activities Tab
      this.form.activities = response.data.profile.activities;
    },
    // async countrySelected (id) {
    //   console.log(id);
    //   try {
    //     this.citiesList = [];
    //     this.citiesStatus = "Loading...";
    //     // const parentid = await this.getCountryId()
    //     if (!id) return;
    //     const rawResponse = await axios.post("api_country", { parentid: id });
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

    // async loadCountries () {
    //   try {
    //     const rawResponse = await axios.post("api_country");
    //     const response = await rawResponse.data;
    //     this.countriesList = response.result;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    onSearch (search, loading) {
      loading(true);
      if (search.length < 2) {
        loading(false);
        return;
      }
      this.search(loading, search, this);
    },

    search: debounce(async (loading, search, vm) => {
      try {
        const res = await axios.post("/api_activities", { name: search });
        const { success, result } = await res.data;
        if (success) {
          console.log(result);
          vm.autocompleteItems = await map(uniqby(result, "id"), "title");
          loading(false);
        } else {
          loading(false);
        }
      } catch (error) {
        loading(false);
      }
    }, 400),
    update (newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems () {
      if (this.tag.length < 2) return;
      this.$store
        .dispatch("GET_ACTIVITIES", this.tag)
        .then(response => {
          this.autocompleteItems = response.data.result.map(a => {
            return { text: a.title };
          });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
<style scoped>
/* LOADING */

.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}
.label {
  padding-bottom: 5px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.loading-1 {
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  width: 50px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrap_mobile {
  /* margin-top: 22px; */
  margin-top: 4px;
}

.mob_size {
  margin-top: 30px;
}

.loading-1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px solid #ff5722;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s ease infinite;
  z-index: 10;
}
.loading-1:before {
  z-index: 5;
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px dashed #fff;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s linear infinite;
}

.md-field.md-has-textarea:not(.md-autogrow).md-focused .md-textarea,
.md-field.md-has-textarea:not(.md-autogrow).md-has-value .md-textarea {
  padding-top: 0px;
}

element.style {
}
.md-field {
  margin: 4px 0 25px;
}
.md-field {
  padding-top: 13px;
}
@keyframes loading1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* LOADING */
.error-num {
  color: #ff1744;
  margin-top: 10px;
  position: absolute;
}
.error {
  color: #ff1744;
  margin-top: 5px;
}
.input-grp {
  margin-top: 20px;
}
input,
select {
  outline: none;
}
.selectInput select {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 10px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 100%;
  margin-top: 8px;
}
.activities {
  width: 100%;
  max-width: 100%;
}
section {
  margin-bottom: 1.5em;
}
section .head col-sm-12 p-0 {
  font-size: 14px;
  font-weight: 600;
}
.head {
  font-weight: 600;
}
.info {
  text-align: center;
  color: #ff5722;
}
.btn-wrap .md-button {
  height: 37px;
}
section .area {
  margin-top: 16px;
}

@media screen and (max-width: 768px) {
  .info {
    line-height: 20px;
  }
  .mob_size {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 600px) {
  .wrap_mobile {
    margin-top: 10px;
  }
  .margin_mob {
    margin-bottom: 20px;
  }

  .head {
    font-weight: 600;
    margin-top: -15px;
    margin-bottom: 15px;
  }

  .margin_text {
    margin-top: 20px;
  }

  .info {
    margin-bottom: 17px;
  }
  .margin_portfolio {
    margin-top: 25px;
    margin-bottom: 10px;
  }

  .margin_textarea {
    margin-top: -20px !important;
  }

  .padding_button {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }
  .info {
    line-height: 17px;
    font-size: 12px;
  }

  .mob_size {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 320px) {
  .head {
    font-weight: 500;
  }
}
</style>
