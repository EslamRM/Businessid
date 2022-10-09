<template>
  <div>
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table list_size">
      <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="col-sm-12 pl-0 pr-0">
          <!-- <div class="col-sm-6 col-md-12 col-xl-6 box_date">

          </div>
          <div class="rowmargin_tab">
            <div class="col-sm-3 col-md-6 col-xl-3 pl-0 box_date">
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
            <div class="col-sm-3 col-md-6 col-xl-3 pl-0 box_date">
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
          </div> -->
        </div>
        <div class="md-layout md-alignment-top-space-between">
          <div
            class=" col-md-12 col-xl-6  p-0 filter-box"
          >
            <div class=" box_date mob_width_100">
              <input
                type="text"
                placeholder="search"
                class="pl-0"
                v-model="form.id"
              />
            </div>
            <div class=" box_date">
              <button @click="refresh">
                <i data-v-630689f1 class="material-icons f-s-19">search</i>
              </button>
            </div>
            <div class=" box_date">
              <button class="reresh_button" @click="refresh">
                <i data-v-630689f1 class="material-icons f-s-19">refresh</i>
              </button>
            </div>
            <div class=" toggle_box">
              <span class="switcher switcher-1">
                <input
                  type="checkbox"
                  v-model="toggleBox"
                  @change="toggleBoxChanged"
                  id="switcher-1"
                />
                <label for="switcher-1"></label>
              </span>
            </div>
          </div>

          <div class=" col-md-12 col-xl-6 p-0">
        <div class="row_margin_tab_status">
          
            <div
              class=" filters-right col-sm-4 fl">
            
              <vSelect
                class="tall-box"
                v-model="form.payment_status"
                :options="['Paid', 'Unpaid']"
                placeholder="Payment Status"
                @input="refresh"
              >
              </vSelect>
            </div>
            <div
              class=" filters-right col-sm-4 fl"
            >
              <VueDatePicker
                class="date_picker"
                v-model="form.from_date"
                color="#f47320"
                placeholder="Choose From Date"
                @onChange="dateSubmitted('from')"
                button-validate="Ok"
                button-cancel="Cancel"
                validate
                clearable
                :max-date="this.form.to_date"
              />
            </div>
            <div
              class=" filters-right col-sm-4 fl"
            >
              <VueDatePicker
                class="date_picker"
                v-model="form.to_date"
                color="#f47320"
                placeholder="Choose To Date"
                @onChange="dateSubmitted('to')"
                button-validate="Ok"
                button-cancel="Cancel"
                validate
                clearable
                :min-date="this.form.from_date"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      <div
        class="col-sm-12 pl-0 pr-0 fl tableMain"
        v-infinite-scroll="loadPendingOrders"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <md-table>
          <md-table-row class="header_table_wallet">
            <md-table-head md-numeric><h3>Invoice ID</h3></md-table-head>
            <md-table-head><h3>Date</h3></md-table-head>
            <md-table-head><h3>Order Id</h3></md-table-head>

            <md-table-head
              ><h3>
                {{ form.type == "Selling" ? "Buyer" : "Seller" }}
              </h3></md-table-head
            >
            <md-table-head><h3>Total</h3></md-table-head>
            <md-table-head><h3>Payment Method</h3></md-table-head>
            <md-table-head><h3>Status</h3> </md-table-head>

            <md-table-head><h3>Action</h3></md-table-head>
          </md-table-row>

          <md-table-row v-for="invoice in invoices" :key="invoice.key" class="bg_row">
            <md-table-cell md-numeric> {{ invoice.id }} </md-table-cell>
            <md-table-cell class="table_padding">
              {{ getDate(invoice.created_at) }}
            </md-table-cell>

            <md-table-cell class="table_padding"
              ><span class="color_click">
                {{ invoice.order_id }}
              </span></md-table-cell
            >
            <md-table-cell class="table_padding">
              <div v-if="form.type === 'Selling'">
                <img
                  v-if="invoice.from_address.user.logo"
                  :src="invoice.from_address.user.logo"
                />
                <div v-else class="profile-default-text">
                  <span class="text">{{
                    invoice.from_address.contactname.substring(0, 1)
                  }}</span>
                </div>
                <router-link
                  :to="
                    /profiletimeline/ +
                    $helpers.slugify(invoice.from_address.contactname) +
                    '/' +
                    invoice.from_address.fk_user_id
                  "
                >
                  <span class="buyer_name">
                    {{ invoice.from_address.contactname }}
                  </span>
                </router-link>
              </div>
              <div v-else>
                <img
                  v-if="invoice.to_address.logo"
                  :src="invoice.to_address.logo"
                />
                <div v-else class="profile-default-text">
                  <span class="text">{{
                    invoice.to_address.trade_name_en.substring(0, 1)
                  }}</span>
                </div>
                <router-link
                  :to="
                    /profiletimeline/ +
                    $helpers.slugify(invoice.to_address.trade_name_en) +
                    '/' +
                    invoice.to_address.id
                  "
                >
                  <span class="buyer_name">
                    {{ invoice.to_address.trade_name_en }}
                  </span>
                </router-link>
              </div>
            </md-table-cell>
            <md-table-cell class="table_padding"
              >AED {{ new Number(invoice.total_price).toLocaleString("en-SA") }}
            </md-table-cell>

            <md-table-cell class="table_padding">
              {{ invoice.payment_method.replaceAll("_", " ") }}
            </md-table-cell>

            <md-table-cell class="table_padding">
              <span
                :class="{
                  label_red: invoice.payment_status == 'Unpaid',
                  label_green: invoice.payment_status == 'Paid',
                }"
              >
                {{
                  invoice.payment_status == "Unpaid"
                    ? "Not Paid"
                    : invoice.payment_status
                }}
              </span>
            </md-table-cell>
            <md-table-cell class="display_flex">
              <router-link
                :to="{
                  name: 'purchaseInvoiceDetails',
                  params: {
                    id: invoice.id,
                  },
                }"
                exact
              >
                <i class="material-icons action_icon ml-4">remove_red_eye</i>
              </router-link>
            </md-table-cell>
          </md-table-row>
          <transition name="fade">
            <md-table-row v-if="tableLoader">
              <md-table-cell colspan="8" md-numeric
                ><center>
                  <!---<div class="lds-dual-ring"></div>--->

                  <div class="loading-1 loading"></div></center
              ></md-table-cell>
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noInvoicesFound">
              <md-table-cell colspan="8" md-numeric
                ><center>
                  <h1 class="no-orders-found">No invoices found.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noMoreInvoices">
              <md-table-cell colspan="8" md-numeric
                ><center>
                  <h1 class="no-orders-found">No more invoices.</h1>
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
import vSelect from "vue-select";
export default {
  components: {
    vSelect
  },
  data () {
    return {
      invoices: [],
      busy: false,
      toggleBox: false,
      form: {
        from_date: null,
        to_date: null,
        page: 0,
        payment_status: "",
        id: "",
        type: "Selling"
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
      const response = await axios.post("/vendor/invoices", this.form);

      const { result, message, success } = await response.data;

      if (!success) {
        if (message && message === "No invoice found") {
          type === "refresh"
            ? (this.noInvoicesFound = true)
            : (this.noMoreInvoices = true);
        }
        this.tableLoader = false;
        this.busy = true;
      } else {
        this.tableLoader = false;
        this.busy = false;
        this.invoices = [...this.invoices, ...result];
      }
    },
    refresh () {
      this.busy = false;
      this.noMoreInvoices = false;
      this.noInvoicesFound = false;
      this.form.page = 0;
      this.invoices = [];
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

    dateSubmitted (type) {
      this.submitted = true;
      if (this.form.from_date > this.form.to_date) {
        this.isDateValid = false;
        console.log("Invalid");
        return;
      }
      this.busy = false;
      this.noMoreInvoices = false;
      this.form.page = 0;
      this.invoices = [];
      this.loadPendingOrders();
    }
  }
};
</script>

<style scoped>
.filters-right{padding-right: 0px;}

/* Toggle Box */
.toggle_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.toggle_box span.switcher {
  position: relative;
    width: 224px;
    height: 41px;
    border-radius: 3px;
    margin-left: 10px;
}
.toggle_box span.switcher input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  width: 100%;
  height: 42px;
  border-radius: 3px;
  background-color: #b5b3b3;
  outline: none;
  border: 1px solid #ff5733;
  cursor: pointer;
}
.toggle_box span.switcher input:before,
.toggle_box span.switcher input:after {
  z-index: 2;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #ffffff;
  letter-spacing: 1px;
  font-weight: 500;
}
.toggle_box span.switcher input:before {
  content: "Received";
  left: 30px;
}
.toggle_box span.switcher input:after {
 content: "Send";
    right: 30px;
}
.toggle_box span.switcher label {
  z-index: 1;
  position: absolute;
  top: 0px;
  bottom: 0px;
  border-radius: 3px;
}
.toggle_box span.switcher.switcher-1 input {
  -webkit-transition: 0.25s -0.1s;
  transition: 0.25s -0.1s;
}
.toggle_box span.switcher.switcher-1 input:checked {
  background-color: #ffffff;
}
.toggle_box span.switcher.switcher-1 input:checked:before {
  color: #ffffff;
  -webkit-transition: color 0.5s 0.2s;
  transition: color 0.5s 0.2s;
  letter-spacing: 1px;
  font-weight: 500;
}
.toggle_box span.switcher.switcher-1 input:checked:after {
  color: #000000;
  -webkit-transition: color 0.5s;
  transition: color 0.5s;
  letter-spacing: 1px;
  font-weight: 500;
}
.toggle_box span.switcher.switcher-1 input:checked + label {
  left: 0px;
  right: 100px;
  background: #ff5733;
  -webkit-transition: left 0.5s, right 0.4s 0.2s;
  transition: left 0.5s, right 0.4s 0.2s;
  width: 50%;
}
.toggle_box span.switcher.switcher-1 input:not(:checked) {
  background: #ffffff;
  -webkit-transition: background 0.5s -0.1s;
  transition: background 0.5s -0.1s;
  font-size: 13px;
}
.toggle_box span.switcher.switcher-1 input:not(:checked):before {
  color: #000000;
  -webkit-transition: color 0.5s;
  transition: color 0.5s;
}
.toggle_box span.switcher.switcher-1 input:not(:checked):after {
  color: #ffffff;
  -webkit-transition: color 0.5s 0.2s;
  transition: color 0.5s 0.2s;
}
.toggle_box span.switcher.switcher-1 input:not(:checked) + label {
     left: 50%;
    right: 0px;
    background: #ff5722;
    -webkit-transition: left 0.4s 0.2s, right 0.5s, background 0.35s -0.1s;
    transition: left 0.4s 0.2s, right 0.5s, background 0.35s -0.1s;
    height: 42px;
    width: 50%;
}

.filters-right {
  padding-left: 10px;
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
.pl_mob {
  padding-right: 0px;
}
/* Abhishek */

.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
  text-transform: none;
}

.tableMain {
  text-transform: capitalize;
}
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

.v-select .vs__dropdown-toggle {
  height: 41px !important;
}

.action_icon {
  float: left;
  font-size: 22px;
  cursor: pointer;
}
.reresh_button {
  margin-right: 0px !important;
  float: left !important;
  margin-left: 8px !important;
}

.buyer_name {
  float: left;
  margin: 6px 0px 0px 10px;
  color: #4c98d1;
}
.color_click {
  color: #4c98d1;
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
  /* width: 57%; */
}

.box_date button {
  float: left;
  background: #fff;
  margin-right: 0;
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  margin-left: 8px;
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
  width: 30px;
  float: left;
  height: 30px;
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
  width: 70px;
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
  .wrapper_order_table {
    margin-top: 20px;
  }
  .m-auto {
    margin: 0 !important;
  }
  .box_date input {
    width: 100%;
  }
  .md-content.md-theme-default {
    margin-top: 10px;
  }
  .md-field {
    margin: -7px 0 0px;
  }

  .label_red {
    width: 76px;
  }
  .label_gray {
    width: 111px;
  }
}
@media screen and (max-width:768px) {
  .row_margin_tab_status{margin-left: -9px;}
.row_margin_tab{width: 102%;
    margin-right: -10px;}
.filters-right {
    padding-left: 8px;
}
.box_date {
    margin-bottom: 10px;
}
.profile-default-text{width:24px; height: 24px;}
.profile-default-text .text {
    font-size: 12px;}

  /* .wrapper_order_table{max-width: 610px;width:610px; padding: 20px;} */
  .header_table_wallet h3{font-size: 10px;}
  .wrapper_order_table .md-table-cell {
    font-size: 10px;
}

.action_icon {
    
    font-size: 16px;
 
}
.label_red{
    width: 63px;
}

.filters .md-layout-item{margin-right: 0px; padding-right: 10px; margin-bottom: 10px;}
.orderid{padding-left: 2px;}

.toggle_box span.switcher {
    width: 268px;
}

.box_date input {
    padding: 10.5px 10px;
}

.toggle_box span.switcher.switcher-1 input:not(:checked) + label {
  left: 131px;

}

.toggle_box span.switcher input {
    width: 262px;}
.toggle_box span.switcher input:after {
    content: "Received";
    right: 14%;
}

.toggle_box span.switcher input:before {
    content: "Received";
    left: 40px;
}


}


@media screen and (max-width: 767px) {

.toggle_box span.switcher.switcher-1 input:not(:checked) + label {
  left: 50%;

}

.toggle_box span.switcher input:before {
    left: 18% !important;
}
.toggle_box span.switcher input:after {
    content: "Send";
    right: 18% !important;
}

.toggle_box span.switcher input{
    width: 100%;
}
.mob_width_100 {
    width: 63%;
}
 .toggle_box span.switcher {
    width: 100%;
    margin-left: 0px;
        margin-bottom: 12px;
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
    width: 100%;
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
    margin-top: 0px;
  }
  .toggle_box{width: 100%;}
}

@media screen and (max-width: 420px) and (min-width: 400px) {
.mob_width_100 {
    width: 67%;
}
}
@media screen and (max-width: 360px) {
 .box_date button {
    padding: 7px 8.5px;
}

.mob_width_100 {
    width: 67%;
}


}
@media screen and (max-width: 300px) {
  .box_date button {
    padding: 7px 5px;
}
.toggle_box span.switcher.switcher-1 input:not(:checked) {
  font-size: 12px;
}
.material-icons {

    font-size: 20px !important;}

.mob_width_100 {
    width: 62%;
}

.box_date button {
    padding: 9.5px 7px;
}
.toggle_box span.switcher input:before {
    left: 16% !important;
}
.toggle_box span.switcher input:after {
    right: 15.4% !important;
}
}
.wrapper_mob_menu{
  float: left;
}
@media screen and (min-width: 992px) and (max-width: 1199px) {
  .filter-box{
    display: flex;
    justify-content: space-between;
    padding: 0 0 10px !important;
  }
  .filter-box .box_date:first-child{
    width: calc(100% - 372px);
  }
  .filter-box .box_date:first-child input{
    width: 100%;
  }
  .row_margin_tab_status .filters-right:first-child{
    padding-left: 0;
  }
  .toggle_box{
    justify-content: flex-start;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .filter-box{
    display: flex;
    justify-content: space-between;
  }
  .row_margin_tab_status .filters-right:first-child{
    padding-left: 0;
  }
  .toggle_box{
    justify-content: flex-start;
  }
}
@media screen and (min-width: 600px) and (max-width: 768px) {
  .filter-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .reresh_button{
    width: 52px;
  }
}
@media screen and (max-width: 767px) {
  .filter-box .box_date:first-child{
    width: calc(100% - 130px);
  }
  .list_size .vd-wrapper{
    margin-top: 0;
  }
}
@media screen and (max-width: 575px) {
  .list_size .vd-wrapper{
    margin-top: 10px;
  }
}
</style>
