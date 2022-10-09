<template>
  <div>
    <!---------->
    <!-- Add Staff Owners -->
    <!---------->
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <div class="col-sm-12 p-0 fl">
        <div class="col-sm-8 p-0 fl title_main">Add Staff</div>
        <div class="fr">
          <md-button
            @click="inviteUserModal()"
            class="md-raised md-primary btn_register btn_invite_user btn_add"
          >
            <i class="material-icons">add</i>
            <span>Add Staff</span>
          </md-button>
        </div>
      </div>

      <!---------->
      <!-- Add Staff Dialog -->
      <!---------->
      <md-dialog :md-active.sync="showDialog">
        <div class="modal-header">
          <md-dialog-title>Add Staff</md-dialog-title>
          <div class="modal-close">
            <i class="material-icons" @click="showDialog = false"> close </i>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-12 col-xl-12 fl modal-body"
          v-if="showDialog"
        >
          <div class="col-sm-12 p-0 fl">
            <div class="col-sm-8 p-0 fl title_main">Add Staff Details</div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl">
            <md-field
              :class="{
                'md-invalid':
                  inviteSubmitted &&
                  (!$v.invite.name.required || !$v.invite.name.minLength),
              }"
            >
              <label>Name</label>
              <md-input v-model="invite.name" required></md-input>
              <span class="md-error" v-if="$v.invite.name.required"
                >Name is required</span
              >
              <span class="md-error" v-if="$v.invite.name.minLength">
                Name is too short</span
              >
            </md-field>
          </div>
          <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
            <md-field
              :class="{
                'md-invalid': checkValidationInvite('designation'),
              }"
            >
              <label>Designation</label>
              <md-input v-model="invite.designation" required></md-input>
              <span class="md-error">Designation is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pl-0 mob_pl fl margin_email">
            <md-field
              :class="{
                'md-invalid': checkValidationInvite('email'),
              }"
            >
              <label>Email</label>
              <md-input v-model="invite.email" required></md-input>
              <span class="md-error">Email is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
            <vue-tel-input
              v-model="invite.mobile"
              placeholder="Mobile"
            ></vue-tel-input>
            <div
              class="c-forminlineError"
              v-if="checkValidationInvite('mobile')"
            >
              <span> Mobile is required </span>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
            <p class="label">Country *</p>
            <v-select
              v-model="invite.nationality"
              label="name"
              :options="currencies"
              :reduce="(element) => element.name"
              placeholder="Nationality"
            ></v-select>
            <div
              class="c-forminlineError"
              v-if="checkValidationInvite('nationality')"
            >
              <span> Nationality is required </span>
            </div>
          </div>

          <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
            <p class="label">&nbsp;</p>
            <md-radio v-model="invite.gender" value="male">Male</md-radio>
            <md-radio v-model="invite.gender" value="female">Female</md-radio>
            <div
              class="c-forminlineError"
              v-if="checkValidationInvite('gender')"
            >
              <span> Gender is required </span>
            </div>
          </div>
          <div class="col-sm-12 pr-0 pl-0 fl mob_pl margin_selection_third">
            <p class="label">User Permissions</p>
            <md-checkbox @change="grantAll" v-model="grantAllFlag"
              >Admin
            </md-checkbox>
            <div>
              <md-checkbox
                v-for="(item, id) in permissions"
                :key="id"
                v-model="invite.permissions"
                :value="item.id"
              >
                {{ item.permission }}
              </md-checkbox>
            </div>
          </div>

          <div class="col-sm-12 p-0 fr">
            <div class="fr">
              <loaderButton
                @click="inviteUser()"
                name="Invite User"
                :class="{ disabled_color: inviteSubmitted && $v.$invalid }"
                class="btn_register"
                :loading="inviteLoading"
                :disabled="inviteSubmitted && $v.$invalid"
              ></loaderButton>
            </div>
          </div>
        </div>
      </md-dialog>
      <!---------->
      <!-- Staff Table -->
      <!---------->
      <div
        class="col-sm-12 pl-0 mt-4 pr-0 fl"
        v-infinite-scroll="loadStaff"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <md-table>
          <md-table-row class="header_table_wallet">
            <md-table-head md-numeric><h3>ID</h3></md-table-head>
            <md-table-head><h3>Image</h3></md-table-head>
            <md-table-head><h3>Name</h3></md-table-head>
            <md-table-head><h3>Permisions</h3></md-table-head>

            <md-table-head><h3>Status</h3> </md-table-head>

            <md-table-head><h3>Action</h3></md-table-head>
          </md-table-row>

          <md-table-row v-for="(item, id) in staff" :key="id" class="bg_row">
            <md-table-cell md-numeric> {{ item.profileid }} </md-table-cell>
            <md-table-cell class="table_padding">
              <img
                v-if="item.user.logo"
                :src="item.user.logo"
                :alt="item.user.trade_name_en"
              />
              <div v-else class="profile-default-text">
                <span class="text">{{
                  item.user.trade_name_en.substring(0, 1)
                }}</span>
              </div>
            </md-table-cell>
            <md-table-cell class="table_padding capitalize"
              ><router-link
                v-if="item.status"
                :disabled="true"
                :to="
                  /profiletimeline/ +
                  $helpers.slugify(item.user.trade_name_en) +
                  '/' +
                  item.user.id
                "
              >
                {{ item.user.trade_name_en }}
              </router-link>

              <span v-else>{{ item.user.trade_name_en }}</span>
            </md-table-cell>
            <md-table-cell
              class="table_padding capitalize"
              v-if="newPermissions[0].permissions"
            >
              <div class="md-layout">
                <div
                  class="md-layout-item md-size-33"
                  v-for="(element, index) in permissions"
                  :key="index"
                >
                  <md-checkbox
                    v-model="newPermissions[id].permissions"
                    :disabled="!newPermissions[id].editting"
                    :value="element.id"
                  >
                    {{ element.permission }}
                  </md-checkbox>
                </div>
              </div>
            </md-table-cell>

            <md-table-cell class="table_padding">
              <span
                :class="{
                  label_green: item.user.is_active === 'Y',
                  label_red: item.user.is_active === 'N',
                  label_gray: !item.status,
                }"
              >
                {{
                  item.status
                    ? item.user.is_active === "Y"
                      ? "Active"
                      : "In-Active"
                    : "Pending"
                }}
              </span>
            </md-table-cell>
            <md-table-cell class="action_column">
              <div class="md-layout width_btn_user">
                <div
                  class="
                    md-item-layout md-size-50 md-alignment-center-space-between
                  "
                  v-if="newPermissions[id].editting"
                >
                  <md-button
                    class="md-raised md-primary btn_edit"
                    @click="
                      updatePermission(
                        item.profileid,
                        newPermissions[id].permissions
                      );
                      newPermissions[id].editting = false;
                    "
                  >
                    <i class="material-icons action_icon">done</i>
                  </md-button>
                </div>
                <div
                  class="md-item-layout md-size-50"
                  v-if="newPermissions[id].editting"
                >
                  <md-button
                    class="md-raised md-primary btn_delete"
                    @click="
                      (newPermissions[id].editting = false),
                        (newPermissions[id].permissions = [
                          ...staff[id].permissions,
                        ])
                    "
                  >
                    <i class="material-icons action_icon">clear</i>
                  </md-button>
                </div>
                <div
                  class="md-item-layout md-size-50"
                  v-if="!newPermissions[id].editting"
                >
                  <md-button
                    class="md-raised md-primary btn_edit"
                    @click="newPermissions[id].editting = true"
                  >
                    <i class="material-icons action_icon">edit</i>
                  </md-button>
                </div>
                <div
                  class="md-item-layout md-size-50"
                  v-if="!newPermissions[id].editting"
                >
                  <md-button
                    class="md-raised md-primary btn_delete"
                    @click="deleteUser(item.profileid, id)"
                  >
                    <i class="material-icons action_icon">delete</i>
                  </md-button>
                </div>
              </div>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <md-table>
          <transition name="fade">
            <md-table-row v-if="tableLoader">
              <md-table-cell colspan="11" md-numeric
                ><center>
                  <div class="loading-1 loading"></div></center
              ></md-table-cell>
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noInvoicesFound">
              <md-table-cell colspan="11" md-numeric
                ><center>
                  <h1 class="no-orders-found">No sub users found.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noMoreInvoices">
              <md-table-cell colspan="11" md-numeric
                ><center>
                  <h1 class="no-orders-found">No more sub users.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
        </md-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  required,
  minLength,
  numeric,
  email,
  checked,
} from "vuelidate/lib/validators";

import country from "@/helpers/country.js";
import loaderButton from "@/components/ui-components/loader-button.vue";
export default {
  // uploadFiles is defined in this Mixin
  mixins: [country],
  components: { loaderButton },
  data() {
    return {
      test: [],
      currencies: [],
      inviteLoading: false,
      inviteSubmitted: false,
      showDialog: false,
      invite: {
        name: "",
        designation: "",
        email: "",
        mobile: "",
        nationality: "",
        gender: "",
        permissions: [],
      },
      form: {
        page: 0,
      },
      grantAllFlag: false,
      permissions: [],

      // Staff Table
      newPermissions: [],
      editting: false,
      staff: [],
      busy: false,
      tableLoader: true,
      noMoreInvoices: false,
      noInvoicesFound: false,
    };
  },
  created() {
    this.postRequest("api_country", {}, "currencies");
    this.loadStaff();
    this.loadPermissions();
  },

  methods: {
    async inviteUserModal() {
      this.showDialog = true;
    },
    async loadPermissions() {
      const response = await axios.post("/vendor/sub-user-permissions");
      this.permissions = await response.data.result;
    },
    async inviteUser() {
      this.inviteLoading = true;
      this.inviteSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.inviteLoading = false;
        return;
      }

      try {
        const postResponse = await axios.post(
          "/vendor/add-sub-user",
          this.invite
        );
        if (postResponse.data.success) {
          this.inviteLoading = false;
          this.showDialog = false;
          this.refresh();
          this.$swal.fire(
            this.$helpers.successPopup(postResponse.data.message)
          );
          return;
        } else {
          this.inviteLoading = false;
          this.showDialog = false;
          this.refresh();
          this.$swal.fire(this.$helpers.errorPopup(postResponse.data.message));
          return;
        }
      } catch (error) {
        console.log(error);
        this.inviteLoading = false;
        this.$swal.fire(
          this.$helpers.errorPopup("Error inviting user. Please try again.")
        );
        return;
      }
    },
    async loadStaff(type) {
      console.log("run");
      if (this.busy) return;
      this.tableLoader = true;
      this.busy = true;
      this.form.page++;

      // const data = this.form;
      console.log(this.form.page);
      console.log("page hit");
      const response = await axios.post("/vendor/sub-users", this.form);

      const { result, message, success } = await response.data;

      if (!success) {
        if (message && message === "No subuser found") {
          type === "refresh"
            ? (this.noInvoicesFound = true)
            : (this.noMoreInvoices = true);
        }
        this.tableLoader = false;
        this.busy = true;
      } else {
        this.tableLoader = false;
        this.busy = false;
        this.staff = await [...this.staff, ...result];
        console.log("exec");
        this.newPermissions = [];
        await this.staff.forEach((el) => {
          console.log(el);
          this.newPermissions.push({
            permissions: [...el.permissions],
            editting: false,
          });
        });
        this.staff = this.staff.filter((el) => el.user != null);
      }
    },
    grantAll(grantAllPermissions) {
      if (grantAllPermissions) {
        this.invite.permissions = this.permissions.map((prm) => prm.id);
      } else {
        this.invite.permissions = [];
      }
    },
    async updatePermission(userid, permissions) {
      try {
        const response = await axios.post(
          "/vendor/update-sub-user-permissions",
          {
            userid,
            permissions,
          }
        );
        if (!response.data.success) {
          await this.$swal.fire(
            this.$helpers.errorPopup(response.data.message)
          );
        }
        this.refresh();
        await this.$swal.fire(
          this.$helpers.successPopup(response.data.message)
        );
      } catch (error) {
        console.log(error);
        this.$swal.fire(this.$helpers.errorPopup(error));
      }
    },
    async deleteUser(userid, id) {
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: "Are you sure you want to DELETE user?",
        html: '<p style="font-size: 10px; padding-top: 10px" >You cannot undo this action.</p>',
        cancelButtonColor: "#ff5722",
        confirmButtonColor: "#64dd17",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      });

      if (Reasons) {
        try {
          const response = await axios.post("/vendor/delete-sub-user", {
            userid,
          });
          const { success, message } = await response.data;
          if (await success) {
            await this.$swal.fire(
              this.$helpers.successPopup("User Deleted Successfully.")
            );
            console.log(id);
            this.staff.splice(id, 1);
            this.newPermissions.splice(id, 1);
          } else {
            await this.$swal.fire({
              position: "center",
              icon: "error",
              title: "Error, deleting user. Please try again later",
              showConfirmButton: false,
              timer: 15000,
              showCancelButton: true,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          await this.$swal.fire({
            position: "center",
            icon: "error",
            title: 'Error, Please Try Again. "Network Error" ',
            showConfirmButton: false,
            timer: 15000,
            showCancelButton: true,
            timerProgressBar: true,
          });
        }
      }
    },
    refresh() {
      this.busy = false;
      this.noMoreInvoices = false;
      this.noInvoicesFound = false;
      this.form.page = 0;
      this.staff = [];
      this.loadStaff("refresh");
    },
    checkValidationInvite(field) {
      if (!this.showDialog) return;
      return this.inviteSubmitted && !this.$v.invite[field].required;
    },
  },
  validations() {
    if (this.showDialog) {
      return {
        invite: {
          name: {
            required,
            minLength: minLength(3),
          },
          designation: {
            required,
            minLength: minLength(3),
          },
          email: {
            required,
            email,
          },
          mobile: {
            required,
          },
          nationality: {
            required,
          },
          gender: {
            required,
          },
        },
      };
    } else {
      return {
        form: {
          recaptchaVerified: {
            checked: (value) => value === true,
          },
          email: {
            required,
            email,
          },
          mobile: {
            required,
          },
          country: {
            required,
          },
        },
      };
    }
  },
};
</script>
<style scoped>
/* File Input */
.disabled_color {
  background-color: #efefef !important;
}

/* Md Dialog */
.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-close {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 27px;
  width: 27px;
}
.modal-close i {
  font-size: 20px;
  position: relative;
  top: 1px;
  left: 1px;
  color: #213a63;
}

.md-dialog {
  width: 100%;

  overflow: inherit !important;
}
.modal-header {
  border-bottom: 1px solid #eee;
}

.modal-body {
  width: 775px;
  padding-bottom: 20px;
}
.md-dialog-title {
  margin-bottom: 9px;
  padding: 13px 19px 0;
  font-size: 16px;
  font-weight: 600;
  opacity: 1;
  color: #222;
}

/* Loading Icon */
.loading-1 {
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  width: 50px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px solid #ff5722;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s ease infinite;
  z-index: 10;
}
.loading-1:before {
  z-index: 5;
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px dashed #fff;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s linear infinite;
}

@keyframes loading1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* loading */

/* Labels - Active Inactive */
.md-table-cell-container img {
  width: 35px;
  float: left;
  height: 35px;
  margin-bottom: 5px;
  border-radius: 100%;
  border: solid 1px #c8d2e0;
}
.label_green {
  background: #64dd17;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
}

.label_red {
  background: #ff5733;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  width: 71px;
}

.label_gray {
  background: #e6e4e4;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  width: fit-content;
}

.action_column {
  width: 170px;
}
.action_column .md-item-layout {
  margin: 0px 10px;
}

.btn_edit {
  min-width: 20px;
  height: 32px;
  border-radius: 3px;
  width: 38px;
}

.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
}
/* Abhishek */
.label {
  padding-bottom: 5px;
}

.owner {
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 18%);
  position: relative;
  background-color: #efefef;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
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
.title_main {
  color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  font-size: 20px;
  font-weight: 600;
  margin: 9px 0px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}

.btn_register {
  color: #fff;
  background-color: #ff5722;
  min-width: 125px;
  height: 35px;
  margin-top: 30px;
}
.btn_invite_user {
  margin-top: 0px;
}

.btn_delete {
  min-width: 20px;
  height: 32px;
  background-color: #ff5722 !important;
  border-radius: 3px;

  width: 38px;
}

.btn_delete i {
  font-size: 20px !important;
}

.btn_add {
  background-color: #213c64 !important;
  margin-right: 5px;
  min-width: 110px;
}

.btn_register i {
  margin-right: 3px;
  float: left;
}
.btn_register span {
  float: left;
  margin-top: 5px;
}
.margin_mobile {
  margin-top: 13px;
}

.margin_selection {
  margin-top: 35px;
}
.margin_selection_second {
  margin-top: 9px;
}
.margin_selection_third {
  margin-top: 35px;
}
.margin_title {
  margin-top: 50px;
}
.margin_contact {
  margin-top: 5px;
}
.margin_contact_two {
  margin-top: 28px;
}
.mrgn_add {
  margin-right: 0px;
  margin-top: 25px;
}
.mrgn_add_two {
  margin-right: 0px;
  margin-top: 0px;
}
.margin_mobile_second {
  margin-top: 15px;
}
.margin_email_second {
  margin-top: -8px;
}
.margin_captcha {
  margin-top: 15px;
}
.margin_radio {
  margin-top: 25px;
}

.margin_email {
  margin-top: -10px;
  height: 48px;
}
/*-----table_style_start-----*/
.bg_row {
  background-color: #f6f6f6;
}

.md-table.md-theme-default .md-table-row td {
  border: none !important;
}
.header_table_wallet {
  background-color: #213c64;
  margin-top: 30px;
}
.header_table_wallet h3 {
  color: #fff !important;
  font-weight: 400;
}

/*-----table_style_end-----*/
@media screen and (max-width: 768px) {
  .btn_register {
    margin-top: 23px;
    margin-right: 0px;
  }
  .width_btn_user .md-item-layout.md-size-50 {
    width: 50px;
    float: left;
  }
  .width_btn_user {
    width: 140px;
  }

  .md-layout {
    display: block !important;
  }
  .btn_register i {
    margin-top: 1px;
  }
  .btn_add {
    margin-right: 8px !important;
  }

  .mrgn_add {
    margin-right: 0px !important;
    margin-top: 25px;
  }
  .mrgn_add_two {
    margin-right: 0px !important;
    margin-top: 0px;
  }
}

@media screen and (max-width: 600px) {
  .title_main {
    width: fit-content;
    margin-top: 7px;
  }

  .mob_pr {
    padding-left: 0px !important;
  }
  .mob_pl {
    padding-right: 0px !important;
  }

  .margin_email_mob {
    margin-top: -10px;
  }
  .margin_mobile_mob {
    margin-top: 38px;
  }
  .margin_license_mob {
    margin-top: -10px;
  }

  .margin_title {
    margin-top: 45px;
  }
  .margin_contact {
    margin-top: 15px;
  }
  .margin_contact_two {
    margin-top: 15px;
  }
  .margin_captcha {
    margin-top: 10px;
  }
  .btn_register {
    width: 115px;
  }
  .mob_width {
    width: 100%;
    margin-left: -3px;
    float: left;
  }
  .btn_register {
    float: right;
  }
  .margin_selection_second {
    margin-top: 35px;
  }
  .mrgn_add_two {
    margin-top: 25px;
    margin-right: 0px !important;
    float: right;
  }
  .mrgn_add {
    margin-right: 0px !important;
    float: right;
  }

  .mob_mr_two {
    margin-top: 40px;
  }
  .mob_top {
    margin-top: 20px;
  }
}

@media screen and (max-width: 420px) and (min-width: 410px) {
  .mob_width {
    width: 100%;
    margin-left: 15px;
    float: left;
  }
  .btn_register {
    margin-right: 15px;
  }
}
@media screen and (max-width: 360px) {
  .rc-anchor-normal {
    height: 74px;
    width: 91%;
  }
}

@media screen and (max-width: 300px) {
  .title_main {
    font-size: 13px;
  }

  .btn_register {
    width: 110px;
    min-width: 92px;
  }
  .btn_register span {
    font-size: 11px;
  }
  .md-button-content {
    font-size: 5px !important;
  }
  .btn_add {
    margin-right: 4px !important;
  }
  .btn_register strong {
    font-size: 11px;
  }
  .btn_register i {
    margin-right: 0px;
  }

  .rc-anchor-normal {
    height: 74px;
    width: 50% !important;
  }
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .md-layout-item.md-size-33{
    min-width: 50%;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .md-layout-item.md-size-33{
    min-width: 100%;
  }
}
</style>
