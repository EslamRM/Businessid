<template>
  <div>
    <div class="sectionBox container">
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
            <div class="d-flex wrapper_view_btn">
              <div
                class="label_green"
                v-if="order.order_status == 'Delivered'"
              >
                Delivered
              </div>

              <button
                style="margin-right: 5px; background-color: #3f51b5 !important"
                type="button"
                class="md-button md-theme-default md-accent md-raised btn-Small"
              >
                Repeat Order
              </button>
              <button
                v-if="order.order_status !== 'Delivered'"
                style="margin-right: 5px"
                type="button"
                class="md-button md-theme-default md-accent md-raised btn-Small"
                @click="
                  orderStatusPopup(order.items[0].item_id, order.order_id)
                "
              >
                Cancel Order
              </button>
              <button
                @click="$router.go(-1)"
                type="button"
                style="background-color: grey"
                class="md-button md-theme-default md-accent md-raised btn-Small"
              >
                Back
              </button>
            </div>
          </div>
          <div class="orderProducts col-sm-12 p-0">
            <div class="orderRow cart-listing col-sm-12">
              <div class="col-sm-12 col-md-4 pr-0 mob_padding">
                <div class="col-sm-12 wrapper_card_order">
                  <h1>Order Summary</h1>
                  <div class="row">
                    <div class="border_card_order"></div>
                  </div>

                  <div class="fl col-sm-12 wrapper_total pl-0 pr-0">
                    <h2 class="col-sm-12 fl pl-0 pr-0">
                      Subtotal:
                      <span> {{ currency(order.total_price) }}</span>
                    </h2>
                    <h2 class="col-sm-12 fl pl-0 pr-0">
                      VAT (5%):
                      <span>{{ currency(order.vat) }}</span>
                    </h2>
                    <h2 class="col-sm-12 fl pl-0 pr-0">
                      Delivery Fee:
                      <span>{{ currency(order.delivery_fee) }}</span>
                    </h2>
                    <h2 class="col-sm-12 fl pl-0 pr-0 text_total">
                      Total:
                      <span>{{ currency(order.grand_total) }}</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-4 pr-0 mob_padding">
                <div class="col-sm-12 wrapper_card_order">
                  <h1>Delivery Address</h1>
                  <div class="row">
                    <div class="border_card_order"></div>
                  </div>

                  <div class="col-sm-12 pl-0 pr-0 box_address">
                    <h1>{{ order.billing_address.contactname }}</h1>
                    <span>
                      {{ order.billing_address.building }},
                      {{ order.billing_address.landmark }},
                    </span>
                    <span>{{ order.billing_address.city }},
                      {{ order.billing_address.country }}</span>
                    <span>{{ order.billing_address.contactnumber }}</span>
                  </div>
                  <div
                    class="row-sm-12 pl-0 pr-0 box_address"
                    style="margin-top: 85px"
                  >
                    <span style="color: tomato">Estimated Delivery Date: {{ order.delivery_date }}</span>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-4">
                <div class="col-sm-12 wrapper_card_order">
                  <h1>Payment Method</h1>
                  <div class="row">
                    <div
                      class="border_card_order"
                      style="margin-bottom: 3px"
                    ></div>
                  </div>

                  <div class="col-sm-12 pl-0 pr-0 box_address">
                    <h1 style="color: #50c506">
                      {{ order.payment_method.replaceAll("_", " ") }}
                    </h1>
                  </div>
                  <div class="row">
                    <div class="border_card_order"></div>
                  </div>
                  <h1>Payment Status</h1>
                  <div class="row">
                    <div
                      class="border_card_order"
                      style="margin-bottom: 3px"
                    ></div>
                  </div>

                  <div class="col-sm-12 pl-0 pr-0 box_address">
                    <!-- <h1>{{ order.replaceAll("_", " ") }}</h1> -->
                    <h1
                      style="padding: 10px 0px; color: #50c506"
                      :class="{ red: order.payment_status == 'Unpaid' }"
                    >
                      {{
                        order.payment_status == "Unpaid" ? "Not Paid" : "Paid"
                      }}
                    </h1>
                  </div>
                </div>
              </div>

              <div class="col-sm-12">
                <div class="col-sm-12 col-md-12 col-xl-9 m-auto wrapper_status">
                  <div class="box_status">
                    <div class="content_status">
                      <div
                        class="dot_status"
                        :class="{
                          orange:
                            order.order_status === 'Pending' ||
                            order.order_status === 'Shipped' ||
                            order.order_status === 'Cancelled' ||
                            order.order_status === 'Delivered'
                        }"
                      ></div>
                      <span>Pending</span>
                    </div>
                    <div
                      class="border_status"
                      :class="{
                        orange:
                          order.order_status === 'Pending' ||
                          order.order_status === 'Shipped' ||
                          order.order_status === 'Cancelled' ||
                          order.order_status === 'Delivered'
                      }"
                    ></div>
                  </div>

                  <div class="box_status">
                    <div class="content_status">
                      <div
                        class="dot_status"
                        :class="{
                          orange:
                            order.order_status === 'Shipped' ||
                            order.order_status === 'Cancelled' ||
                            order.order_status === 'Delivered'
                        }"
                      ></div>
                      <span>Shipped</span>
                    </div>
                    <div
                      class="border_status"
                      :class="{
                        orange:
                          order.order_status === 'Shipped' ||
                          order.order_status === 'Cancelled' ||
                          order.order_status === 'Delivered'
                      }"
                    ></div>
                  </div>
                  <div
                    class="box_status"
                    v-if="order.order_status === 'Cancelled'"
                  >
                    <div class="content_status">
                      <div
                        class="dot_status"
                        :class="{ orange: order.order_status === 'Cancelled' }"
                      ></div>
                      <span> Cancelled </span>
                    </div>
                  </div>
                  <div
                    class="box_status"
                    v-else
                  >
                    <div class="content_status">
                      <div
                        class="dot_status"
                        :class="{ orange: order.order_status === 'Delivered' }"
                      ></div>
                      <span>Delivered</span>
                    </div>
                  </div>
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
  data () {
    return {
      order: {},
      count: {}
    };
  },
  beforeDestroy () {
    this.$store.commit("SET_BUYER_ORDERS_ACTIVE_TAB", "");
  },
  created () {
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
      this.$store.commit(
        "SET_BUYER_ORDERS_ACTIVE_TAB",
        this.order.order_status
      );
    }
  },
  computed: {
    order_pending () {
      if (this.order.order_status == "Pending") {
        return true;
      }
      return false;
    },
    order_dispatched () {
      if (this.order.order_status == "Dispatched") {
        return true;
      }
      return false;
    },
    order_delivered () {
      if (this.order.order_status == "Delivered") {
        return true;
      }
      return false;
    }
  },
  methods: {
    async orderStatusPopup (item_id, order_id) {
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
          other: "Other reason"
        },
        inputValidator: Reasons => {
          return new Promise(resolve => {
            if (Reasons) {
              resolve();
            } else {
              resolve("Kindly select any one option. :)");
            }
          });
        },
        inputPlaceholder: "Select a Reason",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading()
      });

      if (Reasons) {
        try {
          const response = await axios.post("buyer/orders/cancel", {
            order_id,
            status: "Cancelled"
          });
          if (await response.data.success) {
            console.log(response.data);
            await this.$swal.fire(
              this.$helpers.successPopup(
                "Your Item has been removed Successfully."
              )
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
              timerProgressBar: true
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
            timerProgressBar: true
          });
        }
      }
    }
  }
};
</script>
<style scoped>
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
  width: 100%;
  flex-flow: row wrap;
  display: flex;
  padding-bottom: 40px;
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
  margin-right: 10px;
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

.wrapper_status {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 4px;
}

.box_status {
  float: left;
  background-color: #fff;
  position: relative;
}
.border_status {
  position: absolute;
  width: 78%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
  top: 0;
  bottom: 0px;
  margin: auto;
  z-index: 0;
  right: 0;
}
.dot_status {
  background-color: #ccc;
  width: 24px;
  height: 24px;
  float: left;
  border-radius: 100%;
  margin-left: 7px;
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
}
@media screen and (max-width: 1200px) and (min-width: 1010px) {
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
    float: left;
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
    margin-top: 20px !important;
    padding-bottom: 0px;
    grid-template-columns: repeat(auto-fill, minmax(158px, 1fr));
  }
  .mob_padding {
    padding-right: 15px !important;
  }

  .border_status {
    position: absolute;
    width: 1px;
    height: 33px;
    background-color: rgba(0, 0, 0, 0.12);
    top: 27px;
    bottom: 0px;
    margin: auto;
    z-index: 0;
    left: 12px;
    right: inherit;
  }
  .dot_status {
    margin-left: 0px;
  }
  .box_status {
    min-height: 50px;
  }

  .orderRow {
    padding-bottom: 30px;
  }
}
@media screen and (max-width: 420px) and (min-width: 400px) {
  .wrapper_status {
    margin-top: 20px !important;
    padding-bottom: 0px;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}
</style>
