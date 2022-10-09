<template>
  <div>
    <div
      class="sectionBox col-sm-12 p-0"
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
              <div class="muted">{{ getDate(order.created_at) }}</div>
              <div class="countIn">
                {{
                  order.items.length == 1
                    ? `${order.items.length} item`
                    : `${order.items.length} items`
                }}
              </div>
            </div>
            <div class="d-flex wrapper_view_btn">
              <router-link
                :to="{
                  name: 'buyersOrderDetails',
                  params: {
                    order: order,
                    count: count,
                  },
                }"
                class="md-button md-theme-default detail-Btn"
                >View Details</router-link
              >
              <button
                type="button"
                class="md-button md-theme-default toggleboxBtn"
              >
                <span class="material-icons">keyboard_arrow_up</span>
              </button>
            </div>
          </div>

          <div
            class="orderProducts col-sm-12 p-0"
            v-for="(item, itemIndex) in order.items"
            :key="itemIndex"
          >
            <div class="orderRow cart-listing col-sm-12 pl-0 pr-0">
              <div class="content col-sm-12">
                <ul class="productShowing col-sm-12">
                  <li class="col-sm-12 pl-0 pr-0">
                    <div class="leftContent col-sm-12 col-md-8 pl-0 pr-0">
                      <div class="imgHolder">
                        <a href="#" class="link">
                          <img
                            :src="item.variation.files[0]"
                            :alt="item.name"
                          />
                        </a>
                      </div>
                      <div class="description">
                        <div class="name">{{ item.name }}</div>
                        <div class="md-layout">
                          <div class="price">
                            {{
                              item.offerprice !== "0.00"
                                ? currency(item.offerprice, item.currency)
                                : currency(item.unitprice, item.currency)
                            }}
                          </div>
                          <div
                            class="price unit-price"
                            v-if="item.offerprice !== '0.00'"
                          >
                            {{ currency(item.unitprice, item.currency) }}
                          </div>
                        </div>
                        <div class="boxWrap">
                          <div class="option">
                            <div class="optionType">Brand :</div>
                            <div class="optionShowing">{{ item.brand }}</div>
                          </div>
                          <div class="option">
                            <div class="optionType">Quantity :</div>
                            <span class="seller">{{ item.quantity }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType" v-if="item.variation.color">
                              Color :
                            </div>
                            <span class="seller">
                              {{ item.variation.color }}
                            </span>
                          </div>
                          <div class="option" v-if="item.variation.size.size">
                            <div class="optionType">Size :</div>
                            <span class="seller">{{
                              item.variation.size.size
                            }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType">Sold by :</div>
                            <span class="seller">{{
                              item.sold_by[0].trade_name_en
                            }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType">
                              VAT ({{ item.vat_percentage }}%):
                            </div>
                            <span class="seller">{{
                              currency(item.vat, item.currency)
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="orderstautsContent col-sm-12 col-md-4 pl-0 pr-0"
                    >
                      <div class="d-flex align-center">
                        <div class="label_yellow">{{ order.order_status }}</div>
                      </div>
                      <p class="statusNote">
                        Your order is {{ order.order_status }}
                      </p>

                      <p class="statusNote label_violet">
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
</template>
<script>
import axios from "axios";
import moment from "moment";
import { ContentLoader } from "vue-content-loader";
export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      orders: [],
      count: {},
      page: 0,
      busy: false,
      tableLoader: true,
      noInvoicesFound: false,
      noMoreInvoices: false,
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
      this.page++;

      // const data = this.form;
      console.log(this.page);
      console.log("page hit");

      const response = await axios.post("/buyer/orders", {
        page: this.page,
        status: "Delivered",
      });
      const {
        result,
        success,
        message,
        total_cancelled,
        total_delivered,
        total_pending,
      } = await response.data;
      this.count = { total_cancelled, total_delivered, total_pending };
      await this.$store.commit("SET_BUYER_ORDERS_COUNT", this.count);
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
    },
    getDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
    getDelDate(date) {
      return moment(date).format("MMMM Do,YYYY");
    },
  },
};
</script>
<style scoped>
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
  background-color: #ffffff;
  margin-top: 1.5em;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
}
.orderHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f4;
  padding-top: 10px;
  padding-bottom: 10px;
}
.orderHead .idNo {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  float: left;
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
  min-height: 112px;
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
.cart-listing .content .description .price {
  font-weight: 600;
  color: #444;
  margin-top: 2px;
}
.cart-listing .content .description .option {
  display: block;
  color: #878787;
  font-size: 12px;
  margin-top: 5px;
}
.optionType,
.equal {
  float: left;
  width: 85px;
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
  background: #3f51b5;
  color: #fff;
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  padding: 8px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  float: right;
}

.statusNote {
  margin-top: 10px;
  font-size: 12px;
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
  float: right;
}
.border_edit {
  margin: 0px 0px;
  float: left;
  width: 100%;
  background-color: #e0e0e0;
  height: 1px;
}
@media screen and (max-width: 1200px) and (min-width: 1010px) {
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
}

@media screen and (max-width: 600px) {
  .md-button {
    margin: 0px;
  }
  .sectionBox {
    width: 100%;
  }
  .order_id {
    width: 61%;
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

  .wrapper_view_btn {
    float: right;
    width: fit-content;
    margin-top: 0px;
    display: block !important;
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
    padding: 0px;
    font-size: 11px !important;
  }

  .leftContent {
    display: block;
  }

  .cart-listing .content .link img {
    height: auto;
  }

  .leftContent {
    display: flex;
    margin-top: 50px;
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
    /* Removed bcz price was not being displayed correctly in mobile view */
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
    margin-top: 3px;
    font-size: 11px;
    padding-top: 6px;
    float: left;
  }
  .orderHead {
    padding-left: 10px;
    padding-right: 10px;
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

@media screen and (max-width: 360px) {
  .statusNote {
    font-size: 10px;
  }
}

@media screen and (max-width: 300px) {
  .statusNote {
    width: 160px;
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
    margin-top: 10px;
  }
}
</style>
