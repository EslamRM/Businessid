<template>
  <div>
    <div class="container pzero">
      <div class="form-wrap">
        <!-- <div class="md-layout-item md-size-100">
              <section>
              <div class="head">Type of Accounts</div>
              <div>
                 <md-radio v-model="account_type" value="company">Company account  </md-radio>
                 <md-radio v-model="account_type" value="business_man">Business Man</md-radio>
                 <md-radio v-model="account_type" value="business_woman">Business Woman</md-radio>
              </div>
            </section>
          </div> -->
        <!-- <companyAccount v-if="isCompany" /> -->
        <salesRegistration
          v-if="isCompany"
          page="businessSignUp"
        />
        <businessPerson
          v-if="isBusiness"
          :accountType="account_type"
        />
        <md-snackbar :md-active.sync="userSaved">{{ message }}</md-snackbar>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";
import companyAccount from "./companyAccount";
import businessPerson from "./businessPerson";
import salesRegistration from "@/components/pages/profileDashboard/sales/registrations.vue"
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxValue,
  numeric,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "businessAccount",
  components: {
    VueTagsInput,
    companyAccount,
    businessPerson,
    salesRegistration
  },
  mixins: [validationMixin],
  data () {
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
      account_type: "company",
      countries: {},
      cities: {},
      legalStatus: {},
      activities: [],
      form: {
        password: "",
        activities: "",
        contactmobile: "",
        nationality: "",
        em_id_number: "",
        businessname: "",
        manager_name: "",
        email: "",
        mobile: "",
        landline: "",
        account_type: "",
        license_number: "",
        legal_status: "",
        issued_by: "",
        country: "",
        city: "",
        contactperson: ""
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
      manager_name: {
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
      account_type: {
        required
      },
      license_number: {
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
      contactperson: {
        required
      },
      contactmobile: {
        required
      },
      password: {
        required
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password")
      }
    }
  },

  created () {
    this.$store
      .dispatch("GET_COUNTRY")
      .then(response => (this.countries = response.data.result));
    this.$store
      .dispatch("GET_LEAGAL_STATUS")
      .then(response => (this.legalStatus = response.data.result));
  },
  watch: {
    tag: "initItems",
    account_type: function (newVal, oldVal) {
      {
        if (newVal == "company") {
          this.isBusiness = false;
          this.isCompany = true;
        } else {
          this.isBusiness = true;
          this.isCompany = false;
        }
      }
    }
  },
  methods: {
    onChange () {
      this.form.city = "";
      const country_id = this.form.country;
      this.$store
        .dispatch("GET_CITY", country_id)
        .then(response => (this.cities = response.data.result));
    },
    handleSubmit (e) {
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
          console.log(response.data.success);
          if (response.data.success == true) {
            this.message =
              "Busniess request sent successfully, we will contact you soon. Contact us at support@uaect.com ";
            this.userSaved = true;
            this.form = {};
            setTimeout(() => {
              this.sending = false;
              this.$router.push("/");
            }, 3000);
          } else {
            console.log("inside false");
            this.sending = false;
            this.message = response.data.message;
            this.userSaved = true;
          }
        })
        .catch(error => {
          this.sending = false;
          console.log(error);
        });
    },
    //toggle input onclick of search
    update (newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems () {
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
  /* width: 55%; */
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2.5em;
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

@media screen and (max-width: 1000px) {
  .form-wrap {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 2.5em;
    margin-top: 20px;
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

  iframe {
    width: 50px !important;
  }
}
</style>
