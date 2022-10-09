<template>
  <div>
    <!-- <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table"> -->
    <div class="md-layout wrapper_order_table">
      <div class="col-sm-12 p-0 fl">
        <div class="col-sm-8 p-0 fl title_main">Business Information</div>
      </div>

      <div class="col-sm-6 pl-0 mob_pl fl">
        <md-field
          :class="{
            'md-invalid': checkValidation('businessname'),
          }"
        >
          <label>Business Name</label>
          <md-input v-model="form.businessname" required></md-input>
          <span class="md-error">Business Name is required</span>
        </md-field>
      </div>

      <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
        <md-field
          :class="{
            'md-invalid': checkValidation('email'),
          }"
        >
          <label>E-mail</label>
          <md-input v-model="form.email" required></md-input>
          <span class="md-error">Email is required</span>
        </md-field>
      </div>

      <div class="col-sm-6 pl-0 mob_pl fl margin_mobile">
        <vue-tel-input
          v-model="form.mobile"
          placeholder="Mobile Number"
        ></vue-tel-input>
        <div class="c-forminlineError" v-if="checkValidation('mobile')">
          <span> Mobile is required </span>
        </div>
      </div>

      <div class="col-sm-6 pr-0 mob_pr fl margin_mobile margin_mobile_mob">
        <vue-tel-input
          v-model="form.landline"
          placeholder="Landline"
        ></vue-tel-input>
        <div class="c-forminlineError" v-if="checkValidation('landline')">
          <span> Landline is required </span>
        </div>
      </div>

      <div class="col-sm-6 pl-0 mob_pl fl margin_selection">
        <md-field
          :class="{
            'md-invalid': checkValidation('license_number'),
          }"
        >
          <label>Trade License Number</label>
          <md-input v-model="form.license_number" required></md-input>
          <span class="md-error">License Number is required</span>
        </md-field>
      </div>

      <div class="col-sm-6 pr-0 mob_pr fl margin_selection margin_license_mob">
        <fileInput
          name="Trade License File"
          :filename="file ? file.name : 'Select File'"
          @file-uploaded="fileUploaded"
        >
        </fileInput>
        <div
          class="c-forminlineError"
          v-if="this.submitted && !this.$v.file.required"
        >
          <span> Please Upload File</span>
        </div>
      </div>

      <!-- <div class="col-sm-12 p-0 fl margin_activity">
        <p class="label">Activities *</p>
        <vue-tags-input
          class="tag_input"
          v-model="tag"
          :tags="tags"
          :autocomplete-items="autocompleteItems"
          :add-only-from-autocomplete="true"
          @tags-changed="update"
          placeholder="Choose activities #shipping"
        />
      </div> -->
      <div class="col-sm-12 p-0 fl margin_activity">
        <p class="label">Activities *</p>
        <v-select
          v-model="form.activities"
          multiple
          :options="autocompleteItems"
          @search="onSearch"
        ></v-select>
        <div class="c-forminlineError" v-if="checkValidation('activities')">
          <span> Activities are required </span>
        </div>
      </div>

      <div class="col-sm-6 pl-0 mob_pl fl margin_selection">
        <p class="label">Legal Status *</p>
        <v-select
          v-model="form.legal_status"
          :options="['Civil Company', 'DMCC']"
          placeholder="Legal Status"
        ></v-select>
        <div class="c-forminlineError" v-if="checkValidation('legal_status')">
          <span> Legal Status is required </span>
        </div>
      </div>

      <div class="col-sm-6 pr-0 mob_pr fl margin_selection">
        <p class="label">Issued By *</p>
        <v-select
          v-model="form.issued_by"
          :options="['Local', 'Free Zone']"
          placeholder="Issued By"
        ></v-select>
        <div class="c-forminlineError" v-if="checkValidation('issued_by')">
          <span> Issued By is required </span>
        </div>
      </div>

      <div class="col-sm-6 pl-0 mob_pl fl margin_selection mb-4">
        <p class="label">Country *</p>
        <v-select
          v-model="form.country"
          :reduce="(element) => element.name"
          label="name"
          :options="currencies"
          placeholder="Select Country"
          @input="countrySelected"
        />
        <div class="c-forminlineError" v-if="checkValidation('country')">
          <span> Country is required </span>
        </div>
      </div>

      <div class="col-sm-6 pr-0 mob_pr fl margin_selection mb-4 mob_top">
        <p class="label">City *</p>
        <v-select
          v-model="form.city"
          :reduce="(element) => element.location"
          label="location"
          :options="citiesList"
          :placeholder="citiesStatus"
        >
        </v-select>
        <div class="c-forminlineError" v-if="checkValidation('city')">
          <span> City is required </span>
        </div>
      </div>
    </div>
    <!---------->

    <!---------->
    <!-- Business Owners -->
    <!---------->
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <div class="col-sm-12 pb-2 fl">
        <div class="title_main">Business Owners</div>
      </div>
      <div
        v-for="(owner, id) in $v.form.owners.$each.$iter"
        :key="id"
        class="col-sm-12 col-md-12 col-xl-12 fl owner"
      >
        <div class="col-sm-12 p-0 fl">
          <div class="col-sm-8 p-0 fl title_main">
            Business Owner {{ id + 1 }}
          </div>
          <div class="fr">
            <md-button
              v-if="id != 0"
              class="md-raised md-primary btn_delete"
              @click="form.owners.splice(id)"
            >
              <i class="material-icons action_icon">delete</i>
              <!-----<span>Add New</span>---->
            </md-button>
          </div>
        </div>
        <div class="col-sm-6 pl-0 mob_pl fl">
          <md-field
            :class="{
              'md-invalid': checkValidationCustom('owners', id, 'name'),
            }"
          >
            <label>Name</label>
            <md-input v-model="owner.name.$model" required></md-input>
            <span class="md-error">Name is required</span>
          </md-field>
        </div>
        <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
          <md-field
            :class="{
              'md-invalid': checkValidationCustom('owners', id, 'designation'),
            }"
          >
            <label>Designation</label>
            <md-input v-model="owner.designation.$model" required></md-input>
            <span class="md-error">Designation is required</span>
          </md-field>
        </div>

        <div class="col-sm-6 pl-0 mob_pl fl margin_email">
          <md-field
            :class="{
              'md-invalid': checkValidationCustom('owners', id, 'email'),
            }"
          >
            <label>Designation</label>
            <md-input v-model="owner.email.$model" required></md-input>
            <span class="md-error">Email is required</span>
          </md-field>
        </div>

        <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
          <vue-tel-input
            v-model="owner.mobile.$model"
            placeholder="Mobile"
          ></vue-tel-input>
          <div
            class="c-forminlineError"
            v-if="checkValidationCustom('owners', id, 'mobile')"
          >
            <span> Mobile is required </span>
          </div>
        </div>
        <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
          <p class="label">Country *</p>
          <v-select
            v-model="owner.nationality.$model"
            label="name"
            :options="currencies"
            :reduce="(element) => element.name"
            placeholder="Nationality"
          ></v-select>
          <div
            class="c-forminlineError"
            v-if="checkValidationCustom('owners', id, 'nationality')"
          >
            <span> Nationality is required </span>
          </div>
        </div>

        <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
          <p class="label">&nbsp;</p>
          <md-radio v-model="owner.gender.$model" value="Male"
            >Business man</md-radio
          >
          <md-radio v-model="owner.gender.$model" value="Female"
            >Business woman</md-radio
          >
          <div
            class="c-forminlineError"
            v-if="checkValidationCustom('owners', id, 'gender')"
          >
            <span> Gender is required </span>
          </div>
        </div>

        <div class="col-sm-12 p-0 fl" v-if="id == form.owners.length - 1">
          <div class="fr">
            <md-button
              class="md-raised md-primary btn_register btn_add mrgn_add"
              @click="
                form.owners.push({
                  name: '',
                  designation: '',
                  email: '',
                  mobile: '',
                  nationality: '',
                  gender: '',
                })
              "
            >
              <i data-v-1eb28c36="" class="material-icons">add</i>
              <span>Add New</span>
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <!---------->
    <!-- Managers -->
    <!---------->
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <div class="col-sm-12 pb-2 fl">
        <div class="title_main">Managers</div>
      </div>
      <div
        v-for="(owner, id) in form.managers"
        :key="id"
        class="col-sm-12 col-md-12 col-xl-12 fl owner"
      >
        <div class="col-sm-12 p-0 fl">
          <div class="col-sm-8 p-0 fl title_main">Manager {{ id + 1 }}</div>
          <div class="fr">
            <md-button
              v-if="id != 0"
              class="md-raised md-primary btn_delete"
              @click="form.managers.splice(id)"
            >
              <i class="material-icons action_icon">delete</i>
              <!-----<span>Add New</span>---->
            </md-button>
          </div>
        </div>
        <div class="col-sm-6 pl-0 mob_pl fl">
          <md-field>
            <label>Name</label>
            <md-input v-model="form.managers[id].name" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>
        <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
          <md-field>
            <label>Designation</label>
            <md-input
              v-model="form.managers[id].designation"
              required
            ></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>

        <div class="col-sm-6 pl-0 mob_pl fl margin_email">
          <md-field>
            <label>Email</label>
            <md-input v-model="form.managers[id].email" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>

        <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
          <vue-tel-input
            v-model="form.managers[id].mobile"
            placeholder="Mobile"
          ></vue-tel-input>
        </div>
        <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
          <p class="label">Country *</p>
          <v-select
            v-model="form.managers[id].nationality"
            label="name"
            :options="currencies"
            :reduce="(element) => element.name"
            placeholder="Nationality"
          ></v-select>
        </div>

        <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
          <p class="label">&nbsp;</p>
          <md-radio v-model="form.managers[id].gender" value="Male"
            >Male</md-radio
          >
          <md-radio v-model="form.managers[id].gender" value="Female"
            >Female</md-radio
          >
        </div>

        <div class="col-sm-12 p-0 fl" v-if="id == form.managers.length - 1">
          <div class="fr">
            <md-button
              class="md-raised md-primary btn_register btn_add mrgn_add"
              @click="
                form.managers.push({
                  name: '',
                  designation: '',
                  email: '',
                  mobile: '',
                  nationality: '',
                  gender: '',
                })
              "
            >
              <i data-v-1eb28c36="" class="material-icons">add</i>
              <span>Add New</span>
            </md-button>
          </div>
        </div>
      </div>
    </div>
    <!---------->
    <!-- Person In Charge -->
    <!---------->
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <div class="col-sm-12 pb-2 fl">
        <div class="title_main">Person In Charge</div>
      </div>
      <div
        v-for="(owner, id) in form.persons"
        :key="id"
        class="col-sm-12 col-md-12 col-xl-12 fl owner"
      >
        <div class="col-sm-12 p-0 fl">
          <div class="col-sm-8 p-0 fl title_main">Person {{ id + 1 }}</div>
          <div class="fr">
            <md-button
              v-if="id != 0"
              class="md-raised md-primary btn_delete"
              @click="form.persons.splice(id)"
            >
              <i class="material-icons action_icon">delete</i>
              <!-----<span>Add New</span>---->
            </md-button>
          </div>
        </div>
        <div class="col-sm-6 pl-0 mob_pl fl">
          <md-field>
            <label>Name</label>
            <md-input v-model="form.persons[id].name" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>
        <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
          <md-field>
            <label>Designation</label>
            <md-input
              v-model="form.persons[id].designation"
              required
            ></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>

        <div class="col-sm-6 pl-0 mob_pl fl margin_email">
          <md-field>
            <label>Email</label>
            <md-input v-model="form.persons[id].email" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>

        <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
          <vue-tel-input
            v-model="form.persons[id].mobile"
            placeholder="Mobile"
          ></vue-tel-input>
        </div>
        <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
          <p class="label">Country *</p>
          <v-select
            v-model="form.persons[id].nationality"
            label="name"
            :options="currencies"
            :reduce="(element) => element.name"
            placeholder="Nationality"
          ></v-select>
        </div>

        <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
          <p class="label">&nbsp;</p>
          <md-radio v-model="form.persons[id].gender" value="Male"
            >Male</md-radio
          >
          <md-radio v-model="form.persons[id].gender" value="Female"
            >Female</md-radio
          >
        </div>

        <div class="col-sm-12 p-0 fl" v-if="id == form.persons.length - 1">
          <div class="fr">
            <md-button
              class="md-raised md-primary btn_register btn_add mrgn_add"
              @click="
                form.persons.push({
                  name: '',
                  designation: '',
                  email: '',
                  mobile: '',
                  nationality: '',
                  gender: '',
                })
              "
            >
              <i data-v-1eb28c36="" class="material-icons">add</i>
              <span>Add New</span>
            </md-button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12 p-0 fl">
      <div class="col-sm-6 pl-0 mob_pl fl margin_captcha">
        <!-- <vue-recaptcha
          ref="recaptcha"
          @verify="markRecaptchaAsVerified"
          sitekey="6LcT6KMZAAAAACpBT1I36NaXOaIAd9syHvBKSNW0"
          :loadRecaptchaScript="true"
        ></vue-recaptcha> -->
        <!-- <div class="invalid-feedback">
          {{ pleaseTickRecaptchaMessage }}
        </div> -->
      </div>
      <div class="col-sm-6 p-0 fl">
        <div class="fr mob_width">
          <loaderButton
            @click="submit()"
            name="Register Now"
            class="btn_register"
            :loading="loading"
          ></loaderButton>
          <!-- <md-button class="md-raised md-primary btn_register"
            ><strong>Register Now</strong></md-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";

import axios from "axios";
import { required, minLength, numeric, email } from "vuelidate/lib/validators";
import debounce from "lodash.debounce";
import uniqby from "lodash.uniqby";
import map from "lodash.map";

import utils from "@/helpers/utils.js";
import loaderButton from "@/components/ui-components/loader-button.vue";
import fileInput from "@/components/ui-components/file-input.vue";
export default {
  // uploadFiles is defined in this Mixin
  mixins: [utils],
  components: { VueRecaptcha, loaderButton, fileInput },
  data () {
    return {
      file: null,
      tag: "",
      tags: [],
      autocompleteItems: [],
      currencies: [],
      citiesList: [],
      citiesStatus: "Select City",
      loading: false,
      submitted: false,
      form: {
        businessname: "Abishek LLC",
        email: "test123@gmail.com",
        mobile: "+971589953134",
        landline: "+97158995000",
        license_number: "544545",
        file: null,
        activities: [],
        legal_status: "LLC",
        issued_by: "LOCAL",
        country: "india",
        city: "Mumbai",
        owners: [
          {
            name: "",
            designation: "software developer",
            email: "ishan@gmail.com",
            mobile: "0589953134",
            nationality: "Indian",
            gender: "Male"
          },
          {
            name: "Abishek",
            designation: "software developer",
            email: "abishek@gmail.com",
            mobile: "+91 9099999922",
            nationality: "Indian",
            gender: "Male"
          }
        ],
        managers: [
          {
            name: "ishan",
            designation: "software developer",
            email: "ishan@gmail.com",
            mobile: "0589953134",
            nationality: "Indian",
            gender: "Male"
          },
          {
            name: "Abishek",
            designation: "software developer",
            email: "abishek@gmail.com",
            mobile: "+91 9099999922",
            nationality: "Indian",
            gender: "Male"
          }
        ],
        persons: [
          {
            name: "ishan",
            designation: "software developer",
            email: "ishan@gmail.com",
            mobile: "0589953134",
            nationality: "Indian",
            gender: "Male"
          },
          {
            name: "Abishek",
            designation: "software developer",
            email: "abishek@gmail.com",
            mobile: "+91 9099999922",
            nationality: "Indian",
            gender: "Male"
          }
        ]
      }
    };
  },
  created () {
    this.postRequest("api_country", {}, "currencies");
    console.log(uniqby([{ id: 1 }, { id: 2 }, { id: 1 }], "id"));
  },

  methods: {
    fileUploaded (file) {
      console.log(file[0]);
      this.file = file[0];
    },
    async submit () {
      this.loading = true;
      this.submitted = true;
      // Upload File and get its URL
      const fileUploaded = await this.uploadFiles(this.file);
      if (fileUploaded === "fail") {
        this.loading = false;
        return;
      }
      // Form File to URL
      this.form.file = await fileUploaded[0].fileUrl;
      console.log(this.form);
      // Upload Form
      const response = await axios.post(
        "/sales/business-registration",
        this.form
      );
      const { success, result } = await response.data;
      console.log(response.data);
      this.loading = false;
    },

    async postRequest (url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;
        this[property] = await result;
      } catch (error) {
        console.log(error);
      }
    },
    getCountryId () {
      return this.$helpers.selectObjectFromArray(
        this.currencies,
        "name",
        this.form.country
      );
    },
    async countrySelected () {
      try {
        this.citiesList = [];
        this.form.city = "";
        this.citiesStatus = "Loading...";
        const parentid = await this.getCountryId();
        const rawResponse = await axios.post("api_country", {
          parentid: `${parentid.pk_countries_id}`
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.citiesList = response.result;
          this.citiesStatus = "Select City";
        } else {
          this.citiesList = [];
          this.citiesStatus = "No Cities Found";
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkValidation (field) {
      return this.submitted && !this.$v.form[field].required;
    },
    checkValidationCustom (obj, id, field) {
      return this.submitted && !this.$v.form[obj].$each[id][field].required;
    },
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
    }, 400)
  },
  validations: {
    file: {
      required
    },
    form: {
      businessname: {
        required
      },
      email: {
        required,
        email
      },
      mobile: {
        required
      },
      landline: {
        required
      },
      license_number: {
        required,
        numeric
      },
      file: {
        required
      },
      activities: {
        required
      },
      legal_status: {
        required
      },
      issued_by: {
        required
      },
      country: {
        required
      },
      city: {
        required
      },
      owners: {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          },
          designation: {
            required,
            minLength: minLength(3)
          },
          email: {
            required,
            email
          },
          mobile: {
            required
          },
          nationality: {
            required
          },
          gender: {
            required
          }
        }
      },
      managers: {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          },
          designation: {
            required,
            minLength: minLength(3)
          },
          email: {
            required,
            email
          },
          mobile: {
            required
          },
          nationality: {
            required
          },
          gender: {
            required
          }
        }
      },
      persons: {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          },
          designation: {
            required,
            minLength: minLength(3)
          },
          email: {
            required,
            email
          },
          mobile: {
            required
          },
          nationality: {
            required
          },
          gender: {
            required
          }
        }
      }
    }
  }
};
</script>
<style scoped>
/* File Input */
.license {
  margin-top: 19px;
}
.inputfile + label {
  font-size: 1.25rem;
  /* 20px */
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  /* display: inline-block; */
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  /* 10px 20px */
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  /* 4px */
  margin-right: 0.25em;
  /* 4px */
}

/* style 6 */

.inputfile-6 + label {
  border: 1px solid #d3394c;
  border-radius: 3px;
  background-color: #efefef;
  padding: 0;
  color: #213a63;
}

.inputfile-6:focus + label,
.inputfile-6.has-focus + label,
.inputfile-6 + label:hover {
  border-color: #ff7d53;
}

.inputfile-6 + label span,
.inputfile-6 + label strong {
  /* padding: 0.625rem 1.25rem; */
  padding: 0.7em;
  /* 10px 20px */
}

.inputfile-6 + label span {
  /* width: 200px; */
  font-weight: 100;
  min-height: 2em;
  /* display: inline-block; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
}

.inputfile-6 + label strong {
  height: 100%;
  color: #fff;
  background-color: #ff5722;
  font-size: 1.2em;
  font-weight: 100;
  /* display: inline-block; */
}

.inputfile-6:focus + label strong,
.inputfile-6.has-focus + label strong,
.inputfile-6 + label:hover strong {
  background-color: #ff7d53;
}

/* Abhishek */
.label {
  padding-bottom: 5px;
}

.big_title {
  font-size: 20px;
}

.owner {
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 18%);
  position: relative;
  background-color: #efefef;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}
.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}
.title_main {
  color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  font-size: 20px;
  font-weight: 600;
  margin: 9px 0px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}

.tag_input {
  width: 100%;
  max-width: 100%;
  border: solid 1px #e4e3e3;
  border-bottom: solid 1px #848484;
  outline: none;
  /* padding: 9px 12px; */
  font-size: 14px;
}

.ti-new-tag-input-wrapper input::placeholder {
  font-size: 12px;
}
.btn_register {
  color: #fff;
  background-color: #ff5722 !important;
  min-width: 125px;
  height: 35px;
  margin-top: 30px;
}

.btn_delete {
  min-width: 20px;
  height: 32px;
  background-color: #ff5722 !important;
  border-radius: 3px;

  width: 38px;
}

.btn_delete i {
  font-size: 20px !important;
}

.btn_add {
  background-color: #213c64 !important;
  margin-right: 5px;
  min-width: 110px;
}

.btn_register i {
  margin-right: 3px;
  float: left;
}
.btn_register span {
  float: left;
  margin-top: 5px;
}
.margin_mobile {
  margin-top: 13px;
}
.margin_license {
  margin-top: 15px;
}
.margin_activity {
  margin-top: 7px;
}
.margin_selection {
  margin-top: 35px;
}
.margin_selection_second {
  margin-top: 9px;
}
.margin_selection_third {
  margin-top: 35px;
}
.margin_title {
  margin-top: 50px;
}
.margin_contact {
  margin-top: 5px;
}
.margin_contact_two {
  margin-top: 28px;
}
.mrgn_add {
  margin-right: 0px;
  margin-top: 25px;
}
.mrgn_add_two {
  margin-right: 0px;
  margin-top: 0px;
}
.margin_mobile_second {
  margin-top: 15px;
}
.margin_email_second {
  margin-top: -8px;
}
.margin_captcha {
  margin-top: 15px;
}
.margin_radio {
  margin-top: 25px;
}

.margin_email {
  margin-top: -10px;
  height: 48px;
}

@media screen and (max-width: 768px) {
  .btn_register {
    margin-top: 23px;
    margin-right: 0px;
  }

  .btn_register i {
    margin-top: 1px;
  }
  .btn_add {
    margin-right: 8px !important;
  }

  .mrgn_add {
    margin-right: 0px !important;
    margin-top: 25px;
  }
  .mrgn_add_two {
    margin-right: 0px !important;
    margin-top: 0px;
  }
}

@media screen and (max-width: 600px) {
  .title_main {
    width: fit-content;
    margin-top: 7px;
  }

  .mob_pr {
    padding-left: 0px !important;
  }
  .mob_pl {
    padding-right: 0px !important;
  }

  .margin_email_mob {
    margin-top: -10px;
  }
  .margin_mobile_mob {
    margin-top: 38px;
  }
  .margin_license_mob {
    margin-top: -10px;
  }

  .margin_title {
    margin-top: 45px;
  }
  .margin_contact {
    margin-top: 15px;
  }
  .margin_contact_two {
    margin-top: 15px;
  }
  .margin_captcha {
    margin-top: 10px;
  }
  .btn_register {
    width: 115px;
  }
  .mob_width {
    width: 100%;
    margin-left: -3px;
    float: left;
  }
  .btn_register {
    float: right;
  }
  .margin_selection_second {
    margin-top: 35px;
  }
  .mrgn_add_two {
    margin-top: 25px;
    margin-right: 0px !important;
    float: right;
  }
  .mrgn_add {
    margin-right: 0px !important;
    float: right;
  }

  .mob_mr_two {
    margin-top: 40px;
  }
  .mob_top {
    margin-top: 20px;
  }
}

@media screen and (max-width: 420px) and (min-width: 410px) {
  .mob_width {
    width: 100%;
    margin-left: 15px;
    float: left;
  }
  .btn_register {
    margin-right: 15px;
  }
}
@media screen and (max-width: 360px) {
  .rc-anchor-normal {
    height: 74px;
    width: 91%;
  }
}

@media screen and (max-width: 300px) {
  .title_main {
    font-size: 13px;
  }

  .btn_register {
    width: 110px;
    min-width: 92px;
  }
  .btn_register span {
    font-size: 11px;
  }
  .md-button-content {
    font-size: 5px !important;
  }
  .btn_add {
    margin-right: 4px !important;
  }
  .btn_register strong {
    font-size: 11px;
  }
  .btn_register i {
    margin-right: 0px;
  }

  .rc-anchor-normal {
    height: 74px;
    width: 50% !important;
  }
}
</style>
