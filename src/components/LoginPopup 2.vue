<template>
     <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Login</md-dialog-title>
             <form novalidate class="md-layout pos-rel formLoginBox" @submit.prevent="handleLogin">
               <md-dialog-content>
              <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-100">
                    <md-field >
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                      <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.form.email.required">Email is required</span>
                                    <span v-if="!$v.form.email.email">Email is invalid</span>
                    </div>
                  </md-field>
                  <md-field>
                    <label for="password">Password</label>
                    <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
                      <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
                         <span v-if="!$v.form.password.required">Password is required</span>
                      </div>
                  </md-field>
                    <md-progress-bar md-mode="indeterminate" v-if="sending" />
                    <div class="forgot-password">Forgot your password ?</div>
                    <div class="btn-wrap">
                         <md-button class="md-raised md-accent md-block" type="submit" :disabled="sending">Log In</md-button>
                       </div>
                   <span class="error-fill">{{loginError}}</span>
                  </div>
              </div>
            </md-dialog-content>
              <md-snackbar :md-active.sync="userSaved">Login Successfull!!!</md-snackbar>
            </form>
            <md-dialog-actions>
              <md-button class="md-primary" @click="showDialog = false">Close</md-button>
              <md-button class="md-primary" @click="showDialog = false">Save</md-button>
            </md-dialog-actions>
          </md-dialog>
</template>
<script>
import axios from 'axios';
import {mapState} from 'vuex';
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength
  } from 'vuelidate/lib/validators'
export default {
    name:"LoginPopup",
    mixins: [validationMixin],
    data() {
        return {
            showDialog:false,
            loginError:null,
            submitted: false,
            sending: false,
            userSaved: false,
              form: {
              email: null,
              password:null
            },
          }
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
     handleSubmit(e){
      this.submitted = true; 
     
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
          return;
       }
         this.sending = true;   
         this.$store.dispatch("LOGIN",{
         email:this.form.email,
         password:this.form.password
       }).then(success => {
        this.sending = false;   
        console.log("success")
        this.$router.push("/")
       })
       .catch(error=>{
          this.sending = false;   
          this.loginError = error.data ;
         
       })
     }
       
}
</script>

<style scoped>

</style>