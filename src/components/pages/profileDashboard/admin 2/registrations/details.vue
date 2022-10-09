<template>
  <div>
    <div class="col-sm-12 fl wrapper_order_table">
      <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="col-sm-12 pl-0 pr-0">
          <h4>Business Information</h4>
          <div class="row">
            <div class="col-sm-6 fl">
              <md-field>
                <label>Business Name</label>
                <md-input disabled v-model="details.trade_name_en"></md-input>
              </md-field>
            </div>

            <div class="col-sm-6 fl">
              <md-field>
                <label>Email</label>
                <md-input disabled v-model="details.email"></md-input>
              </md-field>
            </div>

            <div class="col-sm-6 fl">
              <md-field>
                <label>Password</label>
                <md-input
                  type="password"
                  disabled
                  v-model="details.password"
                ></md-input>
              </md-field>
            </div>

            <div class="col-sm-6 fl">
              <md-field>
                <label>Repeat Password</label>
                <md-input
                  disabled
                  v-model="details.password"
                  type="password"
                ></md-input>
              </md-field>
            </div>

            <div class="col-sm-6 fl margin_field mob_margin">
              <p class="label">Mobile</p>
              <vue-tel-input
                disabled
                v-model="details.mobile"
                placeholder="Mobile"
                class="country"
              ></vue-tel-input>
            </div>

            <div class="col-sm-6 fl margin_field mob_margin">
              <p class="label">Phone</p>
              <vue-tel-input
                disabled
                v-model="details.phone"
                placeholder="Landline"
                class="country"
              ></vue-tel-input>
            </div>

            <div class="col-sm-6 fl margin_field">
              <md-field>
                <label>Trade License Number</label>
                <md-input disabled v-model="details.license_number"></md-input>
              </md-field>
            </div>

            <div class="col-sm-6 fl margin_field mob_pdf">
              <a
                disabled
                :href="details.file ? details.file : null"
                target="_blank"
                ><div class="box_pdf"></div>
                <span class="pdf_text">
                  {{ details.file ? details.file : "No License File Uploaded" }}
                </span></a
              >
            </div>

            <div class="col-sm-12 fl margin_field">
              <p class="label">Activities *</p>
              <v-select
                v-model="details.activities"
                placeholder="Choose Activities #Shipping"
                class="tall-box"
                multiple
                disabled
              >
              </v-select>
            </div>

            <div class="col-sm-6 fl margin_field">
              <div class="md-layout-item">
                <p class="label">Legal Status *</p>
                <v-select
                  v-model="details.legal_status"
                  :options="['Civil Company', 'DMCC']"
                  placeholder="Legal Status"
                  disabled
                ></v-select>
              </div>
            </div>

            <div class="col-sm-6 fl margin_field">
              <div class="md-layout-item">
                <p class="label">Issued By *</p>
                <v-select
                  v-model="details.issued_by"
                  :options="['Local', 'Free Zone']"
                  placeholder="Issued By"
                  disabled
                ></v-select>
              </div>
            </div>

            <div class="col-sm-6 fl margin_field">
              <div class="md-layout-item">
                <p class="label">Country *</p>
                <v-select
                  v-model="details.country"
                  placeholder="Select Country"
                  disabled
                />
              </div>
            </div>

            <div class="col-sm-6 fl margin_field">
              <div class="md-layout-item">
                <p class="label">City *</p>
                <v-select
                  v-model="details.city"
                  placeholder="Select Country"
                  disabled
                />
              </div>
            </div>

            <div class="col-sm-12 fl mt-3 mb-1 title_contact">
              <h4>Contact Details</h4>
            </div>

            <div class="col-sm-6 fl" style="margin-top: 17px">
              <md-field>
                <label>Contact Person</label>
                <md-input
                  disabled
                  v-model="details.contact_details.contact_name"
                ></md-input>
              </md-field>
            </div>

            <div class="col-sm-6 contact_person">
              <p class="label">Contact Mobile</p>
              <vue-tel-input
                disabled
                v-model="details.contact_details.contact_number"
                placeholder="Contact Mobile"
                class="country"
              ></vue-tel-input>
            </div>

            <div
              class="col-sm-12 md-layout md-gutter md-alignment-center-center"
            >
              <div class="md-layout-item md-size-100 border_details"></div>
              <div class="md-layout-item md-size-33">
                <p class="label">Status *</p>
                <v-select
                  :clearable="false"
                  :options="[
                    { name: 'Active', value: 'Y' },
                    { name: 'In-Active', value: 'N' },
                  ]"
                  v-model="form.is_active"
                  placeholder="Select Status"
                  label="name"
                  :reduce="(el) => el.value"
                />
              </div>
              <div class="md-layout-item md-size-33">
                <p class="label">Verification Status *</p>
                <v-select
                  :clearable="false"
                  v-model="form.is_verified"
                  label="name"
                  :reduce="(el) => el.value"
                  :options="[
                    { name: 'Verified', value: '1' },
                    { name: 'Not Verified', value: '0' },
                  ]"
                  placeholder="Select Verification Status"
                />
              </div>
              <div class="md-layout-item fr">
                <loaderButton
                  @click="submit"
                  :loading="loading"
                  name="Invite User"
                  class="btn_submit fr"
                ></loaderButton>
                <!-- <md-button class="md-primary save_button">save</md-button> -->
              </div>
            </div>
            <div class="col-sm-12"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import loaderButton from "@/components/ui-components/loader-button.vue";
export default {
  name: "registrationDetails",
  props: ["details"],
  components: {
    loaderButton
  },
  created () {
    if (
      Object.keys(this.$route.params).length === 0 && this.$route.params.constructor === Object
    ) {
      this.$router.go(-1)
    } else {
      this.form.is_active = this.details.is_active
      this.form.is_verified = this.details.is_verified
    }

  },
  data () {
    return {
      loading: false,
      form: {
        is_active: "Y",
        is_verified: "N"
      }
    }
  },
  methods: {
    async submit () {
      this.loading = true
      try {
        const response = await axios.post("/admin/registrations/change/status", {
          profileid: this.details.id, ...this.form
        })

        if (response.data.success) {
          this.loading = false;
          this.$swal.fire(this.$helpers.successPopup(response.data.result));
          this.$router.go(-1);
          return
        }
      } catch (error) {
        if (error) {
          console.log(error);
          this.loading = false;
          this.$swal.fire(this.$helpers.errorPopup("Network error please try again."));
          return
        }
      }
    }
  }
}
</script>

<style scoped>
/* Abhishek */
.label {
  padding-bottom: 5px;
}

.btn_submit {
  height: 40px;
  margin-top: 13px;
}

.status_box {
  margin: 0px 22px;
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
.fl {
  float: left;
}
.fr {
  float: right;
}
.pdf_text .md-helper-text {
  right: 0px;
}
.country {
  border: none;
  border-bottom: solid 1px #949494;
  border-radius: 0px;
  min-height: 48px;
}

.box_pdf {
  width: 26px;
  height: 32px;
  float: left;
  margin: 20px 10px 0px 0px;

  background-image: url(~@/assets/images/mobile/pdf_icon.png);
  background-size: cover;

  background-repeat: no-repeat;
}

.pdf_text {
  float: left;
  margin-top: 30px;
  color: #4c98d1;
}
.activities {
  width: 100%;
  float: left;
  border: solid 1px #e4e3e3;
  border-bottom: solid 1px #949494;
  outline: none;
  background-color: #fff;
  padding: 8px 12px;
}
.activities::placeholder {
  color: #cccccc;
  font-size: 12px;
}
.contact_person {
  float: left;
  margin-top: 3px;
}
.border_details {
  float: left;
  width: 100%;
  height: 1px;
  background-color: #e4e3e3;
  margin: 30px 0px;
}

.save_button {
  background-color: #ff5722;
  height: fit-content;
  float: right;
  width: fit-content;
  color: #fff !important;
  padding: 10px 0px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.status_button {
  width: 100px;
  float: right;
  margin: -15px 20px 0px 0px;
}
.margin_field {
  margin-bottom: 23px;
}

span.md-helper-text {
  right: 0px;
}

@media screen and (max-width: 1200px) and (min-width: 1010px) {
  .wrapper_order_table {
    width: 100%;
    max-width: 100%;
  }
}
@media screen and (max-width: 1000px) {
  .rc-anchor-logo-portrait {
    margin-top: -68px !important;
  }
  .status_button {
    margin: -3px 20px 0px 0px;
  }
}

@media screen and (max-width: 600px) {
  .rc-anchor-logo-portrait {
    margin-bottom: 0px !important;
  }

  .title_contact h4 {
    margin-top: 12px;
  }

  .country {
    min-height: 36px;
  }
  .md-field {
    margin: 4px 0 13px !important;
  }
  .contact_person {
    float: left;
    margin-top: 20px;
  }

  .margin_field {
    margin-bottom: 0px !important;
  }
  .mob_margin {
    margin-top: 23px;
    margin-bottom: 12px !important;
  }
  .mob_pdf {
    margin-bottom: 25px !important;
  }

  .box_pdf {
    margin: 10px 10px 0px 0px;
  }

  .pdf_text {
    margin-top: 18px;
  }
  .rc-anchor-normal {
    margin-top: 20px;
  }

  .status_button {
    margin: -7px 10px 0px 0px;
  }
  .wrapper_order_table {
    width: 255px;
  }
}
@media screen and (max-width: 414px) {
  .status_button {
    margin: -7px 0px 0px 0px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .wrapper_order_table {
    width: 300px;
  }
  .status_button {
    margin: -8px 44px 0px 0px;
  }
}
</style>
