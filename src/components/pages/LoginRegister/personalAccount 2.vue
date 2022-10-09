<template>
  <div>
    <div class="container pzero">
      <div class="form-wrap">
        <form
          novalidate
          class="md-layout pos-rel formLoginBox"
          @submit.prevent="handleSubmit"
        >
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label class="form-label">First Name</label>
                <md-input v-model="form.firstname" required></md-input>
              </md-field>
              <div
                v-if="submitted && $v.form.firstname.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.firstname.required"
                  >First name is required</span
                >
              </div>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field>
                <label class="form-label">Last Name</label>
                <md-input v-model="form.lastname" required></md-input>
              </md-field>
              <div
                v-if="submitted && $v.form.lastname.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.form.lastname.required"
                  >Last name is required</span
                >
              </div>
            </div>
            <div class="md-layout-item md-size-50">
              <md-field>
                <label class="form-label">E-mail</label>
                <md-input
                  autocomplete="email"
                  v-model="form.email"
                  required
                ></md-input>
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
              <template>
                <vue-tel-input
                  v-model="form.mobile"
                  placeholder="Mobile"
                  :validCharactersOnly="true"
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
                <span v-if="!$v.form.password.required"
                  >Password is required</span
                >
                <span v-if="!$v.form.password.minLength"
                  >Minimum 6 character</span
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
                  Passwords must be identical.
                </span>
              </div>
            </div>
            <div class="md-layout-item md-size-50">
              <vue-recaptcha
                ref="recaptcha"
                @verify="markRecaptchaAsVerified"
                sitekey="6LcT6KMZAAAAACpBT1I36NaXOaIAd9syHvBKSNW0"
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
          <md-snackbar :md-active.sync="userSaved">{{ message }}</md-snackbar>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import VueRecaptcha from "vue-recaptcha";
import {
  required,
  email,
  minLength,
  numeric,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "personalAccount",
  components: { VueRecaptcha },
  mixins: [validationMixin],
  data() {
    return {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: "",
      form: {
        firstname: "",
        repeatPassword: "",
        lastname: "",
        email: "",
        password: "",
        mobile: "",
        countryCode: ""
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
      message: "",
      userSaved: false,
      sending: false,
      submitted: false
    };
  },
  validations: {
    form: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      email: {
        required,
        email
      },
      mobile: {
        required
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    // countryChanged(country) {
    //   this.form.mobile = "+" + country.dialCode;
    //   // this.form.countryCode = country.dialCode;
    // },
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

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (!this.recaptchaVerified) {
        this.pleaseTickRecaptchaMessage = "Please tick recaptcha.";
        return true; // prevent form from submitting
      }
      this.sending = true;
      this.$store
        .dispatch("REGISTER_PERSONAL", {
          ...this.form
        })
        .then(success => {
          this.sending = false;

          this.$store.dispatch("loggedIn_profile");
          this.$router.push("/");
        })
        .catch(error => {
          this.sending = false;
          this.userSaved = true;
          this.message = error.data.message;
        });
    }
  }
};
</script>
<style scoped>
.form-wrap {
  width: 55%;
  margin: 0 auto;
  margin-bottom: 2.5em;
}
.btn-wrap {
  width: 100%;
  text-align: center;
}
.invalid-feedback {
  color: red;
  font-size: 12px;
}
.btn-wrap .md-button {
  min-width: 265px;
  margin-top: 1.7em;
}
.vue-tel-input {
  border: none;
  display: flex;
  text-align: left;
  margin-top: 17px;
  border-radius: 0px;
  border-bottom: 1px solid #919191;
}
.md-field {
  margin-bottom: 0px;
}
.md-layout-item {
  padding-bottom: 20px;
}
.g-recaptcha {
  -webkit-transform: scale(0.77);
  -moz-transform: scale(0.77);
  -ms-transform: scale(0.77);
  -o-transform: scale(0.77);
  transform: scale(0.77);
  -webkit-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  transform-origin: 0 0;
}

@media screen and (max-width: 1000px) {
  .form-wrap {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 2.5em;
  }
}

@media screen and (max-width: 769px) {
  .types .md-button {
    width: 150px;
    height: 126px;
  }
  .types .md-button i {
    font-size: 5em;
  }
  h2.login-head {
    font-size: 32px;
  }
  .btn-wrap .md-button {
    min-width: 265px;
    margin-top: 1.2em;
  }
  .md-layout.md-gutter > .md-layout-item {
    padding-right: 15px;
    padding-left: 8px;
  }
}

@media screen and (max-width: 600px) {
  .types .md-button {
    width: 130px;
    height: 110px;
    margin: 0px;
  }
  .types .md-button i {
    font-size: 4em;
  }

  h2.login-head {
    font-size: 24px;
    font-weight: 500;
    color: #191919;
  }
  .acc-type-wrap {
    padding: 2.2em 0;
  }

  .types .md-button i {
    font-size: 4em;
    width: fit-content;
    margin: auto;
  }

  .acc-type-wrap label {
    font-size: 15px;
    margin-top: 1.9em;
  }

  .acc-type .types:nth-child(1) {
    margin-right: 1.6em;
  }
  .acc-type {
    width: 100%;
    margin-top: 1.6em;
  }

  .sign-up {
    margin-top: 1.2em;
    font-size: 12px;
  }
  .form-wrap {
    margin-top: 0px;
  }

  .md-layout-item.md-size-50 {
    min-width: 100% !important;
  }
  .md-layout-item {
    padding-bottom: 13px;
  }
  .btn-wrap .md-button {
    margin-top: 15px;
  }
  .md-layout.md-gutter > .md-layout-item {
    padding-right: 8px;
    padding-left: 8px;
  }

  .padding_mob {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media screen and (max-width: 360px) {
  .padding_mob {
    padding-right: 55px;
    padding-left: 15px;
  }
  .acc-type .types:nth-child(1) {
    margin-right: 0.7em;
  }

  .types .md-button {
    width: 110px;
    height: 93px;
    margin: 0px;
  }
  h2.login-head {
    font-size: 24px;
    font-weight: 500;
    color: #191919;
  }

  .acc-type {
    width: 100%;
    margin-top: 1.2em;
  }

  .pos-rel {
    display: block;
  }

  .pzero {
    padding: 0px;
  }

  .btn-wrap .md-button {
    min-width: 100%;
    margin-left: 0px;
  }
  iframe {
    width: 50px !important;
  }
}
</style>
