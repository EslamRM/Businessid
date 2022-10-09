<template>
  <div>
    <div class="sectionBox">
      <div class="col-sm-12 col-md-11 m-auto padding_mob">
        <!--orderContainer -->
        <div class="orderContainer col-sm-12 p-0">
          <div class="orderHead col-sm-12">
            <div class="order_id">
              <div class="idNo">
                Order
                <span style="padding-left: 4px">#{{ order.order_id }} </span>
              </div>
              <div class="muted">Placed on {{ order.created_at }}</div>
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
                          <img :src="item.variation.files[0]" :alt="item.name" />
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
                          <div class="price unit-price" v-if="item.offerprice !== '0.00'">
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
                            <span class="seller"
                              >{{ item.quantity }} {{ item.unit }}</span
                            >
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
                            <span class="seller">{{ item.variation.size.size }}</span>
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
                    <div class="orderstautsContent col-sm-12 col-md-4 pl-0 pr-0">
                      <div class="d-flex align-center">
                        <div
                          :class="{
                            label_yellow: order.order_status == 'Pending',
                            label_green: order.order_status == 'Shipped',
                            label_violet: order.order_status == 'Delivered',
                            label_orange: order.order_status == 'Cancelled',
                          }"
                        >
                          {{ order.order_status }}
                        </div>
                      </div>
                      <p class="statusNote">Your order is {{ order.order_status }}</p>
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
          <div class="orderProducts col-sm-12 p-0">
            <div class="orderRow cart-listing col-sm-12">
              <div
                class="description col-sm-12 mt-4 col-md-6"
                style="line-height: 2; padding-left: 10rem"
              >
                <h2>Order Summary</h2>
                <div class="option">
                  <div class="optionType">Subtotal:</div>
                  <span class="seller">{{ currency(order.total_price) }}</span>
                </div>
                <div class="option">
                  <div class="optionType">VAT:</div>
                  <span class="seller">{{ currency(order.vat) }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Delivery Fee:</div>
                  <span class="seller">{{ currency(order.delivery_fee) }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Payment Method:</div>
                  <span class="seller">{{
                    order.payment_method.replaceAll("_", " ")
                  }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Payment Status:</div>
                  <span class="seller">{{
                    order.payment_status == "Unpaid" ? "Not Paid" : "Paid"
                  }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Total:</div>
                  <span class="seller">{{ currency(order.grand_total) }}</span>
                </div>
              </div>
              <div class="description col-sm-12 mt-4 col-md-6" style="line-height: 2">
                <h2>Delivery Infos</h2>
                <div class="option">
                  <div class="optionType">Account Name :</div>
                  <span class="seller">{{ order.account_name }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Attention :</div>
                  <span class="seller">{{ order.billing_address.contactname }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Mobile :</div>
                  <span class="seller">{{ order.billing_address.contactnumber }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Address:</div>
                  <span class="seller"
                    >{{ order.billing_address.room_no }},{{
                      order.billing_address.building
                    }},{{ order.billing_address.landmark }},{{
                      order.billing_address.area
                    }},{{ order.billing_address.city }},
                    {{ order.billing_address.country }}</span
                  >
                </div>
                <div class="option">
                  <div class="optionType">Postal Code:</div>
                  <span class="seller">{{ order.billing_address.postal_code }}</span>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-12 col-md-12 hh-grayBox pt45 pb20">
                    <div class="row justify-content-between">
                      <div
                        class="order-tracking"
                        :class="{
                          completed:
                            order.order_status === 'Pending' ||
                            order.order_status === 'Shipped' ||
                            order.order_status === 'Cancelled' ||
                            order.order_status === 'Delivered',
                        }"
                      >
                        <span class="is-complete"></span>
                        <p>Ordered<br /><span>Mon, June 24</span></p>
                      </div>
                      <div
                        class="order-tracking"
                        :class="{
                          completed:
                            order.order_status === 'Shipped' ||
                            order.order_status === 'Cancelled' ||
                            order.order_status === 'Delivered',
                        }"
                      >
                        <span class="is-complete"></span>
                        <p>Shipped<br /><span>Tue, June 25</span></p>
                      </div>
                      <div
                        class="order-tracking"
                        :class="{
                          completed:
                            order.order_status === 'Shipped' ||
                            order.order_status === 'Cancelled' ||
                            order.order_status === 'Delivered',
                        }"
                      >
                        <span class="is-complete"></span>
                        <p>Delivered<br /><span>Fri, June 28</span></p>
                      </div>
                      <div
                        class="order-tracking"
                        v-if="order.order_status === 'Cancelled'"
                      >
                        <span class="is-complete"></span>
                        <p>Cancelled<br /><span>Fri, June 28</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="d-flex wrapper_view_btn">
                  <!-- <div class="label_green" v-if="order.order_status == 'Delivered'">
                    Delivered
                  </div> -->

                  <button style="margin-right: 5px" type="button" class="btn-order">
                    <i class="material-icons"> restart_alt </i>
                  </button>
                  <button
                    v-if="order.order_status !== 'Delivered'"
                    style="margin-right: 5px"
                    type="button"
                    class="btn-order"
                    @click="orderStatusPopup(order.items[0].item_id, order.order_id)"
                  >
                    <i class="material-icons"> close </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--orderContainer -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {},
      count: {},
    };
  },
  beforeDestroy() {
    this.$store.commit("SET_BUYER_ORDERS_ACTIVE_TAB", "");
  },
  created() {
    if (
      Object.keys(this.$route.params).length === 0 &&
      this.$route.params.constructor === Object
    ) {
      console.log("Diverting Back to Pending Orders");
      // this.$router.push("/dashboard/vendor/orders/pending")
      this.$router.go(-1);
    } else {
      this.order = this.$route.params.order;
      this.count = this.$route.params.count;
      this.$store.commit("SET_BUYER_ORDERS_ACTIVE_TAB", this.order.order_status);
    }
  },
  computed: {
    order_pending() {
      if (this.order.order_status == "Pending") {
        return true;
      }
      return false;
    },
    order_dispatched() {
      if (this.order.order_status == "Dispatched") {
        return true;
      }
      return false;
    },
    order_delivered() {
      if (this.order.order_status == "Delivered") {
        return true;
      }
      return false;
    },
  },
  methods: {
    async orderStatusPopup(item_id, order_id) {
      console.log(item_id);
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: "Are you sure want to Remove this Item from Order?",
        html:
          '<p style="font-size: 10px; padding-top: 10px" > It would be great if you could tell us what made you cancel so we can improve</p>',
        cancelButtonColor: "#ff5722",
        confirmButtonColor: "#d2d2d2",
        input: "select",
        inputOptions: {
          short: "Short warranty period",
          twice: "I order twice",
          notInterested: "Iam not interested anymore",
          other: "Other reason",
        },
        inputValidator: (Reasons) => {
          return new Promise((resolve) => {
            if (Reasons) {
              resolve();
            } else {
              resolve("Kindly select any one option. :)");
            }
          });
        },
        inputPlaceholder: "Select a Reason",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      });

      if (Reasons) {
        try {
          const response = await axios.post("buyer/orders/cancel", {
            order_id,
            status: "Cancelled",
          });
          if (await response.data.success) {
            console.log(response.data);
            await this.$swal.fire(
              this.$helpers.successPopup("Your Item has been removed Successfully.")
            );
            await this.$router.go(-1);
          } else {
            await this.$swal.fire({
              position: "center",
              icon: "error",
              title: "Error, Please Try Again.",
              showConfirmButton: false,
              timer: 15000,
              showCancelButton: true,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.log(error);
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
  },
};
</script>
<style scoped>
.btn-order {
  width: 45px;
  height: 45px;
  background: #fff;
  border-radius: 50px;
  margin-bottom: 10px;
  color: tomato;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px 0 rgb(153 153 153 / 20%);
}
/* .btn-order span {
  margin: auto;
  width: 50%;
  padding: 10px;
} */
.red {
  color: red !important;
}
.orange {
  background-color: tomato !important;
}
.sectionBox {
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 75px;
}
.orderHead {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f4;
  margin-top: 1.5em;
  border-radius: 12px 12px 0px 0px;
}
.orderHead .idNo {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}
.orderHead .muted {
  font-size: 12px;
  font-weight: 400;
  color: #888888;
  margin-top: 2px;
}

.box {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  height: 200px;
}

.orderRow {
  border-bottom: 1px solid #ccc;
  width: 100%;
  flex-flow: row wrap;
  display: flex;
  padding-left: 3px;
  padding-right: 3px;
}

.status {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
.statusTxt {
  font-weight: 600;
  font-size: 14px;
}
.statusNote {
  margin-top: 10px;
  font-size: 12px;
}
.countIn {
  font-size: 14px;
  font-weight: 600;
  color: rgb(103, 102, 102);
  padding-left: 12px;
  padding-top: 12px;
}
.btn-Small {
  height: 33px;
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

.label_green {
  background: #64dd17;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  float: right;
  height: 34px;
  margin: 6px;
}

.wrapper_view_btn {
  float: right;
}
.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
  border-radius: 4px;
  height: 34px;
  padding: 10px 20px;
  box-shadow: none;
  text-transform: none;
  line-height: 1;
  margin: 6px;
}

.wrapper_card_order {
  margin-bottom: 40px;
  margin-top: 20px;
  float: left;
  background: #fff;
  border-radius: 6px;
  min-height: 190px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  overflow: hidden;
  padding-bottom: 12px;
}
.wrapper_card_order h1 {
  font-size: 15px;
  font-weight: 500;
  padding: 13px 0px;
}

.border_card_order {
  float: left;
  width: 100%;
  height: 1px;
  background-color: #efefef;
  margin-bottom: 10px;
}

.wrapper_total h2 {
  color: #888888;
  font-size: 13px;
  font-weight: 500;
  float: left;
  margin: 9px 0px;
}
.wrapper_total span {
  float: right;
  font-size: 13px;
  color: var(--md-theme-default-primary-on-background, #191919);
}

.text_total {
  font-size: 14px !important;
}

.box_address h1 {
  text-transform: capitalize;
  color: #353535;
  font-size: 15px;
  font-weight: 600;
}

.box_address span {
  text-transform: capitalize;
  float: left;
  clear: left;
  margin-bottom: 7px;
}

.wrapper_status[data-v-ba9c9670] {
  display: grid;
  gap: 8.9rem;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  border: 1px solid #eee;
  padding-top: 30px;
  padding-bottom: 50px;
  border-radius: 10px;
  padding-left: 10rem;
  margin: 55px auto !important;
}

.box_status {
  float: left;
  background-color: #fff;
  position: relative;
}
.border_status {
  position: absolute;
  width: 170%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
  top: 0;
  bottom: 0px;
  margin: auto;
  z-index: 0;
}
.dot_status {
  background-color: #ccc;
  width: 18px;
  height: 18px;
  float: left;
  border-radius: 100%;
  margin-left: 0px;
}
.content_status {
  position: relative;
  z-index: 1;
}
.content_status span {
  background-color: #fff;
  padding: 0px 8px;
  margin-top: 5px;
  float: left;
  position: absolute;
  left: -25px;
  top: 25px;
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
.link {
  text-align: center;
}
.link img {
  height: 100%;
  object-fit: contain;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
}
.description {
  padding: 0 24px 12px;
  vertical-align: top;
  min-height: 112px;
  flex: 1 1;
  overflow: hidden;
  line-height: 1.3;
  /* max-width: 460px; */
}
.description .name {
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
  width: 125px;
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
  padding: 8px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  float: right;
}
.label_green {
  background: #64dd17;
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

@media screen and (max-width: 1000px) {
  .sectionBox {
    width: 125% !important;
  }
  .description {
    flex: none;
    padding-left: 2rem !important;
  }
}
@media screen and (max-width: 768px) {
  .detail-Btn {
    padding: 4px 8px !important;
  }
}

@media screen and (max-width: 600px) {
  .order-tracking. p {
    font-size: 11px;
  }
  .order-tracking. span {
    font-size: 9px;
  }
  .description {
    padding-left: 2rem !important;
    flex: none !important;
  }
  .description h2 {
    font-size: 16px;
  }
  .md-button {
    margin: 0px;
  }
  .sectionBox {
    width: 100% !important;
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
    /* width: 100%; */
    font-size: 12px;
  }
  .optionType,
  .equal {
    float: left;
    width: 120px;
    font-size: 11px;
  }
  .seller {
    font-size: 11px;
  }
  .countIn {
    padding-left: 0px;
    margin-top: 15px;
    font-size: 11px;
    padding-top: 6px;
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
@media screen and (max-width: 1000px) {
  .statusNote {
    padding-bottom: 20px;
  }

  .content_status span[data-v-ba9c9670] {
    font-size: 13px;
    background-color: #fff;
    padding: 0px 4px;
    float: left;
  }
  .wrapper_status {
    gap: 0.2rem;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .wrapper_card_order h1 {
    font-size: 14px;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    padding: 8px 20px;
  }

  .label_green {
    height: 35px;
    margin-top: 6px;
  }

  .sectionBox {
    margin-bottom: 0px;
  }
}

@media screen and (max-width: 600px) {
  .padding_mob {
    padding-left: 0px;
    padding-right: 0px;
  }
  .wrapper_view_btn {
    float: right;
    width: fit-content;
    margin-top: 10px;
  }

  .sectionBox {
    width: 340px;
    margin-bottom: 0px;
  }
  .order_id {
    width: 100%;
    float: left;
  }

  .orderHead {
    display: block;
    overflow: hidden;
  }
  .orderHead .muted {
    width: 100%;
    float: left;
  }

  .orderHead {
    padding-left: 10px;
    padding-right: 10px;
  }
  .sectionBox {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }

  .sectionBox.container.col-sm-12 {
    padding-left: 0px;
    padding-right: 0px;
  }

  .label_green {
    float: left;
    margin-right: 10px;
    padding: 10px 13px;
  }

  button.md-button.md-theme-default.md-accent.md-raised.btn-Small {
    height: 35px;
    margin-top: 6px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 7px;
  }

  .wrapper_card_order {
    min-height: fit-content;
    margin-bottom: 0px;
    margin-top: 20px;
  }
  .wrapper_status {
    display: grid;
    gap: 4.9rem !important;
    border: 1px solid #eee;
    padding-bottom: 50px;
    border-radius: 10px;
    padding-left: 5rem !important;
    margin: 55px auto !important;
  }
  .mob_padding {
    padding-right: 15px !important;
  }

  .border_status {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.12);
    bottom: 0px;
    margin: auto;
    z-index: 0;
    left: 12px;
    right: inherit;
  }
  .dot_status {
    margin-left: 0px;
  }
  .orderRow {
    padding-bottom: 30px;
  }
}
@media screen and (max-width: 300px) {
  .border_status {
    width: 250%;
  }
  .content_status span {
    font-size: 9px !important;
    position: absolute;
    left: -12px;
    top: 25px;
  }
  .btn-order {
    width: 25px;
    height: 25px;
    margin-bottom: 0;
    padding: 4px;
  }
  .btn-order i {
    font-size: 15px;
  }
}
/* new */
.hh-grayBox {
  background-color: #f8f8f8;
  margin-bottom: 20px;
  padding: 35px;
  margin-top: 20px;
}
.pt45 {
  padding-top: 45px;
}
.order-tracking {
  text-align: center;
  width: 33.33%;
  position: relative;
  display: block;
}
.order-tracking .is-complete {
  display: block;
  position: relative;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  border: 0px solid #afafaf;
  background-color: #f7be16;
  margin: 0 auto;
  transition: background 0.25s linear;
  -webkit-transition: background 0.25s linear;
  z-index: 2;
}
.order-tracking .is-complete:after {
  display: block;
  position: absolute;
  content: "";
  height: 14px;
  width: 7px;
  top: -2px;
  bottom: 0;
  left: 5px;
  margin: auto 0;
  border: 0px solid #afafaf;
  border-width: 0px 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
}
.order-tracking.completed .is-complete {
  border-color: #27aa80;
  border-width: 0px;
  background-color: #27aa80;
}
.order-tracking.completed .is-complete:after {
  border-color: #fff;
  border-width: 0px 3px 3px 0;
  width: 7px;
  left: 11px;
  opacity: 1;
}
.order-tracking p {
  color: #a4a4a4;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 0;
  line-height: 20px;
}
.order-tracking p span {
  font-size: 14px;
}
.order-tracking.completed p {
  color: #000;
}
.order-tracking::before {
  content: "";
  display: block;
  height: 3px;
  width: calc(100% - 40px);
  background-color: #f7be16;
  top: 13px;
  position: absolute;
  left: calc(-50% + 20px);
  z-index: 0;
}
.order-tracking:first-child:before {
  display: none;
}
.order-tracking.completed:before {
  background-color: #27aa80;
}
</style>
