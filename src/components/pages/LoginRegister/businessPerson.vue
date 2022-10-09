<template>
  <div>
    <div class="business-info">Business Information</div>
    <form
      novalidate
      class="md-layout pos-rel formLoginBox"
      @submit.prevent="handleSubmit"
    >
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Business Name</label>
            <md-input
              v-model="form.businessname"
              name="businessname"
              :maxlength="40"
              required
            ></md-input>
            <div
              v-if="submitted && $v.form.businessname.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.businessname.required"
                >Businessname is required</span
              >
            </div>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">E-mail</label>
            <md-input v-model="form.email" required></md-input>
            <div
              v-if="submitted && $v.form.email.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.email.required">Email is required</span>
              <span v-if="!$v.form.email.email">Email is invalid</span>
            </div>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Password</label>
            <md-input
              v-model="form.password"
              autocomplete="password"
              type="password"
              required
            ></md-input>
            <div
              v-if="submitted && $v.form.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.password.required"
                >Password is required</span
              >
              <span v-if="!$v.form.password.minLength"
                >The password field must be at least 6 character</span
              >
            </div>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Repeat Password</label>
            <md-input
              v-model="form.repeatPassword"
              autocomplete="password"
              type="password"
              required
            ></md-input>
            <div
              v-if="submitted && $v.form.repeatPassword.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.repeatPassword.required"
                >Password is required</span
              >
              <span v-if="!$v.form.repeatPassword.sameAsPassword">
                Passwords must be identical.
              </span>
              <span v-if="!$v.form.repeatPassword.minLength"
                >The password field must be at least 6 character</span
              >
            </div>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <template>
            <vue-tel-input
              id="mobile"
              name="mobile"
              v-model="form.mobile"
              placeholder="Mobile"
              v-bind="bindTelProps"
            ></vue-tel-input>
          </template>
          <div
            v-if="submitted && $v.form.mobile.$error"
            class="invalid-feedback"
            style="position: relative;right: 0;float: right;bottom: 30px;"
          >
            <span v-if="!$v.form.mobile.required">Mobile is required</span>
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <vue-tel-input
            name="landline"
            id="landline"
            v-model="form.landline"
            placeholder="Landline"
            v-bind="bindTelProps"
          ></vue-tel-input>
          <div
            v-if="submitted && $v.form.landline.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.landline.required">Landline is required</span>
          </div>
        </div>
        <div class="md-layout-item md-size-100 activities">
          <md-field>
            <vue-tags-input
              class="myclass"
              v-model="tag"
              :tags="tags"
              :autocomplete-items="autocompleteItems"
              :add-only-from-autocomplete="true"
              @tags-changed="update"
              placeholder="Choose activities #shipping"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Emirates id </label>
            <md-input
              v-model="form.em_id_number"
              required
              v-mask="'###-####-#######-#'"
            ></md-input>
            <div
              v-if="submitted && $v.form.em_id_number.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.em_id_number.required"
                >Emirates id is required</span
              >
            </div>
          </md-field>
        </div>
        <div class="md-layout-item  md-size-50">
          <md-field>
            <label for="food">Nationality</label>
            <md-select v-model="form.nationality" name="country" id="country">
              <md-option
                v-for="country in countries"
                :key="country.pk_countries_id"
                :value="country.pk_countries_id"
              >
                {{ country.name }}
              </md-option>
            </md-select>
            <div
              v-if="submitted && $v.form.nationality.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.nationality.required"
                >nationality is required</span
              >
            </div>
          </md-field>
        </div>

        <div class="contact-info">Contact Details</div>
        <br />
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Contact Person</label>
            <md-input v-model="form.contactperson" required></md-input>
            <div
              v-if="submitted && $v.form.contactperson.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.contactperson.required"
                >contactperson is required</span
              >
            </div>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <vue-tel-input
            id="contactmobile"
            name="contactmobile"
            v-model="form.contactmobile"
            placeholder="Contact Mobile"
            v-bind="bindTelProps"
          ></vue-tel-input>
          <div
            v-if="submitted && $v.form.contactmobile.$error"
            class="invalid-feedback"
            style="position: relative;right: 0;float: right;bottom: 30px;"
          >
            <span v-if="!$v.form.contactmobile.required"
              >Contact mobile is required</span
            >
          </div>
        </div>

        <div class="btn-wrap">
          <md-button
            class="md-raised md-accent"
            type="submit"
            :disabled="sending"
            >Register Now</md-button
          >
        </div>
      </div>
    </form>
    <md-snackbar :md-active.sync="userSaved">{{ message }}</md-snackbar>
  </div>
</template>
<script>
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxValue,
  numeric,
  sameAs,
  maxLength
} from "vuelidate/lib/validators";
export default {
  name: "businessAccount",
  props: ["accountType"],
  components: {
    VueTagsInput
  },
  mixins: [validationMixin],
  data() {
    return {
      tag: "",
      tags: [],
      autocompleteItems: [],
      debounce: null,
      visible: false,
      message: "",
      submitted: false,
      isCompany: true,
      userSaved: false,
      sending: false,
      isBusiness: false,
      account_type: this.accountType,
      countries: {},
      cities: {},
      legalStatus: {},
      activities: [],
      form: {
        password: "",
        repeatPassword: "",
        activities: "",
        contactmobile: "",
        nationality: "",
        em_id_number: "",
        businessname: "",
        email: "",
        mobile: "",
        landline: "",
        account_type: "",

        contactperson: ""
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
      nationality: {
        required
      },
      em_id_number: {
        required
      },
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

      contactperson: {
        required
      },
      contactmobile: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password")
      }
    }
  },

  created() {
    this.$store
      .dispatch("GET_COUNTRY")
      .then(response => (this.countries = response.data.result));
    this.$store
      .dispatch("GET_LEAGAL_STATUS")
      .then(response => (this.legalStatus = response.data.result));
  },
  watch: {
    tag: "initItems"
  },
  methods: {
    onChange() {
      this.form.city = "";
      const country_id = this.form.country;
      this.$store
        .dispatch("GET_CITY", country_id)
        .then(response => (this.cities = response.data.result));
    },
    handleSubmit(e) {
      const activity = this.tags.map(tags => {
        return tags.text;
      });
      this.form.activities = activity;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.sending = true;
      this.form = { ...this.form, account_type: this.account_type };
      this.$store
        .dispatch("REGISTER_BUSINESS", { ...this.form })
        .then(response => {
          if (response.data.success == true) {
            this.sending = false;

            this.message =
              "Busniess request sent successfully,we will contact you soon. Contact us at support@uaect.com ";
            this.$store.dispatch("loggedIn_profile");
            this.userSaved = true;
            this.form = {};
            this.submitted = false;
            setTimeout(() => {
              this.$router.push("/");
            }, 5000);
          } else {
            this.sending = false;
            this.message = response.data.message;
            this.userSaved = true;
          }
        })
        .catch(error => {
          this.sending = false;
          this.message = error.data.message;
          this.userSaved = true;
          console.log(error);
        });
    },
    //toggle input onclick of search
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems() {
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
<style scoped lang="css">
.form-wrap {
  width: 55%;
  margin: 0 auto;
  margin-top: 2em;
}
.business-info {
  font-size: 14px;
  font-weight: 600;
  padding-top: 10px;
}
.contact-info {
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 0 20px;
  padding-top: 10px;
}
.btn-wrap {
  width: 100%;
  text-align: center;
}
.btn-wrap .md-button {
  min-width: 265px;
  margin-top: 1.7em;
}
section .head {
  font-size: 14px;
  font-weight: 600;
}
.invalid-feedback {
  color: red;
  font-size: 10px;
  position: absolute;
  right: 30px;
  bottom: 5px;
}
.vue-tel-input {
  border: none;
  display: flex;
  text-align: left;
  margin-top: 17px;
  border-radius: 0px;
  border-bottom: 1px solid #919191;
}
.vue-tags-input {
  max-width: 100%;
  width: 100%;
}
.vue-tags-input .ti-input {
  border: none !important;
}
.activities {
  margin-top: 20px;
}
</style>
