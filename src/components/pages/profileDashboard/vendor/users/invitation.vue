//TODO:
//1. Change invitation Icon
//2. Accept Terms and conditions - underline
//3. Packages Integration
<template>
  <div>
    <!---------->
    <!-- Add Staff Owners -->
    <!---------->
    <section>
      <!-- <div class="md-layout md-alignment-center-center wrapper_order_table">
        <div class="md-layout-item md-size-50">
          <h2 class="title">Welcome, Smart LLC Pvt.</h2>
        </div>
      </div> -->
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-layout md-alignment-center-center md-size-60 md-medium-size-70 md-small-size-90 wrapper_order_table">
          <div class="md-layout-item md-size-100">
            <center>
              <img
                class="image"
                src="./invite.jpeg"
              />
            </center>
          </div>
          <div class="md-layout-item heading md-size-100">
            <h2 class="company-name">Welcome to {{ $route.query.company }}</h2>
            <h2 class="invite-title">
              Would you like to accept our invitation ?
            </h2>
          </div>
          <div class="md-layout-item md-layout md-size-100 md-alignment-top-space-around ">
            <div class="md-layout-item button">
              <md-button
                style="text-decoration: underline"
                class="md-primary   fr"
              >
                <md-checkbox
                  class="fr"
                  v-model="terms_and_conditions"
                >{{terms_and_conditions ? 'Accepted' : 'Accept'}}</md-checkbox>
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
                  <TermsAndConditions :content="{businessname: 'BusinessId.Net', owners: [{name: user.trade_name_en}]}"></TermsAndConditions>
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
          </div>
          <div class="md-layout-item md-layout md-alignment-top-space-around md-gutter heading buttons-group">
            <div class="md-layout-item button">
              <loader-button
                @click="changeStatus('Declined')"
                :loading="DeclinedLoading"
                name="No"
                class="fr"
              ></loader-button>
            </div>
            <div class="md-layout-item button">
              <loader-button
                :disabled="!terms_and_conditions"
                @click="changeStatus('Accepted')"
                :loading="AcceptedLoading"
                :primary="true"
                name="Yes, Sure"
                class="fl"
              ></loader-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import axios from "axios";

import loaderButton from "@/components/ui-components/loader-button.vue";
import TermsAndConditions from "@/components/pages/termsAndCondition/termsAndConditions.vue"

export default {
  components: { loaderButton, TermsAndConditions },
  created () {
    this.url = this.$route.fullPath.split("/")
    this.token = atob(this.$route.query.token)
    this.user = JSON.parse(atob(this.$route.query.user))
  },
  data () {
    return {
      url: [],
      token: "",
      user: "",
      AcceptedLoading: false,
      DeclinedLoading: false,
      terms_and_conditions: false,
      showDialog: false
      //   token: this.url[2],
      //   invitation_id: this.url[3],
      //   company: this.url[4],
    }
  },
  methods: {
    async changeStatus (status) {
      status === "Accepted" ? this.AcceptedLoading = true : this.DeclinedLoading = true
      const response = await axios.post("/common/accept-invitation", {
        token: this.token,
        invitation_id: this.$route.query.invitation_id,
        status
      })
      if (response.data.success) {
        status === "Accepted" ? this.AcceptedLoading = false : this.DeclinedLoading = false
        await this.$swal.fire(this.$helpers.successPopup(response.data.message));
        if (status === "Accepted" && !response.data.user.is_active) {
          this.$router.push({
            name: "resetPassword", params: {
              user: response.data.user
            }
          })
        } else {
          this.$router.push("/")
        }
      } else {
        status === "Accepted" ? this.AcceptedLoading = false : this.DeclinedLoading = false
        await this.$swal.fire(this.$helpers.errorPopup(response.data.message));
      }

      console.log(response)
    },
    handleModalClick (type) {
      this.showDialog = false
      if (type === 'reject') {
        this.terms_and_conditions = false
        return
      }
      this.terms_and_conditions = true
    }
  }

};
</script>

<style scoped>
section {
  margin-top: 5%;
}
.image {
  width: 150px;
  height: 150px;
  margin: 0px 20px;
}

.company-name {
  font-size: 21px;
  font-weight: 500;
  padding-top: 18px;
  color: #828282;
  text-align: center;
}

.buttons-group {
  margin: 30px 200px;
}

.button {
  padding: 20px;
}
.button .md-button {
  height: 40px;
}

h2.invite-title {
  /* font-size: 3em; */
  font-size: 32px;
  font-weight: 500;
  color: #191919;
  text-align: center;
  padding-top: 22px;
}

.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}

@media screen and (max-width: 769px) {
  h2.invite-title {
    font-size: 32px;
  }
}
@media screen and (max-width: 320px) {
  .image {
    width: 100px;
    height: 100px;
  }
  h2.invite-title {
    font-size: 19px;
  }
  comany-name {
    font-size: 16px;
  }
}

@media screen and (max-width: 600px) {
  h2.invite-title {
    font-size: 24px;
  }
}
</style>
