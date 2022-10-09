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
          <md-field clas="md-field">
            <label class="form-label">Business Name</label>
            <md-input
              v-model="form.businessname"
              name="businessname"
              :maxlength="40"
              required
              @keypress="validateChar($event)"
            ></md-input>
          </md-field>
          <span
            v-if="submitted && $v.form.businessname.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.businessname.required"
              >Businessname is required</span
            >
          </span>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">E-mail</label>
            <md-input v-model="form.email" required></md-input>
          </md-field>
          <div
            v-if="submitted && $v.form.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.email.required">Email is required</span>
            <span v-if="!$v.form.email.email">Email is invalid</span>
          </div>
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
          </md-field>
          <div
            v-if="submitted && $v.form.password.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.password.required">Password is required</span>
            <span v-if="!$v.form.password.minLength"
              >The password field must be at least 6 character</span
            >
          </div>
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
          </md-field>
          <div
            v-if="submitted && $v.form.repeatPassword.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.repeatPassword.required"
              >Password is required</span
            >
            <span v-if="!$v.form.repeatPassword.sameAsPassword">
              Reenter password should be same
            </span>
            <span v-if="!$v.form.repeatPassword.minLength"
              >The password field must be at least 6 character</span
            >
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <template>
            <vue-tel-input
              name="mobile"
              autocomplete="off"
              v-model="form.mobile"
              placeholder="Mobile*"
              required
              v-bind="bindTelProps"
            ></vue-tel-input>
          </template>
          <div
            v-if="submitted && $v.form.mobile.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.mobile.required">Mobile is required</span>
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <template>
            <vue-tel-input
              name="landline"
              autocomplete="off"
              v-model="form.landline"
              placeholder="Landline*"
              v-bind="bindTelProps"
            ></vue-tel-input>
          </template>
          <div
            v-if="submitted && $v.form.landline.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.landline.required">Landline is required</span>
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Trade License Number</label>
            <md-input
              v-model="form.license_number"
              required
              @keypress="onlyNumber"
            ></md-input>
          </md-field>
          <div
            v-if="submitted && $v.form.license_number.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.license_number.required"
              >License number is required</span
            >
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Trade License file</label>
            <!-- <input @change="uploadImage" type="file" name="photo" accept="image/*" > -->
            <md-file
              @md-change="uploadImage($event)"
              v-model="file"
              class="myfile"
              ref="myfile"
            />
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field>
            <vue-tags-input
              class="myclass"
              @before-adding-tag="onEnterActivity"
              v-model="tag"
              :tags="tags"
              :autocomplete-items="autocompleteItems"
              :add-only-from-autocomplete="true"
              @tags-changed="update"
              placeholder="Choose activities #shipping"
            />
          </md-field>
          <div class="invalid-feedback" v-if="isActivityEmpty">
            Activities field is reuired
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label for="food">Legal Status</label>
            <md-select
              v-model="form.legal_status"
              name="legal_status"
              id="legal_status"
              required
            >
              <md-option
                v-for="leagal in legalStatus"
                :key="leagal.id"
                :value="leagal.title_en"
              >
                {{ leagal.title_en }}
              </md-option>
            </md-select>
          </md-field>
          <div
            v-if="submitted && $v.form.legal_status.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.legal_status.required"
              >Legal status is required</span
            >
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Issued By</label>
            <md-select
              v-model="form.issued_by"
              name="issued_by"
              id="issued_by"
              required
              @md-selected="fetchFreezoneName"
            >
              <md-option value="LOC">Local</md-option>
              <md-option value="FZ">Freezone</md-option>
            </md-select>
          </md-field>
          <div
            v-if="submitted && $v.form.issued_by.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.issued_by.required"
              >Issued_by is required</span
            >
          </div>
        </div>
        <div class="md-layout-item md-size-50" v-if="this.freezoneNames">
          <md-field>
            <label class="form-label">Freezone Name</label>
            <md-select
              v-model="form.freezone_name"
              name="freezone_name"
              id="freezone_name"
            >
              <md-option
                v-for="(opt, id) in freezoneNames"
                :key="id"
                :value="opt.name"
              >
                {{ opt.name }}
              </md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label for="food">Choose country</label>
            <md-select
              v-model="form.country"
              name="country"
              id="country"
              required
              @md-selected="onChange($event)"
            >
              <md-option
                v-for="country in countries"
                :key="country.pk_countries_id"
                :value="country.name"
              >
                {{ country.name }}
              </md-option>
            </md-select>
          </md-field>
          <div
            v-if="submitted && $v.form.country.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.country.required">country is required</span>
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label for="food">Choose city</label>
            <md-select
              v-model="form.city"
              name="city"
              id="city"
              required
              placeholder="Choose city*"
            >
              <md-option
                v-for="city in cities"
                :key="city.pk_countries_id"
                :value="city.location"
              >
                {{ city.location }}
              </md-option>
            </md-select>
          </md-field>
          <div v-if="submitted && $v.form.city.$error" class="invalid-feedback">
            <span v-if="!$v.form.city.required">City is required</span>
          </div>
        </div>

        <div class="contact-info">Contact Details</div>
        <br />
        <div class="md-layout-item md-size-50">
          <md-field>
            <label class="form-label">Contact Person</label>
            <md-input v-model="form.contactperson" required></md-input>
          </md-field>
          <div
            v-if="submitted && $v.form.contactperson.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.contactperson.required"
              >Contact person is required</span
            >
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <template>
            <vue-tel-input
              name="contactmobile"
              autocomplete="off"
              v-model="form.contactmobile"
              placeholder="Contact mobile*"
              v-bind="bindTelProps"
            ></vue-tel-input>
          </template>
          <div
            v-if="submitted && $v.form.contactmobile.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.form.contactmobile.required"
              >Contact mobile is required</span
            >
          </div>
        </div>
        <div class="md-layout-item md-size-50">
          <vue-recaptcha
            ref="recaptcha"
            @verify="markRecaptchaAsVerified"
            sitekey="6LfiQZobAAAAAIeQgxUcwj3TdKViaCy8QxZkbBEh"
            :loadRecaptchaScript="true"
          ></vue-recaptcha>
          <div class="invalid-feedback">
            {{ pleaseTickRecaptchaMessage }}
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
import VueRecaptcha from "vue-recaptcha";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
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
  components: {
    VueTagsInput,
    vueDropzone: vue2Dropzone,
    VueRecaptcha
  },
  mixins: [validationMixin],
  data() {
    return {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 125,
        maxFilesize: 1,
        addRemoveLinks: true,
        headers: { "My-Awesome-Header": "header value" },
        dictDefaultMessage:
          "<i class='material-icons'>insert_photo</i>Attach File"
      },
      isActivityEmpty: false,
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
      account_type: "company",
      countries: {},
      cities: {},
      legalStatus: {},
      activities: [],
      file: "",
      imageBase: "",
      freezoneNames: null,
      form: {
        password: "",
        repeatPassword: "",
        activities: "",
        contactmobile: "",
        businessname: "",
        file: "",
        email: "",
        mobile: "",
        landline: "",
        account_type: "",
        license_number: "",
        legal_status: "",
        issued_by: "",
        freezone_name: "",
        country: "",
        city: "",
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
      businessname: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password")
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
      contactperson: {
        required
      },
      contactmobile: {
        required
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
    async fetchFreezoneName() {
      this.freezoneNames = null;
      console.log("Free Zone Selected");
      if (this.form.issued_by === "FZ") {
        const res = await axios.post("/business/issued-by", { parent_id: 1 });
        const { success, result } = await res.data;
        this.freezoneNames = await result;
      }
    },
    uploadImage(e) {
      var file = e[0];
      var vm = this;
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(e.target.result);
        vm.imageSrc = e.target.result;
        vm.imageBase = e.target.result;
        console.log(vm.imageBase);
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(file);
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    onChange(value) {
      const countryObj = this.$helpers.selectObjectFromArray(
        this.countries,
        "name",
        this.form.country
      );
      this.form.city = "";
      const country_id = countryObj.pk_countries_id;
      this.$store
        .dispatch("GET_CITY", country_id)
        .then(response => (this.cities = response.data.result));
    },
    onEnterActivity(obj) {
      obj.addTag();
      if (this.tags.length > 0) {
        this.isActivityEmpty = false;
      } else {
        console.log("a");
      }
    },
    validateChar(event) {
      const k = event.keyCode,
        $return =
          (k > 64 && k < 91) ||
          (k > 96 && k < 123) ||
          k == 8 ||
          k == 32 ||
          (k >= 48 && k <= 57);

      if (!$return) {
        return false;
      } else {
        console.log("special char  allowed");
      }
    },
    markRecaptchaAsVerified(response) {
      this.pleaseTickRecaptchaMessage = "";
      this.recaptchaVerified = true;
    },

    onVerify: function(response) {
      console.log("Verify: " + response);
    },
    onExpired: function() {
      console.log("Expired");
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset(); // Direct call reset method
    },
    handleSubmit(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        if (this.tags.length <= 0) {
          this.isActivityEmpty = true;
        }
        return;
      }
      if (!this.recaptchaVerified) {
        this.pleaseTickRecaptchaMessage = "Please tick recaptcha.";
        return true; // prevent form from submitting
      }

      this.sending = true;
      const activity = this.tags.map(tags => {
        return tags.text;
      });
      this.form.activities = activity;

      this.form = { ...this.form, account_type: this.account_type };

      if (this.imageBase) {
        this.$store
          .dispatch("FILE_UPLOAD", this.imageBase)
          .then(response => {
            if (response.data.success == true) {
              this.form.file = response.data.file;
              this.$store
                .dispatch("REGISTER_BUSINESS", { ...this.form })
                .then(response => {
                  console.log(response.data.success);
                  if (response.data.success == true) {
                    console.log("true");
                    console.log("inside true");
                    this.sending = false;
                    this.$store.dispatch("loggedIn_profile");
                    this.message =
                      "Busniess request sent successfully,we will contact you soon. Contact us at support@uaect.com ";
                    this.userSaved = true;

                    this.form = {};
                    this.submitted = false;
                    setTimeout(() => {
                      this.$router.push("/");
                    }, 5000);
                  } else {
                    console.log("inside false");
                    console.log(response.data.message);
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
            } else {
              alert("Error while uploading file");
            }
          })
          .catch(error => console.log(error));
      } else {
        this.$store
          .dispatch("REGISTER_BUSINESS", { ...this.form })
          .then(response => {
            console.log(response.data.success);
            if (response.data.success == true) {
              console.log("true");
              console.log("inside true");
              this.sending = false;

              this.message =
                "Busniess request sent successfully,we will contact you soon. Contact us at support@uaect.com ";
              this.userSaved = true;

              this.form = {};
              this.submitted = false;

              setTimeout(() => {
                this.$router.push("/");
                this.$store.dispatch("loggedIn_profile");
              }, 5000);
            } else {
              console.log("inside false");
              console.log(response.data.message);
              this.sending = false;
              this.message = response.data.message;
              this.userSaved = true;
            }
          })
          .catch(error => {
            this.sending = false;
            this.message = error.data.success;
            this.userSaved = true;

            console.log(error);
          });
      }
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
  font-size: 11px;

  margin-bottom: 0px;
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
  max-width: 100% !important;
  width: 100%;
}

.vue-tags-input .ti-input {
  border: none !important;
}
.md-field {
  margin-bottom: 0px;
}
.md-layout-item {
  padding-bottom: 20px;
}

@media screen and (max-width: 769px) {
  .btn-wrap .md-button {
    margin-top: 1.2em;
  }
  .business-info {
    margin-top: 20px;
  }

  .md-layout.md-gutter > .md-layout-item {
    padding-right: 15px;
    padding-left: 8px;
  }
}

@media screen and (max-width: 600px) {
  .md-layout-item.md-size-50 {
    min-width: 100% !important;
  }
  .md-layout-item {
    padding-bottom: 13px;
  }

  .btn-wrap .md-button {
    margin-top: 15px;
  }
  .pos-rel {
    display: block;
  }

  .btn-wrap .md-button {
    min-width: 100%;
    margin-left: 0px;
  }
  iframe {
    width: 50px !important;
  }

  .contact-info {
    padding-left: 0px;
  }

  .md-layout.md-gutter > .md-layout-item {
    padding-right: 8px;
    padding-left: 8px;
  }
  .contact-info {
    padding-left: 5px;
  }
  .padding_mob {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
