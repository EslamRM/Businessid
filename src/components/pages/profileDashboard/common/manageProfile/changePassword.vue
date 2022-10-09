<template>
  <div>
    <div class="col-sm-12 p-0 mob_size">
      <section class="first-sec">
        <div class="head">Change Password</div>
        <div class="col-sm-12 p-0">
          <form
            autocomplete="off"
            novalidate
            class="md-layout pos-rel formLoginBox"
            @submit.prevent="handleSubmit"
          >
          <div class="row">
            <div class="col-sm-12 col-md-4 fl">
              <md-field>
                <label class="form-label">Old password</label>
                <md-input name="old_password" v-model="form.old_password" :disabled="sending" ></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="col-sm-12 col-md-4 fl">
              <md-field>
                <label class="form-label">New password </label>
                <md-input name="new_password" v-model="form.new_password" :disabled="sending" ></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="btn-wrap text-center col-sm-12 col-md-4 fl">
              
                <loaderButton
                  class="padding_button"
                  @click="submitForm"
                  name="Update Password"
                  :loading="loading"
                ></loaderButton>
              
            </div>
          </div>
          </form>
          <md-snackbar class="snack-bar" :md-active.sync="showSnackbar">{{
              message
            }}</md-snackbar>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import loaderButton from "@/components/ui-components/loader-button.vue";
import inputComponent from "@/components/ui-components/input.vue";
import { mapState } from 'vuex'
export default {
  name: "FormValidation",
  mixins: [validationMixin],
  components: { loaderButton, inputComponent },
  data: () => ({
    form: {
      new_password: null,
      old_password: null
    },
    message: "",
    showSnackbar: false,
    position: "left",
    loginError: null,
    submitted: false,
    submitStatus: null,
    sending: false
  }),
  validations: {
    form: {
      old_password: {
        required,
        minLength: minLength(3)
      },
      new_password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
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
        const response = await axios.post("/profile/change_password", this.form);
        if (await response.data.success) {
          this.loading = false;
          await this.$swal.fire(
            this.$helpers.successPopup("New password has been updated.")
          );
        } else {
          this.loading = false;
          await this.$swal.fire(
            this.$helpers.errorPopup("Error Updating password!<br> Please verify your old password!")
          );
        }
      } catch (error) {
        this.loading = false;
        await this.$swal.fire(this.$helpers.errorPopup("Error Updating password!"));
      }
    }

  }
};
</script>
<style scoped>
section {
  margin-bottom: 1.5em;
}
section .head {
  font-size: 14px;
  font-weight: 600;
}
.info {
  text-align: center;
  color: #ff5722;
}
.btn-wrap {
  align-items: center;
  display: flex;
}
.btn-wrap .md-button {
  height: 37px;
}
.mob_size {
  margin-top: 30px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}

@media screen and (max-width: 768px) {
  .mob_size {
    margin-top: 20px;
    margin-bottom: 20px;

  }
}
@media screen and (max-width: 600px) {
  .mob_size {
    margin-top: 10px;
    margin-bottom: 10px;

  }

  section .head {
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .md-field {
    margin: 0px 0 20px !important;
  }
  .button_password {
    width: fit-content;
    padding: 0px 10px;
    margin-left: 0px;
  }
}

@media screen and (max-width: 320px) {

  .btn-wrap .md-button {
    height: 34px;
  }
}
</style>
