<template>
  <div>
    <div class="container padding_mob">
      <div class="d-flex login-wrap">
        <section>
          <div class="mb-7 text-center">
            <h2 class="login-head mb-0">Reset Password</h2>
            <div class="sign-up">
              Don’t have an account?
              <router-link
                to="/registerHome"
                class="goto-signup"
              ><span>Sign up</span></router-link>
            </div>
          </div>
          <form
            novalidate
            class="md-layout pos-rel formLoginBox"
            @submit.prevent="handleSubmit"
          >
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field :class="{
                    'md-invalid': submitted && !$v.form.password.required,
                  }">
                  <label>Password</label>
                  <md-input
                    type="password"
                    name="password"
                    autocomplete="password"
                    v-model="form.password"
                    :disabled="sending"
                    required
                  ></md-input>
                  <span class="md-error">Password is required</span>
                </md-field>
                <md-field :class="{
                    'md-invalid': submitted && $v.form.confirm_password.$error,
                  }">
                  <label>Confirm Password</label>
                  <md-input
                    type="password"
                    name="password"
                    autocomplete="password"
                    v-model="form.confirm_password"
                    :disabled="sending"
                    required
                  ></md-input>
                  <span
                    class="md-error"
                    v-if="!$v.form.confirm_password.required"
                  >Confirm Password is required</span>
                  <span
                    class="md-error"
                    v-if="
                      $v.form.confirm_password.required &&
                      !$v.form.confirm_password.sameAsPassword
                    "
                  >Confirm Password should be same as Password</span>
                </md-field>

                <md-progress-bar
                  md-mode="indeterminate"
                  v-if="sending"
                />
                <div class="md-layout-item md-layout md-size-100 md-alignment-top-space-around ">
                  <div class="md-layout-item button">
                    <md-button
                      style="text-decoration: underline"
                      class="md-primary   fr"
                    >
                      <md-checkbox
                        class="fr"
                        v-model="form.terms_and_conditions"
                      >{{form.terms_and_conditions ? 'Accepted' : 'Accept'}}</md-checkbox>
                    </md-button>

                  </div>
                  <div class="md-layout-item button">
                    <md-button
                      style="text-decoration: underline"
                      class="md-primary   fl"
                      @click="showDialog = true"
                    >Show Terms And Conditions</md-button>
                    <md-dialog :md-active.sync="showDialog">
                      <md-dialog-title>Terms And Conditions</md-dialog-title>

                      <md-dialog-content>
                        <TermsAndConditions
                          :name="user.trade_name_en"
                          :user_type="user.user_type"
                          :license_number="user.license_number"
                          :city="user.city"
                          :owner_name="user.owner_name"
                          :designation="user.designation"
                        ></TermsAndConditions>
                      </md-dialog-content>

                      <md-dialog-actions>
                        <md-button
                          class="md-primary"
                          @click="handleModalClick('reject')"
                        >Reject</md-button>
                        <md-button
                          class="md-primary md-accent"
                          @click="handleModalClick('accept')"
                        >Accept</md-button>
                      </md-dialog-actions>
                    </md-dialog>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <p
                      v-if="submitted && !$v.form.terms_and_conditions.checked"
                      class="c-forminlineError"
                    >Please Appect Terms and Conditions</p>
                  </div>
                </div>
                <div class="btn-wrap">
                  <md-button
                    type="submit"
                    class="md-raised md-accent"
                    :disabled="sending || $v.$error || !token"
                  >Change Password</md-button>
                </div>
              </div>

            </div>

            <md-snackbar
              class="snack-bar"
              :md-active.sync="showSnackbar"
            >{{
              message
            }}</md-snackbar>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios"
import TermsAndConditions from "@/components/pages/termsAndCondition/termsAndConditions.vue"
export default {
  name: "resetPassword",
  components: {
    TermsAndConditions
  },
  created () {
    this.setToken();
  },
  data: () => ({
    form: {
      terms_and_conditions: false,
      password: null,
      confirm_password: null
    },
    token: "",
    message: "",
    showSnackbar: false,
    submitted: false,
    sending: false,
    showDialog: true,
    user: {}

  }),
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(3)
      },
      confirm_password: {
        required,
        sameAsPassword: sameAs('password')
      },
      terms_and_conditions: {
        checked: value => value == true
      }

    }
  },
  methods: {
    setToken () {
      if (
        (Object.keys(this.$route.params).length === 0 &&
          this.$route.params.constructor === Object) && (Object.keys(this.$route.query).length === 0 &&
            this.$route.query.constructor === Object)
      ) {
        this.message = "Your Password Reset link has been expired. Please login and try again."
        this.showSnackbar = true
      } else {
        this.token = atob(this.$route.query.token)
        this.user = JSON.parse(atob(this.$route.query.user))
      }

      return
    },
    async handleSubmit () {

      this.submitted = true
      this.sending = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.sending = false;
        return;
      }


      const res = await axios.post("/common/reset-password", {
        token: this.token,
        ...this.form
      })

      const { message, success, result } = await res.data;
      if (success) {
        this.sending = false;
        await this.$swal.fire(this.$helpers.successPopup(message));
        this.$router.push("/");
      } else {
        this.sending = false;
        await this.$swal.fire(this.$helpers.errorPopup(message));
      }
    },
    handleModalClick (type) {
      this.showDialog = false
      if (type === 'reject') {
        this.form.terms_and_conditions = false
        return
      }
      this.form.terms_and_conditions = true
    }

  }
};
</script>

<style lang="css" scoped>
.formLoginBox {
  padding-top: 15px !important;
  padding-bottom: 20px;
}

button.md-button.md-raised.md-accent.md-theme-default {
  margin-left: 0px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.invalid-feedback {
  color: red;
  font-size: 12px;
}
.login-wrap {
  width: 100%;
  max-width: 381px;
  align-items: center;
  margin: 0 auto;
  position: relative;
  padding: 4.3em 0;
}
.error-fill {
  text-align: center;
  color: red;
}
.login-wrap section {
  width: 100%;
}
h2.login-head {
  font-size: 3em;
  font-weight: 500;
  color: #191919;
}
.sec-txt {
  color: #77838f;
  line-height: 1.7;
  margin-top: 0.77em;
  font-weight: 300;
  font-size: 1.3em;
}
.mb-7 {
  margin-bottom: 2rem !important;
}
/*.login-wrap section:nth-child(1){
    width: 100%;
    max-width: 339px;
  }*/

.forgot-password {
  width: 100%;
  text-align: right;
  font-size: 13px;
  font-weight: 400;
  color: #ff5722;
}
.btn-wrap {
  width: 100%;
}
.btn-wrap .md-button {
  width: 100%;
  height: 45px;
  margin-top: 1.7em;
}
.sign-up {
  margin-top: 0.9em;
}
.goto-signup {
  color: #ff5722 !important;
  font-weight: 500;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.formLoginBox {
  padding-top: 30px;
}

@media screen and (max-width: 769px) {
  .formLoginBox {
    padding-top: 0px;
  }

  h2.login-head {
    font-size: 32px;
  }

  .acc-type-wrap {
    padding: 3.5em 0;
  }
}

@media screen and (max-width: 600px) {
  h2.login-head {
    font-size: 24px;
  }
  .sec-txt {
    font-size: 15px;
    margin-top: 0.9em;
  }

  .sign-up {
    margin-top: 0.5em;
    font-size: 12px;
  }

  .formLoginBox {
    padding-top: 0px !important;
  }
  .md-field {
    margin: 0px 0 20px;
  }
  .login-wrap {
    padding: 2.2em 0;
  }
  .btn-wrap .md-button {
    margin-top: 20px;
  }

  .padding_mob {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media screen and (max-width: 768px) {
  .snack-bar {
    top: 40px;
  }
}

@media screen and (max-width: 300px) {
  .padding_mob {
    padding-right: 55px;
    padding-left: 15px;
  }

  .login-wrap {
    padding: 2em 0;
  }
}
</style>
