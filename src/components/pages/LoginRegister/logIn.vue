<template>
  <div>
    <div class="container padding_mob">
      <div class="d-flex login-wrap">
        <section>
          <div class="mb-7 text-center">
            <h2 class="login-head mb-0">Login</h2>
            <p class="sec-txt">Login to manage your account.</p>
            <div class="sign-up">
              Don’t have an account?
              <router-link to="/registerHome" class="goto-signup"
                ><span>Sign up</span></router-link
              >
            </div>
          </div>
          <form
            autocomplete="off"
            novalidate
            class="md-layout pos-rel formLoginBox"
            @submit.prevent="handleSubmit"
          >
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="email">Email</label>
                  <md-input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    v-model="form.email"
                    :disabled="sending"
                  />
                  <div
                    v-if="submitted && $v.form.email.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.email.required"
                      >Email is required</span
                    >
                    <span v-if="!$v.form.email.email">Email is invalid</span>
                  </div>
                </md-field>

                <md-field>
                  <label for="secretpassword">Password</label>
                  <md-input
                    type="search"
                    name="secretpassword"
                    id="secretpassword"
                    autocomplete="off"
                    v-model="form.password"
                    :disabled="sending"
                    :style="{
                      'text-security': 'disc',
                      '-webkit-text-security': 'disc',
                      'z-index': 9,
                      position: 'absolute',
                    }"
                  />

                  <div
                    v-if="submitted && $v.form.password.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.password.required"
                      >Password is required</span
                    >
                  </div>
                </md-field>
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
                <router-link to="/forgot-password"
                  ><div class="forgot-password">
                    Forgot your password ?
                  </div></router-link
                >
                <div class="btn-wrap">
                  <md-button
                    class="md-raised md-accent"
                    type="submit"
                    :disabled="sending"
                    >Log In</md-button
                  >
                </div>

                <span class="error-fill">{{ loginError }}</span>
              </div>
            </div>

            <md-snackbar class="snack-bar" :md-active.sync="showSnackbar">{{
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
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    message: "",
    showSnackbar: false,
    position: "left",
    loginError: null,
    submitted: false,
    submitStatus: null,
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    handleSubmit (e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.sending = true;
      this.$store
        .dispatch("LOGIN", {
          email: this.form.email,
          password: this.form.password
        })
        .then(success => {
          console.log("success");
          this.showSnackbar = true;
          this.message = "you have successfully logged in";
          this.$store.dispatch("loggedIn_profile");
          this.$store.dispatch("getCart");
          setTimeout(() => {
            this.sending = false;
            if (
              Object.keys(this.$route.params).length === 0 &&
              this.$route.params.constructor === Object
            )
              this.$router.push("/");
            if (this.$route.params.redirectUrl === "/profilePage") {
              const url = this.getProfilePath();
              this.$router.push(url);
            } else {
              this.$router.push(this.$route.params.redirectUrl);
            }
          }, 2000);
        })
        .catch(error => {
          this.showSnackbar = true;
          this.sending = false;
          this.message = error.data.message;
          //this.loginError = error.data.message;
        });

      //  this.$v.form.$touch();
      //    this.$v.form.$touch();
      //   if (this.$v.form.$invalid) {
      //     this.submitStatus = 'ERROR'
      //   } else {
      //     this.submitStatus = 'PENDING'
      //      this.$store.dispatch("LOGIN",{
      //      email:this.form.email,
      //      password:this.form.password
      //    }).then(success => {
      //       this.submitStatus = 'OK'
      //      console.log("success")
      //       this.$router.push("/")
      //    })
      //    .catch(error=>{
      //       this.loginError = error.data.message ;
      //       console.log(error.data.message )
      //    })

      //   }
    },
    getProfilePath () {
      if (this.$store.state.user.profile) {
        const user = this.$store.state.user.profile.profile;
        return `/profile/${this.slugify(user.trade_name_en)}/${user.userid}`;
      }
      return "/profile/name/000";
    },
    slugify (text, ampersand = "and") {
      const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
      const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
      const p = new RegExp(a.split("").join("|"), "g");
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    },

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
    bottom: 40px;
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
