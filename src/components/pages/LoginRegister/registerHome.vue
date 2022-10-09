<template>
  <div class="container padding_mob">
    <div class="register-welcome">
      <div class="acc-type-wrap text-center">
        <div class="mb-7 text-center">
          <h2 class="login-head mb-0">Register.</h2>
          <div class="sign-up">
            Already have an account?
            <router-link to="/logIn" class="goto-signup"
              ><span> Log In</span></router-link
            >
          </div>
        </div>
        <label>Choose your Account type</label>
        <div class="acc-type">
          <div class="types">
            <router-link exact to="/personalAccount" active-class="pill-active">
              <md-button
                ><i class="material-icons">person</i>Personal</md-button
              >
            </router-link>
          </div>
          <div class="types">
            <router-link exact to="/businessAccount" active-class="pill-active">
              <md-button
                ><i class="material-icons">business_center</i
                >Business</md-button
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>
<style scoped>
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
  font-size: 1.1em;
}
.mt-2 {
  margin-top: 2em !important;
}
.mb-7 {
  margin-bottom: 2rem !important;
}
.acc-type-wrap {
  width: 100%;
  padding: 4.3em 0;
}
.acc-type-wrap label {
  font-size: 18px;
  font-weight: 300;
  margin-top: 2em;
  display: block;
}
.acc-type {
  width: 100%;
  margin-top: 2em;
}
.acc-type .types:nth-child(1) {
  margin-right: 1.7em;
}
.types {
  display: inline-block;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.types .md-button {
  display: flex;
  align-items: center;
  width: 191px;
  height: 161px;
  /* border-top: 3px solid transparent; */
}
.types .md-button i {
  display: flex;
  font-size: 6em;
  color: #ff5722;
}
/*.login-wrap section:nth-child(1){
    width: 100%;
    max-width: 339px;
  }*/
.password-eye .md-toggle-password {
  width: 43px !important;
  min-width: 43px;
  height: 43px;
  top: 6px;
}
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
  margin-top: 1.2em;
}
.goto-signup {
  color: #ff5722 !important;
  font-weight: 500;
}
.pill-active .md-button {
  background-color: transparent !important;
  border-top: 3px solid #ff5722;
}
.register-welcome {
  width: 100%;
  height: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* min-height: 57vh; */
}

@media screen and (max-width: 769px) {
  .types .md-button {
    width: 150px;
    height: 126px;
    margin: 0px;
  }
  .types .md-button i {
    font-size: 5em;
  }
  h2.login-head {
    font-size: 32px;
  }

  .acc-type-wrap {
    width: 100%;
    padding: 4.3em 0;
    padding-bottom: 30px;
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
    padding-bottom: 0px;
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
  .padding_mob{padding-left: 15px ; padding-right: 15px ;}
}

@media screen and (max-width: 300px) {
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
}
</style>
