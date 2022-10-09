<template>
  <div class="inline-btn">
    <span v-if="liked" class="post-like">
      <i
        v-if="
          dashboard_access &&
          dashboard_access.some(
            (el) => el.type === 'social' && el.access === '1'
          )
        "
        class="material-icons reaction-icn-1 liked-post-icon"
        @click="handleUnlike(postid)"
        >favorite</i
      >
      <i v-else class="material-icons disabled-icon liked-post-icon"
        >favorite</i
      >
      <md-tooltip md-direction="top">Unlike</md-tooltip>
    </span>
    <span v-else class="post-like">
      <i
        v-if="
          dashboard_access &&
          dashboard_access.some(
            (el) => el.type === 'social' && el.access === '1'
          )
        "
        class="material-icons reaction-icn-1"
        @click="handleLike(postid)"
        >favorite_border</i
      >
      <i v-else class="material-icons disabled-icon">favorite_border</i>
      <md-tooltip md-direction="top">Like</md-tooltip>
    </span>
    <small class="reaction-count">{{ count }} </small>
    <div>
      <!-- <Login /> -->
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Login</md-dialog-title>
        <form
          novalidate
          class="md-layout pos-rel formLoginBox"
          @submit.prevent="handleLogin"
        >
          <md-dialog-content>
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
                  <label for="password">Password</label>
                  <md-input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="password"
                    v-model="form.password"
                    :disabled="sending"
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
                <div class="forgot-password">Forgot your password ?</div>
                <div class="btn-wrap">
                  <md-button
                    class="md-raised md-accent md-block loginbtn"
                    type="submit"
                    :disabled="sending"
                    >Log In</md-button
                  >
                </div>
                <span class="error-fill">{{ loginError }}</span>
              </div>
            </div>
          </md-dialog-content>
          <md-snackbar :md-active.sync="userSaved"
            >Login Successfull!!!</md-snackbar
          >
        </form>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Cancel</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Login from "../../LoginPopup";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: { Login },
  props: {
    likes: {
      type: Number
    },
    isliked: {
      type: Boolean,
      default: false
    },
    postid: {
      type: String
    }
  },
  name: "like",
  computed: {
    dashboard_access () {
      return this.$store.state.profile.dashboard_access
    }
  },
  data () {
    return {
      sending: false,
      userSaved: false,
      liked: false,
      count: 0,
      showDialog: false,
      form: {
        email: null,
        password: null
      },
      loginError: null,
      submitted: false
    };
  },
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
    handleUnlike (id) {
      const token = localStorage.getItem("token");
      if (token) {
        this.liked = false;
        this.count--;
        axios
          .post("api_like", {
            postid: id,
            type: "like",
            like: "dislike"
          })
          .then(response => {
            if (response.data.success == false) {
              this.liked = true;
              this.count++;
            }
          })

          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push("login");
      }
    },
    handleLike (id) {
      const token = localStorage.getItem("token");
      if (token) {
        this.liked = true;
        this.count++;
        axios
          .post("api_like", {
            postid: id,
            type: "like",
            like: "like"
          })
          .then(response => {
            if (response.data.success == false) {
              console.log("false");
              this.liked = false;
              this.count--;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push("login");
        console.log(this.showDialog);
      }
    },
    handleLogin (e) {
      this.submitted = true;
      this.sending = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store
        .dispatch("LOGIN", {
          email: this.form.email,
          password: this.form.password
        })
        .then(success => {
          this.sending = false;
          console.log("success");
          //this.$store.dispatch('EmptyNewsFed');
          this.$store.dispatch("loggedIn_profile");

          this.showDialog = false;
          //this.$emit("handleReloadAfterLogin");
          //this.$parent.$emit("handleReloadAfterLogin")

          //this.$router.push("/newsfeed")
        })
        .catch(error => {
          this.loginError = error.data.message;
          this.sending = false;
        });
    }
  },

  created () {
    this.count = this.likes;
    this.liked = this.isliked;
  },
  watch: {
    "this.isliked": function (oldValue, newValue) {
      //this.liked = newValue
      console.log("------old and new------");
      console.log(oldValue, newValue);
      console.log("------ends------");
    }
  },
  mounted () {
    //console.log(this.isliked)
  }
};
</script>

<style scoped>
.liked-post-icon {
  color: red;
}
.post-like {
  justify-content: center;
  display: flex;
  padding-right: 7px;
}
.reaction-icn-1 {
  cursor: pointer;
  margin-top: 3px;
  font-size: 21px;
}
.disabled-icon {
  color: grey;
  cursor: not-allowed;
  margin-top: 3px;
  font-size: 21px;
}
.md-dialog-container {
  width: 400px;
}
.md-dialog {
  width: 400px;
}
.loginbtn {
  width: 100%;
}
.inline-btn {
  display: inline-flex;
  align-items: center;
}
.reaction-count {
  font-size: 11px;
  position: relative;
  top: 2.1px;
}
</style>
