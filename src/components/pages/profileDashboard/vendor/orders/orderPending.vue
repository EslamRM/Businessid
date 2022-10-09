<template>
  <div
    class="md-layout md-gutter wrapper_order_table pt-4"
    v-infinite-scroll="loadPendingOrders"
    :infinite-scroll-listen-for-event="true"
    infinite-scroll-immediate-check="false"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="0"
  >
    <div
      class="orderContainer md-layout md-layout-item md-size-100"
      v-for="(order, index) in orders"
      :key="index"
    >
      <div
        class="orderHead md-layout-item md-size-100"
        :class="{
          custom: order.items[0].variation.pricing_type == 'customization',
        }"
      >
        <div class="md-layout">
          <div class="md-layout-item md-size-5 md-small-size-10 sb-container">
            <span class="squareBadge">{{ index + 1 }}</span>
          </div>
          <div class="md-layout-item md-size-90 md-small-size-80" style="line-height:1.4;">
            <span class="idNo">Order : #{{ order.order_id }} </span>
            <span class="idNo"> Profile Id : #{{ order.profile_id }} </span>
            <span class="idNo date-bl"> Date : {{ getDate(order.created_at) }}</span>
            <div>
              <span class="idNo">
              {{
                order.items.length > 1
                  ? `${order.items.length} items`
                  : `${order.items.length} item`
              }} 
              </span>
              <span class="idNo">
                Status : 
                <span 
                  :class="{
                    label_yellow: order.order_status == 'Pending',
                    label_green: order.order_status == 'Shipped',
                    label_violet: order.order_status == 'Delivered',
                    label_orange: order.order_status == 'Cancelled',
                  }"
                >
                  {{ order.order_status }}
                </span>
              </span>
            </div>
          </div>
          <div class="md-layout-item md-size-5 md-small-size-10 sb-container">
            <div class="d-flex wrapper_view_btn">
              <router-link
                class="material-icons edit-ico"
                :to="{
                  name: 'vendorEditOrder',
                  params: {
                    count,
                    id: order.order_id,
                  },
                }"
                >create</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="orderProducts cart-listing md-layout-item md-size-100"
        v-for="(item, itemIndex) in order.items"
        :key="itemIndex"
      >
        <div class="md-layout pt-4 pb-2">
          <div class="md-layout-item md-size-10 md-small-size-40 pl-5">
            <a href="#" class="link">
              <img
                class="product-image"
                :src="item.variation.files"
                :alt="item.name"
              />
            </a>
          </div>
          <div class="md-layout-item md-size-35 md-small-size-60 pl-5">
            <ul class="product-detail-list">
              <li class="itemId">
                Product
                <span style="padding-left: 4px">#{{ item.productid }}</span>
              </li>
              <li>{{ item.name }}</li>
              <li class="price">
                {{
                  item.offerprice !== "0.00"
                    ? currency(item.offerprice, item.currency)
                    : currency(item.unitprice, item.currency)
                }}
              </li>
              <li>Quantity : {{ item.quantity }}</li>
              <li v-if="item.variation.pricing_type == 'pricing'">
                Size : {{ item.variation.size.size }}
              </li>
              <li
                v-if="item.variation.pricing_type == 'customization'"
                class="custom"
              >
                Custom order
              </li>
            </ul>
          </div>
          <div class="md-layout-item md-size-30 md-small-size-100 sold-by">
            <ul class="product-detail-list">
              <li>Sold by : {{ item.sold_by[0].trade_name_en }}</li>
              <li>Account Name : {{ order.account_name }}</li>
              <li>Attention : {{ order.billing_address.contactname }}</li>
              <li>
                Address : {{ order.billing_address.building }},{{
                  order.billing_address.area
                }},{{ order.billing_address.city }},
                {{ order.billing_address.country }}
              </li>
            </ul>
          </div>
          <div class="md-layout-item md-size-100" style="text-align:center">
            <fieldset class="">
                  <div class="limitRadio">
                    <md-radio value="available" v-model="item.available"
                      >Available</md-radio
                    >
                    <md-radio value="not_available" v-model="item.available"
                      >Not Available</md-radio
                    >
                  </div>
                </fieldset>
          </div>
          <p
                  class="statusNote label_violet"
                  v-if="order.order_status !== 'Pending'"
                >
                  Estimated Delivery Date :
                  {{ getDelDate(order.delivery_date) }}
                </p>
          
        </div>
      </div>
      <div class="md-layout-item md-size-100">
          <div class="md-layout">
            <div class="md-layout-item md-size-70 md-small-size-100">
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 p-3">
                  <VueDatePicker
                v-model="order.pickup_date"
                color="#f47320"
                :disabled="order.order_status != 'Pending'"
                placeholder="Ready To Collect Date"
                clearable
                validate
                :min-date="yesterday"
                class="editOrder-datePicker"
              />
                </div>
                <div class="md-layout-item md-small-size-100 p-3">
                  <vSelect
                class="tall-box mt-10"
                label="name"
                v-model="order.payment_status"
                :reduce="(obj) => obj.value"
                :options="[
                  { name: 'Paid', value: 'Paid' },
                  { name: 'Not Paid', value: 'Unpaid' },
                ]"
                placeholder="Payment Status"
              >
              </vSelect>
                </div>
                <div class="md-layout-item md-small-size-100 p-3">
                  <vSelect
                class="tall-box mt-10"
                label="name"
                v-model="order.shipping_by"
                :reduce="(obj) => obj.value"
                :options="[{ value: 'Nex', name: 'Shipping by Nex.' }]"
                placeholder="Shipping by"
              >
              </vSelect>
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-30 md-small-size-100">
              <div class="md-layout" style="height:100%">
                <div class="md-layout-item operation_buttons p-3">
                  <button
                v-if="!(order.order_status == 'Cancelled')"
                class="cancel_edit"
                @click="changeOrderStatus('Cancelled')"
              >
                cancel
              </button>
                </div>
                <div class="md-layout-item operation_buttons p-3">
                  <button
                :disabled="
                  (!order.pickup_date && order.order_status == 'Pending') ||
                  !order.payment_status ||
                  !order.shipping_by
                "
                :class="{
                  label_grey:
                    (!order.pickup_date && order.order_status == 'Pending') ||
                    !order.payment_status ||
                    !order.shipping_by,
                }"
                class="accept_edit2"
                @click="changeOrderStatus(buttonName)"
              >
                Accept
              </button>
                </div>
              </div>
            </div>
          </div>
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
    vSelect,
  },
  data() {
    return {
      available: [[]],
      yesterday: "",
      orders: [],
      count: {},
      form: {
        from_date: null,
        to_date: null,
        page: 0,
        status: "Pending",
        order_number: null,
      },
      isDateValid: false,
      submitted: false,
      busy: false,
      tableLoader: true,
      noInvoicesFound: false,
      noMoreInvoices: false,
    };
  },
  created() {
    this.yesterday = moment().subtract(1, "days")._d;
  },
  methods: {
    async loadPendingOrders(type) {
      if (this.busy) return;
      this.tableLoader = true;
      this.busy = true;
      this.form.page++;

      // const data = this.form;
      console.log(this.form.page);
      console.log("page hit");
      const data = this.form;
      const response = await axios.post("vendor/orders", data);

      const {
        result,
        success,
        message,
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped,
      } = await response.data;
      this.count = {
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped,
      };
      await this.$store.commit("SET_VENDOR_ORDERS_COUNT", this.count);
      if (!success) {
        if (message && message === "no orders found") {
          type === "refresh"
            ? (this.noInvoicesFound = true)
            : (this.noMoreInvoices = true);
        }
        this.tableLoader = false;
        this.busy = true;
      } else {
        this.tableLoader = false;
        this.busy = false;
        result.map((order) => {
          if (order.order_status == "Pending") {
            order.shipping_by = "Nex";
          }
          order.items.map((item) => {
            item.available = "available";
          });
        });
        this.orders = [...this.orders, ...result];
      }

      // this.orders = await result;
    },
    refresh() {
      this.busy = false;
      this.noMoreInvoices = false;
      this.noInvoicesFound = false;
      this.form.page = 0;
      this.orders = [];
      this.loadPendingOrders("refresh");
    },
    getDate(date) {
      return moment(date).format("MMMD,YYYY");
    },
    getTotalQuantity(index) {
      var quantity = 0;
      this.orders[index].items.forEach((order) => {
        return (quantity += parseInt(order.quantity));
      });
      console.log(quantity);
      return parseInt(quantity, 10);
    },
    dateSubmitted(type) {
      this.submitted = true;
      if (this.form.from_date > this.form.to_date) {
        this.isDateValid = false;
        console.log("Invalid");
        return;
      }
      this.refresh();
    },
  },
  mounted() {
    this.loadPendingOrders();
  },
};
</script>

<style scoped>
.product-detail-list li
{
  padding: 4px 0px;
}
.sb-container {
  position: relative;
}
.squareBadge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.option.custom {
  color: #298d00 !important;
}
.product-status{
  position: absolute;
    right: 3%;
}
.itemId {
  color: #000;
  font-size: 12px;
  font-weight: bolder;
}
.box_list_cash select {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 10px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 100%;
  margin-top: 8px;
}
.cancel_edit {
  padding: 10px 30px;
  color: #fff;
  font-size: 14px;
  background-color: #ff5733;
  border: none;
  outline: none;
  border-radius: 6px;
  width: 100%;
  height: 100%;
}
.accept_edit {
  color: #333;
  font-size: 14px;
  border: none;
  outline: none;
  border-radius: 6px;
}
.accept_edit2 {
  padding: 10px 30px;
  background: #36ba36;
  color: #fff;
  font-size: 14px;
  border: none;
  outline: none;
  border-radius: 6px;
  width: 100%;
  height: 100%;
}
.operation_buttons {
  height: 100%;
}
.label_grey {
  background: grey;
}
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
}

.md-table-head-label {
  float: left;
}
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

.reresh_button {
  margin-right: 0px !important;
  float: right !important;
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
@media screen and (max-width: 1200px) {
  .leftContent {
    display: block !important;
  }
}
/*-----table_style_end-----*/
@media screen and (max-width: 1000px) {
  .pills {
    margin-left: -8px !important;
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
  /* box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05); */
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 0;
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
  width: 76%;
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
  width: 80px;
  height: 80px;
}
.label_yellow {
  background: #ffc300;
  color: #fff;
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
    width: 55%;
  }
  .md-content.md-theme-default {
    margin-top: 10px;
  }
  .md-field {
    margin: -7px 0 0px;
  }
}

@media screen and (max-width: 768px) {
  .wrapper_order_table {
    max-width: 100%;
    padding: 20px;
  }
  .header_table_wallet h3 {
    font-size: 12px;
  }
  .wrapper_order_table .md-table-cell {
    font-size: 11px;
  }
}

@media screen and (max-width: 600px) {
  .wrapper_order_table {
    max-width: 100%;
    padding: 0px;
  }
  .sold-by
  {
    padding: 0.3rem 2rem;
  }
  .orderContainer {
    padding: 0;
  }
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
    width: 82.3%;
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
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .box_date input {
    width: 84%;
  }
}
@media screen and (max-width: 360px) {
  .box_date input {
    width: 81.5%;
  }
}
@media screen and (max-width: 300px) {
  .box_date input {
    width: 75.7%;
  }
}
@media screen and (max-width: 767px) {
  .pl_mob.first {
    padding-left: 0px;
    padding-right: 5px;
  }
  .pl_mob.second {
    padding-right: 0px;
    padding-left: 5px;
  }
  .filter-box input {
    width: calc(100% - 120px);
  }
}
@media screen and (max-width: 575px) {
  .pl_mob.first,
  .pl_mob.second {
    padding-left: 0;
    padding-right: 0;
  }
}
/* new */
/* Abhishek Css */
/* 1. Adding Offer Price if available */
.unit-price {
  padding-left: 10px;
  text-decoration: line-through;
  color: rgb(34, 34, 34, 0.55) !important;
}

/* END */
.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
}
.myOrder-tabs {
  display: flex;
  flex-shrink: 0;
  align-items: stretch;
  /* margin: 15px 0; */
}
.myOrder-tabs a {
  height: 48px;
  vertical-align: middle;
  padding: 0 5px;
  padding-left: 0;
  margin: 6px 8px 6px 0;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #dfe1e5;
  border-radius: 46px;
  color: #3c4043;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  margin-left: 8px;
  position: relative;
}
.myOrder-tabs a button {
  height: auto;
  padding: 0;
  min-width: auto;
}
.iconWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 3px 5px 3px 3px;
  border-radius: 25px;
  -o-object-fit: cover;
  object-fit: cover;
  overflow: hidden;
  vertical-align: middle;
  width: 40px;
  background: #eee;
  color: #ff5722;
}
.tabText {
  line-height: 41px;
  display: inline;
  vertical-align: top;
}
.active-link .iconWrap {
  background: #ff5722;
  color: #fff;
}
.rt-lnk-tp-1.active-link {
  background: rgba(204, 204, 204, 0.3);
}
.rt-lnk-tp-1.active-link .md-button {
  border-bottom: none !important;
}
.rt-lnk-tp-1.active-link .md-button:before {
  background: transparent;
  background-color: transparent;
  display: none;
}
.rt-lnk-tp-1 .md-button:before {
  display: none;
}
.rt-lnk-tp-1.active-link .md-button:hover {
  background: transparent;
  background-color: transparent;
}
.orderContainer {
  /* box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2); */
  border-radius: 12px;
}
.orderHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f4;
  padding: 4px;
  border: 1px solid #eee;
}
.orderHead.custom {
  background: #d4efd9;
}
.orderHead .idNo {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  padding: 0px 4px;
}
.orderHead .muted {
  font-size: 12px;
  font-weight: 400;
  color: #888888;
  margin-top: 2px;
}
.detail-Btn {
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  color: rgb(254, 87, 34) !important;
  background-color: rgba(254, 87, 34, 0.12) !important;
  margin-right: 1.5em;
  padding: 6px 8px;
}
.orderProducts {
  width: 100%;
  display: inline-flex;
  border: 1px solid #eee;
}
.orderProducts .product-image {
  height: 81px;
}
.orderRow {
  width: 100%;
  flex-flow: row wrap;
  display: flex;
}
ul.productShowing {
  margin-top: 0.33em;
}
.productShowing li {
  margin-bottom: 2em;
  border-bottom: 1px solid #efefef;
}
.productShowing li:last-child {
  border: none;
}
.cart-listing .content .link {
  text-align: center;
}
.cart-listing .content .link img {
  height: 100%;
  object-fit: contain;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
}
.cart-listing .content .description {
  padding: 0 24px 12px;
  vertical-align: top;
  /* min-height: 112px; */
  flex: 1 1;
  overflow: hidden;
  line-height: 1.3;
  /* max-width: 460px; */
}
.cart-listing .content .description .name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
}
.boxWrap {
  margin-top: 11px;
  display: block;
  padding-bottom: 1.3em;
}
.price {
  font-weight: 600;
  color: #444;
  margin-top: 2px;
}
.cart-listing .content .description .option {
  display: block;
  color: #000;
  font-size: 14px;
  margin-top: 5px;
}
.optionType,
.equal {
  display: inline-block;
}
.imgHolder {
  flex: 0 0 81px;
  position: relative;
  width: 100%;
  height: 81px;
}

.leftContent {
  float: left;
  display: inline-flex;
}
.orderstautsContent {
  float: left;
}
.orderstautsContent .status {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
.orangeIn {
  background-color: #fbc747;
  border: 2px solid #fbc747;
}
.statusTxt {
  font-weight: 600;
  font-size: 14px;
}

.label_yellow {
  background: #ffc300;
  color: #fff;
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  padding: 4px 8px;
  text-transform: uppercase;
  border-radius: 4px;
}
.label_green {
  background: #64dd17;
  color: #fff;
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  padding: 4px 8px;
  text-transform: uppercase;
  border-radius: 4px;
}
.label_violet {
  background: #3f51b5;
  color: #fff;
  padding: 10px 20px;
}
.statusNote {
  margin-top: 40px;
  font-size: 12px;
  width: fit-content;
  float: left;
  min-height: 20px;
}
.countIn {
  font-size: 14px;
  font-weight: 600;
  color: rgb(103, 102, 102);
  /* padding-left: 12px; */
  padding-top: 12px;
}
.toggleboxBtn {
  height: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  /* background-color: rgba(0, 0, 0, 0.1); */
}
.wrapper_view_btn {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.border_edit {
  margin: 0px 0px;
  float: left;
  width: 100%;
  background-color: #e0e0e0;
  height: 1px;
}
@media screen and (max-width: 1200px) {
  .imgHolder {
    height: auto;
  }
  .cart-listing .content .link img {
    position: relative !important;
    width: 20%;
    margin-bottom: 15px;
    margin-left: 15px;
  }
}
@media screen and (max-width: 1000px) {
  .statusNote {
    padding-bottom: 20px;
  }
}

@media screen and (max-width: 768px) {
  .detail-Btn {
    padding: 4px 8px !important;
  }
  .orderstautsContent {
    float: left;
    position: absolute;
  }
  .orderstautsContent .align-center {
    float: right;
  }
}

@media screen and (max-width: 600px) {
  .cart-listing .content .link img {
    height: 100%;
    object-fit: contain;
    position: absolute;
    left: 0;
    right: 0;
    width: 70%;
  }
  .md-button {
    margin: 0px;
  }
  .sectionBox {
    width: 100%;
  }
  .order_id {
    width: fit-content;
    float: left;
  }
  .no-orders-found {
    font-size: 13px;
  }
  .orderHead {
    display: block;
    overflow: hidden;
  }
  .orderHead .muted {
    width: 100%;
    float: left;
    font-size: 11px;
  }
  .orderHead .idNo {
    font-size: 11px;
  }
  .toggleboxBtn {
    display: block;
    float: left;
    top: 2px;
  }
  .detail-Btn {
    width: fit-content;
    padding: 6px 8px;
    float: left;
    height: auto;
    margin-right: 8px;
    font-size: 11px;
    padding: 5px 7px;
  }

  .imgHolder {
    width: 100%;
    text-align: left;
    margin: auto;
    display: block;
    flex: 0 0 0px;
  }

  .label_yellow,
  .label_green {
    margin-top: 0px;
    font-size: 11px;
  }

  .cart-listing .content .description .name {
    width: 100%;
    /* Removed bcz it was conflicting with the price */
    /* float: left; */
    overflow: visible;
    white-space: normal;
    font-size: 11px;
  }
  .cart-listing .content .description {
    min-height: auto;
    overflow: visible !important;
    display: block;
    float: left;
    width: 100%;
    text-align: left;
    margin-top: 10px;
    padding: 10px;
    font-size: 11px !important;
  }

  .cart-listing .content .link img {
    height: auto;
  }

  .imgHolder {
    width: 105px;
    flex: 0 0 105px;
    float: left;
    padding: 0px;
    height: 105px;
    margin-right: 25px;
  }
  .orderRow {
    padding-bottom: 10px;
    padding-bottom: 6px;
  }

  .orderstautsContent {
    float: left;
    position: absolute;
  }
  .content.col-sm-12 {
    padding: 3px;
  }
  .orderstautsContent .align-center {
    float: right;
  }
  ul.productShowing {
    margin-top: 7px;
    overflow: hidden;
    padding-left: 7px;
    padding-right: 7px;
  }

  .statusNote {
    margin-top: 0px;
    font-size: 11px;
    width: fit-content;
    float: left;
    min-height: 20px;
  }

  .cart-listing .content .description .option {
    float: left;
    width: 100%;
  }

  .cart-listing .content .description .price {
    float: left;
    /* width: 100%; */
    font-size: 12px;
  }
  .optionType,
  .equal {
    float: left;
    width: 70px;
    font-size: 11px;
  }
  .countIn {
    padding-left: 0px;
    margin-top: 15px;
    font-size: 11px;
    padding-top: 6px;
  }
  .statusNote {
    padding-bottom: 0px;
  }

  .cart-listing .content .description .option {
    font-size: 11px !important;
  }

  .orderContainer {
    margin-top: 13px;
  }
}
@media screen and (max-width: 480px) {
  .date-bl {
    display: block;
  }
}
@media screen and (max-width: 360px) {
  .statusNote {
    font-size: 10px;
  }
}

@media screen and (max-width: 300px) {
  .statusNote {
    width: 170px;
    min-height: 6px;
    line-height: 16px;
  }

  .detail-Btn {
    width: fit-content;

    margin-right: 0px;
    font-size: 8px;
    padding: 3px 5px;
  }
  .order_id {
    width: 140px;
    float: left;
  }

  .orderHead .idNo {
    font-size: 9px;
  }

  .toggleboxBtn {
    top: -3px;
    width: 18px;
  }

  .orderHead .muted {
    font-size: 9px;
  }

  .countIn {
    font-size: 9px;
    padding-top: 2px;
  }

  .leftContent {
    margin-top: 45px;
  }
  .cart-listing .content .description .price {
    font-size: 11px;
  }

  .imgHolder {
    height: 130px;
  }
}
/* end */
</style>
