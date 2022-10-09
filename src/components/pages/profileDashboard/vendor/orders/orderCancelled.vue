<template>
  <div>
    <div
      class="
        col-sm-12 col-md-12 col-xl-12
        fl
        wrapper_order_table wrapper_tab_cancel
      "
    >
      <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="col-sm-12 pl-0 pr-0">
          <div class="col-sm-12 col-md-6 box_date filter-box">
            <input
              type="text"
              placeholder="search"
              class="pl-0"
              v-model="form.order_number"
            />

            <button>
              <i data-v-630689f1 class="material-icons f-s-19" @click="refresh"
                >search</i
              >
            </button>

            <button class="reresh_button">
              <i data-v-630689f1 class="material-icons f-s-19" @click="refresh"
                >refresh</i
              >
            </button>
          </div>
          <div class="col-sm-6 col-md-3 pl-0 box_date">
            <div class="col-sm-12 pl_mob first">
              <VueDatePicker
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
          </div>
          <div class="col-sm-6 col-md-3 box_date">
            <div class="col-sm-12 pl_mob second">
              <VueDatePicker
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

      <!-- <div
        class="col-sm-12 pl-0 pr-0 fl"
        v-infinite-scroll="loadPendingOrders"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <md-table>
          <md-table-row class="header_table_wallet">
            <md-table-head md-numeric>
              <h3 class="order_id">Order ID</h3>
            </md-table-head>
            <md-table-head>
              <h3>Items</h3>
            </md-table-head>
            <md-table-head>
              <h3>Quantity</h3>
            </md-table-head>
            <md-table-head>
              <h3>Total</h3>
            </md-table-head>
            <md-table-head>
              <h3>Delivery Date</h3>
            </md-table-head>
            <md-table-head>
              <h3>Date</h3>
            </md-table-head>
            <md-table-head>
              <h3>Status</h3>
            </md-table-head>
          </md-table-row>

          <md-table-row
            v-for="(order, index) in orders"
            :key="index"
            class="bg_row"
          >
            <md-table-cell md-numeric>{{ order.order_id }}</md-table-cell>
            <md-table-cell class="items_no">{{
              order.items.length > 1
                ? `${order.items.length} items`
                : `${order.items.length} item`
            }}</md-table-cell>
            <md-table-cell>
              {{ order.items.length > 1 ? `Multiple` : `1  ` }}</md-table-cell
            >
            <md-table-cell>
              {{
                currency(order.grand_total, order.items[0].currency)
              }}</md-table-cell
            >
            <md-table-cell>{{ getDate(order.delivery_date) }}</md-table-cell>
            <md-table-cell>{{ getDate(order.created_at) }}</md-table-cell>
            <md-table-cell>
              <div class="edit-status">
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
                <div class="status label_orange">
                  <span> {{ order.order_status }} </span>
                </div>
              </div>
            </md-table-cell>
          </md-table-row>

          <transition name="fade">
            <md-table-row v-show="tableLoader">
              <md-table-cell colspan="7" md-numeric
                ><center>
                  <div class="loading-1 loading"></div></center
              ></md-table-cell>
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noInvoicesFound">
              <md-table-cell colspan="7" md-numeric
                ><center>
                  <h1 class="no-orders-found">No orders found.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noMoreInvoices">
              <md-table-cell colspan="8" md-numeric
                ><center>
                  <h1 class="no-orders-found">No more orders.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
        </md-table>
      </div> -->
      <div
        class="sectionBox col-sm-12 p-0 mt-3"
        v-infinite-scroll="loadPendingOrders"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <div v-for="(order, index) in orders" :key="index">
          <div class="orderContainer col-sm-12 p-0">
            <div class="orderHead col-sm-12">
              <div class="order_id">
                <div class="idNo">
                  Order
                  <span style="padding-left: 4px">#{{ order.order_id }}</span>
                </div>
                <br />
                <div class="muted">{{ getDate(order.created_at) }}</div>

                <div class="countIn">
                  {{
                    order.items.length > 1
                      ? `${order.items.length} items`
                      : `${order.items.length} item`
                  }}
                </div>
              </div>
              <div class="d-flex wrapper_view_btn">
                <router-link
                  class="material-icons edit-ico"
                  :to="{
                    name: 'vendorEditOrder',
                    params: {
                      count,
                      id: order.order_id
                    }
                  }"
                  >create</router-link
                >
              </div>
            </div>

            <div class="orderProducts col-sm-12 p-0">
              <div class="orderRow cart-listing col-sm-12 pl-0 pr-0">
                <div class="content col-sm-12">
                  <ul class="productShowing col-sm-12">
                    <li class="col-sm-12 pl-0 pr-0">
                      <div class="leftContent col-sm-12 col-md-8 pl-0 pr-0">
                        <div class="imgHolder">
                          <a href="#" class="link">
                            <img :src="order.items[0].sold_by[0].logo" />
                          </a>
                        </div>
                        <div class="description">
                          <div class="md-layout">
                            <div class="price">
                              {{
                                currency(
                                  order.grand_total,
                                  order.items[0].currency
                                )
                              }}
                            </div>
                          </div>
                          <div class="boxWrap">
                            <div class="option">
                              <div class="optionType">Date :</div>
                              <div class="optionShowing">
                                {{ getDate(order.created_at) }}
                              </div>
                            </div>
                            <div class="option">
                              <div class="optionType">Delivery Date :</div>
                              <span class="seller">{{
                                getDate(order.delivery_date)
                              }}</span>
                            </div>
                            <div class="option">
                              <div class="optionType">
                                Quantity :
                              </div>
                              <span class="seller">{{
                                order.items.length > 1 ? `Multiple` : `1 `
                              }}</span>
                            </div>
                            <!-- <div class="option">
                              <div class="optionType">Size :</div>
                              <span class="seller"></span>
                            </div>-->
                            <div class="option">
                              <div class="optionType">Sold by :</div>
                              <span class="seller">{{
                                order.items[0].sold_by[0].trade_name_en
                              }}</span>
                            </div>
                            <!-- <div class="option">
                              <div class="optionType">
                                VAT ({{ item.vat_percentage }}%):
                              </div>
                              <span class="seller">{{
                                currency(item.vat, item.currency)
                              }}</span>
                            </div> -->
                          </div>
                        </div>
                      </div>
                      <div
                        class="orderstautsContent col-sm-12 col-md-4 pl-0 pr-0"
                      >
                        <div class="d-flex align-center">
                          <div
                            :class="{
                              label_yellow: order.order_status == 'Pending',
                              label_green: order.order_status == 'Shipped',
                              label_violet: order.order_status == 'Delivered',
                              label_orange: order.order_status == 'Cancelled'
                            }"
                          >
                            {{ order.order_status }}
                          </div>
                        </div>
                        <p class="statusNote">
                          Your order is {{ order.order_status }}
                        </p>
                        <p
                          class="statusNote label_violet"
                          v-if="order.order_status !== 'Pending'"
                        >
                          Estimated Delivery Date :
                          {{ getDelDate(order.delivery_date) }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-12 pl-5 pr-5 mb-1">
              <div class="border_edit"></div>
            </div>
          </div>
        </div>
        <div v-if="tableLoader" class="orderContainer col-sm-12 p-0">
          <ContentLoader viewBox="0 0 400 100" height="100" width="400">
            <rect x="20" y="8" rx="3" ry="3" width="50" height="80" />
            <rect x="10" y="120" rx="3" ry="3" width="100" height="10" />
            <rect x="80" y="15" rx="3" ry="3" width="50" height="4" />
            <rect x="80" y="30" rx="3" ry="3" width="200" height="4" />
            <rect x="80" y="40" rx="3" ry="3" width="200" height="4" />
            <rect x="80" y="50" rx="3" ry="3" width="200" height="4" />
            <rect x="300" y="5" rx="3" ry="3" width="50" height="15" />
            <rect x="300" y="30" rx="3" ry="3" width="70" height="4" />
            <rect x="300" y="40" rx="3" ry="3" width="70" height="4" />
          </ContentLoader>
        </div>
        <transition name="fade">
          <div class="orderContainer col-sm-12 p-0" v-if="noInvoicesFound">
            <center>
              <h1 class="no-orders-found">No orders found.</h1>
            </center>
          </div>
        </transition>
        <transition name="fade">
          <div class="orderContainer col-sm-12 p-0" v-if="noMoreInvoices">
            <center>
              <h1 class="no-orders-found">No more orders.</h1>
            </center>
          </div>
        </transition>
        <!--orderContainer -->
        <!--orderContainer -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      orders: [],
      count: {},
      form: {
        from_date: null,
        to_date: null,
        page: 0,
        status: "Cancelled",
        order_number: null
      },
      isDateValid: false,
      submitted: false,
      busy: false,
      tableLoader: true,
      noInvoicesFound: false,
      noMoreInvoices: false
    };
  },
  mounted() {
    this.loadPendingOrders();
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
        total_shipped
      } = await response.data;
      this.count = {
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped
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
      this.orders[index].items.forEach(order => {
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
    }
  }
};
</script>

<style scoped>
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
  background-color: #e4e4e4 !important;
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
.box_order {
  background: #fff;
  float: left;
  width: 100%;
  margin-top: 18px;
  margin-bottom: 18px;
  padding: 12px 0px;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-align: center;
}
.box_order span {
  color: #4c98d1;
  font-size: 18px;
  margin-bottom: 5px;
  float: left;
  width: 100%;
}
.box_order h2 {
  color: #535559;
  font-size: 14px;
  width: 100%;
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
.label_orange {
  background: #ff5733;
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

  .order_id {
    padding-left: 5px;
  }
}

@media screen and (max-width: 600px) {
  .wrapper_order_table {
    max-width: 100%;
    padding: 10px;
  }
  .wrapper_order_table {
    max-width: 100%;
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
</style>
