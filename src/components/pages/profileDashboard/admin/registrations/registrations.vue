<template>
  <div>
    <div class="col-sm-7 col-md-6 col-xl-12 fl wrapper_order_table registration_table list_size">
      <!-- <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="col-sm-12 pl-0 pr-0">
          <div class="col-sm-8 col-md-12 col-xl-8  box_date">
            <input
              type="text"
              placeholder="search"
              class="pl-0"
              v-model="form.order_number"
            />

            <button>
              <i
                data-v-630689f1
                class="material-icons f-s-19"
                @click="loadPendingOrders"
                >search</i
              >
            </button>

            <button class="reresh_button" @click="loadPendingOrders">
              <i data-v-630689f1 class="material-icons f-s-19">refresh</i>
            </button>

            <select class="list_button">
              <option>Active</option>
              <option>In Active</option>
            </select>

            <select class="list_button margin_list">
              <option>Company</option>
              <option>Personal</option>
            </select>
          </div>
          <div class="rowmargin_tab">
            <div class="col-sm-2 col-md-6 col-xl-2 pl-0 box_date">
              <div class="col-sm-12 pl_mob">
                <VueDatePicker
                  class="date_picker"
                  v-model="form.from_date"
                  color="#f47320"
                  placeholder="Choose From Date"
                  @onChange="dateSubmitted('from')"
                  button-validate="Ok"
                  button-cancel="Cancel"
                  validate
                  :max-date="this.form.to_date"
                />
              </div>
            </div>
            <div class="col-sm-2 col-md-6 col-xl-2 pl-0 box_date">
              <div class="col-sm-12 pl_mob">
                <VueDatePicker
                  class="date_picker"
                  v-model="form.to_date"
                  color="#f47320"
                  placeholder="Choose To Date"
                  @onChange="dateSubmitted('to')"
                  button-validate="Ok"
                  button-cancel="Cancel"
                  validate
                  :min-date="this.form.from_date"
                />
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="md-layout md-size-100 md-alignment-top-space-between caps">
        <div
          class="md-layout-item md-size-34 md-xsmall-size-100 md-small-size-100 box_date"
        >
          <input
            type="text"
            placeholder="eg: name, id"
            class="pl-0"
            v-model="form.search"
          />

          <button>
            <i data-v-630689f1 class="material-icons f-s-19" @click="refresh()"
              >search</i
            >
          </button>
        </div>
      <div class="row_margin_tab">
        <div
          class="md-layout-item md-layout filters md-size-75 md-small-size-100 md-xsmall-size-100 width_100"
        >
        
          <div
            class="md-layout-item md-size-17 md-xsmall-size-100 md-small-size-50"
          >
            <v-select
              class="tall-box"
              label="name"
              v-model="form.status"
              :reduce="(e) => e.value"
              :options="[
                { name: 'Active', value: 'Y' },
                { name: 'In-Active', value: 'N' },
              ]"
              placeholder="Select Status"
              @input="refresh()"
              :clearable="false"
            >
            </v-select>
          </div>
          <div
            class="md-layout-item md-size-17 md-xsmall-size-100 md-small-size-50"
          >
            <v-select
              class="tall-box"
              v-model="form.type"
              :options="['company', 'personal', 'trader', 'admin', 'staff']"
              placeholder="Select Type"
              @input="refresh()"
              :clearable="false"
            >
            </v-select>
          </div>
          <div
            class="md-layout-item md-size-25 md-xsmall-size-100 md-small-size-50 "
          >
            <VueDatePicker
              class="editOrder-datePicker-mob"
              v-model="form.from_date"
              color="#f47320"
              placeholder="Choose From Date"
              @onChange="dateSubmitted('from')"
              clearable
              :max-date="this.form.to_date"
            />
          </div>
          <div
            class="md-layout-item md-size-25 md-xsmall-size-100 md-small-size-50 mr_zero"
          >
            <VueDatePicker
              v-model="form.to_date"
              color="#f47320"
              placeholder="Choose To Date"
              @onChange="dateSubmitted('to')"
              clearable
              :min-date="this.form.from_date"
            />
          </div>
        </div>
      </div>


      </div>

      <div
        class="col-sm-12 pl-0 pr-0 fl"
        v-infinite-scroll="loadPendingOrders"
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
            <md-table-head><h3>Type</h3></md-table-head>

            <!-- <md-table-head><h3>Country</h3></md-table-head>
            <md-table-head><h3>City</h3></md-table-head> -->
            <md-table-head><h3>Mobile</h3></md-table-head>
            <md-table-head><h3>Phone</h3></md-table-head>

            <md-table-head><h3>Email</h3></md-table-head>
            <md-table-head><h3>Status</h3> </md-table-head>

            <md-table-head><h3>Action</h3></md-table-head>
          </md-table-row>

          <md-table-row v-for="item in registrations" :key="item.id" class="bg_row">
            <md-table-cell md-numeric> {{ item.id }} </md-table-cell>
            <md-table-cell class="table_padding">
              <img
                v-if="item.logo"
                :src="item.logo"
                :alt="item.trade_name_en"
              />
              <div v-else class="profile-default-text">
                <span class="text">{{
                  item.trade_name_en.substring(0, 1)
                }}</span>
              </div>
            </md-table-cell>
            <md-table-cell class="table_padding capitalize"
              ><router-link
                :to="
                  /profiletimeline/ +
                  $helpers.slugify(item.trade_name_en) +
                  '/' +
                  item.id
                "
              >
                {{ item.trade_name_en }}
              </router-link></md-table-cell
            >
            <md-table-cell class="table_padding capitalize">
              {{ item.user_type }}
            </md-table-cell>
            <!-- <md-table-cell class="table_padding capitalize">
              {{ item.country }}
            </md-table-cell>
            <md-table-cell class="table_padding capitalize">{{
              item.city
            }}</md-table-cell> -->
            <md-table-cell class="table_padding">
              {{ item.mobile }}
            </md-table-cell>
            <md-table-cell class="table_padding">
              {{ item.phone }}</md-table-cell
            >

            <md-table-cell class="table_padding">
              {{
                item.email.length > 20
                  ? `${item.email.substring(0, 21)}...`
                  : item.email
              }}
            </md-table-cell>

            <md-table-cell class="table_padding">
              <span
                :class="{
                  label_green: item.is_active === 'Y',
                  label_red: item.is_active === 'N',
                  label_gray:
                    item.is_verified === '0' && item.is_active === 'Y',
                }"
              >
                {{
                  item.is_active === "Y"
                    ? item.is_verified === "1"
                      ? "Active"
                      : "Not Approved"
                    : "In-Active"
                }}
              </span>
              <md-tooltip md-direction="top"
                >Click here to make it
                {{ item.is_active === "Y" ? "Active" : "In-Active" }}
              </md-tooltip>
            </md-table-cell>
            <md-table-cell class="display_flex">
              <router-link
                :to="{
                  name: 'registrationDetails',
                  params: {
                    details: item,
                  },
                }"
                exact
              >
                <i class="material-icons action_icon ml-4">edit</i>
              </router-link>
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
                  <h1 class="no-orders-found">No registrations found.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noMoreInvoices">
              <md-table-cell colspan="11" md-numeric
                ><center>
                  <h1 class="no-orders-found">No more registrations.</h1>
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
import moment from "moment";

export default {
  components: {},
  data () {
    return {
      registrations: [],
      busy: false,
      toggleBox: false,
      form: {
        page: 1,
        type: "company",
        search: "",
        status: "Y",
        from_date: null,
        to_date: null
      },
      isDateValid: false,
      submitted: false,
      tableLoader: true,
      noMoreInvoices: false,
      noInvoicesFound: false
    };
  },
  mounted () {
    this.loadPendingOrders();
  },
  methods: {
    async loadPendingOrders (type) {
      if (this.busy) return;
      this.tableLoader = true;
      this.busy = true;
      this.form.page++;

      // const data = this.form;
      console.log(this.form.page);
      console.log("page hit");
      const response = await axios.post("/admin/registrations", this.form);

      const { result, message, success } = await response.data;

      if (!success) {
        if (message && message === "No user found") {
          type === "refresh"
            ? (this.noInvoicesFound = true)
            : (this.noMoreInvoices = true);
        }
        this.tableLoader = false;
        this.busy = true;
      } else {
        this.tableLoader = false;
        this.busy = false;
        this.registrations = [...this.registrations, ...result];
      }
    },
    refresh () {
      this.busy = false;
      this.noMoreInvoices = false;
      this.noInvoicesFound = false;
      this.form.page = 0;
      this.registrations = [];
      this.loadPendingOrders("refresh");
    },
    toggleBoxChanged () {
      this.toggleBox
        ? (this.form.type = "Buying")
        : (this.form.type = "Selling");
      this.refresh();
    },
    getDate (date) {
      return moment(date).format("MMM D,YYYY");
    },

    dateSubmitted () {
      this.submitted = true;
      if (this.form.from_date > this.form.to_date) {
        this.isDateValid = false;
        console.log("Invalid");
        return;
      }
      this.busy = false;
      this.noMoreInvoices = false;
      this.form.page = 0;
      this.registrations = [];
      this.refresh();
    }
  }
};
</script>

<style scoped>
.width_100{max-width:100%}
.pl_mob {
  padding-right: 0px;
}
.mr_zero{margin-right: 0px !important;}
/* Abhishek */
.filters .md-layout-item {
  margin-right: 10px;
  /* padding-right: 10px; */
      width: 170px;
}

.capitalize {
  text-transform: capitalize;
}
.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
}

/* Avatar */
.profile-default-text {
  float: left;
  display: inline-flex;
  align-items: center;
  align-self: center;
  cursor: pointer;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #f47320;
  padding: 1px;
  position: relative;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
}
.profile-default-text .text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
/* avatar end */
/* loading
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  border: 4px solid #f47320;
  border-color: #f47320 transparent #f47320 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
*/
/* loading */

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

.vd-wrapper {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 9px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 100%;
}

/* Abhishek */
/* tab Css */
h2 {
  margin-top: 40px;
}
.wlc-btn-wrp {
  margin-top: 40px;
}
.md-button {
  height: 42px;
}
.manage-order-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pill-active .md-button {
  background-color: rgba(0, 0, 0, 0) !important;
}
.pill span {
  width: 22px;
  height: 21px;
  line-height: 21px;
  background-color: #949292;
  border-radius: 50%;
  display: inline-block;
  color: #fff;
  margin-left: 0.2em;
}

.list_button {
  height: 41px;
  margin-right: 0px !important;
  float: right !important;
  border: solid 1px #c8d2e0;
  border-radius: 6px;
  width: fit-content;
  padding-left: 5px;
  padding-right: 6px;
  width: fit-content;
}

.margin_list {
  margin-right: 15px !important;
}

.action_icon {
  float: left;
  font-size: 22px;
  cursor: pointer;
}
.reresh_button {
  margin-right: 0px !important;
  float: left !important;
  margin-left: 15px !important;
}

/*-----table_style_start-----*/
.bg_row{background-color: #f6f6f6; }



.md-table.md-theme-default .md-table-row td{border:none !important;}
.header_table_wallet{background-color: #213c64; margin-top: 30px; }
.header_table_wallet h3{ color: #fff !important; font-weight: 400;}


/*-----table_style_end-----*/



@media screen and (max-width: 1000px) {
  .pills {
    margin-left: -8px !important;
  }

  .rowmargin_tab {
    margin-left: -15px;
  }
  .box_date {
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 600px) {
  .pills {
    margin-right: -15px !important;
  }
  .md-button.md-theme-default.md-raised:not([disabled]) {
    margin-bottom: 7px;
    margin-right: 0px;
  }
}
/* tab css end */
.order-wrap {
  width: 100%;
  padding: 15px;
}
.order-item {
  display: flex;
  padding: 11px;
  width: 100%;
  border: 1px solid #eee;
  margin-top: 1em;
}
.order-wrap figure {
  flex: 0 0 111px;
  text-align: center;
  margin-right: 1.5em;
}
.order-wrap figure img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}
.right {
  flex: 1 1;
  display: flex;
  justify-content: space-between;
}
.right .title {
  font-size: 14px;
  font-weight: 500;
}
.right .detail {
  font-size: 14px;
  color: #888;
  margin-top: 0.3em;
}
.right .detail span {
  color: #333;
  font-weight: 500;
}
.action-right {
  display: block;
  align-self: center;
  text-align: center;
}
.action-right .price {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.3em;
}
.price.vat {
  font-size: 14px;
}
.status {
  background: #fbd5c9;
  padding: 5px 7px;
  border-radius: 4px;
}
.edit-status {
  display: flex;
  align-items: center;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
.edit-ico {
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background: rgba(56, 174, 4, 0.2);
  align-items: center;
  line-height: 30px;
  color: #38ae04 !important;
  margin-right: 0.5em;
  font-size: 21px;
  text-align: center;
}

.fl {
  float: left;
}
.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
  margin-top: 18px;
}
.box_date {
  float: left;
  padding: 0px;
}
.box_date input {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 10px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
          width: 79.7%;
}
.box_date button {
float: right;
    background: #fff;
    margin-right: 10px;
    border: solid 1px #c8d2e0;
    padding: 7px 13px;
    border-radius: 6px;
    color: #ff5722;
    margin-left: 7px;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
}

.box_date button:hover {
  background: #ff5722;
  color: #fff;
  border: solid 1px #fff;
}

.fr {
  float: right;
}
.md-table-head-label {
  font-size: 14px;
}
.md-content.md-table-content.md-scrollbar.md-theme-default {
  margin-top: 10px;
}
textarea,
input {
  outline: none;
}
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
  width: 102px;
}

.label_white {
  background: #e4e4e4;
}
.md-content.md-theme-default {
  margin-top: 20px;
}
.m-auto {
  margin: auto;
}
.md-field {
  margin: -7px 0 25px;
}
.md-numeric,
.items_no {
  color: #4c98d1;
}

@media screen and (max-width: 1200px) and (min-width: 1010px) {
  .wrapper_order_table {
    width: 100%;
    max-width: 100%;
  }
  .box_date input {
    width: 60%;
  }
}
@media screen and (max-width: 1000px) {
  wrapper_order_table {
    margin-top: 20px;
  }
  .m-auto {
    margin: 0 !important;
  }
  .box_date input {
  width: 89%;
  }
  .md-content.md-theme-default {
    margin-top: 10px;
  }
  .md-field {
    margin: -7px 0 0px;
  }

  .label_red {
    width: 78px;
  }
  .label_gray {
    width: 111px;
  }
}

@media screen and (max-width:768px) {

.row_margin_tab{width: 102%;
    margin-right: -10px;}
  .wrapper_order_table{max-width: 82%; padding: 20px; margin-top: 0px;}
  .header_table_wallet h3{font-size: 12px;}
  .wrapper_order_table .md-table-cell {
    font-size: 11px;
}
.filters .md-layout-item{margin-right: 0px; padding-right: 10px; margin-bottom: 10px;}
.orderid{padding-left: 2px;}

 .box_date button {margin-right: 0px !important;}
.box_date {
    margin-bottom: 10px;
}
}


@media screen and (max-width: 600px) {
  .box_date button {
    margin-right: 3px !important;
}
   .wrapper_order_table{max-width: 100%; padding: 10px;}
  .wrapper_order_table{max-width: 100%;}
  .box_order {
    width: 255px;
    margin-top: 18px;
    margin-bottom: -7px;
    float: left;
  }
  .wrapper_order_table {
    margin-top: 0px;
  }
  .box_date input {
    width: 81%;
  }
  .wrapper_order_table {
    width: 100%;
  }
  .pl_mob {
    padding-left: 0px;
  }

  .md-field {
    margin: -7px 0 5px;
    margin-top: 10px;
  }

  .reresh_button {
    width: 100%;
    margin-top: 12px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .box_date input {
    width: 83%;
  }
}
@media screen and (max-width: 360px) {
  .box_date input {
   width: 80%;
  }
}
@media screen and (max-width: 300px) {
  .box_date input {
    width: 74%;
  }
  .box_date {
    margin-bottom: 8px;
}
}
</style>
